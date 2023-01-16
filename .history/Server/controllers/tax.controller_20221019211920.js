const db = require('../main.db');

function displayData(req, res){
    const sqlSelect = "SELECT * FROM tbltax";

    db.query(sqlSelect, (err, result) => {
        res.send(result);
        console.log(result);
    });
};

function insertData(req, res){
    
    const taxName = req.body.TaxName
    const taxValue = req.body.TaxValue
    const Status = req.body.Status

    const sqlInsert = "INSERT INTO tbltax (Tax_Name, Tax_Value, Status) VALUES (?,?,?)";

    db.query(sqlInsert, [taxName, taxValue, Status], (err, result) => {
        console.log(result);
    });
    
}

function getData(req, res){
    const id = req.params.id;
    const sqlSelect = "SELECT * FROM tbltax WHERE TaxID = ?";

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
    const taxName = req.body.TaxName
    const taxValue = req.body.TaxValue
    const Status = req.body.Status

    const sqlSelect = "UPDATE tbltax SET Tax_Name = ?, Tax_Value = ?, Status = ? WHERE TaxID = ?";

    db.query(sqlSelect, [taxName, taxValue, Status, id], (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result);
        console.log(result);
    });
}

function deleteData(req, res){
    
    const id = req.params.id;
    const sqlRemove = "DELETE FROM tbltax WHERE TaxID = ?";

    db.query(sqlRemove, id, (err, result) => {
        if(err){
            console.log(err);
        }
    });
}

function getTax(req, res){
    const sqlSelect = "SELECT TaxID, Tax_Name, Tax_Value FROM tbltax WHERE Status = 'active'";
  
    db.query(sqlSelect, (err, result) => {
        res.send(result);
        console.log(result);
    });
}

module.exports = {
    display: displayData,
    insert: insertData,
    get: getData,
    update: updateData,
    delete: deleteData,
    getTx: getTax
}