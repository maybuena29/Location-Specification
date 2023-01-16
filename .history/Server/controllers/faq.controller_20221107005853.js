const db = require('../main.db');
const audit = require('./auditlog.controller'); 

function displayData(req, res){
    const sqlSelect = "SELECT * FROM tblfaqs";

    db.query(sqlSelect, (err, result) => {
        res.send(result);
        console.log(result);
        
    });
};

function insertData(req, res){
    
    const question = req.body.question
    const answer = req.body.answer
    const status = req.body.status

    const sqlInsert = "INSERT INTO tblfaqs (question,answer, status) VALUES (?,?,?)";

    db.query(sqlInsert, [question, answer,status], (err, result) => {
        if (err) console.log(err)
        else{
            res.send(result);
            logs={
                AuditUserCode:req.session.user.id,
                AuditModule:"Company-FAQ",
                AuditAction:`Inserted FAQ: ${question}`
            }
            audit.logger(logs);
        }
         
    });
    
}

function getData(req, res){
    const id = req.params.id;
    const sqlSelect = "SELECT * FROM tblfaqs WHERE faqID = ?";

    db.query(sqlSelect, id, (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result[0]);
            console.log(result[0]);

            logs={
            AuditUserCode:req.session.user.id,
            AuditModule:"Company-FAQ",
            AuditAction:`Viewing/Attempting to Update FAQ: ${result[0].question} (${id})`
        }
        audit.logger(logs)
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