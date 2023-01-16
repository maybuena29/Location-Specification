const express = require('express');
const dashCtrl = require('../controllers/dashboard.controller');

const dashRoute = express.Router();

//Route for Category Module
dashRoute.get('/api/dashboard/get/totalorders', dashCtrl.displayOrders);
dashRoute.get('/api/dashboard/get/totalproducts', dashCtrl.displayProducts);
dashRoute.get('/api/dashboard/get/totalsales', dashCtrl.displaySales);
dashRoute.get('/api/dashboard/get/totalpending', dashCtrl.displayPending);
// dashRoute.post('/api/dashboard/insert', dashCtrl.insert);
// dashRoute.get('/api/dashboard/get/:id', dashCtrl.get);
// dashRoute.put('/api/dashboard/update/:id', dashCtrl.update);
// dashRoute.delete('/api/dashboard/remove/:id', dashCtrl.delete);
// dashRoute.get('/api/dashboard/get/categname/active', dashCtrl.getCat);

module.exports = dashRoute;



