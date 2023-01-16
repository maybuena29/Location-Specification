const express = require('express');
const faqCtrl = require('../controllers/faq.controller');

const faqRoute = express.Router();

//Route for Discount Module
faqRoute.get('/api/faq/get', faqCtrl.display);
faqRoute.post('/api/faq/insert', faqCtrl.insert);
faqRoute.get('/api/faq/get/:id', faqCtrl.get);
faqRoute.put('/api/faq/update/:id', faqCtrl.update);
faqRoute.delete('/api/faq/remove/:id', faqCtrl.delete);
faqRoute.get('/api/faq/get/', faqCtrl.getActiveFAQ);

module.exports = faqRoute;



