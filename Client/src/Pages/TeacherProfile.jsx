import { Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { React, useState, useContext } from 'react';
import { Row, Col, Tab, Tabs, Image } from 'react-bootstrap';
import { Modal, Select, notification, message } from 'antd';
import profileIcon from '../images/teacher_icon.png';
import { AuthContext } from './ContextFiles/AuthContext';
import './css/CustomerAccount.css';
import { useEffect } from 'react';
import Axios from "axios";
import mainApi from './ContextFiles/Api';

const { Option } = Select;


const openNotificationWithIconUpdate = (type) => {
    notification[type]({
      message: "SUCCESS!",
      description: "Action Updated Successfully.",
      duration: 2,
      top: 200,
      style: {borderRadius: '5px', zIndex: 100, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'},
    });
  };
  const openNotificationWithIconInsert = (type) => {
    notification[type]({
      message: "SUCCESS!",
      description: "Action Inserted Successfully.",
      duration: 2,
      top: 150,
      style: {borderRadius: '5px', zIndex: 100, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'},
    });
  };
  const openNotificationWithIconDelete = (type) => {
    notification[type]({
      message: "SUCCESS!",
      description: "Action Deleted Successfully.",
      duration: 2,
      top: 150,
      style: {borderRadius: '5px', zIndex: 100, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'},
    });
  };
  const openNotificationWithIconError = (type) => {
    notification[type]({
      message: "ERROR!",
      description: "Something went wrong.",
      duration: 2,
      top: 150,
      style: {borderRadius: '5px', zIndex: 100, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'},
    });
  };
  const openNotificationWithIconExist = (type) => {
    notification[type]({
      message: "ERROR!",
      description: "Username already exist.",
      duration: 2,
      top: 150,
      style: {borderRadius: '5px', zIndex: 100, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'},
    });
  };

const CustomerAccount = () => {

    const [key, setKey] = useState('profile');
    const { user, verify, setLoginStatus, isLoggedIn } = useContext(AuthContext)
    const [roomList, setRoomList] = useState([]);
    const [statusList, setStatusList] = useState([]);
    const [teacherInfo, setTeacherInfo] = useState({
        teacherLocation: 0,
        teacherStatus: 0,
        teacherCurrentStatus: '',
    });
    const [currentInfo, setCurrentInfo] = useState({
        teacherLocation: 0,
        teacherStatus: 0,
        teacherCurrentStatus: '',
    });
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();

    const fetchTeacherInfo = async () => {
        const { data } = await Axios.get(`${mainApi}/api/teacher/get/${user.teacher_id}`, {signal: abortController.signal}).catch((err)=>{
          if (err.response.status===403){
            navigate('/NotAuthorizedPage')
          }
        });
        console.log("teacher data: ", data);
        setCurrentInfo({
            teacherLocation: data.location,
            teacherStatus: data.status,
            teacherCurrentStatus: data.currentStatus,
        });
    }

    const fetchRoomList = async () => {
        const { data } = await Axios.get(`${mainApi}/api/room/get/rname/active`, {signal: abortController.signal}).catch((err)=>{
        if (err.response.status===403){
            navigate('*')
        }
        });
        setRoomList(data)
    }

    const fetchStatusList = async () => {
        const { data } = await Axios.get(`${mainApi}/api/status/get/sname/active`, {signal: abortController.signal}).catch((err)=>{
        if (err.response.status===403){
            navigate('*')
        }
        });
        setStatusList(data)
    }

    useEffect(() => {
        fetchRoomList();
        fetchStatusList();
        fetchTeacherInfo();
        return () => {  
          abortController.abort();
        }
    }, [])

    
  const onChangeEmp = (e, action) => {
    setTeacherInfo({...teacherInfo, [e.target.name]: e.target.value })
  }
  
  let abortController = new AbortController();
    
  const handleOk = () => {
    setVisible(false);
    //setMessage('');
    setTeacherInfo({
        teacherLocation: 0,
        teacherStatus: 0,
        teacherCurrentStatus: '',
    })
    fetchRoomList();
    fetchStatusList();
    fetchTeacherInfo();
  };

  const handleUpdate = async () => {
    if(teacherInfo.teacherLocation === 0 || teacherInfo.teacherLocation === 'Location'){
        message.open({
            type: 'error',
            content: 'The Teacher Location is Empty!',
            className: 'custom-class',
            style: {
                marginTop: '20vh',
            },
        });
      }
      else if(teacherInfo.teacherStatus === 0 || teacherInfo.teacherStatus === 'Status'){
        message.open({
            type: 'error',
            content: 'The Teacher Status is Empty!',
            className: 'custom-class',
            style: {
                marginTop: '20vh',
            },
        });
      }
      else if(teacherInfo.teacherCurrentStatus.trim().length === 0){
        message.open({
            type: 'error',
            content: 'The Teacher Current Status is Empty!',
            className: 'custom-class',
            style: {
                marginTop: '20vh',
            },
        });
      }
      else{
         //code for update
        console.log("teacher info: ",teacherInfo);
        await Axios.put(`${mainApi}/api/teacher/update/${user.teacher_id}`, {
          teacherUsername: user.teacher_username,
          teacherPassword: '',
          teacherImage: user.teacher_image,
          teacherName: user.teacher_name,
          teacherLocation: teacherInfo.teacherLocation,
          teacherStatus: teacherInfo.teacherStatus,
          teacherAccStatus: user.acc_status,
          teacherCurrentStatus: teacherInfo.teacherCurrentStatus
        }).then((response) => {
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
  }

    return (
        <div className='py-10 bg-white account-section'>

            {/* <center><Image src={profileIcon} height='200px' width='200px' ></Image></center> */}
            <div>
                <center>
                    <Image src={profileIcon} className='w-1/2 pt-4 pb-4 md:w-1/6'></Image>
                </center>
            </div>
            <Row>
                <Col>
                    <center>
                        <h3 className='capitalize'>{user.teacher_name}</h3>
                        <hr className='customer-red-line text-[#016189]' />
                    </center>
                </Col>
                <div>
                    <div className='flex flex-col items-center justify-center'>
                        <Button className='bg-[#016189]' onClick={() => {setVisible(true)}}>
                            Update Status
                        </Button>
                    </div>
                    <div className='p-5 -mt-5 text-center'>
                        <h4 className={`uppercase ${currentInfo.teacherCurrentStatus === 'online'? 'text-green-600':'text-red-600'}`}>{currentInfo.teacherCurrentStatus}</h4>
                        <h4 className='capitalize'>Username: {user.teacher_username}</h4>
                        <h4 className='capitalize'>Location: {currentInfo.teacherLocation}</h4>
                        <h4 className='capitalize'>Status: {currentInfo.teacherStatus}</h4>
                    </div>
                </div> 
            </Row>

            <Modal title={'Update Status'} open={visible} onOk={handleOk} onCancel={handleOk} centered={true}
              footer={[
                <Button key="submit" size='sm' style={{backgroundColor: '#14D89A'}} className="mr-4 text-center" type="primary" onClick={handleUpdate}>Update</Button>,
                <Button key="back" size='sm' style={{backgroundColor: '#ED5264'}} className='rounded' onClick={handleOk}>Cancel</Button>,
              ]}>

              <div className='flex flex-col gap-2'>
                <p className='ml-5'>Choose Status Below</p>
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
              </div>
            </Modal>
        </div>
    );
}

export default CustomerAccount;