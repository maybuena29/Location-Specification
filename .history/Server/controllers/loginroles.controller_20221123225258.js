const db = require('../main.db');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const session = require('express-session');
const audit = require('./auditlog.controller'); 
const saltRounds = 10;





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
                   const user = result[0]
                   console.log(user.userStatus)
                    if (user.userStatus==="inactive"){
                        res.status(400)
                        res.send({message:"Account Deactivated. Please contact Admin."})
                    }
                    else{
                        const options = {
                            maxAge: 86400 * 1000, // 24 hours
                            httpOnly: true, // http only, prevents JavaScript cookie access
                            // secure: true // cookie must be sent over https / ssl
                        }
                        
                        
                        req.session.user = {
                            id: user.userID,
                            username: user.userUsername,
                            userRoleID: user.userRoleID,
                            userStatus: user.userStatus
                        }
    
                        logs={
                            AuditUserCode:req.session.user.id,
                            AuditModule:"Login",
                            AuditAction:`Logged In User: ${req.session.user.username}`
                        }
                        audit.logger(logs);
                      
                        
                      
                        res.cookie('session-id',req.session.id, options)
                        return res.send({
                            message:"OK",
                            result:user
                        })
    
                        
                    }
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

async function userLogout(req, res, next) {
    
   
    req.session.user = null
    
    res.clearCookie("session-id");
    res.end();
    res.clearCookie("userID");
    res.end();
    
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
        if (req.session.userStatus==="inactive"){
            return res.send({
                message:"Unauthorized",
                status: 401,
                data:{}
            })
        }
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
    //addUser:addUser,
    verifyAuth
}