const express = require('express');
const reportCtrl = require('../controllers/reports.controller');

const reportsRoute = express.Router();

//Route for Category Module
reportsRoute.get('/api/reports/get/totalearnings', reportCtrl.displayEarnings);
reportsRoute.get('/api/reports/get/totalsales', reportCtrl.displaySales);
reportsRoute.get('/api/reports/get/totalexpenses', reportCtrl.displayExpense);
reportsRoute.get('/api/reports/get/totalstocks', reportCtrl.displayStocks);
reportsRoute.get('/api/reports/get/itemsales/data', reportCtrl.displayItemSales);
// dashRoute.post('/api/dashboard/insert', dashCtrl.insert);
// dashRoute.get('/api/dashboard/get/:id', dashCtrl.get);
// dashRoute.put('/api/dashboard/update/:id', dashCtrl.update);
// dashRoute.delete('/api/dashboard/remove/:id', dashCtrl.delete);
// dashRoute.get('/api/dashboard/get/categname/active', dashCtrl.getCat);

module.exports = reportsRoute;