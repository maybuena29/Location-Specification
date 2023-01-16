import React, { useEffect, useState } from 'react';
import add from '../Images/add.png';
import edit from '../Images/edit.png';
import print from '../Images/print.png';
import { Header } from '../components';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import { Modal, Select, notification, Space, Table, Input, Tabs } from 'antd';
import { Br, Cut, Line, Printer, Text, Row, render } from 'react-thermal-printer';
import type { ColumnsType, TableProps } from 'antd/es/table';
import Axios from "axios";
import moment from 'moment';
import Barcode from 'react-barcode/lib/react-barcode';
import ReactToPrint from 'react-to-print';
import mainApi from '../contexts/Api';

const { Option } = Select;
const TabPane = Tabs.TabPane;

//For notification
const openNotif = (type) => {
  if(type === 'success'){
    notification[type]({
      message: 'SUCCESS!',
      description: 'Order Added Successfully.',
      duration: 4,
      style: {borderRadius: '5px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'},
    });
  }else if(type === 'warning'){
    notification[type]({
      message: 'SUCCESS!',
      description: 'Order Removed Successfully.',
      duration: 4,
      style: {borderRadius: '5px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'},
    });
  }else if(type === 'error'){
    notification[type]({
      message: 'ERROR!',
      description: 'There was an error executing the command.',
      duration: 4,
      style: {borderRadius: '5px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'},
    });
  }else{
    notification[type]({
      message: 'SUCCESS!',
      description: 'Order Updated Successfully.',
      duration: 4,
      style: {borderRadius: '5px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'},
    });
  }
  
};

const Orders = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [message2, setMessage2] = useState('');
  const [selStat, setSelStat] = useState('');
  const [status, setStatus] = useState('Select Status');
  const [orderList, setOrderList] = useState([]);
  const [orderID, setOrderID] = useState('');
  const [orderInfo, setOrderInfo] = useState({
    referenceNum: '',
    customerCode: 0,
    customerName: '',
    totalProducts: 0,
    totalAmount: 0,
    totalTax: 0,
    totalDisc: 0,
    date: '',
    time: '',
  });
  const [paymentInfo, setPaymentInfo] = useState({
    totalChange: 0,
    totalAmountPaid: 0,
    paymentMode: '',
  })
  const [orderDeductions, setOrderDeductions] = useState({
    tax: 0,
    discount: 0,
  });
  const [companyData, setCompanyData] = useState({
    address: '',
    email: '',
    contact: '',
  });
  const [orderItems, setOrderItems] = useState([]);
  const [receiptModalVisible, setReceiptModalVisible] = useState(false);
  let btnType = '';
  const [searchVal, setSearchVal] = useState('');

  const abortController = new AbortController();

  //For Search
  const search = (data) => {
    return data.filter((item) =>
      item.ReferenceNumber.toString().toLowerCase().includes(searchVal) ||
      item.CustName.toLowerCase().includes(searchVal) ||
      item.TotalProducts.toString().toLowerCase().includes(searchVal) ||
      item.TotalAmount.toString().toLowerCase().includes(searchVal) ||
      moment(item.Date).format("YYYY-MM-DD").toString().toLowerCase().includes(searchVal) ||
      item.Time.toString().toLowerCase().includes(searchVal) ||
      item.Status.toLowerCase().includes(searchVal)
    )
  }

  //For Modal
  const [modal, setModal] = useState({Title: '', Visible: false, });
  
  const handleOk = () => {
    setModal({Visible: false});
    setMessage2('');
    setSelStat('');
    // setbrandName('');
    setStatus('Select Status');
  };
  
  //For Edit Modal
  const showUpdateModal = () => {
    setModal({Title: 'Update Order', Visible: true});
  };

  //pag load ng page at show ng data sa table
  const fetchCompanyProfile = async () => {
    Axios.get(`${mainApi}/api/company/get`).then((resp)=>{
      setCompanyData({
        address: resp.data.address,
        email: resp.data.email,
        contact: resp.data.contact,
      });
    });
  }

  useEffect(() => {
    fetchCompanyProfile();
    Axios.get(`${mainApi}/api/order/get`, {signal: abortController.signal}).then((response)=>{
      setOrderList(response.data);
      setCount(() => count * 0)
    }).catch((err)=>{
      if (err.response.status===403){
        navigate('/NotAuthorizedPage')
      }
      
    });

    return () => {  
      abortController.abort();
    }

  }, [count]);


  //pag add and update ng data
  const handleSubmit = () => {
    
    //code for update
    if(status === "Select Status"){
      setMessage2('Please choose status.');
      setSelStat('error');
    }else{
      Axios.put(`${mainApi}/api/order/update/${orderID}`, {
        Status: status
      }).then(() => {
        console.log('Data updated successfully');
      }).catch((err) => {
        alert(err.response.data);
      });

      openNotif('info');
      handleOk();
      setCount(() => count + 1);
    }
    
  };

  //pag show ng data para sa update
  const showDataToModal = (orderid) => {
    Axios.get(`${mainApi}/api/order/get/${orderid}`).then((resp)=>{
      setStatus(resp.data.Status);
      setOrderInfo({
        referenceNum: resp.data.ReferenceNumber,
        customerCode: resp.data.CustomerCode,
        customerName: resp.data.CustName,
        totalProducts: resp.data.TotalProducts,
        totalAmount: resp.data.TotalAmount,
        totalTax: resp.data.TotalTax,
        totalDisc: resp.data.TotalDiscount,
        date: resp.data.Date,
        time: resp.data.Time,
      });
      
      setOrderID(orderid);
      handleRetrieveOrderItems(resp.data.ReferenceNumber);
      showDataFromPayment(resp.data.ReferenceNumber);
    });

    setCount(() => count + 1);
  }

  const showDataFromPayment = (refNum) => {
    Axios.get(`${mainApi}/api/payment/get/${refNum}`).then((resp)=>{
      setPaymentInfo({
        totalChange: resp.data.totalChange,
        totalAmountPaid: resp.data.amountPaid,
        paymentMode: resp.data.paymentMode,
      });
    });

    setCount(() => count + 1);
  }

  const handleRetrieveOrderItems = (refNumber) => {
    
    Axios.get(`${mainApi}/api/orderitem/get/${refNumber}`).then((resp)=>{
      setOrderItems(resp.data);
    });
    setCount(() => count + 1);
    if(btnType === 'edit'){
      showUpdateModal();
    }else{
      setReceiptModalVisible(true);
    }
    
  }

  // For Printing
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

  let device;
  const handleSelectPrinter = async () => {
    
    const receipt = (
      <Printer type="epson" width={24} className="font-poppins">
        <Text align="center" className="mt-2" size={{ width: 2, height: 2, fontFamily:"sans-serif" }}>CoruMed</Text>
        <Text align="center" font="A">{companyData.address}</Text>
        <Br />
        <Text font="B">Date: {moment(orderInfo.date).format("YYYY-MM-DD")}</Text>
        <Text font="C">Time: {orderInfo.time}</Text>
        <Text font="D" className="text-xs">Customer: {orderInfo.customerCode === 0? "Walk-In" : orderInfo.customerCode}</Text>
        <Br/>
        {Array.from(orderItems).map((item, index) => (
          <div key={index}>
            <Text font="E" className="text-xs">{item.productName}</Text>
            <Row className="text-xs" left={<Text>{item.quantity}pc/s.X{item.productPrice}</Text>} right={<Text>P{(item.quantity * item.productPrice).toFixed(2)}</Text>} />
            <Line character="-"/>
          </div>
        ))}
        <Row className="text-xs" left={<Text>Amount:</Text>} right={<Text>P{(orderInfo.totalAmount + orderInfo.totalDisc).toFixed(2)}</Text>}/>
        <Row className="text-xs" left={<Text font="special-A">Discount ({orderItems.slice(0, 1).map((item) => item.discount)}%):</Text>} right={<Text>P{(orderInfo.totalDisc).toFixed(2)}</Text>}/>
        <Row className="text-xs" left={<Text font="special-B">Grand Total:</Text>} right={<Text>P{(orderInfo.totalAmount).toFixed(2)}</Text>}/>
        <Row className="text-xs" left={<Text>Paid By:</Text>} right={<Text>{paymentInfo.paymentMode || 'N/A'}</Text>}/>
        <Row className="text-xs" left={<Text>Change:</Text>} right={<Text>P{(paymentInfo.totalChange).toFixed(2) || 'N/A'}</Text>}/>
        
        <Line character="*"/>
        <Br/>
        <Text align="center">Thank You.{'\n'}Please Come Again.</Text>
        <Br/>
        <Text align="center">Reference #:</Text>
        <Text align="center">{orderInfo.referenceNum}</Text>
        <Cut />
      </Printer>
    );
    
    const data: Uint8Array = await render(receipt);

    try {
      navigator.usb.addEventListener('connect', event => {
        // event.device will bring the connected device
        console.log('connected: ', event.device)
        if(device === undefined){
          device = navigator.usb.requestDevice({
            filters: [{
              vendorId: 1155,
              productName: '58Printer',
            }]
          })
        }
        alert('Device Connected.')
      });
      
      navigator.usb.addEventListener('disconnect', event => {
        // event.device will bring the disconnected device
        console.log('disconnected: ', event.device)
        alert('Device Disconnected.')
      }); 

      console.log(device);
      let tempDevice;
      if(device === undefined){
        device = await navigator.usb.requestDevice({
          filters: [{
            vendorId: 1155,
            productName: '58Printer',
          }]
        })
      }

      if (device !== undefined) {
        console.log(device);
        console.log(data);
        device.open()
        .then(() => device.selectConfiguration(1))
        .then(() => device.claimInterface(0));
        await device.transferOut(4, data)
      }

    } catch (err) {
      console.log('Error: ', err)
      alert('Please Try Again.');
    }
    
  }

  const handleCloseModal = () => {
    setReceiptModalVisible(false);
  };

  //For the column of the table
    interface DataType {
      key: React.Key;
      brand_name: string;
      status: string;
    }

    const brandTblGrid: ColumnsType<DataType> = [
      {
        title: 'Reference Number',
        dataIndex: 'ReferenceNumber',
        align: 'center',
        sorter: {
          compare: (a, b) => a.ReferenceNumber - b.ReferenceNumber,
        },
        render: (text, record) => {
          return <p style={{textTransform: 'capitalize'}}>{text}</p>
        }
      },
      {
        title: 'Customer Name',
        dataIndex: 'CustName',
        align: 'center',
        sorter: (a, b) => a.CustName.localeCompare(b.CustName),
        render: (text, record) => {
          return <p style={{textTransform: 'capitalize'}}>{text}</p>
        }
      },
      {
        title: 'Total Products',
        dataIndex: 'TotalProducts',
        align: 'center',
        sorter: {
          compare: (a, b) => a.TotalProducts - b.TotalProducts,
        },
        render: (text, record) => {
          return <p style={{textTransform: 'capitalize'}}>{text}</p>
        }
      },
      {
        title: 'Total Amount',
        dataIndex: 'TotalAmount',
        align: 'center',
        sorter: {
          compare: (a, b) => a.TotalAmount - b.TotalAmount,
        },
        render: (text, record) => {
          return <p style={{textTransform: 'capitalize'}}>₱{text}</p>
        }
      },
      {
        title: 'Date',
        dataIndex: 'Date',
        align: 'center',
        sorter: (a, b) => moment(a.Date).unix() - moment(b.Date).unix(),
        render: (text, record) => {
          return <p style={{textTransform: 'capitalize'}}>{moment(text).format("YYYY-MM-DD")}</p>
        }
      },
      {
        title: 'Time',
        dataIndex: 'Time',
        align: 'center',
        sorter: (a, b) => moment(a.Time, 'hh:mm A').unix() - moment(b.Time, 'hh:mm A').unix(),
        render: (text, record) => {
          return <p style={{textTransform: 'capitalize'}}>{text}</p>
        }
      },
      {
        title: 'Status',
        dataIndex: 'Status',
        align: 'center',
        sorter: (a, b) => a.Status.localeCompare(b.Status),
        render: (text, record) => {
          return <p style={{color: record.Status === 'paid'  ? 'green': '#8A8A8A', textTransform: 'capitalize'}}>{text}</p>
        }
      },
      {
        key: 'OrderID',
        dataIndex: 'OrderID',
        title: 'Actions',
        align: 'center',
        width: '120px',
        render:(_,record) =>
          <Space align='end'>
            {/* For Update */}
            {record.Status === 'paid'? <></>:
              <Button style={{backgroundColor: '#83D2FF'}} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto -mr-3 w-10 sm:w-10 md:w-10 md:p-3 md:pl-3 sm:pr-2.5' onClick={()=> {
                  btnType = 'edit';
                  showDataToModal(record.OrderID);
              }}>
                <img alt='Not Available' className='object-scale-down w-auto h-5 mr-2 sm:w-auto md:w-10 md:h-5 sm:mr-0 md:mr-2 sm:mx-auto' src={edit}/>
              </Button>
            }

            {/* For Print */}
            <Button style={{backgroundColor: "#46E4AC", marginLeft: 12}} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto w-10 sm:w-10 md:w-10 md:p-3 md:pl-3 sm:pr-2.5' onClick={() => {
                btnType = 'print';
                showDataToModal(record.OrderID);
            }}>
              <img alt='Not Available' className='object-scale-down w-auto h-5 mr-2 sm:w-auto md:w-5 sm:mr-0 md:mr-2 sm:mx-auto' src={print}/>
            </Button>
          </Space>
      },
    ];

    // post the data from db to the table
    const oList = orderList.map(({body,...item}) => ({
      ...item,
      key: item.OrderID,
      message: body,
    }))

  return (

    <div className='mx-8 mt-20 md:m-10'>
      <Header title='Orders'/>

        <div className='p-2 pb-5 m-2 bg-white shadow-md md:m-10 md:px-10 rounded-xl'>

          <div className='flex w-full h-12 mt-2'>
            <p className='w-auto px-4 my-auto font-bold sm:w-34 md:w-72'>List of Orders</p>

            <div className='relative w-full'>
              <div className='absolute right-0 w-34'>
                
                <NavLink to={'/pos/generateorder'}>
                  <Button type='button' size='sm' style={{backgroundColor: '#83D2FF'}} className='inline-flex items-center w-10 h-10 py-1 pl-2 pr-0 my-1 mr-3 text-black rounded hover:bg-blue-400 sm:w-10 md:w-auto md:p-4'>
                    <img alt='' className='object-scale-down w-auto h-6 mr-2 sm:w-auto md:w-6 sm:mr-0 md:mr-2 sm:mx-auto' src={add}/>
                    <p className='invisible text-sm font-semibold md:visible lg:flex sm:invisible'>Add Order</p>
                  </Button>
                </NavLink>

                <Modal title={modal.Title} visible={modal.Visible} onOk={handleOk} onCancel={handleOk} width={400}
                  footer={[
                    <Button key="submit" size='sm' style={{backgroundColor: '#14D89A'}} className="w-20 mr-4 rounded" type="primary" onClick={handleSubmit}>Update</Button>,
                    <Button key="back" size='sm' style={{backgroundColor: '#ED5264'}} className='rounded' onClick={handleOk}>Cancel</Button>,
                  ]}>

                  <div className='flex flex-col'>
                    <div className="flex flex-row">
                      <p className='w-1/2 p-0 m-0 text-sm'>Date: {moment(orderInfo.date).format("YYYY-MM-DD")}</p>
                      <p className='w-1/2 p-0 m-0 text-sm text-right'>Time: {orderInfo.time}</p>
                    </div>
                    <div className='flex flex-row'>
                      <p className='w-1/2 text-left'>Reference Number:</p>
                      <p className='w-1/2 font-semibold text-right'>{orderInfo.referenceNum}</p>
                    </div>
                    <div className='flex flex-row'>
                      <p className='w-1/2 text-left'>Customer Code:</p>
                      <p className='w-1/2 text-right'>{orderInfo.customerCode}</p>
                    </div>
                    <div className='flex flex-row'>
                      <p className='w-1/2 text-left'>Customer Name:</p>
                      <p className='w-1/2 text-right'>{orderInfo.customerName}</p>
                    </div>
                    <div className='flex flex-row'>
                      <p className='w-1/2 text-left'>Total Products:</p>
                      <p className='w-1/2 text-right'>{orderInfo.totalProducts}pc/s.</p>
                    </div>
                    <div className='flex flex-row'>
                      <p className='w-1/2 text-left'>Total Amount:</p>
                      <p className='w-1/2 text-right'>₱{orderInfo.totalAmount}</p>
                    </div>
                    <div className="w-full border-black border-dashed rounded border-b-1"></div>
                    <div className='flex flex-row'>
                      <p className='w-full text-left'>List of Items:</p>
                    </div>
                    {orderItems.map((items) => (
                      <div className='flex flex-row' key={items.itemOrderID}>
                        <p className='w-1/2 text-left'>{items.productName}</p>
                        <p className='w-1/2 text-right'>₱{items.productPrice} x {items.quantity}</p>
                      </div>
                    ))}
                    <div className="w-full border-black border-dashed rounded border-b-1"></div>
                    <div className='mt-4'>
                      <Select className='w-full rounded-sm' placeholder="Select Status" value={status}
                      onChange={(value) => {
                          setStatus(value)
                          setMessage2('');
                          setSelStat('');
                      }} status={selStat}>
                        <Option value="paid">Paid</Option>
                        <Option value="pending">Pending</Option>
                      </Select>
                      <p className='text-red-700'>{message2}</p>
                    </div>
                  </div>
                </Modal>

              </div>
            </div>
          </div>  
          
          <div style={{borderColor: "#747C95"}} className="w-full my-5 border-b-2 rounded "></div>
          
          {/* For search bar */}
          {/* <div className='relative w-full'>
            <div className='absolute right-0 mt-1 mr-2'>
                  <Input style={{ fontSize: '16' }} className='w-full mr-3.5 items-center font-poppins' placeholder='Search...'
                  onChange = {(e) => {setSearchVal(e.target.value)}}
                  value={searchVal}
                  />
            </div>
          </div> */}

          {/* For Table */}
          {/* <div className='m-2 my-auto overflow-auto bg-white rounded'>
            <Table bordered className='mt-14' columns={brandTblGrid} pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '25', '50', '100']}} dataSource={search(oList).filter((data) => data.Status === 'pending')} ></Table>
          </div> */}

          <div className='m-2 my-auto overflow-auto bg-white rounded'>
            <div className='flex flex-auto w-full mb-10 md:mb-0 sm:mb-10'>
              <div className='relative w-full'>
                <div className='absolute right-0 mt-1 mr-4'>
                  <Input style={{ fontSize: '16' }} className='z-20 w-full mr-3.5 items-center font-poppins' placeholder='Search...'
                  onChange = {(e) => {setSearchVal(e.target.value)}}
                  value={searchVal}
                  />
                </div>
              </div>
            </div>
            <Tabs defaultActiveKey="0" className='w-auto'>
              <TabPane tab='Pending' key='0'>
                <div className="flex items-center justify-center w-full overflow-auto min-w-screen">
                  <Table bordered className='w-full' columns={brandTblGrid} pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '25', '50', '100']}} dataSource={search(oList).filter((data) => data.Status === 'pending')} ></Table>
                </div>
              </TabPane>
              <TabPane tab='Paid' key='1'>
                <div className="flex items-center justify-center w-full overflow-auto min-w-screen">
                  <Table bordered className='w-full' columns={brandTblGrid} pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '25', '50', '100']}} dataSource={search(oList).filter((data) => data.Status === 'paid')} ></Table>
                </div>
              </TabPane>
            </Tabs>

          </div>


          {/* MODAL FOR RECEIPT */}
          <Modal title={'Invoice POS'} visible={receiptModalVisible} onOk={handleCloseModal} onCancel={handleCloseModal} width={300} style={{ top: 30 }}
              footer={[
                <Button className='inline-flex items-center w-auto px-3 py-2 mr-2 text-black rounded' style={{backgroundColor: "#46E4AC", borderRadius: 5}} onClick={handleSelectPrinter}>
                  <img className='object-scale-down w-auto h-5 mr-2 md:mr-2 sm:mx-auto' src={print}/>
                  <p className='font-semibold text-black'>Print</p>
                </Button>,
                // <ReactToPrint key='print'
                //   trigger = {() => {
                //     return(
                //       <Button className='inline-flex items-center w-auto px-3 py-2 mr-2 text-black rounded' style={{backgroundColor: "#46E4AC", borderRadius: 5}}>
                //         <img className='object-scale-down w-auto h-5 mr-2 md:mr-2 sm:mx-auto' src={print}/>
                //         <p className='font-semibold text-black'>Print</p>
                //       </Button>
                //     )
                //   }}
                //   onAfterPrint={handleSelectPrinter}
                //   pageStyle={pageStyle}
                //   content={reactToPrintContent}
                // />,
                <Button key="submit" size='sm' style={{backgroundColor: '#ED5264'}} className='inline-flex items-center w-auto my-auto mb-4 text-black rounded' onClick={handleCloseModal}>
                  <img className='invisible object-scale-down h-5'/>
                  <p className='font-semibold text-black'>Cancel</p>
                </Button>,
              ]}>
              <div className='flex flex-col gap-3 p-3' ref={setComponentRef}>
                <div className='flex flex-col w-full'>
                  <div>
                    <p className='w-full mb-2 text-xl font-bold text-center font-poppins'>CoruMed</p>
                  </div>
                  <div>
                    <div className="flex flex-row">
                      <p className='w-1/2 p-0 m-0 text-xs'>Date: {moment(orderInfo.date).format("YYYY-MM-DD")}</p>
                      <p className='w-1/2 p-0 m-0 text-xs text-right'>Time: {orderInfo.time}</p>
                    </div>
                    <p className='w-full p-0 m-0 text-xs'>Address: {companyData.address}</p>
                    <p className='w-full p-0 m-0 my-auto mb-2 text-xs'>Customer: {orderInfo.customerCode}</p>
                  </div>

                  {Array.from(orderItems).map((item) => (
                    <div key={item.itemOrderID} className='flex flex-col gap-0 p-0 m-0'>
                      <p  className='left-0 w-full p-0 m-0 my-auto text-sm'>{item.productName}</p>
                      <div className="flex flex-row m-0">
                        <p  className='left-0 w-1/2 p-0 m-0 text-sm'>{item.quantity}pc/s. x {item.productPrice}</p>
                        <p  className='left-0 w-1/2 p-0 m-0 text-sm text-right'>₱{(item.quantity * item.productPrice)}</p>
                      </div>
                      <div className="items-center justify-center w-full text-center border-black border-dashed rounded border-b-1 place-self-center"></div>
                    </div>
                  ))}

                  {/* <div className="flex flex-row mt-2">
                    <p className='left-0 w-1/2 p-0 m-0 text-xs'>Tax ({orderItems.slice(0, 1).map((item) => item.tax)}%):</p>
                    <p className='left-0 w-1/2 p-0 m-0 text-xs font-semibold text-right'>₱{orderInfo.totalTax}</p>
                  </div>
                  <div className="items-center justify-center w-full text-center border-black border-dashed rounded border-b-1 place-self-center"></div> */}
                  <div className="flex flex-row">
                    <p className='left-0 w-1/2 p-0 m-0 text-xs'>Discount ({orderItems.slice(0, 1).map((item) => item.discount)}%):</p>
                    <p className='left-0 w-1/2 p-0 m-0 text-xs font-semibold text-right'>₱{orderInfo.totalDisc}</p>
                  </div>
                  <div className="items-center justify-center w-full text-center border-black border-dashed rounded border-b-1 place-self-center"></div>
                  <div className="flex flex-row">
                    <p className='left-0 w-1/2 p-0 m-0 text-sm font-semibold'>Grand Total:</p>
                    <p className='left-0 w-1/2 p-0 m-0 text-sm font-bold text-right'>₱{orderInfo.totalAmount}</p>
                  </div>
                  <div className="items-center justify-center w-full text-center border-black border-dashed rounded border-b-1 place-self-center"></div>
                  <div>  
                    <div className="flex flex-row mt-2 bg-blue-gray-50">
                      <p className='left-0 w-1/2 p-0 m-0 text-xs text-left'>Paid By:</p>
                      <p className='left-0 w-1/2 p-0 m-0 text-xs text-center'>Amount:</p>
                      <p className='left-0 w-1/2 p-0 m-0 text-xs text-right'>Change:</p>
                    </div>
                    <div className="flex flex-row">
                      <p className='left-0 w-1/2 p-0 m-0 text-xs font-semibold'>{paymentInfo.paymentMode || 'N/A'}</p>
                      <p className='left-0 w-1/2 p-0 m-0 text-xs font-semibold text-center'>₱{orderInfo.totalAmount}</p>
                      <p className='left-0 w-1/2 p-0 m-0 text-xs font-semibold text-right'>₱{paymentInfo.totalChange || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="items-center justify-center w-full text-center border-black border-dashed rounded border-b-1 place-self-center"></div>
                  <div className="flex flex-col items-center justify-center">
                    <p className='w-full p-0 m-0 my-3 text-base font-semibold text-center'>Thank You. Please Come Again.</p>
                    <p className='w-full p-0 m-0 text-base text-center'>Reference #:</p>
                    <p className='w-full p-0 m-0 text-base text-center'>{orderInfo.referenceNum}</p>
                    {/* <Barcode width={1.3} height={40} fontSize={15} textAlign='center' value={orderInfo.referenceNum}/> */}
                  </div>

                </div>
              </div>
            </Modal>

        </div>
    </div>
  )
}

export default Orders