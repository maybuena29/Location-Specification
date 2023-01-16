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
    var success= 0;
      for(const rows of data){
        console.log(rows)
        const sqlInsertProduct = "INSERT INTO tblproducts (`productName`, `productDescription`, `productAttribute`, `productAttrValue`, `productPrice`, `productCategory`, `productBrand`,  `productAvailability`,`productSKU`,  `productStatus`) Values (?,?,(SELECT Attr_ID FROM tblattributes WHERE Attribute_Name = ?),(SELECT Value_ID FROM tblattributesvalue Where Value_Name = ?),?,(SELECT CategoryID FROM tblcategory WHERE Category_Name=?),(SELECT BrandID from tblbrand WHERE Brand_Name =?),?,?,?) "
         
        // async function getBrandName(){
        //     async function query(){
        //         return new Promise((resolve, reject)=>{
        //              db.query("SELECT BrandID FROM tblbrand WHERE Brand_Name = ?",[rows.productBrand],(err,result)=>{
        //                 if (err){
        //                     reject(err);
        //                 }
        //                 else{
        //                     resolve(result[0].BrandID);
        //                 }
        //             })
        //        })
        //     }

        //     const result = await query()
        //     return result;
        // }

        // async function getCategoryName(){
        //     async function query(){
        //         return new Promise((resolve, reject)=>{
        //             db.query("SELECT CategoryID FROM tblcategory WHERE Category_Name = ?",[rows.productCategory],(err,result)=>{
        //                 if (err) {
        //                     reject(err);
        //                     console.log(err);
        //                 }
        //                 else{
        //                     resolve(result[0].CategoryID);
        //                 }
        //             })
        //        })
        //     }

        //     const result = await query()
        //     return result;
        // }

        // async function getAutoIncrementID(){
        //     async function query(){
        //         return new Promise((resolve, reject)=>{
        //             db.query("SELECT Auto_Increment FROM information_schema.TABLES WHERE TABLE_NAME = 'tblproducts'",(err,result)=>{
        //                 if (err){
        //                     reject(err);
        //                     console.log(err);
        //                 }
        //                 else{
        //                     console.log(result)
        //                     resolve(result[0].Auto_Increment);
        //                     console.log(result[0].Auto_Increment);
        //                 }
        //             })
        //        })
        //     }
        //     const result = await query()
        //     return result;
        // }
        
        // async function getAttrValue(){
        //     async function query(){
        //         return new Promise((resolve, reject)=>{
        //             db.query("SELECT Value_ID FROM tblattributesvalue WHERE Value_Name = ?",[rows.productAttrValue],(err,result)=>{
        //                 if (err) {
        //                     reject(err);
        //                 }
        //                 else{
        //                     resolve(result[0].Value_ID);
                           
        //                 }
        //             })
        //        })
        //     }
            
        //    // result = result.split(' ').map(word => word[0]).join('').toUpperCase();
        //     const result = await query()
        //     return result;
        // }

        // const skuProdName = rows.productName.replace(/\s+/g, '').substring(0,4).toUpperCase();
        // const skuAIID= await getAutoIncrementID(); 
        // const skuAttrValue = await getAttrValue();
        // const skuBrand = await getBrandName();
        // const skuCategory = await getCategoryName();
        const skuProdName = rows.productName.replace(/\s+/g, '').replace(/[^\w\s]/gi, '').substring(0,4).toUpperCase();
        const skuProdNameInitials = rows.productName.match(/\b(\w)/g).join('').toUpperCase()
        const skuAttrValue = rows.productAttrValue.split(' ').map(word => word.replace(/[^a-zA-Z0-9]/g, "")).map(word => word.replace(/[aeiou]/gi, '')).join('').toUpperCase();
        const skuPrice = rows.productPrice;
        const skuAttrName = rows.productAttribute.replace(/\s+/g, '').substring(0,1).toUpperCase();
        const skuBrand = rows.productBrand.replace(/\s+/g, '').substring(0,4).toUpperCase();
        const skuCategory= rows.productCategory.replace(/\s+/g, '').substring(0,4).toUpperCase();
       
        const productSKU = skuProdName+skuPrice+"-"+skuAttrName+skuAttrValue+"-"+skuBrand+"-"+skuCategory;

        async function insertProd(){
            return new Promise((resolve, reject)=>{
                db.query(sqlInsertProduct, [rows.productName, rows.productDescription, rows.productAttribute, rows.productAttrValue, rows.productPrice,rows.productCategory,
                    rows.productBrand,  rows.productAvailability, productSKU, Status] , (err,result) => {
                    console.log(err);
                    resolve("OKAY")
                    console.log("Product")
                    success++
                    console.log("Product Succeed: " +success +" out of "+ rows);

                });
            })
        }
        const i = await insertProd()
        console.log(i)
      
    }
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

