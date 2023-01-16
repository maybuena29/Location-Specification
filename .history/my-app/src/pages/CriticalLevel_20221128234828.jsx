import React, { useEffect, useState, useRef } from 'react';
import add from '../Images/add.png';
import impExcel from '../Images/import.png';
import edit from '../Images/edit.png';
import archive from '../Images/archive.png';
import { Header } from '../components';
import { NavLink,useNavigate } from 'react-router-dom';
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
      description: 'Data Added Successfully.',
      duration: 4,
      style: {borderRadius: '5px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'},
    });
  }else if(type === 'warning'){
    notification[type]({
      message: 'SUCCESS!',
      description: 'Data Removed Successfully.',
      duration: 4,
      style: {borderRadius: '5px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'},
    });
  }else if(type === 'error'){
    notification[type]({
      message: 'FAILED!',
      description: 'Category already exist.',
      duration: 4,
      style: {borderRadius: '5px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'},
    });
  }else{
    notification[type]({
      message: 'SUCCESS!',
      description: 'Data Updated Successfully.',
      duration: 4,
      style: {borderRadius: '5px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'},
    });
  }
  
};

const CriticalLevel = () => {
  
  const navigate = useNavigate();

  //For Search
  const search = (data) => {
    return data.filter((item) =>
      item.Category_Name.toString().toLowerCase().includes(searchVal) ||
      item.MaxStock.toString().toLowerCase().includes(searchVal) ||
      item.CriticalPercentage.toString().toLowerCase().includes(searchVal)
    )
  }

  //For Modal
  const [modal, setModal] = useState({Title: '', Visible: false, });
  const [btnType, setBtnType] = useState('');
  
  //For Add Modal
  const showAddModal = () => {
    setBtnType('Add');
    setModal({Title: 'Add Critical Level', Visible: true});
  };
  
  const handleOk = () => {
    setModal({Visible: false});
    setMessage('');
    setMessage2('');
    setMessage3('');
    setInpStat('');
    setSelStat('');
    setCategoryVal('Select Category');
    setMaxStock(0);
    setCriticalPercentage(0);
  };
  
  //For Edit Modal
  const showUpdateModal = () => {
    setBtnType('Update');
    setModal({Title: 'Update Data', Visible: true});
  };

  const [count, setCount] = useState(0);
  const resetSelect = useRef();
  const [message, setMessage] = useState('');
  const [message2, setMessage2] = useState('');
  const [message3, setMessage3] = useState('');
  const [inpStat, setInpStat] = useState('');
  const [selStat, setSelStat] = useState('');
//   const [discName, setDiscName] = useState('');
//   const [discValue, setDiscValue] = useState(0);
  const [status, setStatus] = useState('Select Status');
  const [criticalLevelList, setCriticalLevelList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [categoryVal, setCategoryVal] = useState('Select Category');
  const [maxStock, setMaxStock] = useState(0);
  const [criticalPercentage, setCriticalPercentage] = useState(0);
  const [clID, setCLID] = useState('');
  const [searchVal, setSearchVal] = useState('');

  const abortController = new AbortController();

  //pag load ng page at show ng data sa table
  useEffect(() => {
    fetchActiveCategory();
    fetchCriticalLevelList().catch((err)=>{
      if (err.response.status===403){
        navigate('/NotAuthorizedPage')
      }
      
    });;
    return () => {  
      abortController.abort();
    }
  }, [count]);

  const fetchCriticalLevelList = async () => {
    await Axios.get(`${mainApi}/api/critical/level/get`, {signal: abortController.signal}).then((response)=>{
      setCriticalLevelList(response.data);
      setCount(() => count * 0)
    });
  }

  const fetchActiveCategory = async () => {
    await Axios.get(`${mainApi}/api/category/get/categname/active`, {signal: abortController.signal}).then((response)=>{
      setCategoryList(response.data);
    });
  }


  //pag add and update ng data
  const handleSubmit = () => {
    if(btnType === 'Add'){
      if(categoryVal === 'Select Category' || categoryVal === ''){
        setMessage('Please choose a category!');
        setMessage2('')
        setMessage3('')
        setInpStat('error');
      }
      else if(maxStock === 0){
        setMessage('');
        setMessage2('');
        setMessage3('Please enter the maximum stock value!');
        setInpStat('error');
      }
      else if(criticalPercentage === 0){
        setMessage2('Please enter the critical level percentage!');
        setMessage('')
        setMessage3('')
        setSelStat('error');
      }
      else{
        let num = 1;
        Array.from(criticalLevelList).map((data) => {
            if(data.CategoryID === categoryVal){
                num = 0;
                return;
            }
        })

        if(num === 1){
            Axios.post(`${mainApi}/api/critical/level/insert`, {
                CategoryID: categoryVal,
                MaxStock: maxStock,
                CriticalPercentage: criticalPercentage,
            }).then(() => {
                console.log('Data updated successfully');
            }).catch((err) => {
                alert(err.response.data);
            });
    
            openNotif('success');
            handleOk();
            setCount(() => count + 1);
        }else{
            handleOk();
            openNotif('error');
        }
      }
    }else if(btnType === 'Update'){

      //code for update
      Axios.put(`${mainApi}/api/critical/level/update/${clID}`, {
        CategoryID: categoryVal,
        MaxStock: maxStock,
        CriticalPercentage: criticalPercentage,
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
  const showDataToModal = (critID) => {
    Axios.get(`${mainApi}/api/critical/level/get/${critID}`).then((resp)=>{
      setCategoryVal(resp.data.CategoryID);
      setMaxStock(resp.data.MaxStock);
      setCriticalPercentage(resp.data.CriticalPercentage);
      setCLID(critID);
    });
      setCount(() => count + 1)
      showUpdateModal();
  }

  //pag remove ng brand
  const removeCritLevel = (critID) => {
    if(window.confirm('Are you sure that you wanted to delete this data?')){
      Axios.delete(`${mainApi}/api/critical/level/remove/${critID}`);
      openNotif('warning');
      setCount(() => count + 1)
    }
  }

  //For preventing negative values
  const preventMinus = (e) => {
    if(e.code === 'Minus') {
      e.preventDefault();
    }

    if(e.target.value.length === 3){
      e.preventDefault();
    }
  };

  const preventNegative = (e) => {
    if(e.code === 'Minus') {
      e.preventDefault();
    }
  };

  const preventPasteNegative = (e) => {
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = parseFloat(clipboardData.getData('text'));

    if (pastedData < 0) {
        e.preventDefault();
    }
  };
  
  const handleCritPercentage = (e) => {
    const value = Math.max(0, Math.min(100, Number(e)));
    setMessage3('');
    setInpStat('');
    setCriticalPercentage(value);
  }
  
  const handleMaxStock = (e) => {
    setMaxStock(e);
  }

  //For the column of the table

    const critLevelGrid = [
      {
        title: 'Category Name',
        dataIndex: 'Category_Name',
        align: 'Center',
        sorter: (a, b) => a.Category_Name.localeCompare(b.Category_Name),
        render: (text, record) => {
          return <p style={{textTransform: 'capitalize'}}>{text}</p>
        }
      },
      {
        title: 'Max Stock',
        dataIndex: 'MaxStock',
        align: 'Center',
        sorter: {
          compare: (a, b) => a.MaxStock - b.MaxStock,
        },
        render: (text, record) => {
          return <p>{text}pc/s.</p>
        }
      },
      {
        title: 'Critical Level Percentage',
        dataIndex: 'CriticalPercentage',
        align: 'Center',
        sorter: {
            compare: (a, b) => a.CriticalPercentage - b.CriticalPercentage,
        },
        render: (text, record) => {
          return <p style={{textTransform: 'capitalize'}}>{text}%</p>
        }
      },
      {
        key: 'Critical_ID',
        dataIndex: 'Critical_ID',
        title: 'Actions',
        align: 'center',
        width: '120px',
        render:(_,record) =>
          <Space align='end'>
            {/* For Update */}
            <Button style={{backgroundColor: '#83D2FF'}} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto -mr-3 w-10 sm:w-10 md:w-10 md:p-3 md:pl-3 sm:pr-2.5' onClick={()=> {
                showDataToModal(record.Critical_ID);
                console.log(record.Critical_ID);
            }}>
              <img className='object-scale-down w-auto h-5 mr-2 sm:w-auto md:w-10 md:h-5 sm:mr-0 md:mr-2 sm:mx-auto' src={edit}/>
            </Button>

            {/* For Delete */}
            <Button style={{backgroundColor: "#ED5264", marginLeft: 12}} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto w-10 sm:w-10 md:w-10 md:p-0 sm:pr-2.5' onClick={() => {
                removeCritLevel(record.Critical_ID);
            }}>
              <img className='object-scale-down w-auto h-5 mr-2 sm:w-auto md:w-5 sm:mr-0 md:mx-auto sm:mx-auto' src={archive}/>
            </Button>
          </Space>
      },
    ];

    // post the data from db to the table
    const clList = criticalLevelList.map(({body,...item}) => ({
      ...item,
      key: item.Critical_ID,
      message: body,
    }))

  return (

    <div className='mx-8 mt-20 md:m-10'>
      <Header title='Critical Level'/>

        <div className='p-2 pb-5 m-2 bg-white shadow-md md:m-10 md:px-10 rounded-xl'>

          <div className='flex w-full h-12 mt-2'>
            <p className='w-auto px-4 my-auto font-bold sm:w-34 md:w-72'>Available Critical Level</p>

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
                      <p>Choose Category:</p>
                      <Select className='w-full rounded-sm' value={categoryVal || 'Select Category'} placeholder="Select Category" onChange={(val) => { setCategoryVal(val);}} showSearch={true} optionFilterProp ="search">
                          {Array.from(categoryList).map((actCategory, index)=>(
                            <Option key={index} value={actCategory.CategoryID} search={actCategory.Category_Name}>{actCategory.Category_Name}</Option>
                            ))}
                      </Select>
                      <p className='text-red-700'>{message}</p>
                    </div>
                    <div>
                      <p>Max Stock:</p>
                      <Input type='number' className='rounded-sm' value={maxStock || ''} placeholder="Max Stock"
                        onChange={(e) => {
                          handleMaxStock(e.target.value);
                        }} 
                        onPaste={preventPasteNegative} onKeyPress={preventNegative}/>
                      <p className='text-red-700'>{message3}</p>
                    </div>
                    <div>
                      <p>Critical Level Percentage:</p>
                      <Input type='number' className='rounded-sm' value={criticalPercentage || ''} placeholder="Critical Level %"
                        onChange={(e) => {
                            handleCritPercentage(e.target.value);
                        }} 
                        onPaste={preventPasteNegative} onKeyPress={preventMinus}/>
                      <p className='text-red-700'>{message2}</p>
                    </div>
                  </div>
                </Modal>

              </div>
            </div>
          </div>  
          
          <div style={{borderColor: "#747C95"}} className="w-full my-5 border-b-2 rounded "></div>
          
          {/* For search bar */}
          <div className='flex flex-row'>
            <div className='w-full p-2'>
              <p className='italic'>Default Value: (Max Stock: 500pcs., Critical Level: 20%)</p>
            </div>
            <div className='relative w-full'>
              <div className='absolute right-0 mt-1 mr-2'>
                  <Input style={{ fontSize: '16' }} className='w-full mr-3.5 items-center font-poppins' placeholder='Search...'
                  onChange = {(e) => {setSearchVal(e.target.value)}}
                  value={searchVal}
                  />
              </div>
            </div>
          </div>

          {/* For Table */}
          <div className='my-auto -mt-10 overflow-auto bg-white rounded'>
            <Table bordered className='mt-14' columns={critLevelGrid} pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '25']}} dataSource={search(clList)}></Table>
          </div>

        </div>
    </div>
  )
}

export default CriticalLevel