import React, { useContext } from 'react'
import NavigationBar from './NavigationBar';
import AddImage from '../images/addimage.png';
import next from '../images/more-than.png'
import './css/Orderpres.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { Card, Col, Input, Result, Row, Tabs, Tooltip, Image } from 'antd';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Button } from 'antd';
import mainApi from './ContextFiles/Api';
import Axios from "axios";
import { SmileOutlined } from '@ant-design/icons';
import teacherIcon from '../images/teacher_icon.png'
import { AuthContext } from './ContextFiles/AuthContext';
import { useStateContext } from './ContextFiles/ContextProvider';
import {BiSearchAlt} from 'react-icons/bi'

const TabPane = Tabs.TabPane;

const OrdersList = ()=> {
    const navigate = useNavigate()
    const {user, verify, setLoginStatus, isLoggedIn}= useContext(AuthContext)
    const [searchVal, setSearchVal] = useState('');
    const [teachersList, setTeachersList] = useState([]);
    const abortController = new AbortController();

    useEffect(() => {
        fetchTeacherList();
        return () => {  
            abortController.abort();
        }
    }, [])

    const numberFormat = (value) =>
        new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'PHP'
    }).format(value);

    //For Search
    const search = (data) => {
        return data.filter((item) =>
            item.teacher_username.toLowerCase().includes(searchVal.toLowerCase()) ||
            item.teacher_name.toLowerCase().includes(searchVal.toLowerCase()) ||
            item.location.toLowerCase().includes(searchVal.toLowerCase()) ||
<<<<<<< HEAD
            item.currentStatus.toLowerCase().includes(searchVal.toLowerCase()) ||
=======
>>>>>>> 8402df3b9a9ac087268d7e830ad8b1a7d87091ae
            item.status.toLowerCase().includes(searchVal.toLowerCase())
        )
    }

    const fetchTeacherList = () => {
        Axios.get(`${mainApi}/api/teacher/get/active/account`, {signal: abortController.signal}).then((response)=>{
            setTeachersList(response.data);
          }).catch((err)=>{
            console.log('fetching error: ', err)
          });
    }

    const renderOrders = (card, index) =>{
        return (
            // <Tooltip title="Click to view status" color='#2db7f5' zIndex={50} key={index}>
                <div className='w-full' key={index}>
                    <div className='flex w-full flex-col bg-[#ffffff] rounded-lg shadow-xl p-1 cursor-pointer '>
                        {/* <div className='flex items-center justify-center w-full mt-5 text-center cursor-pointer'>
                            <img className='w-32 h-32 md:w-20 lg:h-20' src={medLogo}></img>
                        </div> */}
                        <div className='flex flex-col items-center justify-center w-full px-3 py-5 my-auto overflow-x-auto lg:justify-start lg:items-start'>
                            <div className='flex flex-col items-center justify-center'>
                                <span className='px-20 pb-10 md:pb-10 md:px-10'>
                                    {card.teacher_image? <Image preview={false} className='w-12 h-12' src={card.teacher_image}/>:<Image className='w-12 h-12' preview={false} src={teacherIcon}/>}
                                </span>
                            </div>
                            <div className='flex flex-col items-center justify-center w-full gap-1 lg:flex-row'>
                                <p className={`w-full font-semibold uppercase text-center lg:text-left ${card.currentStatus === 'online'? 'text-green-600':'text-red-600'}`}>{card.currentStatus}</p>
                            </div>
                            <div className='flex flex-col w-full gap-1 lg:flex-row'>
                                <p className='w-full font-semibold'>Teacher Name:</p>
                                <p className='w-full font-semibold text-center lg:text-left'>{card.teacher_name}</p>
                            </div>
                            {card.currentStatus === 'online'?
                                <>
                                <div className='flex flex-col w-full gap-1 lg:flex-row'>
                                    <p className='w-full'>Status: </p>
                                    <p className='w-full text-center lg:text-left'>{card.status}</p>
                                </div>
                                <div className='flex flex-col w-full gap-1 lg:flex-row'>
                                    <p className='w-full'>Location: </p>
                                    <p className='w-full text-center lg:text-left'>{card.location}</p>
                                </div>
                                </>
                            :
                                null
                            } 
                        </div>
                    </div>
                </div>
            // </Tooltip>
        );
    };

  return (
    <div className='overflow-hidden '>
        
        <div className='bg-[#f6f5f5] rounded-t-lg sm:h-full h-full sm:w-full w-full py-11 px-10 flex flex-col font-Montserrat m-auto' >
            
            <h2 className='font-bold text-center'>
                Teacher Locator
            </h2>
            <div className="flex w-full h-12 mt-2">
              <p className="w-full px-4 my-auto font-bold sm:w-34 md:w-72">
                List of Teachers
              </p>
              {/* For search bar */}
              <div className='relative w-full'>
                <div className='absolute right-0 mt-3 mr-2 lg:w-1/3'>
                    <Input style={{ fontSize: '16', borderColor: "#016189", borderRadius: '10px' }} className='w-full rounded-2xl mr-3.5 items-center font-poppins bor' placeholder='Search Teacher...' suffix={<BiSearchAlt className="text-xl" style={{color: "#016189" }}/>}
                    onChange = {(e) => {setSearchVal(e.target.value.toLowerCase())}} value={searchVal}/>
                </div>
              </div>
            </div>
            <hr className='w-full'></hr>
            
            <Tabs defaultActiveKey="0" type='card' className='w-auto' items={
                new Array(3).fill(null).map((_, i) => {
                    const id = String(i + 1);
                    if(i === 0){
                        return {
                            label: `All Teachers`,
                            key: id,
                            children: (
                                Array.from(teachersList).length === 0?
                                    <div className='flex items-center justify-center w-full py-20'>
                                        <Result
                                            className='w-full'
                                            icon={<SmileOutlined />}
                                            title="No Available Teachers"
                                            subTitle="Please contact admin to add teachers"
                                        />
                                    </div>
                                    :
                                    <div className='flex flex-col items-center justify-center gap-5 md:flex-row'>
                                        <div className='grid w-full grid-flow-row-dense grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4'>
                                            {search(teachersList).map(renderOrders)}
                                        </div>
                                    </div>
                            )
                        };
                    }else if(i === 1){
                        return {
                            label: `Online`,
                            key: id,
                            children: (
                                Array.from(teachersList).filter((e) => e.currentStatus === 'online').length === 0?
                                    <div className='flex items-center justify-center w-full py-20'>
                                        <Result
                                            className='w-full'
                                            icon={<SmileOutlined />}
                                            title="No Online Teacher"
                                            subTitle="They are probably busy this time."
                                        />
                                    </div>
                                    :
                                    <div className='flex flex-col items-center justify-center gap-5 md:flex-row'>
                                        <div className='grid w-full grid-flow-row-dense grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4'>
                                            {search(teachersList).filter((e) => e.currentStatus === 'online').map(renderOrders)}
                                        </div>
                                    </div>
                            )
                        };
                    }else{
                        return {
                            label: `Offline`,
                            key: id,
                            children: (
                                Array.from(teachersList).filter((e) => e.currentStatus === 'offline').length === 0?
                                    <div className='flex items-center justify-center w-full py-20'>
                                        <Result
                                            className='w-full'
                                            icon={<SmileOutlined />}
                                            title="No Offline Teachers."
                                            subTitle="They must be online."
                                        />
                                    </div>
                                    :
                                    <div className='flex flex-col items-center justify-center gap-5 md:flex-row'>
                                        <div className='grid w-full grid-flow-row-dense grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4'>
                                            {search(teachersList).filter((e) => e.currentStatus === 'offline').map(renderOrders)}
                                        </div>
                                    </div>
                            )
                        };
                    }
                })
            }>
            </Tabs>
        </div>
    </div>
  )
}

export default OrdersList