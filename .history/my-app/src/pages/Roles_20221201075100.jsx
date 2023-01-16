import React, { useEffect, useState, useRef, } from 'react';
import { useNavigate } from 'react-router-dom';
import add from '../Images/add.png';
import edit from '../Images/edit.png';
import print from '../Images/print.png';
import archive from '../Images/archive.png';
import view from '../Images/view.png';
//for data
import { Header } from '../components';
import { NavLink } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import { Modal, Input, Select, notification, Space, Table, Checkbox,message} from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
//for database
import Axios from "axios";
import { FiEdit3 } from 'react-icons/fi';
import { BiArchiveIn } from 'react-icons/bi';
import mainApi from '../contexts/Api';

const { Option } = Select;



const openNotificationWithIconUpdate = (type) => {
  notification[type]({
    message: "SUCCESS!",
    description: "Action Updated Successfully.",
    duration: 2,
  });
};
const openNotificationWithIconInsert = (type) => {
  notification[type]({
    message: "SUCCESS!",
    description: "Action Inserted Successfully.",
    duration: 2,
  });
};
const openNotificationWithIconDelete = (type) => {
  notification[type]({
    message: "SUCCESS!",
    description: "Action Deleted Successfully.",
    duration: 2,
  });
};
const openNotificationWithIconError = (type) => {
  notification[type]({
    message: "ERROR!",
    description: "Something went wrong.",
    duration: 2,
  });
};
const openNotificationWithIconExist = (type) => {
  notification[type]({
    message: "ERROR!",
    description: "Username already exist.",
    duration: 2,
  });
};

const Roles = () => {
  let navigate = useNavigate();
  const [count, setCount] = useState(0);
  // const resetSelect = useRef();
  // //const [message, setMessage] = useState('');
  // const [message2, setMessage2] = useState('');
  // const [inpStat, setInpStat] = useState('');
  // const [selStat, setSelStat] = useState('');
  // const [brandName, setbrandName] = useState('');
  // const [status, setStatus] = useState('Roles Status');
  const[OnOff,setOnOff]=useState(false);

  const onChangeCB=(e)=>{
    if (e.target.checked===true){
      setOnOff(false);

    }
    else{
      setOnOff(true);
    }
    console.log(OnOff);
  }
  const [rolesListTable, setRolesListTable]=useState('');
  const [rolesList, setRolesList] = useState({
    userRoleID:'',
    userRolename:''
  });
  const [selectedModules, setSelectedModules]=useState([]);
  const [modulesList, setModulesList] = useState([]);


  const fetchRoles= async () => {
    const { data } = await Axios.get(`${mainApi}/api/roles/get`, {signal: abortController.signal}).catch((err)=>{
      if (err.response.status===403){
        navigate('/NotAuthorizedPage')
      }
      
    });
    setRolesListTable(data)
  }

  const fetchModules= async () => {
    const { data } = await Axios.get(`${mainApi}/api/roles/getmoduleList`, {signal: abortController.signal}).catch((err)=>{
      if (err.response.status===403){
        navigate('/NotAuthorizedPage')
      }
      
    });
    setModulesList(data)
  }

  
  const fetchSelectedModules = async (roleId) => {
    const { data } = await Axios.get(`${mainApi}/api/roles/module/get/${roleId}`, {signal: abortController.signal})
      setSelectedModules(data.map(m=>m.moduleID))
    
    
  }
  
  console.log(selectedModules);
  const [bID, setBID] = useState('');

  const onChangeRoles = (e,action) => {
    setRolesList({...rolesList, [e.target.name]: e.target.value })
  }
  let abortController = new AbortController();
  //For Search

  //For Modal
  const [modalRoles, setmodalRoles] = useState({Title: '', Visible: false, });
  const [modalModule, setmodalModule] = useState({Title: '', Visible: false, });
  const [AdduserRoleID, setAdduserRoleID] = useState('');
  const [btnType, setBtnType] = useState('');
  
  //For Add Modal
  const showAddModalRoles = () => {
    setBtnType('Add');
    setmodalRoles({Title: 'Add Roles', Visible: true});
  };
  const showAddModalModules= () => {
    setBtnType('Add');
    setmodalModule({Title: 'Add Modules', Visible: true});
  };

  const UpdateModalRoles = () => {
    setBtnType('Update');
    setmodalRoles({Title: 'Update Roles', Visible: true});
  };
  const UpdateModalModules = () => {
    setBtnType('Update');
    setmodalModule({Title: 'Update Modules', Visible: true});
  };
  
// const OnchangeCB = (){
  
// }
  
  const handleOkRoles = () => {
    setmodalRoles({Visible: false});
    //setMessage('');
    setRolesList({
    // userID:'',
    // userUsername:'',
    // userPassword:'',
    // userRoleID:'',
    // userName:'',
    // userContact:'',
    // userAddress:'',
    // userStatus:'Roles Status'
    })
    
    fetchRoles();
    fetchModules();
    setOnOff(false);
  };


  const handleOkModule = () => {
    setmodalModule({Visible: false});
    fetchRoles();
    fetchModules();
    setSelectedModules([]);
    
   
    setOnOff(false);
  };
  
  console.log(selectedModules);
  //For Edit Modal
  const showUpdateModal = () => {
    setBtnType('Update');
    setmodalRoles({Title: 'Update Roles', Visible: true});
  };

  //pag load ng page at show ng data sa table
  useEffect(() => {
    fetchRoles();
    fetchModules();
    return () => {  
      abortController.abort();  
    }
    
  }, []);

  

  //pag add and update ng data
  const handleSubmitRoles = () => {
    console.log("handleSubmitRoles");
    if(btnType === 'Add'){
      if(rolesList.userRolename.trim().length === 0){
        message.error('The Roles Name is Empty!');
      }
      else{
         Axios.post(`${mainApi}/api/roles/insert`, {
          userRolename: rolesList.userRolename,
        }).then((response) => {
          console.log(response.data.message);
          if (response.data.message==="Username already Exist"){
            openNotificationWithIconExist("error");
          }
            else{
            openNotificationWithIconInsert("success");
            console.log('Data added successfully');
            handleOkRoles();
            }
          
        }).catch((err) => {
          
          
          openNotificationWithIconError("error");
          alert(err.response.data);
          handleOkRoles();
          
        });
      }
      
    }else if(btnType === 'Update'){

      //code for update
      Axios.put(`${mainApi}/api/roles/update/${rolesList.userRoleID}`, {
        userRolename: rolesList.userRolename,
      }).then((response) => {
        console.log(rolesList.userRoleID);
        if (response.data.message==="Username already Exist"){
          openNotificationWithIconExist("error");
        }
          else{
          openNotificationWithIconUpdate("info");
          console.log('Data updated successfully');
          handleOkRoles();
          }
        
      }).catch((err) => {   
        openNotificationWithIconUpdate('info');
        alert(err.response.data);
        handleOkRoles();
        
      });
    }
    else{
      openNotificationWithIconError('error');
    }
  };
  

   //pag add and update ng data
   const handleSubmitModules = () => {
    console.log(AdduserRoleID);
    if(btnType === 'Add'){
      if(selectedModules.length === 0){
        message.error('The Modules are Empty!');
      }
      else{
         Axios.post(`${mainApi}/api/roles/module/insert`, {
          userRoleID: AdduserRoleID,
          moduleID: selectedModules,
        }).then((response) => {     
            openNotificationWithIconInsert("success");
            console.log('Data added successfully');
            handleOkModule();
            
          
        }).catch((err) => {
          
          
          openNotificationWithIconError("error");
          alert(err.response.data);
          handleOkModule();
          
        });
      }
      
    }else if(btnType === 'Update'){

      //code for update
      Axios.put(`${mainApi}/api/roles/update/${rolesList.userRoleID}`, {
        
        userRolename: rolesList.userRolename,
      }).then((response) => {
        console.log(rolesList.userRoleID);
        if (response.data.message==="Username already Exist"){
          openNotificationWithIconExist("error");
        }
          else{
          openNotificationWithIconUpdate("info");
          console.log('Data updated successfully');
          handleOkRoles();
          }
        
      }).catch((err) => {   
        openNotificationWithIconUpdate('info');
        alert(err.response.data);
        handleOkRoles();
        
      });
    }
    else{
      openNotificationWithIconError('error');
    }
  };
  


  //pag show ng data para sa update
  const showDataToModal = (userID) => {
    Axios.get(`${mainApi}/api/roles/get/${userID}`).then((resp)=>{
        setRolesList(resp.data);
        console.log(rolesList);
        showUpdateModal();
        fetchRoles();
        fetchModules();
  })}

  //pag remove ng roles
  const removeBrand = (brandID) => {
    if(window.confirm('Are you sure that you wanted to delete this roles?')){
      Axios.delete(`${mainApi}/api/roles/remove/${brandID}`);
      openNotificationWithIconDelete('warning');
      setCount(() => count + 1)
    }
  }

  //For the column of the table
    interface DataType {
      key: React.Key;
      brand_name: string;
      status: string;
    }

    const rolesTblGrid: ColumnsType<DataType> = [
      
      {
        title: 'Roles Name',
        dataIndex: 'userRolename',
        defaultSortOrder: 'descend',
        align: 'center',
        // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
        sortDirections: ['descend', 'ascend'],
        render: (text, record) => {
          return <p style={{textTransform: 'capitalize'}}>{text}</p>
        }
      },
      
      {
        key: 'userRoleID',
        dataIndex: 'userRoleID',
        title: 'Actions',
        align: 'center',
        width: '120px',
        render:(_,record) =>
        <Space align='end'>
        <Button className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto w-10 sm:w-10 md:w-32 md:p-4' style={{backgroundColor: "#46E4AC", borderRadius: 5}} onClick={()=>
          {setAdduserRoleID(record.userRoleID); showAddModalModules(record.userRoleID);fetchSelectedModules(record.userRoleID)  }}>
          <img className='w-auto h-5 sm:w-auto md:w-5 mr-2 sm:mr-0 md:mr-2 sm:mx-auto object-scale-down' src={add}/>
          <p className='invisible text-black text-xs font-semibold md:visible lg:flex sm:invisible'>Modify Modules</p>
        </Button>

        <Button style={{backgroundColor: '#83D2FF'}} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto -mr-3 w-10 sm:w-10 md:w-10 md:p-3 md:pl-3 sm:pr-2.5' onClick={()=> {
            showDataToModal(record.userRoleID);
            setCount((c) => c + 1);
        }}>
          <img className='w-auto h-5 sm:w-auto md:w-10 md:h-5 mr-2 sm:mr-0 md:mr-2 sm:mx-auto object-scale-down' src={edit}/>
        </Button>

        {/* <Button style={{backgroundColor: "#ED5264", marginLeft: 12}} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto w-10 sm:w-10 md:w-10 md:p-3 md:pl-3 sm:pr-2.5' onClick={() => {
           // removeAttribute(record.Attr_ID);
            setCount((c) => c + 1);
        }}>
          <img className='w-auto h-5 sm:w-auto md:w-5 mr-2 sm:mr-0 md:mr-2 sm:mx-auto object-scale-down' src={archive}/>
        </Button> */}

      </Space>
      },
    ];

    // post the data from db to the table
   


    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
      console.log('params', pagination, filters, sorter, extra);
    };

  return (
    <div className='md:m-10 mt-20 mx-8'>
      <Header title='Accounts'/>

        <div className='m-2 md:m-10 p-2 md:px-10 pb-5 bg-white rounded-xl shadow-md'>

          <div className='flex w-full h-12 mt-2'>
            <p className='my-auto w-auto sm:w-34 md:w-72 px-4 font-bold'>Roles</p>

             <div className='relative w-full'>
              <div className='absolute right-0 w-34'>
                
              <Button onClick={showAddModalRoles} type='button' size='sm' style={{backgroundColor: '#83D2FF'}} className='hover:bg-blue-400 text-black py-1 pl-2 pr-0 h-10 rounded inline-flex items-center my-1 mr-3 w-10 sm:w-10 md:w-auto md:p-4'>
                  <img alt='' className='w-auto h-6 sm:w-auto md:w-6 mr-2 sm:mr-0 md:mr-2 sm:mx-auto object-scale-down' src={add}/>
                  <p className='invisible text-sm font-semibold md:visible lg:flex sm:invisible'>Add Roles</p>
                </Button>

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

            <Modal title={modalRoles.Title} visible={modalRoles.Visible} onOk={handleOkRoles} onCancel={handleOkRoles}
                  footer={[
                    <Button key="submit" size='sm' style={{backgroundColor: '#14D89A'}} className="w-20 mr-4" type="primary" onClick={handleSubmitRoles}>{btnType}</Button>,
                    <Button key="back" size='sm' style={{backgroundColor: '#ED5264'}} className='rounded' onClick={handleOkRoles}>Cancel</Button>,
                  ]}>

                  <div className='flex flex-col gap-4'>
                    
                    
                    <div>
                      <p> Role:</p>
                    </div>
                    
                    <div>
                    <Input className='rounded-sm' value={rolesList.userRolename || ''} name="userRolename" onChange={onChangeRoles}/>
                    </div>
                  </div>
                </Modal> 

                <Modal title={modalModule.Title} visible={modalModule.Visible} onOk={handleOkModule} onCancel={handleOkModule}
                  footer={[
                    <Button key="submit" size='sm' style={{backgroundColor: '#14D89A'}} className="w-20 mr-4" type="primary" onClick={handleSubmitModules}>{btnType}</Button>,
                    <Button key="back" size='sm' style={{backgroundColor: '#ED5264'}} className='rounded' onClick={handleOkModule}>Cancel</Button>,
                  ]}>

                  <div className='flex flex-col gap-4'>
                    
                    
                    <div>
                      <p> Module :</p>
                    </div>
                    
                    <div>
                      <Select mode='multiple' className='w-full rounded-sm' placeholder="Add Modules" value={selectedModules?selectedModules:null} onChange={(value) => { setSelectedModules(value); }}>
                        {Array.from(modulesList).map((listmodules, index) => (
                        <Option key={listmodules.moduleListID} value={listmodules.moduleListID} search={listmodules.moduleName}>{listmodules.moduleName}</Option>
                      ))} 
                      </Select>
                    </div>
                  </div>
                </Modal> 

          {/* For Table */}
          <div className='m-2 my-auto bg-white rounded overflow-auto'>
            <Table bordered className='mt-14' columns={rolesTblGrid} dataSource={rolesListTable} rowKey="userRoleID" onChange={onChange}></Table>
          </div>

        </div>
    </div>
  )
}

export default Roles