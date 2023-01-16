const express = require('express');
const grCTRL = require('../controllers/goodsreceipt.controller');

const grRoute = express.Router();

//Route for Order Module
grRoute.get('/api/goodsreceipt/get', grCTRL.display);
grRoute.post('/api/goodsreceipt/insert', grCTRL.insert);
grRoute.get('/api/goodsreceipt/get/:id', grCTRL.get);
grRoute.delete('/api/goodsreceipt/remove/:id', grCTRL.delete);
grRoute.get('/api/goodsreceipt/get/supplier/name/:id', grCTRL.getSupplier);
grRoute.put('/api/goodsreceipt/update/postatus/:id', grCTRL.updatePoStatus);

grRoute.get('/api/goodsreceipt/get/goodsitem/:id', grCTRL.getItems);
grRoute.get('/api/goodsreceipt/get/goodsreceipt/item/:id', grCTRL.getGoodItem);
grRoute.post('/api/goodsreceipt/insert/goodsitem', grCTRL.insertItems);
// grRoute.post('/api/goodsreceipt/update/goodsitem', grCTRL.updateItems);

module.exports = grRoute;



