import React, {useState, useEffect} from 'react';
import { Header } from '../components';
import { Button } from "@material-tailwind/react";
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import impExcel from '../Images/import.png';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { Input, Select,notification,DatePicker, message } from 'antd';
import Axios from 'axios';
import moment from 'moment';
import { setAttribute } from '@syncfusion/ej2/barcode-generator';

const { TextArea } = Input;
const { Option } = Select;

const AddInventory = () => {

  const openNotificationWithIconUpdate = (type) => {
    notification[type]({
      message: "SUCCESS!",
      description: "Inventory Updated Successfully.",
      duration: 2,
    });
  };

  const openNotificationWithIconInsert = (type) => {
    notification[type]({
      message: "SUCCESS!",
      description: "Inventory Inserted Successfully.",
      duration: 2,
      style: {borderRadius: '100px'},
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
  
  const [productPrice, setPPrice] = useState(0);
  const [productCategory, setPCategory] = useState('Choose Category');
  const [productBrand, setPBrand] = useState('Choose Brand');
  const [productSupplier, setPSupplier] = useState('Choose Supplier');
  const [productSKU, setPSKU] = useState('Choose/Search SKU');
  const [productReqPres, setPRequiredPres] = useState('');
  const [inventoryQuantity, setIQuantity] = useState('');
  const [inventoryDateManu, setIDateManu] = useState('');
  const [inventoryDateExp, setIDateExp] = useState('');
  
  const [status, setStatus] = useState('Select Status');
  const [selStat, setSelStat] = useState('');
  const [updateCBRP, setupdateCBRP] = useState('');
  const navigate = useNavigate();

  //fields for date
  const dateFormat = "YYYY-MM-DD";
  const retrievedDateManu = moment(inventoryDateManu, dateFormat).add(1,'days');
  const retrievedDateExp = moment(inventoryDateExp, dateFormat).add(1,'days');
  const disableFutureDt = current => {
    return current > moment().endOf('day');
  }
  const disablePastDt = current => {
    return current && current < moment().endOf('day');
  }
  
  //Retrieving SKU
  const [obtainedSKU,setobtainedSKU]=useState([]);

  useEffect(()=>{
    let abortController = new AbortController();
    Axios.get(`http://localhost:3001/api/inventory/getskus`).then((response)=>{
      setobtainedSKU(response.data);
    
        if(id){
          Axios.get(`http://localhost:3001/api/inventory/get/${id}`).then((response)=>{
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
            setIDateExp(response.data.inventoryDateExp);
            setIDateManu(response.data.inventoryDateManu);
            setIQuantity(response.data.inventoryQuantity);
            setStatus(response.data.inventoryStatus);
            
          });
        }
    
        console.log(id);
        
   
    });

    return () => {
      abortController.abort();  
    }

  }, [count])

  function searchSKU(getSKU){ 
    Axios.get(`http://localhost:3001/api/inventory/get/sku/${getSKU}`).then((response)=>{
      setPName(response.data.productName);
      setPDescription(response.data.productDescription);
      setPAttribute(response.data.productAttribute);
      setPAttrValue(response.data.productAttrValue);
      setPPrice(response.data.productPrice);
      setPBrand(response.data.productBrand);
      setPCategory(response.data.productCategory);
      setPSupplier(response.data.productSupplier);
      setupdateCBRP(response.data.productReqPres);  
    });
  }
  
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

  
  function handlePSKUChange(value){
    setPSKU(value);
    searchSKU(value);
  }
  function handleIDateManuChange(value){
    setIDateManu(value)
  }
  function handleIDateExpChange(value){
    setIDateExp(value)
  }

  function submitButton(event){
    if(productSKU === 'Choose/Search SKU'){
      message.error('Please choose a product SKU first.');
    }
    else if(inventoryQuantity === 'Enter Quantity' || inventoryQuantity === ''){
      message.error('Please enter a Quantity');
    }
    else if(!moment(inventoryDateManu, 'YYYY-MM-DD').isValid() || !moment(inventoryDateExp, 'YYYY-MM-DD').isValid()){
      message.error('Invalid Date!');
    }
    else if(status === 'Select Status'){
      message.error('Please set the Status.');
    }
    else{
      if (id){
        Axios.put(`http://localhost:3001/api/inventory/update/${id}`,{
          productName: productName,
          productDescription:productDescription, 
          productAttribute: productAttribute,
          productAttrValue: productAttrValue,
          productPrice: productPrice,
          productCategory: productCategory,
          productBrand:productBrand, 
          productSupplier: productSupplier,
          productSKU:productSKU,
          productReqPres: productReqPres,
          inventoryQuantity:inventoryQuantity,
          inventoryDateManu:retrievedDateManu,
          inventoryDateExp:retrievedDateExp,
          inventoryQuantity:inventoryQuantity,
          inventoryStatus: status
        }).then(()=>{
          console.log("Successfully updated to the Database");
        })
        openNotificationWithIconUpdate("success");
        handleDoneEvent();
      }
      else{
        //check if data already exist
        // let isExisting = false;
        // const checkExisting= cart.filter(newCartItem=>{
        //   if(newCartItem.inventoryId === item.inventoryId ){
        //     isExisting = true;
        //     newCartItem.quantity = item.quantity + newCartItem.quantity;
        //   }
        //   return newCartItem;
        // })
        
        // if(isExisting){
        //   addToCart(newCartItems);
        // }
        // else{
        //   addToCart([...cart, item]);
        // }
        Axios.post("http://localhost:3001/api/inventory/insert",{
          productName: productName,
          productDescription:productDescription,
          productAttribute: productAttribute,
          productAttrValue: productAttrValue,
          productPrice: productPrice,
          productCategory: productCategory,
          productBrand:productBrand, 
          productSupplier: productSupplier,
          productSKU:productSKU,
          productReqPres: productReqPres,
          inventoryQuantity:inventoryQuantity,
          inventoryDateManu:inventoryDateManu,
          inventoryDateExp:inventoryDateExp,
          inventoryQuantity:inventoryQuantity,
          inventoryStatus: status
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
  console.log("retrievedDateManu: "+ retrievedDateManu);
  console.log("retrievedDateExp: " + retrievedDateExp);
  console.log("inventoryDateExp: " + inventoryDateExp);
  console.log("inventoryDateManu: " + inventoryDateManu);
  return (
    
    <div className='md:m-10 mt-20 mx-8'>
      <Header title='Inventory'/>

      <div className='m-2 md:m-10 py-10 px-5 md:px-14 md:pt-5 bg-white rounded-xl shadow-md items-center justify-center'>

        <div className='flex w-full h-12'>
          <p className='my-auto w-full px-4 font-bold'>{id? "Update Inventory" : "Add Inventory"}</p>
        </div>

        <div style={{borderColor: "#747C95"}} className="flex-auto w-full my-5 border-b-2 rounded"></div>

        <form action='' className=''>

          <div className='flex flex-col md:flex-row w-full min-w-screen justify-center items-center'>

            <div className="flex md:mr-10  flex-col gap-4 justify-center w-full md:w-1/2 p-0 sm:w-full">

            <div className="flex textboxes w-full">
                  <p className='my-auto font-display w-32'>Product SKU:</p>
                  <Select  showSearch={true} className='w-full rounded-sm' defaultValue="Choose SKU" value={productSKU || "Choose SKU"} placeholder="Choose SKU" onChange={handlePSKUChange}>
                  {Array.from(obtainedSKU).map((SKUList, index) => (
                      <Option value={SKUList.productSKU} key={index}>{SKUList.productSKU}</Option>
                  ))}
                  </Select>
              </div>

                <div className="flex textboxes w-full">
                    <p className='my-auto font-display w-32'>Product Name:</p>
                    <Input className='my-auto' value={productName || ''} placeholder="Please Select a SKU. "   disabled/>
                </div>
                <div className="flex textboxes w-full">
                    <p className='font-display w-32'>Product Description:</p>
                    <TextArea rows={4} placeholder="Enter Product Description"  value={productDescription || ""} className='resize-none' disabled/>
                </div>
                <div className="flex textboxes w-full">
                    <p className='my-auto font-display w-32 font-bold'>Product Attribute:</p>
                </div>
                <div className="flex textboxes w-full">
                    <p className='my-auto font-display w-32'>Attribute Name:</p>
                    <Input className='my-auto' value={productAttribute || ''} placeholder="Please Select a SKU. "   disabled/>
                </div>
                <div className="flex textboxes w-full">
                    <p className='my-auto font-display w-32'>Attribute Value:</p>
                    <Input className='my-auto' value={productAttrValue || ''} placeholder="Please Select a SKU. "   disabled/>
                </div>
            </div>

            <div className="flex  flex-col gap-4 justify-center w-full md:w-1/2 p-0 sm:w-full">
            
              <div className="flex textboxes w-full">
                  <p className='my-auto font-display w-32'>Price (Php):</p>
                  <Input className='my-auto' value={productPrice || ''} placeholder="Please Select a SKU. "   disabled/>
              </div>

              <div className="flex textboxes w-full">
                  <p className='my-auto font-display w-32'>Category:</p>
                  <Input className='my-auto' value={productCategory || ''} placeholder="Please Select a SKU. "   disabled/>
              </div>

              <div className="flex textboxes w-full">
                  <p className='my-auto font-display w-32'>Brand:</p>
                  <Input className='my-auto' value={productBrand || ''} placeholder="Please Select a SKU. "   disabled/>
              </div>

              <div className="flex textboxes w-full">
                  <p className='my-auto font-display w-32'>Supplier:</p>
                  <Input className='my-auto' value={productSupplier || ''} placeholder="Please Select a SKU. "   disabled/>
              </div>

              <div className="flex textboxes w-full">
                  <p className='my-auto font-display w-32'>Inventory Quantity:</p>
                  <Input className='my-auto' type="number" value={inventoryQuantity || ''} placeholder="Enter Quantity" disabled ={productSKU==="Choose/Search SKU"? true:false} onChange={(e)=> setIQuantity(e.target.value)}/>
              </div>

              <div className="flex textboxes w-full">
                  <p className='my-auto font-display w-32'>Date Manufactured:</p>
                  <DatePicker className='my-auto w-full' disabledDate = {disableFutureDt} format={"YYYY-MM-DD"} value={id? retrievedDateManu :inventoryDateManu|| ""} placeholder="Date Manufactured" allowClear={false}  disabled={productSKU==="Choose/Search SKU"? true:false } onChange={handleIDateManuChange}/>
              </div>

              <div className="flex textboxes w-full">
                  <p className='my-auto font-display w-32'>Date Expiration:</p>
                  <DatePicker className='my-auto w-full' disabledDate = {disablePastDt} format={"YYYY-MM-DD"} value={id? retrievedDateExp : inventoryDateExp || ''} placeholder="Date Expiration"  allowClear={false} disabled={productSKU==="Choose/Search SKU"? true:false} onChange={handleIDateExpChange}/>
              </div>

              <div className="flex textboxes w-full">
                  <p className='my-auto font-display w-32'>Inventory Status:</p>
                  <Select className='w-full rounded-sm' placeholder="Select Status" value={status}
                      onChange={(value) => { setStatus(value); }} disabled={productSKU==="Choose/Search SKU"? true:false}>
                    <Option value="active">Active</Option>
                    <Option value="inactive">Inactive</Option>
                  </Select>
              </div>

              <div className="flex textboxes w-full">
                  <p className='my-auto font-display w-32'>Requires Prescription: </p>
                  <Input type = "checkbox" defaultChecked={updateCBRP === '✔'? true:null} disabled />
              </div>
              
            </div>
          </div>
        </form>
        
        <div className='flex flex-row justify-end mt-5'>
          <NavLink to={'/inventory/stocks'}> 
            <Button action='' type='button' size='sm' style={{backgroundColor: '#ED5264'}} className='hover:bg-blue-400 text-black py-1 pl-2 pr-2 h-10 rounded inline-flex items-center my-1 mr-3 w-auto md:w-auto md:p-4'>
                <p className='text-sm font-semibold'>Cancel</p>
            </Button>
          </NavLink>
          <NavLink to={''}> 
            <Button action='' onClick={submitButton} type='button' size='sm' style={{backgroundColor: '#46E4AC'}} className='hover:bg-blue-400 text-black py-1 pl-2 pr-2 h-10 rounded inline-flex items-center my-1 w-auto md:w-auto md:p-4'>
                <p className='text-sm font-semibold'>{id? "Update Inventory" : "Add Inventory"}</p>
            </Button>
          </NavLink>
          
        </div>
      </div>
    </div>
)}

export default AddInventory