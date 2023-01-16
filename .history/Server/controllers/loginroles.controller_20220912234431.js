const db = require('../main.db');

function displayData(req, res){
    const sqlSelect="SELECT * FROM tblinventory";
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