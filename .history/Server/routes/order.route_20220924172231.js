const express = require('express');
const orderCtrl = require('../controllers/order.controller');

const orderRoute = express.Router();

//Route for Brand Module
orderRoute.get('/api/order/get', orderCtrl.display);
orderRoute.post('/api/order/insert', orderCtrl.insert);
orderRoute.get('/api/order/get/:id', orderCtrl.get);
orderRoute.put('/api/order/update/:id', orderCtrl.update);
// orderRoute.delete('/api/brand/remove/:id', orderCtrl.delete);
// orderRoute.get('/api/brand/get/bname/active', orderCtrl.getBrnd);
orderRoute.post('/api/orderitem/insert', orderCtrl.insertItem);

module.exports = orderRoute;
