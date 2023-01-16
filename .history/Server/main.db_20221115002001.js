const mysql = require('mysql');

// const db = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: 'ordering_pos_db',
// });

var conn=mysql.createConnection(
    {
        host:"corumed-db.mysql.database.azure.com",
        user:"corumedbe", password:process.env.DB_PASSWORD, 
        database:"{your_database}", 
        port:3306, 
        ssl:{ca:fs.readFileSync("{ca-cert filename}")}});
module.exports = db;