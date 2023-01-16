const db = require('../main.db');
const bcrypt = require('bcrypt');
const saltRounds = 10;


function addUser(req, res){

    const username = req.body.username;
    const password = req.body.password;
    const roleID = 2;

   
    
    bcrypt.hash(password,saltRounds,(err,hash)=>
    
    {
        const sqlInsertUser="INSERT INTO (userUsername, userPassword,userRoleID) VALUES (?,?,?)";
        db.query(sqlInsertUser,[username,hash,roleID],(err,result)=>{
       
            if (err){
                res.send({err:err})
           }
    
          
                if (result.length>0){
                    res.send(result);
                    console.log(result);
                }
                else{
                    res.send({message:"Wrong username/password. Try Again."});
                    
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


module.exports = {
    login: login,
    // insert: insertData,
    // get: getData,
    // update: updateData,
    // delete: deleteData,
    // skuData: getSKUData,
    // ListSKU: getListSKU,
}