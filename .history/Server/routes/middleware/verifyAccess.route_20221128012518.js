const db = require("../../main.db")



const verifyAccess = (moduleID)=>{
    
    return (req, res, next)=>{
       
            const roleId = req.session.user.userRoleID
            
            const sql = "SELECT * FROM tblusermodules where userRoleID=? AND moduleID=?"
            db.query(sql,[roleId,moduleID], (error, result)=>{
                console.log("Result:"+result);

                if (result==""){
                    console.log("else");
                    return res.status(403).send();
                    
                }
                else{
                    for(const role of result){
                        console.log("role:" + role.moduleID);
                            if(role.moduleID === moduleID){
                                  next()
                                  console.log("Module match")
                            }
                            else if(role.moduleID !== moduleID){
                                console.log("else if ");
                                return res.status(403);
                            }
                        
                             else{
                                console.log("else");
                                return res.status(403);
                             }
                                    
                    }   
                }
                // Array.from(result).map((role)=>{
                //     if(role.moduleID === moduleID){
                //         next()
                //         console.log("Module match")
                        
                //     }

                //     else{
                //         return res.status(403);

                //     }
                    
                //     console.log("loop: " + role.moduleID)
                // }
                       
                
     
                 
               
                 
}) }
    
}
module.exports = verifyAccess