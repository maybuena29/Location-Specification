const db = require('../main.db');

function displayTotalStocks(req, res){
    const sqlSelect = "SELECT SUM(inventoryQuantity) AS TotalStocks FROM `tblinventory`";

    db.query(sqlSelect, (err, result) => {
        res.send(result[0]);
        console.log(result);
    });
  
}

function displayTotalExpenses(req, res){
    const sqlSelect = "SELECT SUM(totalAmount) AS TotalExpense FROM `tblapinvoice`";

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

function displayTotalEarnings(req, res){
    const sqlSelect = "SELECT SUM((SELECT SUM(TotalAmount) AS TotalSales FROM `tblorders`) - (SELECT SUM(totalAmount) AS TotalExpense FROM `tblapinvoice`)) AS TotalEarnings";

    db.query(sqlSelect, (err, result) => {
        res.send(result[0]);
        console.log(result[0]);
    });
  
}

function displayItemTotalSales(req, res){
    const sqlSelect = "SELECT (SELECT productName FROM `tblproducts` WHERE productID = OI.productID) AS 'ProductName', (SELECT DATE_FORMAT(Date, '%Y') FROM `tblorders` WHERE `ReferenceNumber` = OI.ReferenceNumber) AS 'Year', (SELECT DATE_FORMAT(Date, '%M') FROM `tblorders` WHERE `ReferenceNumber` = OI.ReferenceNumber) AS 'Month', SUM(`productPrice` * `quantity`) AS 'TotalSales' FROM `tblorderitems` OI GROUP BY `productID`;";

    db.query(sqlSelect, (err, result) => {
        res.send(result);
        console.log(result);
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
    displayStocks: displayTotalStocks,
    displayExpense: displayTotalExpenses,
    displaySales: displayTotalSales,
    displayEarnings: displayTotalEarnings,
    displayItemSales: displayItemTotalSales,
}