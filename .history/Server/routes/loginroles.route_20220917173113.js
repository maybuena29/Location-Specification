const express = require('express');
const lgnrolesCtrl = require('../controllers/loginroles.controller');

const lgnrolesRoute = express.Router();
//lgnrolesRoute.use(express());
// const cookieParser = require('cookie-parser')
// const session = require('express-session'); 
// const cors = require('cors')
// // lgnrolesRoute.use(cors({
// //     origin:["https://cors-anywhere.herokuapp.com/http://localhost:3000/"],
// //     methods:["GET","POST"],
// //     credentials:true
// // }));
// // lgnrolesRoute.use(cors({ origin: true }));
// lgnrolesRoute.use(express.json());
// lgnrolesRoute.use(cookieParser());
// lgnrolesRoute.use(session({
//     key:"userID",
//     secret:"corumed_pharmacy",
//     resave:false,
//     saveUninitialized:false,
//     cookie:{
//         expires:30*60*1000,
//     }
    
// }))


// lgnrolesRoute.use(cors({
//     credentials: true, origin: 'http://localhost:3000'
// }))
//Route for login Module
lgnrolesRoute.get('/api/user/login', lgnrolesCtrl.logStatus);
lgnrolesRoute.post('/api/user/login', lgnrolesCtrl.userLogin);
lgnrolesRoute.post('/api/user/logout', lgnrolesCtrl.userLogout);
lgnrolesRoute.post('/api/user/adduser', lgnrolesCtrl.addUser);
// lgnrolesRoute.post('/api/attribute/insert', attrCtrl.insert);
// lgnrolesRoute.get('/api/attribute/get/:id', attrCtrl.get);
// lgnrolesRoute.put('/api/attribute/update/:id', attrCtrl.update);
// lgnrolesRoute.delete('/api/attribute/remove/:id', attrCtrl.delete);
// lgnrolesRoute.get('/api/attribute/get/attrname/active', attrCtrl.getAttr);
// lgnrolesRoute.get('/api/attribute/get/attrname/active/:AttrName', attrCtrl.getAttrIDfName);
// lgnrolesRoute.get('/api/attribute/checktable', attrCtrl.check);

module.exports = lgnrolesRoute;



