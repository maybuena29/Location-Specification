const express = require('express');
const attrValCtrl = require('../controllers/attrvalue.controller');

const attrValRoute = express.Router();

//Route for Brand Module
attrValRoute.get('/api/attrvalue/display/:id', attrValCtrl.display);
attrValRoute.get('/api/attrvalue/get/attrname/:id', attrValCtrl.getAttr);
attrValRoute.post('/api/attrvalue/insert', attrValCtrl.insert);
attrValRoute.get('/api/attrvalue/get/:id', attrValCtrl.get);
attrValRoute.put('/api/attrvalue/update/:id', attrValCtrl.update);
attrValRoute.delete('/api/attrvalue/remove/:id', attrValCtrl.delete);
attrValRoute.get('/api/attrvalue/get/attrvalname/active/:id', attrValCtrl.getVal);
// attrRoute.get('/api/attribute/checktable', attrCtrl.check);

module.exports = attrValRoute;



