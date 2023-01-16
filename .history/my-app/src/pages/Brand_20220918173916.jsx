import React, { useEffect, useState, useRef } from 'react';
// import { useParams } from 'react-router-dom';
import add from '../Images/add.png';
import impExcel from '../Images/import.png';
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
      description: 'Brand Added Successfully.',
      duration: 4,
      style: {borderRadius: '5px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'},
    });
  }else if(type === 'warning'){
    notification[type]({
      message: 'SUCCESS!',
      description: 'Brand Removed Successfully.',
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
      description: 'Brand Updated Successfully.',
      duration: 4,
      style: {borderRadius: '5px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'},
    });
  }
  
};

const Brand = () => {
  
  //For Search

  //For Modal
  const [modal, setModal] = useState({Title: '', Visible: false, });
  const [btnType, setBtnType] = useState('');
  
  //For Add Modal
  const showAddModal = () => {
    setBtnType('Add');
    setModal({Title: 'Add Brand', Visible: true});
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
    setModal({Title: 'Update Brand', Visible: true});
  };

  const [count, setCount] = useState(0);
  const resetSelect = useRef();
  const [message, setMessage] = useState('');
  const [message2, setMessage2] = useState('');
  const [inpStat, setInpStat] = useState('');
  const [selStat, setSelStat] = useState('');
  const [brandName, setbrandName] = useState('');
  const [status, setStatus] = useState('Select Status');
  const [brandList, setBrandList] = useState([]);
  const [bID, setBID] = useState('');

  //pag load ng page at show ng data sa table
  useEffect(() => {
    Axios.get("http://localhost:3001/api/brand/get").then((response)=>{
      setBrandList(response.data);
      setCount(() => count * 0)
    });
  }, [count]);

 
  //pag add and update ng data
  const handleSubmit = () => {
    if(btnType === 'Add'){
      if(brandName.trim().length === 0){
        
        setMessage('Please enter brand!');
        setInpStat('error');
      }
      else if(status === "Select Status"){
        setMessage2('Please choose status!');
        setSelStat('error');
      }
      else{
        Axios.post('http://localhost:3001/api/brand/insert', {
          BrandName: brandName,
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
      Axios.put(`http://localhost:3001/api/brand/update/${bID}`, {
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
    Axios.get(`http://localhost:3001/api/brand/get/${brandID}`).then((resp)=>{
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
        title: 'Brand Name',
        dataIndex: 'Brand_Name',
        defaultSortOrder: 'descend',
        // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
        sortDirections: ['descend', 'ascend'],
        render(text, record) {
          return {
            props: {
              style: {textTransform: 'capitalize'}
            },
            children: <div>{text}</div>
          };
        }
      },
      {
        title: 'Status',
        dataIndex: 'Status',
        defaultSortOrder: 'descend',
        // sorter: (a, b) => a.status.localeCompare(b.status),
        sortDirections: ['descend', 'ascend'],
        render(text, record) {
          return {
            props: {
              style: { color: record.Status === 'active' ? 'green' : 'red', textTransform: 'capitalize'}
            },
            children: <div>{text}</div>
          };
        }
      },
      {
        key: 'BrandID',
        dataIndex: 'BrandID',
        title: 'Actions',
        align: 'center',
        width: '120px',
        render:(_,record) =>
          <Space align='end'>
            <Button type='button' 
              onClick={() => {
                showDataToModal(record.BrandID);
              }}
              style={{backgroundColor: '#83D2FF'}} className='rounded inline-flex items-center ml-4 my-auto w-10 sm:w-5 md:w-auto md:p-2 p-0'><FiEdit3 style={{flex: 1, flexWrap: 'wrap'}} className='text-gray-800 text-xs w-5 h-5 sm:w-5 md:w-5 object-scale-down'/></Button>
            <Button type='button' hidden
              onClick={() => {
                removeBrand(record.BrandID);
              }} 
              style={{backgroundColor: '#ED5264'}} className='rounded inline-flex items-center mr-4 my-auto w-10 sm:w-10 md:w-auto md:p-2'><BiArchiveIn className='text-gray-900 w-5 h-5'/></Button>
          </Space>
      },
    ];

    // post the data from db to the table
    const bList = brandList.map(({body,...item}) =>({
      ...item,
      key: item.BrandID,
      message: body,
    }))


    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
      console.log('params', pagination, filters, sorter, extra);
    };


  return (

    <div className='md:m-10 mt-20 mx-8'>
      <Header title='Brand'/>

        <div className='m-2 md:m-10 p-2 md:px-10 pb-5 bg-white rounded-xl shadow-md'>

          <div className='flex w-full h-12 mt-2'>
            <p className='my-auto w-auto sm:w-34 md:w-72 px-4 font-bold'>Available Brands</p>

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
                      <Input className='rounded-sm' value={brandName || ''} placeholder="Brand Name"
                        onChange={(e) => {
                            setbrandName(e.target.value);
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
            {/* Table */}
            <Table bordered className='mt-14' columns={brandTblGrid} dataSource={bList} onChange={onChange}></Table>
          </div>
        </div>
    </div>
  )
}

export default Brand