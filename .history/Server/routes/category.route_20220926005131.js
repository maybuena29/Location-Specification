const express = require('express');
const categoryCtrl = require('../controllers/category.controller');

const categRoute = express.Router();

//Route for Category Module
categRoute.get('/api/category/get', categoryCtrl.display);
categRoute.post('/api/category/insert', categoryCtrl.insert);
categRoute.post('/api/category/insertExl', categoryCtrl.insertExl);
categRoute.get('/api/category/get/:id', categoryCtrl.get);
categRoute.put('/api/category/update/:id', categoryCtrl.update);
categRoute.delete('/api/category/remove/:id', categoryCtrl.delete);
categRoute.get('/api/category/get/categname/active', categoryCtrl.getCat);

module.exports = categRoute;



