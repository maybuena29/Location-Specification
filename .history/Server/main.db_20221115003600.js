const mysql = require('mysql');
const fs = require('fs');

const config=mysql.createConnection(
    {
        host:"corumed-db.mysql.database.azure.com",
        user:"corumedbe", password:process.env.DB_PASSWORD, 
        database:"ordering_pos_db", 
        port:3306, 
        ssl:{ca:fs.readFileSync(`./cert/DigiCertGlobalRootCA.crt.pem`,"utf8")}});
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'ordering_pos_db',
});


     


const conn = new mysql.createConnection(config);

conn.connect(
    function (err) { 
    if (err) { 
        console.log("!!! Cannot connect !!! Error:");
        throw err;
    }
    else
    {
       console.log("Connection established.");
           queryDatabase();
    }
});

module.exports = db;