const db = require('../main.db');


function displayData(req, res){
    const sqlSelect="SELECT I.inventoryID, P.productImage, P.productName, P.productDescription, (SELECT Attribute_Name FROM tblattributes WHERE Attr_ID = P.productAttribute) AS `productAttribute`, (SELECT Value_Name FROM tblattributesvalue WHERE Value_ID = P.productAttrValue) AS `productAttrValue`, (SELECT Category_Name FROM tblcategory WHERE CategoryID = P.productCategory) AS `productCategory`, (SELECT Brand_Name FROM tblbrand WHERE BrandID = P.productBrand) AS `productBrand`, (SELECT Supplier_ComName FROM tblsupplier WHERE SupplierID = I.Supplier) AS `Supplier`, P.productAvailability, P.productSKU, I.inventoryQuantity, I.inventorySalesPrice, I.inventoryDateExp, I.inventoryStatus FROM tblinventory I INNER JOIN tblproducts P ON I.productID = P.productID";
    db.query(sqlSelect,(err,result)=>{
       res.send(result);
    });
}

function insertData(req, res){
    const productID = req.body.ProductID;
    const invQuantity = req.body.Quantity;
    const invSalesPrice = req.body.SalesPrice;
    const supplier = req.body.Supplier;
    const invDateExp = req.body.ExpiryDate;
    const invStatus = req.body.Status;

    const sqlInsert = "INSERT INTO `tblinventory`(`productID`, `inventoryQuantity`, `inventorySalesPrice`, `Supplier`, `inventoryDateExp`, `inventoryStatus`) VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE `inventoryQuantity` = (`inventoryQuantity` + ?)";
    
    db.query(sqlInsert, [productID, invQuantity, invSalesPrice, supplier, invDateExp, invStatus, invQuantity], (err,result) => {
        if (err){
            console.log(err);
            }
            else{
                logs={
                    AuditUserCode:req.session.user.id,
                    AuditModule:"Inventory",
                    AuditAction:`Inserted a stock to ${productID} by ${invQuantity}`
                }
                audit.logger(logs);
                console.log(result);
            res.send(result);
            }
    });
}

function getData(req, res){
    const invID = req.params.id;
    
    const sqlSelectID = "SELECT I.inventoryID, P.productImage, P.productName, P.productDescription, (SELECT Attribute_Name FROM tblattributes WHERE Attr_ID = P.productAttribute) AS `productAttribute`, (SELECT Value_Name FROM tblattributesvalue WHERE Value_ID = P.productAttrValue) AS `productAttrValue`, P.productPrice, (SELECT Category_Name FROM tblcategory WHERE CategoryID = P.productCategory) AS `productCategory`, (SELECT Brand_Name FROM tblbrand WHERE BrandID = P.productBrand) AS `productBrand`, (SELECT Supplier_ComName FROM tblsupplier WHERE SupplierID = I.Supplier) AS `Supplier`, P.productAvailability, P.productSKU, I.inventoryQuantity, I.inventoryDateExp, I.inventoryStatus FROM tblinventory I INNER JOIN tblproducts P ON I.productID = P.productID WHERE inventoryID = ?";

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
    const productPrice = req.body.productPrice;
    const productCategory = req.body.productCategory;
    const productBrand = req.body.productBrand;
    // const productSupplier = req.body.productSupplier;
    const invStatus = req.body.inventoryStatus;
    const productSKU = req.body.productSKU;
    const invQuantity = req.body.inventoryQuantity;
    const invDateExp = req.body.inventoryDateExp
    
    var productReqPres = req.body.productReqPres;

    const sqlUpdate = "UPDATE tblinventory SET productID = (SELECT productID FROM tblproducts WHERE productSKU = ?), inventoryStatus = ?, inventoryQuantity = ?, inventoryDateExp = ? WHERE inventoryID = ?";

    db.query(sqlUpdate, [productSKU, invStatus, invQuantity, invDateExp, invID], (err, result) => {
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
        if(err){
            alert("You cannot delete this data.");
        }
        res.send(result);
    });    
}

function getActiveProd(req, res){
    const sqlSelect = "SELECT I.inventoryID, P.productImage, P.productName, P.productDescription, (SELECT Attribute_Name FROM tblattributes WHERE Attr_ID = P.productAttribute) AS `productAttribute`, (SELECT Value_Name FROM tblattributesvalue WHERE Value_ID = P.productAttrValue) AS `productAttrValue`, P.productPrice, I.inventorySalesPrice, (SELECT Category_Name FROM tblcategory WHERE CategoryID = P.productCategory) AS `productCategory`, (SELECT Brand_Name FROM tblbrand WHERE BrandID = P.productBrand) AS `productBrand`, `Supplier`, P.productAvailability, P.productSKU, I.inventoryQuantity, I.inventoryDateExp, I.inventoryStatus FROM tblinventory I INNER JOIN tblproducts P ON I.productID = P.productID WHERE inventoryStatus = 'active'";
    db.query(sqlSelect, (err, result) => {
        if(result) res.send(result)
        else res.send([])
    });

}

function getSKUData(req, res){
    const SKU = req.params.SKU;
    
    const sqlSelectSKU = "SELECT `productID`, `productImage`, `productName`, `productDescription`, `productAttribute`, `productAttrValue`, `productPrice`, (SELECT Category_Name FROM tblcategory WHERE CategoryID = `productCategory`) AS `productCategory`, `productBrand`, `productAvailability`, `productSKU`, `productStatus` FROM `tblproducts` WHERE `productSKU` = ?";
    
    db.query(sqlSelectSKU, [SKU], (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result[0]);
    });  
}

function getListSKU(req, res){
    
    const sqlSelectSKUs = "SELECT productSKU FROM tblproducts";

    db.query(sqlSelectSKUs, (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result);
    });  
}

function getCriticalLevelProduct(req, res){
        
    const sqlSelect = "SELECT I.inventoryID, P.productImage, P.productName, P.productDescription, (SELECT Attribute_Name FROM tblattributes WHERE Attr_ID = P.productAttribute) AS `productAttribute`, (SELECT Value_Name FROM tblattributesvalue WHERE Value_ID = P.productAttrValue) AS `productAttrValue`, (SELECT Category_Name FROM tblcategory WHERE CategoryID = P.productCategory) AS `productCategory`, (SELECT Brand_Name FROM tblbrand WHERE BrandID = P.productBrand) AS `productBrand`, (SELECT Supplier_ComName FROM tblsupplier WHERE SupplierID = I.Supplier) AS `Supplier`, P.productAvailability, P.productSKU, I.inventoryQuantity, I.inventorySalesPrice, I.inventoryDateExp, I.inventoryStatus, (SELECT 'critical') AS notifType FROM tblinventory I INNER JOIN tblproducts P ON I.productID = P.productID";

    db.query(sqlSelect, (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result);
    }); 
}

function getNearToExpireItem(req, res){
        
    const sqlSelect = "SELECT I.inventoryID, P.productImage, P.productName, P.productDescription, (SELECT Attribute_Name FROM tblattributes WHERE Attr_ID = P.productAttribute) AS `productAttribute`, (SELECT Value_Name FROM tblattributesvalue WHERE Value_ID = P.productAttrValue) AS `productAttrValue`, (SELECT Category_Name FROM tblcategory WHERE CategoryID = P.productCategory) AS `productCategory`, (SELECT Brand_Name FROM tblbrand WHERE BrandID = P.productBrand) AS `productBrand`, (SELECT Supplier_ComName FROM tblsupplier WHERE SupplierID = I.Supplier) AS `Supplier`, P.productAvailability, P.productSKU, I.inventoryQuantity, I.inventorySalesPrice, I.inventoryDateExp, I.inventoryStatus, (SELECT 'near-to-expire') AS notifType FROM tblinventory I INNER JOIN tblproducts P ON I.productID = P.productID WHERE DATE_FORMAT(I.inventoryDateExp, '%Y/%m/%d') <= DATE_ADD(DATE_FORMAT(NOW(), '%Y/%m/%d'), INTERVAL 30 DAY)";

    db.query(sqlSelect, (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result);
    }); 
}

function getExpiredItem(req, res){
        
    const sqlSelect = "SELECT I.inventoryID, P.productImage, P.productName, P.productDescription, (SELECT Attribute_Name FROM tblattributes WHERE Attr_ID = P.productAttribute) AS `productAttribute`, (SELECT Value_Name FROM tblattributesvalue WHERE Value_ID = P.productAttrValue) AS `productAttrValue`, (SELECT Category_Name FROM tblcategory WHERE CategoryID = P.productCategory) AS `productCategory`, (SELECT Brand_Name FROM tblbrand WHERE BrandID = P.productBrand) AS `productBrand`, (SELECT Supplier_ComName FROM tblsupplier WHERE SupplierID = I.Supplier) AS `Supplier`, P.productAvailability, P.productSKU, I.inventoryQuantity, I.inventorySalesPrice, I.inventoryDateExp, I.inventoryStatus, (SELECT 'expired') AS notifType FROM tblinventory I INNER JOIN tblproducts P ON I.productID = P.productID WHERE DATE_FORMAT(I.inventoryDateExp, '%Y/%m/%d') < DATE_FORMAT(NOW(), '%Y/%m/%d')";

    db.query(sqlSelect, (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result);
    }); 
}

module.exports = {
    display: displayData,
    insert: insertData,
    get: getData,
    update: updateData,
    delete: deleteData,
    getActive: getActiveProd,
    skuData: getSKUData,
    ListSKU: getListSKU,
    getCriticalProduct: getCriticalLevelProduct,
    nearToExpire: getNearToExpireItem,
    expired: getExpiredItem,
}