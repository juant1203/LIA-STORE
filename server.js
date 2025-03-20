require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000; 

const path = require("path");

app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

const mysql = require("mysql2");
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Error conectando a MySQL:", err);
    return;
  }
  console.log("Conectado a la base de datos MySQL");
});

app.get("/productos", (req, res) => {
  const sql = "SELECT * FROM productos";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error en la consulta:", err);
      res.status(500).json({ error: "Error en la base de datos" });
      return;
    }
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

const cors = require("cors");
app.use(cors());
