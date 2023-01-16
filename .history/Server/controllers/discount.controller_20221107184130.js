const db = require('../main.db');
const audit = require('./auditlog.controller'); 
function displayData(req, res){
    const sqlSelect = "SELECT * FROM tbldiscount";

    db.query(sqlSelect, (err, result) => {
        res.send(result);
        console.log(result);
    });
};

function insertData(req, res){
    
    const discName = req.body.DiscountName
    const discValue = req.body.DiscountValue
    const Status = req.body.Status

    const sqlInsert = "INSERT INTO tbldiscount (Discount_Name, Discount_Value, Status) VALUES (?,?,?)";

    db.query(sqlInsert, [discName, discValue, Status], (err, result) => {
        if (err){
            console.log(result);
         }
        else{
            logs={
                AuditUserCode:req.session.user.id,
                AuditModule:"Adjustment-Discounts ",
                AuditAction:`Inserted New Discount: ${discName} ${discValue}%`
            }
            audit.logger(logs);
            console.log(result);
        }
    });
    
}

function getData(req, res){
    const id = req.params.id;
    const sqlSelect = "SELECT * FROM tbldiscount WHERE DiscountID = ?";

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
    const discName = req.body.DiscountName
    const discValue = req.body.DiscountValue
    const Status = req.body.Status

    const sqlSelect = "UPDATE tbldiscount SET Discount_Name = ?, Discount_Value = ?, Status = ? WHERE DiscountID = ?";

    db.query(sqlSelect, [discName, discValue, Status, id], (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
            console.log(result);
        logs={
            AuditUserCode:req.session.user.id,
            AuditModule:"Adjustment-Discounts ",
            AuditAction:`Updates Discount: ${discName} ${discValue}% (${id})`
        }
        audit.logger(logs);
        }
        
    });
}

async function deleteData(req, res){
    
    const id = req.params.id;
    const sqlRemove = "DELETE FROM tbldiscount WHERE DiscountID = ?";

    async function getDiscountName(){
        async function query(){
            return new Promise((resolve, reject)=>{
                 db.query("SELECT Discount_Name FROM tbldiscount WHERE DiscountID = ?",[id],(err,result)=>{
                    if (err){
                        reject(err);
                        console.log(err);
                    }
                    else{
                        resolve(result[0].Discount_Name);
                        
                        
                    }
                })
           })
        } 
    }
    const DiscountName = await getDiscountName();

    db.query(sqlRemove, id, (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
            console.log(result);
            logs={
                AuditUserCode:req.session.user.id,
                AuditModule:"Adjustment-Discounts",
                AuditAction:`Deleted Discount: ${DiscountName} (${id})`
            }
        }


    });
}

function getDiscount(req, res){
    const sqlSelect = "SELECT DiscountID, Discount_Name, Discount_Value FROM tbldiscount WHERE Status = 'active'";
  
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
    getDisc: getDiscount
}