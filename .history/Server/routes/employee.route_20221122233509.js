const express = require('express');
const employeeCtrl = require('../controllers/employee.controller');

const employeeRoute = express.Router();

//Route for employee Module
employeeRoute.get('/api/employee/get', employeeCtrl.display);
employeeRoute.post('/api/employee/insert', employeeCtrl.insert);
employeeRoute.get('/api/employee/get/:id', employeeCtrl.get);
employeeRoute.put('/api/employee/update/:id', employeeCtrl.update);
employeeRoute.delete('/api/employee/remove/:invID', employeeCtrl.delete);


module.exports = employeeRoute;

