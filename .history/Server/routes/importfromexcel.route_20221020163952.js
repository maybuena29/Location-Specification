const express = require('express');
const importfromExlCtrl = require('../controllers/importfromExcel.controller');

const importfromExlRoute = express.Router();

importfromExlRoute.post('/api/import/product', importfromExlCtrl.AddProduct);
importfromExlRoute.post('/api/import//Attribute', importfromExlCtrl.AddAttr);
importfromExlRoute.post('/api/import/Brand', importfromExlCtrl.AddBrand);
importfromExlRoute.post('/api/import/Category', importfromExlCtrl.AddCateg);
importfromExlRoute.post('/api/import/Supplier', importfromExlCtrl.AddSupp);

module.exports = importfromExlRoute;