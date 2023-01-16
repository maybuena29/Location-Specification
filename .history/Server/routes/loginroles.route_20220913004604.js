const express = require('express');
const lgnrolesCtrl = require('../controllers/loginroles.controller');

const lgnrolesRoute = express.Router();

//Route for login Module
 lgnrolesRoute.get('/api/user/login', lgnroles.login);
// lgnrolesRoute.post('/api/attribute/insert', attrCtrl.insert);
// lgnrolesRoute.get('/api/attribute/get/:id', attrCtrl.get);
// lgnrolesRoute.put('/api/attribute/update/:id', attrCtrl.update);
// lgnrolesRoute.delete('/api/attribute/remove/:id', attrCtrl.delete);
// lgnrolesRoute.get('/api/attribute/get/attrname/active', attrCtrl.getAttr);
// lgnrolesRoute.get('/api/attribute/get/attrname/active/:AttrName', attrCtrl.getAttrIDfName);
// lgnrolesRoute.get('/api/attribute/checktable', attrCtrl.check);

module.exports = lgnrolesRoute;



