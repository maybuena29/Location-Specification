const express = require('express');
const productCtrl = require('../controllers/product.controller');
const verifyAccess = require('./middleware/verifyAccess.route');
const MODULE_ID=1;
const productRoute = express.Router();

//Route for Product Module
productRoute.get('/api/products/get', verifyAccess(MODULE_ID),productCtrl.display);
productRoute.post('/api/products/insert',verifyAccess(MODULE_ID), productCtrl.insert);
productRoute.get('/api/products/get/:id', productCtrl.get);
productRoute.put('/api/products/update/:id',verifyAccess(MODULE_ID), productCtrl.update);
productRoute.delete('/api/products/remove/:PID', verifyAccess(MODULE_ID),productCtrl.delete);

module.exports = productRoute;



