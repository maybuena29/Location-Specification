const db = require('../main.db');

function displayData(req, res){
    const sqlSelect = "SELECT `OrderID`, `ReferenceNumber`, (SELECT CustName FROM tblcustomer WHERE CustomerCode = `CustomerCode`) AS CustName, `TotalProducts`, `TotalAmount`, `TotalTax`, `TotalDiscount`, `Date`, TIME_FORMAT(`Time`, '%h:%i %p') as 'Time', `Status` FROM `tblorders`";

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
    const TotalTax = req.body.TotalTax
    const TotalDisc = req.body.TotalDiscount
    const Status = 'paid'

    console.log("ref number: " + RefNumber);
    console.log("cust code: " + CustCode);
    console.log("Total products: " + TotalProducts);
    console.log("total amount: " + TotalAmount);
    console.log("date: " + Date);
    console.log("time: " + Time);
    console.log("total tax: " + TotalTax);
    console.log("total disc: " + TotalDisc);
    console.log("status: " + Status);

    const sqlInsert = "INSERT INTO `tblorders`(`ReferenceNumber`, `CustomerCode`, `TotalProducts`, `TotalAmount`, `TotalTax`, `TotalDiscount`, `Date`, `Time`, `Status`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    db.query(sqlInsert, [RefNumber, CustCode, TotalProducts, TotalAmount, TotalTax, TotalDisc, Date, Time, Status], (err, result) => {
        console.log(result);
        res.send(result);
    });
    
}

function getData(req, res){
    const id = req.params.id;
    const sqlSelect = "SELECT `OrderID`, `ReferenceNumber`, CustomerCode, (SELECT CustName FROM tblcustomer WHERE CustomerCode = `CustomerCode`) AS CustName, `TotalProducts`, `TotalAmount`, `TotalTax`, `TotalDiscount`, `Date`, TIME_FORMAT(`Time`, '%h:%i %p') as 'Time', `Status` FROM `tblorders` WHERE OrderID = ?";

    db.query(sqlSelect, id, (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result[0]);
    });
}

function updateData(req, res){
    const id = req.params.id;
    const Status = req.body.Status

    const sqlSelect = "UPDATE tblorders SET Status = ? WHERE OrderID = ?";

    db.query(sqlSelect, [Status, id], (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result);
    });
}

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
        res.send(result);
    });
    
}

function getOrderItems(req, res){
    const id = req.params.id;
    const sqlSelect = "SELECT `itemOrderID`, (SELECT productName FROM tblproducts WHERE productID = o.productID) as productName, `productPrice`, SUM(`quantity`) AS quantity, `discount`, `tax` FROM `tblorderitems` o WHERE `ReferenceNumber` = ? GROUP BY productID";

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
    getItems: getOrderItems,
    insertItem: insertDataOrdsItem,
    updateInv: updateInventory
}