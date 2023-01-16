const db = require('../main.db');
const session = require('express-session');
//const auditRoute = require('../routes/auditlog.route');



const AuditLogger=(req,res)=>{

}



AuditLogger.logger=(logs)=>{

    const insertlog = `INSERT INTO tblauditlog (AuditUserCode,AuditDate,AuditTime,AuditModule,AuditAction) VALUES (?,(SELECT CURDATE()),(SELECT CURRENT_TIME()),?,?)`;

    try{
        
        db.query(insertlog,[logs.AuditUserCode, logs.AuditModule, logs.AuditAction],(err,result)=>{

        if(err){
            console.log(err)
        }
        else{
            console.log(result)
        }
    })

}
catch{
    console.log("UnknownError");
}
}


//module.exports = {AuditLogger,displayAudit:displayAudit};

module.exports = AuditLogger;
//module.exports = AuditLogger;
//module.exports= ;
//module.exports = ;


