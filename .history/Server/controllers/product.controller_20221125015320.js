const db = require('../main.db');
const multer = require('multer');
const multerAzure=require('multer-azure');
const express = require('express');
const path = require('path');
const audit = require('./auditlog.controller');

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"./uploads/productImages");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

function displayData(req, res){
    const sqlSelect="SELECT  `productID`,`productImage`, `productName`, `productDescription`, (SELECT Attribute_Name FROM tblattributes WHERE Attr_ID = `productAttribute`) AS `productAttribute`, (SELECT Value_Name FROM tblattributesvalue WHERE Value_ID = `productAttrValue`) AS `productAttrValue`, `productPrice`, (SELECT Category_Name FROM tblcategory WHERE CategoryID = `productCategory`) AS `productCategory`, (SELECT Brand_Name FROM tblbrand WHERE BrandID = `productBrand`) AS `productBrand`, `productAvailability`, `productSKU`, `productStatus` FROM `tblproducts`";
    db.query(sqlSelect,(err,result) => {
       res.send(result);
    });
}
    

async function insertData(req, res){
    //let upload = multer({ storage: storage}).single('productImage');
    let upload = multer({ 
    storage: multerAzure({
    connectionString: 'DefaultEndpointsProtocol=https;AccountName=cs1100320004a5f1cb9;AccountKey=zP8hGADHmGqIkwNNUHrPEP7WbW7AwRNUbqQfV0WwCvdA71ZQJDvoVWAdW32M30BDXaPuDpLks2X8+AStc2zDow==;EndpointSuffix=core.windows.net', //Connection String for azure storage account, this one is prefered if you specified, fallback to account and key if not.
    account: 'cs1100320004a5f1cb9', //The name of the Azure storage account
    key: 'zP8hGADHmGqIkwNNUHrPEP7WbW7AwRNUbqQfV0WwCvdA71ZQJDvoVWAdW32M30BDXaPuDpLks2X8+AStc2zDow==', //A key listed under Access keys in the storage account pane
    container: 'productimage',  //Any container name, it will be created if it doesn't exist
  })
}).single('productImage');
    upload(req, res, async function(err) {

        if (err instanceof multer.MulterError) {
            console.log("error: "err)
            return res.send("Multer err\n"+err);
            
        }
        else if (err) {
            console.log(err)
            return res.send(err);
        }
        else{
            var productImage;
            console.log(req.file)
            if (!req.file){
                productImage = null;
            }
            else{
                productImage = req.file.filename;
            }
            
            const productName = req.body.productName;
            const productDescription = req.body.productDescription;
            const productAttribute = req.body.productAttribute;
            const productAttrValue = req.body.productAttrValue;
            const productPrice = req.body.productPrice;
            const productCategory = req.body.productCategory;
            const productBrand = req.body.productBrand;
            const prodStatus = req.body.productStatus;
            const productAvailability = req.body.productAvailability;

            async function getBrandName(){
                async function query(){
                    return new Promise((resolve, reject)=>{
                         db.query("SELECT Brand_Name FROM tblbrand WHERE BrandID = ?",[productBrand],(err,result)=>{
                            if (err){
                                reject(err);
                            }
                            else{
                                resolve(result[0].Brand_Name);
                            }
                        })
                   })
                }

                const result = await query()
                return result.replace(/\s+/g, '').substring(0,4).toUpperCase();
            }

            async function getCategoryName(){
                async function query(){
                    return new Promise((resolve, reject)=>{
                        db.query("SELECT Category_Name FROM tblcategory WHERE CategoryID = ?",[productCategory],(err,result)=>{
                            if (err) {
                                reject(err);
                                console.log(err);
                            }
                            else{
                                resolve(result[0].Category_Name);
                            }
                        })
                   })
                }

                const result = await query()
                return result.replace(/\s+/g, '').substring(0,4).toUpperCase();
            }
            
            async function getAttrValue(){
                async function query(){
                    return new Promise((resolve, reject)=>{
                        db.query("SELECT Value_Name FROM tblattributesvalue WHERE Value_ID = ?",[productAttrValue],(err,result)=>{
                            if (err) {
                                reject(err);
                                console.log(err);
                            }
                            else{
                                resolve(result[0].Value_Name);
                                console.log(result[0].Value_Name)
                            }
                        })
                   })
                }
                const result = await query()
                return result.split(' ').map(word => word.replace(/[^a-zA-Z0-9]/g, "")).map(word => word.replace(/[aeiou]/gi, '')).join('').toUpperCase();
            }
            async function getAttrName(){
                async function query(){
                    return new Promise((resolve, reject)=>{
                        db.query("SELECT Attribute_Name FROM tblattributes WHERE Attr_ID = ?",[productAttribute],(err,result)=>{
                            if (err) {
                                reject(err);
                                console.log(err);
                            }
                            else{
                                resolve(result[0].Attribute_Name);
                                console.log(result[0].Attribute_Name)
                            }
                        })
                   })
                }
                const result = await query()
                return result.split(' ').map(word => word[0]).join('').toUpperCase();
            }

            const skuProdName = productName.replace(/\s+/g, '').replace(/[^\w\s]/gi, '').substring(0,4).toUpperCase();
            const skuProdNameInitials = productName.match(/\b(\w)/g).join('').toUpperCase();
            const skuAttrValue = await getAttrValue();
            const skuBrand = await getBrandName();
            const skuCategory = await getCategoryName();
            const skuPrice = productPrice;
            const skuAttrName = await getAttrName();

            const productSKU = skuProdName+skuProdNameInitials+skuPrice+"-"+skuAttrName+skuAttrValue+"-"+skuBrand+"-"+skuCategory;

            const sqlInsert = "INSERT INTO tblproducts (productImage, productName, productDescription, productAttribute, productAttrValue, productPrice, productCategory, productBrand, productSKU, productAvailability, productStatus) Values (?,?,?,?,?,?,?,?,?,?,?)"
        
            db.query(sqlInsert, [productImage,productName, productDescription, productAttribute, productAttrValue, productPrice,productCategory,
                productBrand, productSKU, productAvailability, prodStatus] , (err,result) => {
                if (err){
                    res.send(err);
                    console.log(err);
                }
                else{
                    logs={
                        AuditUserCode:req.session.user.id,
                        
                        AuditModule:"Product-Masterlist",
                        AuditAction:`Inserted Product: ${productName} (${productSKU})`
                    }
                    audit.logger(logs);
                    res.send("Inserted Successfully.");
                }
            });
        }
    })
}

function getData(req, res){
    const PID = req.params.id;

    const sqlSelectID = "SELECT * FROM `tblproducts` WHERE productID = ?";

    db.query(sqlSelectID, [PID], (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result[0]);
        console.log(result[0]);
    });
}

async function updateData(req, res){

    let upload = multer({ storage: storage}).single('productImage');

    upload(req, res, async function(err) {

        if (err instanceof multer.MulterError) {
            return res.send("Multer err\n"+err);
        }
        else if (err) {
            return res.send(err);
        }
        else{
            var productImage;
            if (!req.file){
                productImage = null;
            }
            else{
                productImage = req.file.filename;
            }
            
            const PID = req.params.id;
            const productName = req.body.productName;
            const productDescription = req.body.productDescription;
            const productAttribute = req.body.productAttribute;
            const productAttrValue = req.body.productAttrValue;
            const productPrice = req.body.productPrice;
            const productCategory = req.body.productCategory;
            const productBrand = req.body.productBrand;
            //const productSupplier = req.body.productSupplier;
            const prodStatus = req.body.productStatus;
            const productAvailability = req.body.productAvailability;
            console.log("product image: " + productImage);
            console.log("product attr: " + productAttribute);
            console.log("product attr val: " + productAttrValue);
            console.log("product brand: " + productBrand);
            console.log("product categ: " + productCategory);
           // console.log("product supplier: " + productSupplier);

           async function getBrandName(){
            async function query(){
                return new Promise((resolve, reject)=>{
                     db.query("SELECT Brand_Name FROM tblbrand WHERE BrandID = ?",[productBrand],(err,result)=>{
                        if (err){
                            reject(err);
                        }
                        else{
                            resolve(result[0].Brand_Name);
                        }
                    })
               })
            }

            const result = await query()
            return result.replace(/\s+/g, '').substring(0,4).toUpperCase();
        }

        async function getCategoryName(){
            async function query(){
                return new Promise((resolve, reject)=>{
                    db.query("SELECT Category_Name FROM tblcategory WHERE CategoryID = ?",[productCategory],(err,result)=>{
                        if (err) {
                            reject(err);
                            console.log(err);
                        }
                        else{
                            resolve(result[0].Category_Name);
                        }
                    })
               })
            }

            const result = await query()
            return result.replace(/\s+/g, '').substring(0,4).toUpperCase();
        }

        
        
        async function getAttrValue(){
            async function query(){
                return new Promise((resolve, reject)=>{
                    db.query("SELECT Value_Name FROM tblattributesvalue WHERE Value_ID = ?",[productAttrValue],(err,result)=>{
                        if (err) {
                            reject(err);
                            console.log(err);
                        }
                        else{
                            resolve(result[0].Value_Name);
                            console.log(result[0].Value_Name)
                        }
                    })
               })
            }
            const result = await query()
            return result.split(' ').map(word => word.replace(/[^a-zA-Z0-9]/g, "")).map(word => word.replace(/[aeiou]/gi, '')).join('').toUpperCase();
        }
        async function getAttrName(){
            async function query(){
                return new Promise((resolve, reject)=>{
                    db.query("SELECT Attribute_Name FROM tblattributes WHERE Attr_ID = ?",[productAttribute],(err,result)=>{
                        if (err) {
                            reject(err);
                            console.log(err);
                        }
                        else{
                            resolve(result[0].Attribute_Name);
                            console.log(result[0].Attribute_Name)
                        }
                    })
               })
            }
            const result = await query()
            return result.split(' ').map(word => word[0]).join('').toUpperCase();
        }

        const skuProdName = productName.replace(/\s+/g, '').replace(/[^\w\s]/gi, '').substring(0,4).toUpperCase();
        const skuProdNameInitials = productName.match(/\b(\w)/g).join('').toUpperCase();
        const skuAttrValue = await getAttrValue();
        const skuBrand = await getBrandName();
        const skuCategory = await getCategoryName();
        const skuPrice = productPrice;
        const skuAttrName = await getAttrName();
        
        const productSKU = skuProdName+skuProdNameInitials+skuPrice+"-"+skuAttrName+skuAttrValue+"-"+skuBrand+"-"+skuCategory;
            if (!productImage){
                  //const sqlUpdate = "UPDATE tblproducts SET productName = ?, productDescription = ?, productAttribute = (SELECT Attr_ID FROM tblattributes WHERE Attribute_Name = ?), productAttrValue = (SELECT Value_ID  FROM tblattributesvalue WHERE Value_Name = ?), productPrice = ?,productCategory = (SELECT CategoryID FROM tblcategory WHERE Category_Name = ?), productBrand = (SELECT BrandID FROM tblbrand WHERE Brand_Name = ?),productSKU = ?, productAvailability = ?, productStatus = ? WHERE productID = ?";
                const sqlUpdate = "UPDATE tblproducts SET productName = ?, productDescription = ?, productAttribute = ?, productAttrValue = ?, productPrice = ?, productCategory = ?, productBrand = ?, productAvailability = ?,productSKU = ?, productStatus = ? WHERE productID = ?";

                db.query(sqlUpdate, [productName, productDescription, productAttribute, productAttrValue, productPrice, productCategory, productBrand,  productAvailability, productSKU, prodStatus, PID], (err, result) => {
                    if(err){
                        console.log(err);
                    }
                    else{
                    res.send(result);
                    console.log(result);
                    logs={
                        AuditUserCode:req.session.user.id,
                        
                        AuditModule:"Product-Masterlist",
                        AuditAction:`Updated Product : ${productName} (${productSKU})`
                    }
                    audit.logger(logs);
                    }
                    
                });
            }
            else{
                const sqlUpdate = "UPDATE tblproducts SET productImage = ?, productName = ?, productDescription = ?, productAttribute = ?, productAttrValue = ?, productPrice = ?, productCategory = ?, productBrand = ?, productSKU = ?, productAvailability = ?, productStatus = ? WHERE productID = ?";

                db.query(sqlUpdate, [productImage, productName, productDescription, productAttribute, productAttrValue, productPrice, productCategory, productBrand,productSKU, productAvailability,  prodStatus, PID], (err, result) => {
                    if(err){
                        console.log(err);
                    }
                    else{
                    res.send(result);
                    console.log(result);
                    logs={
                        AuditUserCode:req.session.user.id,
                        
                        AuditModule:"Product-Masterlist",
                        AuditAction:`Updated Product : ${productName} (${productSKU})`
                    }
                    audit.logger(logs);
                    }
                    
                });
            }
        }
    })
}

async function deleteData(req, res){
    const PID = req.params.PID;
    const sqlDelete="DELETE FROM tblproducts WHERE productID = ?";

    async function getSKU(){
        async function query(){
            return new Promise((resolve, reject)=>{
                db.query("SELECT productSKU FROM tblproducts WHERE productID = ?",[PID],(err,result)=>{
                    if (err) {
                        reject(err);
                        console.log(err);
                    }
                    else{
                        resolve(result[0]);
                        
                    }
                })
        })
        }
        const result = await query()
        return result
    }
    const obtainedSKU = await getSKU();

    db.query(sqlDelete, PID,(err,result)=>{
        res.send(result);
        console.log(result);
        logs={
            AuditUserCode:req.session.user.id,
            
            AuditModule:"Product-Masterlist",
            AuditAction:`Deleted Product : ${obtainedSKU.productSKU}`
        }
        audit.logger(logs);
    });
}

module.exports = {
    display: displayData,
    insert: insertData,
    // insertExl: insertDataExl,
    get: getData,
    update: updateData,
    delete: deleteData
}