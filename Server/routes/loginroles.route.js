const express = require('express');
const lgnrolesCtrl = require('../controllers/loginroles.controller');

const lgnrolesRoute = express.Router();
lgnrolesRoute.use(express());

lgnrolesRoute.post('/api/user/login', lgnrolesCtrl.userLogin);
lgnrolesRoute.post('/api/user/logout', lgnrolesCtrl.userLogout);
lgnrolesRoute.post('/api/user/auth/', lgnrolesCtrl.verifyAuth)
lgnrolesRoute.get('/api/user/get/modules/:id', lgnrolesCtrl.getModules)

module.exports = lgnrolesRoute;