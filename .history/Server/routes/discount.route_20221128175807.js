const express = require('express');
const discountCtrl = require('../controllers/discount.controller');
const verifyAccess = require('./middleware/verifyAccess.route');
const MODULE_ID =9 ;

const discountRoute = express.Router();

//Route for Discount Module
discountRoute.get('/api/discount/get', verifyAccess(MODULE_ID),discountCtrl.display);
discountRoute.post('/api/discount/insert',verifyAccess(MODULE_ID), discountCtrl.insert);
discountRoute.get('/api/discount/get/:id', discountCtrl.get);
discountRoute.put('/api/discount/update/:id',verifyAccess(MODULE_ID), discountCtrl.update);
discountRoute.delete('/api/discount/remove/:id',verifyAccess(MODULE_ID), discountCtrl.delete);
discountRoute.get('/api/discount/get/disc/active', discountCtrl.getDisc);

module.exports = discountRoute;



