const express = require('express');
const paymentCtrl = require('../controllers/payment.controller');
const verifyAccess = require('./middleware/verifyAccess.route');
const MODULE_ID = 13;
const paymentRoute = express.Router();

//Route for payment Module
paymentRoute.get('/api/payment/get', verifyAccess(MODULE_ID),paymentCtrl.display);
paymentRoute.post('/api/payment/insert', paymentCtrl.insert);
paymentRoute.get('/api/payment/get/:id', paymentCtrl.get);
// paymentRoute.put('/api/payment/update/:id', paymentCtrl.update);
// paymentRoute.delete('/api/payment/remove/:id', paymentCtrl.delete);
// paymentRoute.get('/api/payment/get/prod/active', paymentCtrl.getActive);
// paymentRoute.get('/api/payment/get/sku/:SKU', paymentCtrl.skuData);
// paymentRoute.get('/api/payment/getskus', paymentCtrl.ListSKU);

module.exports = paymentRoute;