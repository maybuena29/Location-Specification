const express = require('express');
const attrCtrl = require('../controllers/attribute.controller');

const lgnrolesRoute = express.Router();

//Route for Brand Module
lgnrolesRoute.get('/api/attribute/get', attrCtrl.display);
lgnrolesRoute.post('/api/attribute/insert', attrCtrl.insert);
lgnrolesRoute.get('/api/attribute/get/:id', attrCtrl.get);
lgnrolesRoute.put('/api/attribute/update/:id', attrCtrl.update);
lgnrolesRoute.delete('/api/attribute/remove/:id', attrCtrl.delete);
lgnrolesRoute.get('/api/attribute/get/attrname/active', attrCtrl.getAttr);
lgnrolesRoute.get('/api/attribute/get/attrname/active/:AttrName', attrCtrl.getAttrIDfName);
// lgnrolesRoute.get('/api/attribute/checktable', attrCtrl.check);

module.exports = lgnrolesRoute;



