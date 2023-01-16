import React, { useEffect, useState } from 'react';
import add from '../Images/add.png';
import edit from '../Images/edit.png';
import profileIcon from '../Images/teacher_icon.png';
//for data
import { Header } from '../components';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import { Modal, Input, Select, notification, Space, Table, Checkbox,message, Image} from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
//for database
import Axios from "axios";
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

const Teachers = () => {

  const search = (data) => {
    return data.filter((item) =>
      item.teacher_username.toLowerCase().includes(searchVal.toLowerCase()) ||
      item.teacher_name.toLowerCase().includes(searchVal.toLowerCase()) ||
      item.location.toLowerCase().includes(searchVal.toLowerCase()) ||
      item.status.toLowerCase().includes(searchVal.toLowerCase()) ||
      item.acc_status.toLowerCase().includes(searchVal.toLowerCase())
    )
  }

  const [count, setCount] = useState(0);
  const [OnOff, setOnOff] = useState(true);
  const navigate = useNavigate();

  const onChangeCB = (e) => {
    if (e.target.checked===true){
      setOnOff(false);
    }
    else{
      setOnOff(true);
    }
    console.log(OnOff);
  }

  const [searchVal, setSearchVal] = useState('');
  const [teacherListTable, setTeacherListTable] = useState([]);
  const [roomList, setRoomList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [teacherInfo, setTeacherInfo] = useState({
    teacherImage:'',
    teacherID:'',
    teacherUsername:'',
    teacherPassword:'',
    teacherName:'',
    teacherLocation: 0,
    teacherStatus: 0,
    teacherCurrentStatus: '',
    teacherAccStatus:'Teacher Status'
  });

  const fetchTeacherList = async () => {
    const { data } = await Axios.get(`${mainApi}/api/teacher/get`, {signal: abortController.signal}).catch((err)=>{
      if (err.response.status===403){
        navigate('/NotAuthorizedPage')
      }
    });
    setTeacherListTable(data)
  }

  const fetchRoomList = async () => {
    const { data } = await Axios.get(`${mainApi}/api/room/get/rname/active`, {signal: abortController.signal}).catch((err)=>{
      if (err.response.status===403){
        navigate('/NotAuthorizedPage')
      }
    });
    setRoomList(data)
  }

  const fetchStatusList = async () => {
    const { data } = await Axios.get(`${mainApi}/api/status/get/sname/active`, {signal: abortController.signal}).catch((err)=>{
      if (err.response.status===403){
        navigate('/NotAuthorizedPage')
      }
    });
    setStatusList(data)
  }

  const onChangeEmp = (e, action) => {
    setTeacherInfo({...teacherInfo, [e.target.name]: e.target.value })
  }
  let abortController = new AbortController();
  //For Search

  //For Modal
  const [modal, setModal] = useState({Title: '', Visible: false, });
  const [btnType, setBtnType] = useState('');
  
  //For Add Modal
  const showAddModal = () => {
    setBtnType('Add');
    setModal({Title: 'Add Teacher', Visible: true});
    setOnOff(false);
  };
  
  const UpdateEmpModal = () => {
    setBtnType('Update');
    setModal({Title: 'Update Teacher', Visible: true});
  };
// const OnchangeCB = (){
  
// }
  
  const handleOk = () => {
    setModal({Visible: false});
    setOnOff(true);
    //setMessage('');
    setTeacherInfo({
      teacherImage:'',
      teacherID:'',
      teacherUsername:'',
      teacherPassword:'',
      teacherName:'',
      teacherLocation: 0,
      teacherStatus: 0,
      teacherCurrentStatus: '',
      teacherAccStatus:'Teacher Status'
    })
    fetchTeacherList();
    fetchRoomList();
    fetchStatusList();
  };
  
  //For Edit Modal
  const showUpdateModal = () => {
    setBtnType('Update');
    setModal({Title: 'Update Teacher', Visible: true});
  };

  //pag load ng page at show ng data sa table
  useEffect(() => {
    fetchTeacherList();
    fetchRoomList();
    fetchStatusList();
    return () => {  
      abortController.abort();  
    }
  }, []);


  //pag add and update ng data
  const handleSubmit = async () => {
    if(btnType === 'Add'){
      if(teacherInfo.teacherName.trim().length === 0){
        message.error('The Teacher Name is Empty!');
      }
      else if(teacherInfo.teacherLocation === 0 || teacherInfo.teacherLocation === 'Location'){
        message.error('The Teacher Location is Empty!');
      }
      else if(teacherInfo.teacherStatus === 0 || teacherInfo.teacherStatus === 'Status'){
        message.error('The Teacher Status is Empty!');
      }
      else if(teacherInfo.teacherCurrentStatus.trim().length === 0){
        message.error('The Teacher Current Status is Empty!');
      }
      else if(teacherInfo.teacherUsername.trim().length === 0){
        message.error('The Teacher Username is Empty!');
      }
      else if(teacherInfo.teacherPassword.trim().length === 0){
        message.error('The Teacher Password is Empty!');
      }
      else if(teacherInfo.teacherAccStatus === "Teacher Status"){
        message.error('Select the Teacher\'s Account Status!');
      }
      else{
         Axios.post(`${mainApi}/api/teacher/insert`, {
          teacherUsername: teacherInfo.teacherUsername,
          teacherPassword: teacherInfo.teacherPassword,
          teacherImage : teacherInfo.teacherImage,
          teacherName: teacherInfo.teacherName,
          teacherLocation: teacherInfo.teacherLocation,
          teacherStatus : teacherInfo.teacherStatus,
          teacherAccStatus: teacherInfo.teacherAccStatus,
          teacherCurrentStatus: teacherInfo.teacherCurrentStatus
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
      //--//
      if(teacherInfo.teacherName.trim().length === 0){
        message.error('The Teacher Name is Empty!');
      }
      else if(teacherInfo.teacherLocation === 0 || teacherInfo.teacherLocation === 'Location'){
        message.error('The Teacher Location is Empty!');
      }
      else if(teacherInfo.teacherStatus === 0 || teacherInfo.teacherStatus === 'Status'){
        message.error('The Teacher Status is Empty!');
      }
      else if(teacherInfo.teacherCurrentStatus.trim().length === 0){
        message.error('The Teacher Current Status is Empty!');
      }
      else if(teacherInfo.teacherUsername.trim().length === 0){
        message.error('The Teacher Username is Empty!');
      }
      else if(teacherInfo.teacherPassword === undefined && OnOff === false){
        if (OnOff===false){
          message.error('The Teacher Password is Empty!');
        }
      }
      else if(teacherInfo.teacherAccStatus === "Teacher Status"){
        message.error('Select an Teacher Status!');
      }
      else{
         //code for update
        console.log("teacher info: ",teacherInfo);
        console.log("teacher id: ",teacherInfo.teacherID);
        await Axios.put(`${mainApi}/api/teacher/update/${teacherInfo.teacherID}`, {
          teacherUsername: teacherInfo.teacherUsername,
          teacherPassword: teacherInfo.teacherPassword,
          teacherImage: teacherInfo.teacherImage,
          teacherName: teacherInfo.teacherName,
          teacherLocation: teacherInfo.teacherLocation,
          teacherStatus: teacherInfo.teacherStatus,
          teacherAccStatus: teacherInfo.teacherAccStatus,
          teacherCurrentStatus: teacherInfo.teacherCurrentStatus
        }).then((response) => {
          console.log(teacherInfo.teacherPassword);
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
        handleOk();
      }
    }
    else{
      openNotificationWithIconError('error');
    }
  };

  //pag show ng data para sa update
  const showDataToModal = (teacherID) => {
    Axios.get(`${mainApi}/api/teacher/get/${teacherID}`).then((resp)=>{
        setTeacherInfo({
          teacherImage: resp.data.teacher_image,
          teacherID: teacherID,
          teacherUsername: resp.data.teacher_username,
          teacherPassword: '',
          teacherName:  resp.data.teacher_name,
          teacherLocation: resp.data.location,
          teacherStatus: resp.data.status,
          teacherCurrentStatus: resp.data.currentStatus,
          teacherAccStatus: resp.data.acc_status
        });
        showUpdateModal();
        fetchTeacherList();
        fetchRoomList();
        fetchStatusList();
  })}

  //pag remove ng employee
  const removeBrand = (teacherID) => {
    if(window.confirm('Are you sure that you wanted to delete this teacher\'s account?')){
      Axios.delete(`${mainApi}/api/teacher/remove/${teacherID}`);
      openNotificationWithIconDelete('warning');
      setCount(() => count + 1)
    }
  }

  //For the column of the table

    const teacherTblGrid = [
      {
        title: 'Image',
        dataIndex: 'teacher_image',
        align: 'center',
        render: (text, record) => {
          return <span style={{ textTransform: 'capitalize' }}>
                  {record.teacher_image? <Image preview={false} className='w-12 h-12' src={record.teacher_image}/>:<Image className='w-12 h-12' preview={false} src={profileIcon}/>}
               </span>
        }
      },
      {
        title: 'Username',
        dataIndex: 'teacher_username',
        align: 'center',
        sorter: (a, b) => a.teacher_username.localeCompare(b.teacher_username),
        sortDirections: ['descend', 'ascend'],
        render: (text, record) => {
          return <p>{text}</p>
        }
      },
      {
        title: 'Name',
        dataIndex: 'teacher_name',
        align: 'center',
        sorter: (a, b) => a.teacher_name.localeCompare(b.teacher_name),
        sortDirections: ['descend', 'ascend'],
        render: (text, record) => {
          return <p style={{textTransform: 'capitalize'}}>{text}</p>
        }
      },
      {
        title: 'Location',
        dataIndex: 'location',
        align: 'center',
        sorter: (a, b) => a.location.localeCompare(b.location),
        sortDirections: ['descend', 'ascend'],
        render: (text, record) => {
          return <p style={{textTransform: 'capitalize'}}>{text}</p>
        }
      },
      {
        title: 'Status',
        dataIndex: 'status',
        align: 'center',
        sorter: (a, b) => a.status.localeCompare(b.status),
        sortDirections: ['descend', 'ascend'],
        render: (text, record) => {
          return <p style={{textTransform: 'capitalize'}}>{text}</p>
        }
      },
      {
        title: 'Account Status',
        dataIndex: 'acc_status',
        align: 'center',
        sorter: (a, b) => a.acc_status.localeCompare(b.acc_status),
        sortDirections: ['descend', 'ascend'],
        render: (text, record) => {
          return <p style={{color: record.acc_status === 'active' ? 'green': 'red', textTransform: 'capitalize'}} className='font-semibold'>{text}</p>
        }
      },
      {
        key: 'userID',
        dataIndex: 'userID',
        title: 'Actions',
        align: 'center',
        width: '120px',
        render:(_,record) =>
          <Space align='end'>
            {/* For Update */}
            <Button style={{backgroundColor: '#83D2FF'}}  className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto w-10 sm:w-10 md:w-10 md:p-3 md:pl-3 sm:pr-2.5' onClick={()=> {showDataToModal(record.teacher_id);}}>
              <img className='object-scale-down w-auto h-5 mr-2 sm:w-auto md:w-10 md:h-5 sm:mr-0 sm:mx-auto' src={edit}/>
            </Button>

            {/* For Archive
            <Button style={{backgroundColor: "#ED5264", marginLeft: 12}} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto w-10 sm:w-10 md:w-10 md:p-0 sm:pr-2.5' onClick={() => {
                // removeBrand(record.BrandID);
            }}>
              <img className='object-scale-down w-auto h-5 mr-2 sm:w-auto md:w-5 sm:mr-0 md:mx-auto sm:mx-auto' src={archive}/>
            </Button> */}
          </Space>
      },
    ];

    // post the data from db to the table
   
  return (
    <div className='mx-8 mt-20 md:m-10'>
      <Header title='Teachers'/>

        <div className='p-2 pb-5 m-2 bg-white shadow-md md:m-10 md:px-10 rounded-xl'>

          <div className='flex w-full h-12 mt-2'>
            <p className='w-auto px-4 my-auto font-bold sm:w-34 md:w-72'>List of Teachers</p>

             <div className='relative w-full'>
              <div className='absolute right-0 w-34'>
                
              <Button onClick={showAddModal} type='button' size='sm' style={{backgroundColor: '#83D2FF'}} className='inline-flex items-center w-10 h-10 py-1 pl-2 pr-0 my-1 mr-3 text-black rounded hover:bg-blue-400 sm:w-10 md:w-auto md:p-4'>
                <img alt='' className='object-scale-down w-auto h-6 mr-2 sm:w-auto md:w-6 sm:mr-0 md:mr-2 sm:mx-auto' src={add}/>
                <p className='invisible text-sm font-semibold md:visible lg:flex sm:invisible'>Add Teacher</p>
              </Button>

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

            <Modal title={modal.Title} visible={modal.Visible} onOk={handleOk} onCancel={handleOk}
              footer={[
                <Button key="submit" size='sm' style={{backgroundColor: '#14D89A'}} className="w-20 mr-4" type="primary" onClick={handleSubmit}>{btnType}</Button>,
                <Button key="back" size='sm' style={{backgroundColor: '#ED5264'}} className='rounded' onClick={handleOk}>Cancel</Button>,
              ]}>

              <div className='flex flex-col gap-4'>
              <p className='ml-5'>Teacher's Information</p>
                <div>
                  <Input className='rounded-sm' value={teacherInfo.teacherName || ''} name="teacherName" placeholder="Teacher Name" onChange={onChangeEmp} />
                </div>
                <div>
                  <Select className='w-full rounded-sm' placeholder="Teacher Location" value={teacherInfo.teacherLocation || 'Location'} name="teacherLocation" onChange={(selectedLocation) =>
                      {setTeacherInfo({...teacherInfo, teacherLocation: selectedLocation})}}>
                    {Array.from(roomList).map((rList, index) => (
                      <Option value={rList.room_id} key={index}>{rList.room_name}</Option>
                    ))}
                  </Select>
                </div>
                <div>
                  <Select className='w-full rounded-sm' placeholder="Teacher Status" value={teacherInfo.teacherStatus || 'Status'}name="teacherStatus" onChange={(selectedStatus) =>
                      {setTeacherInfo({...teacherInfo, teacherStatus: selectedStatus})}}>
                    {Array.from(statusList).map((sList, index) => (
                      <Option value={sList.status_id} key={index}>{sList.status_name}</Option>
                    ))}
                  </Select>
                </div>
                <div>
                  <Select className='w-full rounded-sm' placeholder="Current Status" value={teacherInfo.teacherCurrentStatus || 'Current Status'} name="teacherCurrentStatus" onChange={(selectedCurrStatus) => 
                      {setTeacherInfo({...teacherInfo, teacherCurrentStatus: selectedCurrStatus})}}>
                    <Option value="online">Online</Option>
                    <Option value="offline">Offline</Option>
                  </Select>
                </div>
                <div>
                  <p className='ml-5'>Teacher's Credentials</p>
                </div>
                <div>
                  <Input className='rounded-sm' value={teacherInfo.teacherUsername || ''} name="teacherUsername" disabled={btnType === "Update"? true:false} placeholder="Teacher Username" onChange={onChangeEmp} />
                </div>
                <div>
                  <Input className='rounded-sm' type="password" value={teacherInfo.teacherPassword|| ''} name="teacherPassword" placeholder="Teacher Password" disabled={OnOff} onChange={onChangeEmp}  />
                    {btnType==="Update"?
                      <Checkbox checked={OnOff===true? false:true} onChange={onChangeCB}>Reset?</Checkbox>
                      :
                      null
                    }
                </div>
                <div>
                  <Select className='w-full rounded-sm' placeholder="Account Status" value={teacherInfo.teacherAccStatus || ''} name="teacherAccStatus" onChange={(selectedStatus) => 
                      {setTeacherInfo({...teacherInfo, teacherAccStatus: selectedStatus})}}>
                    <Option value="active">Active</Option>
                    <Option value="inactive">Inactive</Option>
                  </Select>
                </div>
              </div>
            </Modal>

          {/* For Table */}
          <div className='m-2 my-auto overflow-auto bg-white rounded'>
            <Table bordered className='mt-14' columns={teacherTblGrid} dataSource={search(teacherListTable)} rowKey="teacher_id"></Table>
          </div>

        </div>
    </div>
  )
}

export default Teachers