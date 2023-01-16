import React, { useEffect, useState, useRef } from 'react';
// import { useParams } from 'react-router-dom';
import add from '../Images/add.png';
import edit from '../Images/edit.png';
import print from '../Images/print.png';
import archive from '../Images/archive.png';
import view from '../Images/view.png';
//for data
import { Header } from '../components';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import { Modal, Input, Select, notification, Space, Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
//for database
import Axios from "axios";
import { FiEdit3 } from 'react-icons/fi';
import { BiArchiveIn } from 'react-icons/bi';
import mainApi from '../contexts/Api';

const { Option } = Select;

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

const CustomerAccount = () => {

  const [count, setCount] = useState(0);
  const resetSelect = useRef();
  const [message, setMessage] = useState('');
  const [message2, setMessage2] = useState('');
  const [inpStat, setInpStat] = useState('');
  const [selStat, setSelStat] = useState('');
  const [brandName, setbrandName] = useState('');
  const [status, setStatus] = useState('Select Status');
  const [customerList, setCustomerList] = useState([]);
  const [bID, setBID] = useState('');
  const [searchVal, setSearchVal] = useState('');
  const navigate = useNavigate();

  //For Search
  const search = (data) => {
    return data.filter((item) =>
      item.CustCode.toString().toLowerCase().includes(searchVal.toLowerCase()) ||
      item.CustName.toLowerCase().includes(searchVal.toLowerCase()) ||
      item.Contact.toString().toLowerCase().includes(searchVal.toLowerCase()) ||
      item.Address.toLowerCase().includes(searchVal.toLowerCase()) ||
      item.Email.toString().toLowerCase().includes(searchVal.toLowerCase()) ||
      item.Status.toLowerCase().includes(searchVal.toLowerCase())
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
    setbrandName('');
    setStatus('Select Status');
  };
  
  //For Edit Modal
  const showUpdateModal = () => {
    setBtnType('Update');
    setModal({Title: 'Update Order', Visible: true});
  };

  //pag load ng page at show ng data sa table
  let abortController = new AbortController();
  useEffect(() => {
    fetchVerify();
    fetchCustomerList();
    return () => {  
      abortController.abort();  
    }

  }, []);

  const fetchVerify= async () => {
    await Axios.get(`${mainApi}/api/reports/get/verify`, {signal: abortController.signal}).then((response)=>{
     
    }).catch((err)=>{
      if (err.response.status===403){
        console.log("error");
        navigate('/NotAuthorizedPage')
      }
      
    });
  
  
  console.log("verify");
  }
  const fetchCustomerList = async () => {
    const { data } = await Axios.get(`${mainApi}/api/customer/account/get`, {signal: abortController.signal}).catch((err)=>{
      if (err.response.status===403){
        navigate('/NotAuthorizedPage')
      }
      
    });
    setCustomerList(data);
  }

  //pag show ng data para sa update
  const showDataToModal = (brandID) => {
    Axios.get(`${mainApi}/api/brand/get/${brandID}`).then((resp)=>{
        setbrandName(resp.data.Brand_Name);
        setStatus(resp.data.Status);
        setBID(brandID);
      });
      setCount(() => count + 1)
      showUpdateModal();
  }

  //pag remove ng brand
  const removeBrand = (brandID) => {
    if(window.confirm('Are you sure that you wanted to delete this brand?')){
      Axios.delete(`${mainApi}/api/brand/remove/${brandID}`);
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

    const customerGrid: ColumnsType<DataType> = [
      {
        title: 'Customer Code',
        dataIndex: 'CustCode',
        align: 'center',
        sorter: (a, b) => a.CustCode.localeCompare(b.CustCode),
        sortDirections: ['descend', 'ascend'],
        render: (text, record) => {
          return <p style={{textTransform: 'capitalize'}}>{text}</p>
        }
      },
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
        title: 'Contact',
        dataIndex: 'Contact',
        align: 'center',
        sorter: (a, b) => a.Contact.localeCompare(b.Contact),
        sortDirections: ['descend', 'ascend'],
        render: (text, record) => {
          return <p style={{textTransform: 'capitalize'}}>{text}</p>
        }
      },
      {
        title: 'Address',
        dataIndex: 'Address',
        align: 'center',
        sorter: (a, b) => a.Address.localeCompare(b.Address),
        sortDirections: ['descend', 'ascend'],
        render: (text, record) => {
          return <p style={{textTransform: 'capitalize'}}>{text}</p>
        }
      },
      {
        title: 'Email',
        dataIndex: 'Email',
        align: 'center',
        sorter: (a, b) => a.Email.localeCompare(b.Email),
        sortDirections: ['descend', 'ascend'],
        render: (text, record) => {
          return <p>{text}</p>
        }
      },
      {
        title: 'Status',
        dataIndex: 'Status',
        align: 'center',
        sorter: (a, b) => a.Status.localeCompare(b.Status),
        sortDirections: ['descend', 'ascend'],
        render: (text, record) => {
          return <p style={{color: record.Status === 'active' ? 'green': 'red', textTransform: 'capitalize'}}>{text}</p>
        }

      },
      // {
      //   key: 'CustID',
      //   dataIndex: 'CustID',
      //   title: 'Actions',
      //   align: 'center',
      //   width: '120px',
      //   render:(_,record) =>
      //     <Space align='end'>
      //       {/* For Update */}
      //       <Button style={{backgroundColor: '#83D2FF'}} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto w-10 sm:w-10 md:w-10 md:p-3 md:pl-3 sm:pr-2.5'>
      //         <img className='object-scale-down w-auto h-5 mr-2 sm:w-auto md:w-10 md:h-5 sm:mr-0 sm:mx-auto' src={edit}/>
      //       </Button>

      //       {/* For View */}
      //       <Button style={{backgroundColor: '#46E4AC'}} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto -mr-3 w-10 sm:w-10 md:w-10 md:p-0 sm:pr-2.5' onClick={()=> {
      //           // showDataToModal(record.OrderID);
      //       }}>
      //         <img className='object-scale-down w-auto h-5 mr-2 sm:w-auto md:w-10 md:h-5 sm:mr-0 md:mx-auto sm:mx-auto' src={view}/>
      //       </Button>

      //       {/* For Archive */}
      //       <Button style={{backgroundColor: "#ED5264", marginLeft: 12}} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto w-10 sm:w-10 md:w-10 md:p-0 sm:pr-2.5' onClick={() => {
      //           // removeBrand(record.BrandID);
      //       }}>
      //         <img className='object-scale-down w-auto h-5 mr-2 sm:w-auto md:w-5 sm:mr-0 md:mx-auto sm:mx-auto' src={archive}/>
      //       </Button>
      //     </Space>
      // },
    ];

    // post the data from db to the table
    const cList = customerList.map(({body,...item}) => ({
      ...item,
      key: item.CustID,
      message: body,
    }))


    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
      console.log('params', pagination, filters, sorter, extra);
    };

  return (
    <div className='mx-8 mt-20 md:m-10'>
      <Header title='Accounts'/>

        <div className='p-2 pb-5 m-2 bg-white shadow-md md:m-10 md:px-10 rounded-xl'>

          <div className='flex w-full h-12 mt-2'>
            <p className='w-auto px-4 my-auto font-bold sm:w-34 md:w-72'>Customers</p>

            {/* <div className='relative w-full'>
              <div className='absolute right-0 w-34'>
                
                <NavLink to={'/GenerateOrder'}>
                  <Button type='button' size='sm' style={{backgroundColor: '#83D2FF'}} className='inline-flex items-center w-10 h-10 py-1 pl-2 pr-0 my-1 mr-3 text-black rounded hover:bg-blue-400 sm:w-10 md:w-auto md:p-4'>
                    <img alt='' className='object-scale-down w-auto h-6 mr-2 sm:w-auto md:w-6 sm:mr-0 md:mr-2 sm:mx-auto' src={add}/>
                    <p className='invisible text-sm font-semibold md:visible lg:flex sm:invisible'>Add Order</p>
                  </Button>
                </NavLink>

              </div>
            </div> */}
          </div>  
          
          <div style={{borderColor: "#747C95"}} className="w-full my-5 border-b-2 rounded "></div>
          
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
          <div className='m-2 my-auto overflow-auto bg-white rounded'>
            <Table bordered className='mt-14' columns={customerGrid} dataSource={search(cList)} onChange={onChange} pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '25', '50', '100']}}></Table>
          </div>

        </div>
    </div>
  )
}

export default CustomerAccount