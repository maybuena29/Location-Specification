const express = require('express');
const supplierCtrl = require('../controllers/supplier.controller');

const suppRoute = express.Router();

//Route for Brand Module
suppRoute.get('/api/supplier/get', supplierCtrl.display);
suppRoute.post('/api/supplier/insert', supplierCtrl.insert);
suppRoute.post('/api/supplier/insertExl', supplierCtrl.insertExl);
suppRoute.get('/api/supplier/get/:id', supplierCtrl.get);
suppRoute.put('/api/supplier/update/:id', supplierCtrl.update);
suppRoute.delete('/api/supplier/remove/:id', supplierCtrl.delete);
suppRoute.get('/api/supplier/get/suppname/active', supplierCtrl.getSupp);

module.exports = suppRoute;



