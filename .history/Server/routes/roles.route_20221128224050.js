const express = require('express');
const rolesCtrl = require('..controllers/roles.controller');
const verifyAccess = require('./middleware/verifyAccess.route');
const MODULE_ID = 0;
const rolesRoute = express.Router();

//Route for roles Module
rolesRoute.get('/api/roles/get', rolesCtrl.display);
rolesRoute.post('/api/roles/insert', rolesCtrl.insert);
rolesRoute.get('/api/roles/get/:id', rolesCtrl.get);
rolesRoute.put('/api/roles/update/:id', rolesCtrl.update);
//rolesRoute.delete('/api/roles/remove/:id', rolesCtrl.delete);


module.exports = rolesRoute;

