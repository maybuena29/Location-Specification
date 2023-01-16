import React, {useState, useEffect} from 'react';
import { Header } from '../components';
import { Button } from "@material-tailwind/react";
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import impExcel from '../Images/import.png';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { Input, Select,notification } from 'antd';
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
  const [productName, setPName] = useState('');
  const [productDescription, setPDescription] = useState('');
  const [productAttribute, setPAttribute] = useState('Choose Attribute');
  const [productAttrValue, setPAttrValue] = useState('Choose Attribute Value');
  const [attrID, setAttrID] = useState(0);
  var atID;
  const [productPrice, setPPrice] = useState(0);
  const [productCategory, setPCategory] = useState('Choose Category');
  const [productBrand, setPBrand] = useState('Choose Brand');
  const [productSupplier, setPSupplier] = useState('Choose Supplier');
  const [productReqPres, setPRequiredPres] = useState('');
  const [productSKU, setPSKU] = useState('');
  const [status, setStatus] = useState('Select Status');
  const [selStat, setSelStat] = useState('');
  const [updateCBRP, setupdateCBRP] = useState('');
  const navigate = useNavigate();
  
  //for Getting Active Fields
  const [activeBrands,setActiveBrands]=useState([]);
  const [activeCategory,setActiveCategory]=useState([]);
  const [activeSupplier,setActiveSupplier]=useState([]);
  const [activeAttribute,setActiveAttribute]=useState([]);
  const [activeAttrValue,setActiveAttrValue]=useState([]);
  //Retrieving Active Brands

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

    console.log(id);
    
  },[count]);
  console.log("atID: " + attrID);

  //Test to get ID currently not working
  function getAttrID(test){
     Axios.get(`http://localhost:3001/api/attribute/get/attrname/getID/${test}`).then((response)=>{
      // atID = response.data.Attr_ID;
      setAttrID(response.data.Attr_ID);
      console.log(response.data);
      console.log("Test: " + test);
      console.log("atID: " + attrID);
      }); 
    // console.log("Attribute ID atID: " + atID);
  }


  useEffect(()=>{
    Axios.get(`http://localhost:3001/api/attrvalue/get/attrvalname/active/${attrID}}`).then((response)=>{
      setActiveAttrValue(response.data);
      console.log(response.data);
      
     });
  },[attrID])

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
    else if(productAttribute === "Choose Attribute"){
      alert("Please select an Attribute.");
    }
    else if(productAttrValue === "Choose Attribute Value"){
      alert("Please select an Attribute Value.");
    }
    else if(productPrice === ''){
      alert("Product Price is empty.");
    }
    else if(productCategory === "Choose Category"){
      alert("Please select a Product Category. ");
    }
    else if(productBrand === "Choose Brand"){
      alert("Please select a Product Brand. ");
    }
    else if(productSupplier === "Choose Supplier"){
      alert("Please select a Product Supplier. ");
    }
    else{
      if (id){
        Axios.put(`http://localhost:3001/api/products/update/${id}`,{
          productName: productName,
          productDescription:productDescription, 
          productAttribute: productAttribute,
          productAttrValue: productAttrValue,
          productPrice: productPrice,
          productCategory: productCategory,
          productBrand:productBrand, 
          productSupplier: productSupplier,
          productReqPres: productReqPres,
          productSKU:productSKU, 
          productStatus: status
        }).then(()=>{
          console.log("Successfully updated to the Database");
        })
        openNotificationWithIconUpdate("success");
        handleDoneEvent();
      }
      else{
        Axios.post("http://localhost:3001/api/products/insert",{
          productName: productName,
          productDescription:productDescription,
          productAttribute: productAttribute,
          productAttrValue: productAttrValue,
          productPrice: productPrice,
          productCategory: productCategory,
          productBrand:productBrand, 
          productSupplier: productSupplier,
          productReqPres: productReqPres,
          productSKU:productSKU, 
          productStatus: status
        }).then(()=>{
          console.log("Successfully Added to the Database");
        })
        openNotificationWithIconUpdate("success");
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

        <form action='' className=''>

          <div className='flex flex-col md:flex-row w-full min-w-screen justify-center items-center'>

            <div className="flex md:mr-10  flex-col gap-4 justify-center w-full md:w-1/2 p-0 sm:w-full">
                <div className="flex textboxes w-full">
                    <p className='my-auto font-display w-32'>Product Name:</p>
                    <Input className='my-auto' value={productName || ''} placeholder="Enter Product Name"   onChange={(e)=> setPName(e.target.value)}/>
                </div>
                <div className="flex textboxes w-full">
                    <p className='font-display w-32'>Product Description:</p>
                    <TextArea rows={4} placeholder="Enter Product Description"  value={productDescription || ""} className='resize-none' onChange={(e)=> setPDescription(e.target.value)}/>
                </div>
                <div className="flex textboxes w-full">
                    <p className='my-auto font-display w-32 font-bold'>Product Attribute:</p>
                </div>
                <div className="flex textboxes w-full">
                    <p className='my-auto font-display w-32'>Attribute Name:</p>
                    <Select className='w-full rounded-sm' value={productAttribute} defaultValue="Choose Attribute" placeholder="Choose Size" 
                    onChange={(value) => { setPAttribute(value); getAttrID(value)}}>
                      {Array.from(activeAttribute).map((actAttribute, index) => (
                        <Option key={actAttribute.Attr_ID} value={actAttribute.Attribute_Name}>{actAttribute.Attribute_Name}</Option>
                      ))}
                  </Select>
                </div>
                <div className="flex textboxes w-full">
                    <p className='my-auto font-display w-32'>Attribute Value:</p>
                    <Select className='w-full rounded-sm' defaultValue="Choose Attribute Value" value={productAttrValue} placeholder="Choose Unit" onChange={(value) => { setPAttrValue(value); }} disabled={productAttribute === 'Choose Attribute'? true : false} >
                      {Array.from(activeAttrValue).map((actAttrVal, index) => (
                        <Option key={index} value={actAttrVal.Value_Name}>{activeAttrValue.Value_Name}</Option>
                      ))}
                  </Select>
                </div>
            </div>

            <div className="flex  flex-col gap-4 justify-center w-full md:w-1/2 p-0 sm:w-full">
            
              <div className="flex textboxes w-full">
                  <p className='my-auto font-display w-32'>Price (Php):</p>
                  <Input placeholder="Enter Price" type="number" value={productPrice} onChange={(e)=> setPPrice(e.target.value)} />
              </div>

              <div className="flex textboxes w-full">
                  <p className='my-auto font-display w-32'>Category:</p>
                  <Select className='w-full rounded-sm' defaultValue="Choose Category" value={productCategory || "Choose Category"}placeholder="Choose Category" onChange={(value) => { setPCategory(value); }} >
                        {Array.from(activeCategory).map((actCategory, index)=>
                              (
                              <Option key={index} value={actCategory.Category_Name}>{actCategory.Category_Name}</Option>
                            ))}
                  </Select>
              </div>

              <div className="flex textboxes w-full">
                  <p className='my-auto font-display w-32'>Brand:</p>
                  <Select className='w-full rounded-sm' defaultValue="Choose Brand" value={productBrand || "Choose Brand"} placeholder="Choose Brand" onChange={(value) => { setPBrand(value); }}>
                      {Array.from(activeBrands).map((actBrands, index)=>
                        (
                        <Option key={index} value={actBrands.Brand_Name}>{actBrands.Brand_Name}</Option>
                      ))}
                     
                  </Select>
              </div>

              <div className="flex textboxes w-full">
                  <p className='my-auto font-display w-32'>Supplier:</p>
                  <Select className='w-full rounded-sm' defaultValue="Choose Supplier" value={productSupplier || "Choose Supplier"} placeholder="Choose Supplier" onChange={(value) => { setPSupplier(value); }}>
                        {Array.from(activeSupplier).map((actSupplier, index) =>
                              (
                              <Option key={index} value={actSupplier.Supplier_ComName}>{actSupplier.Supplier_ComName}</Option>
                            ))}
                  </Select>
              </div>

              <div className="flex textboxes w-full">
                    <p className='my-auto font-display w-32'>Product SKU:</p>
                    <Input className='my-auto' value={productSKU || ''} placeholder="Enter Product SKU"   onChange={(e)=> setPSKU(e.target.value)}/>
                </div>

              <div className="flex textboxes w-full">
                  <p className='my-auto font-display w-32'>Status:</p>
                  <Select className='w-full rounded-sm' placeholder="Select Status" value={status}
                      onChange={(value) => { setStatus(value); }}>
                    <Option value="active">Active</Option>
                    <Option value="inactive">Inactive</Option>
                  </Select>
              </div>

              <div className="flex textboxes w-full">
                  <p className='my-auto font-display w-32'>Requires Prescription: </p>
                  <Input type = "checkbox" defaultChecked={updateCBRP? true:null} onChange={CBPRequiredPres} />
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