const db = require('../main.db');


function AddfromExcel(req, res){
    const data = req.body.data;
    const Status = "active";



    //Attributes
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
    })
    }

    //AttributeValue
    function AddAttrV(){
    data.map((rows)=>{
    const sqlInsertAttrValue = "INSERT INTO tblattributesvalue (Value_Name, Attr_Parent_ID, ValStatus) Values(?,(SELECT Attr_ID FROM tblattributes WHERE Attribute_Name =?),?)";
   
    db.query(sqlInsertAttrValue, [rows.productAttrValue, rows.productAttribute, Status], (err, result) => {
        console.log(result);
        console.log(err);
        console.log("AttributeValue")
         
        
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
           console.log(result);
           console.log(err);
           console.log("Categ")
        });
        
        })
    }

    //Supplier
    function AddSupp(){
    data.map((rows)=>{
    const sqlInsertSupplier = "INSERT INTO tblsupplier (Supplier_ComName, Supplier_RepName, Supplier_ContNum, Supplier_Address, SuppStatus) VALUES (?,?,?,?,?)";
    db.query(sqlInsertSupplier, [rows.productSupplier,"?","?","?", Status], (err, result) => {
        console.log(result);
        console.log("Supplier");
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

    //inventory
    function AddInv(){
    data.map((rows)=>{
        const sqlInsert = "INSERT INTO tblinventory (productID, inventoryStatus,inventoryQuantity,inventoryDateManu,inventoryDateExp) Values ((SELECT productID FROM tblproducts WHERE productSKU = ?), ?, ?, ?, ?) ON DUPLICATE KEY UPDATE productID =(SELECT productID FROM tblproducts WHERE productSKU = ?) , inventoryStatus=? ,inventoryQuantity= ?,inventoryDateManu=?,inventoryDateExp=?";
        
        db.query(sqlInsert, [rows.productSKU, rows.inventoryStatus, rows.inventoryQuantity, rows.inventoryDateManu, rows.inventoryDateExp,rows.productSKU, rows.inventoryStatus, rows.inventoryQuantity, rows.inventoryDateManu, rows.inventoryDateExp], (err,result) => {
            if (err) {console.log(err);}
            else{
                console.log("successfully added");
                
            }
            console.log("Inventory")
        });

    })
    }

    async function AddAllfromExcel(){
        await AddAttr();
        await AddAttrV();
        await AddBrnd();
        await AddCateg();
        await AddSupp();
        await AddProd();
        await AddInv();   
        
    }

    AddAllfromExcel()
    
}

module.exports = {
    Add:AddfromExcel
}


