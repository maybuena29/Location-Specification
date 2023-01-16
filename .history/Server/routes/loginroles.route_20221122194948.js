const express = require('express');
const lgnrolesCtrl = require('../controllers/loginroles.controller');

const lgnrolesRoute = express.Router();
lgnrolesRoute.use(express());

lgnrolesRoute.post('/api/user/login', lgnrolesCtrl.userLogin);
lgnrolesRoute.post('/api/user/logout', lgnrolesCtrl.userLogout);
//lgnrolesRoute.post('/api/user/adduser', lgnrolesCtrl.addUser);
lgnrolesRoute.post('/api/user/auth/', lgnrolesCtrl.verifyAuth)
// lgnrolesRoute.post('/api/attribute/insert', attrCtrl.insert);
// lgnrolesRoute.get('/api/attribute/get/:id', attrCtrl.get);
// lgnrolesRoute.put('/api/attribute/update/:id', attrCtrl.update);
// lgnrolesRoute.delete('/api/attribute/remove/:id', attrCtrl.delete);
// lgnrolesRoute.get('/api/attribute/get/attrname/active', attrCtrl.getAttr);
// lgnrolesRoute.get('/api/attribute/get/attrname/active/:AttrName', attrCtrl.getAttrIDfName);
// lgnrolesRoute.get('/api/attribute/checktable', attrCtrl.check);

module.exports = lgnrolesRoute;