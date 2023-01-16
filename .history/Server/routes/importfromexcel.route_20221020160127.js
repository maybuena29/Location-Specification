const express = require('express');
const importfromExlCtrl = require('../controllers/importfromExcel.controller');

const importfromExlRoute = express.Router();

importfromExlRoute.post('/api/import/product', importfromExlCtrl.AddProduct);
importfromExlRoute.post('/api/importfromexl/Attribute', importfromExlCtrl.AddAttr);
importfromExlRoute.post('/api/importfromexl/Brand', importfromExlCtrl.AddBrand);
importfromExlRoute.post('/api/importfromexl/Category', importfromExlCtrl.AddCateg);
importfromExlRoute.post('/api/importfromexl/Supplier', importfromExlCtrl.AddSupp);

module.exports = importfromExlRoute;