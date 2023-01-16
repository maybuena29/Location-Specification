const express = require('express');
const importfromExlCtrl = require('../controllers/importfromExcel.controller');

const importfromExlRoute = express.Router();

importfromExlRoute.post('/api/importfromfxl/product', importfromExlCtrl.AddProduct);
importfromExlRoute.post('/api/importfromExl/Attribute', importfromExlCtrl.AddAttr);
importfromExlRoute.post('/api/importfromExl/Brand', importfromExlCtrl.AddBrand);
importfromExlRoute.post('/api/importfromExl/Category', importfromExlCtrl.AddCateg);
importfromExlRoute.post('/api/importfromExl/Supplier', importfromExlCtrl.AddSupp);

module.exports = importfromExlRoute;