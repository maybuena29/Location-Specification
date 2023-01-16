import React, {useState, useEffect} from 'react';
import { Header } from '../components';
import { Button } from "@material-tailwind/react";
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import impExcel from '../Images/import.png';
import back from '../Images/back_white.png';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { Input, Select,notification,DatePicker, message, Table, Space, Popconfirm } from 'antd';
import { customAlphabet } from 'nanoid';
import { v4 as uuidv4 } from "uuid";
import Axios from 'axios';
import edit from '../Images/edit.png';
import archive from '../Images/archive.png';
import moment from 'moment';
import { setAttribute } from '@syncfusion/ej2/barcode-generator';

const { TextArea } = Input;
const { Option } = Select;

const AddInventory = () => {

  const openNotificationWithIconUpdate = (type) => {
    notification[type]({
      message: "SUCCESS!",
      description: "Purchase Order Updated Successfully.",
      duration: 2,
    });
  };

  const openNotificationWithIconInsert = (type) => {
    notification[type]({
      message: "SUCCESS!",
      description: "Purchase Order Created Successfully.",
      duration: 2,
      style: {borderRadius: '100px'},
    });
  };

  //for Fields.
  const {id} = useParams();
  const [count, setCount] = useState(0);

  //For Purchase Item Fields
  const [supplier, setSupplier] = useState('');
  const [activeSupplier, setActiveSupplier] = useState([]);
  const [poDelDate, setPoDelDate] = useState('');
  const [poQuantity, setPoQuantity] = useState(0);
  //For Retrieving products
  const [productSKUList, setProdSKUList] = useState([]);
  const [productSKU, setProdSKU] = useState('');
  const [productID, setProductID] = useState(0);
  const [productName, setProductName] = useState('');
  const [productUnitPrice, setProdUnitPrice] = useState(0);
  const [productDescription, setProductDescription] = useState('');
  const [productCategory, setProductCategory] = useState('');
  // const [poExpDate, setPoExpDate] = useState('');
  // const [poDiscount, setPoDiscount] = useState(0);
  // const [poTax, setPoTax] = useState(0);
  // const [poTotalDiscount, setPoTotalDiscount] = useState(0);
  // const [poTotalTax, setPoTotalTax] = useState(0);
  // const [poNetPrice, setPoNetPrice] = useState(0);
  const [poAmount, setPoAmount] = useState(0);
  const [poParentID, setPoParentID] = useState(0);
  const [poDateCreated, setPoDateCreated] = useState('');
  // const [sellingPrice, setSellingPrice] = useState(0);
  // const [markup, setMarkup] = useState(0);
  const [remarks, setRemarks] = useState('');
  const [totalNetP, setTotalNetP] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  
  const [status, setStatus] = useState('Select Status');
  const [btnType, setBtnType] = useState('add');
  const navigate = useNavigate();

  //For cart
  const [itemCart, addToItemCart] = useState([]);

  //fields for date
  // const retrieveExpDate = moment(poExpDate);
  const retrieveDelDate = moment(poDelDate);
  const retrieveCreatedDate = moment(poDateCreated);

  // for generating random purchase order number
  const uniqueid = customAlphabet('1234567890', 10);
  const [poNumber, setPoNumber] = useState('');
  
  // const disableFutureDt = current => {
  //   return current > moment().endOf('day');
  // }

  const disablePastDt = current => {
    return current && current < moment().add(-1, 'day');
  }

  const current = new Date();
  // const currentDate = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
  const currentDate = moment(current, "YYYY-MM-DD").add(1, "day");
  
  const abortController = new AbortController();
  //Retrieving Purchase ID
  const [purchaseID, setPurchaseID] = useState(0);

  const generateRandomPONumber = async () => {
    if(poNumber) return;
    await setPoNumber('PO_' + uniqueid(6));
  }

  const fetchActiveSupplier = async () => {
    await Axios.get(`http://localhost:3001/api/supplier/get/suppname/active`, {signal: abortController.signal}).then((response)=>{
      setActiveSupplier(response.data);
    });
  }

  const fetchSKU = async () => {
    await Axios.get(`http://localhost:3001/api/inventory/getskus`, {signal: abortController.signal}).then((response) => {
      setProdSKUList(response.data);
    })
  }

  const fetchProduct = async (getSKU) => {
    setProdSKU(getSKU);
    await Axios.get(`http://localhost:3001/api/inventory/get/sku/${getSKU}`, {signal: abortController.signal}).then((response)=>{
      setProductID(response.data.productID);
      setProductName(response.data.productName);
      setProductDescription(response.data.productDescription);
      setProdUnitPrice(response.data.productPrice);
      setProductCategory(response.data.productCategory);
      // setSellingPrice(((response.data.productPrice * (markup/100)) + response.data.productPrice));
    });
    
  }

  const handleItemSelect = async (value) => {
    await setProdSKU(value);
    await fetchProduct(value);
  }

  const fetchCurrentPO = async () => {
    await Axios.get(`http://localhost:3001/api/purchaseorder/get/${id}`, {signal: abortController.signal}).then((response)=>{
      setSupplier(response.data.Supplier);
      setPoNumber(response.data.PONumber);
      setPoDelDate(moment(response.data.PODelDate));
      setRemarks(response.data.PORemarks);
      setPoDateCreated(moment(response.data.PODateCreated));
    });
  }

  const fetchCurrentPurchaseItem = async () => {
    await Axios.get(`http://localhost:3001/api/purchaseorder/get/purchaseitems/${id}`, {signal: abortController.signal}).then((response)=>{
      addToItemCart(response.data);
    });
  }

  const numberFormat = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'PHP'
  }).format(value);

  useEffect(()=>{
    fetchActiveSupplier();
    generateRandomPONumber();
    fetchSKU();

    return () => {
      abortController.abort();
    }

  }, [count])

  useEffect(() => {
    if(id){
      fetchCurrentPO();
      fetchCurrentPurchaseItem();
    }

    return () => {
      abortController.abort();
    }
  }, [])

  const handleAddItem = async () => {
    if(poQuantity === 'Enter Quantity' || poQuantity === 0){
      message.error('Please enter a Quantity');
    }
    else if(productSKU === '' || productSKU === 'Choose Item'){
      message.error('Please Choose an Item');
    }
    // else if(markup === 0 || sellingPrice === 0){
    //   message.error('Please Choose a markup');
    // }
    // else if(!moment(poExpDate, 'YYYY-MM-DD').isValid()){
    //   message.error('Invalid Expiry Date!');
    // }
    else{
      // let totalTax = (poTax/100) * poNetPrice;
      // let totalDisc = (poDiscount/100) * poNetPrice;
      let amount = poAmount;
      // setPoTotalTax(totalTax);
      // setPoTotalDiscount(totalDisc);
      setBtnType('add');
      
      const currentItem = {
        productID: productID,
        pItemQuantity : poQuantity,
        productName: productName,
        productDescription: productDescription,
        productSKU: productSKU,
        productPrice: productUnitPrice,
        // poMarkup: markup,
        // pSalesPrice: sellingPrice,
        // pExpiryDate: poExpDate,
        // pDiscount: poDiscount,
        // pTax: poTax,
        // pNetPrice: poNetPrice,
        pAmount: amount,
        cartId: uuidv4(),
      };
      
      setTotalNetP(netTotal);
      setTotalAmount(amountTotal);
      proceedCallback(currentItem);

    }
  }

  let netTotal = itemCart.reduce((sum, item)=>{
                    return sum + item.pNetPrice;
                  }, 0);

  let amountTotal = itemCart.reduce((sum, item)=>{
                    return sum + item.pAmount;
                  }, 0);  

  const proceedCallback = (item) => {

    let isExisting = false;
    const newCartItems = itemCart.filter(newCartItem=>{
      
      if(newCartItem.productID === item.productID){
        isExisting = true;
        
        if(btnType === 'add'){
          message.error("Item Already Exists!");
        }else{
          newCartItem.poMarkup = item.poMarkup;
          newCartItem.pSalesPrice = item.pSalesPrice;
          newCartItem.pItemQuantity = item.pItemQuantity;
          newCartItem.pExpiryDate = item.pExpiryDate;
          newCartItem.pDiscount = item.pDiscount;
          newCartItem.pTax = item.pTax;
          newCartItem.pNetPrice = item.pNetPrice;
          newCartItem.pAmount = item.pAmount;
        }
      }
      return newCartItem;
    })
    
    if(isExisting){
      addToItemCart(newCartItems);
    }
    else{
      addToItemCart([...itemCart, item]);
    }
    
    handleClearFields();
  };

  const handleUpdateItem = (record) => {
    setProductID(record.productID);
    setProdSKU(record.productSKU);
    setProductName(record.productName);
    setProdUnitPrice(record.productPrice);
    setProductCategory(record.productCategory);
    setPoQuantity(record.pItemQuantity);
    // setSellingPrice(record.pSalesPrice);
    // setPoExpDate(moment(record.pExpiryDate));
    // setPoDiscount(record.pDiscount);
    // setPoTax(record.pTax);
    // setPoNetPrice(record.pNetPrice);
    setPoAmount(record.pAmount);
  }

  const handleClearFields = () => {
    setProdSKU(''); 
    setProdUnitPrice(0);
    setProductName('');
    setPoQuantity(0);
    // setMarkup(0);
    // setPoExpDate('');
    // setPoDiscount(0);
    // setPoTax(0);
    // setPoNetPrice(0);
    setPoAmount(0);
  }
  
  // const handleMarkupChange = async (e) => {
  //   await setMarkup(e);
  //   await totalSellingPrice(e);
  // }

  // const totalSellingPrice = (e) => {
  //   setSellingPrice(((productUnitPrice * (e/100)) + productUnitPrice));
  // }
  
  function handleDoneEvent(event){
    // setPName('');
    // setPDescription('');
    // setPAttribute('Choose Attribute');
    // setPAttrValue('Choose Attribute Value');
    // setPPrice(0);
    // setPBrand('Choose Brand');
    // setPCategory('Choose PCategory');
    // setPSupplier('Choose Supplier');
    // setStatus('Select Status');
    // setupdateCBRP(0);
  }

  function handlePSKUChange(value){
    setSupplier(value);
  }

  function handleIDateDelDate(value){
    setPoDelDate(value)
  }

  // function handleIDateExp(value){
  //   setPoExpDate(value)
  // }

  const preventMinus = (e) => {
    if(e.code === 'Minus') {
      e.preventDefault();
    }

    if(e.target.value.length === 3){
      e.preventDefault();
    }
  };

  const preventMinusQuantity = (e) => {
    if(e.code === 'Minus') {
      e.preventDefault();
    }
  };

  const preventPasteNegative = (e) => {
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = parseFloat(clipboardData.getData('text'));

    if (pastedData < 0) {
        e.preventDefault();
    }
  };

  // const handleDiscountChange = async (e) => {
  //   const value = Math.max(0, Math.min(100, Number(e)));
  //   await setPoDiscount(value);
  // }

  // const handleTotalDiscount = (e) => {
  //   setPoTotalDiscount((poDiscount/100) * e);
  // }

  // const handleTaxChange = async (e) => {
  //   const value = Math.max(0, Math.min(100, Number(e)));
  //   await setPoTax(value);
  // }

  // const handleTotalTax = (e) => {
  //   setPoTotalTax((poTax/100) * e);
  // }

  const handleNetPrice = async () => {
    let netP = poQuantity * productUnitPrice;
    setPoAmount(netP);
  }

  useEffect(async () => {
    await handleNetPrice();
  }, [poQuantity, productUnitPrice])

  async function submitButton(event){
    if(btnType === 'edit'){
      message.error('Sorry, You are currently editing an item.');
    }
    else if(supplier === 'Choose Supplier' || supplier === ''){
      message.error('Please choose a supplier first.');
    }
    else if(!moment(poDelDate, 'YYYY-MM-DD').isValid()){
      message.error('Invalid Delivery Date!');
    }
    else if(itemCart.length === 0){
      message.error('Add Item First');
    }
    else{
      if (id){
        await Axios.put(`http://localhost:3001/api/purchaseorder/update/${id}`,{
          Supplier: supplier,
          DelDate: moment(poDelDate).format("YYYY-MM-DD"),
          Remarks: remarks,
        }).then(()=>{
          console.log("Successfully updated to the Database");
        })
        await handleUpdateItemCart();
        openNotificationWithIconUpdate("success");
        handleDoneEvent();
      }
      else{
        await Axios.post("http://localhost:3001/api/purchaseorder/insert",{
          PoNumber: poNumber,
          Supplier: supplier,
          DelDate: moment(poDelDate),
          Remarks: remarks,
          DateCreated: moment(currentDate),
        }).then(()=>{
          console.log("Successfully Added to the Database");
        })
        await handleAddItemCart();
        openNotificationWithIconUpdate("success");
        handleDoneEvent();
      }

      //Return to Purchase Order table
      navigate(-1);

    }
  }

  const handleAddItemCart = async () => {
    try{
      
      {await Array.from(itemCart).map((item) => {
        Axios.post('http://localhost:3001/api/purchaseorder/insert/purchaseitems', {
          Quantity: item.pItemQuantity,
          ProductID: item.productID,
          // Markup: item.poMarkup,
          // SalesPrice: item.pSalesPrice,
          // ExpiryDate: item.pExpiryDate,
          // Discount: item.pDiscount,
          // Tax: item.pTax,
          // NetPrice: item.pNetPrice,
          Amount: item.pAmount,
          PONumber: poNumber
        }).then(() => {
          console.log('Data added successfully to purchased items');
        }).catch((err) => {
          alert("Error sa order items: " + err);
        });
      })}

    }catch(e){
      console.log("Error in Insert Items cart: " + e);
    }
  }

  const handleUpdateItemCart = async () => {
    try{
      
      {await Array.from(itemCart).map((item) => {
        
        Axios.post(`http://localhost:3001/api/purchaseorder/update/purchaseitems`, {
          Quantity: item.pItemQuantity,
          ProductID: item.productID,
          // Markup: item.poMarkup,
          // SalesPrice: item.pSalesPrice,
          // ExpiryDate: item.pExpiryDate,
          // Discount: item.pDiscount,
          // Tax: item.pTax,
          // NetPrice: item.pNetPrice,
          Amount: item.pAmount,
          PONumber: poNumber
        }).then(() => {
          console.log('Data updated successfully to purchased items');
        }).catch((err) => {
          alert("Error sa order items update: " + err);
        });
      })}

    }catch(e){
      console.log("Error in Insert Items cart: " + e);
    }
  }

  const handleCartItemDelete = (item) => {
    const newData = itemCart.filter( data => data.productID !== item);
    addToItemCart(newData);
  };

  const selectionColumns = [
    {
      dataIndex: "pItemQuantity",
      title: "Quantity",
      align: "Center",
      render: (text, record) => {
        return <p>{text}pc/s.</p>;
      }
    },
    {
      dataIndex: "productSKU",
      title: "Item SKU",
      align: "Center",
      render: (text, record) => {
        return <p style={{ textTransform: "capitalize" }}>{text}</p>;
      },
    },
    {
      dataIndex: "productName",
      title: "Item Name",
      align: "Center",
      render: (text, record) => {
        return <p style={{ textTransform: "capitalize" }}>{text}</p>;
      },
    },
    {
      dataIndex: "productDescription",
      title: "Item Description",
      align: "Center",
      render: (text, record) => {
        return <p style={{ textTransform: "capitalize" }}>{text}</p>;
      },
    },
    {
      dataIndex: "productPrice",
      title: "Unit Price",
      width: "200",
      align: "Center",
      render: (text, record, index) => {
        return <p>{numberFormat(text)}</p>;
      },
    },
    {
      dataIndex: "pAmount",
      title: "Amount",
      align: "Center",
      render: (text, record) => {
        return <p style={{ textTransform: "capitalize" }}>{numberFormat(text)}</p>;
      },
    },
  ];

  const poItemList = itemCart.map(({body, ...item}) => ({
    ...item,
    key: item.pItemID || item.cartId,
    message: body,
  }))

  return (
    
    <div className='md:m-10 mt-20 mx-8'>
      <Header title='Supplier Transaction'/>

      <div className='m-2 md:m-10 py-10 px-5 md:px-14 md:pt-5 bg-white rounded-xl shadow-md items-center justify-center'>

        <div className='flex w-full h-12'>
          <p className='my-auto w-full px-4 font-bold'>View Purchase Order</p>
        </div>

        <div style={{borderColor: "#747C95"}} className="flex-auto w-full my-5 border-b-2 rounded"></div>

        <form action='' className=''>
          <div className='flex flex-col md:flex-row w-full gap-2.5 min-w-screen justify-center items-center'>
            <div className="flex md:mr-10 flex-col gap-4 justify-center w-full md:w-1/3 p-0 sm:w-full">
              <div className="flex textboxes w-full">
                  <p className='my-auto font-display w-32'>Supplier:</p>
                  <Select showSearch={true} className='w-full rounded-sm' value={supplier || "Choose Supplier"} defaultValue='Choose Supplier' placeholder="Choose Supplier" onChange={handlePSKUChange} disabled>
                    {Array.from(activeSupplier).map((suppList, index) => (
                        <Option value={suppList.SupplierID} key={suppList.SupplierID}>{suppList.Supplier_ComName}</Option>
                    ))}
                  </Select>
              </div>
              <div className="flex textboxes w-full">
                  <p className='my-auto font-display w-32'>{id? "Date Created: " : "Date: "}</p>
                  <DatePicker className='my-auto w-full' disabled format={"YYYY-MM-DD"} value={id? retrieveCreatedDate : moment(currentDate) || ''}/>
              </div>
            </div>
            <div className='w-1/3'></div>
            <div className="flex flex-col gap-4 justify-center w-full md:w-1/3 p-0 sm:w-full">
              <div className="flex textboxes w-full">
                  <p className='my-auto font-display w-32'>PO Number:</p>
                  <Input className='my-auto' value={poNumber || ''} placeholder="PO#" disabled/>
              </div>
              <div className="flex textboxes w-full">
                  <p className='my-auto font-display w-32'>Delivery Date: </p>
                  <DatePicker className='my-auto w-full' disabledDate = {disablePastDt} format={"YYYY-MM-DD"} value={id? retrieveDelDate : poDelDate || ''} placeholder="Choose Date" onChange={handleIDateDelDate} disabled/>
              </div>
            </div>
          </div>
        </form>

        <div style={{borderColor: "#747C95"}} className="flex-auto w-full opacity-30 my-5 border-b-1 rounded"></div>

        <form>
          <div className="flex w-full min-w-screen justify-center items-center">
            <div className="flex flex-col justify-center w-full p-0">
              <div className='bg-white rounded overflow-auto w-auto'>
                <Table
                  columns={selectionColumns}
                  bordered
                  dataSource={poItemList}
                  pagination={false}
                ></Table>
              </div>
            </div>
          </div>
        </form>

        <div className='flex flex-col md:flex-row w-full mt-5 gap-2.5 min-w-screen justify-center items-center'>
          <div className="flex md:mr-10 flex-col gap-4 justify-center w-full md:w-1/3 p-0 sm:w-full">
            <div className="flex textboxes w-full">
                <p className='font-display w-32'>Remarks:</p>
                <TextArea rows={4} value={remarks} className='resize-none' onChange={(e)=> setRemarks(e.target.value)} disabled/>
            </div>
          </div>
          <div className='w-1/3'></div>
            <div className="flex flex-col gap-4 justify-center w-full md:w-1/3 p-0 sm:w-full">
              <div className="flex textboxes w-full">
                <p className='my-auto font-display w-32 font-semibold'>Estimated Total Amount: </p>
                <p className='my-auto font-semibold text-lg'>{numberFormat(amountTotal)}</p>
              </div>
            </div>
        </div>
        
        <div className='flex flex-row justify-end mt-5'>
          <NavLink to={'/inventory/purchase_order'}>
            <Button action='' type='button' size='sm' style={{backgroundColor: '#747C95'}} className='hover:bg-blue-400 text-black py-1 pl-2 pr-2 h-10 rounded inline-flex items-center my-1 mr-3 w-auto md:w-auto md:p-4'>
                <img alt='' className='w-6 h-6 mx-auto md:w-5 mr-2 sm:mr-0 md:mr-2 sm:mx-auto object-scale-down' src={back}/>
                <p className='text-sm text-white font-semibold'>Back</p>
            </Button>
          </NavLink>
        </div>
      </div>
    </div>
)}

export default AddInventory