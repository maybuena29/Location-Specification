
const db = require('../main.db');
const session = require('express-session');

function displayAudit(req, res){
    const sqlSelect = "SELECT * FROM tblauditlog ORDER BY AuditID DESC";

    db.query(sqlSelect, (err, result) => {
        res.send(result);
        console.log(result);
    });

  
};
module.exports = {displayAudit:displayAudit};