const db = require('../main.db');
const multer = require('multer');
const express = require('express');


const storage = multer.diskStorage({
    destination: './productImages',
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})


function displayData(req, res){
    const sqlSelect="SELECT `productID`, `productName`, `productDescription`, (SELECT Attribute_Name FROM tblattributes WHERE Attr_ID = `productAttribute`) AS `productAttribute`, (SELECT Value_Name FROM tblattributesvalue WHERE Value_ID = `productAttrValue`) AS `productAttrValue`, `productPrice`, (SELECT Category_Name FROM tblcategory WHERE CategoryID = `productCategory`) AS `productCategory`, (SELECT Brand_Name FROM tblbrand WHERE BrandID = `productBrand`) AS `productBrand`, (SELECT Supplier_ComName FROM tblsupplier WHERE SupplierID = `productSupplier`) AS `productSupplier`, `productReqPres`, `productSKU`, `productStatus` FROM `tblproducts`";
    db.query(sqlSelect,(err,result) => {
       res.send(result);
    });
}

async function uploadImg(req,res){

    let upload = multer({ storage: storage}).single('productImage');

    upload(req, res, function(err) {

        if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }
        else{
            res.send("Uploaded: "+ req.file.filename);
            const ImageAdd = req.file.filename;
            console.log(ImageAdd);
            return ImageAdd;
            
        }
        const productName = req.body.productName;
        const productDescription = req.body.productDescription;
        const productAttribute = req.body.productAttribute;
        const productAttrValue = req.body.productAttrValue;
        const productPrice = req.body.productPrice;
        const productCategory = req.body.productCategory;
        const productBrand = req.body.productBrand;
        const productSupplier = req.body.productSupplier;
        const productSKU = req.body.productSKU;
        const prodStatus = req.body.productStatus;
        var productReqPres = req.body.productReqPres;
        console.log(productName)
        res.send("Uploaded: "+ req.file.filename + " " + productName);
        

        return ImageAdd;


    });

    



}


async function insertData(req, res){
    const productName = req.body.productName;
    const productDescription = req.body.productDescription;
    const productAttribute = req.body.productAttribute;
    const productAttrValue = req.body.productAttrValue;
    const productPrice = req.body.productPrice;
    const productCategory = req.body.productCategory;
    const productBrand = req.body.productBrand;
    const productSupplier = req.body.productSupplier;
    const productSKU = req.body.productSKU;
    const prodStatus = req.body.productStatus;
    var productReqPres = req.body.productReqPres;
    var ImageAdd;

    let upload = multer({ storage: storage}).single('productImage');

    upload(req, res, function(err) {

        if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }
        else{
            res.send("Uploaded: "+ req.file.filename);
            const ImageAdd = req.file.filename;
            console.log(ImageAdd);
            return ImageAdd;
            
        }












    // async function getBrandName(){

    //     async function query(){
    //         return new Promise((resolve, reject)=>{
    //             db.query("SELECT Brand_Name FROM tblbrand WHERE BrandID = ?",[productBrand],(err,result)=>{
    //                 if (err){
    //                     reject(err);
    //                 }
    //                 else{
    //                     resolve(result[0].Brand_Name);
    //                 }
    //         })
    //       })



    //     }

    //         const result = await query()
    //         return result.replace(/\s+/g, '').substring(0,4).toUpperCase();



    // }
    //  const skuBrand = await getBrandName()
    if (productReqPres == null){
        productReqPres = 0;
    }

    const sqlInsert = "INSERT INTO tblproducts (productImage, productName, productDescription, productAttribute, productAttrValue, productPrice, productCategory, productBrand, productSupplier, productSKU, productReqPres, productStatus) Values (?,?,?,?,?,?,?,?,?,?,?,?)"

    db.query(sqlInsert, [ImageAdd,productName, productDescription, productAttribute, productAttrValue, productPrice,productCategory,
        productBrand, productSupplier, productSKU, productReqPres, prodStatus] , (err,result) => {
        console.log(err);
    });
}}

function insertDataExl(req, res){

    const data = req.body.data;
    var newReqPres;
    const status = "active";

data.map((rows)=>{
    if (rows.productReqPres == "X"){
       newReqPres = "" ;
    }
    else{
        newReqPres = rows.productReqPres;
    }

    const sqlInsert = "INSERT INTO tblproducts (`productName`, `productDescription`, `productAttribute`, `productAttrValue`, `productPrice`, `productCategory`, `productBrand`, `productSupplier`, `productReqPres`, `productSKU`, `productStatus`) Values (?,?,(SELECT Attr_ID FROM tblattributes WHERE Attribute_Name = ?),(SELECT Value_ID FROM tblattributesvalue Where Value_Name = ?),?,(SELECT CategoryID FROM tblcategory WHERE Category_Name=?),(SELECT BrandID from tblbrand WHERE Brand_Name =?),(SELECT SupplierID from tblsupplier WHERE Supplier_ComName =?),?,?,?)"

    db.query(sqlInsert, [rows.productName, rows.productDescription, rows.productAttribute, rows.productAttrValue, rows.productPrice,rows.productCategory,
        rows.productBrand, rows.productSupplier, newReqPres, rows.productSKU,  status] , (err,result) => {
        console.log(err);
    });
})

}


function getData(req, res){
    const PID = req.params.id;

    const sqlSelectID = "SELECT `productID`, `productName`, `productDescription`, (SELECT Attribute_Name FROM tblattributes WHERE Attr_ID = `productAttribute`) AS `productAttribute`, (SELECT Value_Name FROM tblattributesvalue WHERE Value_ID = `productAttrValue`) AS `productAttrValue`, `productPrice`, (SELECT Category_Name FROM tblcategory WHERE CategoryID = `productCategory`) AS `productCategory`, (SELECT Brand_Name FROM tblbrand WHERE BrandID = `productBrand`) AS `productBrand`, (SELECT Supplier_ComName FROM tblsupplier WHERE SupplierID = `productSupplier`) AS `productSupplier`, `productReqPres`, `productSKU`, `productStatus` FROM `tblproducts` WHERE productID = ?";

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
    const productPrice = req.body.productPrice;
    const productCategory = req.body.productCategory;
    const productBrand = req.body.productBrand;
    const productSupplier = req.body.productSupplier;
    const productSKU = req.body.productSKU;
    const prodStatus = req.body.productStatus;
    var productReqPres = req.body.productReqPres;

    // if (productReqPres === null){
    //     productReqPres = '0';
    // }

    const sqlUpdate = "UPDATE tblproducts SET productName = ?, productDescription = ?, productAttribute = ?, productAttrValue = ?, productPrice = ?,productCategory = ?, productBrand = ?, productSupplier = ?, productReqPres = ?, productSKU = ?, productStatus = ? WHERE productID = ?";

    db.query(sqlUpdate, [productName, productDescription, productAttribute, productAttrValue, productPrice, productCategory, productBrand,productSupplier, productReqPres, productSKU, prodStatus, PID], (err, result) => {
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
        res.send(result);
    });
}

module.exports = {
    display: displayData,
    insert: insertData,
    uploadImg: uploadImg,
    insertExl: insertDataExl,
    get: getData,
    update: updateData,
    delete: deleteData
}