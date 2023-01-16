const express = require('express');
const customeAccCtrl = require('../controllers/customeraccount.controller');
const verifyAccess = require('./middleware/verifyAccess.route');
const MODULE_ID = 0;
const customerRoute = express.Router();

//Route for Client Login Module
customerRoute.get('/api/customer/account/get', verifyAccess(MODULE_ID), customeAccCtrl.display);
customerRoute.post('/api/customer/account/insert', customeAccCtrl.insert);
customerRoute.post('/api/customer/account/login', customeAccCtrl.userLogin);
customerRoute.post('/api/customer/account/logout', customeAccCtrl.userLogout);
customerRoute.post('/api/customer/account/auth/', customeAccCtrl.verifyAuth)

module.exports = customerRoute;
