const express = require('express');
const generateOrderCtrl = require('../controllers/generateOrder.controller');
const verifyAccess = require('./middleware/verifyAccess.route');
const MODULE_ID =11;
const generateOrderRoute = express.Router();

//Route for generateOrder Module
generateOrderRoute.get('/api/generateOrder/get', generateOrderCtrl.display);
generateOrderRoute.post('/api/generateOrder/insert', generateOrderCtrl.insert);
generateOrderRoute.get('/api/generateOrder/get/:id', generateOrderCtrl.get);
generateOrderRoute.put('/api/generateOrder/update/:id', generateOrderCtrl.update);
generateOrderRoute.delete('/api/generateOrder/remove/:invID', generateOrderCtrl.delete);


module.exports = generateOrderRoute;

