import React, { useEffect, useState, useRef } from 'react';
// import { useParams } from 'react-router-dom';
import add from '../Images/add.png';
import impExcel from '../Images/import.png';
import archive from '../Images/archive.png';
import edit from '../Images/edit.png';
//for data
// import { brandGrid, ordersGrid } from '../data/dummy';
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

//For notification
const openNotif = (type) => {
  if(type === 'success'){
    notification[type]({
      message: 'SUCCESS!',
      description: 'Supplier Added Successfully.',
      duration: 4,
      style: {borderRadius: '5px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'},
    });
  }else if(type === 'warning'){
    notification[type]({
      message: 'SUCCESS!',
      description: 'Supplier Removed Successfully.',
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
      description: 'Supplier Updated Successfully.',
      duration: 4,
      style: {borderRadius: '5px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'},
    });
  }
  
};

const Supplier = () => {
  
  //For Search
  const search = (data) => {
    return data.filter((item) =>
      item.Supplier_ComName.toLowerCase().includes(searchVal) ||
      item.Supplier_RepName.toLowerCase().includes(searchVal) ||
      item.Supplier_ContNum.toString().toLowerCase().includes(searchVal) ||
      item.Supplier_Address.toString().toLowerCase().includes(searchVal) ||
      item.SuppStatus.toLowerCase().includes(searchVal)
    )
  }
  const navigate = useNavigate();
  //For Modal
  const [modal, setModal] = useState({Title: '', Visible: false, });
  const [btnType, setBtnType] = useState('');
  
  //For Add Modal
  const showAddModal = () => {
    setBtnType('Add');
    setModal({Title: 'Add Supplier', Visible: true});
  };
  
  const handleOk = () => {
    setModal({Visible: false});
    setMessage('');
    setMessage2('');
    setMessage3('');
    setMessage4('');
    setMessage5('');
    
    setInpStat('');
    setInpStat2('');
    setInpStat3('');
    setInpStat4('');
    
    setSelStat('');
    setsupplierComName('');
    setsupplierRepName('');
    setsupplierContNum('');
    setsupplierAddress('');
    setStatus('Select Status');
  };
  
  //For Edit Modal
  const showUpdateModal = () => {
    setBtnType('Update');
    setModal({Title: 'Update Supplier', Visible: true});
  };

  const [count, setCount] = useState(0);
  const resetSelect = useRef();
  const [message, setMessage] = useState('');
  const [message2, setMessage2] = useState('');
  const [message3, setMessage3] = useState('');
  const [message4, setMessage4] = useState('');
  const [message5, setMessage5] = useState('');
  const [inpStat, setInpStat] = useState('');
  const [inpStat2, setInpStat2] = useState('');
  const [inpStat3, setInpStat3] = useState('');
  const [inpStat4, setInpStat4] = useState('');
  const [selStat, setSelStat] = useState('');
  const [supplierComName, setsupplierComName] = useState('');
  const [supplierRepName, setsupplierRepName] = useState('');
  const [supplierContNum, setsupplierContNum] = useState('');
  const [supplierAddress, setsupplierAddress] = useState('');
  const [status, setStatus] = useState('Select Status');
  const [supplierList, setSupplierList] = useState([]);
  const [supID, setsupID] = useState('');
  const [searchVal, setSearchVal] = useState('');

  const abortController = new AbortController();

  //pag load ng page at show ng data sa table
  useEffect(() => {
    Axios.get(`${mainApi}/api/supplier/get`, {signal: abortController.signal}).then((response)=>{
      setSupplierList(response.data);
      setCount(() => count * 0)
    }).catch((err)=>{
      if (err.response.status===403){
        navigate('/NotAuthorizedPage')
      }
      
    });;

    return () => {  
      abortController.abort();  
    }
  }, [count]);

 
  //pag add and update ng data
  const handleSubmit = () => {
    if(btnType === 'Add'){
      if(supplierComName.trim().length === 0){
        setMessage('Please enter Supplier Company Name!');
        setInpStat('error');
      }
      else if(supplierRepName.trim().length === 0){
        setMessage2('Please enter Supplier Representative Name!');
        setInpStat2('error');
      }
      else if(supplierContNum.trim().length === 0){
        setMessage3('Please enter Supplier Contact Number!');
        setInpStat3('error');
      }
      else if(supplierAddress.trim().length === 0){
        setMessage4('Please enter Supplier Address!');
        setInpStat4('error');
      }
      else if(status === "Select Status"){
        setMessage5('Please choose status!');
        setSelStat('error');
      }
      else{
        Axios.post(`${mainApi}/api/supplier/insert`, {
          SupplierComName: supplierComName,
          SupplierRepName: supplierRepName,
          SupplierContNum: supplierContNum,
          SupplierAddress: supplierAddress,
          Status: status
        }).then(() => {
          console.log('Data updated successfully');
        }).catch((err) => {
          alert(err.response.data);
        });
  
        openNotif('success');
        handleOk();
        setCount(() => count + 1);
      }
    }else if(btnType === 'Update'){

      //code for update
      Axios.put(`${mainApi}/api/supplier/update/${supID}`, {
          SupplierComName: supplierComName,
          SupplierRepName: supplierRepName,
          SupplierContNum: supplierContNum,
          SupplierAddress: supplierAddress,
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
  const showDataToModal = (supplierID) => {
    Axios.get(`${mainApi}/api/supplier/get/${supplierID}`).then((resp)=>{
        setsupplierComName(resp.data.Supplier_ComName);
        setsupplierRepName(resp.data.Supplier_RepName);
        setsupplierContNum(resp.data.Supplier_ContNum);
        setsupplierAddress(resp.data.Supplier_Address);
        setStatus(resp.data.SuppStatus);
        setsupID(supplierID);
      });
      setCount(() => count + 1)
      showUpdateModal();
  }

  const openNotificationWithIconErrorExist = (type) => {
    notification[type]({
      message: "Command can not commit!",
      description: "It seems like this data was being used from other modules. Please check and delete it first.",
      duration: 2,
    });
  };

  //pag remove ng supplier
  const removeSupplier = (supplierID) => {
    if(window.confirm('Are you sure that you wanted to delete this supplier?')){
      Axios.delete(`${mainApi}/api/supplier/remove/${supplierID}`).then((resp)=>{
              if (resp.data.errno === 1451){
                openNotificationWithIconErrorExist('error');
              }
              else{
                openNotif('warning');
                setCount(() => count + 1)
              }
                
            }).catch((err)=>{
              if (err.data.errno === 1451){
                openNotificationWithIconErrorExist('error');
              }
              openNotif('error')
            });
      
    }
  }

  //For the column of the table
    interface DataType {
      key: React.Key;
      brand_name: string;
      status: string;
    }

    const supplierTblGrid: ColumnsType<DataType> = [
      {
        title: 'Company Name',
        dataIndex: 'Supplier_ComName',
        sorter: (a, b) => a.Supplier_ComName.localeCompare(b.Supplier_ComName),
        render: (text, record) => {
          return <p style={{textTransform: 'capitalize'}}>{text}</p>
        }
      },
      {
        title: 'Representative Name',
        dataIndex: 'Supplier_RepName',
        sorter: (a, b) => a.Supplier_RepName.localeCompare(b.Supplier_RepName),
        render: (text, record) => {
          return <p style={{textTransform: 'capitalize'}}>{text}</p>
        }
      },
      {
        title: 'Contact Number',
        dataIndex: 'Supplier_ContNum',
        sorter: {
          compare: (a, b) => a.Supplier_ContNum - b.Supplier_ContNum,
        },
        render: (text, record) => {
          return <p style={{textTransform: 'capitalize'}}>{text}</p>
        }
      },
      {
        title: 'Address',
        dataIndex: 'Supplier_Address',
        sorter: (a, b) => a.Supplier_Address.localeCompare(b.Supplier_Address),
        render: (text, record) => {
          return <p style={{textTransform: 'capitalize'}}>{text}</p>
        }
      },
      {
        title: 'Status',
        dataIndex: 'SuppStatus',
        sorter: (a, b) => a.SuppStatus.localeCompare(b.SuppStatus),
        render: (text, record) => {
          return <p style={{color: record.SuppStatus === 'active' ? 'green': 'red', textTransform: 'capitalize'}}>{text}</p>
        }
      },
      {
        key: 'SupplierID',
        dataIndex: 'SupplierID',
        title: 'Actions',
        align: 'center',
        width: '120px',
        render:(_,record) =>
          <Space align='end'>
            <Button type='button' 
              onClick={() => {
                showDataToModal(record.SupplierID);
              }}
              style={{backgroundColor: '#83D2FF'}} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto w-10 sm:w-10 md:w-10 md:p-3 md:pl-3 sm:pr-2.5'>
                <img className='w-auto h-5 sm:w-auto md:w-10 md:h-5 mr-2 sm:mr-0 sm:mx-auto object-scale-down' src={edit} />
              </Button>
            <Button type='button'
              onClick={() => {
                removeSupplier(record.SupplierID);
              }} 
              style={{backgroundColor: '#ED5264'}} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto w-10 sm:w-10 md:w-10 md:p-0 sm:pr-2.5'>
                <img className='w-auto h-5 sm:w-auto md:w-5 mr-2 sm:mr-0 md:mx-auto sm:mx-auto object-scale-down' src={archive} />
              </Button>
          </Space>
      },
    ];

    // post the data from db to the table
    const supList = supplierList.map(({body,...item}) =>({
      ...item,
      key: item.SupplierID,
      message: body,
    }))


    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
      console.log('params', pagination, filters, sorter, extra);
    };


  return (

    <div className='md:m-10 mt-20 mx-8'>
      <Header title='Supplier'/>

        <div className='m-2 md:m-10 p-2 md:px-10 pb-5 bg-white rounded-xl shadow-md'>

          <div className='flex w-full h-12 mt-2'>
            <p className='my-auto w-auto sm:w-34 md:w-72 px-4 font-bold'>Available Suppliers</p>

            <div className='relative w-full'>
              <div className='absolute right-0 w-34'>
  
                <Button onClick={showAddModal} type='button' size='sm' style={{backgroundColor: '#83D2FF'}} className='hover:bg-blue-400 text-black py-1 pl-2 pr-0 h-10 rounded inline-flex items-center my-1 mr-3 w-10 sm:w-10 md:w-auto md:p-4'>
                  <img alt='' className='w-auto h-6 sm:w-auto md:w-6 mr-2 sm:mr-0 md:mr-2 sm:mx-auto object-scale-down' src={add}/>
                  <p className='invisible text-sm font-semibold md:visible lg:flex sm:invisible'>Add</p>
                </Button>

                <Modal title={modal.Title} visible={modal.Visible} onOk={handleOk} onCancel={handleOk}
                  footer={[
                    <Button key="submit" size='sm' style={{backgroundColor: '#14D89A'}} className="w-20 mr-4" type="primary" onClick={handleSubmit}>{btnType}</Button>,
                    <Button key="back" size='sm' style={{backgroundColor: '#ED5264'}} className='rounded' onClick={handleOk}>Cancel</Button>,
                  ]}>

                  <div className='flex flex-col gap-4'>
                    

                    <div>
                      <p className='text-red-700'>{message}</p>
                      <Input className='rounded-sm' value={supplierComName || ''} placeholder="Supplier Company Name"
                        onChange={(e) => {
                            setsupplierComName(e.target.value);
                            setMessage('');
                            setInpStat('');
                        }} status={inpStat}/>
                    </div>

                        <div>

                        <p className='text-red-700'>{message2}</p>
                        <Input className='rounded-sm' value={supplierRepName || ''} placeholder="Supplier Representative Name  "
                        onChange={(e) => {
                            setsupplierRepName(e.target.value);
                            setMessage2('');
                            setInpStat2('');
                        }} status={inpStat2}/>
                        </div>

                        <div>
                        <p className='text-red-700'>{message3}</p>
                        <Input className='rounded-sm' value={supplierContNum || ''} placeholder="Supplier Contact Number"
                        onChange={(e) => {
                            setsupplierContNum(e.target.value);
                            setMessage3('');
                            setInpStat3('');
                        }} status={inpStat3}/>
                        </div>

                        <div>
                        <p className='text-red-700'>{message4}</p>
                        <Input className='rounded-sm' value={supplierAddress || ''} placeholder="Supplier Address"
                        onChange={(e) => {
                            setsupplierAddress(e.target.value);
                            setMessage4('');
                            setInpStat4('');
                        }} status={inpStat4}/>
                        </div>

                    
                    <div>
                    <p className='text-red-700'>{message5}</p>
                      <Select className='w-full rounded-sm' placeholder="Select Status" value={status}
                      onChange={(value) => {
                          setStatus(value)
                          setMessage5('');
                          setSelStat('');
                      }} status={selStat} ref={resetSelect}>
                        <Option value="active">Active</Option>
                        <Option value="inactive">Inactive</Option>
                      </Select>
                    </div>
                    
                  </div>
                  
                </Modal>

                {/* <NavLink to={''}>
                  <Button type='button' size='sm' style={{backgroundColor: '#46E4AC'}} className='hover:bg-green-400 text-black py-1 pl-2 pr-0 h-10 rounded inline-flex items-center my-1 w-10 sm:w-10 md:w-auto md:p-4'>
                    <img alt='' className='w-6 h-6 mx-auto md:w-5 mr-2 sm:mr-0 md:mr-2 sm:mx-auto object-scale-down' src={impExcel}/>
                    <p className='invisible text-sm font-semibold md:visible lg:flex sm:invisible'>Import</p>
                  </Button>
                </NavLink> */}

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
            {/* Table */}
            <Table bordered className='mt-14' columns={supplierTblGrid} pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '25']}} dataSource={search(supList)} onChange={onChange}></Table>
          </div>
        </div>
    </div>
  )
}

export default Supplier