require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const path = require("path");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { dbMySQL, dbPostgres } = require("./db");
const app = express();
const PORT = process.env.PORT || 10000;
const isProduction = process.env.NODE_ENV === "production";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ["http://localhost:10000", "https://lia-store.onrender.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secreto_super_seguro",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: isProduction,
      httpOnly: true,
      sameSite: isProduction ? "None" : "Lax",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
console.log("📄 Credenciales de Google cargadas correctamente");

passport.use(
  new GoogleStrategy(
    {
      clientID: credentials.web.client_id,
      clientSecret: credentials.web.client_secret,
      callbackURL: credentials.web.redirect_uris[0],
    },
    async (accessToken, refreshToken, profile, done) => {
      const { id, displayName, emails, photos } = profile;
      const email = emails[0].value;
      const photo = photos[0].value;
      
      console.log({ id, displayName, email, photo });

      try {
        // Guardar el usuario en PostgreSQL (solo para Google)
        await dbPostgres.query(
          `INSERT INTO users (google_id, name, email, photo) 
           VALUES ($1, $2, $3, $4) 
           ON CONFLICT (google_id) DO UPDATE 
           SET name = $2, email = $3, photo = $4`,
          [id, displayName, email, photo]
        );
        console.log("✅ Usuario guardado en PostgreSQL");

        // Solo guardar el usuario en MySQL si no es un usuario de Google
        // No se guarda google_id en MySQL
        await dbMySQL.query(
          `INSERT INTO users (name, email, photo) 
           VALUES (?, ?, ?) 
           ON DUPLICATE KEY UPDATE name=?, email=?, photo=?`,
          [displayName, email, photo, displayName, email, photo]
        );
        console.log("✅ Usuario guardado en MySQL");
      } catch (error) {
        console.error("❌ Error guardando el usuario en la base de datos:", error);
      }

      return done(null, profile);
    }
  )
);

app.get("/api/user", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "Usuario no autenticado" });
  }

  res.json({
    google_id: req.user.id,
    name: req.user.displayName,
    email: req.user.emails[0].value,
    photo: req.user.photos[0].value,
  });
});

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

app.post("/register", async (req, res) => {
  const { nombre, email, contraseña } = req.body;

  try {
    // Verificar si el correo electrónico ya está registrado en MySQL
    const [existingUserMySQL] = await dbMySQL.query("SELECT * FROM users WHERE email = ?", [email]);

    if (existingUserMySQL.length > 0) {
      // Si ya está registrado en MySQL, no se registra nuevamente
      return res.status(400).json({ message: "El correo electrónico ya está registrado" });
    }

    // Verificar si el correo electrónico ya está registrado en PostgreSQL
    const resultPostgres = await dbPostgres.query("SELECT * FROM users WHERE email = $1", [email]);

    if (resultPostgres.rows.length > 0) {
      // Si ya está registrado en PostgreSQL, no se registra nuevamente
      return res.status(400).json({ message: "El correo electrónico ya está registrado" });
    }

    // Si no está registrado, encriptar la contraseña
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    // Registrar el nuevo usuario en MySQL
    await dbMySQL.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [nombre, email, hashedPassword]
    );

    // Registrar el nuevo usuario en PostgreSQL (sin google_id)
    await dbPostgres.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
      [nombre, email, hashedPassword]
    );

    res.json({ message: "✅ Registro exitoso" });
  } catch (error) {
    console.error("❌ Error en el registro:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

app.get("/api/productos/postgres", async (req, res) => {
  try {
    const result = await dbPostgres.query("SELECT * FROM productos");
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Error en la consulta de PostgreSQL:", err);
    res.status(500).json({ error: "Error en la base de datos PostgreSQL" });
  }
});

app.get("/api/productos/mysql", async (req, res) => {
  try {
    const [rows] = await dbMySQL.query("SELECT * FROM productos");
    res.json(rows);
  } catch (err) {
    console.error("❌ Error en la consulta de MySQL:", err);
    res.status(500).json({ error: "Error en la base de datos MySQL" });
  }
});

app.use(express.static(path.join(__dirname)));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
