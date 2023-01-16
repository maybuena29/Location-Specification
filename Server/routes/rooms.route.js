const express = require('express');
const roomsCtrl = require('../controllers/rooms.controller');
const verifyAccess = require('./middleware/verifyAccess.route');
const MODULE_ID = 3;

const roomRoute = express.Router();

//Route for Brand Module
roomRoute.get('/api/room/get',verifyAccess(MODULE_ID), roomsCtrl.display);
roomRoute.post('/api/room/insert',verifyAccess(MODULE_ID), roomsCtrl.insert);
roomRoute.get('/api/room/get/:id', roomsCtrl.get);
roomRoute.put('/api/room/update/:id', verifyAccess(MODULE_ID),roomsCtrl.update);
roomRoute.delete('/api/room/remove/:id',verifyAccess(MODULE_ID), roomsCtrl.delete);
roomRoute.get('/api/room/get/rname/active', roomsCtrl.getRm);

module.exports = roomRoute;



