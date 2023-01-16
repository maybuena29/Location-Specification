import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import add from '../Images/add.png';
import impExcel from '../Images/import.png';
import edit from '../Images/edit.png';
import archive from '../Images/archive.png';
import back from '../Images/back_white.png';
//for data
// import { brandGrid, ordersGrid } from '../data/dummy';
import { Header } from '../components';
import { NavLink } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import { Modal, Input, Select, notification, Space, Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
//for database
import Axios from "axios";
import { FiEdit3 } from 'react-icons/fi';
import { BiArchiveIn } from 'react-icons/bi';


const { Option } = Select;

//For notification
const openNotif = (type) => {
  if(type === 'success'){
    notification[type]({
      message: 'SUCCESS!',
      description: 'Value Added Successfully.',
      duration: 4,
      style: {borderRadius: '5px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'},
    });
  }else if(type === 'warning'){
    notification[type]({
      message: 'SUCCESS!',
      description: 'Value Removed Successfully.',
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
      description: 'Value Updated Successfully.',
      duration: 4,
      style: {borderRadius: '5px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'},
    });
  }
  
};

const AddAttributes = () => {

  //For Search
  const search = (data) => {
    return data.filter((item) =>
      item.Value_Name.toLowerCase().includes(searchVal) ||
      item.ValStatus.toLowerCase().includes(searchVal)
    )
  }

  //For Modal
  const [modal, setModal] = useState({Title: '', Visible: false, });
  const [btnType, setBtnType] = useState('');
  
  //For Add Modal
  const showAddModal = () => {
    setBtnType('Add');
    setModal({Title: 'Add Value', Visible: true});
  };
  
  const handleOk = () => {
    setModal({Visible: false});
    setMessage('');
    setMessage2('');
    setInpStat('');
    setSelStat('');
    setValName('');
    setStatus('Select Status');
  };
  
  //For Edit Modal
  const showUpdateModal = () => {
    setBtnType('Update');
    setModal({Title: 'Update Brand', Visible: true});
  };

  const [count, setCount] = useState(0);
  const resetSelect = useRef();
  const [message, setMessage] = useState('');
  const [message2, setMessage2] = useState('');
  const [inpStat, setInpStat] = useState('');
  const [selStat, setSelStat] = useState('');
  const [valName, setValName] = useState('');
  const [status, setStatus] = useState('Select Status');
  const [valList, setValList] = useState([]);
  const [valID, setValID] = useState('');
  const [attrName, setAttrName] = useState('');
  const {attrid} = useParams();
  const [searchVal, setSearchVal] = useState('');

  const abortController = new AbortController();

  //pag load ng page at show ng data sa table
  useEffect(() => {
    Axios.get(`http://localhost:3001/api/attrvalue/display/${attrid}`,{signal: abortController.signal}).then((response)=>{
      setValList(response.data);
    });
    Axios.get(`http://localhost:3001/api/attrvalue/get/attrname/${attrid}`,{signal: abortController.signal}).then((response)=>{
      setAttrName(response.data.Attribute_Name);
    });
    return () => {  
      abortController.abort();
    }
  }, [count]);


  //pag add and update ng data
  const handleSubmit = () => {
    if(btnType === 'Add'){
      if(valName.trim().length === 0){
        setMessage('Please enter value!');
        setInpStat('error');
      }
      else if(status === "Select Status"){
        setMessage2('Please choose status!');
        setSelStat('error');
      }
      else{
        Axios.post('http://localhost:3001/api/attrvalue/insert', {
          ValueName: valName,
          ParentID: attrid,
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
      Axios.put(`http://localhost:3001/api/attrvalue/update/${valID}`, {
        ValueName: valName,
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
  const showDataToModal = (valueID) => {
    Axios.get(`http://localhost:3001/api/attrvalue/get/${valueID}`).then((resp)=>{
        setValName(resp.data.Value_Name);
        setStatus(resp.data.ValStatus);
        setValID(valueID);
      });
      setCount(() => count + 1)
      showUpdateModal();
  }

  //pag remove ng brand
  const removeValue = (valueID) => {
    if(window.confirm('Are you sure that you wanted to delete this value?')){
      Axios.delete(`http://localhost:3001/api/attrvalue/remove/${valueID}`);
      openNotif('warning');
      setCount(() => count + 1)
      .catch((e)=>openNotif('error'););
    }
  }

  //For the column of the table
    interface DataType {
      key: React.Key;
      value_name: string;
      status: string;
    }

    const attrValTblGrid: ColumnsType<DataType> = [
      {
        title: 'Value Name',
        dataIndex: 'Value_Name',
        sorter: (a, b) => a.Value_Name.localeCompare(b.Value_Name),
        render: (text, record) => {
          return <p style={{textTransform: 'capitalize'}}>{text}</p>
        }
      },
      {
        title: 'Status',
        dataIndex: 'ValStatus',
        sorter: (a, b) => a.ValStatus.localeCompare(b.ValStatus),
        render: (text, record) => {
          return <p style={{color: record.ValStatus === 'active' ? 'green': 'red', textTransform: 'capitalize'}}>{text}</p>
        }

      },
      {
        key: 'ValueID',
        dataIndex: 'Value_ID',
        title: 'Actions',
        align: 'center',
        width: '120px',
        render:(_,record) =>
          <Space align='end'>
            {/* For Update */}
            <Button style={{backgroundColor: '#83D2FF'}} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto -mr-3 w-10 sm:w-10 md:w-10 md:p-3 md:pl-3 sm:pr-2.5' onClick={()=> {
                showDataToModal(record.Value_ID);
            }}>
              <img className='w-auto h-5 sm:w-auto md:w-10 md:h-5 mr-2 sm:mr-0 md:mr-2 sm:mx-auto object-scale-down' src={edit}/>
            </Button>

            {/* For Delete */}
            <Button style={{backgroundColor: "#ED5264", marginLeft: 12}} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto w-10 sm:w-10 md:w-10 md:p-3 md:pl-3 sm:pr-2.5' onClick={() => {
                removeValue(record.Value_ID);
            }}>
              <img className='w-auto h-5 sm:w-auto md:w-5 mr-2 sm:mr-0 md:mr-2 sm:mx-auto object-scale-down' src={archive}/>
            </Button>
          </Space>
      },
    ];

    // post the data from db to the table
    const vList = valList.map(({body,...item}) => ({
      ...item,
      key: item.Value_ID,
      message: body,
    }))


    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
      console.log('params', pagination, filters, sorter, extra);
    };


  return (

    <div className='md:m-10 mt-20 mx-8'>
      <Header title='Attribute'/>

        <div className='m-2 md:m-10 p-2 md:px-10 pb-5 bg-white rounded-xl shadow-md'>

          <div className='flex w-full h-12 mt-2'>
            <p className='my-auto w-auto sm:w-34 md:w-72 px-4 font-bold capitalize'>Attribute: {attrName}</p>

            <div className='relative w-full'>
              <div className='absolute right-0 w-34'>
  
                <Button onClick={showAddModal} type='button' size='sm' style={{backgroundColor: '#83D2FF'}} className='hover:bg-blue-400 text-black py-1 pl-2 pr-0 h-10 rounded inline-flex items-center my-1 mr-3 w-10 sm:w-10 md:w-auto md:p-4'>
                  <img alt='' className='w-auto h-6 sm:w-auto md:w-6 mr-2 sm:mr-0 md:mr-2 sm:mx-auto object-scale-down' src={add}/>
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
                      <Input className='rounded-sm' value={valName || ''} placeholder="Value Name"
                        onChange={(e) => {
                            setValName(e.target.value);
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

                <NavLink to={''}>
                  <Button type='button' size='sm' style={{backgroundColor: '#46E4AC'}} className='hover:bg-green-400 text-black py-1 pl-2 pr-0 h-10 rounded inline-flex items-center my-1 w-10 sm:w-10 md:w-auto md:p-4'>
                    <img alt='' className='w-6 h-6 mx-auto md:w-5 mr-2 sm:mr-0 md:mr-2 sm:mx-auto object-scale-down' src={impExcel}/>
                    <p className='invisible text-sm font-semibold md:visible lg:flex sm:invisible'>Import</p>
                  </Button>
                </NavLink>

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
            <Table bordered className='mt-14' columns={attrValTblGrid} pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '25']}} dataSource={search(vList)} onChange={onChange}></Table>
          </div>

          <div className='flex flex-row justify-end mt-5'>
            <NavLink to={'/products/attributes'}> 
              <Button action='' type='button' size='sm' style={{backgroundColor: '#747C95'}} className='hover:bg-blue-400 text-black py-1 pl-2 pr-2 h-10 rounded inline-flex items-center my-1 mr-3 w-auto md:w-auto md:p-4'>
                  <img alt='' className='w-6 h-6 mx-auto md:w-5 mr-2 sm:mr-0 md:mr-2 sm:mx-auto object-scale-down' src={back}/>
                  <p className='text-sm text-white font-semibold'>Back</p>
              </Button>
            </NavLink>
          </div>

        </div>
    </div>
  )
}

export default AddAttributes