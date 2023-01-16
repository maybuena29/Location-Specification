const db = require('../main.db');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const session = require('express-session');
const audit = require('./auditlog.controller'); 
const saltRounds = 10;


function addUser(req, res){

    const username = req.body.username;
    const password = req.body.password;
    const roleID = 2;

 
    
    bcrypt.hash(password,saltRounds,(err,hash)=>
    
    {
        const sqlInsertUser="INSERT INTO tblusers (userUsername, userPassword,userRoleID) VALUES (?,?,?)";
        db.query(sqlInsertUser,[username,hash,roleID],(err,result)=>{
       
            if (err){
                res.send({err:err})
           }
    
          
                if (result.length>0){
                    res.send(result);
                    logs={
                        AuditUserCode:req.session.user.id,
                        AuditModule:"Employees",
                        AuditAction:`Added User: ${username}`
                    }
                    audit.logger(logs);
                
                }
                else{
                    res.send(err);
                }
        });
    }
    )
}


function userLogin(req, res){
    const username = req.body.username;
    const password = req.body.password;

    const sqlSelectUser="SELECT * FROM tblusers WHERE userUsername = ?";
 
   
    db.query(sqlSelectUser,[username],(err,result)=>{
       
        if (err){
            res.send({err:err})
       }

       
            if (result.length>0){
               bcrypt.compare(password,result[0].userPassword,(error,response)=>
               {
                if (response){
                    const options = {
                        maxAge: 86400 * 1000, // 24 hours
                        httpOnly: true, // http only, prevents JavaScript cookie access
                        // secure: true // cookie must be sent over https / ssl
                    }
                    
                    const user = result[0]
                    req.session.user = {
                        id: user.userID,
                        username: user.userUsername,
                        userRoleID: user.userRoleID
                    }

                    
                  
                    res.cookie('session-id',req.session.id, options)
                    return res.send({
                        message:"OK",
                        result:user
                    })
                    
                    logs={
                        AuditUserCode:req.session.user.id,
                        AuditModule:"Login",
                        AuditAction:`Logged In User: ${req.session.user.username}`
                    }
                    audit.logger(logs);
                }
                else{
                    res.status(400)
                    res.send({message:"Wrong username/password. Try Again."})
                }
               }
               )
            }
           else{
            res.status(400)
            res.send({message:"Account doesn't Exist."})
           }
       
        
    });
}


function checkloginStatus(req,res){
    if (req.session.user){
       // res.redirect("http://localhost:3000/dashboard");
        res.send({loggedIn:true, user: req.session.user });
        console.log(req.session.user);
        
    }
    else{
        res.send({loggedIn:false, user: req.session.user});
    }
}

function userLogout(req, res, next) {
   
    req.session.user = null
    req.session.save(function (err) {
      if (err) next(err)
  
      req.session.regenerate(function (err) {
        if (err) next(err)
       // res.redirect('/')
      })
    })

    //return res.redirect('http://localhost:3000/Login');
    
  }
function verifyAuth(req, res){
    const sid = req.cookies['session-id']
    if(sid == req.session.id){
        return res.send({
            message:"Authorized",
            status: 200,
            result:req.session.user
        })
    }
    
   res.status(401)
   return res.send({
        message:"Unauthorized",
        status: 401,
        data:{}
    })
}
module.exports = {
    userLogin: userLogin,
    userLogout:userLogout,
    addUser:addUser,
    verifyAuth
}