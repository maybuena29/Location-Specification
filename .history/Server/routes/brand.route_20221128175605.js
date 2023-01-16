const express = require('express');
const brandCtrl = require('../controllers/brand.controller');
const verifyAccess = require('./middleware/verifyAccess.route');
const MODULE_ID =9 ;
const brandRoute = express.Router();

//Route for Brand Module
brandRoute.get('/api/brand/get',verifyAccess(MODULE_ID), brandCtrl.display);
brandRoute.post('/api/brand/insert',verifyAccess(MODULE_ID), brandCtrl.insert);
brandRoute.get('/api/brand/get/:id', brandCtrl.get);
brandRoute.put('/api/brand/update/:id', verifyAccess(MODULE_ID),brandCtrl.update);
brandRoute.delete('/api/brand/remove/:id',verifyAccess(MODULE_ID), brandCtrl.delete);
brandRoute.get('/api/brand/get/bname/active', brandCtrl.getBrnd);

module.exports = brandRoute;



