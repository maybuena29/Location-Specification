const express = require('express');
const dashCtrl = require('../controllers/dashboard.controller');

const dashRoute = express.Router();

dashRoute.get('/api/dashboard/get/totalteachers', dashCtrl.displayTeachers);
dashRoute.get('/api/dashboard/get/totalrooms', dashCtrl.displayRooms);
dashRoute.get('/api/dashboard/get/totalstatus', dashCtrl.displayStatus);

module.exports = dashRoute;