const db = require('../main.db');

function displayData(req, res){
    const sqlSelect = "SELECT Critical_ID, CategoryID, (SELECT Category_Name FROM `tblcategory` WHERE CategoryID = CL.CategoryID) AS Category_Name, `MaxStock`, `CriticalPercentage` FROM `tblcriticallevel` CL";

    db.query(sqlSelect, (err, result) => {
        res.send(result);
        console.log(result);
    });
};

function insertData(req, res){
    
    const categoryId = req.body.CategoryID
    const maxStock = req.body.MaxStock
    const critPercent = req.body.CriticalPercentage

    const sqlInsert = "INSERT INTO `tblcriticallevel`(`CategoryID`, `MaxStock`, `CriticalPercentage`) VALUES (?, ?, ?)";

    db.query(sqlInsert, [categoryId, maxStock, critPercent], (err, result) => {
        console.log(result);
    });
    
}

function getData(req, res){
    const id = req.params.id;
    const sqlSelect = "SELECT Critical_ID, CategoryID, (SELECT Category_Name FROM `tblcategory` WHERE CategoryID = CL.CategoryID) AS Category_Name, `MaxStock`, `CriticalPercentage` FROM `tblcriticallevel` CL WHERE Critical_ID=?";

    db.query(sqlSelect, id, (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result[0]);
        console.log(result[0]);
    });
}

function updateData(req, res){
    const id = req.params.id;
    const categoryId = req.body.CategoryID
    const maxStock = req.body.MaxStock
    const critPercent = req.body.CriticalPercentage

    const sqlSelect = "UPDATE `tblcriticallevel` SET `CategoryID`=?, `MaxStock`=?, `CriticalPercentage`=? WHERE `Critical_ID`=?";

    db.query(sqlSelect, [categoryId, maxStock, critPercent, id], (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result);
        console.log(result);
    });
}

function deleteData(req, res){
    
    const id = req.params.id;
    const sqlRemove = "DELETE FROM `tblcriticallevel` WHERE `Critical_ID` = ?";

    db.query(sqlRemove, id, (err, result) => {
        if(err){
            console.log(err);
        }
    });
}

module.exports = {
    display: displayData,
    insert: insertData,
    get: getData,
    update: updateData,
    delete: deleteData,
//     getDisc: getDiscount
}