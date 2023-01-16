const db = require('../main.db');

function displayData(req, res){
    const sqlSelect = "SELECT * FROM `tblcompanyprofile`";

    db.query(sqlSelect, (err, result) => {
        res.send(result[0]);
    });
};

// function insertData(req, res){
    
//     const RefNumber = req.body.RefNumber
//     const CustCode = req.body.CustCode
//     const TotalProducts = req.body.TotalProducts
//     const TotalAmount = req.body.TotalAmount
//     const Date = req.body.Date
//     const Time = req.body.Time
//     const TotalTax = req.body.TotalTax
//     const TotalDisc = req.body.TotalDiscount
//     const Status = req.body.Status

//     const sqlInsert = "INSERT INTO `tblorders`(`ReferenceNumber`, `CustomerCode`, `TotalProducts`, `TotalAmount`, `TotalTax`, `TotalDiscount`, `Date`, `Time`, `Status`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

//     db.query(sqlInsert, [RefNumber, CustCode, TotalProducts, TotalAmount, TotalTax, TotalDisc, Date, Time, Status], (err, result) => {
//         console.log(result);
//     });
    
// }

// function getData(req, res){
//     const id = req.params.id;
//     const sqlSelect = "SELECT `OrderID`, `ReferenceNumber`, CustomerCode, (SELECT CustName FROM tblcustomer WHERE CustomerCode = `CustomerCode`) AS CustName, `TotalProducts`, `TotalAmount`, `TotalTax`, `TotalDiscount`, `Date`, TIME_FORMAT(`Time`, '%h:%i %p') as 'Time', `Status` FROM `tblorders` WHERE OrderID = ?";

//     db.query(sqlSelect, id, (err, result) => {
//         if(err){
//             console.log(err);
//         }
//         res.send(result[0]);
//         console.log(result[0]);
//     });
// }

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
    // insert: insertData,
    // get: getData,
    // update: updateData,
    // getItems: getOrderItems,
    // insertItem: insertDataOrdsItem,
    // updateInv: updateInventory
}