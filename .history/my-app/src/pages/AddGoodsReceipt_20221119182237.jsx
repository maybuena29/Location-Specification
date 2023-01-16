import React, {useState, useEffect} from 'react';
import { Header } from '../components';
import { Button } from "@material-tailwind/react";
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import impExcel from '../Images/import.png';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { Input, Select,notification,DatePicker, message, Table, Space, Popconfirm } from 'antd';
import { customAlphabet } from 'nanoid';
import { v4 as uuidv4 } from "uuid";
import Axios from 'axios';
import edit from '../Images/edit.png';
import archive from '../Images/archive.png';
import moment from 'moment';
import { setAttribute } from '@syncfusion/ej2/barcode-generator';
import mainApi from '../contexts/Api';

const { TextArea } = Input;
const { Option } = Select;

const AddGoodsReceipt = () => {

  const openNotificationWithIconUpdate = (type) => {
    notification[type]({
      message: "SUCCESS!",
      description: "Goods Receipt Updated Successfully.",
      duration: 2,
    });
  };

  const openNotificationWithIconInsert = (type) => {
    notification[type]({
      message: "SUCCESS!",
      description: "Goods Receipt Created Successfully.",
      duration: 2,
      style: {borderRadius: '100px'},
    });
  };

  const numberFormat = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'PHP'
  }).format(value);

  //for Fields.
  const {id} = useParams();
  const [count, setCount] = useState(0);

  //For Purchase Item Fields
  // const [activeSupplier, setActiveSupplier] = useState([]);
  const [poDelDate, setPoDelDate] = useState('');
  const [poQuantity, setPoQuantity] = useState(0);
  const [poExpDate, setPoExpDate] = useState('');
  const [poDiscount, setPoDiscount] = useState(0);
  const [poTax, setPoTax] = useState(0);
  const [poTotalDiscount, setPoTotalDiscount] = useState(0);
  const [poTotalTax, setPoTotalTax] = useState(0);
  const [poNetPrice, setPoNetPrice] = useState(0);
  const [poAmount, setPoAmount] = useState(0);
  const [poParentID, setPoParentID] = useState(0);
  const [poDateCreated, setPoDateCreated] = useState('');
  const [markup, setMarkup] = useState(0);

  //For Goods Receipt Item Fields
  const [supplierID, setSupplierID] = useState(0);
  const [supplierName, setSupplierName] = useState('');
  const [poNumberList, setPoNumberList] = useState([]);
  const [grQuantity, setGRQuantity] = useState(0);
  const [grExpDate, setGRExpDate] = useState('');
  const [grDiscount, setGRDiscount] = useState(0);
  const [grTax, setGRTax] = useState(0);
  const [grTotalDiscount, setGRTotalDiscount] = useState(0);
  const [grTotalTax, setGRTotalTax] = useState(0);
  const [grNetPrice, setGRNetPrice] = useState(0);
  const [grAmount, setGRAmount] = useState(0);
  const [grParentID, setGRParentID] = useState(0);
  const [grDueDate, setGRDueDate] = useState('');
  const [grDateDelivered, setGrDateDelivered] = useState('');

  //For Retrieving products
  const [productSKUList, setProdSKUList] = useState([]);
  const [productSKU, setProdSKU] = useState('');
  const [productID, setProductID] = useState(0);
  const [productName, setProductName] = useState('');
  const [productUnitPrice, setProdUnitPrice] = useState(0);
  const [productDescription, setProductDescription] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [sellingPrice, setSellingPrice] = useState(0);
  const [remarks, setRemarks] = useState('');
  const [totalNetP, setTotalNetP] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  
  const [status, setStatus] = useState('Select Status');
  const [btnType, setBtnType] = useState('add');
  const navigate = useNavigate();

  //For cart
  const [itemCart, addToItemCart] = useState([]);
  const [originalCart, setOriginalCart] = useState([]);

  //fields for date
  const retrieveExpDate = moment(poExpDate, "YYYY-MM-DD");
  const retrieveDelDate = moment(grDueDate, "YYYY-MM-DD");
  const retrievedDeliveryDate = moment(grDateDelivered, "YYYY-MM-DD");
  const retrieveCreatedDate = moment(poDateCreated, "YYYY-MM-DD");

  // for generating random purchase order number
  const uniqueid = customAlphabet('1234567890', 10);
  const [poNumber, setPoNumber] = useState('');
  const [grNumber, setGrNumber] = useState('');
  
  // const disableFutureDt = current => {
  //   return current > moment().endOf('day');
  // }

  const disablePastDt = current => {
    return current && current < moment().add(-1, 'day');
  }

  // const current = new Date();
  // const currentDate = moment(`${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`);
  
  const abortController = new AbortController();
  //Retrieving Purchase ID
  const [purchaseID, setPurchaseID] = useState(0);

  const generateRandomPONumber = async () => {
    if(grNumber) return;
    await setGrNumber('GR_' + uniqueid(6));
  }

  const fetchPONumberList = async () => {
    await Axios.get(`${mainApi}/api/purchaseorder/get/pending/polist`, {signal: abortController.signal}).then((response)=>{
      setPoNumberList(response.data);
    });
  }

  const fetchCurrentPO = async (value) => {
    setPoNumber(value);
    await Axios.get(`${mainApi}/api/purchaseorder/get/${value}`, {signal: abortController.signal}).then((response)=>{
      setSupplierID(response.data.Supplier);
      setGRDueDate(moment(response.data.PODelDate));
      if(response.data.POStatus === 'back order'){
        setRemarks('Based on ' + value + '. From back order.');
      }else{
        setRemarks('Based on ' + value);
      }
      
    });
    
    await fetchCurrentPurchaseItem(value);
    await fetchSupplierName(value);
  }

  const fetchSKU = async () => {
    await Axios.get(`${mainApi}/api/inventory/getskus`, {signal: abortController.signal}).then((response) => {
      setProdSKUList(response.data);
    })
  }

  const fetchProduct = async (getSKU) => {
    setProdSKU(getSKU);
    await Axios.get(`${mainApi}/api/inventory/get/sku/${getSKU}`, {signal: abortController.signal}).then((response)=>{
      setProductID(response.data.productID);
      setProductName(response.data.productName);
      setProductDescription(response.data.productDescription);
      setProdUnitPrice(response.data.productPrice);
      setProductCategory(response.data.productCategory);
      setSellingPrice(((response.data.productPrice * (markup/100)) + response.data.productPrice));
    });
    
  }

  const handleItemSelect = async (value) => {
    await setProdSKU(value);
    await fetchProduct(value);
  }

  const fetchCurrentGR = async () => {
    await Axios.get(`${mainApi}/api/goodsreceipt/get/${id}`, {signal: abortController.signal}).then((response)=>{
      setSupplierID(response.data.Supplier);
      setPoNumber(response.data.PONumber);
      setGrNumber(response.data.GRNumber);
      setGrDateDelivered(moment(response.data.DateDelivered));
      setRemarks(response.data.Remarks);
      setPoDateCreated(moment(response.data.PODateCreated));
    });
  }

  const fetchCurrentPurchaseItem = async (currentPO) => {
    await Axios.get(`${mainApi}/api/purchaseorder/get/purchaseitems/${currentPO}`, {signal: abortController.signal}).then((response)=>{
    
      setOriginalCart(response.data);
        
      const cartItems = Array.from(response.data).map((d)=>{
        return {
          ...d
        }
      })
      
      addToItemCart(cartItems);
    });
  }

  // useEffect(()=>{
  //   const arr = [1,2,3]
  //   const arr2 = [...arr]
  //   arr.push(4)
  //   console.log(arr)
  //   console.log(arr2)
    
  // },[])

  const fetchSupplierName = async (currentPO) => {
    await Axios.get(`${mainApi}/api/goodsreceipt/get/supplier/name/${currentPO}`, {signal: abortController.signal}).then((response)=>{
      setSupplierName(response.data.Supplier_ComName);
    });
  }

  useEffect(()=>{
    fetchPONumberList();
    generateRandomPONumber();
    fetchSKU();

    return () => {
      abortController.abort();
    }

  }, [count])

  const handleAddItem = async () => {
    if(poNumber === '' || poNumber === 'PO Number' || poNumber === 'Choose PO Number'){
      message.error('Please Choose PO Number First');
    }
    else if(productSKU === '' || productSKU === 'Choose Item'){
      message.error('Please Choose an Item');
    }
    else if(poQuantity === 'Enter Quantity' || poQuantity === 0){
      message.error('Please enter a Quantity');
    }
    else if(markup === 0 || sellingPrice === 0 || markup === undefined){
      message.error('Please Choose a markup');
    }
    else if(!moment(poExpDate, 'YYYY-MM-DD').isValid()){
      message.error('Invalid Expiry Date!');
    }
    else{

      let numControl = 0;
      Array.from(originalCart).map((originalData)=>{
        if(originalData.productID === productID){
          if(originalData.pItemQuantity >= poQuantity){
            console.log("sakto yung input");
            numControl = 1;
            return;
          }else{
            message.error("You can only input a maximum quantity of " + originalData.pItemQuantity);
            return;
          }
        }
      })

      if(numControl === 1){
        let totalTax = (poTax/100) * poNetPrice;
        let totalDisc = (poDiscount/100) * poNetPrice;
        let amount = (poNetPrice - totalDisc);
        setPoTotalTax(totalTax);
        setPoTotalDiscount(totalDisc);
        setBtnType('add');
  
        const currentItem = {
          productID: productID,
          pItemQuantity : poQuantity,
          pSalesPrice: sellingPrice,
          productName: productName,
          productSKU: productSKU,
          productPrice: productUnitPrice,
          poMarkup: markup,
          pExpiryDate: moment(poExpDate),
          pDiscount: poDiscount,
          pTax: poTax,
          pNetPrice: poNetPrice,
          pAmount: amount,
          cartId: uuidv4(),
        };
        
        setTotalNetP(netTotal);
        setTotalAmount(amountTotal + totalTaxAmount);
        proceedCallback(currentItem);
      }

    }
  }

  let netTotal = itemCart.reduce((sum, item)=>{
                    return sum + item.pNetPrice;
                  }, 0);

  let amountTotal = itemCart.reduce((sum, item)=>{
                    return sum + item.pAmount;
                  }, 0);

  let totalTaxAmount = amountTotal - (amountTotal / 1.12);
  // let totalTaxAmount = amountTotal * 0.12;

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
      
      addToItemCart([...newCartItems]);
    }
    else{
      addToItemCart([...newCartItems, item]);
    }
    handleClearFields();
  };

  const handleUpdateItem = (record) => {

    if(record.pDiscount === undefined){
      setPoDiscount(0);
    }else{
      setPoDiscount(record.pDiscount);
    }

    if(record.pNetPrice === undefined){
      setPoNetPrice(0);
    }else{
      setPoNetPrice(record.pNetPrice);
    }

    setProductID(record.productID);
    setProdSKU(record.productSKU);
    setProductName(record.productName);
    setProdUnitPrice(record.productPrice);
    setProductCategory(record.productCategory);
    setPoQuantity(record.pItemQuantity);
    setSellingPrice(record.pSalesPrice);
    setPoExpDate(record.pExpiryDate);
    setPoTax(record.pTax);
    setPoNetPrice(record.pNetPrice);
    setPoAmount(record.pAmount);
  }

  const handleClearFields = () => {
    setProdSKU(''); 
    setProdUnitPrice(0);
    setProductName('');
    setPoQuantity(0);
    setMarkup(0);
    setPoExpDate('');
    setPoDiscount(0);
    setPoTax(0);
    setPoNetPrice(0);
    setPoAmount(0);
  }
  
  const handleMarkupChange = async (e) => {
    await setMarkup(e);
    await totalSellingPrice(e);
  }

  const totalSellingPrice = async (e) => {
    await setSellingPrice(((productUnitPrice * (e/100)) + productUnitPrice));
  }
  
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

  const handlePONumber = async (value) => {
    setPoNumber(value);
    await fetchCurrentPO(value);
  }

  function handleIDateDelDate(value){
    setGrDateDelivered(moment(value, 'YYYY-MM-DD'))
  }

  function handleIDateExp(value){
    setPoExpDate(moment(value))
  }

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

  const handleDiscountChange = async (e) => {
    const value = Math.max(0, Math.min(100, Number(e)));
    await setPoDiscount(value);
  }

  const handleTotalDiscount = (e) => {
    setPoTotalDiscount((poDiscount/100) * e);
  }

  const handleTaxChange = async (e) => {
    const value = Math.max(0, Math.min(100, Number(e)));
    await setPoTax(value);
  }

  const handleTotalTax = (e) => {
    setPoTotalTax((poTax/100) * e);
  }

  const handleNetPrice = async () => {
    let netP = poQuantity * productUnitPrice;
    setPoNetPrice(netP);
  }

  useEffect(async () => {
    await handleNetPrice();
  }, [poQuantity, productUnitPrice])

  async function submitButton(event){
    if(!(productSKU === '')){
      message.error('Sorry, You are currently editing an item.');
    }
    else if(poNumber === '' || poNumber === 'PO Number' || poNumber === 'Choose PO Number'){
      message.error('Please choose a PO Number First.');
    }
    else if(supplierName === 'Choose Supplier' || supplierName === '' || supplierID === 0){
      message.error('Please choose a PO Number First.');
    }
    else if(!moment(grDueDate, 'YYYY-MM-DD').isValid() || !moment(grDateDelivered, 'YYYY-MM-DD').isValid()){
      message.error('Invalid Date Delivered!');
    }
    else if(itemCart.length === 0){
      message.error('Add Item First');
    }
    else{
      let num = 1;
      Array.from(itemCart).map((items) => {
        console.log(items);
        if(items.poMarkup === undefined || items.poMarkup === 0 || items.poMarkup === ''){
          num = 0;
          return;
        }
      })

      if(num === 1){
        console.log("pumasok sa db");
        await Axios.post(`${mainApi}/api/goodsreceipt/insert`,{
          PoNumber: poNumber,
          GrNumber: grNumber,
          DateDeliver: moment(grDateDelivered).format('YYYY-MM-DD'),
          Remarks: remarks,
        }).then(()=>{
          console.log("Successfully Added to the Database");
        })
        await handleAddItemCart();
        await handleInsertToInventory();
        openNotificationWithIconUpdate("success");
        handleDoneEvent();

        //Return to Goods Receipt table
        navigate(-1);
      }else{
        message.error("Please fill up the missing field in the table first.");
      }

    }
  }

  const handleUpdatePO = async (num) => {
    let status = 'completed';
    if(num === 1){
      status = 'back order'
    }
    try {
      await Axios.put(`${mainApi}/api/goodsreceipt/update/postatus/${poNumber}`, {
        POStatus: status,
      }).then((err) => {
        console.log("result: " + err.data);
      }).catch((err) => {
        alert("Error sa order items: " + err);
      });

    }catch(e){
      console.log("Error in updating status in PO: " + e);
    }
  }

  const handleAddItemCart = async () => {
    try{
      console.log(itemCart);
      let num = 0;

      {await Array.from(itemCart).map((item) => {
        //For Adding to Goods Item
        Axios.post(`${mainApi}/api/goodsreceipt/insert/goodsitem`, {
          Quantity: item.pItemQuantity,
          ProductID: item.productID,
          Markup: item.poMarkup,
          SalesPrice: item.pSalesPrice,
          ExpiryDate: moment(item.pExpiryDate).format('YYYY-MM-DD'),
          Discount: item.pDiscount,
          Tax: item.pTax,
          NetPrice: item.pNetPrice,
          Amount: item.pAmount,
          GRNumber: grNumber, 
        }).then(() => {
          console.log('Data added successfully to goods receipt items');
        }).catch((err) => {
          alert("Error sa order items: " + err);
        });

        //For Adding to Back Order Purchase Items
        Array.from(originalCart).map((originData) => {
          if(item.productID === originData.productID && item.pItemQuantity < originData.pItemQuantity){
            console.log("current quantity: " + item.pItemQuantity);
            console.log("May back order kay: " + originData.productID);
            console.log("total back order: " + (originData.pItemQuantity - item.pItemQuantity) + 'pcs');
            Axios.post(`${mainApi}/api/purchaseorder/update/purchaseitems`, {
              Quantity: (originData.pItemQuantity - item.pItemQuantity),
              ProductID: item.productID,
              NetPrice: (item.productPrice * (originData.pItemQuantity - item.pItemQuantity)),
              Amount: (item.productPrice * (originData.pItemQuantity - item.pItemQuantity)),
              PONumber: item.parentPO_ID,
              POStatus: 'back order'
            }).then(() => {
              console.log('Data added successfully to purchased items');
            }).catch((err) => {
              alert("Error sa order items: " + err);
            });

            num = 1;

          }else if(item.productID === originData.productID){
            Axios.post(`${mainApi}/api/purchaseorder/update/status/purchaseitems`, {
              PONumber: item.parentPO_ID,
              ProductID: item.productID,
              POStatus: 'completed'
            }).then(() => {
              console.log('Data updated successfully to purchased items');
            }).catch((err) => {
              alert("Error sa order items: " + err);
            });
          }
        })

      })}
      
      console.log(num);
      handleUpdatePO(num);

    }catch(e){
      console.log("Error in Insert Items cart: " + e);
    }
  }

  const handleInsertToInventory = async () => {
    try{
      console.log(itemCart);
      {await Array.from(itemCart).map((item) => {
        Axios.post(`${mainApi}/api/inventory/insert`, {
          ProductID: item.productID,
          Quantity: item.pItemQuantity,
          SalesPrice: item.pSalesPrice, 
          Supplier: supplierID,
          ExpiryDate: moment(item.pExpiryDate),
          Status: 'active',
        }).then(() => {
          console.log('Data added successfully to inventory');
        }).catch((err) => {
          alert("Error in inventory: " + err);
        });
      })}

    }catch(e){
      console.log("Error in Insert Items cart to inventory: " + e);
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
      dataIndex: "productPrice",
      title: "Unit Price",
      width: "200",
      align: "Center",
      render: (text, record, index) => {
        return <p>{numberFormat(text)}</p>;
      },
    },
    {
      dataIndex: "poMarkup",
      title: "Markup",
      align: "Center",
      render: (text, record) => {
        return <p style={{ textTransform: "capitalize" }}>{text? text + "%" : ""}</p>;
      },
    },
    {
      dataIndex: "pExpiryDate",
      title: "Expiry Date",
      align: "Center",
      render: (text, record) => {
        return <p style={{ textTransform: "capitalize" }}>{text? moment(text).format("YYYY-MM-DD") : ""}</p>;
      },
    },
    {
      dataIndex: "pDiscount",
      title: "Discount",
      align: "Center",
      render: (text, record) => {
        return <p style={{ textTransform: "capitalize" }}>{text? text + '%' : 0}</p>;
      },
    },
    // {
    //   dataIndex: "pTax",
    //   title: "Tax",
    //   align: "Center",
    //   render: (text, record) => {
    //     return <p style={{ textTransform: "capitalize" }}>{text}%</p>;
    //   },
    // },
    {
      dataIndex: "pNetPrice",
      title: "Net Price",
      align: "Center",
      render: (text, record) => {
        return <p style={{ textTransform: "capitalize" }}>{text? numberFormat(text) : ""}</p>;
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
    {
      dataIndex: "pItemID",
      title: "Action",
      align: "Center",
      key: "pItemID",
      render: (text, record) => {
        return (
        <Space>
          {/* For Update */}
          <Button style={{backgroundColor: '#83D2FF'}} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto -mr-3 w-10 sm:w-10 md:w-10 md:p-3 md:pl-3 sm:pr-2.5' onClick={()=> {
            setBtnType('edit');
            setMarkup(record.poMarkup);
            handleUpdateItem(record);
          }}>
            <img className='w-auto h-5 sm:w-auto md:w-10 md:h-5 mr-2 sm:mr-0 md:mr-2 sm:mx-auto object-scale-down' src={edit}/>
          </Button>

          <Popconfirm title="Sure to delete?" onConfirm={() => handleCartItemDelete(record.productID)} disabled={btnType === 'edit'? true:false}>
            <Button style={{backgroundColor: "#ED5264", marginLeft: 12}} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto w-10 sm:w-10 md:w-10 md:p-3 md:pl-0 sm:pr-2.5'>
              <img className='w-auto h-5 sm:w-auto md:w-5 mr-2 sm:mr-0 md:ml-2.5 sm:mx-auto object-scale-down' src={archive}/>
            </Button>
          </Popconfirm>
        </Space>
        )
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
          <p className='my-auto w-full px-4 font-bold'>Create Goods Receipt</p>
        </div>

        <div style={{borderColor: "#747C95"}} className="flex-auto w-full my-5 border-b-2 rounded"></div>

        <form action='' className=''>
          <div className='flex flex-col md:flex-row w-full gap-2.5 min-w-screen justify-center items-center'>
            <div className="flex md:mr-10 flex-col gap-4 justify-center w-full md:w-1/3 p-0 sm:w-full">
              <div className="flex textboxes w-full">
                <p className='my-auto font-display w-32'>PO #:</p>
                <Select showSearch={true} className='w-full rounded-sm' value={poNumber || "Choose PO Number"} defaultValue='PO Number' placeholder="Choose Supplier" onChange={handlePONumber}>
                  {Array.from(poNumberList).map((poNumList, index) => (
                      <Option value={poNumList.PONumber} key={index}>{poNumList.PONumber}</Option>
                  ))}
                </Select>
              </div>
              <div className="flex textboxes w-full">
                  <p className='my-auto font-display w-32'>Supplier:</p>
                  <Input className='my-auto' value={supplierName || ''} placeholder="Choose a PO Number" disabled/>
              </div>
            </div>
            <div className='w-1/3'></div>
            <div className="flex flex-col gap-4 justify-center w-full md:w-1/3 p-0 sm:w-full">
              <div className="flex textboxes w-full">
                  <p className='my-auto font-display w-32'>GR Number:</p>
                  <Input className='my-auto' value={grNumber || ''} placeholder="PO#" disabled/>
              </div>
              <div className="flex textboxes w-full">
                  <p className='my-auto font-display w-32'>Due Date: </p>
                  <DatePicker className='my-auto w-full' disabled format={"YYYY-MM-DD"} placeholder='Choose a PO Number' value={grDueDate || ''}/>
              </div>
              <div className="flex textboxes w-full">
                  <p className='my-auto font-display w-32'>Date Delivered: </p>
                  <DatePicker className='my-auto w-full' disabledDate = {disablePastDt} format={'YYYY-MM-DD'} value={grDateDelivered || ''} placeholder="Choose Date" onChange={handleIDateDelDate}/>
              </div>
            </div>
          </div>
        </form>

        <div style={{borderColor: "#747C95"}} className="flex-auto w-full opacity-30 my-5 border-b-1 rounded"></div>

        <form action='' className=''>
          <div className='flex flex-col md:flex-row w-full min-w-screen justify-center items-center'>
            <div className="flex flex-col w-full gap-4 text-center">
              <div className='flex flex-col md:flex-row w-full gap-4 justify-center items-center'>
                <div className='w-full'>
                  <p className='my-auto font-display w-auto'>Item SKU:</p>
                  <Select showSearch={true} className='w-full overflow-ellipsis rounded-sm' value={productSKU || "Item SKU"} defaultValue='Choose Item' placeholder="Choose Item" onChange={handleItemSelect} disabled>
                    {Array.from(productSKUList).map((skuList, index) => (
                        <Option value={skuList.productSKU} key={index}>{skuList.productSKU}</Option>
                    ))}
                  </Select>
                </div>
                <div className='w-full'>
                  <p className='my-auto font-display w-auto'>Quantity:</p>
                  <Input type='number' min={0} className='my-auto' value={poQuantity || ''} placeholder="Quantity" onChange={(e) => setPoQuantity(e.target.value)} onPaste={preventPasteNegative} onKeyPress={preventMinusQuantity} disabled={btnType === 'add'? true:false} />
                </div>
                <div className='w-full'>
                  <p className='my-auto font-display w-auto'>Markup:</p>
                  {productCategory === 'Branded Medicine' || productCategory === 'Merchandise'?
                    <Select showSearch={true} className='w-full overflow-ellipsis rounded-sm' value={markup || "Choose Markup"} defaultValue='Choose Item' placeholder="Choose Item" onChange={handleMarkupChange} disabled={btnType === 'add'? true:false}>
                      <Option value={7} key={7}>7%</Option>
                      <Option value={8} key={8}>8%</Option>
                      <Option value={9} key={9}>9%</Option>
                      <Option value={10} key={10}>10%</Option>
                      <Option value={11} key={11}>11%</Option>
                      <Option value={12} key={12}>12%</Option>
                      <Option value={13} key={13}>13%</Option>
                      <Option value={14} key={14}>14%</Option>
                      <Option value={15} key={15}>15%</Option>
                    </Select>
                  :
                    <Select showSearch={true} className='w-full overflow-ellipsis rounded-sm' value={markup || "Choose Markup"} defaultValue='Choose Item' placeholder="Choose Item" onChange={handleMarkupChange} disabled={btnType === 'add'? true:false}>
                      <Option value={30} key={30}>30%</Option>
                      <Option value={31} key={31}>31%</Option>
                      <Option value={32} key={32}>32%</Option>
                      <Option value={33} key={33}>33%</Option>
                      <Option value={34} key={34}>34%</Option>
                      <Option value={35} key={35}>35%</Option>
                      <Option value={36} key={36}>36%</Option>
                      <Option value={37} key={37}>37%</Option>
                      <Option value={38} key={38}>38%</Option>
                      <Option value={39} key={39}>39%</Option>
                      <Option value={40} key={40}>40%</Option>
                      <Option value={41} key={41}>41%</Option>
                      <Option value={42} key={42}>42%</Option>
                      <Option value={43} key={43}>43%</Option>
                      <Option value={44} key={44}>44%</Option>
                      <Option value={45} key={45}>45%</Option>
                      <Option value={46} key={46}>46%</Option>
                      <Option value={47} key={47}>47%</Option>
                      <Option value={48} key={48}>48%</Option>
                      <Option value={49} key={49}>49%</Option>
                      <Option value={50} key={50}>50%</Option>
                    </Select>
                  }
                </div>
                <div className='w-full'>
                  <p className='my-auto font-display w-auto'>Expiry Date:</p>
                  <DatePicker className='my-auto w-full' disabledDate = {disablePastDt} format={"YYYY-MM-DD"} value={poExpDate || ''} placeholder="Choose Date" onChange={handleIDateExp} disabled={btnType === 'add'? true:false}/>
                </div>
                <div className='w-full'>
                  <p className='my-auto font-display w-auto'>Discount:</p>
                  <Input type='number' className='my-auto' value={poDiscount || ''} placeholder="Discount" onChange={(e) => handleDiscountChange(e.target.value)} onPaste={preventPasteNegative} onKeyPress={preventMinus} disabled={btnType === 'add'? true:false}/>
                </div>
                {/* <div className='w-full'>
                  <p className='my-auto font-display w-auto'>Tax:</p>
                  <Input type='number' className='my-auto' value={poTax || ''} placeholder="Tax" onChange={(e) => handleTaxChange(e.target.value)} onPaste={preventPasteNegative} onKeyPress={preventMinus}/>
                </div> */}
                <div className='w-full'>
                  <Button action='' onClick={handleAddItem} type='button' size='sm'  style={{backgroundColor: '#83D2FF'}} className='hover:bg-blue-400 text-black py-1 pl-2 pr-2 h-10 rounded inline-flex justify-center items-center my-1 w-full md:w-auto md:p-4'>
                    <p className='text-sm font-semibold'>Update Item</p>
                  </Button>
                </div>
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
                <TextArea rows={4} placeholder="Enter Remarks"  value={remarks || ""} className='resize-none' onChange={(e)=> setRemarks(e.target.value)}/>
            </div>
          </div>
          <div className='w-1/3'></div>
          <div className="flex flex-col gap-4 justify-center w-full md:w-1/3 p-0 sm:w-full">
              <div className="flex textboxes w-full">
                  <p className='my-auto font-display w-32 font-semibold'>Total Net Price:</p>
                  <p className='my-auto font-semibold'>{netTotal? numberFormat(netTotal) : "₱"}</p>
              </div>
              <div className="flex textboxes w-full">
                  <p className='my-auto font-display w-32 font-semibold'>VAT Amount (12%): </p>
                  <p className='my-auto font-semibold'>{numberFormat(totalTaxAmount)}</p>
              </div>
              <div className="flex textboxes w-full">
                  <p className='my-auto font-display w-32 font-semibold'>Total Amount: </p>
                  <p className='my-auto font-semibold text-lg'>{numberFormat(amountTotal)}</p>
              </div>
            </div>
        </div>
        
        <div className='flex flex-row justify-end mt-5'>
          <NavLink to={'/inventory/goods_receipt'}>
            <Button action='' type='button' size='sm' style={{backgroundColor: '#ED5264'}} className='hover:bg-blue-400 text-black py-1 pl-2 pr-2 h-10 rounded inline-flex items-center my-1 mr-3 w-auto md:w-auto md:p-4'>
                <p className='text-sm font-semibold'>Cancel</p>
            </Button>
          </NavLink>
          <NavLink to={''}>
            <Button action='' onClick={submitButton} type='button' size='sm' style={{backgroundColor: '#46E4AC'}} className='hover:bg-blue-400 text-black py-1 pl-2 pr-2 h-10 rounded inline-flex items-center my-1 w-auto md:w-auto md:p-4'>
                <p className='text-sm font-semibold'>Create Goods Receipt</p>
            </Button>
          </NavLink>
          
        </div>
      </div>
    </div>
)}

export default AddGoodsReceipt