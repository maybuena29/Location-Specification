const db = require('../main.db');
const multer = require('multer');




function displayData(req, res){
    const sqlSelect="SELECT * FROM tblinventory";
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
    const invQuantity = req.body.inventoryQuantity;
    const invDateManu = req.body.inventoryDateManu;
    const invDateExp = req.body.inventoryDateExp;
    const invStatus = req.body.inventoryStatus;
    var productReqPres = req.body.productReqPres;
        

    if (productReqPres == null){
        productReqPres = 0; 
    }

    const sqlInsert = "INSERT INTO tblinventory (productName, productDescription, productAttribute, productAttrValue, productPrice, productCategory, productBrand, productSupplier, productSKU, productReqPres, inventoryStatus,inventoryQuantity,inventoryDateManu,inventoryDateExp) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
        
    db.query(sqlInsert, [productName, productDescription, productAttribute, productAttrValue, productPrice,productCategory,
        productBrand, productSupplier, productSKU, productReqPres, invStatus,invQuantity,invDateManu,invDateExp] , (err,result) => {
        console.log(err);
    });
}
function insertDataExl(req, res){

    // //const PImage = req.body.PImage;
    // const productName = req.body.productName;
    // const productDescription = req.body.productDescription;
    // // const productSize = req.body.productSize;
    // // const productUnit = req.body.productUnit;
    // // const productDosage = req.body.productDosage;
    // const productAttribute = req.body.productAttribute;
    // const productAttrValue = req.body.productAttrValue;
    // const productPrice = req.body.productPrice;
    // const productCategory = req.body.productCategory;
    // const productBrand = req.body.productBrand;
    // const productSupplier = req.body.productSupplier;
    // const productSKU = req.body.productSKU;
    // const invQuantity = req.body.inventoryQuantity;
    // const invDateManu = req.body.inventoryDateManu;
    // const invDateExp = req.body.inventoryDateExp;
    // const invStatus = req.body.inventoryStatus;
    // var productReqPres = req.body.productReqPres;
        

    // if (productReqPres == null){
    //     productReqPres = 0; 
    // }

    const sqlInsert = "INSERT INTO tblinventory Values (?)" 
    // (?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
        
    // db.query(sqlInsert, [productName, productDescription, productAttribute, productAttrValue, productPrice,productCategory,
    //     productBrand, productSupplier, productSKU, productReqPres, invStatus,invQuantity,invDateManu,invDateExp] , (err,result) => {
    //     console.log(err);
    // });
    const ExcelData = req.body.data;

    //console.log(req.body);
    //res.send(ExcelData)
    db.query(sqlInsert,JSON.stringify(ExcelData),(err)=>{
        console.log(err);
    })
}
function getData(req, res){
    const invID = req.params.id;
    
    const sqlSelectID = "SELECT * FROM tblinventory WHERE inventoryID = ?";
    console.log(invID);
    db.query(sqlSelectID, [invID], (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result[0]);
        console.log(result[0]);
    });
}
   
function updateData(req, res){
    const invID = req.params.id;
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
    const invStatus = req.body.inventoryStatus;
    const productSKU = req.body.productSKU;
    const invQuantity = req.body.inventoryQuantity;
    const invDateManu = req.body.inventoryDateManu;
    const invDateExp = req.body.inventoryDateExp
    
    var productReqPres = req.body.productReqPres;
      
    // if (productReqPres === null){
    //     productReqPres = '0';
    // }

    const sqlUpdate = "UPDATE tblinventory SET productName = ?, productDescription = ?, productAttribute = ?, productAttrValue = ?, productPrice = ?,productCategory = ?, productBrand = ?, productSupplier = ?, productSKU = ?, productReqPres = ?, inventoryStatus = ?,inventoryQuantity = ?,inventoryDateManu = ?,inventoryDateExp = ? WHERE inventoryID = ?";

    db.query(sqlUpdate, [productName, productDescription, productAttribute, productAttrValue, productPrice, productCategory, productBrand,productSupplier,productSKU, productReqPres, invStatus,invQuantity,invDateManu,invDateExp, invID], (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result);
        console.log(result);
    });
}

function deleteData(req, res){
    const invID = req.params.invID;
    const sqlDelete="DELETE FROM tblinventory WHERE inventoryID = ?";

    db.query(sqlDelete, [invID],(err,result)=>{
        console.log(err);
        res.send(result);
        console.log(sqlDelete+" "+invID);
    });    
}

function getSKUData(req, res){
    const SKU = req.params.SKU;
    
    const sqlSelectSKU = "SELECT * FROM tblproducts WHERE productSKU = ?";
    console.log("getSKUData");
    db.query(sqlSelectSKU, [SKU], (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result[0]);
        console.log(result[0]);
        console.log("getSKUData");
    });  
}
function getListSKU(req, res){
    
    const sqlSelectSKUs = "SELECT productSKU FROM tblproducts";
    console.log("getListSKU");
    db.query(sqlSelectSKUs, (err, result) => {
        if(err){
            console.log(err);
        }
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
    skuData: getSKUData,
    ListSKU: getListSKU,
    insertExl:insertDataExl
}