const express = require('express');
const auditCtrl = require('../controllers/audit.controller');

const auditRoute = express.Router();

//Route for Brand Module
auditRoute.get('/api/audit/log', auditCtrl.displayAudit);


module.exports = auditRoute;