const db = require('../main.db');
const audit = require('./auditlog.controller');

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
        if (err){
            console.log(err)
        }
        else{
            console.log(result);
            logs={
                AuditUserCode:req.session.user.id,
                AuditModule:"Adjustment-Tax",
                AuditAction:`New Tax: ${taxName} `
            }
            audit.logger(logs);
        }
        
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
    const sqlRemove = "DELETE FROM tbltax WHERE TaxID = ?";

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