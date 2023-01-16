const db = require('../main.db');

function displayData(req, res){
    const sqlSelect="SELECT I.inventoryID, P.productName, P.productDescription, (SELECT Attribute_Name FROM tblattributes WHERE Attr_ID = P.productAttribute) AS `productAttribute`, (SELECT Value_Name FROM tblattributesvalue WHERE Value_ID = P.productAttrValue) AS `productAttrValue`, P.productPrice, (SELECT Category_Name FROM tblcategory WHERE CategoryID = P.productCategory) AS `productCategory`, (SELECT Brand_Name FROM tblbrand WHERE BrandID = P.productBrand) AS `productBrand`, (SELECT Supplier_ComName FROM tblsupplier WHERE SupplierID = P.productSupplier) AS `productSupplier`, P.productReqPres, P.productSKU, I.inventoryQuantity, I.inventoryDateExp, I.inventoryDateManu, I.inventoryStatus FROM tblinventory I INNER JOIN tblproducts P ON I.productID = P.productID";
    db.query(sqlSelect,(err,result)=>{
       res.send(result);
    });
}

function insertDataExl(req, res){
    const data = req.body.data;
    
    data.map((rows)=>{
        const sqlInsert = "INSERT INTO tblinventory (productID, inventoryStatus,inventoryQuantity,inventoryDateManu,inventoryDateExp) Values ((SELECT productID FROM tblproducts WHERE productSKU = ?), ?, ?, ?, ?)";
        
        db.query(sqlInsert, [rows.productSKU, rows.inventoryStatus, rows.inventoryQuantity, rows.inventoryDateManu, rows.inventoryDateExp], (err,result) => {
            if (err) {console.log(err);}
            else{
                console.log(" successfully added");
            }
        });

    })
    
}

function insertData(req, res){
    const productSKU = req.body.productSKU;
    const invQuantity = req.body.inventoryQuantity;
    const invDateManu = req.body.inventoryDateManu;
    const invDateExp = req.body.inventoryDateExp;
    const invStatus = req.body.inventoryStatus;
    var productReqPres = req.body.productReqPres;
        

    if (productReqPres == null){
        productReqPres = 0; 
    }

    const sqlInsert = "INSERT INTO tblinventory (productID, inventoryStatus,inventoryQuantity,inventoryDateManu,inventoryDateExp) Values ((SELECT productID FROM tblproducts WHERE productSKU = ?), ?, ?, ?, ?)";
        
    db.query(sqlInsert, [productSKU, invStatus, invQuantity, invDateManu, invDateExp], (err,result) => {
        console.log(err);
    });
}
function insertData(req, res){
    const productSKU = req.body.productSKU;
    const invQuantity = req.body.inventoryQuantity;
    const invDateManu = req.body.inventoryDateManu;
    const invDateExp = req.body.inventoryDateExp;
    const invStatus = req.body.inventoryStatus;
    var productReqPres = req.body.productReqPres;
        

    if (productReqPres == null){
        productReqPres = 0; 
    }

    const sqlInsert = "INSERT INTO tblinventory (productID, inventoryStatus,inventoryQuantity,inventoryDateManu,inventoryDateExp) Values ((SELECT productID FROM tblproducts WHERE productSKU = ?), ?, ?, ?, ?)";
        
    db.query(sqlInsert, [productSKU, invStatus, invQuantity, invDateManu, invDateExp], (err,result) => {
        console.log(err);
    });
}

function getData(req, res){
    const invID = req.params.id;
    
    const sqlSelectID = "SELECT I.inventoryID, P.productName, P.productDescription, (SELECT Attribute_Name FROM tblattributes WHERE Attr_ID = P.productAttribute) AS `productAttribute`, (SELECT Value_Name FROM tblattributesvalue WHERE Value_ID = P.productAttrValue) AS `productAttrValue`, P.productPrice, (SELECT Category_Name FROM tblcategory WHERE CategoryID = P.productCategory) AS `productCategory`, (SELECT Brand_Name FROM tblbrand WHERE BrandID = P.productBrand) AS `productBrand`, (SELECT Supplier_ComName FROM tblsupplier WHERE SupplierID = P.productSupplier) AS `productSupplier`, P.productReqPres, P.productSKU, I.inventoryQuantity, I.inventoryDateExp, I.inventoryDateManu, I.inventoryStatus FROM tblinventory I INNER JOIN tblproducts P ON I.productID = P.productID WHERE inventoryID = ?";

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

    const sqlUpdate = "UPDATE tblinventory SET productID = (SELECT productID FROM tblproducts WHERE productSKU = ?), inventoryStatus = ?, inventoryQuantity = ?, inventoryDateManu = ?, inventoryDateExp = ? WHERE inventoryID = ?";

    db.query(sqlUpdate, [productSKU, invStatus, invQuantity, invDateManu, invDateExp, invID], (err, result) => {
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
    const sqlSelect = "SELECT I.inventoryID, P.productName, P.productDescription, (SELECT Attribute_Name FROM tblattributes WHERE Attr_ID = P.productAttribute) AS `productAttribute`, (SELECT Value_Name FROM tblattributesvalue WHERE Value_ID = P.productAttrValue) AS `productAttrValue`, P.productPrice, (SELECT Category_Name FROM tblcategory WHERE CategoryID = P.productCategory) AS `productCategory`, (SELECT Brand_Name FROM tblbrand WHERE BrandID = P.productBrand) AS `productBrand`, (SELECT Supplier_ComName FROM tblsupplier WHERE SupplierID = P.productSupplier) AS `productSupplier`, P.productReqPres, P.productSKU, I.inventoryQuantity, I.inventoryDateExp, I.inventoryDateManu, I.inventoryStatus FROM tblinventory I INNER JOIN tblproducts P ON I.productID = P.productID WHERE inventoryStatus = 'active'";
    db.query(sqlSelect, (err, result) => {
        if(result) res.send(result)
        else res.send([])
    });

}

function getSKUData(req, res){
    const SKU = req.params.SKU;
    
    const sqlSelectSKU = "SELECT * FROM tblproducts WHERE productSKU = ?";
    
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

module.exports = {
    display: displayData,
    insert: insertData,
    insertExl: insertDataExl,
    get: getData,
    update: updateData,
    delete: deleteData,
    getActive: getActiveProd,
    skuData: getSKUData,
    ListSKU: getListSKU,
}