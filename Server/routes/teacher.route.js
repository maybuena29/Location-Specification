const express = require('express');
const teacherCtrl = require('../controllers/teacher.controller');

const teacherRoute = express.Router();

teacherRoute.get('/api/teacher/get', teacherCtrl.display);
teacherRoute.post('/api/teacher/insert', teacherCtrl.insert);
teacherRoute.get('/api/teacher/get/:id', teacherCtrl.get);
teacherRoute.put('/api/teacher/update/:id', teacherCtrl.update);

<<<<<<< HEAD
teacherRoute.get('/api/teacher/get/active/account/:id', teacherCtrl.getTeacherData);
=======
>>>>>>> 8402df3b9a9ac087268d7e830ad8b1a7d87091ae
teacherRoute.get('/api/teacher/get/active/account', teacherCtrl.getActive);

teacherRoute.post('/api/teacher/account/login', teacherCtrl.userLogin);
teacherRoute.post('/api/teacher/account/logout', teacherCtrl.userLogout);
teacherRoute.post('/api/teacher/account/auth/', teacherCtrl.verifyAuth)

module.exports = teacherRoute;

