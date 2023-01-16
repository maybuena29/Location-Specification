const db = require('../main.db');
const audit = require('./auditlog.controller'); 
const bcrypt = require('bcryptjs');
const saltRounds = 10;

function displayData(req, res){
    const sqlSelect = "SELECT * FROM tblusers WHERE userRoleID >=1";

    db.query(sqlSelect, (err, result) => {
        res.send(result);
        console.log(result);
        
    });
};

function insertData(req, res){

    const username = req.body.userUsername;
    const password = req.body.userPassword;
    const roleID = req.body.userRoleID;
    const name = req.body.userName;
    const address= req.body.userAddress;
    const contact= req.body.userContact;
    const status = req.body.userStatus;

    console.log(username);
    console.log(password);
    console.log(roleID);
    console.log(name);
    console.log(address);
    console.log(contact);
    console.log(status);
    
    
    bcrypt.hash(password,saltRounds,(err,hash)=>
    
    {
        const sqlSearchUser="Select *  from tblusers WHERE userUsername = ?";
        db.query(sqlSearchUser,[username,hash,roleID,name,address,contact,status],(err,result)=>{
            if (err){
                res.send(err);
                console.log(err);
            }
            if (result.length>=1){
                res.status(400)
                res.send({message:"Username already Exist"});
                
            }
            else{
                const sqlInsertUser="INSERT INTO tblusers (userUsername, userPassword,userRoleID,userName,userContact,userAddress,userStatus) VALUES (?,?,?,?,?,?,?)";
                db.query(sqlInsertUser,[username,hash,roleID,name,address,contact,status],(err,result)=>{
               
                    if (err){
                        res.send({err:err})
                   }
            
                   
                    else{
                        res.send(result);
                        logs={
                            AuditUserCode:req.session.user.id,
                            AuditModule:"Employees",
                            AuditAction:`Added User: ${username}`
                        }
                        audit.logger(logs);
                    }
            });
            }
        })
})}
    

function getData(req, res){
    const id = req.params.id;
    const sqlSelect = "SELECT userID,userUsername,userRoleID,userName,userContact,userAddress,userStatus FROM tblusers WHERE userID = ?";

    db.query(sqlSelect, id, (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result[0]);
            console.log(result[0]);

           

    }
        
    });
}

function updateData(req, res){
    const id = req.params.id;
    const question = req.body.question
    const answer = req.body.answer
    const status = req.body.status

    const sqlSelect = "UPDATE tblfaqs SET question = ?,answer = ?, status = ? WHERE faqID = ?";

    db.query(sqlSelect, [question,answer, status, id], (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result);
        console.log(result);
        logs={
            AuditUserCode:req.session.user.id,
            AuditModule:"Company-FAQ",
            AuditAction:`Updated a FAQ: ${question} (${id})`
        }
        audit.logger(logs);
    });
}

async function deleteData(req, res){
    
    const id = req.params.id;
    const sqlRemove = "DELETE FROM tblfaqs WHERE faqID = ?";

    async function getFAQQuestion(){
        async function query(){
            return new Promise((resolve, reject)=>{
                 db.query("SELECT question FROM tblfaqs WHERE faqID = ?",[id],(err,result)=>{
                    if (err){
                        reject(err);
                        console.log(err);
                    }
                    else{
                        resolve(result[0].question);

                    }
                })
           })
        } 
        const result = await query()
        return result
    }
    const FAQQuestion = await getFAQQuestion();

    db.query(sqlRemove, id, (err, result) => {
        if(err){
            res.send(result);
            console.log(err);
        }
        else{
            logs={
                AuditUserCode:req.session.user.id,
                AuditModule:"Company-FAQ",
                AuditAction:`Deleted FAQ: ${FAQQuestion} (${id})`
            }
            audit.logger(logs);
            res.send(result)
        }
    });
}

function getActiveFAQ(req, res){
    const sqlSelect = "SELECT faqID, question, answer FROM tblfaqs WHERE status = 'active'";
  
    db.query(sqlSelect, (err, result) => {
        res.send(result);
        console.log(result);
    });
}

module.exports = {
    display: displayData,
    insert: insertData,
    get: getData,
    update: updateData,
    delete: deleteData,
    getActiveFAQ: getActiveFAQ
}