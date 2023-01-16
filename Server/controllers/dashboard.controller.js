const db = require('../main.db');

function displayTotalTeachers(req, res){
    const sqlSelect = "SELECT COUNT(*) AS 'TotalTeachers' FROM `tblteachers`;";

    db.query(sqlSelect, (err, result) => {
        res.send(result[0]);
    });
  
}

function displayTotalRooms(req, res){
    const sqlSelect = "SELECT COUNT(*) AS 'TotalRooms' FROM `tblrooms`;";

    db.query(sqlSelect, (err, result) => {
        res.send(result[0]);
        console.log(result);
    });
  
}

function displayTotalStatus(req, res){
    const sqlSelect = "SELECT COUNT(*) AS 'TotalStatus' FROM `tblstatus`;";

    db.query(sqlSelect, (err, result) => {
        res.send(result[0]);
        console.log(result);
    });
  
}

module.exports = {
    displayTeachers: displayTotalTeachers,
    displayRooms: displayTotalRooms,
    displayStatus: displayTotalStatus,
}