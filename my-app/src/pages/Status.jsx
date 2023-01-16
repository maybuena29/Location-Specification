import React, { useEffect, useState, useRef } from 'react';
import add from '../Images/add.png';
import impExcel from '../Images/import.png';
import edit from '../Images/edit.png';
import archive from '../Images/archive.png';
import { Header } from '../components';
import { useNavigate, NavLink } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import { Modal, Input, Select, notification, Space, Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import Axios from "axios";
import mainApi from '../contexts/Api';

const { Option } = Select;

//For notification
const openNotif = (type) => {
  if(type === 'success'){
    notification[type]({
      message: 'SUCCESS!',
      description: 'Status Added Successfully.',
      duration: 4,
      style: {borderRadius: '5px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'},
    });
  }else if(type === 'warning'){
    notification[type]({
      message: 'SUCCESS!',
      description: 'Status Removed Successfully.',
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
      description: 'Status Updated Successfully.',
      duration: 4,
      style: {borderRadius: '5px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'},
    });
  }
};

const Status = () => {
  const navigate = useNavigate()
  //For Search
  const search = (data) => {
    return data.filter((item) =>
      item.status_name.toLowerCase().includes(searchVal.toLowerCase()) ||
      item.status_status.toLowerCase().includes(searchVal.toLowerCase())
    )
  }

  const openNotificationWithIconErrorExist = (type) => {
    notification[type]({
      message: "Command can not commit!",
      description: "It seems like this data was being used from other modules. Please check and delete it first.",
      duration: 2,
    });
  };

  //For Modal
  const [modal, setModal] = useState({Title: '', Visible: false, });
  const [btnType, setBtnType] = useState('');
  
  //For Add Modal
  const showAddModal = () => {
    setBtnType('Add');
    setModal({Title: 'Add Status', Visible: true});
  };
  
  const handleOk = () => {
    setModal({Visible: false});
    setMessage('');
    setMessage2('');
    setInpStat('');
    setSelStat('');
    setStatusName('');
    setStatus('Select Status');
  };
  
  //For Edit Modal
  const showUpdateModal = () => {
    setBtnType('Update');
    setModal({Title: 'Update Room', Visible: true});
  };

  const [count, setCount] = useState(0);
  const resetSelect = useRef();
  const [message, setMessage] = useState('');
  const [message2, setMessage2] = useState('');
  const [inpStat, setInpStat] = useState('');
  const [selStat, setSelStat] = useState('');
  const [statusName, setStatusName] = useState('');
  const [status, setStatus] = useState('Select Status');
  const [statusList, setStatusList] = useState([]);
  const [sID, setSID] = useState('');
  const [searchVal, setSearchVal] = useState('');

  const abortController = new AbortController();

  //pag load ng page at show ng data sa table
  useEffect(() => {
    fetchStatusList();
    return () => {  
      abortController.abort();  
    }
  }, [count]);

  const fetchStatusList = () => {
    Axios.get(`${mainApi}/api/status/get`, {signal: abortController.signal}).then((response)=>{
      setStatusList(response.data);
      setCount(() => count * 0)
    }).catch(err=>{
      if (err.response.status === 403){
        navigate('/NotAuthorizedPage')
    }});
  }

  //pag add and update ng data
  const handleSubmit = () => {
    if(btnType === 'Add'){
      if(statusName.trim().length === 0){
        setMessage('Please enter status name!');
        setInpStat('error');
      }
      else if(status === "Select Status"){
        setMessage2('Please choose status!');
        setSelStat('error');
      }
      else{
        Axios.post(`${mainApi}/api/status/insert`, {
          StatusName: statusName,
          Status: status
        }).then(() => {
          console.log('Data updated successfully');
        }).catch((err) => {
          alert(err.response.data);
        });
  
        fetchStatusList();
        openNotif('success');
        handleOk();
        setCount(() => count + 1);
      }
    }else if(btnType === 'Update'){

      //code for update
      Axios.put(`${mainApi}/api/status/update/${sID}`, {
        StatusName: statusName,
        Status: status
      }).then(() => {
        console.log('Data updated successfully');
      }).catch((err) => {
        alert(err.response.data);
      });

      fetchStatusList();
      openNotif('info');
      handleOk();
      setCount(() => count + 1);
    }
  };

  //pag show ng data para sa update
  const showDataToModal = (statusID) => {
    Axios.get(`${mainApi}/api/status/get/${statusID}`).then((resp)=>{
        setStatusName(resp.data.status_name);
        setStatus(resp.data.status_status);
        setSID(statusID);
      });
      setCount(() => count + 1)
      showUpdateModal();
  }

  //pag remove ng brand
  const removeStatus = (statusID) => {
    if(window.confirm('Are you sure that you wanted to delete this status?')){
      Axios.delete(`${mainApi}/api/status/remove/${statusID}`).then((resp)=>{
        if (resp.data.errorno === 1451){
          openNotificationWithIconErrorExist('error');
        }
        else{
          openNotif('warning');
          setCount(() => count + 1)
        }
      }).catch((err)=>{
        openNotif('error')
      });
    }
    
    fetchStatusList();
  }

  //For the column of the table
    const statusTblGrid = [
      {
        title: 'Status Name',
        dataIndex: 'status_name',
        align: 'center',
        sorter: (a, b) => a.status_name.localeCompare(b.status_name),
        render: (text, record) => {
          return <p style={{textTransform: 'capitalize'}}>{text}</p>
        }
      },
      {
        title: 'Status',
        dataIndex: 'status_status',
        align: 'center',
        sorter: (a, b) => a.status_status.localeCompare(b.status_status),
        render: (text, record) => {
          return <p style={{color: record.status_status === 'active' ? 'green': 'red', textTransform: 'capitalize'}}>{text}</p>
        }

      },
      {
        key: 'status_id',
        dataIndex: 'status_id',
        title: 'Actions',
        align: 'center',
        width: '120px',
        render:(_,record) =>
          <Space align='end'>
            {/* For Update */}
            <Button style={{backgroundColor: '#83D2FF'}} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto -mr-3 w-10 sm:w-10 md:w-10 md:p-3 md:pl-3 sm:pr-2.5' onClick={()=> {
                showDataToModal(record.status_id);
            }}>
              <img className='object-scale-down w-auto h-5 mr-2 sm:w-auto md:w-10 md:h-5 sm:mr-0 md:mr-2 sm:mx-auto' src={edit}/>
            </Button>

            {/* For Delete */}
            <Button style={{backgroundColor: "#ED5264", marginLeft: 12}} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto w-10 sm:w-10 md:w-10 md:p-3 md:pl-3 sm:pr-2.5' onClick={() => {
                removeStatus(record.status_id);
            }}>
              <img className='object-scale-down w-auto h-5 mr-2 sm:w-auto md:w-5 sm:mr-0 md:mr-2 sm:mx-auto' src={archive}/>
            </Button>
          </Space>
      },
    ];

    // post the data from db to the table
    const sList = statusList.map(({body,...item}) => ({
      ...item,
      key: item.status_id,
      message: body,
    }))

  return (

    <div className='mx-8 mt-20 md:m-10'>
      <Header title='Status'/>

        <div className='p-2 pb-5 m-2 bg-white shadow-md md:m-10 md:px-10 rounded-xl'>

          <div className='flex w-full h-12 mt-2'>
            <p className='w-auto px-4 my-auto font-bold sm:w-34 md:w-72'>Available Status</p>

            <div className='relative w-full'>
              <div className='absolute right-0 w-34'>
  
                <Button onClick={showAddModal} type='button' size='sm' style={{backgroundColor: '#83D2FF'}} className='inline-flex items-center w-10 h-10 py-1 pl-2 pr-0 my-1 mr-3 text-black rounded hover:bg-blue-400 sm:w-10 md:w-auto md:p-4'>
                  <img alt='' className='object-scale-down w-auto h-6 mr-2 sm:w-auto md:w-6 sm:mr-0 md:mr-2 sm:mx-auto' src={add}/>
                  <p className='invisible text-sm font-semibold md:visible lg:flex sm:invisible'>Add</p>
                </Button>

                <Modal title={modal.Title} visible={modal.Visible} onOk={handleOk} onCancel={handleOk}
                  footer={[
                    <Button key="submit" size='sm' style={{backgroundColor: '#14D89A'}} className="w-20 mr-4 rounded" type="primary" onClick={handleSubmit}>{btnType}</Button>,
                    <Button key="back" size='sm' style={{backgroundColor: '#ED5264'}} className='rounded' onClick={handleOk}>Cancel</Button>,
                  ]}>

                  <div className='flex flex-col gap-4'>
                    <div>
                      <p className='text-red-700'>{message}</p>
                      <Input className='rounded-sm' value={statusName || ''} placeholder="Status Name"
                        onChange={(e) => {
                            setStatusName(e.target.value);
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
            <Table bordered className='mt-14' columns={statusTblGrid} pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '25']}} dataSource={search(sList)}></Table>
          </div>

        </div>
    </div>
  )
}

export default Status