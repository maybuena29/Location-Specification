const db = require('../main.db');

function verify(req,res){
    res.send("Verified");
}
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
function displayItemDailySalesNL(req, res){
    const sqlSelect = "SELECT (SELECT productName FROM `tblproducts` WHERE productID = OI.productID) AS 'ProductName', DATE_FORMAT(O.Date, '%Y') AS 'Year', DATE_FORMAT(O.Date, '%M') AS 'Month', DATE_FORMAT(O.Date, '%d') AS 'Day', SUM(OI.productPrice * OI.quantity) AS 'TotalSales' FROM `tblorderitems` OI INNER JOIN `tblorders` O ON OI.ReferenceNumber = O.ReferenceNumber GROUP BY OI.productID, O.Date ORDER BY O.Date ";

    db.query(sqlSelect, (err, result) => {
        res.send(result);
        console.log(result);
    });
  
}

function displayItemWeeklySalesNL(req, res){
    const sqlSelect = "SELECT (SELECT productName FROM `tblproducts` WHERE productID = OI.productID) AS 'ProductName', DATE_FORMAT(O.Date, '%Y') AS 'Year', DATE_FORMAT(O.Date, '%M') AS 'Month', DATE_FORMAT(O.Date, '%U') AS 'Week', DATE_FORMAT(O.Date, '%d') AS 'Day', SUM(OI.productPrice * OI.quantity) AS 'TotalSales' FROM `tblorderitems` OI INNER JOIN `tblorders` O ON OI.ReferenceNumber = O.ReferenceNumber GROUP BY OI.productID, WEEK(O.Date) ORDER BY O.Date";

    db.query(sqlSelect, (err, result) => {
        res.send(result);
        console.log(result);
    });
  
}

function displayItemMonthlySalesNL(req, res){
    const sqlSelect = "SELECT (SELECT productName FROM `tblproducts` WHERE productID = OI.productID) AS 'ProductName', DATE_FORMAT(O.Date, '%Y') AS 'Year', DATE_FORMAT(O.Date, '%M') AS 'Month', DATE_FORMAT(O.Date, '%U') AS 'Week', DATE_FORMAT(O.Date, '%d') AS 'Day', SUM(OI.productPrice * OI.quantity) AS 'TotalSales' FROM `tblorderitems` OI INNER JOIN `tblorders` O ON OI.ReferenceNumber = O.ReferenceNumber GROUP BY OI.productID, MONTH(O.Date) ORDER BY O.Date";

    db.query(sqlSelect, (err, result) => {
        res.send(result);
        console.log(result);
    });
  
}

function displayItemYearlySalesNL(req, res){
    const sqlSelect = "SELECT (SELECT productName FROM `tblproducts` WHERE productID = OI.productID) AS 'ProductName', DATE_FORMAT(O.Date, '%Y') AS 'Year', DATE_FORMAT(O.Date, '%M') AS 'Month', DATE_FORMAT(O.Date, '%U') AS 'Week', DATE_FORMAT(O.Date, '%d') AS 'Day', SUM(OI.productPrice * OI.quantity) AS 'TotalSales' FROM `tblorderitems` OI INNER JOIN `tblorders` O ON OI.ReferenceNumber = O.ReferenceNumber GROUP BY OI.productID, YEAR(O.Date) ORDER BY O.Date";

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


function displayItemDailySales(req, res){
    const sqlSelect = "SELECT (SELECT productName FROM `tblproducts` WHERE productID = OI.productID) AS 'ProductName', DATE_FORMAT(O.Date, '%Y') AS 'Year', DATE_FORMAT(O.Date, '%M') AS 'Month', DATE_FORMAT(O.Date, '%d') AS 'Day', SUM(OI.productPrice * OI.quantity) AS 'TotalSales' FROM `tblorderitems` OI INNER JOIN `tblorders` O ON OI.ReferenceNumber = O.ReferenceNumber GROUP BY OI.productID, O.Date ORDER BY O.Date LIMIT 20";

    db.query(sqlSelect, (err, result) => {
        res.send(result);
        console.log(result);
    });
  
}

function displayItemWeeklySales(req, res){
    const sqlSelect = "SELECT (SELECT productName FROM `tblproducts` WHERE productID = OI.productID) AS 'ProductName', DATE_FORMAT(O.Date, '%Y') AS 'Year', DATE_FORMAT(O.Date, '%M') AS 'Month', DATE_FORMAT(O.Date, '%U') AS 'Week', DATE_FORMAT(O.Date, '%d') AS 'Day', SUM(OI.productPrice * OI.quantity) AS 'TotalSales' FROM `tblorderitems` OI INNER JOIN `tblorders` O ON OI.ReferenceNumber = O.ReferenceNumber GROUP BY OI.productID, WEEK(O.Date) ORDER BY O.Date LIMIT 20";

    db.query(sqlSelect, (err, result) => {
        res.send(result);
        console.log(result);
    });
  
}

function displayItemMonthlySales(req, res){
    const sqlSelect = "SELECT (SELECT productName FROM `tblproducts` WHERE productID = OI.productID) AS 'ProductName', DATE_FORMAT(O.Date, '%Y') AS 'Year', DATE_FORMAT(O.Date, '%M') AS 'Month', DATE_FORMAT(O.Date, '%U') AS 'Week', DATE_FORMAT(O.Date, '%d') AS 'Day', SUM(OI.productPrice * OI.quantity) AS 'TotalSales' FROM `tblorderitems` OI INNER JOIN `tblorders` O ON OI.ReferenceNumber = O.ReferenceNumber GROUP BY OI.productID, MONTH(O.Date) ORDER BY O.Date LIMIT 20";

    db.query(sqlSelect, (err, result) => {
        res.send(result);
        console.log(result);
    });
  
}

function displayItemYearlySales(req, res){
    const sqlSelect = "SELECT (SELECT productName FROM `tblproducts` WHERE productID = OI.productID) AS 'ProductName', DATE_FORMAT(O.Date, '%Y') AS 'Year', DATE_FORMAT(O.Date, '%M') AS 'Month', DATE_FORMAT(O.Date, '%U') AS 'Week', DATE_FORMAT(O.Date, '%d') AS 'Day', SUM(OI.productPrice * OI.quantity) AS 'TotalSales' FROM `tblorderitems` OI INNER JOIN `tblorders` O ON OI.ReferenceNumber = O.ReferenceNumber GROUP BY OI.productID, YEAR(O.Date) ORDER BY O.Date LIMIT 20";

    db.query(sqlSelect, (err, result) => {
        res.send(result);
        console.log(result);
    });
  
}

function displayDailyEarnings(req, res){
    const sqlSelect = "SELECT SUM(((OI.productPrice - (SELECT productPrice FROM tblproducts WHERE productID = OI.productID)) * OI.quantity) - (((OI.productPrice - (SELECT productPrice FROM tblproducts WHERE productID = OI.productID)) * OI.quantity) * (OI.discount/100))) AS 'Total', DATE_FORMAT(O.Date, '%Y') AS 'Year', DATE_FORMAT(O.Date, '%M') AS 'Month', DATE_FORMAT(O.Date, '%U') AS 'Week', DATE_FORMAT(O.Date, '%d') AS 'Day', (SELECT 'Earnings') AS 'Name' FROM tblorderitems OI INNER JOIN tblorders O ON OI.ReferenceNumber = O.ReferenceNumber GROUP BY DAY(O.Date) UNION ALL SELECT SUM(O.TotalAmount) AS 'Total', DATE_FORMAT(O.Date, '%Y') AS 'Year', DATE_FORMAT(O.Date, '%M') AS 'Month', DATE_FORMAT(O.Date, '%U') AS 'Week', DATE_FORMAT(O.Date, '%d') AS 'Day', (SELECT 'Sales') AS 'Name' FROM tblorders O GROUP BY DAY(O.Date);";

    db.query(sqlSelect, (err, result) => {
        res.send(result);
        console.log(result);
    });
  
}

function displayWeeklyEarnings(req, res){
    const sqlSelect = "SELECT SUM(((OI.productPrice - (SELECT productPrice FROM tblproducts WHERE productID = OI.productID)) * OI.quantity) - (((OI.productPrice - (SELECT productPrice FROM tblproducts WHERE productID = OI.productID)) * OI.quantity) * (OI.discount/100))) AS 'Total', DATE_FORMAT(O.Date, '%Y') AS 'Year', DATE_FORMAT(O.Date, '%M') AS 'Month', DATE_FORMAT(O.Date, '%U') AS 'Week', DATE_FORMAT(O.Date, '%d') AS 'Day', (SELECT 'Earnings') AS 'Name' FROM tblorderitems OI INNER JOIN tblorders O ON OI.ReferenceNumber = O.ReferenceNumber GROUP BY WEEK(O.Date) UNION ALL SELECT SUM(O.TotalAmount) AS 'Total', DATE_FORMAT(O.Date, '%Y') AS 'Year', DATE_FORMAT(O.Date, '%M') AS 'Month', DATE_FORMAT(O.Date, '%U') AS 'Week', DATE_FORMAT(O.Date, '%d') AS 'Day', (SELECT 'Sales') AS 'Name' FROM tblorders O GROUP BY WEEK(O.Date);";

    db.query(sqlSelect, (err, result) => {
        res.send(result);
        console.log(result);
    });
  
}

function displayMonthlyEarnings(req, res){
    const sqlSelect = "SELECT SUM(((OI.productPrice - (SELECT productPrice FROM tblproducts WHERE productID = OI.productID)) * OI.quantity) - (((OI.productPrice - (SELECT productPrice FROM tblproducts WHERE productID = OI.productID)) * OI.quantity) * (OI.discount/100))) AS 'Total', DATE_FORMAT(O.Date, '%Y') AS 'Year', DATE_FORMAT(O.Date, '%M') AS 'Month', DATE_FORMAT(O.Date, '%U') AS 'Week', DATE_FORMAT(O.Date, '%d') AS 'Day', (SELECT 'Earnings') AS 'Name' FROM tblorderitems OI INNER JOIN tblorders O ON OI.ReferenceNumber = O.ReferenceNumber GROUP BY MONTH(O.Date) UNION ALL SELECT SUM(O.TotalAmount) AS 'Total', DATE_FORMAT(O.Date, '%Y') AS 'Year', DATE_FORMAT(O.Date, '%M') AS 'Month', DATE_FORMAT(O.Date, '%U') AS 'Week', DATE_FORMAT(O.Date, '%d') AS 'Day', (SELECT 'Sales') AS 'Name' FROM tblorders O GROUP BY MONTH(O.Date);";

    db.query(sqlSelect, (err, result) => {
        res.send(result);
        console.log(result);
    });
  
}

function displayYearlyEarnings(req, res){
    const sqlSelect = "SELECT SUM(((OI.productPrice - (SELECT productPrice FROM tblproducts WHERE productID = OI.productID)) * OI.quantity) - (((OI.productPrice - (SELECT productPrice FROM tblproducts WHERE productID = OI.productID)) * OI.quantity) * (OI.discount/100))) AS 'Total', DATE_FORMAT(O.Date, '%Y') AS 'Year', DATE_FORMAT(O.Date, '%M') AS 'Month', DATE_FORMAT(O.Date, '%U') AS 'Week', DATE_FORMAT(O.Date, '%d') AS 'Day', (SELECT 'Earnings') AS 'Name' FROM tblorderitems OI INNER JOIN tblorders O ON OI.ReferenceNumber = O.ReferenceNumber GROUP BY YEAR(O.Date) UNION ALL SELECT SUM(O.TotalAmount) AS 'Total', DATE_FORMAT(O.Date, '%Y') AS 'Year', DATE_FORMAT(O.Date, '%M') AS 'Month', DATE_FORMAT(O.Date, '%U') AS 'Week', DATE_FORMAT(O.Date, '%d') AS 'Day', (SELECT 'Sales') AS 'Name' FROM tblorders O GROUP BY YEAR(O.Date);";

    db.query(sqlSelect, (err, result) => {
        res.send(result);
        console.log(result);
    });
  
}

function displayTopTotalOrders(req, res){
    const sqlSelect = "SELECT (SELECT productName FROM `tblproducts` WHERE productID = OI.productID) AS 'ProductName', SUM(OI.quantity) AS 'TotalOrders' FROM `tblorderitems` OI GROUP BY OI.productID ORDER BY SUM(OI.quantity) DESC LIMIT 10;";

    db.query(sqlSelect, (err, result) => {
        res.send(result);
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

function displayTotalExpiredProduct(req, res){
    const sqlSelect = "SELECT SUM(`inventoryQuantity`) AS 'TotalQuantity' FROM `tblinventory` WHERE DATE(`inventoryDateExp`) <= DATE(NOW());";

    db.query(sqlSelect, (err, result) => {
        res.send(result[0]);
        console.log(result);
    });
  
}

function displayTotalOrders(req, res){
    const sqlSelect = "SELECT COUNT(OrderID) AS 'TotalOrder' FROM tblorders";

    db.query(sqlSelect, (err, result) => {
        res.send(result[0]);
        console.log(result);
    });
  
}

function displayBrandSales(req, res){
    const sqlSelect = "SELECT SUM((OI.productPrice * OI.quantity) - ((OI.productPrice * OI.quantity) * (OI.discount/100))) AS 'TotalSales', (SELECT Brand_Name FROM `tblbrand` WHERE BrandID = (SELECT productBrand FROM `tblproducts` WHERE productID = OI.productID)) AS Brand FROM `tblorderitems` OI GROUP BY Brand";

    db.query(sqlSelect, (err, result) => {
        res.send(result);
        console.log(result);
    });
  
}

function displayCategorySales(req, res){
    const sqlSelect = "SELECT SUM((OI.productPrice * OI.quantity) - ((OI.productPrice * OI.quantity) * (OI.discount/100))) AS 'TotalSales', (SELECT Category_Name FROM `tblcategory` WHERE CategoryID = (SELECT productCategory FROM `tblproducts` WHERE productID = OI.productID)) AS Category FROM `tblorderitems` OI GROUP BY Category";

    db.query(sqlSelect, (err, result) => {
        res.send(result);
        console.log(result);
    });
  
}

function displayDailyOrders(req, res){
    const sqlSelect = "SELECT COUNT(`OrderID`) AS TotalOrders, DATE_FORMAT(`Date`, '%Y') AS 'Year', DATE_FORMAT(`Date`, '%M') AS 'Month', DATE_FORMAT(`Date`, '%U') AS 'Week', DATE_FORMAT(`Date`, '%d') AS 'Day' FROM `tblorders` GROUP BY DAY(`Date`)";

    db.query(sqlSelect, (err, result) => {
        res.send(result);
        console.log(result);
    });
  
}

function displayWeeklyOrders(req, res){
    const sqlSelect = "SELECT COUNT(`OrderID`) AS TotalOrders, DATE_FORMAT(`Date`, '%Y') AS 'Year', DATE_FORMAT(`Date`, '%M') AS 'Month', DATE_FORMAT(`Date`, '%U') AS 'Week', DATE_FORMAT(`Date`, '%d') AS 'Day' FROM `tblorders` GROUP BY WEEK(`Date`)";

    db.query(sqlSelect, (err, result) => {
        res.send(result);
        console.log(result);
    });
  
}

function displayMonthlyOrders(req, res){
    const sqlSelect = "SELECT COUNT(`OrderID`) AS TotalOrders, DATE_FORMAT(`Date`, '%Y') AS 'Year', DATE_FORMAT(`Date`, '%M') AS 'Month', DATE_FORMAT(`Date`, '%U') AS 'Week', DATE_FORMAT(`Date`, '%d') AS 'Day' FROM `tblorders` GROUP BY MONTH(`Date`)";

    db.query(sqlSelect, (err, result) => {
        res.send(result);
        console.log(result);
    });
  
}

function displayYearlyOrders(req, res){
    const sqlSelect = "SELECT COUNT(`OrderID`) AS TotalOrders, DATE_FORMAT(`Date`, '%Y') AS 'Year', DATE_FORMAT(`Date`, '%M') AS 'Month', DATE_FORMAT(`Date`, '%U') AS 'Week', DATE_FORMAT(`Date`, '%d') AS 'Day' FROM `tblorders` GROUP BY YEAR(`Date`)";

    db.query(sqlSelect, (err, result) => {
        res.send(result);
        console.log(result);
    });
  
}

function displayProductPerCategory(req, res){
    const sqlSelect = "SELECT (SELECT Category_Name FROM `tblcategory` WHERE CategoryID = `productCategory`) AS Category_Name, COUNT(*) AS TotalProducts FROM `tblproducts` GROUP BY `productCategory`;";

    db.query(sqlSelect, (err, result) => {
        res.send(result);
        console.log(result);
    });
}

//For Supplier Reports
function displayTotalSuppliers(req, res){
    const sqlSelect = "SELECT COUNT(*) AS TotalSupplier FROM `tblsupplier`;";

    db.query(sqlSelect, (err, result) => {
        res.send(result[0]);
        console.log(result[0]);
    });
}

function displayTotalPO(req, res){
    const sqlSelect = "SELECT COUNT(*) AS TotalPO FROM `tblpurchaseorder`;";

    db.query(sqlSelect, (err, result) => {
        res.send(result[0]);
        console.log(result[0]);
    });
}

function displayTotalGRPO(req, res){
    const sqlSelect = "SELECT COUNT(*) AS TotalGRPO FROM `tblgoodsreceiptpo`;";

    db.query(sqlSelect, (err, result) => {
        res.send(result[0]);
        console.log(result[0]);
    });
}

function displayTotalAPInvoice(req, res){
    const sqlSelect = "SELECT COUNT(*) AS TotalAP FROM `tblapinvoice`;";

    db.query(sqlSelect, (err, result) => {
        res.send(result[0]);
        console.log(result[0]);
    });
}

function displaySupplierDaily(req, res){
    const sqlSelect = "SELECT COUNT(`Supplier`) AS TotalSupplierOrder,(Select Supplier_ComName FROM `tblsupplier` WHERE SupplierID = `Supplier`) AS SupplierName,DATE_FORMAT(`PODateCreated`, '%Y') AS 'Year', DATE_FORMAT(`PODateCreated`, '%M') AS 'Month', DATE_FORMAT(`PODateCreated`, '%U') AS 'Week', DATE_FORMAT(`PODateCreated`, '%d') AS 'Day' FROM `tblpurchaseorder` PO GROUP BY DAY(PO.PODateCreated),SupplierName;";

    db.query(sqlSelect, (err, result) => {
        res.send(result[0]);
        console.log(result[0]);
    });
}

function displaySupplierWeekly(req, res){
    const sqlSelect = "SELECT COUNT(`Supplier`) AS TotalSupplierOrder,(Select Supplier_ComName FROM `tblsupplier` WHERE SupplierID = `Supplier`) AS SupplierName,DATE_FORMAT(`PODateCreated`, '%Y') AS 'Year', DATE_FORMAT(`PODateCreated`, '%M') AS 'Month', DATE_FORMAT(`PODateCreated`, '%U') AS 'Week', DATE_FORMAT(`PODateCreated`, '%d') AS 'Day' FROM `tblpurchaseorder` PO GROUP BY WEEK(PO.PODateCreated),SupplierName;";

    db.query(sqlSelect, (err, result) => {
        res.send(result[0]);
        console.log(result[0]);
    });
}

function displaySupplierMonthly(req, res){
    const sqlSelect = "SELECT COUNT(`Supplier`) AS TotalSupplierOrder,(Select Supplier_ComName FROM `tblsupplier` WHERE SupplierID = `Supplier`) AS SupplierName,DATE_FORMAT(`PODateCreated`, '%Y') AS 'Year', DATE_FORMAT(`PODateCreated`, '%M') AS 'Month', DATE_FORMAT(`PODateCreated`, '%U') AS 'Week', DATE_FORMAT(`PODateCreated`, '%d') AS 'Day' FROM `tblpurchaseorder` PO GROUP BY MONTH(PO.PODateCreated),SupplierName;";

    db.query(sqlSelect, (err, result) => {
        res.send(result[0]);
        console.log(result[0]);
    });
}

function displaySupplierYearly(req, res){
    const sqlSelect = "SELECT COUNT(`Supplier`) AS TotalSupplierOrder,(Select Supplier_ComName FROM `tblsupplier` WHERE SupplierID = `Supplier`) AS SupplierName,DATE_FORMAT(`PODateCreated`, '%Y') AS 'Year', DATE_FORMAT(`PODateCreated`, '%M') AS 'Month', DATE_FORMAT(`PODateCreated`, '%U') AS 'Week', DATE_FORMAT(`PODateCreated`, '%d') AS 'Day' FROM `tblpurchaseorder` PO GROUP BY YEAR(PO.PODateCreated),SupplierName;";

    db.query(sqlSelect, (err, result) => {
        res.send(result[0]);
        console.log(result[0]);
    });
}
module.exports = {
    verify:verify,
    displayStocks: displayTotalStocks,
    displayExpense: displayTotalExpenses,
    displaySales: displayTotalSales,
    displayEarnings: displayTotalEarnings,
    displayOrder: displayTotalOrders,
    displayProducts: displayTotalProducts, 
    displayExpired: displayTotalExpiredProduct, 
    displayItemDailySales: displayItemDailySales,
    displayItemWeeklySales: displayItemWeeklySales,
    displayItemMonthlySales: displayItemMonthlySales,
    displayItemYearlySales: displayItemYearlySales,
    dailyEarnings: displayDailyEarnings,
    weeklyEarnings: displayWeeklyEarnings,
    monthlyEarnings: displayMonthlyEarnings,
    yearlyEarnings: displayYearlyEarnings,
    topProductOrder: displayTopTotalOrders,
    brandSales: displayBrandSales,
    categorySales: displayCategorySales,
    dailyOrders: displayDailyOrders,
    weeklyOrders: displayWeeklyOrders,
    monthlyOrders: displayMonthlyOrders,
    yearlyOrders: displayYearlyOrders,
    totalProdPerCateg: displayProductPerCategory,
    displaySupplier: displayTotalSuppliers,
    displayPO: displayTotalPO,
    displayGRPO: displayTotalGRPO,
    displayAPInvoice: displayTotalAPInvoice,
    displaySupplierDaily:displaySupplierDaily,
    displaySupplierWeekly:displaySupplierWeekly,
    displaySupplierMonthly:displaySupplierMonthly,
    displaySupplierYearly:displaySupplierYearly,
    displayItemWeeklySalesNL:displayItemWeeklySalesNL,
    displayItemDailySalesNL:displayItemDailySalesNL,
    displayItemMonthlySalesNL:displayItemMonthlySalesNL,
    displayItemYearlySalesNL:displayItemYearlySalesNL
}