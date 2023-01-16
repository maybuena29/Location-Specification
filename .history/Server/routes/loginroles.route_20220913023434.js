const express = require('express');
const lgnrolesCtrl = require('../controllers/loginroles.controller');
const cors = require('cors')
const express = require("express");
const cookieParser = require('cookie-parser')
const session = require('express-session'); 
const e = require('cors');
const app = express();
app.use(cors({
    origin=[""]
    credentials:true
}));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    key:"userID",
    secret:"CorumedProject",
    resave:false,
    saveUninitialized:false,
    cookie:{
        expires:30*60,
    }
    
}))

const lgnrolesRoute = express.Router();
lgnrolesRoute.use(cors())
//Route for login Module
lgnrolesRoute.post('/api/user/login', lgnrolesCtrl.login);
lgnrolesRoute.get('/api/user/login', lgnrolesCtrl.logStatus);
lgnrolesRoute.post('/api/user/adduser', lgnrolesCtrl.addUser);
// lgnrolesRoute.post('/api/attribute/insert', attrCtrl.insert);
// lgnrolesRoute.get('/api/attribute/get/:id', attrCtrl.get);
// lgnrolesRoute.put('/api/attribute/update/:id', attrCtrl.update);
// lgnrolesRoute.delete('/api/attribute/remove/:id', attrCtrl.delete);
// lgnrolesRoute.get('/api/attribute/get/attrname/active', attrCtrl.getAttr);
// lgnrolesRoute.get('/api/attribute/get/attrname/active/:AttrName', attrCtrl.getAttrIDfName);
// lgnrolesRoute.get('/api/attribute/checktable', attrCtrl.check);

module.exports = lgnrolesRoute;



