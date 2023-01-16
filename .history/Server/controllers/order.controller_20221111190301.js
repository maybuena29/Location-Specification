
const db = require('../main.db');

function displayData(req, res){
    const sqlSelect = "SELECT `OrderID`, `ReferenceNumber`, (SELECT CustName FROM tblcustomer WHERE CustomerCode = `CustomerCode`) AS CustName, `TotalProducts`, `TotalAmount`, `Date`, `Time`, `Status` FROM `tblorders`";

    db.query(sqlSelect, (err, result) => {
        res.send(result);
        console.log(result);
    });
};

function insertData(req, res){
    
    const RefNumber = req.body.RefNumber
    const CustCode = req.body.CustCode
    const TotalProducts = req.body.TotalProducts
    const TotalAmount = req.body.TotalAmount
    const Date = req.body.Date
    const Time = req.body.Time
    const Status = req.body.Status

    const sqlInsert = "INSERT INTO `tblorders`(`ReferenceNumber`, `CustomerCode`, `TotalProducts`, `TotalAmount`, `Date`, `Time`, `Status`) VALUES (?, ?, ?, ?, ?, ?, ?)";

    const sqlInsert = "INSERT INTO `tblorders`(`ReferenceNumber`, `CustomerCode`, `TotalProducts`, `TotalAmount`, `TotalTax`, `TotalDiscount`, `Date`, `Time`, `Status`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    db.query(sqlInsert, [RefNumber, CustCode, TotalProducts, TotalAmount, TotalTax, TotalDisc, Date, Time, Status], (err, result) => {
        if (err){
            console.log(err);
        }
        else{

        console.log(result);
        res.send(result);
        logs={
            AuditUserCode:req.session.user.id,
            AuditModule:"POS-Order",
            AuditAction:`Inserted Order: ${RefNumber}`
        }

        audit.logger(logs);

        }
        
    });
    
}

function getData(req, res){
    const id = req.params.id;
    const sqlSelect = "SELECT * FROM tblorders WHERE OrderID = ?";

    db.query(sqlSelect, id, (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result[0]);
        console.log(result[0]);
    });
}

async function updateData(req, res){
    const id = req.params.id;
    const Status = req.body.Status

    const sqlSelect = "UPDATE tblorders SET Status = ? WHERE OrderID = ?";

    db.query(sqlSelect, [Status, id], (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result);
        logs={
            AuditUserCode:req.session.user.id,
            AuditModule:"POS-Order",
            AuditAction:`Updated Order: ${id} (${Status})`
        }
        audit.logger(logs);

    });
}

// function deleteData(req, res){
    
//     const id = req.params.id;
//     const sqlRemove = "DELETE FROM tblbrand WHERE BrandID = ?";

//     db.query(sqlRemove, id, (err, result) => {
//         if(err){
//             console.log(err);
//         }
//     });
// }

// function getBrand(req, res){
//     const sqlSelect = "SELECT Brand_Name FROM tblbrand WHERE Status = 'active'";
  
//     db.query(sqlSelect, (err, result) => {
//         res.send(result);
//         console.log(result);
//     });
// }


//QUERY FOR ORDER ITEMS TABLE IN DATABASE
function insertDataOrdsItem(req, res){
    
    const InventoryID = req.body.InventoryID
    const ReferenceNumber = req.body.ReferenceNumber
    const ProductPrice = req.body.ProductPrice
    const Quantity = req.body.Quantity
    const Discount = req.body.Discount
    const Tax = req.body.Tax

    const sqlInsert = "INSERT INTO `tblorderitems`(`productID`, `ReferenceNumber`, `productPrice`, `quantity`, `discount`, `tax`) VALUES ((SELECT productID FROM tblinventory WHERE inventoryID = ?), ?, ?, ?, ?, ?)";

    db.query(sqlInsert, [InventoryID, ReferenceNumber, ProductPrice, Quantity, Discount, Tax], (err, result) => {
        if(err){
            console.log(err);
        }
        else{
        res.send(result);
           logs={
            AuditUserCode:req.session.user.id,
            AuditModule:"POS-Order",
            AuditAction:`Inserted Data to Orders: ${ReferenceNumber}`
        }
        audit.logger(logs);
        }
        
    });
    
}

function getOrderItems(req, res){
    const id = req.params.id;
    const sqlSelect = "SELECT `itemOrderID`, (SELECT productName FROM tblproducts WHERE productID = o.productID) as productName, `productPrice`, SUM(`quantity`) AS quantity, `discount`, `tax` FROM `tblorderitems` o WHERE `ReferenceNumber` = ? GROUP BY productID, productPrice";

    db.query(sqlSelect, id, (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result);
    });
}

function updateInventory(req, res){
    const id = req.params.id;
    const quantity = req.body.Quantity

    const sqlSelect = "UPDATE `tblinventory` SET `inventoryQuantity`= (inventoryQuantity - ?) WHERE inventoryID = ?;";
    db.query(sqlSelect, [quantity, id], (err, result) => {
        if(err){
            console.log(err);
        }
        else{
        console.log(result);
        res.send(result);
    });
    
}

module.exports = {
    display: displayData,
    insert: insertData,
    get: getData,
    update: updateData,
    // delete: deleteData,
    // getBrnd: getBrand
    insertItem: insertDataOrdsItem
}