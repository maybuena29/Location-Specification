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
    userID:'',
    userUsername:'',
    userPassword:'',
    userRoleID:'',
    userName:'',
    userContact:'',
    userAddress:'',
    userStatus:'Roles Status'
  });

  const fetchEmployee= async () => {
    const { data } = await Axios.get(`${mainApi}/api/roles/get`, {signal: abortController.signal})
    setRolesListTable(data)
  }
  const [bID, setBID] = useState('');

  const onChangeRoles = (e,action) => {
    setRolesList({...rolesList, [e.target.name]: e.target.value })
  }
  let abortController = new AbortController();
  //For Search

  //For Modal
  const [modal, setModal] = useState({Title: '', Visible: false, });
  const [btnType, setBtnType] = useState('');
  
  //For Add Modal
  const showAddModal = () => {
    setBtnType('Add');
    setModal({Title: 'Add Roles', Visible: true});
  };
  const UpdateFAQModal = () => {
    setBtnType('Update');
    setModal({Title: 'Update Roles', Visible: true});
  };
// const OnchangeCB = (){
  
// }
  
  const handleOk = () => {
    setModal({Visible: false});
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
    
    fetchEmployee();
    setOnOff(false);
  };
  
  //For Edit Modal
  const showUpdateModal = () => {
    setBtnType('Update');
    setModal({Title: 'Update Roles', Visible: true});
  };

  //pag load ng page at show ng data sa table
  useEffect(() => {
    fetchEmployee();
    return () => {  
      abortController.abort();  
    }
  }, []);


  //pag add and update ng data
  const handleSubmit = () => {
    if(btnType === 'Add'){
      if(rolesList.userName.trim().length === 0){
        message.error('The Roles Name is Empty!');
      }
      else if(rolesList.userContact.trim().length === 0){
        message.error('The Roles Contact is Empty!');
      }
      else if(rolesList.userAddress.trim().length === 0){
        message.error('The Roles Address is Empty!');
      }
      else if(rolesList.userRoleID.trim().length === 0){
        message.error('The Roles Role ID is Empty!');
      }
      else if(rolesList.userUsername.trim().length === 0){
        message.error('The Roles Username is Empty!');
      }
      else if(rolesList.userPassword.trim().length === 0){
        message.error('The Roles Password is Empty!');
      }
      else if(rolesList.userStatus === "Roles Status"){
        message.error('Select an Roles Status!');
      }
      else{
         Axios.post(`${mainApi}/api/roles/insert`, {
          userName: rolesList.userName,
          userContact:  rolesList.userContact,
          userAddress : rolesList.userAddress,
          userRoleID: rolesList.userRoleID,
          userUsername:  rolesList.userUsername,
          userPassword : rolesList.userPassword,
          userStatus:rolesList.userStatus
          

        }).then((response) => {
          console.log(response.data.message);
          if (response.data.message==="Username already Exist"){
            openNotificationWithIconExist("error");
          }
            else{
            openNotificationWithIconInsert("success");
            console.log('Data updated successfully');
            handleOk();
            }
          
        }).catch((err) => {
          
          
          openNotificationWithIconError("error");
          alert(err.response.data);
          handleOk();
          
        });
      }
      
    }else if(btnType === 'Update'){

      //code for update
      Axios.put(`${mainApi}/api/roles/update/${rolesList.userID}`, {
        userName: rolesList.userName,
        userContact:  rolesList.userContact,
        userAddress : rolesList.userAddress,
        userRoleID: rolesList.userRoleID,
        userUsername:  rolesList.userUsername,
        userPassword : rolesList.userPassword,
        userStatus:rolesList.userStatus
        

      }).then((response) => {
        console.log(rolesList.userID);
        if (response.data.message==="Username already Exist"){
          openNotificationWithIconExist("error");
        }
          else{
          openNotificationWithIconUpdate("info");
          console.log('Data updated successfully');
          handleOk();
          }
        
      }).catch((err) => {
        
        
        openNotificationWithIconUpdate('info');
        alert(err.response.data);
        handleOk();
        
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
        fetchEmployee();
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
        <Button className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto w-10 sm:w-10 md:w-32 md:p-4' style={{backgroundColor: "#46E4AC", borderRadius: 5}} onClick={()=>{navigate(`/addattribute/${record.Attr_ID}`);}}>
          <img className='w-auto h-5 sm:w-auto md:w-5 mr-2 sm:mr-0 md:mr-2 sm:mx-auto object-scale-down' src={add}/>
          <p className='invisible text-black text-xs font-semibold md:visible lg:flex sm:invisible'>Add Modules</p>
        </Button>

        <Button style={{backgroundColor: '#83D2FF'}} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto -mr-3 w-10 sm:w-10 md:w-10 md:p-3 md:pl-3 sm:pr-2.5' onClick={()=> {
            showDataToModal(record.Attr_ID);
            setCount((c) => c + 1);
        }}>
          <img className='w-auto h-5 sm:w-auto md:w-10 md:h-5 mr-2 sm:mr-0 md:mr-2 sm:mx-auto object-scale-down' src={edit}/>
        </Button>

        <Button style={{backgroundColor: "#ED5264", marginLeft: 12}} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto w-10 sm:w-10 md:w-10 md:p-3 md:pl-3 sm:pr-2.5' onClick={() => {
            removeAttribute(record.Attr_ID);
            setCount((c) => c + 1);
        }}>
          <img className='w-auto h-5 sm:w-auto md:w-5 mr-2 sm:mr-0 md:mr-2 sm:mx-auto object-scale-down' src={archive}/>
        </Button>
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
            <p className='my-auto w-auto sm:w-34 md:w-72 px-4 font-bold'>Employees</p>

             <div className='relative w-full'>
              <div className='absolute right-0 w-34'>
                
              <Button onClick={showAddModal} type='button' size='sm' style={{backgroundColor: '#83D2FF'}} className='hover:bg-blue-400 text-black py-1 pl-2 pr-0 h-10 rounded inline-flex items-center my-1 mr-3 w-10 sm:w-10 md:w-auto md:p-4'>
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

            {/*<Modal title={modal.Title} visible={modal.Visible} onOk={handleOk} onCancel={handleOk}
                  footer={[
                    <Button key="submit" size='sm' style={{backgroundColor: '#14D89A'}} className="w-20 mr-4" type="primary" onClick={handleSubmit}>{btnType}</Button>,
                    <Button key="back" size='sm' style={{backgroundColor: '#ED5264'}} className='rounded' onClick={handleOk}>Cancel</Button>,
                  ]}>

                  <div className='flex flex-col gap-4'>
                  <p className='ml-5'>User Roles Informations</p>


                     <div>
                      <Input className='rounded-sm' value={rolesList||''} name="userContact"placeholder="Roles Contact" onChange={onChangeRoles}/>
                    </div>

                    <div>
                      <Input className='rounded-sm' value={rolesList|| ''} name="userAddress"placeholder="Roles Address" onChange={onChangeRoles}/>
                    </div>

                    <div>
                      <Input className='rounded-sm' value={rolesList.userRoleID|| ''} name="userRoleID" placeholder="Roles Role" onChange={onChangeRoles}/>
                    </div>
                    <div>
                      <p className='ml-5'>User Roles Credentials</p>
                    </div>
                    <div>
                      <Input className='rounded-sm' value={rolesList.userUsername|| ''} name="userUsername" disabled={btnType === "Update"? true:false} placeholder="Roles Username" onChange={onChangeRoles} />
                    </div>

                    <div>
                      <Input className='rounded-sm' type="password" value={rolesList.userPassword|| ''} name="userPassword" placeholder="Roles Password" disabled={OnOff} onChange={onChangeRoles}  />
                        {btnType==="Update"?<Checkbox onChange={onChangeCB}>Reset?</Checkbox>:null}
                    </div>         
                    
                    <div>
                      <Select className='w-full rounded-sm' placeholder="Roles Status" value={rolesList.userStatus || ''} name="userStatus" onChange={(selectedstatus) => 
                         {setRolesList({...rolesList, userStatus: selectedstatus})}}>
                        <Option value="active">Active</Option>
                        <Option value="inactive">Inactive</Option>
                      </Select>
                    </div>
                  </div>
                </Modal> */}

          {/* For Table */}
          <div className='m-2 my-auto bg-white rounded overflow-auto'>
            <Table bordered className='mt-14' columns={rolesTblGrid} dataSource={rolesListTable} rowKey="userID" onChange={onChange}></Table>
          </div>

        </div>
    </div>
  )
}

export default Roles