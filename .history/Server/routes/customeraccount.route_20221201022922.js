const express = require('express');
const customeAccCtrl = require('../controllers/customeraccount.controller');

const customerRoute = express.Router();

//Route for Client Login Module
customerRoute.get('/api/customer/account/get', customeAccCtrl.display);
customerRoute.post('/api/customer/account/insert', customeAccCtrl.insert);
customerRoute.post('/api/customer/account/login', customeAccCtrl.userLogin);
customerRoute.post('/api/customer/account/logout', customeAccCtrl.userLogout);
customerRoute.post('/api/customer/account/auth/', customeAccCtrl.verifyAuth)

module.exports = customerRoute;
