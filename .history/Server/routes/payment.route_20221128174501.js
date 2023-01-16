const express = require('express');
const paymentCtrl = require('../controllers/payment.controller');

const paymentRoute = express.Router();

//Route for payment Module
paymentRoute.get('/api/payment/get', paymentCtrl.display);
paymentRoute.post('/api/payment/insert', paymentCtrl.insert);
paymentRoute.get('/api/payment/get/:id', paymentCtrl.get);
// paymentRoute.put('/api/payment/update/:id', paymentCtrl.update);
// paymentRoute.delete('/api/payment/remove/:id', paymentCtrl.delete);
// paymentRoute.get('/api/payment/get/prod/active', paymentCtrl.getActive);
// paymentRoute.get('/api/payment/get/sku/:SKU', paymentCtrl.skuData);
// paymentRoute.get('/api/payment/getskus', paymentCtrl.ListSKU);

module.exports = paymentRoute;