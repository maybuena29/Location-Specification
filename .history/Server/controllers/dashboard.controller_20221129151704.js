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

function displayTotalCustomers(req, res){
    const sqlSelect = "SELECT COUNT(*) AS TotalCustomers FROM `tblcustomer`";

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
    const sqlSelect = "SELECT `OrderID`, `ReferenceNumber`, (SELECT CustName FROM tblcustomer WHERE CustCode = 'CustomerCode') AS CustName, `TotalProducts`, `TotalAmount`, `TotalTax`, `TotalDiscount`, `Date`, TIME_FORMAT(`Time`, '%h:%i %p') as 'Time', `Status` FROM `tblorders` WHERE `Status` = 'pending'";

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

function insertData(req, res){
    const CategoryName = req.body.CategoryName
    const Status = req.body.Status
    const sqlInsert = "INSERT INTO tblcategory (Category_Name, CatStatus) VALUES (?,?)";
  
    db.query(sqlInsert, [CategoryName, Status], (err, result) => {
        console.log(result);
    });
  
}
  
function getData(req, res){
    const id = req.params.id;
    const sqlSelect = "SELECT * FROM tblcategory WHERE CategoryID = ?";
  
    db.query(sqlSelect, id, (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result[0]);
    });
}

function updateData(req, res){
    const id = req.params.id;
    const CategoryName = req.body.CategoryName
    const Status = req.body.Status
  
    const sqlSelect = "UPDATE tblcategory SET Category_Name = ?, CatStatus = ? WHERE CategoryID = ?";

    db.query(sqlSelect, [CategoryName, Status, id], (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result);
    });
  
}
  
function deleteData(req, res){
    const id = req.params.id;
    const sqlRemove = "DELETE FROM tblcategory WHERE CategoryID = ?";
    db.query(sqlRemove, id, (err, result) => {
        if(err){
            console.log(err);
        }
    });
      
}

function getCategory(req, res){

    const sqlSelect = "SELECT CategoryID, Category_Name FROM tblcategory WHERE CatStatus = 'active'";
    
    db.query(sqlSelect, (err, result) => {
        res.send(result);
        console.log(result);
    });
}

module.exports = {
    displayOrders: displayTotalOrders,
    displayProducts: displayTotalProducts,
    displayCustomers: displayTotalCustomers,
    displaySales: displayTotalSales,
    displayPending: displayPendingOrders,
    displayEarnings: displayTotalEarnings,
    // insert: insertData,
    // get: getData,
    // update: updateData,
    // delete: deleteData,
    // getCat: getCategory
}