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
async function AddProd(){

     await data.map(async (rows)=>{

        const sqlInsertProduct = "INSERT INTO tblproducts (`productName`, `productDescription`, `productAttribute`, `productAttrValue`, `productPrice`, `productCategory`, `productBrand`, `productSupplier`, `productAvailability`,`productSKU`,  `productStatus`) Values (?,?,(SELECT Attr_ID FROM tblattributes WHERE Attribute_Name = ?),(SELECT Value_ID FROM tblattributesvalue Where Value_Name = ?),?,(SELECT CategoryID FROM tblcategory WHERE Category_Name=?),(SELECT BrandID from tblbrand WHERE Brand_Name =?),(SELECT SupplierID from tblsupplier WHERE Supplier_ComName =?),?,?,?) "
         
        async function getBrandName(){
            async function query(){
                return new Promise((resolve, reject)=>{
                     db.query("SELECT Brand_Name FROM tblbrand WHERE BrandID = ?",[rows.productBrand],(err,result)=>{
                        if (err){
                            reject(err);
                        }
                        else{
                            resolve(result);
                        }
                    })
               })
            }

            const result = await query()
            return result.replace(/\s+/g, '').substring(0,4).toUpperCase();
        }

        async function getCategoryName(){
            async function query(){
                return new Promise((resolve, reject)=>{
                    db.query("SELECT Category_Name FROM tblcategory WHERE CategoryID = ?",[rows.productCategory],(err,result)=>{
                        if (err) {
                            reject(err);
                            console.log(err);
                        }
                        else{
                            resolve(result);
                        }
                    })
               })
            }

            const result = await query()
            return result.replace(/\s+/g, '').substring(0,4).toUpperCase();
        }

        async function getAutoIncrementID(){
            async function query(){
                return new Promise((resolve, reject)=>{
                    db.query("SELECT Auto_Increment FROM information_schema.TABLES WHERE TABLE_NAME = 'tblproducts'",(err,result)=>{
                        if (err){
                            reject(err);
                            console.log(err);
                        }
                        else{
                            resolve(result);
                            console.log(result);
                        }
                    })
               })
            }
            const result = await query()
            return result;
        }
        
        async function getAttrValue(){
            async function query(){
                return new Promise((resolve, reject)=>{
                    db.query("SELECT Value_Name FROM tblattributesvalue WHERE Value_ID = ?",[rows.productAttrValue],(err,result)=>{
                        if (err) {
                            reject(err);
                            console.log(err);
                        }
                        else{
                            resolve(result);
                            console.log(result);
                            console.log(result);
                        }
                    })
               })
            }
            const result = await query()
            return result.split(' ').map(word => word[0]).join('').toUpperCase();
        }

        const skuProdName = rows.productName.replace(/\s+/g, '').substring(0,4).toUpperCase();
        const skuAIID= await getAutoIncrementID(); 
        const skuAttrValue = await getAttrValue();
        const skuBrand = await getBrandName();
        const skuCategory = await getCategoryName();
        

        const productSKU = skuProdName+"-"+skuAttrValue+"-"+skuBrand+"-"+skuCategory+"-"+skuAIID;


        db.query(sqlInsertProduct, [rows.productName, rows.productDescription, rows.productAttribute, rows.productAttrValue, rows.productPrice,rows.productCategory,
            rows.productBrand, rows.productSupplier, rows.productAvailability, productSKU, Status] , (err,result) => {
            console.log(err);
            console.log("Product")
        });
    })
    }

    async function AddAllfromProductExcel(){
        await AddAttr();
        // await AddAttrV();
        // await AddBrnd();
        // await AddCateg();
        // await AddProd();
          
        
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

        async function AddAttribute(){
            await AddAttr();
            await AddAttrV();
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
    function AddSuppfromExcel(){
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
    AddSupp:AddSuppfromExcel
    
}

