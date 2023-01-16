const db = require('../main.db');

//Attributes
function insertDataExlAttr(req, res){
    
    const data = req.body.data;
    const Status = "active";

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
//supplier
function insertDataExlSupp(req, res){
    
    const data = req.body.data;
    const status = "active";
    console.log("insertDataExl " +data.productSupplier );
    const sqlInsert = "INSERT INTO tblsupplier (Supplier_ComName, Supplier_RepName, Supplier_ContNum, Supplier_Address, SuppStatus) VALUES (?,?,?,?,?)";
    data.map((rows)=>{
    db.query(sqlInsert, [rows.productSupplier,"?","?","?", status], (err, result) => {
        console.log(result);
            });
        })
}



//Inventory
function insertDataExlInv(req, res){
    const data = req.body.data;
    
    data.map((rows)=>{
        const sqlInsert = "INSERT INTO tblinventory (productID, inventoryStatus,inventoryQuantity,inventoryDateManu,inventoryDateExp) Values ((SELECT productID FROM tblproducts WHERE productSKU = ?), ?, ?, ?, ?)";
        
        db.query(sqlInsert, [rows.productSKU, rows.inventoryStatus, rows.inventoryQuantity, rows.inventoryDateManu, rows.inventoryDateExp], (err,result) => {
            if (err) {console.log(err);}
            else{
                console.log("successfully added");
            }
        });

    })
    
}
//attributesvalue
function insertDataExlAttrV(req, res){
    
    const data = req.body.data;
    const Status = "active"

    const sqlInsert = "INSERT INTO tblattributesvalue (Value_Name, Attr_Parent_ID, ValStatus) Values(?,(SELECT Attr_ID FROM tblattributes WHERE Attribute_Name =?),?)";
    data.map((rows)=>{
    db.query(sqlInsert, [rows.productAttrValue, rows.productAttribute, Status], (err, result) => {
        console.log(result);
        console.log(err);
         
        
    });
})

}

//brands
function insertDataExlBrnd(req, res){
    
    //const BrandName = req.body.BrandName
    const Status = "active";
    const data = req.body.data
    const sqlInsert = "INSERT INTO tblbrand (Brand_Name, Status) VALUES (?,?)";


    data.map((rows)=>{
        db.query(sqlInsert, [rows.productBrand, Status], (err, result) => {
            if (err) {console.log(err);}
            else{
            console.log(result);
        }
        });
    })
   
    
}
//category
function insertDataExlCateg(req, res){
    const data = req.body.data;
    const Status = "active";

    data.map((rows)=>{
        const sqlInsert = "INSERT INTO tblcategory (Category_Name, CatStatus) VALUES (?,?)";
  
        db.query(sqlInsert, [rows.productCategory, Status], (err, result) => {
            console.log(result);
    
            console.log(err);
        });
    })
    
  
}
//products
function insertDataExlProd(req, res){

    const data = req.body.data;
    var newReqPres;
    const status = "active";
        
data.map((rows)=>{
    if (rows.productReqPres == "X"){
       newReqPres = "" ; 
    }
    else{
        newReqPres = rows.productReqPres;
    }

    const sqlInsert = "INSERT INTO tblproducts (`productName`, `productDescription`, `productAttribute`, `productAttrValue`, `productPrice`, `productCategory`, `productBrand`, `productSupplier`, `productReqPres`, `productSKU`, `productStatus`) Values (?,?,(SELECT Attr_ID FROM tblattributes WHERE Attribute_Name = ?),(SELECT Value_ID FROM tblattributesvalue Where Value_Name = ?),?,(SELECT CategoryID FROM tblcategory WHERE Category_Name=?),(SELECT BrandID from tblbrand WHERE Brand_Name =?),(SELECT SupplierID from tblsupplier WHERE Supplier_ComName =?),?,?,?)"
        
    db.query(sqlInsert, [rows.productName, rows.productDescription, rows.productAttribute, rows.productAttrValue, rows.productPrice,rows.productCategory,
        rows.productBrand, rows.productSupplier, newReqPres, rows.productSKU,  status] , (err,result) => {
        console.log(err);
    });
})
    
}

function AddfromExcel(req, res){
         insertDataExlAttr();
         insertDataExlAttrV();
         insertDataExlBrnd();
         insertDataExlCateg();
         insertDataExlSupp();
         insertDataExlProd();
         insertDataExlInv();
}

module.exports = {
    Add:AddfromExcel;
}


