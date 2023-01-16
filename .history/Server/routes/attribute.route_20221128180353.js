const express = require('express');
const attrCtrl = require('../controllers/attribute.controller');
const verifyAccess = require('./middleware/verifyAccess.route');
const MODULE_ID = 9 

const attrRoute = express.Router();

//Route for Brand Module
attrRoute.get('/api/attribute/get', verifyAccess(MODULE_ID),attrCtrl.display);
attrRoute.post('/api/attribute/insert',verifyAccess(MODULE_ID), attrCtrl.insert);
attrRoute.get('/api/attribute/get/:id', attrCtrl.get);
attrRoute.put('/api/attribute/update/:id', verifyAccess(MODULE_ID),attrCtrl.update);
attrRoute.delete('/api/attribute/remove/:id',verifyAccess(MODULE_ID), attrCtrl.delete);
attrRoute.get('/api/attribute/get/attrname/active', attrCtrl.getAttr);
// attrRoute.get('/api/attribute/checktable', attrCtrl.check);

module.exports = attrRoute;



