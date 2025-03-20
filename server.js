const express = require("express");
const app = express();
const PORT = 3000;

const path = require("path");

app.use(express.static(path.join(__dirname,)));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
  });
  


const mysql = require("mysql2");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "JuanT_1203",
  database: "lia_estore",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Conectado a la base de datos MySQL");
});


app.get("/productos", (req, res) => {
  const sql = "SELECT * FROM productos"; 
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

