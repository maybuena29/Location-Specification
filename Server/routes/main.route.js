const express = require('express');
const dashRoute = require('../routes/dashboard.route');
const teacherRoute = require('../routes/teacher.route');
const loginRoute = require('../routes/loginroles.route');
const roomsRoute = require('../routes/rooms.route');
const statusRoute = require('../routes/status.route');

const mainRoute = express.Router();

mainRoute.use(dashRoute);
mainRoute.use(teacherRoute);
mainRoute.use(loginRoute);
mainRoute.use(roomsRoute);
mainRoute.use(statusRoute);

module.exports = mainRoute;