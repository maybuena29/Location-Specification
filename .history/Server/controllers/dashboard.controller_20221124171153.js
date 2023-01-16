const db = require('../main.db');

function displayTotalOrders(req, res){
    const sqlSelect = "SELECT COUNT(TotalProducts) AS TotalOrders FROM `tblorders` ";

    db.query(sqlSelect, (err, result) => {
        res.send(result[0]);
        console.log(result);
    });
  
}

function displayTotalProducts(req, res){
    const sqlSelect = "SELECT COUNT(productID) AS TotalProducts FROM `tblproducts`";

    db.query(sqlSelect, (err, result) => {
        res.send(result[0]);
        console.log(result);
    });
  
}

function displayTotalSales(req, res){
    const sqlSelect = "SELECT SUM(TotalAmount) AS TotalSales FROM `tblorders`";

    db.query(sqlSelect, (err, result) => {
        res.send(result[0]);
        console.log(result);
    });
  
}

function displayPendingOrders(req, res){
    const sqlSelect = "SELECT `OrderID`, `ReferenceNumber`, (SELECT CustName FROM tblcustomer WHERE CustomerCode = `CustomerCode`) AS CustName, `TotalProducts`, `TotalAmount`, `TotalTax`, `TotalDiscount`, `Date`, TIME_FORMAT(`Time`, '%h:%i %p') as 'Time', `Status` FROM `tblorders` WHERE `Status` = 'pending'";

    db.query(sqlSelect, (err, result) => {
        res.send(result);
        console.log(result);
    });
  
}

function displayTotalEarnings(req, res){
    const sqlSelect = "SELECT SUM(((OI.productPrice - (SELECT `productPrice` FROM `tblproducts` WHERE `productID` = OI.productID)) * OI.quantity) - (((OI.productPrice - (SELECT `productPrice` FROM `tblproducts` WHERE `productID` = OI.productID)) * OI.quantity) * (OI.discount/100))) AS 'TotalEarnings' FROM `tblorderitems` OI GROUP BY 'TotalEarnings'";

    db.query(sqlSelect, (err, result) => {
        res.send(result[0]);
        console.log(result[0]);
    });
  
}


module.exports = {
    displayOrders: displayTotalOrders,
    displayProducts: displayTotalProducts,
    displaySales: displayTotalSales,
    displayPending: displayPendingOrders,
    displayEarnings: displayTotalEarnings,
    // insert: insertData,
    // get: getData,
    // update: updateData,
    // delete: deleteData,
    // getCat: getCategory
}