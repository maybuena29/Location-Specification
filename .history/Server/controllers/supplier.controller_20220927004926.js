const db = require('../main.db');

function displayData(req, res){
    const sqlSelect = "SELECT * FROM tblsupplier";

    db.query(sqlSelect, (err, result) => {
        res.send(result);
        console.log(result);
    });
};

function insertData(req, res){
    
    const suppComName = req.body.SupplierComName
    const suppRepName = req.body.SupplierRepName
    const suppContNum = req.body.SupplierContNum
    const suppAddress = req.body.SupplierAddress
    const status = req.body.Status

    const sqlInsert = "INSERT INTO tblsupplier (Supplier_ComName, Supplier_RepName, Supplier_ContNum, Supplier_Address, SuppStatus) VALUES (?,?,?,?,?)";
  
    db.query(sqlInsert, [suppComName,suppRepName,suppContNum,suppAddress, status], (err, result) => {
        console.log(result);
        console.log(err)
    });
    
}
function insertDataExl(req, res){
    
    const data = req.body.data;
    const status = "active";
    console.log("insertDataExl " +data.productSupplier );
    const sqlInsert = "INSERT INTO tblsupplier (Supplier_ComName, Supplier_RepName, Supplier_ContNum, Supplier_Address, SuppStatus) VALUES (?,?,?,?,?)";
    data.map((rows)=>{
    db.query(sqlInsert, [rows.productSupplier,"?","?","?", status], (err, result) => {
        console.log(result);
            });
        })
}

function getData(req, res){
    const id = req.params.id;
    const sqlSelect = "SELECT * FROM tblsupplier WHERE SupplierID = ?";

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
    const SupplierComName = req.body.SupplierComName;
    const SupplierRepName = req.body.SupplierRepName;
    const SupplierContNum = req.body.SupplierContNum;
    const SupplierAddress = req.body.SupplierAddress;
    const Status = req.body.Status
  
    const sqlSelect = "UPDATE tblsupplier SET Supplier_ComName = ?, Supplier_RepName = ?, Supplier_ContNum = ?, Supplier_Address = ?, SuppStatus = ? WHERE SupplierID = ?";
    db.query(sqlSelect, [SupplierComName, SupplierRepName, SupplierContNum, SupplierAddress, Status, id], (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result);
        console.log(result);
    });
}

function deleteData(req, res){
    const id = req.params.id;
    const sqlRemove = "DELETE FROM tblsupplier WHERE SupplierID = ?";

    db.query(sqlRemove, id, (err, result) => {
        if(err){
            console.log(err);
        }
    });
}

function getSupplier(req, res){
    const sqlSelect = "SELECT SupplierID, Supplier_ComName FROM tblsupplier WHERE SuppStatus = 'active'";
      
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
    getSupp: getSupplier
}