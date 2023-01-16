const db = require('../main.db');

function displayData(req, res){
    const sqlSelect = "SELECT * FROM `tblstatus`";

    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
};

function insertData(req, res){
    
    const statusName = req.body.StatusName
    const status = req.body.Status

    const sqlInsert = "INSERT INTO `tblstatus`(`status_name`, `status_status`) VALUES (?, ?)";

    db.query(sqlInsert, [statusName, status], (err, result) => {
        if (err){
            console.log(err);
        }
        else{
            console.log(result);
        }
    });
    
}

function getData(req, res){
    const id = req.params.id;
    const sqlSelect = "SELECT * FROM `tblstatus` WHERE `status_id`=?";

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
    const statusName = req.body.StatusName
    const status = req.body.Status

    const sqlSelect = "UPDATE `tblstatus` SET `status_name`=?,`status_status`=? WHERE `status_id`=?";

    db.query(sqlSelect, [statusName, status, id], (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
            console.log(result);
        }
    });
}

async function deleteData(req, res){
    
    const id = req.params.id;
    const sqlRemove = "DELETE FROM `tblstatus` WHERE `status_id`=?";

    async function getStatusName(){
        async function query(){
            return new Promise((resolve, reject)=>{
                 db.query("SELECT `status_name` FROM `tblstatus` WHERE `status_id`=?",[id],(err,result)=>{
                    if (err){
                        reject(err);
                        console.log("Error: "+err.errno);
                        console.log(err);
                    }
                    else{
                        resolve(result[0].status_name);
                    }
                })
           })
        }
    
        const result = await query()
            return result
        }
    
        const StatusName = await getStatusName();


    db.query(sqlRemove, id, (err, result) => {
        if(err){
            console.log(err);
            res.send({errorno: err.errno});
        }
        else{ 
            res.send(result);
        }
    });
}

async function getStatus(req, res){
    const sqlSelect = "SELECT `status_id`, `status_name`, `status_status` FROM `tblstatus` WHERE `status_status`='active'";

    db.query(sqlSelect, (err, result) => {
        if (err){
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
    get: getData,
    update: updateData,
    delete: deleteData,
    getStat: getStatus
}