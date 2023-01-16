const mysql = require('mysql');
const fs = require('fs');
// const db = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: 'ordering_pos_db',
// });

const db=mysql.createConnection(
    {
        host:"corumed-db.mysql.database.azure.com",
        user:"corumedbe", password:process.env.DB_PASSWORD, 
        database:"ordering_pos_db", 
        port:3306, 
        ssl:{ca:fs.readFileSync("./cert/DigiCertGlobalRootCA.crt.pem","utf8")}});
module.exports = db;