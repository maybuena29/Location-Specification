const db = require('../main.db');

function displayData(req, res){
    const sqlSelect = "SELECT * FROM tblattributes";
    // const resetID = "ALTER TABLE tblattributes AUTO_INCREMENT = 1";

    db.query(sqlSelect, (err, result) => {
        // if(result[0] === undefined){
        //     //Query to reset id
        //     db.query(resetID, (err) => {
        //         if(err){
        //             console.log(err);
        //         }else{
        //             console.log('id reset');
        //         }
        //     })
        // }else{
        //     res.send(result);
        //     console.log(result[0]);
        // }
        res.send(result);
        console.log(result[0]);
    });
};
function insertDataExl(req, res){
    console.log("insertDataExl")
    const data = req.body.data;
    const Status = "Active";

    const sqlInsert = "INSERT INTO tblattributes (Attribute_Name, AttrStatus) VALUES (?,?)";

    data.map((rows)=>{
        db.query(sqlInsert, [rows.productAttribute, Status], (err, result) => {
            if (err) {console.log(err);}
            else{
            console.log(rows.productAttribute + " successfully added " +result);
        }
        });
    })
    
}
function insertData(req, res){
    
    const attrName = req.body.AttrName;
    const Status = req.body.AttrStatus;

    const sqlInsert = "INSERT INTO tblattributes (Attribute_Name, AttrStatus) VALUES (?,?)";

    db.query(sqlInsert, [attrName, Status], (err, result) => {
        console.log(result);
    });
    
}

function getData(req, res){
    const id = req.params.id;
    const sqlSelect = "SELECT * FROM tblattributes WHERE Attr_ID = ?";

    db.query(sqlSelect, id, (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result[0]);
        console.log(result[0]);
    });
    
    console.log(id);
}

function updateData(req, res){
    const id = req.params.id;
    const attrName = req.body.AttrName;
    const Status = req.body.AttrStatus;

    const sqlSelect = "UPDATE tblattributes SET Attribute_Name = ?, AttrStatus = ? WHERE Attr_ID = ?";

    db.query(sqlSelect, [attrName, Status, id], (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result);
        console.log(result);
    });
}

function deleteData(req, res){
    
    const id = req.params.id;
    const sqlRemove = "DELETE FROM tblattributes WHERE Attr_ID = ?";

    db.query(sqlRemove, id, (err, result) => {
        if(err){
            console.log(err);
        }
        
        res.send(result);
    });
}

//Get the active status
function getAttribute(req, res){
    const sqlSelect = "SELECT Attr_ID, Attribute_Name FROM tblattributes WHERE AttrStatus = 'active'"
  
    db.query(sqlSelect, (err, result) => {
        res.send(result);
        console.log(result);
    });
}
function getAttributeID(req, res){
    const AttributeName = req.params;
    const sqlSelect = "SELECT Attr_ID FROM tblattributes WHERE AttrStatus = 'active' AND Attribute_Name = '?'"
  
    console.log(AttributeName);
    db.query(sqlSelect, AttributeName ,(err, result) => {
        res.send(result);
        console.log(result);
        console.log(err)
    });
}


module.exports = {
    display: displayData,
    insert: insertData,
    insertExl: insertDataExl,
    get: getData,
    update: updateData,
    delete: deleteData,
    getAttr: getAttribute,
    getAttrID: getAttributeID,
}