const db = require('../main.db');

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
        console.log(result);
    });
  
}
function insertDataExl(req, res){
    const data = req.body.data;
    const Status = "Active";

    data.map((rows)=>{
        const sqlInsert = "INSERT INTO tblcategory (Category_Name, CatStatus) VALUES (?,?)";
  
        db.query(sqlInsert, [rows.productCategory, Status], (err, result) => {
            console.log(result);
    
            console.log(err);
        });
    })
    
  
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
        res.send(result);
    });
  
}
  
function deleteData(req, res){
    const id = req.params.id;
    const sqlRemove = "DELETE FROM tblcategory WHERE CategoryID = ?";
    db.query(sqlRemove, id, (err, result) => {
        if(err){
            console.log(err);
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
    insertExl: insertDataExl,
    get: getData,
    update: updateData,
    delete: deleteData,
    getCat: getCategory
}