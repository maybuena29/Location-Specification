const db = require('../main.db');
const audit = require('./auditlog.controller');

async function getParentName(ParentId){
    
    async function query(){
        return new Promise((resolve, reject)=>{
             db.query("SELECT Attribute_Name FROM tblattributes WHERE Attr_ID = ?",[ParentId],(err,result)=>{
                if (err){
                    reject(err);
                }
                else{
                    resolve(result[0].Attribute_Name);
                }
            })
       })
    }

    const result = await query()
    return result
}

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

async function insertData(req, res){
    
    const ValName = req.body.ValueName
    const ParentId = req.body.ParentID
    const Status = req.body.Status

    const sqlInsert = "INSERT INTO tblattributesvalue (Value_Name, Attr_Parent_ID, ValStatus) VALUES (?,?,?)";

    const ParentName = await getParentName(ParentId);

    db.query(sqlInsert, [ValName, ParentId, Status], (err, result) => {
        if (err){
            console.log(err)
        }
        else{
            console.log(result);
            logs={
                AuditUserCode:req.session.user.id,
                AuditModule:"Product-AttributesValue",
                AuditAction:`Inserted Attribute Value: ${ValName} to ${ParentName} (${ParentId})`
            }
            audit.logger(logs);
        }
        
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

async function updateData(req, res){
    const id = req.params.id;
    const ValName = req.body.ValueName
    const ParentId = req.body.ParentID
    const Status = req.body.Status
    const ParentName = await getParentName(ParentId)

    const sqlSelect = "UPDATE tblattributesvalue SET Value_Name = ?, ValStatus = ? WHERE Value_ID = ?";

    db.query(sqlSelect, [ValName, Status, id, ParentId], (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
            console.log(result);
            logs={
                AuditUserCode:req.session.user.id,
                AuditModule:"Product-AttributesValue",
                AuditAction:`Updated an Attribute Value: ${ValName} (${id}) from ${ParentName} (${ParentId})`
            }
            audit.logger(logs);
        }
        
    });
}

async function deleteData(req, res){
    
    const id = req.params.id;
    const sqlRemove = "DELETE FROM tblattributesvalue WHERE Value_ID = ?";

    async function getValName(){
        async function query(){
            return new Promise((resolve, reject)=>{
                 db.query("SELECT Value_Name, Attr_Parent_ID FROM tblattributesvalue WHERE Value_ID = ?",[id],(err,result)=>{
                    if (err){
                        reject(err);
                        console.log(err);
                    }
                    else{
                        resolve(result[0]);
                        console.log(result);
                        
                    }
                })
           })
        }
    
        const result = await query()
        return result
        }   
    
        const obtainedValName = await getValName()
        const ParentId =  obtainedValName.Attr_Parent_ID;
        const ValName =  obtainedValName.Value_Name;
        const ParentName= await getParentName(ParentId)
        
    db.query(sqlRemove, id, (err, result) => {
        if(err){
            console.log(err);
           
        }
        else{
            console.log(ParentId+","+ValName+","+ParentName+",");
            logs={
                AuditUserCode:req.session.user.id,
                AuditModule:"Product-AttributesValue",
                AuditAction:`Deleted an Attribute Value: ${ValName} (${id}) from ${ParentName} (${ParentId})`
            }
            audit.logger(logs);
            res.send(result);
        }
    });
}

function getAttrValue(req, res){
    const id = req.params.id
    const sqlSelect = "SELECT Value_ID, Value_Name FROM tblattributesvalue WHERE ValStatus = 'active' AND Attr_Parent_ID = ?";
    
    db.query(sqlSelect, id, (err, result) => {
        res.send(result);
        console.log(result);
    });
}

module.exports = {
    display: displayData,
    getAttr: getAttrName,
    insert: insertData,
    get: getData,
    update: updateData,
    delete: deleteData,
    getVal: getAttrValue
}