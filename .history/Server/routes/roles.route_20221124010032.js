const express = require('express');
const employeeCtrl = require('../controllers/roles.controller');

const employeeRoute = express.Router();

//Route for roles Module
employeeRoute.get('/api/roles/get', employeeCtrl.display);
employeeRoute.post('/api/roles/insert', employeeCtrl.insert);
employeeRoute.get('/api/roles/get/:id', employeeCtrl.get);
employeeRoute.put('/api/roles/update/:id', employeeCtrl.update);
//employeeRoute.delete('/api/roles/remove/:id', employeeCtrl.delete);


module.exports = employeeRoute;

