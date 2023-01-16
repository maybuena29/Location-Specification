const express = require('express');
const importfromExlCtrl = require('../controllers/importfromExcel.controller');

const importfromExlRoute = express.Router();

importfromExlRoute.post('/api/importfromExl/product', importfromExlCtrl.Add);

module.exports = importfromExlRoute;