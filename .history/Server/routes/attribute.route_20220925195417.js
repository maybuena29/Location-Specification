const express = require('express');
const attrCtrl = require('../controllers/attribute.controller');

const attrRoute = express.Router();

//Route for Brand Module
attrRoute.get('/api/attribute/get', attrCtrl.display);
attrRoute.post('/api/attribute/insert', attrCtrl.insert);
attrRoute.post('/api/attribute/insertExl', attrCtrl.insertExl);
attrRoute.get('/api/attribute/get/:id', attrCtrl.get);
attrRoute.put('/api/attribute/update/:id', attrCtrl.update);
attrRoute.delete('/api/attribute/remove/:id', attrCtrl.delete);
attrRoute.get('/api/attribute/get/attrname/active/', attrCtrl.getAttr);
attrRoute.get('/api/attribute/get/attrname/getID/:AttrName', attrCtrl.getAttrID);
// attrRoute.get('/api/attribute/checktable', attrCtrl.check);

module.exports = attrRoute;