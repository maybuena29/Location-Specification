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
import mainApi from '../contexts/Api';

const { TextArea } = Input;
const { Option } = Select;

const AddAPInvoice = () => {

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
  const [markup, setMarkup] = useState(0);

  //For Goods Receipt Item Fields
  const [supplierID, setSupplierID] = useState(0);
  const [supplierName, setSupplierName] = useState('');
  const [grNumberList, setGrNumberList] = useState([]);
  const [grQuantity, setGRQuantity] = useState(0);
  const [grExpDate, setGRExpDate] = useState('');
  const [grDiscount, setGRDiscount] = useState(0);
  const [grTax, setGRTax] = useState(0);
  const [grTotalDiscount, setGRTotalDiscount] = useState(0);
  const [grTotalTax, setGRTotalTax] = useState(0);
  const [grNetPrice, setGRNetPrice] = useState(0);
  const [grAmount, setGRAmount] = useState(0);
  const [grParentID, setGRParentID] = useState(0);
  const [grDueDate, setGrDueDate] = useState('');
  const [grDateDelivered, setGrDateDelivered] = useState('');

  //For AP Invoice Fields
  const [invoiceID, setInvoiceID] = useState(0);
  const [invoiceDate, setInvoiceDate] = useState('');
  const [paymentMode, setPaymentMode] = useState('');

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

  //fields for date
  const retrieveExpDate = moment(grExpDate, "YYYY-MM-DD");
  const retrieveDelDate = moment(grDueDate, "YYYY-MM-DD");
  const retrievedDeliveryDate = moment(grDateDelivered, "YYYY-MM-DD");
  const retrieveInvoiceDate = moment(invoiceDate, "YYYY-MM-DD");

  // for generating random purchase order number
  const uniqueid = customAlphabet('1234567890', 10);
  const [poNumber, setPoNumber] = useState('');
  const [grNumber, setGrNumber] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');

  // const disableFutureDt = current => {
  //   return current > moment().endOf('day');
  // }

  const disablePastDt = current => {
    return current && current < moment().add(-1, 'day');
  }

  const current = new Date();
  const currentDate = moment(`${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`);
  
  const abortController = new AbortController();
  //Retrieving Purchase ID
  const [purchaseID, setPurchaseID] = useState(0);

  const generateRandomInvoiceNumber = async () => {
    if(invoiceNumber) return;
    await setInvoiceNumber('Invoice_' + uniqueid(6));
  }

  const fetchGRNumberList = async () => {
    await Axios.get(`${mainApi}/api/apinvoice/get/pending/grlist`, {signal: abortController.signal}).then((response)=>{
      setGrNumberList(response.data);
    });
  }

  const fetchCurrentGoods = async (value) => {
    setGrNumber(value);
    await Axios.get(`${mainApi}/api/goodsreceipt/get/${value}`, {signal: abortController.signal}).then((response)=>{
      setSupplierName(response.data.Supplier);
      setGrDueDate(moment(response.data.DueDate));
      setGrDateDelivered(moment(response.data.DateDelivered))
      setRemarks(response.data.Remarks + '. Based on ' + value);
    });
    
    await fetchCurrentGoodsItem(value);
  }

  const fetchCurrentInvoice = async () => {
    await Axios.get(`${mainApi}/api/apinvoice/get/${id}`, {signal: abortController.signal}).then((response)=>{
      setSupplierName(response.data.Supplier);
      setInvoiceNumber(response.data.invoiceNumber);
      setGrNumber(response.data.GRNumber);
      setPaymentMode(response.data.paymentMode)
      setGrDateDelivered(moment(response.data.DateDelivered));
      setInvoiceDate(moment(response.data.invoiceDate));
      setRemarks(response.data.Remarks);
      setGrDueDate(moment(response.data.DueDate));
      fetchCurrentGoodsItem(response.data.GRNumber);
    });
  }

  const fetchCurrentGoodsItem = async (currentGR) => {
    await Axios.get(`${mainApi}/api/goodsreceipt/get/goodsreceipt/item/${currentGR}`, {signal: abortController.signal}).then((response)=>{
      addToItemCart(response.data);
    });
  }

  useEffect(()=>{
    fetchGRNumberList();
    generateRandomInvoiceNumber();

    return () => {
      abortController.abort();
    }

  }, [count])

  useEffect(() => {
    if(id){
      fetchCurrentInvoice();
      fetchCurrentGoodsItem();
    }

    return () => {
      abortController.abort();
    }
  }, [])

  let netTotal = itemCart.reduce((sum, item)=>{
                    return sum + item.gNetPrice;
                  }, 0);

  let amountTotal = itemCart.reduce((sum, item)=>{
                    return sum + item.gAmount;
                  }, 0);  
                  
  let totalTaxAmount = amountTotal - (amountTotal / 1.12);

  const handleClearFields = () => {
    setProdSKU(''); 
    setProdUnitPrice(0);
    setProductName('');
    setGRQuantity(0);
    setMarkup(0);
    setGRExpDate('');
    setGRDiscount(0);
    setGRTax(0);
    setGRNetPrice(0);
    setGRAmount(0);
  }
  
  const handleMarkupChange = async (e) => {
    await setMarkup(e);
    await totalSellingPrice(e);
  }

  const totalSellingPrice = (e) => {
    setSellingPrice(((productUnitPrice * (e/100)) + productUnitPrice));
  }

  const handleGRNumber = async (value) => {
    setGrNumber(value);
    await fetchCurrentGoods(value);
    await setTotalNetP(netTotal);
    await setTotalAmount(amountTotal);
  }

  const handlePaymentMethod = async (value) => {
    await setPaymentMode(value)
  }

  function handleIDateDelDate(value){
    setGrDateDelivered(value)
  }
  
  function handleInvoiceDate(value){
    setInvoiceDate(value)
  }

  function handleIDateExp(value){
    setGRExpDate(value)
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
    await setGRDiscount(value);
  }

  const handleTotalDiscount = (e) => {
    setGRTotalDiscount((grDiscount/100) * e);
  }

  const handleTaxChange = async (e) => {
    const value = Math.max(0, Math.min(100, Number(e)));
    await setGRTax(value);
  }

  const handleTotalTax = (e) => {
    setGRTotalTax((grTax/100) * e);
  }

  const handleNetPrice = async () => {
    let netP = grQuantity * productUnitPrice;
    setGRNetPrice(netP);
  }

  useEffect(async () => {
    await handleNetPrice();
  }, [grQuantity, productUnitPrice])

  async function submitButton(event){
    if(grNumber === '' || grNumber === 'GR Number' || grNumber === 'Choose GR Number'){
      message.error('Please choose a GR Number First.');
    }
    else if(!moment(grDueDate, 'YYYY-MM-DD').isValid() || !moment(grDateDelivered, 'YYYY-MM-DD').isValid() || !moment(invoiceDate, 'YYYY-MM-DD').isValid()){
      message.error('Invalid Date!');
    }
    else if(paymentMode === '' || paymentMode === 'Choose Payment Method'){
      message.error('Please Choose a Payment Method');
    }
    else if(itemCart.length === 0){
      message.error('Add Item First');
    }
    else{
    
      await Axios.post(`${mainApi}/api/apinvoice/insert`,{
        InvoiceNumber: invoiceNumber,
        GrNumber: grNumber,
        TotalNetPrice: netTotal,
        TotalAmount: amountTotal,
        InvoiceDate: invoiceDate,
        PaymentMode: paymentMode,
        Remarks: remarks,
      }).then(()=>{
        console.log("Successfully Added to the Database");
      })
      await handleUpdateGRStatus();
      openNotificationWithIconUpdate("success");

      //Return to AP Invoice table
      navigate(-1);

    }
  }

  const handleUpdateGRStatus = async () => {
    try {
      await Axios.put(`${mainApi}/api/apinvoice/update/grstatus/${grNumber}`).then((err) => {
        console.log("result: " + err.data);
      }).catch((err) => {
        alert("Error sa order items: " + err);
      });

    }catch(e){
      console.log("Error in updating status in PO: " + e);
    }
  }

  const handleCartItemDelete = (item) => {
    const newData = itemCart.filter( data => data.productID !== item);
    addToItemCart(newData);
  };

  const selectionColumns = [
    {
      dataIndex: "gItemQuantity",
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
        return <p>₱{text}</p>;
      },
    },
    {
      dataIndex: "gMarkup",
      title: "Markup",
      align: "Center",
      render: (text, record) => {
        return <p style={{ textTransform: "capitalize" }}>{text}%</p>;
      },
    },
    {
      dataIndex: "gExpiryDate",
      title: "Expiry Date",
      align: "Center",
      render: (text, record) => {
        return <p style={{ textTransform: "capitalize" }}>{moment(text).format("YYYY-MM-DD")}</p>;
      },
    },
    {
      dataIndex: "gDiscount",
      title: "Discount",
      align: "Center",
      render: (text, record) => {
        return <p style={{ textTransform: "capitalize" }}>{text}%</p>;
      },
    },
    {
      dataIndex: "gTax",
      title: "Tax",
      align: "Center",
      render: (text, record) => {
        return <p style={{ textTransform: "capitalize" }}>{text}%</p>;
      },
    },
    {
      dataIndex: "gNetPrice",
      title: "Net Price",
      align: "Center",
      render: (text, record) => {
        return <p style={{ textTransform: "capitalize" }}>₱{text.toFixed(2)}</p>;
      },
    },
    {
      dataIndex: "gAmount",
      title: "Amount",
      align: "Center",
      render: (text, record) => {
        return <p style={{ textTransform: "capitalize" }}>₱{text.toFixed(2)}</p>;
      },
    },
  ];

  const grItemList = itemCart.map(({body, ...item}) => ({
    ...item,
    key: item.gItemID || item.cartId,
    message: body,
  }))

  return (
    
    <div className='md:m-10 mt-20 mx-8'>
      <Header title='Supplier Transaction'/>

      <div className='m-2 md:m-10 py-10 px-5 md:px-14 md:pt-5 bg-white rounded-xl shadow-md items-center justify-center'>

        <div className='flex w-full h-12'>
          <p className='my-auto w-full px-4 font-bold'>{id? "View A/P Invoice" : "Create A/P Invoice"}</p>
        </div>

        <div style={{borderColor: "#747C95"}} className="flex-auto w-full my-5 border-b-2 rounded"></div>

        <form action='' className=''>
          <div className='flex flex-col md:flex-row w-full gap-2.5 min-w-screen justify-center items-center'>
            <div className="flex md:mr-10 flex-col gap-4 justify-center w-full md:w-1/3 p-0 sm:w-full">
                <div className="flex textboxes w-full">
                    <p className='my-auto font-display w-32'>Invoice Number:</p>
                    <Input className='my-auto' value={invoiceNumber || ''} placeholder="Invoice #" disabled/>
                </div>
                <div className="flex textboxes w-full">
                    <p className='my-auto font-display w-32'>GR #:</p>
                    <Select showSearch={true} className='w-full rounded-sm' value={grNumber || "Choose GR Number"} defaultValue='GR Number' placeholder="Choose GR Number" onChange={handleGRNumber} disabled={id? true : false}>
                    {Array.from(grNumberList).map((grNumList, index) => (
                        <Option value={grNumList.GRNumber} key={index}>{grNumList.GRNumber}</Option>
                    ))}
                    </Select>
                </div>
                <div className="flex textboxes w-full">
                    <p className='my-auto font-display w-32'>Supplier:</p>
                    <Input className='my-auto' value={supplierName || ''} placeholder="Choose a GR Number" disabled/>
                </div>
            </div>
            <div className='w-1/3'></div>
            <div className="flex flex-col gap-4 justify-center w-full md:w-1/3 p-0 sm:w-full">
              <div className="flex textboxes w-full">
                  <p className='my-auto font-display w-32'>Due Date: </p>
                  <DatePicker className='my-auto w-full' disabled format={"YYYY-MM-DD"} placeholder='Choose a GR Number' value={grDueDate || ''}/>
              </div>
              <div className="flex textboxes w-full">
                  <p className='my-auto font-display w-32'>Date Delivered: </p>
                  <DatePicker className='my-auto w-full' disabledDate = {disablePastDt} format={"YYYY-MM-DD"} value={grDateDelivered || ''} placeholder="Choose a GR Number" onChange={handleIDateDelDate} disabled/>
              </div>
              <div className="flex textboxes w-full">
                  <p className='my-auto font-display w-32'>Invoice Date:</p>
                  <DatePicker className='my-auto w-full' disabledDate = {disablePastDt} format={"YYYY-MM-DD"} value={id? retrieveInvoiceDate : invoiceDate || ''} placeholder="Choose a GR Number" onChange={handleInvoiceDate} disabled={id? true : false} />
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
                  dataSource={grItemList}
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
                <TextArea rows={4} placeholder="Enter Remarks"  value={remarks || ""} className='resize-none' onChange={(e)=> setRemarks(e.target.value)} disabled={id? true : false}/>
            </div>
          </div>
          <div className='w-1/3'></div>
          <div className="flex flex-col gap-4 justify-center w-full md:w-1/3 p-0 sm:w-full">
              <div className="flex textboxes w-full">
                  <p className='my-auto font-display w-32 font-semibold'>Payment Method:</p>
                  <Select showSearch={true} className='w-full rounded-sm' value={paymentMode || "Choose Payment Method"} placeholder="Choose Method" onChange={handlePaymentMethod} disabled={id? true : false}>
                    <Option value={'cash'} key={0}>Cash</Option>
                    <Option value={'bank'} key={1}>Bank</Option>
                  </Select>
              </div>
              <div className="flex textboxes w-full">
                  <p className='my-auto font-display w-32 font-semibold'>Total Net Price:</p>
                  <p className='my-auto font-semibold'>₱{netTotal.toFixed(2)}</p>
              </div>
              <div className="flex textboxes w-full">
                  <p className='my-auto font-display w-32 font-semibold'>VAT Amount (12%): </p>
                  <p className='my-auto font-semibold'>{numberFormat(totalTaxAmount)}</p>
              </div>
              <div className="flex textboxes w-full">
                  <p className='my-auto font-display w-32 font-semibold'>Total Amount: </p>
                  <p className='my-auto font-semibold text-lg'>₱{amountTotal.toFixed(2)}</p>
              </div>
            </div>
        </div>
        
        <div className='flex flex-row justify-end mt-5'>
          {id?
            <NavLink to={'/inventory/accounts_payable'}>
              <Button action='' type='button' size='sm' style={{backgroundColor: '#747C95'}} className='hover:bg-blue-400 text-black py-1 pl-2 pr-2 h-10 rounded inline-flex items-center my-1 mr-3 w-auto md:w-auto md:p-4'>
                  <img alt='' className='w-6 h-6 mx-auto md:w-5 mr-2 sm:mr-0 md:mr-2 sm:mx-auto object-scale-down' src={back}/>
                  <p className='text-sm text-white font-semibold'>Back</p>
              </Button>
            </NavLink>
          :
            <div>
              <NavLink to={'/inventory/accounts_payable'}>
                <Button action='' type='button' size='sm' style={{backgroundColor: '#ED5264'}} className='hover:bg-blue-400 text-black py-1 pl-2 pr-2 h-10 rounded inline-flex items-center my-1 mr-3 w-auto md:w-auto md:p-4'>
                    <p className='text-sm font-semibold'>Cancel</p>
                </Button>
              </NavLink>
              <NavLink to={''}>
                <Button action='' onClick={submitButton} type='button' size='sm' style={{backgroundColor: '#46E4AC'}} className='hover:bg-blue-400 text-black py-1 pl-2 pr-2 h-10 rounded inline-flex items-center my-1 w-auto md:w-auto md:p-4'>
                    <p className='text-sm font-semibold'>Create Invoice</p>
                </Button>
              </NavLink>
            </div>
          }
        </div>
      </div>
    </div>
)}

export default AddAPInvoice