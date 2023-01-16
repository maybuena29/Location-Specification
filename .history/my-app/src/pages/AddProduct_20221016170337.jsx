import React, {useState, useEffect} from 'react';
import { Header } from '../components';
import { Button } from "@material-tailwind/react";
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import impExcel from '../Images/import.png';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { Input, Select,notification,Image } from 'antd';
import Axios from 'axios';
import { setAttribute } from '@syncfusion/ej2/barcode-generator';

const { TextArea } = Input;
const { Option } = Select;

const AddProduct = () => {

  const openNotificationWithIconUpdate = (type) => {
    notification[type]({
      message: "SUCCESS!",
      description: "Product Updated Successfully.",
      duration: 2,
    });
  };

  const openNotificationWithIconInsert = (type) => {
    notification[type]({
      message: "SUCCESS!",
      description: "Product Inserted Successfully.",
      duration: 2,
    });
  };

  //for Fields.
  const {id} = useParams();
  const [count, setCount] = useState(0);
  const [productImage, setPImage] = useState('');
  const [productName, setPName] = useState('');
  
  const [productDescription, setPDescription] = useState('');
  const [productAttribute, setPAttribute] = useState(0);
  const [productAttrValue, setPAttrValue] = useState(0);
  const [attrID, setAttrID] = useState(0);
  var atID;
  const [productPrice, setPPrice] = useState(0);
  const [productCategory, setPCategory] = useState(0);
  const [productBrand, setPBrand] = useState(0);
  const [productSupplier, setPSupplier] = useState(0);
  const [productReqPres, setPRequiredPres] = useState('');
  const [productSKU, setPSKU] = useState('');
  const [status, setStatus] = useState('Select Status');
  const [selStat, setSelStat] = useState('');
  const [updateCBRP, setupdateCBRP] = useState('');
  const navigate = useNavigate();
  const baseProductIMGUrl = "http://localhost:3001/uploads/productImages/";
  //for Getting Active Fields
  const [activeBrands,setActiveBrands]=useState([]);
  const [activeCategory,setActiveCategory]=useState([]);
  const [activeSupplier,setActiveSupplier]=useState([]);
  const [activeAttribute,setActiveAttribute]=useState([]);
  const [activeAttrValue,setActiveAttrValue]=useState([]);
  const imgfallback="data:image/png;base64,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"
  //Retrieving Active Brands


  console.log(productImage);
  useEffect(()=>{

    Axios.get(`http://localhost:3001/api/brand/get/bname/active`).then((response)=>{
      setActiveBrands(response.data); 
    });

    Axios.get(`http://localhost:3001/api/category/get/categname/active`).then((response)=>{
      setActiveCategory(response.data);
    });

    Axios.get(`http://localhost:3001/api/supplier/get/suppname/active`).then((response)=>{
      setActiveSupplier(response.data);
    });

    Axios.get(`http://localhost:3001/api/attribute/get/attrname/active`).then((response)=>{
      setActiveAttribute(response.data);
    });

    Axios.get(`http://localhost:3001/api/attrvalue/get/attrvalname/active/:id`).then((response)=>{
      setActiveAttrValue(response.data);
    });

    if(id){
      Axios.get(`http://localhost:3001/api/products/get/${id}`).then((response)=>{
        setPImage(response.data.productImage);
        console.log(productImage);
        setPName(response.data.productName);
        setPDescription(response.data.productDescription);
        setPAttribute(response.data.productAttribute);
        setPAttrValue(response.data.productAttrValue);
        setPPrice(response.data.productPrice);
        setPBrand(response.data.productBrand);
        setPCategory(response.data.productCategory);
        setPSupplier(response.data.productSupplier);
        setupdateCBRP(response.data.productReqPres);
        setPSKU(response.data.productSKU);
        setStatus(response.data.productStatus);
        
      });
    }

  },[count]);

  useEffect(()=>{
    Axios.get(`http://localhost:3001/api/attrvalue/get/attrvalname/active/${attrID}}`).then((response)=>{
      setActiveAttrValue(response.data);
     });
  },[attrID, id])

  function handleDoneEvent(event){
    setPName('');
    setPDescription('');
    setPAttribute('Choose Attribute');
    setPAttrValue('Choose Attribute Value');
    setPPrice(0);
    setPBrand('Choose Brand');
    setPCategory('Choose PCategory');
    setPSupplier('Choose Supplier');
    setStatus('Select Status');
    setupdateCBRP(0);
  }

  function CBPRequiredPres(event){
    if (event.target.checked){
      setPRequiredPres("✔");
    } 
    else{
      setPRequiredPres("");
    }
  }

  function submitButton(event){

    if(productName === ''){
      alert("Product Name is empty.");
    } 
    else if(productDescription === ''){
      alert("Product Description is empty.");
    }
    else if(productAttribute === 0){
      alert("Please select an Attribute.");
    }
    else if(productAttrValue === 0){
      alert("Please select an Attribute Value.");
    }
    else if(productPrice === 0){
      alert("Product Price is must be more than zero.");
    }
    else if(productCategory === 0){
      alert("Please select a Product Category. ");
    }
    else if(productBrand === 0){
      alert("Please select a Product Brand. ");
    }
    else if(productSupplier === 0){
      alert("Please select a Product Supplier. ");
    }
    else if(productSKU === ''){
      alert("Please enter a product SKU. ");
    }
    else if(status === 'Select Status'){
      alert("Please set the status. ");
    }
    else{
      const productData = new FormData();
      productData.append('productImage', productImage)
      productData.append('productName',productName)
      productData.append('productDescription',productDescription)
      productData.append('productAttribute',productAttribute)
      productData.append('productAttrValue',productAttrValue)
      productData.append('productCategory',productCategory)
      productData.append('productPrice',productPrice)
      productData.append('productBrand',productBrand)
      productData.append('productSupplier',productSupplier)
      productData.append('productReqPres',productReqPres)
      productData.append('productSKU',productSKU)
      productData.append('productStatus',status)

      if (id){
        Axios.put(`http://localhost:3001/api/products/update/${id}`,{
          productName: productName,
          productDescription:productDescription, 
          productAttribute: productAttribute,
          productAttrValue: productAttrValue,
          productPrice: productPrice,
          productCategory: productCategory,
          productBrand: productBrand, 
          productSupplier: productSupplier,
          productReqPres: productReqPres,
          productSKU: productSKU, 
          productStatus: status
        }).then(()=>{
          console.log("Successfully updated to the Database");
          openNotificationWithIconUpdate("success");
        })
       
        handleDoneEvent();
      }
      else{
        Axios.post("http://localhost:3001/api/products/insert",
        // {
        //   productImage: productImage,
        //   productName: productName,
        //   productDescription:productDescription,
        //   productAttribute: productAttribute,
        //   productAttrValue: productAttrValue,
        //   productPrice: productPrice,
        //   productCategory: productCategory,
        //   productBrand:productBrand, 
        //   productSupplier: productSupplier,
        //   productReqPres: productReqPres,
        //   productSKU:productSKU, 
        //   productStatus: status
        // },
        productData,
        {  headers: { "Content-Type": "multipart/form-data" }}
        ).then(()=>{
          console.log("Successfully Added to the Database");
          openNotificationWithIconInsert("success");
        }).catch((e)=>
        alert("catch: " + e))
        
        handleDoneEvent();
      }

      //Return to Product table
      navigate(-1);

    }
  }

  return (
    
    <div className='md:m-10 mt-20 mx-8'>
      <Header title='Products'/>

      <div className='m-2 md:m-10 py-10 px-5 md:px-14 md:pt-5 bg-white rounded-xl shadow-md items-center justify-center'>

        <div className='flex w-full h-12'>
          <p className='text-lg my-auto w-full px-4 font-bold'>{id? "Update Product" : "Add Product"}</p>

          <div className='relative w-full'>
              <div className='absolute right-0 w-34'>

                <NavLink to={''}>
                  <Button type='button' size='sm' style={{backgroundColor: '#46E4AC'}} className='hover:bg-green-400 text-black py-1 pl-2 pr-0 h-10 rounded inline-flex items-center my-1 w-10 sm:w-10 md:w-auto md:p-4'>
                    <img className='w-6 h-6 mx-auto md:w-4 mr-2 sm:mr-0 md:mr-2 sm:mx-auto object-scale-down' src={impExcel}/>
                    <p className='invisible text-xs font-semibold md:visible lg:flex sm:invisible'>Import</p>
                  </Button>
                </NavLink>

              </div>
          </div>
            
        </div>

        <div style={{borderColor: "#747C95"}} className="flex-auto w-full my-5 border-b-2 rounded"></div>

        <form method="post" enctype="multipart/form-data" >

          <div className='flex flex-col md:flex-row w-full min-w-screen justify-center items-center'>

            <div className="flex md:mr-10  flex-col gap-4 justify-center w-full md:w-1/2 p-0 sm:w-full">
            
                <div className="flex textboxes w-full">
                    <p className='my-auto font-display w-32'>Product Image:</p>
                    <Image
                  width={150}
                  height={150}
                  preview={false}
                  fallback={imgfallback}
                  src={id? baseProductIMGUrl+productImage : productImage? URL.createObjectURL(productImage) :imgfallback}
                     />
                    
                </div>
                <div className="flex textboxes w-full">
                <input className='my-auto ml-40' type="file" name="productImage" accept=".png, .jpg, .jpeg" onChange={(e)=> setPImage(e.target.files[0])} /> 
                </div>
                <div className="flex textboxes w-full">
                    <p className='my-auto font-display w-32'>Product Name:</p>
                    <Input className='my-auto' value={productName || ''} name="productName"  placeholder="Enter Product Name"   onChange={(e)=> setPName(e.target.value)}/>
                </div>
                
                <div className="flex textboxes w-full">
                    <p className='font-display w-32'>Product Description:</p>
                    <TextArea rows={4} placeholder="Enter Product Description" name="productDescription"  value={productDescription || ""} className='resize-none' onChange={(e)=> setPDescription(e.target.value)}/>
                </div>
                <div className="flex textboxes w-full">
                    <p className='my-auto font-display w-32 font-bold'>Product Attribute:</p>
                </div>
                <div className="flex textboxes w-full">
                    <p className='my-auto font-display w-32'>Attribute Name:</p>
                    <Select className='w-full rounded-sm' value={productAttribute || "Choose Attribute"} name="productAttribute" defaultValue="Choose Attribute" placeholder="Choose Size" 
                    onChange={(value) => { setPAttribute(value); setAttrID(value)}}>
                      {Array.from(activeAttribute).map((actAttribute, index) => (
                        <Option key={index} value={actAttribute.Attr_ID}>{actAttribute.Attribute_Name}</Option>
                      ))}
                  </Select>
                </div>
                <div className="flex textboxes w-full">
                    <p className='my-auto font-display w-32'>Attribute Value:</p>
                    <Select className='w-full rounded-sm' defaultValue="Choose Attribute Value" value={productAttrValue || "Choose Attribute Value"} name="productAttrValue" placeholder="Choose Unit" onChange={(value) => { setPAttrValue(value); }} disabled={productAttribute === 0 ? true : false} >
                      {Array.from(activeAttrValue).map((actAttrVal, index) => (
                        <Option key={index} value={actAttrVal.Value_ID}>{actAttrVal.Value_Name}</Option>
                      ))}
                  </Select>
                </div>
            </div>

            <div className="flex  flex-col gap-4 justify-center w-full md:w-1/2 p-0 sm:w-full">
            
              <div className="flex textboxes w-full">
                  <p className='my-auto font-display w-32'>Price (Php):</p>
                  <Input placeholder="Enter Price" type="number" value={productPrice} name="productPrice" onChange={(e)=> setPPrice(e.target.value)} />
              </div>
                  
              <div className="flex textboxes w-full">
                  <p className='my-auto font-display w-32'>Category:</p>
                  <Select className='w-full rounded-sm' defaultValue="Choose Category" value={productCategory || "Choose Category"} name="productCategory" placeholder="Choose Category" onChange={(val) => { setPCategory(val);}} >
                        {Array.from(activeCategory).map((actCategory, index)=>(
                              <Option key={index} value={actCategory.CategoryID}>{actCategory.Category_Name}</Option>
                            ))}
                  </Select>
              </div>

              <div className="flex textboxes w-full">
                  <p className='my-auto font-display w-32'>Brand:</p>
                  <Select className='w-full rounded-sm' defaultValue="Choose Brand" value={productBrand || "Choose Brand"} name="productBrand" placeholder="Choose Brand" onChange={(value) => { setPBrand(value); }}>
                      {Array.from(activeBrands).map((actBrands, index)=>
                        (
                        <Option key={index} value={actBrands.BrandID}>{actBrands.Brand_Name}</Option>
                      ))}
                     
                  </Select>
              </div>

              <div className="flex textboxes w-full">
                  <p className='my-auto font-display w-32'>Supplier:</p>
                  <Select className='w-full rounded-sm' defaultValue="Choose Supplier" value={productSupplier || "Choose Supplier"} name="productSupplier" placeholder="Choose Supplier" onChange={(value) => { setPSupplier(value); }}>
                        {Array.from(activeSupplier).map((actSupplier, index) =>
                              (
                              <Option key={index} value={actSupplier.SupplierID}>{actSupplier.Supplier_ComName}</Option>
                            ))}
                  </Select>
              </div>

              <div className="flex textboxes w-full">
                  <p className='my-auto font-display w-32'>Product SKU:</p>
                  <Input className='my-auto' value={productSKU || ''} placeholder="Enter Product SKU"  name="productSKU" onChange={(e)=> setPSKU(e.target.value)}/>
              </div>

              <div className="flex textboxes w-full">
                  <p className='my-auto font-display w-32'>Status:</p>
                  <Select className='w-full rounded-sm' placeholder="Select Status" value={status} name="productStatus"
                      onChange={(value) => { setStatus(value); }}>
                    <Option value="active">Active</Option>
                    <Option value="inactive">Inactive</Option>
                  </Select>
              </div>

              <div className="flex textboxes w-full">
                  <p className='my-auto font-display w-32'>Requires Prescription: </p>
                  <Input type = "checkbox" defaultChecked={updateCBRP==="✔"? true:null} name="productReqPres" onChange={CBPRequiredPres} />
              </div>
              
            </div>
          </div>
        </form>
        
        <div className='flex flex-row justify-end mt-5'>
          <NavLink to={'/products'}> 
            <Button action='' type='button' size='sm' style={{backgroundColor: '#ED5264'}} className='hover:bg-blue-400 text-black py-1 pl-2 pr-2 h-10 rounded inline-flex items-center my-1 mr-3 w-auto md:w-auto md:p-4'>
                <p className='text-sm font-semibold'>Cancel</p>
            </Button>
          </NavLink>
          <NavLink to={''}> 
            <Button action='' onClick={submitButton} type='button' size='sm' style={{backgroundColor: '#46E4AC'}} className='hover:bg-blue-400 text-black py-1 pl-2 pr-2 h-10 rounded inline-flex items-center my-1 w-auto md:w-auto md:p-4'>
                <p className='text-sm font-semibold'>{id? "Update Product" : "Add Product"}</p>
            </Button>
          </NavLink>
          
        </div>
      </div>
    </div>
)}

export default AddProduct