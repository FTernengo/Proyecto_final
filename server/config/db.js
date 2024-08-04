// server/config/db.js

require('dotenv').config(); // Carga las variables de entorno desde el archivo .env

const mysql = require('mysql2');
const pool = mysql.createPool({
  host: process.env.DB_HOST, // Usa las variables de entorno
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

module.exports = pool.promise();
