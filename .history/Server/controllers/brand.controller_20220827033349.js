const db = require('../main.db');
const audit = require('./auditlog.controller');

function displayData(req, res){
    const sqlSelect = "SELECT * FROM tblbrand";

    db.query(sqlSelect, (err, result) => {
        res.send(result);
        console.log(result);
    });
};

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
        else{
        res.send(result);
        console.log(result);
        logs={
            AuditUserCode:req.session.user.id,
            AuditModule:"Adjustment-Tax",
            AuditAction:`Updated Tax: ${taxName} `
        }
        audit.logger(logs);
        }
        
    });
}

async function deleteData(req, res){
    
    const id = req.params.id;
    const sqlRemove = "DELETE FROM tblbrand WHERE BrandID = ?";

    async function gettaxName(){
        async function query(){
            return new Promise((resolve, reject)=>{
                 db.query("SELECT Tax_Name FROM tbltax WHERE TaxID = ?",[id],(err,result)=>{
                    if (err){
                        reject(err);
                        console.log(err);
                    }
                    else{
                        resolve(result[0].Tax_Name);

                    }
                })
           })
        } 
        const result = await query()
        return result
    }
    const taxName = await gettaxName();

    db.query(sqlRemove, id, (err, result) => {
        if(err){
            console.log(err);
        }
        else{
           res.send(result) 
           logs={
            AuditUserCode:req.session.user.id,
            AuditModule:"Adjustment-Tax",
            AuditAction:`Updated Tax: ${taxName} `
        }
        audit.logger(logs);
        }
    })
    ;
}

function getBrand(req, res){
    const sqlSelect = "SELECT Brand_Name FROM tblbrand WHERE Status = 'active'";
  
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
    getBrnd: getBrand
}