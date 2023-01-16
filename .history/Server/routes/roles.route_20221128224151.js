const express = require('express');
const rolesCtrl = require('../controllers/roles.controller');

const rolesRoute = express.Router();

//Route for roles Module
rolesRoute.get('/api/roles/get', rolesCtrl.displayUserRoles);
rolesRoute.post('/api/roles/insert', rolesCtrl.insertUserRoles);
rolesRoute.get('/api/roles/get/:id', rolesCtrl.getUserRoles);
rolesRoute.put('/api/roles/update/:id', rolesCtrl.updateUserRoles);
rolesRoute.get('/api/roles/getmoduleList', rolesCtrl.getModuleList);
rolesRoute.post('/api/roles/module/insert', rolesCtrl.insertUserModule);
rolesRoute.get('/api/roles/module/get/:id', rolesCtrl.getUserModule);
rolesRoute.put('/api/roles/moduleupdate/:id', rolesCtrl.updateUserModule);

//rolesRoute.delete('/api/roles/remove/:id', rolesCtrl.delete);


module.exports = rolesRoute;

