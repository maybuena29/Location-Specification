const mysql = require('mysql');
const fs = require('fs');

    // const db=mysql.createConnection(
    //     {
    //         host:"corumeddb.mysql.database.azure.com",
    //             user:"corumed_admin", 
    //             password: "Ph@rm4mediko",
    //             database: 'ordering_pos_db',
    //             port:3306, 
    //         ssl:{
    //             ca:fs.readFileSync("DigiCertGlobalRootCA.crt.pem")
    //         }
    //     }
    // );

    const db = mysql.createConnection({
        host:"corumeddb.mysql.database.azure.com", 
        user:"corumed_admin", 
        password:"Ph@rm4mediko", 
        database:"ordering_pos_db", 
        port:3306, 
        ssl:{ca:fs.readFileSync("{ca-cert filename}")}});

    // const db = mysql.createPool({
    //     host: 'localhost',
    //     user: 'root',
    //     password: '',
    //     database: 'ordering_pos_db',
    // });

// db.connect(
//     function (err) { 
//     if (err) { 
//         console.log("!!! Cannot connect !!! Error:");
//         throw err;
//     }
//     else
//     {
//        console.log("Connection established.");
//     }
// });

module.exports = db;