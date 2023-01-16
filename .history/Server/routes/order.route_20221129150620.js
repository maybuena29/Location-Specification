const express = require('express');
const orderCtrl = require('../controllers/order.controller');
const verifyAccess = require('./middleware/verifyAccess.route');
const MODULE_ID = 10;
const MODULE_IDTH = 11;
const orderRoute = express.Router();

//Route for Order Module
orderRoute.get('/api/order/get', verifyAccess(MODULE_ID),orderCtrl.display);
orderRoute.get('/api/order/get/th', verifyAccess(MODULE_IDTH),orderCtrl.display);
orderRoute.post('/api/order/insert', orderCtrl.insert);
orderRoute.get('/api/order/get/:id', orderCtrl.get);
orderRoute.put('/api/order/update/:id', orderCtrl.update);
// orderRoute.delete('/api/brand/remove/:id', orderCtrl.delete);
// orderRoute.get('/api/brand/get/bname/active', orderCtrl.getBrnd);
orderRoute.post('/api/orderitem/insert', orderCtrl.insertItem);
orderRoute.get('/api/orderitem/get/:id', orderCtrl.getItems);
orderRoute.put('/api/inventory/update-quantity/:id', orderCtrl.updateInv);

module.exports = orderRoute;



