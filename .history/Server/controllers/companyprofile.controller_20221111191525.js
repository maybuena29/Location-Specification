const db = require('../main.db');
const audit = require('./auditlog.controller'); 

function displayData(req, res){
    const sqlSelect = "SELECT * FROM `tblcompanyprofile`";

    db.query(sqlSelect, (err, result) => {
        res.send(result[0]);
        
       
    });
};



function updateData(req, res){
    
    const companyName = req.body.companyName;
    const owner = req.body.owner;
    const contact = req.body.contact;
    const email = req.body.email;
    const date_established = req.body.date_established;
    const address = req.body.address;
    const description = req.body.description;
    const sqlUpdate = "UPDATE tblcompanyprofile SET companyName = ?,owner = ?,contact = ?, email = ?, date_established= ?, address =?,description = ?  WHERE companyID = ?";

    db.query(sqlUpdate, [companyName,owner,contact,email,date_established,address,description,1], (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
            console.log(result);
            logs={
                AuditUserCode:req.session.user.id,
                AuditModule:"Company",
                AuditAction:`Updated Company Data`
            }
            audit.logger()
        }
        
    });
}




module.exports = {
    display: displayData,
    // insert: insertData,
    // get: getData,
     update: updateData,
    // getItems: getOrderItems,
    // insertItem: insertDataOrdsItem,
    // updateInv: updateInventory
}