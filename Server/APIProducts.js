app.get('/api/product/get', (req, res) => {
    const sqlSelect="Select * from tblproducts";
    db.query(sqlSelect,(err,result)=>{
       res.send(result);
    });

});

app.post("/api/product/insert", (req, res) => {

//const PImage = req.body.PImage;
const productName = req.body.productName;
const productDescription = req.body.productDescription;
const productSize = req.body.productSize;
const productUnit = req.body.productUnit;
const productDosage = req.body.productDosage;
//const PQuantity = req.body.PQuantity;
const productPrice = req.body.productPrice;
const productCategory = req.body.productCategory;
const productBrand = req.body.productBrand;
const productSupplier = req.body.productSupplier;
//const PStatus = req.body.PStatus;
//const PSKU = req.body.PSKU;
const productType = req.body.productType;
var productReqPres = req.body.productReqPres;
        

    if (productReqPres == null){
        productReqPres = 0; }


    const sqlInsert = "INSERT INTO tblproducts (productName,productDescription,productSize,productUnit,productDosage, productPrice,productCategory,productBrand, productSupplier, productType, productReqPres) Values (?,?,?,?,?,?,?,?,?,?,?)"
        
    db.query(sqlInsert,[productName,productDescription,productSize,productUnit,productDosage, productPrice,productCategory,
        productBrand, productSupplier, productType, productReqPres] , (err,result) => {
        
            //console.log(PRequiredPres);
            console.log("ProductInserted");
            console.log(err);
            console.log(productName);
        console.log(result);
        //alert("Product has been Inserted Successfully.");
        });
    })