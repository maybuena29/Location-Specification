const express = require('express');
const statusCtrl = require('../controllers/status.controller');
const verifyAccess = require('./middleware/verifyAccess.route');
const MODULE_ID = 3;

const statusRoute = express.Router();

//Route for Brand Module
statusRoute.get('/api/status/get',verifyAccess(MODULE_ID), statusCtrl.display);
statusRoute.post('/api/status/insert',verifyAccess(MODULE_ID), statusCtrl.insert);
statusRoute.get('/api/status/get/:id', statusCtrl.get);
statusRoute.put('/api/status/update/:id', verifyAccess(MODULE_ID),statusCtrl.update);
statusRoute.delete('/api/status/remove/:id',verifyAccess(MODULE_ID), statusCtrl.delete);
statusRoute.get('/api/status/get/sname/active', statusCtrl.getStat);

module.exports = statusRoute;



