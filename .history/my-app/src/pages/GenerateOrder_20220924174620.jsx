import React, { useState, useEffect, useCallback, useRef, Component } from "react";
import ReactToPrint from 'react-to-print';
import { Header } from "../components";
import { Table, Input, Modal, InputNumber, Button, Card, Col, Row, notification, Space, Popconfirm, Select, Affix } from "antd";
import Axios from "axios";
import { v4 as uuidv4 } from "uuid";
import edit from '../Images/edit.png';
import archive from '../Images/archive.png';
import print from '../Images/print.png';
import { useStateContext } from '../contexts/ContextProvider';
import moment from 'moment';
import Barcode from 'react-barcode';
import { customAlphabet } from 'nanoid';

const { Search } = Input;
const { Meta } = Card;
const { Option } = Select;

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

  // const [InventorySelectionTable, setInventorySelectionTable] = useState([]);
  
  // const componentRef = useRef(); 
  const current = new Date();
  const currentDate = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
  const currentTime = `${moment(current).format("h:mm A")}`;

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
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const [totalDisc, setTotalDisc] = useState(0);
  const [checkoutModalVisible, setCheckoutModalVisible] = useState(false);
  const [receiptModalVisible, setReceiptModalVisible] = useState(false);
  const [custCode, setCustCode] = useState(0);
  const [custName, setCustName] = useState('');
  const [payment, setPayment] = useState(0);
  const [paymentMode, setPaymentMode] = useState('Cash');
  const [message, setMessage] = useState({
    error1: '',
    error2: '',
    error3: '',
  });
  
  // for generating random reference number
  const uniqueid = customAlphabet('1234567890', 10);
  const [referenceNum, setReferenceNum] = useState('');

  const fetchInventoryItems = async () => {
    const { data } = await Axios.get("http://localhost:3001/api/inventory/get/prod/active");
    setInventorySelectionTable(data);
  };
  
  useEffect(() => {
    //on page load
    setActiveMenu(false);
    fetchInventoryItems();
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
      dataIndex: "productPrice",
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
        //   <Button type="button" className="bg-red text-white">Delete
        // </Button>
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
      dataIndex: "productPrice",
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
                    return sum + (item.quantity * item.productPrice);
                  }, 0);

  let totalProducts = cart.reduce((sum, item)=>{
                    return sum + item.quantity;
                  }, 0);

  //For computation       
  useEffect(() => {
    //setting the default value for the total
    if(subTotal === 0){
      setTotalAmount(0);
      setDiscount(0);
      setTax(0);
      setTotalDisc(0);
      setTotalTax(0);
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

  const handlePlaceOrder = () => {
    
    if(cart.length === 0){
      emptyCartWarning('info');
    }else{
      setCheckoutModalVisible(true);
    }
  }

  const handleCloseModal = () => {
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
      // {cart.map((item) => {
      //   console.log(item.quantity);
      // })}
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
      setTotalChange(payment - totalAmount);
    }
  }

  const handleTransaction = () => {
    handleCloseModal();
    
    // for tblorderitems
    {cart.map((item) => {
      Axios.post('http://localhost:3001/api/orderitem/insert', {
        InventoryID: item.inventoryID,
        ReferenceNumber: referenceNum,
        ProductPrice: item.productPrice,
        Quantity: item.quantity,
        Discount: discount,
        Tax: tax,
      }).then(() => {
        console.log('Data added successfully to order items');
      }).catch((err) => {
        alert(err.response.data);
        return;
      });
    })}

    // for tblorders
    Axios.post('http://localhost:3001/api/order/insert', {
      RefNumber: referenceNum,
      CustCode: custCode,
      TotalProducts: totalProducts,
      TotalAmount: totalAmount,
      Date: currentDate,
      Time: currentTime,
      Status: 'paid',
    }).then(() => {
      console.log('Data added successfully to order items');
    }).catch((err) => {
      alert(err.response.data);
      return;
    });

    transactionCompleteNotify('success');
    addToCart([]);
    
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

  const renderCard = (card, index) => {
    return (
      <div className="site-card-wrapper relative float-left mt-2 p-0" key={index}>
        <Row gutter={16}>
          <Col xs={24} xl={8}>
            <Card
              hoverable={card.inventoryQuantity === 0 ? false:true}
              style={{ width: 260, marginLeft: 10, borderRadius: 10, borderColor: '#747C95'}}
              cover={<img alt="Image Not Available" src={card.image}/>}
            >
              <div className="justify-center items-center w-full">
                <div className="flex flex-col gap-1 justify-center w-full mt-2 text-center">
                  <p className="price text-2xl font-poppins" style={{color: card.inventoryQuantity === 0? 'red':'#2E4053', textDecorationLine: card.inventoryQuantity === 0? "line-through": null}}>
                    <span className="price">{card.productName}</span>
                  </p>
                  <p className="quantity text-gray-600 text-sm overflow-ellipsis">
                    <span className="quantity">{card.productDescription}</span>
                  </p>
                  <p className="price text-lg font-poppins">₱
                    <span className="price">{card.productPrice}</span>
                  </p>
                </div>
                <div className="flex flex-row gap-1 pt-2 w-full mt-2 border-t-1">
                  <p className="quantity text-xs my-auto w-full text-gray-500" style={{color: card.inventoryQuantity === 0? 'red':'#A6ACAF'}}>
                    <span className="quantity">{card.inventoryQuantity} pcs. Left</span>
                  </p>
                  <div className='relative w-full'>
                    <div className='absolute right-0 w-34'>
                      <Button 
                        onClick = {() => {
                          setBtnType('add');
                          setCurrentSelectedItem(card);
                          setQuantityModalVisibility(true);
                          setModalMessage('Enter Quantity: ');
                        }}
                        className="my-auto rounded" disabled={card.inventoryQuantity === 0? true:false}>
                        Add Product
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    )
  };
  
  return (
    <div className="md:m-10 mt-20 mx-8">
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
      
                    

      <div className="flex flex-col md:flex-row w-full overflow-auto">
        {/* first table */}
          <div className="m-2 md:m-2 p-2 md:px-10 pb-5 md:w-2/3 bg-white rounded-xl shadow-md">
            <div className="flex w-full h-12 mt-2">
              <p className="my-auto w-auto sm:w-34 md:w-72 px-4 font-bold">
                Available Products
              </p>
            </div>

            <div style={{ borderColor: "#747C95" }} className=" w-full my-5 border-b-2 rounded"></div>

            <form>
              <div className="flex w-full min-w-screen overflow-auto">
                <div className="relative md:mr-10 gap-10 w-full md:w-auto mb-3 p-0 sm:w-full inline-block content-center">
                  {InventorySelectionTable.map(renderCard)}
                </div>
              </div>
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
                      scroll={{ y: 240, x: 0 }}
                      columns={selectionColumns}
                      dataSource={cart}
                      pagination={false}
                      rowKey="cartId"
                    ></Table>
                  </div>
                  <div className="flex-column p-4 mt-4 w-full overflow">
                      <div className="flex w-auto text-left textboxes">
                        <p className='my-auto w-auto sm:w-34 md:w-56 font-semibold text-base'>Discount (%): </p>
                        <Input type="number" min={0} className='my-auto w-auto md:w-1/2' value={discount} placeholder="Enter Discount" onChange={(e)=> { discOnChange(e.target.value); setDiscount(e.target.value)}}/>
                      </div>
                      <div className="flex w-auto text-left textboxes mt-2">
                        <p className='my-auto w-auto sm:w-34 md:w-56 font-semibold text-base'>Tax (%): </p>
                        <Input type="number" min={0} className='my-auto w-auto md:w-1/2' value={tax} placeholder="Enter Tax" onChange={(e)=> { taxOnChange(e.target.value); setTax(e.target.value)}}/>
                      </div>
                  </div>
                  <div className="flex flex-row justify-center items-center">
                      <p className="my-auto w-auto sm:w-34 md:w-72 text-center px-4 mb-4 font-semibold text-base">
                        Sub Total: ₱{subTotal}
                      </p>
                  </div>
                  <div className="flex flex-row justify-center items-center">
                      <p className="my-auto w-full sm:w-34 md:w-72 text-center font-bold text-2xl border-t-1 pt-2">
                        Total: ₱{totalAmount}
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
                    <Input type="number" min={0} className='rounded-sm' value={payment} placeholder="Enter Payment Amount"
                      onChange={(e) => {
                        setPayment(e.target.value);
                      }}/>
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
                      Total: ₱{totalAmount}
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
                      Change: ₱{totalChange}
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
                      <p className='w-1/2 p-0 m-0 text-sm'>Date: {currentDate}</p>
                      <p className='w-1/2 p-0 m-0 text-sm text-right'>Time: {currentTime}</p>
                    </div>
                    <p className='w-full p-0 m-0 text-sm'>Address: 123 corumed st.</p>
                    <p className='w-full p-0 m-0 text-sm'>Email: sampleemail@yahoo.com</p>
                    <p className='w-full p-0 m-0 text-sm'>Contact: 09090909099</p>
                    <p className='my-auto w-full p-0 m-0 text-sm mb-2'>Customer: {custCode === 0? custName : custCode}</p>
                  </div>

                  {Array.from(cart).map((item) => (
                    <div key={item.inventoryID} className='flex flex-col gap-0 m-0 p-0'>
                      <p  className='my-auto w-full left-0 p-0 m-0 text-sm'>{item.productName}</p>
                      <div className="flex flex-row m-0">
                        <p  className='w-1/2 left-0 p-0 m-0 text-sm'>{item.quantity}pc/s. x {item.productPrice}</p>
                        <p  className='w-1/2 text-right left-0 p-0 m-0 text-sm'>₱{(item.quantity * item.productPrice)}</p>
                      </div>
                      <div className="border-black w-full border-b-1 border-dashed rounded text-center place-self-center items-center justify-center"></div>
                    </div>
                  ))}

                  <div className="flex flex-row mt-2">
                    <p className='w-1/2 left-0 p-0 m-0 text-sm'>Tax ({tax}%):</p>
                    <p className='w-1/2 text-right left-0 p-0 m-0 text-sm font-semibold'>₱{totalTax}</p>
                  </div>
                  <div className="border-black w-full border-b-1 border-dashed rounded text-center place-self-center items-center justify-center"></div>
                  <div className="flex flex-row">
                    <p className='w-1/2 left-0 p-0 m-0 text-sm'>Discount ({discount}%):</p>
                    <p className='w-1/2 text-right left-0 p-0 m-0 text-sm font-semibold'>₱{totalDisc}</p>
                  </div>
                  <div className="border-black w-full border-b-1 border-dashed rounded text-center place-self-center items-center justify-center"></div>
                  <div className="flex flex-row">
                    <p className='w-1/2 left-0 p-0 m-0 text-sm font-semibold'>Grand Total:</p>
                    <p className='w-1/2 text-right left-0 p-0 m-0 text-sm font-bold'>₱{totalAmount}</p>
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
                      <p className='w-1/2 left-0 p-0 m-0 text-xs font-semibold text-center'>₱{totalAmount}</p>
                      <p className='w-1/2 left-0 p-0 m-0 text-xs font-semibold text-right'>₱{payment-totalAmount}</p>
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
              className="w-full"
              placeholder="Enter quantity"
              value={inputValue}
              ref={inputRef}
              onChange={onInputChange}
            />
            <small className="text-red-400 -mt-2">{error}</small>
          </div>
        </div>
        <div className="flex gap-1 mt-4 -mb-2">
          <Button type="button" className="bg-red text-white">
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