const db = require('../main.db');
const audit =require('./auditlog.controller');

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
        if (err) {
            console.log(err)
        }
        else{
            console.log(result);
            logs={
                AuditUserCode:req.session.user.id,
                AuditModule:"Supplier",
                AuditAction:`New Supplier: ${suppComName} `
            }
            audit.logger(logs);
        }
    });
    
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
        else{
            logs={
                AuditUserCode:req.session.user.id,
                AuditModule:"Supplier",
                AuditAction:`Updated Supplier: ${SupplierComName} `
            }
            audit.logger(logs);
            res.send(result);
            console.log(result);
        }
        
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

async function getSupplier(req, res){
    const id = req.params.id;
    const sqlSelect = "SELECT Supplier_ComName FROM tblsupplier WHERE SuppStatus = 'active'";
      
    async function getSupplierName(){
        async function query(){
            return new Promise((resolve, reject)=>{
                 db.query("SELECT Supplier_ComName FROM tblsupplier WHERE SupplierID = ?",[id],(err,result)=>{
                    if (err){
                        reject(err);
                        console.log(err);
                    }
                    else{
                        resolve(result[0].Supplier_ComName);

                    }
                })
           })
        } 
        const result = await query()
        return result
    }
    const SupplierName = await getSupplierName();

    db.query(sqlRemove, id, (err, result) => {
        if(err){
            console.log(err);
        }
        logs={
            AuditUserCode:req.session.user.id,
            AuditModule:"Supplier",
            AuditAction:`Deleted Supplier: ${SupplierName} `
        }
        audit.logger(logs);
    });
}

module.exports = {
    display: displayData,
    insert: insertData,
    get: getData,
    update: updateData,
    delete: deleteData,
    getSupp: getSupplier
}