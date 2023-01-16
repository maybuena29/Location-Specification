const db = require('../main.db');
const audit = require('./auditlog.controller');

function displayData(req, res){
    const sqlSelect = "SELECT * FROM tblcategory";

    db.query(sqlSelect, (err, result) => {
        res.send(result);
        console.log(result);
    });
  
}

function insertData(req, res){
    const CategoryName = req.body.CategoryName
    const Status = req.body.Status
    const sqlInsert = "INSERT INTO tblcategory (Category_Name, CatStatus) VALUES (?,?)";
  
    db.query(sqlInsert, [CategoryName, Status], (err, result) => {
        if (err){
            console.log(err)
        }
        else{
            logs={
                AuditUserCode:req.session.user.id,
                AuditModule:"Product-Category",
                AuditAction:`Inserted Category: ${CategoryName}`
            }
            audit.logger(logs);
        }
    });
  
}
  
function getData(req, res){
    const id = req.params.id;
    const sqlSelect = "SELECT * FROM tblcategory WHERE CategoryID = ?";
  
    db.query(sqlSelect, id, (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result[0]);
    });
}

function updateData(req, res){
    const id = req.params.id;
    const CategoryName = req.body.CategoryName
    const Status = req.body.Status
  
    const sqlSelect = "UPDATE tblcategory SET Category_Name = ?, CatStatus = ? WHERE CategoryID = ?";

    db.query(sqlSelect, [CategoryName, Status, id], (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
            logs={
                AuditUserCode:req.session.user.id,
                AuditModule:"Product-Category",
                AuditAction:`Updated Category: ${CategoryName} (${id})`
            }
            audit.logger(logs);
        }
        
    });
  
}

async function deleteData(req, res){
    const id = req.params.id;
    const sqlRemove = "DELETE FROM tblcategory WHERE CategoryID = ?";
    async function getCategoryName(){
        async function query(){
            return new Promise((resolve, reject)=>{
                 db.query("SELECT Category_Name FROM tblcategory WHERE CategoryID = ?",[id],(err,result)=>{
                    if (err){
                        reject(err);
                        console.log(err);
                    }
                    else{
                        resolve(result[0].Category_Name);
                        
                        
                    }
                })
           })
        } 
    }
    const CategoryName = await getCategoryName();


    db.query(sqlRemove, id, (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            logs={
                AuditUserCode:req.session.user.id,
                AuditModule:"Product-Category",
                AuditAction:`Deleted Data: ${CategoryName} (${id})`
            }
            audit.logger(logs);
        }
        

    });
      
}

function getCategory(req, res){

    const sqlSelect = "SELECT CategoryID, Category_Name FROM tblcategory WHERE CatStatus = 'active'";
    
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
    getCat: getCategory
}