const express = require('express');
const supplierCtrl = require('../controllers/supplier.controller');
const verifyAccess = require('./middleware/verifyAccess.route');
const MODULE_ID = 6;
const suppRoute = express.Router();

//Route for Brand Module
suppRoute.get('/api/supplier/get', verifyAccess(MODULE_ID),supplierCtrl.display);
suppRoute.post('/api/supplier/insert',verifyAccess(MODULE_ID), supplierCtrl.insert);
suppRoute.get('/api/supplier/get/:id', supplierCtrl.get);
suppRoute.put('/api/supplier/update/:id',verifyAccess(MODULE_ID), supplierCtrl.update);
suppRoute.delete('/api/supplier/remove/:id',verifyAccess(MODULE_ID), supplierCtrl.delete);
suppRoute.get('/api/supplier/get/suppname/active', supplierCtrl.getSupp);

module.exports = suppRoute;



