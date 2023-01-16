const db = require('../main.db');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

function displayData(req, res){
    const sqlSelect = "SELECT * FROM `tblcustomer` WHERE CustCode > 0";

    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
};

function insertData(req, res){
    const customerCode = req.body.CustomerCode
    const username = req.body.Username
    const password = req.body.Password
    const customerName = req.body.Name
    const contact = req.body.Contact
    const address = req.body.Address
    const email = req.body.Email
    const status = req.body.Status

    bcrypt.hash(password,saltRounds,(err,hash)=>{
        const sqlInsert = "INSERT INTO `tblcustomer`(`CustCode`, `Username`, `Password`, `CustName`, `Contact`, `Address`, `Email`, `Status`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

        db.query(sqlInsert, [customerCode, username, hash, customerName, contact, address, email, status], (err, result) => {
            if (err){
                console.log(err);
            }
            console.log(result);
            res.send(result);
            
        });
    })
    
}


function userLogin(req, res){
    const username = req.body.username;
    const password = req.body.password;
    const sqlSelectUser="SELECT * FROM tblcustomer WHERE Username = ?";
    db.query(sqlSelectUser,[username],(err,result)=>{
        if (err){
            res.send({err:err})
       }
            if (result.length>0){
                console.log(result)
               bcrypt.compare(password,result[0].Password,(error,response)=>
               {
                if (response){
                   const user = result[0]
                   console.log(user.Status)
                    if (user.Status==="inactive"){
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
                            CustCode: user.CustCode,
                            CustName: user.CustName,
                            userRoleID: user.userRoleID,
                            Status: user.Status
                        }                        
            
                        res.cookie('client-session-id',req.session.id, options)
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
            console.log(result)
            res.status(400)
            res.send({message:"Account doesn't Exist."})
           }
       
        
    });
}

async function userLogout(req, res, next) {
    
    req.session.user = null
    
    req.session.save(function (err) {
      if (err) next(err)
  
      req.session.regenerate(function (err) {
        if (err) next(err)
       // res.redirect('/')
      })
    })

    
    res.clearCookie("clear-session-id","userID");
    res.end();
    //return res.redirect('http://localhost:3000/Login');
    
  }

  function verifyAuth(req, res){
    const sid = req.cookies['client-session-id']
    if(sid == req.session.id){
        if (req.session.Status==="inactive"){
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

function getData(req, res){
    const id = req.params.id;
    const sqlSelect = "SELECT `CustomerCode`, `Username`, `Password`, `Status` FROM `tblcustomeraccount` WHERE `CustAccountID` = ?";

    db.query(sqlSelect, id, (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result[0]);
        console.log(result[0]);
    });
}

function updateData(req, res){
    const id = req.params.id;
    const BrandName = req.body.BrandName
    const Status = req.body.Status

    const sqlSelect = "UPDATE tblbrand SET Brand_Name = ?, Status = ? WHERE BrandID = ?";

    db.query(sqlSelect, [BrandName, Status, id], (err, result) => {
        if(err){
            console.log(err);
        }
            else{
                res.send(result);
                console.log(result);
            }
        
    });
}

module.exports = {
    display: displayData,
    insert: insertData,
    userLogin: userLogin,
    userLogout: userLogout,
    verifyAuth:verifyAuth
}