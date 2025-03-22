const mysql = require("mysql2/promise");
const { Pool } = require("pg");
require("dotenv").config(); 

const dbMySQL = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_NAME, 
  port: process.env.MYSQL_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
});

const dbPostgreSQL = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  user: process.env.DB_USER,
  port: process.env.DB_PORT || 5432,
  max: 10, 
  idleTimeoutMillis: 30000, 
});

dbMySQL
  .getConnection()
  .then((conn) => {
    console.log("✅ Conectado a MySQL");
    conn.release();
  })
  .catch((err) => console.error("❌ Error conectando a MySQL:", err));

dbPostgreSQL
  .connect()
  .then((client) => {
    console.log("✅ Conectado a PostgreSQL");
    client.release();
  })
  .catch((err) => {
    console.error("❌ Error conectando a PostgreSQL:", err);
  });

module.exports = { dbMySQL, dbPostgreSQL };
