const express = require('express');
const critLevelCtrl = require('../controllers/criticallevel.controller');

const critLevelRoute = express.Router();

//Route for Discount Module
critLevelRoute.get('/api/critical/level/get', critLevelCtrl.display);
critLevelRoute.post('/api/critical/level/insert', critLevelCtrl.insert);
critLevelRoute.get('/api/critical/level/get/:id', critLevelCtrl.get);
critLevelRoute.put('/api/critical/level/update/:id', critLevelCtrl.update);
critLevelRoute.delete('/api/critical/level/remove/:id', critLevelCtrl.delete);

module.exports = critLevelRoute;