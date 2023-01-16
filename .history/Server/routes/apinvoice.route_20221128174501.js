const express = require('express');
const apCTRL = require('../controllers/apinvoice.controller');

const apRoute = express.Router();

//Route for Order Module
apRoute.get('/api/apinvoice/get', apCTRL.display);
apRoute.post('/api/apinvoice/insert', apCTRL.insert);
apRoute.get('/api/apinvoice/get/:id', apCTRL.get);
apRoute.delete('/api/apinvoice/remove/:id', apCTRL.delete);
apRoute.put('/api/apinvoice/update/grstatus/:id', apCTRL.updateGrStatus);

apRoute.get('/api/apinvoice/get/pending/grlist', apCTRL.getGrList);
apRoute.get('/api/apinvoice/get/goodsreceipt/item/:id', apCTRL.getGoodItem);
// apRoute.post('/api/apinvoice/insert/goodsitem', apCTRL.insertItems);
// grRoute.post('/api/goodsreceipt/update/goodsitem', grCTRL.updateItems);

module.exports = apRoute;



