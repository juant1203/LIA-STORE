require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const path = require("path");
const cors = require("cors");
const { Client } = require("pg");
const mysql = require("mysql2/promise");

const app = express();
const PORT = process.env.PORT || 10000;
const isProduction = process.env.NODE_ENV === "production";

// 🔹 Conectar a PostgreSQL
const db = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
});

db.connect()
  .then(() => console.log("✅ Conectado a PostgreSQL"))
  .catch((err) => console.error("❌ Error conectando a PostgreSQL:", err));

// 🔹 Conectar a MySQL
const dbMySQL = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE, // Se cambia a MYSQL_DATABASE
  port: process.env.MYSQL_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

dbMySQL
  .getConnection()
  .then((conn) => {
    console.log("✅ Conectado a MySQL");
    conn.release();
  })
  .catch((err) => console.error("❌ Error conectando a MySQL:", err));

// 🔹 Middleware
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

// 🔹 Cargar credenciales de Google desde las variables de entorno
const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
console.log("📄 Credenciales de Google cargadas correctamente");

// 🔹 Configurar estrategia de autenticación con Google
passport.use(
  new GoogleStrategy(
    {
      clientID: credentials.web.client_id,
      clientSecret: credentials.web.client_secret,
      callbackURL: credentials.web.redirect_uris[0],
    },
    async (accessToken, refreshToken, profile, done) => {
      const { id, displayName, emails } = profile;
      const email = emails[0].value;

      try {
        // Guardar en PostgreSQL
        await db.query(
          `INSERT INTO users (google_id, name, email) 
           VALUES ($1, $2, $3) 
           ON CONFLICT (google_id) DO UPDATE 
           SET name = $2, email = $3`,
          [id, displayName, email]
        );
        console.log("✅ Usuario guardado en PostgreSQL");

        // Guardar en MySQL
        await dbMySQL.query(
          `INSERT INTO users (google_id, name, email) 
           VALUES (?, ?, ?) 
           ON DUPLICATE KEY UPDATE name=?, email=?`,
          [id, displayName, email, displayName, email]
        );
        console.log("✅ Usuario guardado en MySQL");
      } catch (error) {
        console.error("❌ Error guardando el usuario en la base de datos:", error);
      }

      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// 🔹 Rutas de autenticación
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

// 🔹 Rutas de productos
app.get("/api/productos/postgres", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM productos");
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

// 🔹 Servir archivos estáticos
app.use(express.static(path.join(__dirname)));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// 🔹 Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
