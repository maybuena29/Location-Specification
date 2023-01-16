const db = require('../main.db');

const bcrypt = require('bcrypt');
const saltRounds = 10;
const cors = require('cors')
const express = require("express");
const cookieParser = require('cookie-parser')
const session = require('express-session'); 
const e = require('cors');
const app = express();
app.use(cors());
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
                    console.log(result);
                }
                else{
                    res.send(err);
                    
                }
           
            
        });
    }
    )
       
    
}


function login(req, res){
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
                    req.session.user=result;
                    console.log(req.session.user);
                    res.send(result)
                }
                else{
                    res.send({message:"Wrong username/password. Try Again."})
                }
               }
               )
            }
           else{
            res.send({message:"Account doesn't Exist."})
           }
       
        
    });
}

function checkloginStatus(req,res){
    if (req.session.user){
        res.send({loggedIn:true, user: req.session.user});
    }
    else{
        res.send({loggedIn:false });
    }
}

module.exports = {
    login: login,
    addUser:addUser,
    logStatus:checkloginStatus 
    // insert: insertData,
    // get: getData,
    // update: updateData,
    // delete: deleteData,
    // skuData: getSKUData,
    // ListSKU: getListSKU,
}