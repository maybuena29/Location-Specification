const express = require('express');
const generateOrderCtrl = require('../controllers/generateOrder.controller');
const verifyAccess = require('./middleware/verifyAccess.route');
const MODULE_ID =11;
const generateOrderRoute = express.Router();

//Route for generateOrder Module
generateOrderRoute.get('/api/generateOrder/get/verify',verifyAccess(MODULE_ID), generateOrderCtrl.display);
generateOrderRoute.get('/api/generateOrder/get',verifyAccess(MODULE_ID), generateOrderCtrl.display);
generateOrderRoute.post('/api/generateOrder/insert', verifyAccess(MODULE_ID),generateOrderCtrl.insert);
generateOrderRoute.get('/api/generateOrder/get/:id', generateOrderCtrl.get);
generateOrderRoute.put('/api/generateOrder/update/:id', verifyAccess(MODULE_ID),generateOrderCtrl.update);
generateOrderRoute.delete('/api/generateOrder/remove/:invID', verifyAccess(MODULE_ID),generateOrderCtrl.delete);


module.exports = generateOrderRoute;

