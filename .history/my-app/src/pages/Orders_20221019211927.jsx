import React, { useEffect, useState } from 'react';
import add from '../Images/add.png';
import edit from '../Images/edit.png';
import print from '../Images/print.png';
import { Header } from '../components';
import { NavLink } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import { Modal, Select, notification, Space, Table, Input } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import Axios from "axios";
import moment from 'moment';
import Barcode from 'react-barcode/lib/react-barcode';
import ReactToPrint from 'react-to-print';

const { Option } = Select;

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
    Axios.get(`http://localhost:3001/api/company/get`).then((resp)=>{
      setCompanyData({
        address: resp.data.address,
        email: resp.data.email,
        contact: resp.data.contact,
      });
    });
  }

  useEffect(() => {
    fetchCompanyProfile();
    Axios.get("http://localhost:3001/api/order/get", {signal: abortController.signal}).then((response)=>{
      setOrderList(response.data);
      setCount(() => count * 0)
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
      Axios.put(`http://localhost:3001/api/order/update/${orderID}`, {
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
    Axios.get(`http://localhost:3001/api/order/get/${orderid}`).then((resp)=>{
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
    Axios.get(`http://localhost:3001/api/payment/get/${refNum}`).then((resp)=>{
      setPaymentInfo({
        totalChange: resp.data.totalChange,
        totalAmountPaid: resp.data.amountPaid,
        paymentMode: resp.data.paymentMode,
      });
    });

    setCount(() => count + 1);
  }

  const handleRetrieveOrderItems = (refNumber) => {
    
    Axios.get(`http://localhost:3001/api/orderitem/get/${refNumber}`).then((resp)=>{
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

  const handleAfterPrint = () => {

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
            <Button style={{backgroundColor: '#83D2FF'}} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto -mr-3 w-10 sm:w-10 md:w-10 md:p-3 md:pl-3 sm:pr-2.5' onClick={()=> {
                btnType = 'edit';
                showDataToModal(record.OrderID);
            }}>
              <img alt='Not Available' className='w-auto h-5 sm:w-auto md:w-10 md:h-5 mr-2 sm:mr-0 md:mr-2 sm:mx-auto object-scale-down' src={edit}/>
            </Button>

            {/* For Print */}
            <Button style={{backgroundColor: "#46E4AC", marginLeft: 12}} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto w-10 sm:w-10 md:w-10 md:p-3 md:pl-3 sm:pr-2.5' onClick={() => {
                btnType = 'print';
                showDataToModal(record.OrderID);
            }}>
              <img alt='Not Available' className='w-auto h-5 sm:w-auto md:w-5 mr-2 sm:mr-0 md:mr-2 sm:mx-auto object-scale-down' src={print}/>
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

    <div className='md:m-10 mt-20 mx-8'>
      <Header title='Orders'/>

        <div className='m-2 md:m-10 p-2 md:px-10 pb-5 bg-white rounded-xl shadow-md'>

          <div className='flex w-full h-12 mt-2'>
            <p className='my-auto w-auto sm:w-34 md:w-72 px-4 font-bold'>List of Orders</p>

            <div className='relative w-full'>
              <div className='absolute right-0 w-34'>
                
                <NavLink to={'/pos/generateorder'}>
                  <Button type='button' size='sm' style={{backgroundColor: '#83D2FF'}} className='hover:bg-blue-400 text-black py-1 pl-2 pr-0 h-10 rounded inline-flex items-center my-1 mr-3 w-10 sm:w-10 md:w-auto md:p-4'>
                    <img alt='' className='w-auto h-6 sm:w-auto md:w-6 mr-2 sm:mr-0 md:mr-2 sm:mx-auto object-scale-down' src={add}/>
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
                      <p className='text-left w-1/2'>Reference Number:</p>
                      <p className='text-right w-1/2 font-semibold'>{orderInfo.referenceNum}</p>
                    </div>
                    <div className='flex flex-row'>
                      <p className='text-left w-1/2'>Customer Code:</p>
                      <p className='text-right w-1/2'>{orderInfo.customerCode}</p>
                    </div>
                    <div className='flex flex-row'>
                      <p className='text-left w-1/2'>Customer Name:</p>
                      <p className='text-right w-1/2'>{orderInfo.customerName}</p>
                    </div>
                    <div className='flex flex-row'>
                      <p className='text-left w-1/2'>Total Products:</p>
                      <p className='text-right w-1/2'>{orderInfo.totalProducts}pc/s.</p>
                    </div>
                    <div className='flex flex-row'>
                      <p className='text-left w-1/2'>Total Amount:</p>
                      <p className='text-right w-1/2'>₱{orderInfo.totalAmount}</p>
                    </div>
                    <div className="border-black w-full border-b-1 border-dashed rounded"></div>
                    <div className='flex flex-row'>
                      <p className='text-left w-full'>List of Items:</p>
                    </div>
                    {orderItems.map((items) => (
                      <div className='flex flex-row' key={items.itemOrderID}>
                        <p className='text-left w-1/2'>{items.productName}</p>
                        <p className='text-right w-1/2'>₱{items.productPrice} x {items.quantity}</p>
                      </div>
                    ))}
                    <div className="border-black w-full border-b-1 border-dashed rounded"></div>
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
          
          <div style={{borderColor: "#747C95"}} className=" w-full my-5 border-b-2 rounded"></div>
          
          {/* For search bar */}
          <div className='relative w-full'>
            <div className='absolute right-0 mt-1 mr-2'>
                  <Input style={{ fontSize: '16' }} className='w-full mr-3.5 items-center font-poppins' placeholder='Search...'
                  onChange = {(e) => {setSearchVal(e.target.value)}}
                  value={searchVal}
                  />
            </div>
          </div>

          {/* For Table */}
          <div className='m-2 my-auto bg-white rounded overflow-auto'>
            <Table bordered className='mt-14' columns={brandTblGrid} pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '25', '50', '100']}} dataSource={search(oList)} ></Table>
          </div>


          {/* MODAL FOR RECEIPT */}
          <Modal title={'Invoice POS'} visible={receiptModalVisible} onOk={handleCloseModal} onCancel={handleCloseModal} width={300} style={{ top: 30 }}
              footer={[
                <ReactToPrint key='print'
                  trigger = {() => {
                    return(
                      <Button className='text-black rounded inline-flex items-center w-auto py-2 px-3 mr-2' style={{backgroundColor: "#46E4AC", borderRadius: 5}}>
                        <img className='w-auto h-5 mr-2 md:mr-2 sm:mx-auto object-scale-down' src={print}/>
                        <p className='text-black font-semibold'>Print</p>
                      </Button>
                    )
                  }}
                  onAfterPrint={handleAfterPrint}
                  pageStyle={pageStyle}
                  content={reactToPrintContent}
                />,
                <Button key="submit" size='sm' style={{backgroundColor: '#ED5264'}} className='text-black mb-4 rounded inline-flex items-center my-auto w-auto' onClick={handleCloseModal}>
                  <img className='invisible h-5 object-scale-down'/>
                  <p className='text-black font-semibold'>Cancel</p>
                </Button>,
              ]}>
              <div className='flex flex-col gap-3 p-3' ref={setComponentRef}>
                <div className='flex flex-col w-full'>
                  <div>
                    <p className='w-full font-bold font-poppins mb-2 text-xl text-center'>CoruMed</p>
                  </div>
                  <div>
                    <div className="flex flex-row">
                      <p className='w-1/2 p-0 m-0 text-xs'>Date: {moment(orderInfo.date).format("YYYY-MM-DD")}</p>
                      <p className='w-1/2 p-0 m-0 text-xs text-right'>Time: {orderInfo.time}</p>
                    </div>
                    <p className='w-full p-0 m-0 text-xs'>Address: {companyData.address}</p>
                    <p className='w-full p-0 m-0 text-xs'>Email: {companyData.email}</p>
                    <p className='w-full p-0 m-0 text-xs'>Contact: {companyData.contact}</p>
                    <p className='my-auto w-full p-0 m-0 text-xs mb-2'>Customer: {orderInfo.customerCode}</p>
                  </div>

                  {Array.from(orderItems).map((item) => (
                    <div key={item.itemOrderID} className='flex flex-col gap-0 m-0 p-0'>
                      <p  className='my-auto w-full left-0 p-0 m-0 text-sm'>{item.productName}</p>
                      <div className="flex flex-row m-0">
                        <p  className='w-1/2 left-0 p-0 m-0 text-sm'>{item.quantity}pc/s. x {item.productPrice}</p>
                        <p  className='w-1/2 text-right left-0 p-0 m-0 text-sm'>₱{(item.quantity * item.productPrice)}</p>
                      </div>
                      <div className="border-black w-full border-b-1 border-dashed rounded text-center place-self-center items-center justify-center"></div>
                    </div>
                  ))}

                  <div className="flex flex-row mt-2">
                    <p className='w-1/2 left-0 p-0 m-0 text-xs'>Tax ({orderItems.slice(0, 1).map((item) => item.tax)}%):</p>
                    <p className='w-1/2 text-right left-0 p-0 m-0 text-xs font-semibold'>₱{orderInfo.totalTax}</p>
                  </div>
                  <div className="border-black w-full border-b-1 border-dashed rounded text-center place-self-center items-center justify-center"></div>
                  <div className="flex flex-row">
                    <p className='w-1/2 left-0 p-0 m-0 text-xs'>Discount ({orderItems.slice(0, 1).map((item) => item.discount)}%):</p>
                    <p className='w-1/2 text-right left-0 p-0 m-0 text-xs font-semibold'>₱{orderInfo.totalDisc}</p>
                  </div>
                  <div className="border-black w-full border-b-1 border-dashed rounded text-center place-self-center items-center justify-center"></div>
                  <div className="flex flex-row">
                    <p className='w-1/2 left-0 p-0 m-0 text-sm font-semibold'>Grand Total:</p>
                    <p className='w-1/2 text-right left-0 p-0 m-0 text-sm font-bold'>₱{orderInfo.totalAmount}</p>
                  </div>
                  <div className="border-black w-full border-b-1 border-dashed rounded text-center place-self-center items-center justify-center"></div>
                  <div>  
                    <div className="flex flex-row mt-2 bg-blue-gray-50">
                      <p className='w-1/2 left-0 p-0 m-0 text-xs text-left'>Paid By:</p>
                      <p className='w-1/2 left-0 p-0 m-0 text-xs text-center'>Amount:</p>
                      <p className='w-1/2 left-0 p-0 m-0 text-xs text-right'>Change:</p>
                    </div>
                    <div className="flex flex-row">
                      <p className='w-1/2 left-0 p-0 m-0 text-xs font-semibold'>{paymentInfo.paymentMode || 'N/A'}</p>
                      <p className='w-1/2 left-0 p-0 m-0 text-xs font-semibold text-center'>₱{orderInfo.totalAmount}</p>
                      <p className='w-1/2 left-0 p-0 m-0 text-xs font-semibold text-right'>₱{paymentInfo.totalChange || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="border-black w-full border-b-1 border-dashed rounded text-center place-self-center items-center justify-center"></div>
                  <div className="flex flex-col justify-center items-center">
                    <p className='w-full p-0 m-0 text-base text-center font-semibold my-3'>Thank You. Please Come Again.</p>
                    <Barcode width={1.3} height={40} fontSize={15} textAlign='center' value={orderInfo.referenceNum}/>
                  </div>

                </div>
              </div>
            </Modal>

        </div>
    </div>
  )
}

export default Orders