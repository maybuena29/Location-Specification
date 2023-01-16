import React, { useState, useEffect, useCallback, useRef, Component } from "react";
import ReactToPrint from 'react-to-print';
import { Header } from "../components";
import { Table, Input, Modal, InputNumber, Button, Card, Col, Row, notification, Space, Popconfirm, Select, Affix, Tabs, Pagination } from "antd";
import Axios from "axios";
import { v4 as uuidv4 } from "uuid";
import edit from '../Images/edit.png';
import archive from '../Images/archive.png';
import print from '../Images/print.png';
import medLogo from '../Images/corumed_med_logo.png'
import { useStateContext } from '../contexts/ContextProvider';
import moment from 'moment';
import Barcode from 'react-barcode';
import { customAlphabet } from 'nanoid';
import { change } from "@syncfusion/ej2-react-grids";
import { BiSearchAlt } from "react-icons/bi";
import mainApi from "../contexts/Api";
import { useNavigate } from "react-router-dom";

const { Search } = Input;
const { Meta } = Card;
const { Option } = Select;
const TabPane = Tabs.TabPane;

const GenerateOrder = () => {

  const notifyWarning = (type) => {
    notification[type]({
      message: "Warning!",
      description: 'Maximum quantity reached.',
      style: {borderRadius: '5px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'},
    });
  };

  const emptyCartWarning = (type) => {
    notification[type]({
      message: "You must add product first.",
      style: {borderRadius: '5px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'},
    });
  };

  const transactionCompleteNotify = (type) => {
    notification[type]({
      message: "Success!",
      description: "Transaction completed.",
      style: {borderRadius: '5px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'},
    });
  };

  notification.config({
    duration: 3,
    maxCount: 1
  })

  const numberFormat = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'PHP'
  }).format(value);

  // const componentRef = useRef(); 
  const current = new Date();
  const currentDate = `${moment(current).format("YYYY-MM-DD")}`;
  const currentTime = `${moment(current).format("h:mm A")}`;
  const currentTimeMilitary = `${moment(current).format("H:mm")}`;

  const {setActiveMenu} = useStateContext();
  const [InventorySelectionTable, setInventorySelectionTable] = useState([]);
  const [quantityModalVisibility, setQuantityModalVisibility] = useState(false);
  const [cart, addToCart] = useState([]);
  const [currentSelectedItem, setCurrentSelectedItem] = useState({});
  const [errMessage, setErrMessage] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [btnType, setBtnType] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalChange, setTotalChange] = useState(0);

  const [tax, setTax] = useState({
    taxName: '',
    taxValue: 0,
  });
  const [discount, setDiscount] = useState({
    discName: '',
    discValue: 0,
  });
  const [activeDiscount, setActiveDiscount] = useState([]);
  const [activeTax, setActiveTax] = useState([]);
  const [totalTax, setTotalTax] = useState(0);
  const [totalDisc, setTotalDisc] = useState(0);
  const [discountSelect, setDiscSelect] = useState(true);
  const [taxSelect, setTaxSelect] = useState(true);
  const navigate = useNavigate();
  const [checkoutModalVisible, setCheckoutModalVisible] = useState(false);
  const [receiptModalVisible, setReceiptModalVisible] = useState(false);
  const [custCode, setCustCode] = useState(0);
  const [custName, setCustName] = useState('');
  const [payment, setPayment] = useState(0);
  const [paymentMode, setPaymentMode] = useState('Cash');
  const [counter, setCounter] = useState(0);
  const [message, setMessage] = useState({
    error1: '',
    error2: '',
    error3: '',
  });
  const [companyProfile, setCompanyProfile] = useState([]);
  const [companyData, setCompanyData] = useState({
    address: '',
    email: '',
    contact: '',
  });
  const imgPath = `${mainApi}/uploads/productImages/`;
  const [searchVal, setSearchVal] = useState('');
  const abortController = new AbortController();

  //For Active Category
  const [categoryList, setCategoryList] = useState([]);
  
  // for generating random reference number
  const uniqueid = customAlphabet('1234567890', 10);
  const [referenceNum, setReferenceNum] = useState('');

  
  const fetchInventoryItems = async () => {
    const { data } = await Axios.get(`${mainApi}/api/inventory/get/prod/active/generateOrder`, {signal: abortController.signal});
    
    setInventorySelectionTable(data);
  };

  const fetchCompanyProfile = async () => {
    Axios.get(`${mainApi}/api/company/get`).then((resp)=>{
      setCompanyData({
        address: resp.data.address,
        email: resp.data.email,
        contact: resp.data.contact,
      });
    });
  }
 
  const fetchDiscounts = async () => {
    const { data } = await Axios.get(`${mainApi}/api/discount/get/disc/active`, {signal: abortController.signal});
    setActiveDiscount(data);
  }

  const fetchTaxes = async () => {
    const { data } = await Axios.get(`${mainApi}/api/tax/get/tx/active`, {signal: abortController.signal});
    setActiveTax(data);
  }

  const fetchCategoryList = async () => {
    const { data } = await Axios.get(`${mainApi}/api/category/get/categname/active`, {signal: abortController.signal});
    setCategoryList(data);
  }
  
  useEffect(() => {
    //on page load
   
    setActiveMenu(false);
    fetchInventoryItems();
    fetchCompanyProfile();
    fetchDiscounts();
    fetchTaxes();
    fetchCategoryList();
    fetchVerify();
    return () => {  
      abortController.abort();  
    }
  }, []);

  const selectionColumns = [
    {
      dataIndex: "productName",
      title: "Product Name",
      align: "Center",
      width: "150",
      render: (text, record) => {
        return <p style={{ textTransform: "capitalize" }}>{text}</p>;
      },
    },
    {
      dataIndex: "inventorySalesPrice",
      title: "Price",
      width: "200",
      align: "Center",
      render: (text, record) => {
        return <p style={{ textTransform: "capitalize" }}>₱{text}</p>;
      },
    },
    {
      dataIndex: "TransacSoldQty",
      title: "Quantity",
      width: "200",
      align: "Center",
      render: (text, record, index) => {
        return <p>{record.quantity}pc/s.</p>;
      },
    },
    {
      dataIndex: "action",
      title: "Action",
      width: "200",
      align: "Center",
      render: (text, record) => {
        return (
        <Space align='end'>
          {/* For Update */}
          <Button style={{backgroundColor: '#83D2FF'}} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto -mr-3 w-10 sm:w-10 md:w-10 md:p-3 md:pl-3 sm:pr-2.5' onClick={()=> {
            setBtnType('edit');
            setCurrentSelectedItem(record);
            setQuantityModalVisibility(true);
            setModalMessage('Enter New Quantity: ');
          }}>
            <img className='w-auto h-5 sm:w-auto md:w-10 md:h-5 mr-2 sm:mr-0 md:mr-2 sm:mx-auto object-scale-down' src={edit}/>
          </Button>

          <Popconfirm title="Sure to delete?" onConfirm={() => handleCartItemDelete(record.inventoryID)}>
            <Button style={{backgroundColor: "#ED5264", marginLeft: 12}} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto w-10 sm:w-10 md:w-10 md:p-3 md:pl-0 sm:pr-2.5'>
              <img className='w-auto h-5 sm:w-auto md:w-5 mr-2 sm:mr-0 md:ml-2.5 sm:mx-auto object-scale-down' src={archive}/>
            </Button>
          </Popconfirm>
        </Space>
        )
      },
    },
  ];

  const invselectionColumns = [
    {
      title: "productSKU",
      dataIndex: "productSKU",
      defaultSortOrder: "descend",
      sortDirections: ["descend", "ascend"],
      render: (text, record) => {
        return (
          <p
            style={{
              textTransform: "capitalize",
            }}
            className="font-semibold"
          >
            {text}
          </p>
        );
      },
    },
    {
      dataIndex: "productName",
      title: "Product Name",
      align: "Center",
      width: "150",
      render: (text, record) => {
        return <p style={{ textTransform: "capitalize" }}>{text}</p>;
      },
    },
    {
      dataIndex: "inventoryQuantity",
      title: "Quantity",
      align: "Center",
      width: "150",
      render: (text, record) => {
        return <p style={{ textTransform: "capitalize" }}>{text}</p>;
      },
    },
    {
      dataIndex: "inventorySalesPrice",
      title: "Price",
      width: "200",
      align: "Center",
      render: (text, record) => {
        return <p style={{ textTransform: "capitalize" }}>₱{text}</p>;
      },
    },
  ];

  const onCancelQuantityModal = (e) => {
    setQuantityModalVisibility(false);
  };

  const proceedCallback = (item) => {
    let isExisting = false;
    const newCartItems = cart.filter(newCartItem=>{
      
      if(newCartItem.inventoryID === item.inventoryID){
        isExisting = true;
        
        if(btnType === 'add'){
          const total = item.quantity + newCartItem.quantity
          if(total > item.inventoryQuantity){
            notifyWarning('warning');
          }else{
            newCartItem.quantity = item.quantity + newCartItem.quantity;
          }
        }else{
          newCartItem.quantity = item.quantity;
        }
      }
      return newCartItem;
    })
    
    if(isExisting){
      addToCart(newCartItems);
    }
    else{
      addToCart([...cart, item]);
    }
    
    setQuantityModalVisibility(false);
  };

  const handleCartItemDelete = (item) => {
    const newData = cart.filter( data => data.inventoryID !== item);
    addToCart(newData);
  };

  //sub total computation
  let subTotal = cart.reduce((sum, item)=>{
                    return sum + (item.quantity * item.inventorySalesPrice);
                  }, 0);

  let totalProducts = cart.reduce((sum, item)=>{
                    return sum + item.quantity;
                  }, 0);

  //For computation       
  useEffect(() => {
    //setting the default value for the total
    if(subTotal === 0){
      setDiscSelect(false);
      setTaxSelect(false);
      setTotalAmount(0);
      setTotalDisc(0);
      setTotalTax(0);
      setDiscount({discValue: 0})
      setTax({taxValue: 0})
    }else{
      setDiscSelect(true);
      setTaxSelect(true);
    }

    setTotalAmount((subTotal - totalDisc) + totalTax);
    setActiveMenu(false);

  }, [subTotal, totalDisc, totalTax]);

  const taxOnChange = (e) => {
    setTotalTax((e/100) * subTotal);
  }
  
  const discOnChange = (e) => {
    setTotalDisc((e/100) * subTotal);
  }

  //For Setting the value for the discount
  const handleDiscountChange = async (e) => {
    if(e === 0){
      setDiscount({ 
        discName: 'None',
        discValue: 0,
      })
      discOnChange(e)
    }
    else{
      await activeDiscount.filter((data) => {
        if(data.DiscountID === e){
          setDiscount({ 
            discName: data.Discount_Name, 
            discValue: data.Discount_Value,
          })
          discOnChange(data.Discount_Value)
        }
      });
    }
  }

  //For Setting the value for the tax
  const handleTaxChange = async (e) => {
    if(e === 0){
      setTax({ 
        taxName: 'None',
        taxValue: 0,
      })
      taxOnChange(e)
    }
    else{
      await activeTax.filter((data) => {
        if(data.TaxID === e){
          setTax({ 
            taxName: data.Tax_Name,
            taxValue: data.Tax_Value,
          })
          taxOnChange(data.Tax_Value)
        }
      });
    }
  }

  const handlePlaceOrder = () => {
    if(cart.length === 0){
      emptyCartWarning('info');
    }else{
      setCheckoutModalVisible(true);
    }
  }

  const handleCloseModal = () => {
    setCounter((e) => e + 1);
    setCustCode('');
    setCheckoutModalVisible(false);
    setTotalChange(0);
    setPayment(0);
    setPaymentMode('Cash');
    setReceiptModalVisible(false);
    setMessage({error1: '', error2: '', error3: ''});
  };

  const handleCheckout = () => {
    if(payment < totalAmount){
      setMessage({error2: 'Please enter the right amount'});
    }else if(paymentMode === ''){
      setMessage({error1: '', error3: 'Please choose a payment mode'});
    }else{
      setMessage({error1: '', error2: '', error3: ''});
      setCheckoutModalVisible(false);
      setReceiptModalVisible(true);
      setReferenceNum(uniqueid(13));
    }

    if(custCode === 0){
      setCustName('Walk-In-Customer');
    }
  }

  useEffect(() => {
    if(payment === 0){
      setTotalChange(0);
    }else{
      handleChange();
    }
  }, [payment])

  const handleChange = () => {
    if(payment == 0 || payment == ''){
      setTotalChange(0);
    }else{
      setMessage({error1: '', error2: '', error3: ''});
      setTotalChange(payment - (totalAmount.toFixed(2)));
    }
  }

  const preventMinus = (e) => {
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

  useEffect(() => {
    //reload page
    fetchInventoryItems();
  }, [counter]);

  const handleInsertOrder = async () => {
    // for tblorders
    try{
      await Axios.post(`${mainApi}/api/order/insert`, {
        RefNumber: referenceNum,
        CustCode: custCode,
        TotalProducts: totalProducts,
        TotalAmount: totalAmount,
        Date: currentDate,
        Time: currentTimeMilitary,
        TotalTax: totalTax,
        TotalDiscount: totalDisc,
        // Status: 'paid',
      }).then((err) => {
        console.log('error: ' + err);
      }).catch((err) => {
        alert(err.response.data);
      });
    }catch(e){
      console.log("Error in Insert Order: " + e);
    }
    
    await handleInsertCartToDB();
  }

  const handleInsertPayment = async () => {
    // For Payments
    try{
      await Axios.post(`${mainApi}/api/payment/insert`, {
        RefNumber: referenceNum,
        CustCode: custCode,
        PaymentMode: paymentMode,
        AmountPaid: payment,
        TotalChange: totalChange,
        Status: 'paid',
      }).then((err) => {
        console.log('Data added to payment...' + err);
      }).catch((err) => {
        alert(err.response.data);
      });
    }catch(e){
      console.log("Error in Insert Payment: " + e);
    }

    transactionCompleteNotify('success');
    fetchInventoryItems();
    addToCart([]);
    handleCloseModal();
  }

  const handleInsertCartToDB = async () => {
    // for tblorderitems
    try{

      {await Array.from(cart).map((item) => {
        Axios.post(`${mainApi}/api/orderitem/insert`, {
          InventoryID: item.inventoryID,
          ProductPrice: item.inventorySalesPrice,
          Quantity: item.quantity,
          ReferenceNumber: referenceNum,
          Discount: discount.discValue,
          Tax: tax.taxValue,
        }).then(() => {
          console.log('Data added successfully to order items');
        }).catch((err) => {
          alert("Error sa order items: " + err);
        });
      })}

      {await Array.from(cart).map((item) => {
        //For updating the quantity in inventory
        Axios.put(`${mainApi}/api/inventory/update-quantity/${item.inventoryID}`,{
            Quantity: item.quantity,
        }).then((err)=>{
          console.log("Error: " + err.status);
        })
      })}

      await handleInsertPayment();

    }catch(e){
      console.log("Error in Insert Order Items: " + e);
    }

  }

  const handleTransaction = async () => {
    await handleInsertOrder();
    setCounter((e) => e + 1);
  }
  
  let componentRef = null;

  const setComponentRef = (ref) => {
    componentRef = ref;
  };

  const reactToPrintContent = () => {
    return componentRef;
  };

  const pageStyle = `
    @page {
      size: 3in 5in;
      margin: 100px;
    }

    @media all {
      .pagebreak {
        display: auto;
      }
    }

    @media print {
      .pagebreak {
        page-break-before: always;
      }
    }
  `;

  //For generating cards for products
  const renderCard = (card, index) => {
    return (
      <div className="site-card-wrapper relative float-left mt-2 p-0 w-auto" key={index}>
        <Card
          hoverable={card.inventoryQuantity === 0 ? false:true}
          style={{marginLeft: 10, borderRadius: 10, borderColor: '#747C95'}} 
          cover={card.productImage?
                    <div className="p-10 pl-12 pr-12 border-b-1 flex flex-auto justify-center items-center" style={{opacity: card.inventoryQuantity === 0? '0.5':'1'}}>
                      <img alt="Image Not Available" className="h-28 w-auto" src={imgPath + card.productImage}/>
                    </div>
                    :
                    <div className="p-10 pl-12 pr-12 border-b-1 flex flex-auto justify-center items-center" style={{opacity: card.inventoryQuantity === 0? '0.5':'1'}}>
                      <img alt="Image Not Available" className="h-28 w-auto" src={medLogo}/>
                    </div>
                }
          onClick = {() => {
            if(card.inventoryQuantity != 0){
              setBtnType('add');
              setCurrentSelectedItem(card);
              setQuantityModalVisibility(true);
              setModalMessage('Enter Quantity: ');
            }
          }}
        >
          <div className="justify-center items-center w-full -mt-3">
            <div className="flex flex-col gap-1 justify-center w-full text-center">
              <p className="price text-2xl font-poppins" style={{color: card.inventoryQuantity === 0? 'red':'#2E4053', textDecorationLine: card.inventoryQuantity === 0? "line-through": null, textTransform: 'capitalize'}}>
                <span className="price">{card.productName}</span>
              </p>
              <p className="quantity text-gray-600 text-sm overflow-ellipsis" style={{textTransform: 'capitalize'}}>
                <span className="quantity">{card.productDescription}</span>
              </p>
              <p className="quantity text-gray-600 text-sm overflow-ellipsis" style={{textTransform: 'capitalize'}}>
                <span className="quantity">{card.productAttribute}: </span>
                <span className="quantity">{card.productAttrValue}</span>
              </p>
              <p className="price text-lg font-poppins" style={{textTransform: 'capitalize'}}>₱
                <span className="price">{card.inventorySalesPrice}</span>
              </p>
            </div>
            <div className="flex flex-row gap-1 pt-2 w-full mt-2 border-t-1">
              <p className="quantity text-xs my-auto w-full text-gray-500" style={{color: card.inventoryQuantity === 0? 'red':'#A6ACAF'}}>
                <span className="quantity">{card.inventoryQuantity} pcs. Left</span>
              </p>
              <div className='flex flex-auto w-full'>
                <div className='text-right w-full'>
                  <p className="quantity text-xs my-auto w-full text-gray-500" style={{textTransform: 'capitalize'}}>
                    <span className="quantity">{card.productCategory}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    )
  };

  //For Search Item
  const search = (data) => {
    return data.filter((item) =>
      item.productName.toLowerCase().includes(searchVal) ||
      item.productDescription.toLowerCase().includes(searchVal) ||
      item.productAttribute.toLowerCase().includes(searchVal) ||
      item.productAttrValue.toLowerCase().includes(searchVal) ||
      item.inventorySalesPrice.toString().toLowerCase().includes(searchVal) ||
      item.productCategory.toLowerCase().includes(searchVal) ||  
      item.inventoryQuantity.toString().toLowerCase().includes(searchVal)
    )
  }

  //For Tabs
  const renderTabs = (tab, index) => {
    return(
      <TabPane tab={tab.Category_Name} key={index + 1} >
        
        <div className="flex w-full min-w-screen overflow-auto justify-center items-center">
          {/* <div className="relative md:mr-10 gap-10 w-full md:w-auto mb-3 p-0 sm:w-full inline-block content-center"> */}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 grid-flow-row-dense">
            {
              search(InventorySelectionTable).filter((data) => tab.Category_Name === data.productCategory).map(renderCard).slice(minValue, maxValue)
            }
          </div>
        </div>
        <div className="flex flex-auto mt-10 justify-center items-center">
          <Pagination defaultCurrent={1} defaultPageSize={9} total={search(InventorySelectionTable).filter((data) => tab.Category_Name === data.productCategory).length} onChange={handlePagination} disabled={InventorySelectionTable.length === 0? true : false} />
        </div>
      </TabPane>
    )
  }

  //For Pagination
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(9);

  const handlePagination = (value) => {
    console.log(value);
    if(value <= 1){
      setMinValue(0);
      setMaxValue(9);
    }else{
      setMinValue((value - 1) * 9);
      setMaxValue(value * 9);
    }
  };
  
  return (
    <div className="md:m-10">
      <Header title="Generate Orders" />

      <InputQuantityModal
        visible={quantityModalVisibility}
        close={onCancelQuantityModal}
        item={currentSelectedItem}
        min={1}
        max={currentSelectedItem.inventoryQuantity}
        proceedCallback={proceedCallback}
        modalMessage={modalMessage}
      />
      
      <div className="flex flex-col md:flex-row w-full">
        {/* first table */}
          <div className="m-2 md:m-2 p-2 md:px-10 pb-5 md:w-2/3 bg-white rounded-xl shadow-md">
            <div className="flex w-full h-12 mt-2">
              <p className="my-auto w-auto sm:w-34 md:w-72 px-4 font-bold">
                Available Products
              </p>
              {/* For search bar */}
              <div className='relative w-full'>
                <div className='absolute right-0 w-1/2 mt-3 mr-2 '>
                    <Input style={{ fontSize: '16', borderColor: "#747C95" }} className='w-full rounded-2xl mr-3.5 items-center font-poppins bor' placeholder='Search Product...' suffix={<BiSearchAlt className="text-xl" style={{color: "#747C95" }}/>}
                    onChange = {(e) => {setSearchVal(e.target.value.toLowerCase())}} value={searchVal}/>
                </div>
              </div>
            </div>

            <div style={{ borderColor: "#747C95" }} className=" w-full my-5 border-b-2 rounded"></div>

            <form>
              <Tabs defaultActiveKey="0" className='w-auto'>
                <TabPane tab='All Items' key='0'>
                  <div className="flex w-full min-w-screen overflow-auto justify-center items-center">
                    {/* <div className="relative md:mr-10 gap-10 w-full md:w-auto mb-3 p-0 sm:w-full inline-block content-center"> */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 grid-flow-row-dense">
                      {InventorySelectionTable && InventorySelectionTable.length > 0 &&
                        search(InventorySelectionTable).slice(minValue, maxValue).map(renderCard)
                      }
                    </div>
                    {/* </div> */}
                  </div>
                  <div className="flex flex-auto justify-center items-center mt-10">
                    <Pagination defaultCurrent={1} defaultPageSize={9} total={search(InventorySelectionTable).length} onChange={handlePagination} />
                  </div>
                </TabPane>
                {categoryList.map(renderTabs)}
              </Tabs>
            </form>
          </div>

        {/* second table */}
          <div className="m-2 md:m-2 p-2 md:px-4 pb-5 bg-white rounded-xl shadow-md md:w-1/3">
            <div className="flex items-center w-full h-12 mt-2">
              <p className="my-auto w-72 sm:w-34 md:w-72 px-4 font-bold">
                Cart
              </p>
            </div>

            <div style={{ borderColor: "#747C95" }} className=" w-full my-5 border-b-2 rounded"></div>

            <form>
              <div className="flex w-full min-w-screen justify-center items-center">
                <div className="flex flex-col justify-center w-full p-0">
                  <div className='my-auto bg-white rounded overflow-auto'>
                    <Table
                      columns={selectionColumns}
                      dataSource={cart}
                      pagination={false}
                      rowKey="cartId"
                    ></Table>
                  </div>
                  <div className="flex-column p-4 mt-4 w-full overflow">
                      <div className="flex w-auto text-left textboxes">
                        <p className='my-auto w-auto sm:w-34 md:w-56 font-semibold text-base'>Discount (%): </p>
                        <Select className='my-auto w-full' value={discount.discValue || "None"} defaultValue="Choose Discount" placeholder="Choose Discount"
                        onChange={(value) => { handleDiscountChange(value) }} disabled={discountSelect? false:true}>
                          <Option key={0} value={0}>None</Option>
                          {Array.from(activeDiscount).map((actDisc, index) => (
                            <Option key={actDisc.DiscountID} value={actDisc.DiscountID}>{actDisc.Discount_Name}</Option>
                          ))}
                        </Select>
                      </div>
                      {/* <div className="flex w-auto text-left textboxes mt-2">
                        <p className='my-auto w-auto sm:w-34 md:w-56 font-semibold text-base'>Tax (%): </p>
                        <Select className='my-auto w-full' value={tax.taxValue || "None"} defaultValue="Choose Tax" placeholder="Choose Tax"
                        onChange={(value) => { handleTaxChange(value) }}  disabled={taxSelect? false:true}>
                          <Option key={0} value={0}>None</Option>
                          {Array.from(activeTax).map((actTax) => (
                            <Option key={actTax.TaxID} value={actTax.TaxID}>{actTax.Tax_Name}</Option>
                          ))}
                        </Select>
                      </div> */}
                  </div>
                  <div className="flex flex-row justify-center items-center">
                      <p className="my-auto w-auto sm:w-34 md:w-72 text-center px-4 mb-4 font-semibold text-base">
                        Sub Total: {numberFormat(subTotal)}
                      </p>
                  </div>
                  <div className="flex flex-row justify-center items-center">
                      <p className="my-auto w-full sm:w-34 md:w-72 text-center font-bold text-2xl border-t-1 pt-2">
                        Total: {numberFormat(totalAmount)}
                      </p>
                  </div>
                  <div className="flex flex-row p-4 justify-center items-center">
                    <Button className="rounded-lg my-auto text-xs w-auto font-poppins px-10 md:text-lg sm:text-base font-medium tracking-wide h-10 border-0" style={{backgroundColor: '#46E4AC'}} onClick={() => {
                        handlePlaceOrder();
                    }}>
                      <span>Place Order</span>
                    </Button>
                  </div>
                </div>
              </div>
            </form>
            
            {/* MODAL FOR CHECKOUT */}
            <Modal title={'Place Order'} visible={checkoutModalVisible} onOk={handleCloseModal} onCancel={handleCloseModal} width={600}
              footer={[
                <Button key="submit" size='sm' style={{backgroundColor: '#14D89A'}} className="w-32 mr-4 rounded font-semibold" type="primary" onClick={handleCheckout}>Checkout</Button>,
                <Button key="back" size='sm' style={{backgroundColor: '#ED5264'}} className='rounded font-semibold text-white' onClick={handleCloseModal}>Cancel</Button>,
              ]}>
              <div className='flex flex-row gap-3'>
                <div className='flex flex-col gap-3 w-1/2'>
                  <div>
                    <p className='my-auto w-auto sm:w-34 md:w-56 font-semibold'>Customer Code:</p>
                    <Input className='rounded-sm' value={custCode || ''} placeholder="(You can leave this blank)"
                      onChange={(e) => {
                        setCustCode(e.target.value);
                      }}/>
                    <p className='text-red-700'>{message.error1}</p>
                  </div>
                  <div>
                    <p className='my-auto w-auto sm:w-34 md:w-56 font-semibold'>Payment Amount:</p>
                    <Input type="number" min={0} className='rounded-sm' value={payment} placeholder="Enter Payment Amount" autoFocus={true}
                      onChange={(e) => {
                        setPayment(e.target.value);
                      }} onPaste={preventPasteNegative} onKeyPress={preventMinus}/>
                    <p className='text-red-700'>{message.error2}</p>
                  </div>
                  <div>
                    <p className='my-auto w-auto sm:w-34 md:w-56 font-semibold'>Payment Mode:</p>
                    <Select className='w-full rounded-sm' placeholder="Select Mode of Payment" value={paymentMode || undefined}
                      onChange={(value) => {
                        setPaymentMode(value);
                      }}>
                      <Option value="cash">Cash</Option>
                      <Option value="gcash">GCash</Option>
                      <Option value="maya">Maya</Option>
                      <Option value="others">Others</Option>
                    </Select>
                    <p className='text-red-700'>{message.error3}</p>
                  </div>
                </div>

                <div className='flex flex-col w-1/2 bg-white shadow-lg rounded-md pt-8'>
                  <div>
                    <p className="my-auto w-full sm:w-34 text-center font-bold text-base">
                      Total: {numberFormat(totalAmount)}
                    </p>
                  </div>
                  <div>
                    <p className="my-auto w-full sm:w-34 text-center font-bold text-base">
                      Amount Paid: ₱{payment || 0}
                    </p>
                  </div>
                  <div style={{ borderColor: "#747C95" }} className=" w-1/2 my-5 border-b-2 rounded text-center place-self-center items-center justify-center"></div>
                  <div>
                    <p className="my-auto w-full sm:w-34 mx-auto text-center font-bold text-2xl">
                      Change: {numberFormat(totalChange)}
                    </p>
                  </div>
                </div>
              </div>
            </Modal>

            {/* ------------------------------------ */}

            {/* MODAL FOR RECEIPT */}
            <Modal title={'Invoice POS'} visible={receiptModalVisible} onOk={handleCloseModal} onCancel={handleCloseModal} width={300} style={{ top: 30 }}
              footer={[
                <ReactToPrint key='print'
                  trigger = {() => {
                    return(
                      <Button className='text-black rounded inline-flex items-center w-auto py-0' style={{backgroundColor: "#83D2FF", borderRadius: 5}}>
                        <img className='w-auto h-5 mr-2 md:mr-2 sm:mx-auto object-scale-down' src={print}/>
                        <p className='text-black font-semibold'>Print</p>
                      </Button>
                    )
                  }}
                  onAfterPrint={handleTransaction}
                  pageStyle={pageStyle}
                  content={reactToPrintContent}
                />,
                <Button key="submit" size='sm' style={{backgroundColor: '#14D89A'}} className='text-black mb-4 rounded inline-flex items-center my-auto w-auto' onClick={handleTransaction}>
                  <img className='invisible h-5 object-scale-down'/>
                  <p className='text-black font-semibold'>Submit</p>
                </Button>,
              ]}>
              <div className='flex flex-col gap-3 p-3' ref={setComponentRef}>
                <div className='flex flex-col w-full'>
                  <div>
                    <p className='w-full font-bold font-poppins mb-2 text-xl text-center'>CoruMed</p>
                  </div>
                  <div>
                    <div className="flex flex-row">
                      <p className='w-1/2 p-0 m-0 text-xs'>Date: {currentDate}</p>
                      <p className='w-1/2 p-0 m-0 text-xs text-right'>Time: {currentTime}</p>
                    </div>
                    <p className='w-full p-0 m-0 text-xs'>Address: {companyData.address}</p>
                    <p className='w-full p-0 m-0 text-xs'>Email: {companyData.email}</p>
                    <p className='w-full p-0 m-0 text-xs'>Contact: {companyData.contact}</p>
                    <p className='my-auto w-full p-0 m-0 text-xs mb-2'>Customer: {custCode === 0? custName : custCode}</p>
                  </div>

                  {Array.from(cart).map((item) => (
                    <div key={item.inventoryID} className='flex flex-col gap-0 m-0 p-0'>
                      <p  className='my-auto w-full left-0 p-0 m-0 text-sm'>{item.productName}</p>
                      <div className="flex flex-row m-0">
                        <p  className='w-1/2 left-0 p-0 m-0 text-sm'>{item.quantity}pc/s. x {item.inventorySalesPrice}</p>
                        <p  className='w-1/2 text-right left-0 p-0 m-0 text-sm'>{numberFormat((item.quantity * item.inventorySalesPrice))}</p>
                      </div>
                      <div className="border-black w-full border-b-1 border-dashed rounded text-center place-self-center items-center justify-center"></div>
                    </div>
                  ))}

                  {/* <div className="flex flex-row mt-2">
                    <p className='w-1/2 left-0 p-0 m-0 text-xs'>Tax ({tax.taxValue}%):</p>
                    <p className='w-1/2 text-right left-0 p-0 m-0 text-xs font-semibold'>{numberFormat(totalTax)}</p>
                  </div>
                  <div className="border-black w-full border-b-1 border-dashed rounded text-center place-self-center items-center justify-center"></div> */}
                  <div className="flex flex-row">
                    <p className='w-1/2 left-0 p-0 m-0 text-xs'>Discount ({discount.discValue}%):</p>
                    <p className='w-1/2 text-right left-0 p-0 m-0 text-xs font-semibold'>{numberFormat(totalDisc)}</p>
                  </div>
                  <div className="border-black w-full border-b-1 border-dashed rounded text-center place-self-center items-center justify-center"></div>
                  <div className="flex flex-row">
                    <p className='w-1/2 left-0 p-0 m-0 text-sm font-semibold'>Grand Total:</p>
                    <p className='w-1/2 text-right left-0 p-0 m-0 text-sm font-bold'>{numberFormat(totalAmount)}</p>
                  </div>
                  <div className="border-black w-full border-b-1 border-dashed rounded text-center place-self-center items-center justify-center"></div>
                  <div>  
                    <div className="flex flex-row mt-2 bg-blue-gray-50">
                      <p className='w-1/2 left-0 p-0 m-0 text-xs text-left'>Paid By:</p>
                      <p className='w-1/2 left-0 p-0 m-0 text-xs text-center'>Amount:</p>
                      <p className='w-1/2 left-0 p-0 m-0 text-xs text-right'>Change:</p>
                    </div>
                    <div className="flex flex-row">
                      <p className='w-1/2 left-0 p-0 m-0 text-xs font-semibold'>{paymentMode}</p>
                      <p className='w-1/2 left-0 p-0 m-0 text-xs font-semibold text-center'>{numberFormat(totalAmount)}</p>
                      <p className='w-1/2 left-0 p-0 m-0 text-xs font-semibold text-right'>{numberFormat((payment-totalAmount))}</p>
                    </div>
                  </div>
                  <div className="border-black w-full border-b-1 border-dashed rounded text-center place-self-center items-center justify-center"></div>
                  <div className="flex flex-col justify-center items-center">
                    <p className='w-full p-0 m-0 text-base text-center font-semibold my-3'>Thank You. Please Come Again.</p>
                    <Barcode width={1.3} height={40} fontSize={15} textAlign='center' value={referenceNum}/>
                  </div>

                </div>
              </div>
            </Modal>

          </div>
      </div>
      

    </div>
  );
};

const InputQuantityModal = ({ visible, close, item, proceedCallback, min, max, modalMessage }) => {
  const [inputValue, setInputValue] = useState(1);
  const [error, setError] = useState('');
  const inputRef = useRef()
  const submitInput = useCallback(() => {
    if (inputValue < min) {
      setError(`Value should be atleast ${min}`);
      return;
    }
    if (inputValue > max) {
      setError(`Value should not exceed ${max}`);
      return;
    }
    
    const itemWithQuantity = {
      ...item,
      quantity: inputValue,
      cartId: uuidv4(),
    };
    proceedCallback(itemWithQuantity);
  }, [visible, inputValue]);

  
  const listenForKeyPress = useCallback(
    (event) => {
      switch(event.code){
        case "Enter":
          submitInput();
          break;
        case "EnterRight":
          submitInput();
          break;
        case "ControlLeft": 
          inputRef.current.focus()
          break
        default:
          console.log("key not registered")
      }
    },
    [visible, inputValue]
  );
  
  useEffect(() => {
    if (visible) {
      window.addEventListener("keydown", listenForKeyPress, true);
      inputRef.current.focus();
    } else {
      setInputValue(1);
      setError("");
      window.removeEventListener("keydown", listenForKeyPress, true);
    }
    return () => {
      window.removeEventListener("keydown", listenForKeyPress, true); // clean up func to avoid memory leaks
    };
  }, [visible, listenForKeyPress, submitInput]);

  const onInputChange = (value) => {
    setInputValue(value);
  };

  const handleCloseModal = () => {
    visible = false;
    console.log(visible);
  }

  return (
    <Modal
      title={"Product Name: " + item.productName}
      visible={visible}
      onCancel={close}
      centered
      width={300}
      footer={null}
      cancelButtonProps={close}
      onOk={close}
    >
      <div className="flex flex-col w-full min-w-screen justify-between items-center -mt-2">
        <div className="flex flex-col justify-center w-full md:w-10/12 p-0 sm:w-full h-16">
          <div className="textboxes w-full flex flex-col justify-center h-9 gap-2">
            <p className="my-auto w-auto sm:w-34 md:w-72">{modalMessage}</p>
            <InputNumber
              min={1}
              className="w-full h-auto"
              placeholder="Enter quantity"
              value={inputValue}
              ref={inputRef}
              onChange={onInputChange}
            />
            <small className="text-red-400 -mt-2">{error}</small>
          </div>
        </div>
        <div className="flex gap-1 mt-4 -mb-2">
          <Button type="button" className="bg-red text-white" onClick={handleCloseModal}>
            Cancel (ESC)
          </Button>
          <Button type="button" className="bg-blue-400 text-white" onClick={submitInput}>
            Proceed (Enter)
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default GenerateOrder;