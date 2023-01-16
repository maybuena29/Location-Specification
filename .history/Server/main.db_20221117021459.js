const mysql = require('mysql');
const fs = require('fs');
require('dotenv');

// const config=mysql.createConnection(
//     {
//         host:process.env.DB_HOST,
//         user:process.env.DB_USER, password:process.env.DB_PASSWORD, 
//         database:"ordering_pos_db", 
//         port:3306, 
//         ssl:{
//             ca:fs.readFileSync(`./cert/DigiCertGlobalRootCA.crt.pem`,"utf8")
//         }

        
//     });


    const db=mysql.createConnection(
        {
        host:process.env.DB_HOST,
        user:process.env.DB_USER, 
        password: process.env.DB_PASSWORD,
        database: 'ordering_pos_db',
        port:3306, 
        ssl:{ca:fs.readFileSync("DigiCertGlobalRootCA.crt.pem")}});
        
// const db = mysql.createPool({
//     host:"corumed-db.mysql.database.azure.com",
//     user:"corumedbe", 
//     password: "c0rum3dAdm!n",
//     database: 'ordering_pos_db',
//     port:3306, 
   
// });

//const conn = new mysql.createConnection(config);

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