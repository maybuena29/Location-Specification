const db = require('../main.db');

function displayData(req, res){
    const sqlSelect = "SELECT * FROM `tblrooms`";

    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
};

function insertData(req, res){
    
    const roomName = req.body.RoomName
    const status = req.body.Status

    const sqlInsert = "INSERT INTO `tblrooms`(`room_name`, `room_status`) VALUES (?, ?)";

    db.query(sqlInsert, [roomName, status], (err, result) => {
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
    const sqlSelect = "SELECT * FROM `tblrooms` WHERE room_id = ?";

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
    const roomName = req.body.RoomName;
    const status = req.body.Status;

    const sqlSelect = "UPDATE `tblrooms` SET `room_name`=?, `room_status`=? WHERE `room_id`=?";

    db.query(sqlSelect, [roomName, status, id], (err, result) => {
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
    const sqlRemove = "DELETE FROM `tblrooms` WHERE `room_id`=?";

    async function getRoomName(){
        async function query(){
            return new Promise((resolve, reject)=>{
                 db.query("SELECT `room_name` FROM `tblrooms` WHERE `room_id`=?",[id],(err,result)=>{
                    if (err){
                        reject(err);
                        console.log("Error: "+err.errno);
                        console.log(err);
                    }
                    else{
                        resolve(result[0].room_name);
                    }
                })
           })
        }
    
        const result = await query()
            return result
        }
    
        const RoomName = await getRoomName();


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

async function getRoom(req, res){
    const sqlSelect = "SELECT `room_id`, `room_name`, `room_status` FROM `tblrooms` WHERE `room_status`='active'";
  
    
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
    getRm: getRoom
}