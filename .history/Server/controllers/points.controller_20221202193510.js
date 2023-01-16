const db = require('../main.db');
const audit =require('./auditlog.controller');

function displayData(req, res){
    const sqlSelect = "SELECT `PntCustID`, `CustCode`, (SELECT CustName FROM tblcustomer WHERE CustCode =CP.CustCode) AS CustName, (SELECT Contact FROM tblcustomer WHERE CustCode = CP.CustCode) AS Contact, (SELECT count(*) FROM tblorders WHERE CustomerCode = CP.CustCode) AS TotalPurchased, `TotalPoints`, `LastUpdate` FROM `tblcustomerpoints` CP";

    db.query(sqlSelect, (err, result) => {
        res.send(result);
        console.log(result);
    });
};

function insertData(req, res){
    
    
    const CustCode = req.body.CustCode
    const point = req.body.Point
    const sqlInsert = "INSERT INTO `tblcustomerpoints`(`CustCode`, `TotalPoints`, `LastUpdate`) VALUES (?, ?, (SELECT now())) ON DUPLICATE KEY UPDATE `TotalPoints` = (`TotalPoints` + ?), `LastUpdate` = (SELECT now())";

    db.query(sqlInsert, [PoNumber, PoSupplier, PoDeliveryDate, Remarks, PoDateCreated, Status], (err, result) => {
        if (err){
        console.log(result);
        res.send(result);
        }
        else{
            console.log(result);
            res.send(result);
            logs={
                AuditUserCode:req.session.user.id,
                AuditModule:"Supplier-Purchase Order",
                AuditAction:`New PO: ${PoNumber} (${Status})`
            }
            audit.logger(logs);
        }
    });
    
}

function getData(req, res){
    const id = req.params.id;
    const sqlSelect = "SELECT * FROM tblpurchaseorder WHERE PONumber = ?";

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
    const PoSupplier = req.body.Supplier
    const PoDeliveryDate = req.body.DelDate
    const Remarks = req.body.Remarks

    const sqlUpdate = "UPDATE `tblpurchaseorder` SET `Supplier`=?, `PODelDate`=?, `PORemarks`=? WHERE PONumber = ?";

    db.query(sqlUpdate, [PoSupplier, PoDeliveryDate, Remarks, id], (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result);
        console.log(result);
        logs={
            AuditUserCode:req.session.user.id,
            AuditModule:"Supplier-Purchase Order",
            AuditAction:`Updated PO: ${id}`
        }
        audit.logger(logs);
    });
}

function deleteData(req, res){
    
    const id = req.params.id;
    const sqlRemove = "DELETE FROM tbldiscount WHERE DiscountID = ?";

    db.query(sqlRemove, id, (err, result) => {
        if(err){
            console.log(err);
        }
        logs={
            AuditUserCode:req.session.user.id,
            AuditModule:"Supplier-Purchase Order",
            AuditAction:`Deleted PO: ${id}`
        }
        audit.logger(logs);
    });
}


// function getPoNumberList(req, res){
//     const sqlSelect = "SELECT `PONumber` FROM `tblpurchaseorder` WHERE `POStatus` = 'pending' OR `POStatus` = 'back order'";

//     db.query(sqlSelect, (err, result) => {
//         res.send(result);
//         console.log(result);
//     });
// };


// function getPurchaseItems(req, res){
//     const id = req.params.id;
//     const sqlSelect = "SELECT `pItemID`, `pItemQuantity`, `productID`, (SELECT productSKU FROM tblproducts WHERE productID = PI.productID) AS `productSKU`, (SELECT Category_Name FROM tblcategory WHERE CategoryID = (SELECT productCategory FROM tblproducts WHERE productID = PI.productID)) AS `productCategory`, (SELECT productName FROM tblproducts WHERE productID = PI.productID) AS `productName`, (SELECT productDescription FROM tblproducts WHERE productID = PI.productID) AS `productDescription`, (SELECT productPrice FROM tblproducts WHERE productID = PI.productID) AS `productPrice`, `pNetPrice`, `pAmount`, `parentPO_ID`, `pStatus` FROM `tblpurchaseitems` PI WHERE parentPO_ID = ? AND `pStatus` = (SELECT POStatus FROM tblpurchaseorder WHERE `PONumber` = ?)";

//     db.query(sqlSelect, [id, id], (err, result) => {
//         if(err){
//             console.log(err);
//         }
//         res.send(result);
//     });
// }

// function insertPurchaseItems(req, res){

//     const quantity = req.body.Quantity
//     const prodID = req.body.ProductID
//     // const markup = req.body.Markup
//     // const salesPrice = req.body.SalesPrice
//     // const expDate = req.body.ExpiryDate
//     // const discount = req.body.Discount
//     // const tax = req.body.Tax
//     const netPrice = req.body.NetPrice
//     const amount = req.body.Amount
//     const poNumber = req.body.PONumber
//     const status = req.body.POStatus
    
//     const sqlInsert = "INSERT INTO `tblpurchaseitems`(`pItemQuantity`, `productID`, `pNetPrice`, `pAmount`, `parentPO_ID`, `pStatus`) VALUES (?, ?, ?, ?, ?, ?)";

//     db.query(sqlInsert, [quantity, prodID, netPrice, amount, poNumber, status], (err, result) => {
//         console.log(result);
//         res.send(result);
//     });
// }

// function updatePurchaseItems(req, res){

//     const quantity = req.body.Quantity
//     const prodID = req.body.ProductID
//     // const markup = req.body.Markup
//     // const salesPrice = req.body.SalesPrice
//     // const expDate = req.body.ExpiryDate
//     // const discount = req.body.Discount
//     // const tax = req.body.Tax
//     const netPrice = req.body.NetPrice
//     const amount = req.body.Amount
//     const poNumber = req.body.PONumber
//     const status = req.body.POStatus

//     const sqlInsert = "REPLACE INTO `tblpurchaseitems`(`pItemQuantity`, `productID`, `pNetPrice`, `pAmount`, `parentPO_ID`, `pStatus`) VALUES (?, ?, ?, ?, ?, ?)";

//     db.query(sqlInsert, [quantity, prodID, netPrice, amount, poNumber, status], (err, result) => {
//         if (err){
//             console.log(err)
//         }
//         else{
//         console.log("result sa update:");
//         console.log(result);
//         res.send(result);
        
//         logs={
//             AuditUserCode:req.session.user.id,
//             AuditModule:"Supplier-Purchase Order",
//             AuditAction:`Inserted Purchase Item from PO: ${poNumber}`
//         }
//         audit.logger(logs);
    
//         }
        
//     });
// }

// function updateItemStatus(req, res){
//     const poNumber = req.body.PONumber
//     const status = req.body.POStatus
//     const prodID = req.body.ProductID

//     const sqlInsert = "UPDATE `tblpurchaseitems` SET `pStatus`=? WHERE `parentPO_ID`=? AND `pStatus`='pending' AND `productID`=?";

//     db.query(sqlInsert, [status, poNumber, prodID], (err, result) => {
//         if (err){
//             console.log(err)
//         }
//         else{
//             console.log("result sa update:");
//         console.log(result);
//         res.send(result);
//             logs={
//                 AuditUserCode:req.session.user.id,
//                 AuditModule:"Supplier-Purchase Order",
//                 AuditAction:`Updated Purchase Item from PO: ${poNumber}`
//             }
//             audit.logger(logs);
//         }
//     });
// }


module.exports = {
    display: displayData,
    insert: insertData,
    get: getData,
    update: updateData,
    delete: deleteData,
    // getPOList: getPoNumberList,
    // getItems: getPurchaseItems,
    // insertItems: insertPurchaseItems,
    // updateItems: updatePurchaseItems,
    // updateItmStatus: updateItemStatus,
}