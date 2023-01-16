const db = require('../main.db');

function displayData(req, res){
    const sqlSelect = "SELECT `paymentID`, `ReferenceNumber`, (SELECT CustName FROM tblcustomer WHERE CustomerCode = `CustomerCode`) AS CustName, `paymentMode`, `amountPaid`, `totalChange`, (SELECT Date FROM tblorders WHERE ReferenceNumber = p.ReferenceNumber) AS Date, (SELECT TIME_FORMAT(`Time`, '%h:%i %p') FROM tblorders WHERE ReferenceNumber = p.ReferenceNumber) AS Time, `paymentStatus` FROM `tblpayment` p";

    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
};

function insertData(req, res){
    
    const RefNumber = req.body.RefNumber;
    const CustCode = req.body.CustCode;
    const PaymentMode = req.body.PaymentMode;
    const AmountPaid = req.body.AmountPaid;
    const TotalChange = req.body.TotalChange;
    const Status = req.body.Status;

    const sqlInsert = "INSERT INTO `tblpayment`(`ReferenceNumber`, `CustomerCode`, `paymentMode`, `amountPaid`, `totalChange`, `paymentStatus`) VALUES (?, ?, ?, ?, ?, ?)";

    db.query(sqlInsert, [RefNumber, CustCode, PaymentMode, AmountPaid, TotalChange, Status], (err, result) => {
        if(err){
            console.log("error: " + err);
        }
        console.log("result sa payment: ");
        console.log(result);
        res.send(result);
    });
    
}

function getDataForOrder(req, res){
    const id = req.params.id;
    const sqlSelect = "SELECT `paymentMode`, `amountPaid`, `totalChange` FROM `tblpayment` WHERE `ReferenceNumber` = ?";

    db.query(sqlSelect, id, (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result[0]);
        console.log(result[0]);
    });
}



// function updateData(req, res){
//     const id = req.params.id;
//     const Status = req.body.Status

//     const sqlSelect = "UPDATE tblorders SET Status = ? WHERE OrderID = ?";

//     db.query(sqlSelect, [Status, id], (err, result) => {
//         if(err){
//             console.log(err);
//         }
//         res.send(result);
//     });
// }

// function deleteData(req, res){
    
//     const id = req.params.id;
//     const sqlRemove = "DELETE FROM tblbrand WHERE BrandID = ?";

//     db.query(sqlRemove, id, (err, result) => {
//         if(err){
//             console.log(err);
//         }
//     });
// }

// function getOrderItem(req, res){
//     const sqlSelect = "SELECT Brand_Name FROM tblbrand WHERE Status = 'active'";
  
//     db.query(sqlSelect, (err, result) => {
//         res.send(result);
//         console.log(result);
//     });
// }


module.exports = {
    display: displayData,
    insert: insertData,
    get: getDataForOrder,
    // update: updateData,
    // getItems: getOrderItems,
    // insertItem: insertDataOrdsItem,
    // updateInv: updateInventory
}