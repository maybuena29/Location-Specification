const express = require('express');
const reportCtrl = require('../controllers/reports.controller');
const verifyAccess = require('./middleware/verifyAccess.route');
const MODULE_ID = 0;
const reportsRoute = express.Router();

//Route for Category Module
reportsRoute.get('/api/reports/get/totalearnings', verifyAccess(MODULE_ID),reportCtrl.displayEarnings);
reportsRoute.get('/api/reports/get/totalsales',verifyAccess(MODULE_ID), reportCtrl.displaySales);
reportsRoute.get('/api/reports/get/totalproducts',verifyAccess(MODULE_ID), reportCtrl.displayProducts);
reportsRoute.get('/api/reports/get/totalorders', verifyAccess(MODULE_ID),reportCtrl.displayOrder);
reportsRoute.get('/api/reports/get/totalexpired', verifyAccess(MODULE_ID),reportCtrl.displayExpired);
reportsRoute.get('/api/reports/get/totalexpenses',verifyAccess(MODULE_ID), reportCtrl.displayExpense);
reportsRoute.get('/api/reports/get/totalstocks',verifyAccess(MODULE_ID), reportCtrl.displayStocks);
reportsRoute.get('/api/reports/get/itemsales/daily/data', verifyAccess(MODULE_ID),reportCtrl.displayItemDailySales);
reportsRoute.get('/api/reports/get/itemsales/weekly/data',verifyAccess(MODULE_ID), reportCtrl.displayItemWeeklySales);
reportsRoute.get('/api/reports/get/itemsales/monthly/data',verifyAccess(MODULE_ID), reportCtrl.displayItemMonthlySales);
reportsRoute.get('/api/reports/get/itemsales/yearly/data',verifyAccess(MODULE_ID), reportCtrl.displayItemYearlySales);
reportsRoute.get('/api/reports/get/earnings/daily/data', verifyAccess(MODULE_ID),reportCtrl.dailyEarnings);
reportsRoute.get('/api/reports/get/earnings/weekly/data',verifyAccess(MODULE_ID), reportCtrl.weeklyEarnings);
reportsRoute.get('/api/reports/get/earnings/monthly/data',verifyAccess(MODULE_ID), reportCtrl.monthlyEarnings);
reportsRoute.get('/api/reports/get/earnings/yearly/data',verifyAccess(MODULE_ID), reportCtrl.yearlyEarnings);
reportsRoute.get('/api/reports/get/total/productorder/data', verifyAccess(MODULE_ID),reportCtrl.topProductOrder);
reportsRoute.get('/api/reports/get/brand/sales/data', verifyAccess(MODULE_ID),reportCtrl.brandSales);
reportsRoute.get('/api/reports/get/category/sales/data', verifyAccess(MODULE_ID),reportCtrl.categorySales);
reportsRoute.get('/api/reports/get/daily/orders/data', verifyAccess(MODULE_ID),reportCtrl.dailyOrders);
reportsRoute.get('/api/reports/get/weekly/orders/data', verifyAccess(MODULE_ID),reportCtrl.weeklyOrders);
reportsRoute.get('/api/reports/get/monthly/orders/data',verifyAccess(MODULE_ID), reportCtrl.monthlyOrders);
reportsRoute.get('/api/reports/get/yearly/orders/data',verifyAccess(MODULE_ID), reportCtrl.yearlyOrders);
reportsRoute.get('/api/reports/get/totalproduct/category/data', verifyAccess(MODULE_ID),reportCtrl.totalProdPerCateg);

//For Supplier Reports
reportsRoute.get('/api/reports/get/total/supplier', reportCtrl.displaySupplier);
reportsRoute.get('/api/reports/get/total/po', reportCtrl.displayPO);
reportsRoute.get('/api/reports/get/total/grpo', reportCtrl.displayGRPO);
reportsRoute.get('/api/reports/get/total/apinvoice', reportCtrl.displayAPInvoice);

module.exports = reportsRoute;