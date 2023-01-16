const db = require('../main.db');

function displayData(req, res){
    const sqlSelect="SELECT * FROM tblproducts";
    db.query(sqlSelect,(err,result)=>{
       res.send(result);
    });
}

function insertData(req, res){

    //const PImage = req.body.PImage;
    const productName = req.body.productName;
    const productDescription = req.body.productDescription;
    // const productSize = req.body.productSize;
    // const productUnit = req.body.productUnit;
    // const productDosage = req.body.productDosage;
    const productAttribute = req.body.productAttribute;
    const productAttrValue = req.body.productAttrValue;
    const productPrice = req.body.productPrice;
    const productCategory = req.body.productCategory;
    const productBrand = req.body.productBrand;
    const productSupplier = req.body.productSupplier;
    const productSKU = req.body.productSKU;
    const prodStatus = req.body.productStatus;
    var productReqPres = req.body.productReqPres;
        

    if (productReqPres == null){
        productReqPres = 0; 
    }
    console.log("Insert: "+productSKU);
    const sqlInsert = "INSERT INTO tblproducts (productName, productDescription, productAttribute, productAttrValue, productPrice, productCategory, productBrand, productSupplier, productSKU, productReqPres, productStatus) Values (?,?,?,?,?,?,?,?,?,?,?)"
        
    db.query(sqlInsert, [productName, productDescription, productAttribute, productAttrValue, productPrice,productCategory,
        productBrand, productSupplier, productSKU, productReqPres, prodStatus] , (err,result) => {
        console.log(err);
    });
}

function getData(req, res){
    const PID = req.params.id;
    
    const sqlSelectID = "SELECT * FROM tblproducts WHERE productID = ?";
    console.log(PID);
    db.query(sqlSelectID, [PID], (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result[0]);
        console.log(result[0]);
    });
}
   
function updateData(req, res){
    const PID = req.params.id;
    const productName = req.body.productName;
    const productDescription = req.body.productDescription;
    const productAttribute = req.body.productAttribute;
    const productAttrValue = req.body.productAttrValue;
    // const productSize = req.body.productSize;
    // const productUnit = req.body.productUnit;
    // const productDosage = req.body.productDosage;
    const productPrice = req.body.productPrice;
    const productCategory = req.body.productCategory;
    const productBrand = req.body.productBrand;
    const productSupplier = req.body.productSupplier;
    const prodStatus = req.body.productStatus;
    const productSKU = req.body.productSKU;
    var productReqPres = req.body.productReqPres;
      
    // if (productReqPres === null){
    //     productReqPres = '0';
    // }

    const sqlUpdate = "UPDATE tblproducts SET productName = ?, productDescription = ?, productAttribute = ?, productAttrValue = ?, productPrice = ?,productCategory = ?, productBrand = ?, productSupplier = ?, productSKU = ?, productReqPres = ?, productStatus = ? WHERE productID = ?";

    db.query(sqlUpdate, [productName, productDescription, productAttribute, productAttrValue, productPrice, productCategory, productBrand,productSupplier,productSKU, productReqPres, prodStatus, PID], (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result);
        console.log(result);
    });
}

function deleteData(req, res){
    const PID = req.params.PID;
    const sqlDelete="DELETE FROM tblproducts WHERE productID = ?";

    db.query(sqlDelete, PID,(err,result)=>{
        console.log(err);
        res.send(result);
    });    
}

module.exports = {
    display: displayData,
    insert: insertData,
    get: getData,
    update: updateData,
    delete: deleteData
}