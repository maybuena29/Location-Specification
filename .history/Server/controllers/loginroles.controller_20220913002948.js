const db = require('../main.db');

function checkuser(req, res){
    const username = req.body.username;
    const password = req.body.password;

    
    const sqlSelect="SELECT * FROM tblusers";
    db.query(sqlSelect,(err,result)=>{
       res.send(result);
    });
}


module.exports = {
    display: displayData,
    // insert: insertData,
    // get: getData,
    // update: updateData,
    // delete: deleteData,
    // skuData: getSKUData,
    // ListSKU: getListSKU,
}