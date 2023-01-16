import React, { useEffect, useState, useRef } from 'react';
import add from '../Images/add.png';
import edit from '../Images/edit.png';
import print from '../Images/print.png';
import { Header } from '../components';
import { NavLink } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import { Modal, Select, notification, Space, Table, Input, Tabs } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import Axios from "axios";
import { FiEdit3 } from 'react-icons/fi';
import { BiArchiveIn } from 'react-icons/bi';
import moment from 'moment';

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

  const [count, setCount] = useState(0);
  const resetSelect = useRef();
  const [message, setMessage] = useState('');
  const [message2, setMessage2] = useState('');
  const [inpStat, setInpStat] = useState('');
  const [selStat, setSelStat] = useState('');
  const [status, setStatus] = useState('Select Status');
  const [orderList, setOrderList] = useState([]);
  const [orderID, setOrderID] = useState('');

  //For Search

  //For Modal
  const [modal, setModal] = useState({Title: '', Visible: false, });
  const [btnType, setBtnType] = useState('');
  
  //For Add Modal
  const showAddModal = () => {
    setBtnType('Add');
    setModal({Title: 'Add Order', Visible: true});
  };
  
  const handleOk = () => {
    setModal({Visible: false});
    setMessage('');
    setMessage2('');
    setInpStat('');
    setSelStat('');
    // setbrandName('');
    setStatus('Select Status');
  };
  
  //For Edit Modal
  const showUpdateModal = () => {
    setBtnType('Update');
    setModal({Title: 'Update Order', Visible: true});
  };

  //pag load ng page at show ng data sa table
  useEffect(() => {
    Axios.get("http://localhost:3001/api/order/get").then((response)=>{
      setOrderList(response.data);
      setCount(() => count * 0)
    });
  }, [count]);


  //pag add and update ng data
  const handleSubmit = () => {
    if(btnType === 'Add'){
      // if(brandName.trim().length === 0){
      //   setMessage('Please enter brand!');
      //   setInpStat('error');
      // }
      // else if(status === "Select Status"){
      //   setMessage2('Please choose status!');
      //   setSelStat('error');
      // }
      // else{
      //   Axios.post('http://localhost:3001/api/brand/insert', {
      //     BrandName: brandName,
      //     Status: status
      //   }).then(() => {
      //     console.log('Data updated successfully');
      //   }).catch((err) => {
      //     alert(err.response.data);
      //   });
  
      //   openNotif('success');
      //   handleOk();
      //   setCount(() => count + 1);
      // }
    }else if(btnType === 'Update'){

      //code for update
      Axios.put(`http://localhost:3001/api/brand/update/${orderID}`, {
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
    Axios.get(`http://localhost:3001/api/brand/get/${orderid}`).then((resp)=>{
        setStatus(resp.data.Status);
        setOrderID(orderid);
      });
      setCount(() => count + 1)
      showUpdateModal();
  }

  //pag remove ng brand
  const removeBrand = (brandID) => {
    if(window.confirm('Are you sure that you wanted to delete this brand?')){
      Axios.delete(`http://localhost:3001/api/brand/remove/${brandID}`);
      openNotif('warning');
      setCount(() => count + 1)
    }
  }

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
        defaultSortOrder: 'descend',
        align: 'center',
        // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
        sortDirections: ['descend', 'ascend'],
        render: (text, record) => {
          return <p style={{textTransform: 'capitalize'}}>{text}</p>
        }
      },
      {
        title: 'Customer Name',
        dataIndex: 'CustName',
        defaultSortOrder: 'descend',
        align: 'center',
        // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
        sortDirections: ['descend', 'ascend'],
        render: (text, record) => {
          return <p style={{textTransform: 'capitalize'}}>{text}</p>
        }
      },
      {
        title: 'Total Products',
        dataIndex: 'TotalProducts',
        defaultSortOrder: 'descend',
        align: 'center',
        // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
        sortDirections: ['descend', 'ascend'],
        render: (text, record) => {
          return <p style={{textTransform: 'capitalize'}}>{text}</p>
        }
      },
      {
        title: 'Total Amount',
        dataIndex: 'TotalAmount',
        defaultSortOrder: 'descend',
        align: 'center',
        // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
        sortDirections: ['descend', 'ascend'],
        render: (text, record) => {
          return <p style={{textTransform: 'capitalize'}}>₱{text}</p>
        }
      },
      {
        title: 'Date',
        dataIndex: 'Date',
        align: 'center',
        defaultSortOrder: 'descend',
        // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
        sortDirections: ['descend', 'ascend'],
        render: (text, record) => {
          return <p style={{textTransform: 'capitalize'}}>{moment(text).format("YYYY-MM-DD")}</p>
        }
      },
      {
        title: 'Time',
        dataIndex: 'Time',
        align: 'center',
        defaultSortOrder: 'descend',
        // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
        sortDirections: ['descend', 'ascend'],
        render: (text, record) => {
          return <p style={{textTransform: 'capitalize'}}>{text}</p>
        }
      },
      {
        title: 'Status',
        dataIndex: 'Status',
        defaultSortOrder: 'descend',
        // sorter: (a, b) => a.status.localeCompare(b.status),
        sortDirections: ['descend', 'ascend'],
        render: (text, record) => {
          return <p style={{color: record.Status === 'paid'  ? 'green': 'red', textTransform: 'capitalize'}}>{text}</p>
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
                // showDataToModal(record.OrderID);
            }}>
              <img className='w-auto h-5 sm:w-auto md:w-10 md:h-5 mr-2 sm:mr-0 md:mr-2 sm:mx-auto object-scale-down' src={edit}/>
            </Button>

            {/* For Print */}
            <Button style={{backgroundColor: "#46E4AC", marginLeft: 12}} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto w-10 sm:w-10 md:w-10 md:p-3 md:pl-3 sm:pr-2.5' onClick={() => {
                // removeBrand(record.BrandID);
            }}>
              <img className='w-auto h-5 sm:w-auto md:w-5 mr-2 sm:mr-0 md:mr-2 sm:mx-auto object-scale-down' src={print}/>
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


    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
      console.log('params', pagination, filters, sorter, extra);
    };


  return (

    <div className='md:m-10 mt-20 mx-8'>
      <Header title='Orders'/>

        <div className='m-2 md:m-10 p-2 md:px-10 pb-5 bg-white rounded-xl shadow-md'>

          <div className='flex w-full h-12 mt-2'>
            <p className='my-auto w-auto sm:w-34 md:w-72 px-4 font-bold'>List of Orders</p>

            <div className='relative w-full'>
              <div className='absolute right-0 w-34'>
                
                <NavLink to={'/GenerateOrder'}>
                  <Button type='button' size='sm' style={{backgroundColor: '#83D2FF'}} className='hover:bg-blue-400 text-black py-1 pl-2 pr-0 h-10 rounded inline-flex items-center my-1 mr-3 w-10 sm:w-10 md:w-auto md:p-4'>
                    <img alt='' className='w-auto h-6 sm:w-auto md:w-6 mr-2 sm:mr-0 md:mr-2 sm:mx-auto object-scale-down' src={add}/>
                    <p className='invisible text-sm font-semibold md:visible lg:flex sm:invisible'>Add Order</p>
                  </Button>
                </NavLink>

                <Modal title={modal.Title} visible={modal.Visible} onOk={handleOk} onCancel={handleOk}
                  footer={[
                    <Button key="submit" size='sm' style={{backgroundColor: '#14D89A'}} className="w-20 mr-4 rounded" type="primary" onClick={handleSubmit}>{btnType}</Button>,
                    <Button key="back" size='sm' style={{backgroundColor: '#ED5264'}} className='rounded' onClick={handleOk}>Cancel</Button>,
                  ]}>

                  <div className='flex flex-col gap-4'>
                    <div>
                      <p className='text-red-700'>{message}</p>
                      <Input className='rounded-sm' value={''} placeholder="Brand Name"
                        onChange={(e) => {
                            setMessage('');
                            setInpStat('');
                        }} status={inpStat}/>
                    </div>
                    <div>
                      <p className='text-red-700'>{message2}</p>
                      <Select className='w-full rounded-sm' placeholder="Select Status" value={status}
                      onChange={(value) => {
                          setStatus(value)
                          setMessage2('');
                          setSelStat('');
                      }} status={selStat} ref={resetSelect}>
                        <Option value="active">Active</Option>
                        <Option value="inactive">Inactive</Option>
                      </Select>
                    </div>
                  </div>
                </Modal>

              </div>
            </div>
          </div>  
          
          <div style={{borderColor: "#747C95"}} className=" w-full my-5 border-b-2 rounded"></div>
          
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
          {/* <div className='m-2 my-auto bg-white rounded overflow-auto'>
            <Table bordered className='mt-14' columns={brandTblGrid} pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '25', '50', '100']}} dataSource={search(oList).filter((data) => data.Status === 'pending')} ></Table>
          </div> */}

          <div className='m-2 my-auto bg-white rounded overflow-auto'>
            <div className='flex flex-auto w-full mb-10 md:mb-0 sm:mb-10'>
              <div className='relative w-full'>
                <div className='absolute right-0 mr-4 mt-1'>
                  <Input style={{ fontSize: '16' }} className='z-20 w-full mr-3.5 items-center font-poppins' placeholder='Search...'
                  onChange = {(e) => {setSearchVal(e.target.value)}}
                  value={searchVal}
                  />
                </div>
              </div>
            </div>
            <Tabs defaultActiveKey="0" className='w-auto'>
              <TabPane tab='Pending' key='0'>
                <div className="flex w-full min-w-screen overflow-auto justify-center items-center">
                  <Table bordered className='w-full' columns={brandTblGrid} pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '25', '50', '100']}} dataSource={search(oList).filter((data) => data.Status === 'pending')} ></Table>
                </div>
              </TabPane>
              <TabPane tab='Paid' key='1'>
                <div className="flex w-full min-w-screen overflow-auto justify-center items-center">
                  <Table bordered className='w-full' columns={brandTblGrid} pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '25', '50', '100']}} dataSource={search(oList).filter((data) => data.Status === 'paid')} ></Table>
                </div>
              </TabPane>
            </Tabs>

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

                  {/* <div className="flex flex-row mt-2">
                    <p className='w-1/2 left-0 p-0 m-0 text-xs'>Tax ({orderItems.slice(0, 1).map((item) => item.tax)}%):</p>
                    <p className='w-1/2 text-right left-0 p-0 m-0 text-xs font-semibold'>₱{orderInfo.totalTax}</p>
                  </div>
                  <div className="border-black w-full border-b-1 border-dashed rounded text-center place-self-center items-center justify-center"></div> */}
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