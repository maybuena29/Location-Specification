const mysql = require('mysql');
const fs = require('fs');

    // const db=mysql.createConnection(
    //     {
    //         host:"corumed-db.mysql.database.azure.com",
    //         user:"corumedbe", 
    //         password: "c0rum3dAdm!n",
    //         database: 'ordering_pos_db',
    //         port:3306, 
    //         ssl:{
    //             ca:fs.readFileSync("DigiCertGlobalRootCA.crt.pem")
    //         }
    //     }
    // );

    const db = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'locator_db',
    });

module.exports = db;