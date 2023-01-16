const express = require('express');
const employeeCtrl = require('../controllers/employee.controller');
const verifyAccess = require('./middleware/verifyAccess.route');
const employeeRoute = express.Router();

//Route for employee Module
employeeRoute.get('/api/employee/get',verifyAccess(MODULE_ID), employeeCtrl.display);
employeeRoute.post('/api/employee/insert',verifyAccess(MODULE_ID), employeeCtrl.insert);
employeeRoute.get('/api/employee/get/:id', verifyAccess(MODULE_ID),employeeCtrl.get);
employeeRoute.put('/api/employee/update/:id',verifyAccess(MODULE_ID), employeeCtrl.update);
//employeeRoute.delete('/api/employee/remove/:id', employeeCtrl.delete);


module.exports = employeeRoute;

