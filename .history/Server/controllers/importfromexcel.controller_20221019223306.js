const db = require('../main.db');


function AddProductfromExcel(req, res){
    const data = req.body.data;
    const Status = "active";

    //Attributes
    function AddAttr(){
    data.map((rows)=>{
    const sqlInsertAttribute = "INSERT INTO tblattributes (Attribute_Name, AttrStatus) VALUES (?,?)";
    
        db.query(sqlInsertAttribute, [rows.productAttribute, Status], (err, result) => {
            if (err) {console.log(err); }
            else{
            console.log(result);
        }
         
        });
    })
    }

    //AttributeValue
    function AddAttrV(){
    data.map((rows)=>{
    const sqlInsertAttrValue = "INSERT INTO tblattributesvalue (Value_Name, Attr_Parent_ID, ValStatus) Values(?,(SELECT Attr_ID FROM tblattributes WHERE Attribute_Name =?),?)";
   
    db.query(sqlInsertAttrValue, [rows.productAttrValue, rows.productAttribute, Status], (err, result) => {
        if (err) {console.log(err); }
            else{
            console.log(result);
        }
         
        
    });
        })
    }

    
    //Brand
    function AddBrnd(){
    data.map((rows)=>{
        const sqlInsertBrand = "INSERT INTO tblbrand (Brand_Name, Status) VALUES (?,?)";
        db.query(sqlInsertBrand, [rows.productBrand, Status], (err, result) => {
            if (err) {console.log(err); }
            else{
            console.log(result);
        }
        console.log("Brand")
        });
    })
    }


    //Category
    function AddCateg(){
    data.map((rows)=>{
        const sqlInsertCategory = "INSERT INTO tblcategory (Category_Name, CatStatus) VALUES (?,?)";

        db.query(sqlInsertCategory, [rows.productCategory, Status], (err, result) => {
            if (err) {console.log(err); }
            else{
            console.log(result);
                 }
        });
        
        })
    }

    

    //products
    function AddProd(){
    data.map((rows)=>{
        var newReqPres;
        if (rows.productReqPres == "X"){
           newReqPres = "" ; 
        }
        else{
            newReqPres = rows.productReqPres;
        }
    
        const sqlInsertProduct = "INSERT INTO tblproducts (`productName`, `productDescription`, `productAttribute`, `productAttrValue`, `productPrice`, `productCategory`, `productBrand`, `productSupplier`, `productReqPres`, `productSKU`, `productStatus`) Values (?,?,(SELECT Attr_ID FROM tblattributes WHERE Attribute_Name = ?),(SELECT Value_ID FROM tblattributesvalue Where Value_Name = ?),?,(SELECT CategoryID FROM tblcategory WHERE Category_Name=?),(SELECT BrandID from tblbrand WHERE Brand_Name =?),(SELECT SupplierID from tblsupplier WHERE Supplier_ComName =?),?,?,?) ON DUPLICATE KEY UPDATE `productName`= ?, `productDescription` = ?, `productAttribute` = (SELECT Attr_ID FROM tblattributes WHERE Attribute_Name = ?), `productAttrValue` = (SELECT Value_ID FROM tblattributesvalue Where Value_Name = ?), `productPrice` = ?, `productCategory` = (SELECT CategoryID FROM tblcategory WHERE Category_Name=?), `productBrand` = (SELECT BrandID from tblbrand WHERE Brand_Name =?) , `productSupplier` = (SELECT SupplierID from tblsupplier WHERE Supplier_ComName = ?), `productReqPres` = ?, `productSKU` = ?, `productStatus` = ?"
            
        db.query(sqlInsertProduct, [rows.productName, rows.productDescription, rows.productAttribute, rows.productAttrValue, rows.productPrice,rows.productCategory,
            rows.productBrand, rows.productSupplier, newReqPres, rows.productSKU, Status, rows.productName, rows.productDescription, rows.productAttribute, rows.productAttrValue, rows.productPrice,rows.productCategory,
            rows.productBrand, rows.productSupplier, newReqPres, rows.productSKU, Status] , (err,result) => {
            console.log(err);
            console.log("Product")
        });
    })
    }

    async function AddAllfromProductExcel(){
        await AddAttr();
        await AddAttrV();
        await AddBrnd();
        await AddCateg();
        await AddProd();
          
        
    }

    AddAllfromProductExcel()
    
}
 
 function AddAttrfromExcel(req,res){
    //Attributes
  
    const data = req.body.data;
    const Status = "active";

    function AddAttr(){
    data.map((rows)=>{
    const sqlInsertAttribute = "INSERT INTO tblattributes (Attribute_Name, AttrStatus) VALUES (?,?)";
    
        db.query(sqlInsertAttribute, [rows.productAttribute, Status], (err, result) => {
            if (err) {console.log(err);}
            else{
            console.log(rows.productAttribute + " successfully added. ProductAttribute ");
        }
        console.log("Attribute");
        });
    })}
    //AttributeValue
    function AddAttrV(){
        data.map((rows)=>{
        const sqlInsertAttrValue = "INSERT INTO tblattributesvalue (Value_Name, Attr_Parent_ID, ValStatus) Values(?,(SELECT Attr_ID FROM tblattributes WHERE Attribute_Name =?),?)";
       
        db.query(sqlInsertAttrValue, [rows.productAttrValue, rows.productAttribute, Status], (err, result) => {
            if (err) {console.log(err); }
            else{
            console.log(result);
        }
             
            
        });
            })
        }
    }

 //Brand
 function AddBrandfromExcel(req,res){
    const data = req.body.data;
    const Status = "active";

    data.map((rows)=>{
        const sqlInsertBrand = "INSERT INTO tblbrand (Brand_Name, Status) VALUES (?,?)";
        db.query(sqlInsertBrand, [rows.productBrand, Status], (err, result) => {
            if (err) {console.log(err); }
            else{
            console.log(result);
        }
        console.log("Brand")
        });
    })
    }
    

    //Category
function AddCategfromExcel(){
    const data = req.body.data;
    const Status = "active";

    data.map((rows)=>{
        const sqlInsertCategory = "INSERT INTO tblcategory (Category_Name, CatStatus) VALUES (?,?)";
    
        db.query(sqlInsertCategory, [rows.productCategory, Status], (err, result) => {
            if (err) {console.log(err); }
            else{
            console.log(result);
                 }
            });
            
            })
        }

        //Supplier
    function AddSupp(){
        const data = req.body.data;
        const Status = "active";
        
        data.map((rows)=>{
        const sqlInsertSupplier = "INSERT INTO tblsupplier (Supplier_ComName, Supplier_RepName, Supplier_ContNum, Supplier_Address, SuppStatus) VALUES (?,?,?,?,?)";
        db.query(sqlInsertSupplier, [rows.productSupplier,"?","?","?", Status], (err, result) => {
            if (err) {console.log(err); }
            else{
            console.log(result);
                }
                });
            })
        }
    


module.exports = {
    AddProduct:AddProductfromExcel,
    AddAttr:AddAttrfromExcel,
    AddBrand:AddBrandfromExcel,
    AddCateg:AddCategfromExcel,
    
}
