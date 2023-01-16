const express = require('express');
const importfromExlCtrl = require('../controllers/importfromExl.controller');

const importfromExlRoute = express.Router();

importfromExlRoute.post('/api/importfromExl/product', importfromExlCtrl.Add);

module.exports = importfromExlRoute;