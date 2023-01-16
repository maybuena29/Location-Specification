const db = require('../main.db');
const audit = require('./auditlog.controller'); 

function displayData(req, res){
    const sqlSelect = "SELECT `invoiceID`, `invoiceNumber`, `totalNetPrice`, `totalAmount`, `GRNumber`, (SELECT PONumber FROM `tblgoodsreceiptpo` WHERE GRNumber = AP.GRNumber) AS PONumber, (SELECT Supplier_ComName FROM tblsupplier WHERE SupplierID = (SELECT Supplier FROM tblpurchaseorder WHERE PONumber = (SELECT PONumber FROM `tblgoodsreceiptpo` WHERE GRNumber = AP.GRNumber))) AS `Supplier`, (SELECT PODelDate FROM tblpurchaseorder WHERE PONumber = (SELECT PONumber FROM `tblgoodsreceiptpo` WHERE GRNumber = AP.GRNumber)) AS `DueDate`, `invoiceDate`, `paymentMode`, `Remarks`, `Status` FROM `tblapinvoice` AP";

    db.query(sqlSelect, (err, result) => {
        res.send(result);
        console.log(result);
    });
};

function insertData(req, res){
    
    const InvoiceNumber = req.body.InvoiceNumber
    const GrNumber = req.body.GrNumber
    const totalNet = req.body.TotalNetPrice
    const totalAmount = req.body.TotalAmount
    const InvoiceDate = req.body.InvoiceDate
    const paymentMode = req.body.PaymentMode
    const Remarks = req.body.Remarks
    const Status = 'success'

    const sqlInsert = "INSERT INTO `tblapinvoice`(`invoiceNumber`, `totalNetPrice`, `totalAmount`, `GRNumber`, `invoiceDate`, `paymentMode`, `Remarks`, `Status`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    db.query(sqlInsert, [InvoiceNumber, totalNet, totalAmount, GrNumber, InvoiceDate, paymentMode, Remarks, Status], (err, result) => {
        if (err){
            console.log(err);
        }
        else{
            console.log(result);
            res.send(result);
            logs={
                AuditUserCode:req.session.user.id,
                AuditModule:"AP Invoice",
                AuditAction:`Inserted an APInvoice Data: ${InvoiceNumber}`
            }
            audit.logger()
        }
        
    });
    
}

function getData(req, res){
    const id = req.params.id;
    const sqlSelect = "SELECT `invoiceID`, `invoiceNumber`, `GRNumber`, (SELECT PONumber FROM `tblgoodsreceiptpo` WHERE GRNumber = AP.GRNumber) AS PONumber, (SELECT Supplier_ComName FROM tblsupplier WHERE SupplierID = (SELECT Supplier FROM tblpurchaseorder WHERE PONumber = (SELECT PONumber FROM `tblgoodsreceiptpo` WHERE GRNumber = AP.GRNumber))) AS `Supplier`, (SELECT PODelDate FROM tblpurchaseorder WHERE PONumber = (SELECT PONumber FROM `tblgoodsreceiptpo` WHERE GRNumber = AP.GRNumber)) AS `DueDate`, `invoiceDate`, `Remarks`, `paymentMode`, `Status` FROM `tblapinvoice` AP WHERE `invoiceNumber` = ?";

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

function getGrNumberList(req, res){
    const sqlSelect = "SELECT `GRNumber` FROM `tblgoodsreceiptpo` WHERE `Status` = 'pending'";

    db.query(sqlSelect, (err, result) => {
        res.send(result);
        console.log(result);
    });
}

function getGoodsItem(req, res){
    const id = req.params.id;
    const sqlSelect = "SELECT `gItemID`, `gItemQuantity`, `productID`, (SELECT productSKU FROM tblproducts WHERE productID = GR.productID) AS `productSKU`, (SELECT Category_Name FROM tblcategory WHERE CategoryID = (SELECT productCategory FROM tblproducts WHERE productID = GR.productID)) AS `productCategory`, (SELECT productName FROM tblproducts WHERE productID = GR.productID) AS `productName`, (SELECT productPrice FROM tblproducts WHERE productID = GR.productID) AS `productPrice`, `gMarkup`, `gSalesPrice`, `gExpiryDate`, `gDiscount`, `gTax`, `gNetPrice`, `gAmount`, `parentGR_ID` FROM `tblgoodsitems` GR WHERE parentGR_ID = ?";

    db.query(sqlSelect, id, (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result);
    });
}

function updateGoodsReceiptStatus(req, res){
    const id = req.params.id;
    const status = 'paid'

    const sqlUpdate = "UPDATE `tblgoodsreceiptpo` SET `Status` = ? WHERE `GRNumber` = ?";

    db.query(sqlUpdate, [status, id], (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result);
        console.log(result);
    });
}

// function insertGoodsItems(req, res){

//     const quantity = req.body.Quantity
//     const prodID = req.body.ProductID
//     const markup = req.body.Markup
//     const salesPrice = req.body.SalesPrice
//     const expDate = req.body.ExpiryDate
//     const discount = req.body.Discount
//     const tax = req.body.Tax
//     const netPrice = req.body.NetPrice
//     const amount = req.body.Amount
//     const grNumber = req.body.GRNumber
    
//     const sqlInsert = "INSERT INTO `tblgoodsitems`(`gItemQuantity`, `productID`, `gMarkup`, `gSalesPrice`, `gExpiryDate`, `gDiscount`, `gTax`, `gNetPrice`, `gAmount`, `parentGR_ID`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

//     db.query(sqlInsert, [quantity, prodID, markup, salesPrice, expDate, discount, tax, netPrice, amount, grNumber], (err, result) => {
//         console.log(result);
//         res.send(result);
//     });
// }

module.exports = {
    display: displayData,
    insert: insertData,
    get: getData,
    delete: deleteData,
    getGrList: getGrNumberList,
    getGoodItem: getGoodsItem,
    updateGrStatus: updateGoodsReceiptStatus,
    // getSupplier: getSupplierName,
    // getItems: getPurchaseItems,
    // insertItems: insertGoodsItems,
    // updateItems: updatePurchaseItems,
}