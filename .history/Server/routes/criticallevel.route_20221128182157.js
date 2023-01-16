const express = require('express');
const critLevelCtrl = require('../controllers/criticallevel.controller');
const verifyAccess = require('./middleware/verifyAccess.route');
const MODULE_ID = 15;
const critLevelRoute = express.Router();

//Route for Discount Module
critLevelRoute.get('/api/critical/level/get', verifyAccess(MODULE_ID),critLevelCtrl.display);
critLevelRoute.post('/api/critical/level/insert',verifyAccess(MODULE_ID), critLevelCtrl.insert);
critLevelRoute.get('/api/critical/level/get/:id', critLevelCtrl.get);
critLevelRoute.put('/api/critical/level/update/:id', verifyAccess(MODULE_ID),critLevelCtrl.update);
critLevelRoute.delete('/api/critical/level/remove/:id',verifyAccess(MODULE_ID), critLevelCtrl.delete);

module.exports = critLevelRoute;