const mysql = require('mysql');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/.env' });





    const db=mysql.createConnection(
        {
        host:process.env.DB_HOST,
        user:process.env.DB_USER, 
        password: process.env.DB_PASSWORD,
        database: 'ordering_pos_db',
        port:3306, 
        ssl:{ca:fs.readFileSync("DigiCertGlobalRootCA.crt.pem")}});

db.connect(
    function (err) { 
    if (err) { 
        console.log("!!! Cannot connect !!! Error:");
        throw err;
        
    }
    else
    {
       console.log("Connection established.");
           
    }
});

module.exports = db;