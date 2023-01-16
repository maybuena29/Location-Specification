const db = require('../main.db');

function displayData(req, res){
    const sqlSelect = "SELECT * FROM tblbrand";

    db.query(sqlSelect, (err, result) => {
        res.send(result);
        console.log(result);
    });
};
function insertDataExl(req, res){
    
    const BrandName = req.body.BrandName
    const Status = "Active";

    const sqlInsert = "INSERT IGNORE INTO tblbrand (Brand_Name, Status) VALUES (?,?)";

    db.query(sqlInsert, [BrandName, Status], (err, result) => {
        console.log(result);
    });
    
}

function insertData(req, res){
    
    const BrandName = req.body.BrandName
    const Status = req.body.Status

    const sqlInsert = "INSERT INTO tblbrand (Brand_Name, Status) VALUES (?,?)";

    db.query(sqlInsert, [BrandName, Status], (err, result) => {
        console.log(result);
    });
    
}

function getData(req, res){
    const id = req.params.id;
    const sqlSelect = "SELECT * FROM tblbrand WHERE BrandID = ?";

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
    const BrandName = req.body.BrandName
    const Status = req.body.Status

    const sqlSelect = "UPDATE tblbrand SET Brand_Name = ?, Status = ? WHERE BrandID = ?";

    db.query(sqlSelect, [BrandName, Status, id], (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result);
        console.log(result);
    });
}

function deleteData(req, res){
    
    const id = req.params.id;
    const sqlRemove = "DELETE FROM tblbrand WHERE BrandID = ?";

    db.query(sqlRemove, id, (err, result) => {
        if(err){
            console.log(err);
        }
    });
}

function getBrand(req, res){
    const sqlSelect = "SELECT BrandID, Brand_Name FROM tblbrand WHERE Status = 'active'";
  
    db.query(sqlSelect, (err, result) => {
        res.send(result);
        console.log(result);
    });
}

module.exports = {
    display: displayData,
    insert: insertData,
    insertExl: insertDataExl,
    get: getData,
    update: updateData,
    delete: deleteData,
    getBrnd: getBrand
}