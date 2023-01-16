const express = require('express');
const categoryCtrl = require('../controllers/category.controller');
const verifyAccess = require('./middleware/verifyAccess.route');
const MODULE_ID =9 ;
const categRoute = express.Router();

//Route for Category Module
categRoute.get('/api/category/get', verifyAccess(MODULE_ID),categoryCtrl.display);
categRoute.post('/api/category/insert',verifyAccess(MODULE_ID), categoryCtrl.insert);
categRoute.get('/api/category/get/:id', categoryCtrl.get);
categRoute.put('/api/category/update/:id',verifyAccess(MODULE_ID), categoryCtrl.update);
categRoute.delete('/api/category/remove/:id', verifyAccess(MODULE_ID), categoryCtrl.delete);
categRoute.get('/api/category/get/categname/active', categoryCtrl.getCat);

module.exports = categRoute;



