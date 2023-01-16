const express = require('express');
const inventoryCtrl = require('../controllers/inventory.controller');
const verifyAccess = require('./middleware/verifyAccess.route');
const MODULE_ID = 5;
const MODULE_IDgen = 11;
const inventoryRoute = express.Router();

//Route for inventory Module
inventoryRoute.get('/api/inventory/get',verifyAccess(MODULE_ID), inventoryCtrl.display);
inventoryRoute.get('/api/inventory/get/dashboard', inventoryCtrl.display);
inventoryRoute.post('/api/inventory/insert', inventoryCtrl.insert);
inventoryRoute.get('/api/inventory/get/:id', inventoryCtrl.get);
inventoryRoute.put('/api/inventory/update/:id', inventoryCtrl.update);
inventoryRoute.delete('/api/inventory/remove/:invID', inventoryCtrl.delete);
inventoryRoute.get('/api/inventory/get/prod/active', inventoryCtrl.getActive);
inventoryRoute.get('/api/inventory/get/prod/active/generateOrder', verifyAccess(MODULE_IDgen), inventoryCtrl.getActive);
inventoryRoute.get('/api/inventory/get/sku/:SKU', inventoryCtrl.skuData);
inventoryRoute.get('/api/inventory/getskus', inventoryCtrl.ListSKU);
inventoryRoute.get('/api/inventory/get/critical/product', inventoryCtrl.getCriticalProduct);
inventoryRoute.get('/api/inventory/get/near/to/expire', inventoryCtrl.nearToExpire);
inventoryRoute.get('/api/inventory/get/expired/product', inventoryCtrl.expired);

module.exports = inventoryRoute;