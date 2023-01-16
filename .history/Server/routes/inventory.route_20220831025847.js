const express = require('express');
const inventoryCtrl = require('../controllers/inventory.controller');

const inventoryRoute = express.Router();

//Route for inventory Module
inventoryRoute.get('/api/inventory/get', inventoryCtrl.display);
inventoryRoute.post('/api/inventory/insert', inventoryCtrl.insert);
inventoryRoute.get('/api/inventory/get/:id', inventoryCtrl.get);
inventoryRoute.put('/api/inventory/update/:id', inventoryCtrl.update);
inventoryRoute.delete('/api/inventory/remove/:invID', inventoryCtrl.delete);
inventoryRoute.get('/api/inventory/get/sku/:SKU', inventoryCtrl.skuData);
inventoryRoute.get('/api/inventory/getskus', inventoryCtrl.ListSKU);

module.exports = inventoryRoute;

