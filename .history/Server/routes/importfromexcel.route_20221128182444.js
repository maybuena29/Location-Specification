const express = require('express');
const importfromExlCtrl = require('../controllers/importfromExcel.controller');
const verifyAccess = require('./middleware/verifyAccess.route');
const MODULE_ID = 1;
const importfromExlRoute = express.Router();

importfromExlRoute.post('/api/import/Product', verifyAccess(MODULE_ID),importfromExlCtrl.AddProduct);
importfromExlRoute.post('/api/import/Attribute',verifyAccess(MODULE_ID), importfromExlCtrl.AddAttr);
importfromExlRoute.post('/api/import/Brand', verifyAccess(MODULE_ID),importfromExlCtrl.AddBrand);
importfromExlRoute.post('/api/import/Category',verifyAccess(MODULE_ID), importfromExlCtrl.AddCateg);
importfromExlRoute.post('/api/import/Supplier', verifyAccess(MODULE_ID),importfromExlCtrl.AddSupp);

module.exports = importfromExlRoute;