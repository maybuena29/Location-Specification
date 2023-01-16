const express = require('express');
const productCtrl = require('../controllers/product.controller');

const productRoute = express.Router();

//Route for Product Module
productRoute.get('/api/products/get', productCtrl.display);
productRoute.post('/api/products/insert', productCtrl.insert);
productRoute.post('/api/products/upload', productCtrl.uploadImg);
productRoute.post('/api/products/insertExl', productCtrl.insertExl);
productRoute.get('/api/products/get/:id', productCtrl.get);
productRoute.put('/api/products/update/:id', productCtrl.update);
productRoute.delete('/api/products/remove/:PID', productCtrl.delete);

module.exports = productRoute;



