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
import mainApi from '../contexts/Api';
//for database
import Axios from "axios";
import { FiEdit3 } from 'react-icons/fi';
import { BiArchiveIn } from 'react-icons/bi';
import moment from 'moment'

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

const Audit = () => {

  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const resetSelect = useRef();
  const [message, setMessage] = useState('');
  const [message2, setMessage2] = useState('');
  const [inpStat, setInpStat] = useState('');
  const [selStat, setSelStat] = useState('');
  const [brandName, setbrandName] = useState('');
  const [status, setStatus] = useState('Select Status');
  const [auditlist, setAuditlist] = useState([]);
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
  useEffect(() => {
    let abortController = new AbortController();
     Axios.get(`${mainApi}/api/audit/log`).then((response)=>{
      setAuditlist(response.data);
      console.log(response.data);
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




  

  //For the column of the table
    interface DataType {
      key: React.Key;
      AuditUserCode: string;
      status: string;
    }

    const auditTblGrid: ColumnsType<DataType> = [
      // {
      //   title: 'AuditID',
      //   dataIndex: 'AuditID',
      //   sorter: (a, b) => a.AuditID - b.AuditID,
      //   defaultSortOrder: 'descend',
      //   sortOrder: 'descend',
      //   render: (text, record) => {
      //     return <p style={{textTransform: 'capitalize'}}>{}</p>
      //   },
      //   width: '1px'
      //   //hidden:true
      // },
      {
        title: 'Employee Code',
        dataIndex: 'AuditUserCode',
        align: 'center',
        // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
        //sortDirections: ['descend', 'ascend'],
        render: (text, record) => {
          return <p style={{textTransform: 'capitalize'}}>{text}</p>
        }
      },
      {
        title: 'Date',
        dataIndex: 'AuditDate',
        align: 'center',
        sorter: (a, b) => moment(a.AuditDate).unix()- moment(b.AuditDate).unix(),
        // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
        render: (text, record) => {
          return moment(text).format('YYYY-MM-DD');
        }
      },
      {
        title: 'Time',
        dataIndex: 'AuditTime',
        align: 'center',
        defaultSortOrder: 'descend',
        // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
        sortDirections: ['descend', 'ascend'],
        render: (text, record) => {
          return moment(text, 'hh:mm A').format('hh:mm A');
          // return <p style={{textTransform: 'capitalize'}}>{text}</p>
        }
      },
      {
        title: 'Module',
        dataIndex: 'AuditModule',
        align: 'center',
        defaultSortOrder: 'descend',
        // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
        sortDirections: ['descend', 'ascend'],
        render: (text, record) => {
          return <p style={{textTransform: 'capitalize'}}>{text}</p>
        }
      },
      {
        title: 'Action',
        dataIndex: 'AuditAction',
        align: 'center',
        defaultSortOrder: 'descend',
        // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
        sortDirections: ['descend', 'ascend'],
        render: (text, record) => {
          return <p style={{textTransform: 'capitalize'}}>{text}</p>
        }
      },
    ].filter(item => !item.hidden);

    // post the data from db to the table
    const audit = auditlist.map(({body,...item}) => ({
      ...item,
      key: item.AuditID,
      message: body,
    }))


    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
      console.log('params', pagination, filters, sorter, extra);
    };

  return (
    <div className='md:m-10 mt-20 mx-8'>
      <Header title='Audit Log'/>

        <div className='m-2 md:m-10 p-2 md:px-10 pb-5 bg-white rounded-xl shadow-md'>

          <div className='flex w-full h-12 mt-2'>
            <p className='my-auto w-auto sm:w-34 md:w-72 px-4 font-bold'>History</p>

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
            <Table bordered className='mt-14' columns={auditTblGrid} dataSource={audit} rowKey="AuditID" onChange={onChange}></Table>
          </div>

        </div>
    </div>
  )
}

export default Audit