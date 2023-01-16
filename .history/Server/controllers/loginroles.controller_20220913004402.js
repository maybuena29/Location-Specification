const db = require('../main.db');

function validateUser(req, res){
    const username = req.body.username;
    const password = req.body.password;


    const sqlSelect="SELECT * FROM tblusers WHERE userUsername = ?, userPassword= ?";
    db.query(sqlSelect,[username,password](err,result)=>{

       if (err){
        res.log({err:err})
       }

       
            if (result){
                res.send(result);
                console.log(result);
            }
            else{
                res.send({message:"Wrong username/password. Try Again."});
                console.log("wrong");
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