const db = require('../main.db');

const bcrypt = require('bcrypt');
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
                    console.log(result);
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
                    req.session.user=result;
                    console.log(req.session.user);
                    res.send(result);
                  
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
module.exports = {
    logStatus:checkloginStatus,
    userLogin: userLogin,
    userLogout:userLogout,
    addUser:addUser,
    
    // insert: insertData,
    // get: getData,
    // update: updateData,
    // delete: deleteData,
    // skuData: getSKUData,
    // ListSKU: getListSKU,
}