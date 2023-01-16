const express = require('express');
const importfromExlCtrl = require('../controllers/importfromExl.controller');

const importfromExlRoute = express.Router();

importfromExlRoute.post('/api/importfromExl/insert', importfromExlCtrl.Add);

module.exports = importfromExlRoute;
