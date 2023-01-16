import React, { useEffect, useState, useRef } from 'react';
import add from '../Images/add.png';
import edit from '../Images/edit.png';
import print from '../Images/print.png';
import archive from '../Images/archive.png';
import view from '../Images/view.png';
import { Header } from '../components';
import { NavLink } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import { Modal, Input, Select, notification, Space, Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import Axios from "axios";
import moment from 'moment';
import mainApi from '../contexts/Api';

const { Option } = Select;

const openNotif = (type) => {
  if(type === 'success'){
    notification[type]({
      message: 'SUCCESS!',
      description: 'Payment Added Successfully.',
      duration: 4,
      style: {borderRadius: '5px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'},
    });
  }else if(type === 'warning'){
    notification[type]({
      message: 'SUCCESS!',
      description: 'Payment Removed Successfully.',
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
      description: 'Payment Updated Successfully.',
      duration: 4,
      style: {borderRadius: '5px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'},
    });
  }
  
};

const Payments = () => {

  const [count, setCount] = useState(0);
  const resetSelect = useRef();
  const [message, setMessage] = useState('');
  const [message2, setMessage2] = useState('');
  const [inpStat, setInpStat] = useState('');
  const [selStat, setSelStat] = useState('');
  const [status, setStatus] = useState('Select Status');
  const [paymentList, setPaymentList] = useState([]);
  const [payID, setPayID] = useState('');
  const [searchVal, setSearchVal] = useState('');

  const abortController = new AbortController();

  //For Search
  const search = (data) => {
    return data.filter((item) =>
      item.CustName.toLowerCase().includes(searchVal) ||
      item.ReferenceNumber.toString().toLowerCase().includes(searchVal) ||
      item.paymentMode.toLowerCase().includes(searchVal) ||
      item.amountPaid.toString().toLowerCase().includes(searchVal) ||
      item.totalChange.toString().toLowerCase().includes(searchVal) ||
      moment(item.Date).format("YYYY-MM-DD").toString().toLowerCase().includes(searchVal) ||
      item.Time.toString().toLowerCase().includes(searchVal) ||
      item.paymentStatus.toLowerCase().includes(searchVal)
    )
  }

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
    setStatus('Select Status');
  };
  
  //For Edit Modal
  const showUpdateModal = () => {
    setBtnType('Update');
    setModal({Title: 'Update Order', Visible: true});
  };

  //pag load ng page at show ng data sa table
  useEffect(() => {
    Axios.get(`http://localhost:3001/api/payment/get`, {signal: abortController.signal}).then((response)=>{
      setPaymentList(response.data);
      setCount(() => count * 0)
    });
    
    return () => {  
      abortController.abort();
    }
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
      // Axios.put(`http://localhost:3001/api/brand/update/${bID}`, {
      //   BrandName: brandName,
      //   Status: status
      // }).then(() => {
      //   console.log('Data updated successfully');
      // }).catch((err) => {
      //   alert(err.response.data);
      // });

      // openNotif('info');
      // handleOk();
      // setCount(() => count + 1);
    }
  };


  //pag show ng data para sa update
  const showDataToModal = (brandID) => {
    Axios.get(`http://localhost:3001/api/brand/get/${brandID}`).then((resp)=>{
        // setStatus(resp.data.Status);
        // setBID(brandID);
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
        title: 'Customer Name',
        dataIndex: 'CustName',
        align: 'center',
        sorter: (a, b) => a.CustName.localeCompare(b.CustName),
        sortDirections: ['descend', 'ascend'],
        render: (text, record) => {
          return <p style={{textTransform: 'capitalize'}}>{text}</p>
        }
      },
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
        title: 'Mode of Payment',
        dataIndex: 'paymentMode',
        align: 'center',
        sorter: (a, b) => a.paymentMode.localeCompare(b.paymentMode),
        render: (text, record) => {
          return <p style={{textTransform: 'capitalize'}}>{text}</p>
        }
      },
      {
        title: 'Amount Paid',
        dataIndex: 'amountPaid',
        align: 'center',
        sorter: {
          compare: (a, b) => a.amountPaid - b.amountPaid,
        },
        render: (text, record) => {
          return <p style={{textTransform: 'capitalize'}}>₱{(text).toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
        }
      },
      {
        title: 'Total Change',
        dataIndex: 'totalChange',
        align: 'center',
        sorter: {
          compare: (a, b) => a.totalChange - b.totalChange,
        },
        render: (text, record) => {
          return <p style={{textTransform: 'capitalize'}}>₱{(text).toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
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
        dataIndex: 'paymentStatus',
        align: 'center',
        sorter: (a, b) => a.paymentStatus.localeCompare(b.paymentStatus),
        render: (text, record) => {
          return <p style={{color: record.paymentStatus === 'paid' ? 'green': '#8A8A8A', textTransform: 'capitalize'}}>{text}</p>
        }
      },
      // {
      //   key: 'paymentID',
      //   dataIndex: 'paymentID',
      //   title: 'Actions',
      //   align: 'center',
      //   width: '120px',
      //   render:(_,record) =>
      //     <Space align='end'>
      //       {/* For Update */}
      //       <Button style={{backgroundColor: '#83D2FF'}} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto w-10 sm:w-10 md:w-10 md:p-3 md:pl-3 sm:pr-2.5'>
      //         <img className='w-auto h-5 sm:w-auto md:w-10 md:h-5 mr-2 sm:mr-0 sm:mx-auto object-scale-down' src={edit}/>
      //       </Button>

      //       {/* For View */}
      //       <Button style={{backgroundColor: '#46E4AC'}} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto -mr-3 w-10 sm:w-10 md:w-10 md:p-0 sm:pr-2.5' onClick={()=> {
      //           // showDataToModal(record.OrderID);
      //       }}>
      //         <img className='w-auto h-5 sm:w-auto md:w-10 md:h-5 mr-2 sm:mr-0 md:mx-auto sm:mx-auto object-scale-down' src={view}/>
      //       </Button>

      //       {/* For Archive */}
      //       <Button style={{backgroundColor: "#ED5264", marginLeft: 12}} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto w-10 sm:w-10 md:w-10 md:p-0 sm:pr-2.5' onClick={() => {
      //           // removeBrand(record.BrandID);
      //       }}>
      //         <img className='w-auto h-5 sm:w-auto md:w-5 mr-2 sm:mr-0 md:mx-auto sm:mx-auto object-scale-down' src={archive}/>
      //       </Button>
      //     </Space>
      // },
    ];

    // post the data from db to the table
    const payList = paymentList.map(({body,...item}) => ({
      ...item,
      key: item.paymentID,
      message: body,
    }))

  return (
    <div className='md:m-10 mt-20 mx-8'>
      <Header title='Payments'/>

        <div className='m-2 md:m-10 p-2 md:px-10 pb-5 bg-white rounded-xl shadow-md'>

          <div className='flex w-full h-12 mt-2'>
            <p className='my-auto w-auto sm:w-34 md:w-72 px-4 font-bold'>List of Payments</p>

            {/* <div className='relative w-full'>
              <div className='absolute right-0 w-34'>
                
                <NavLink to={'/GenerateOrder'}>
                  <Button type='button' size='sm' style={{backgroundColor: '#83D2FF'}} className='hover:bg-blue-400 text-black py-1 pl-2 pr-0 h-10 rounded inline-flex items-center my-1 mr-3 w-10 sm:w-10 md:w-auto md:p-4'>
                    <img alt='' className='w-auto h-6 sm:w-auto md:w-6 mr-2 sm:mr-0 md:mr-2 sm:mx-auto object-scale-down' src={add}/>
                    <p className='invisible text-sm font-semibold md:visible lg:flex sm:invisible'>Add Order</p>
                  </Button>
                </NavLink>

              </div>
            </div> */}
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
            <Table bordered className='mt-14' columns={brandTblGrid} pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '25', '50', '100']}} dataSource={search(payList)}></Table>
          </div>

        </div>
    </div>
  )
}

export default Payments