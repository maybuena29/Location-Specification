const express = require('express');
const pointsCtrl = require('../controllers/points.controller');
const verifyAccess = require('./middleware/verifyAccess.route');
const MODULE_ID=0;
const pointsRoute = express.Router();

//Route for points Module
pointsRoute.get('/api/points/get/CP', verifyAccess(MODULE_ID),pointsCtrl.display);
pointsRoute.post('/api/points/insert/CP', pointsCtrl.insert);
pointsRoute.get('/api/points/get/CP/pointhistory', pointsCtrl.PointHistory);
pointsRoute.get('/api/points/get/CP/:id', pointsCtrl.get);
pointsRoute.put('/api/points/update/CP/:id',verifyAccess(MODULE_ID), pointsCtrl.update);
pointsRoute.delete('/api/points/remove/CP/:PID', verifyAccess(MODULE_ID),pointsCtrl.delete);

module.exports = pointsRoute;