require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");
const cors = require("cors");
app.use(cors({
  origin: 'https://lia-store.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
const { Client } = require("pg"); 

app.use(express.static(path.join(__dirname)));
app.use(cors());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});


const db = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432, 
});

db.connect()
  .then(() => console.log("✅ Conectado a PostgreSQL"))
  .catch(err => console.error("❌ Error conectando a PostgreSQL:", err));

app.get("/productos", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM productos");
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Error en la consulta:", err);
    res.status(500).json({ error: "Error en la base de datos" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});

