const express = require('express');
const lgnrolesCtrl = require('../controllers/loginroles.controller');

const lgnrolesRoute = express.Router();

const cookieParser = require('cookie-parser')
const session = require('express-session'); 
const cors = require('cors')
lgnrolesRoute.use(cors({
    origin:["http://localhost:3000"],
    methods:["GET","POST"],
    credentials:true
}));
lgnrolesRoute.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept');
    next();
});
lgnrolesRoute.use(express.json());
lgnrolesRoute.use(cookieParser());
lgnrolesRoute.use(session({
    key:"userID",
    secret:"CorumedProject",
    resave:false,
    saveUninitialized:false,
    cookie:{
        expires:30*60,
    }
    
}))


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



