const db = require('../main.db');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

function displayData(req, res){
    const sqlSelect = "SELECT `teacher_id`, `teacher_username`, `teacher_password`, `teacher_image`, `teacher_name`, (SELECT `room_name` FROM `tblrooms` WHERE `room_id` = `location`) AS 'location', (SELECT `status_name` FROM `tblstatus` WHERE `status_id` = `status`) AS 'status', `currentStatus`, `acc_status` FROM `tblteachers`";

    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
};

function insertData(req, res){
    const username = req.body.teacherUsername;
    const password = req.body.teacherPassword;
    const image = req.body.teacherImage;
    const name = req.body.teacherName;
    const location = req.body.teacherLocation;
    const status = req.body.teacherStatus;
    const currStatus = req.body.teacherCurrentStatus;
    const acc_status = req.body.teacherAccStatus;

    bcrypt.hash(password,saltRounds,(err,hash)=>
    {
        const sqlSearchUser="SELECT * from tblteachers WHERE teacher_username = ?";
        db.query(sqlSearchUser, username,(err,result)=>{
            if (err){
                res.send(err);
                console.log(err);
            }
            if (result.length>=1){
                return res.send({message:"Username already Exist"}).status(400);
            }
            else{
                const sqlInsertUser="INSERT INTO `tblteachers`(`teacher_username`, `teacher_password`, `teacher_image`, `teacher_name`, `location`, `status`, `currentStatus`, `acc_status`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
                db.query(sqlInsertUser,[username, hash, image, name, location, status, currStatus, acc_status],(err,result)=>{
                    if (err){
                        res.send({err:err})
                    }
                    else{
                        res.send(result);
                    }
                });
            }
        })
})}

function getData(req, res){
    const id = req.params.id;
    const sqlSelect = "SELECT * FROM `tblteachers` WHERE `teacher_id` = ?";

    db.query(sqlSelect, id, (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result[0]);
        }
    });
}

function updateData(req, res){
    const id = req.params.id;
    const username = req.body.teacherUsername;
    const password = req.body.teacherPassword;
    const image = req.body.teacherImage;
    const name = req.body.teacherName;
    const location = req.body.teacherLocation;
    const status = req.body.teacherStatus;
    const currStatus = req.body.teacherCurrentStatus;
    const acc_status = req.body.teacherAccStatus;

    bcrypt.hash(password,saltRounds,(err,hash)=>{
        if(password===null || password===undefined || password===''){
            const sqlUpdateUser="UPDATE `tblteachers` SET `teacher_username`=?, `teacher_image`=? ,`teacher_name`=? ,`location`=? ,`status`=?, `currentStatus`=?, `acc_status`=? WHERE `teacher_id`=?";
            db.query(sqlUpdateUser,[username, image, name, location, status, currStatus, acc_status, id],(err,result)=>{
                if (err){
                    res.send({err:err})
                    console.log(err);
                }
                else{
                    res.send(result);
                    console.log("result sa update: ", result);
                }
            });
        }
        else{
            const sqlUpdateUser="UPDATE `tblteachers` SET `teacher_username`=?, `teacher_password`=? ,`teacher_image`=? ,`teacher_name`=? ,`location`=? ,`status`=?, `currentStatus`=?, `acc_status`=? WHERE `teacher_id`=?";
            db.query(sqlUpdateUser,[username, hash, image, name, location, status, currStatus, acc_status, id],(err,result)=>{
                if (err){
                    res.send({err:err})
                    console.log(err);
                }
                else{
                    res.send(result);
                    console.log("result sa update: ", result);
                }
            });
        }
    })
}

function getActiveTeacher(req, res){
    const id = req.params.id;
    const sqlSelect = "SELECT `teacher_id`, `teacher_username`, `teacher_password`, `teacher_image`, `teacher_name`, (SELECT `room_name` FROM `tblrooms` WHERE `room_id` = `location`) AS 'location', (SELECT `status_name` FROM `tblstatus` WHERE `status_id` = `status`) AS 'status', `currentStatus`, `acc_status` FROM `tblteachers` WHERE `acc_status` = 'active'";

    db.query(sqlSelect, id, (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
}

function verify(req,res){
    res.send("Verified");
}


function userLogin(req, res){
    const username = req.body.teacher_username;
    const password = req.body.teacher_password;
    const sqlSelectUser="SELECT `teacher_id`, `teacher_username`, `teacher_password`, `teacher_image`, `teacher_name`, (SELECT `room_name` FROM `tblrooms` WHERE `room_id` = `location`) AS 'location', (SELECT `status_name` FROM `tblstatus` WHERE `status_id` = `status`) AS 'status', `currentStatus`, `acc_status` FROM `tblteachers` WHERE teacher_username = ?";
    db.query(sqlSelectUser,[username],(err,result)=>{
        if (err){
            res.send({err:err})
       }
            if (result.length>0){
                console.log(result)
               bcrypt.compare(password,result[0].teacher_password,(error,response)=>
               {
                if (response){
                   const user = result[0]
                   console.log(user.acc_status)
                    if (user.acc_status==="inactive"){
                        res.status(400)
                        res.send({message:"Account Deactivated. Please contact Admin."})
                    }
                    else{
                        const options = {
                            maxAge: 86400 * 1000 *365, // 24 hours
                            httpOnly: true, // http only, prevents JavaScript cookie access
                            // secure: true // cookie must be sent over https / ssl
                        }
                                               
                        req.session.user = {
                            teacher_id: user.teacher_id,
                            teacher_username: user.teacher_username,
                            teacher_image: user.teacher_image,
                            teacher_name: user.teacher_name,
                            location: user.location,
                            status: user.status,
                            currentStatus: user.currentStatus,
                            acc_status: user.acc_status
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

module.exports = {
    display: displayData,
    insert: insertData,
    get: getData,
    update: updateData,
    getActive: getActiveTeacher,
    userLogin: userLogin,
    userLogout: userLogout,
    verifyAuth: verifyAuth
}