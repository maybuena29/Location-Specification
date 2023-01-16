const express = require('express');
const brandCtrl = require('../controllers/brand.controller');

const brandRoute = express.Router();

//Route for Brand Module
brandRoute.get('/api/brand/get', brandCtrl.display);
brandRoute.post('/api/brand/insert', brandCtrl.insert);
brandRoute.get('/api/brand/get/:id', brandCtrl.get);
brandRoute.put('/api/brand/update/:id', brandCtrl.update);
brandRoute.delete('/api/brand/remove/:id', brandCtrl.delete);
brandRoute.get('/api/brand/get/bname/active', brandCtrl.getBrnd);

module.exports = brandRoute;



