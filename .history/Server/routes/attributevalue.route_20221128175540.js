const express = require('express');
const attrValCtrl = require('../controllers/attrvalue.controller');
const verifyAccess = require('./middleware/verifyAccess.route');
const MODULE_ID =9 ;

const attrValRoute = express.Router();

//Route for Brand Module
attrValRoute.get('/api/attrvalue/display/:id',verifyAccess(MODULE_ID), attrValCtrl.display);
attrValRoute.get('/api/attrvalue/get/attrname/:id', attrValCtrl.getAttr);
attrValRoute.post('/api/attrvalue/insert',verifyAccess(MODULE_ID), attrValCtrl.insert);
attrValRoute.get('/api/attrvalue/get/:id', attrValCtrl.get);
attrValRoute.put('/api/attrvalue/update/:id',verifyAccess(MODULE_ID), attrValCtrl.update);
attrValRoute.delete('/api/attrvalue/remove/:id',verifyAccess(MODULE_ID), attrValCtrl.delete);
attrValRoute.get('/api/attrvalue/get/attrvalname/active/:id', attrValCtrl.getVal);
// attrRoute.get('/api/attribute/checktable', attrCtrl.check);

module.exports = attrValRoute;



