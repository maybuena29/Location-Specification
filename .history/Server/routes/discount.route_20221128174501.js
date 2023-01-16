const express = require('express');
const discountCtrl = require('../controllers/discount.controller');

const discountRoute = express.Router();

//Route for Discount Module
discountRoute.get('/api/discount/get', discountCtrl.display);
discountRoute.post('/api/discount/insert', discountCtrl.insert);
discountRoute.get('/api/discount/get/:id', discountCtrl.get);
discountRoute.put('/api/discount/update/:id', discountCtrl.update);
discountRoute.delete('/api/discount/remove/:id', discountCtrl.delete);
discountRoute.get('/api/discount/get/disc/active', discountCtrl.getDisc);

module.exports = discountRoute;



