const express = require('express');
const apCTRL = require('../controllers/apinvoice.controller');
const verifyAccess = require('./middleware/verifyAccess.route');
const MODULE_ID =9 ;
verifyAccess(MODULE_ID);
const apRoute = express.Router();

//Route for Order Module
apRoute.get('/api/apinvoice/get', verifyAccess(MODULE_ID),apCTRL.display);
apRoute.post('/api/apinvoice/insert', verifyAccess(MODULE_ID),apCTRL.insert);
apRoute.get('/api/apinvoice/get/:id', apCTRL.get);
apRoute.delete('/api/apinvoice/remove/:id', verifyAccess(MODULE_ID),apCTRL.delete);
apRoute.put('/api/apinvoice/update/grstatus/:id', apCTRL.updateGrStatus);

apRoute.get('/api/apinvoice/get/pending/grlist', apCTRL.getGrList);
apRoute.get('/api/apinvoice/get/goodsreceipt/item/:id', apCTRL.getGoodItem);
// apRoute.post('/api/apinvoice/insert/goodsitem', apCTRL.insertItems);
// grRoute.post('/api/goodsreceipt/update/goodsitem', grCTRL.updateItems);

module.exports = apRoute;



