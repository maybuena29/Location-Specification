import React, { useEffect, useState, useRef } from 'react';
// import { useParams } from 'react-router-dom';
import add from '../Images/add.png';
import edit from '../Images/edit.png';
import print from '../Images/print.png';
import archive from '../Images/archive.png';
import view from '../Images/view.png';
//for data
import { Header } from '../components';
import { NavLink } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import { Modal, Input, Select, notification, Space, Table } from 'antd';
import moment from 'moment';
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

const Points = () => {

  const [count, setCount] = useState(0);
  const [customerPointsTB,setCustomerPointsTB] = useState([]);
  const resetSelect = useRef();
  const [message, setMessage] = useState('');
  const [message2, setMessage2] = useState('');
  const [inpStat, setInpStat] = useState('');
  const [selStat, setSelStat] = useState('');
  const [brandName, setbrandName] = useState('');
  const [status, setStatus] = useState('Select Status');
  const [pointhistoryTable, setpointhistoryTable] = useState([]);
  const [bID, setBID] = useState('');

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
    setbrandName('');
    setStatus('Select Status');
  };
  
  //For Edit Modal
  const showUpdateModal = () => {
    setBtnType('Update');
    setModal({Title: 'Update Order', Visible: true});
  };


  //pag load ng page at show ng data sa table
  const fetchCustomerPoints = () =>{
   Axios.get(`${mainApi}/api/points/get/CP`).then((response)=>{
       setCustomerPointsTB(response.data);
      setCount(() => count * 0)
    });
  }
   //pag load ng page at show ng data sa table
   const fetchPointsHistory = () =>{
    Axios.get(`${mainApi}/api/points/get/CP/pointhistory`).then((response)=>{
      setpointhistoryTable(response.data);
     setCount(() => count * 0)
     });
      
    }
 
  
  useEffect(() => {
    let abortController = new AbortController();
    fetchCustomerPoints();

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
      //   Axios.post('${mainApi}/api/brand/insert', {
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
      Axios.put(`${mainApi}/api/brand/update/${bID}`, {
        BrandName: brandName,
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

    const totalPointTblGrid: ColumnsType<DataType> = [
      {
        title: 'Customer Code',
        dataIndex: 'CustCode',
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
        title: 'Contact',
        dataIndex: 'Contact',
        defaultSortOrder: 'descend',
        align: 'center',
        // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
        sortDirections: ['descend', 'ascend'],
        render: (text, record) => {
          return <p style={{textTransform: 'capitalize'}}>{text}</p>
        }
      },
      {
        title: 'Total Ordered',
        dataIndex: 'TotalOrdered',
        defaultSortOrder: 'descend',
        align: 'center',
        // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
        sortDirections: ['descend', 'ascend'],
        render: (text, record) => {
          return <p style={{textTransform: 'capitalize'}}>{text}</p>
        }
      },
      {
        title: 'Current Points',
        dataIndex: 'CurrentPoints',
        defaultSortOrder: 'descend',
        align: 'center',
        // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
        sortDirections: ['descend', 'ascend'],
        render: (text, record) => {
          return <p style={{textTransform: 'capitalize'}}>{text}</p>
        }
      },
      {
        title: 'Last Update',
        dataIndex: 'LastUpdate',
        defaultSortOrder: 'descend',
        align: 'center',
        // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
        sortDirections: ['descend', 'ascend'],
        render: (text, record) => {
          return <p style={{textTransform: 'capitalize'}}>{moment(text).format('MMMM Do YYYY, h:mm:ss A')}</p>
        }
      },
    ];

    const pointHistoryTblGrid: ColumnsType<DataType> = [
      {
        title: 'Date',
        dataIndex: 'Date',
        defaultSortOrder: 'descend',
        align: 'center',
        // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
        sortDirections: ['descend', 'ascend'],
        render: (text, record) => {
          return <p style={{textTransform: 'capitalize'}}>{text}</p>
        }
      },
      {
        title: 'Time',
        dataIndex: 'Time',
        defaultSortOrder: 'descend',
        align: 'center',
        // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
        sortDirections: ['descend', 'ascend'],
        render: (text, record) => {
          return <p style={{textTransform: 'capitalize'}}>{text}</p>
        }
      },
      {
        title: 'Total Item Purchased',
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
        title: 'Total Amount',
        dataIndex: 'TotalAmount',
        defaultSortOrder: 'descend',
        align: 'center',
        // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
        sortDirections: ['descend', 'ascend'],
        render: (text, record) => {
          return <p style={{textTransform: 'capitalize'}}>{text}</p>
        }
      },
      {
        title: 'Points Accumulated',
        dataIndex: 'TotalAmount',
        defaultSortOrder: 'descend',
        align: 'center',
        // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
        sortDirections: ['descend', 'ascend'],
        render: (text, record) => {
          return <p style={{textTransform: 'capitalize'}}>{text}</p>
        }
      },
    ];

    // post the data from db to the table
    const PHList = pointhistoryTable.map(({body,...item}) => ({
      ...item,
      key: item.BrandID,
      message: body,
    }))

    const CPList = customerPointsTB.map(({body,...item}) => ({
      ...item,
      key: item.BrandID,
      message: body,
    }))


    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
      console.log('params', pagination, filters, sorter, extra);
    };

  return (
    <div className='md:m-10 mt-20 mx-8'>
      <Header title='Points'/>

      {/* First Table */}
      <div className='m-2 md:m-10 p-2 md:px-10 pb-5 bg-white rounded-xl shadow-md'>

        <div className='flex w-full h-12 mt-2'>
          <p className='my-auto w-auto sm:w-34 md:w-72 px-4 font-bold'>Total Customer Points</p>

          {/* <div className='relative w-full'>
            <div className='absolute right-0 w-34'>
              
              <Button type='button' size='sm' style={{backgroundColor: '#83D2FF'}} className='hover:bg-blue-400 text-black py-1 pl-2 pr-0 h-10 rounded inline-flex items-center my-1 mr-3 w-10 sm:w-10 md:w-auto md:p-4'>
                <img alt='' className='w-auto h-6 sm:w-auto md:w-6 mr-2 sm:mr-0 md:mr-2 sm:mx-auto object-scale-down' src={add}/>
                <p className='invisible text-sm font-semibold md:visible lg:flex sm:invisible'>Add Role</p>
              </Button>

            </div>
          </div> */}
        </div>  
        
        <div style={{borderColor: "#747C95"}} className=" w-full my-5 border-b-2 rounded"></div>
        
        {/* For search bar */}
        {/* <div className='relative w-full'>
          <div className='absolute right-0 mt-1'>
              <Input.Group compact className='-right-4 md:-right-16 sm:-right-6'>
                <Select placeholder='Column' style={{ border: 'none' }} onChange={(e) => setSearch({term: search.term,type: e})} value={search.type}>
                  <Option value="Brand">Brand</Option>
                  <Option value="Status">Status</Option>
                </Select>
                <Input.Search style={{ width: '50%', fontSize: '16', border: 'none' }} className='inline-block items-center' placeholder='Search...' onSearch={onSearch} onChange={(event) => {setSearch({term: event.target.value, type: search.type})}}/>
              </Input.Group>
          </div>
        </div> */}

        {/* For Table */}
        <div className='m-2 my-auto bg-white rounded overflow-auto'>
          <Table bordered className='mt-14' columns={totalPointTblGrid} dataSource={CPList} onChange={onChange}></Table>
        </div>

      </div>

      <div className='m-2 md:m-10 p-2 md:px-10 pb-5 bg-white rounded-xl shadow-md'>

        <div className='flex w-full h-12 mt-2'>
          <p className='my-auto w-auto sm:w-34 md:w-72 px-4 font-bold'>Points History</p>

          {/* <div className='relative w-full'>
            <div className='absolute right-0 w-34'>
              
              <Button type='button' size='sm' style={{backgroundColor: '#83D2FF'}} className='hover:bg-blue-400 text-black py-1 pl-2 pr-0 h-10 rounded inline-flex items-center my-1 mr-3 w-10 sm:w-10 md:w-auto md:p-4'>
                <img alt='' className='w-auto h-6 sm:w-auto md:w-6 mr-2 sm:mr-0 md:mr-2 sm:mx-auto object-scale-down' src={add}/>
                <p className='invisible text-sm font-semibold md:visible lg:flex sm:invisible'>Add Role</p>
              </Button>

            </div>
          </div> */}
        </div>  
        
        <div style={{borderColor: "#747C95"}} className=" w-full my-5 border-b-2 rounded"></div>
        
        {/* For search bar */}
        {/* <div className='relative w-full'>
          <div className='absolute right-0 mt-1'>
              <Input.Group compact className='-right-4 md:-right-16 sm:-right-6'>
                <Select placeholder='Column' style={{ border: 'none' }} onChange={(e) => setSearch({term: search.term,type: e})} value={search.type}>
                  <Option value="Brand">Brand</Option>
                  <Option value="Status">Status</Option>
                </Select>
                <Input.Search style={{ width: '50%', fontSize: '16', border: 'none' }} className='inline-block items-center' placeholder='Search...' onSearch={onSearch} onChange={(event) => {setSearch({term: event.target.value, type: search.type})}}/>
              </Input.Group>
          </div>
        </div> */}

        {/* For Table */}
        <div className='m-2 my-auto bg-white rounded overflow-auto'>
          <Table bordered className='mt-14' columns={pointHistoryTblGrid} dataSource={oList} onChange={onChange}></Table>
        </div>

      </div>
    </div>
  )
}

export default Points