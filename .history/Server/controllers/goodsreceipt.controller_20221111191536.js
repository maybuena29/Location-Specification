const e = require('express');
const db = require('../main.db');
const audit = require('./auditlog.controller'); 

function displayData(req, res){
    const sqlSelect = "SELECT `goodsID`, `GRNumber`, (SELECT Supplier_ComName FROM tblsupplier WHERE SupplierID = (SELECT Supplier FROM tblpurchaseorder WHERE PONumber = GR.PONumber)) AS `Supplier`, (SELECT PODelDate FROM tblpurchaseorder WHERE PONumber = GR.PONumber) AS `DueDate`, `DateDelivered`, `Remarks`, `Status` FROM `tblgoodsreceiptpo` GR";

    db.query(sqlSelect, (err, result) => {
        res.send(result);
        console.log(result);
    });
};

function insertData(req, res){
    
    const PoNumber = req.body.PoNumber
    const GrNumber = req.body.GrNumber
    const DateDel = req.body.DateDeliver
    const Remarks = req.body.Remarks
    const Status = 'pending'

    const sqlInsert = "INSERT INTO `tblgoodsreceiptpo`(`GRNumber`, `PONumber`, `DateDelivered`, `Remarks`, `Status`) VALUES (?, ?, ?, ?, ?)";

    db.query(sqlInsert, [GrNumber, PoNumber, DateDel, Remarks, Status], (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            console.log(result);
             res.send(result);
        logs={
            AuditUserCode:req.session.user.id,
            AuditModule:"Goods Receipt PO",
            AuditAction:`Inserted a GRPO ${GRNumber} from ${PoNumber}`
        }
        audit.logger(logs);
        }
        
    });
    
}

function getData(req, res){
    const id = req.params.id;
    const sqlSelect = "SELECT `goodsID`, `GRNumber`, `PONumber`, (SELECT Supplier_ComName FROM tblsupplier WHERE SupplierID = (SELECT Supplier FROM tblpurchaseorder WHERE PONumber = GR.PONumber)) AS `Supplier`, (SELECT PODelDate FROM tblpurchaseorder WHERE PONumber = GR.PONumber) AS `DueDate`, `DateDelivered`, `Remarks`, `Status` FROM `tblgoodsreceiptpo` GR WHERE `GRNumber` = ?";

    db.query(sqlSelect, id, (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result[0]);
        console.log(result[0]);
    });
}

// function updateData(req, res){
//     const id = req.params.id;
//     const PoSupplier = req.body.Supplier
//     const PoDeliveryDate = req.body.DelDate
//     const Remarks = req.body.Remarks

//     const sqlUpdate = "UPDATE `tblpurchaseorder` SET `Supplier`=?, `PODelDate`=?, `PORemarks`=? WHERE PONumber = ?";

//     db.query(sqlUpdate, [PoSupplier, PoDeliveryDate, Remarks, id], (err, result) => {
//         if(err){
//             console.log(err);
//         }
//         res.send(result);
//         console.log(result);
//     });
// }

function deleteData(req, res){
    
    const id = req.params.id;
    const sqlRemove = "DELETE FROM tbldiscount WHERE DiscountID = ?";

    db.query(sqlRemove, id, (err, result) => {
        if(err){
            console.log(err);
        }
    });
}

function getPurchaseItems(req, res){
    const id = req.params.id;
    const sqlSelect = "SELECT `pItemID`, `pItemQuantity`, `productID`, (SELECT productSKU FROM tblproducts WHERE productID = PI.productID) AS `productSKU`, (SELECT Category_Name FROM tblcategory WHERE CategoryID = (SELECT productCategory FROM tblproducts WHERE productID = PI.productID)) AS `productCategory`, (SELECT productName FROM tblproducts WHERE productID = PI.productID) AS `productName`, (SELECT productPrice FROM tblproducts WHERE productID = PI.productID) AS `productPrice`, `poMarkup`, `pSalesPrice`, `pExpiryDate`, `pDiscount`, `pNetPrice`, `pAmount`, `parentPO_ID` FROM `tblpurchaseitems` PI WHERE parentPO_ID = ?";

    db.query(sqlSelect, id, (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result);
    });
}

function getGoodsItem(req, res){
    const id = req.params.id;
    const sqlSelect = "SELECT `gItemID`, `gItemQuantity`, `productID`, (SELECT productSKU FROM tblproducts WHERE productID = GR.productID) AS `productSKU`, (SELECT Category_Name FROM tblcategory WHERE CategoryID = (SELECT productCategory FROM tblproducts WHERE productID = GR.productID)) AS `productCategory`, (SELECT productName FROM tblproducts WHERE productID = GR.productID) AS `productName`, (SELECT productPrice FROM tblproducts WHERE productID = GR.productID) AS `productPrice`, `gMarkup`, `gSalesPrice`, `gExpiryDate`, `gDiscount`, `gNetPrice`, `gAmount`, `parentGR_ID` FROM `tblgoodsitems` GR WHERE parentGR_ID = ?";

    db.query(sqlSelect, id, (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result);
    });
}

function updatePurchaseOrderStatus(req, res){
    const id = req.params.id;
    const status = req.body.POStatus;

    const sqlUpdate = "UPDATE `tblpurchaseorder` SET `POStatus` = ? WHERE `PONumber` = ?";

    db.query(sqlUpdate, [status, id], (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
            console.log(result);
       
        }
        
    });
}

function insertGoodsItems(req, res){

    const quantity = req.body.Quantity
    const prodID = req.body.ProductID
    const markup = req.body.Markup
    const salesPrice = req.body.SalesPrice
    const expDate = req.body.ExpiryDate
    const discount = req.body.Discount
    // const tax = req.body.Tax
    const netPrice = req.body.NetPrice
    const amount = req.body.Amount
    const grNumber = req.body.GRNumber
    
    const sqlInsert = "INSERT INTO `tblgoodsitems`(`gItemQuantity`, `productID`, `gMarkup`, `gSalesPrice`, `gExpiryDate`, `gDiscount`, `gNetPrice`, `gAmount`, `parentGR_ID`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    db.query(sqlInsert, [quantity, prodID, markup, salesPrice, expDate, discount, netPrice, amount, grNumber], (err, result) => {
        console.log(result);
        res.send(result);
    });
}

function getSupplierName(req, res){

    const id = req.params.id;
    const sqlSelect = "SELECT `Supplier_ComName` FROM `tblsupplier` WHERE `SupplierID` = (SELECT Supplier FROM `tblpurchaseorder` WHERE `PONumber` = ?)";

    db.query(sqlSelect, id, (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result[0]);
    });

}

module.exports = {
    display: displayData,
    insert: insertData,
    get: getData,
    delete: deleteData,
    getSupplier: getSupplierName,
    getItems: getPurchaseItems,
    getGoodItem: getGoodsItem,
    updatePoStatus: updatePurchaseOrderStatus,
    insertItems: insertGoodsItems,
    // updateItems: updatePurchaseItems,
}