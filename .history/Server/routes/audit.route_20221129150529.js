const express = require('express');
const auditCtrl = require('../controllers/audit.controller');
const verifyAccess = require('./middleware/verifyAccess.route');
const MODULE_ID=0;
const auditRoute = express.Router();

//Route for Brand Module
auditRoute.get('/api/audit/log',verifyAccess(MODULE_ID),auditCtrl.displayAudit);


module.exports = auditRoute;