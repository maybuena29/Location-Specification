const express = require('express');
const rolesCtrl = require('../controllers/roles.controller');
const verifyAccess = require('./middleware/verifyAccess.route');
const MODULE_ID = 0;
const rolesRoute = express.Router();

//Route for roles Module
rolesRoute.get('/api/roles/get', verifyAccess(MODULE_ID),rolesCtrl.displayUserRoles);
rolesRoute.post('/api/roles/insert',verifyAccess(MODULE_ID), rolesCtrl.insertUserRoles);
rolesRoute.get('/api/roles/get/:id',verifyAccess(MODULE_ID), rolesCtrl.getUserRoles);
rolesRoute.put('/api/roles/update/:id',verifyAccess(MODULE_ID), rolesCtrl.updateUserRoles);
rolesRoute.get('/api/roles/getmoduleList', verifyAccess(MODULE_ID),rolesCtrl.getModuleList);
rolesRoute.post('/api/roles/module/insert', verifyAccess(MODULE_ID),rolesCtrl.insertUserModule);
rolesRoute.get('/api/roles/module/get/:id', verifyAccess(MODULE_ID),rolesCtrl.getUserModule);
rolesRoute.put('/api/roles/moduleupdate/:id', verifyAccess(MODULE_ID),rolesCtrl.updateUserModule);

//rolesRoute.delete('/api/roles/remove/:id', rolesCtrl.delete);


module.exports = rolesRoute;

