const mysql = require('mysql2/promise'); //o banco usado é o banco é mySql
require('dotenv').config(); 


const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.getConnection()
    .then(() => console.log("Conectado"))
    .catch((erro) => console.error("Não conectou ao banco:", erro.message));

module.exports = db;