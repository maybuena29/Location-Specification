const express = require('express');
const compProfileCtrl = require('../controllers/companyprofile.controller');

const compProfileRoute = express.Router();

//Route for company profile Module
compProfileRoute.get('/api/company/get', compProfileCtrl.display);
// compProfileRoute.post('/api/inventory/insert', compProfileCtrl.insert);
// compProfileRoute.get('/api/inventory/get/:id', compProfileCtrl.get);
compProfileRoute.put('/api/company/update', compProfileCtrl.update);
// compProfileRoute.delete('/api/inventory/remove/:invID', compProfileCtrl.delete);
// compProfileRoute.get('/api/inventory/get/prod/active', compProfileCtrl.getActive);
// compProfileRoute.get('/api/inventory/get/sku/:SKU', compProfileCtrl.skuData);
// compProfileRoute.get('/api/inventory/getskus', compProfileCtrl.ListSKU);

module.exports = compProfileRoute;