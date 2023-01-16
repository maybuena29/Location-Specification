const express = require('express');
const poCTRL = require('../controllers/purchaseorder.controller');
const verifyAccess = require('./middleware/verifyAccess.route');
const MODULE_ID = 7;
const poRoute = express.Router();

//Route for Order Module
poRoute.get('/api/purchaseorder/get', verifyAccess(MODULE_ID),poCTRL.display);
poRoute.post('/api/purchaseorder/insert', poCTRL.insert);
poRoute.get('/api/purchaseorder/get/:id', poCTRL.get);
poRoute.put('/api/purchaseorder/update/:id', poCTRL.update);
poRoute.delete('/api/purchaseorder/remove/:id', poCTRL.delete);
poRoute.get('/api/purchaseorder/get/pending/polist', poCTRL.getPOList);

poRoute.get('/api/purchaseorder/get/purchaseitems/:id', poCTRL.getItems);
poRoute.post('/api/purchaseorder/insert/purchaseitems', poCTRL.insertItems);
poRoute.post('/api/purchaseorder/update/purchaseitems', poCTRL.updateItems);
poRoute.post('/api/purchaseorder/update/status/purchaseitems', poCTRL.updateItmStatus);

module.exports = poRoute;



