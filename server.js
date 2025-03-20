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
const mysql = require("mysql2/promise");

app.use(express.static(path.join(__dirname)));

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

const dbMySQL = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_NAME,
  port: process.env.MYSQL_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

dbMySQL.getConnection()
  .then(conn => {
    console.log("✅ Conectado a MySQL");
    conn.release();
  })
  .catch(err => console.error("❌ Error conectando a MySQL:", err));

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

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});


