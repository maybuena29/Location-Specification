const db = require('../main.db');

function displayData(req, res){
    const ParentId = req.params.id
    const sqlSelect = "SELECT * FROM tblattributesvalue WHERE Attr_Parent_ID = ?";

    db.query(sqlSelect, ParentId, (err, result) => {
        res.send(result);
        console.log(result);
    });

    const totalValue = "UPDATE tblattributes SET total_value = (SELECT COUNT(*) FROM tblattributesvalue WHERE Attr_Parent_ID = ?) WHERE Attr_ID = ?; ";

    db.query(totalValue, [ParentId, ParentId], (err, resu) => {
        console.log(resu[0]);
    })
};

function getAttrName(req, res){
    const ParentId = req.params.id
    const sqlSelect = "SELECT Attribute_Name FROM tblattributes WHERE Attr_ID = ?";

    db.query(sqlSelect, ParentId, (err, result) => {
        res.send(result[0]);
        console.log(result[0]);
    });
};

function insertDataExl(req, res){
    
    const data = req.body.data;
    const Status = "Active"

    const sqlInsert = "INSERT IGNORE INTO tblattributesvalue (Value_Name, Attr_Parent_ID, ValStatus) Values(?,(SELECT Attr_ID FROM tblattributes WHERE Attribute_Name =?),?)";
    data.map((rows)=>{
    db.query(sqlInsert, [data.productAttribute, data.productAttrValue, Status], (err, result) => {
        console.log(result);
        console.log(data);
        console.log(data.productAttribute)
        console.log(data.productAttrValue)
        
    });
})

}
function insertData(req, res){
    
    const ValName = req.body.ValueName
    const ParentId = req.body.ParentID
    const Status = req.body.Status

    const sqlInsert = "INSERT INTO tblattributesvalue (Value_Name, Attr_Parent_ID, ValStatus) VALUES (?,?,?)";

    db.query(sqlInsert, [ValName, ParentId, Status], (err, result) => {
        console.log(result);
    });

}

function getData(req, res){
    const id = req.params.id;
    const sqlSelect = "SELECT * FROM tblattributesvalue WHERE Value_ID = ?";

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
    const ValName = req.body.ValueName
    const ParentId = req.body.ParentID
    const Status = req.body.Status

    const sqlSelect = "UPDATE tblattributesvalue SET Value_Name = ?, ValStatus = ? WHERE Value_ID = ?";

    db.query(sqlSelect, [ValName, Status, id, ParentId], (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result);
        console.log(result);
    });
}

function deleteData(req, res){
    
    const id = req.params.id;
    const sqlRemove = "DELETE FROM tblattributesvalue WHERE Value_ID = ?";

    db.query(sqlRemove, id, (err, result) => {
        if(err){
            console.log(err);
        }
    });
}

function getAttrValue(req, res){
    const id = req.params.id
    const sqlSelect = "SELECT Value_Name FROM tblattributesvalue WHERE ValStatus = 'active' AND Attr_Parent_ID = ?";
    
    db.query(sqlSelect, id, (err, result) => {
        res.send(result);
        console.log(result);
        console.log("id: " +id);
    });
}

module.exports = {
    display: displayData,
    getAttr: getAttrName,
    insert: insertData,
    insertExl: insertDataExl,
    get: getData,
    update: updateData,
    delete: deleteData,
    getVal: getAttrValue
}