const mysql = require('mysql');

const db = mysql.createPool({
    host: process.env.DB_HOST||'localhost',
    user: process.env.DB_USER||'root',
    password: process.env.DB_PASSWORD ||'',
    database: 'ordering_pos_db',
});

module.exports = db;