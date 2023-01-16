import React, { useEffect, useState } from 'react'
import { useStateContext } from '../contexts/ContextProvider';
import { Header } from '../components';
import mInfo from '../Images/moreInfoBlack.png';
import { NavLink } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import Axios from 'axios';
import mainApi from "../contexts/Api";
import { MdOutlineRoom } from 'react-icons/md';
import { FaRegListAlt } from 'react-icons/fa';

const Dashboard = () => {

  const [totalTeachers, setTotalTeachers] = useState(0);
  const [totalRooms, setTotalRooms] = useState(0);
  const [totalStatus, setTotalStatus] = useState(0);

  const abortController = new AbortController();

  const fetchTotalTeacher = async () => {
    await Axios.get(`${mainApi}/api/dashboard/get/totalteachers`, {signal: abortController.signal}).then((response)=>{
      setTotalTeachers(response.data.TotalTeachers);
    });
  }

  const fetchTotalRooms = async () => {
    await Axios.get(`${mainApi}/api/dashboard/get/totalrooms`, {signal: abortController.signal}).then((response)=>{
      setTotalRooms(response.data.TotalRooms);
    });
  }

  const fetchTotalStatus = async () => {
    await Axios.get(`${mainApi}/api/dashboard/get/totalstatus`, {signal: abortController.signal}).then((response)=>{
      setTotalStatus(response.data.TotalStatus);
    });
  }

  useEffect(() => {
    fetchTotalTeacher();
    fetchTotalRooms();
    fetchTotalStatus();
    return () => {  
      abortController.abort();  
    }
  }, [])

  const numberFormat = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'PHP'
  }).format(value);

  return (
    <div className='h-auto mt-12'>
      <div className='mx-8 mt-20 md:m-10'>
        <Header title='Dashboard'/>
      </div>
      <div className='flex flex-wrap items-center justify-center lg:flex-nowrap'>
        <div className='w-full p-5 pt-5 m-3 overflow-hidden bg-white bg-center bg-no-repeat bg-cover border-l-4 border-transparent border-blue-400 rounded-lg shadow-lg dark:text-gray-200 dark:bg-secondary-dark-bg h-44 lg:w-full bg-hero-pattern'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-lg font-bold text-blue-400'>Total Teachers</p>
              <p className='text-3xl font-semibold text-gray-700'>{totalTeachers || 0}</p>
            </div>
          </div>
          <div className='my-auto mt-16'>
            <NavLink to={'/teachers'} className='flex'>
              <p className='text-xs text-gray-500 cursor-pointer opacity-80'>More Info</p>
              <img className='w-4 h-4 my-auto ml-3 opacity-50 cursor-pointer' src={mInfo}/>
            </NavLink>
          </div>
        </div>

        <div className='flex flex-wrap items-center justify-center w-full gap-2 m-3 lg:w-full lg:gap-4'>
          <div className='w-full p-4 bg-white border-l-4 border-transparent border-red-400 dark:text-gray-200 dark:bg-secondary-dark-bg lg:w-1/3 pt-9 rounded-xl'>
            <button type='button' style={{color: 'rgb(255, 93, 108)', backgroundColor: 'rgb(255, 231, 237)'}} className='text-2xl opacity-0.9 rounded-full p-4 hover:shadow-xl'>
              <MdOutlineRoom />
            </button>
            <p className='mt-3'>
              <span className='ml-2 text-xl font-semibold'>
                {totalRooms || 0}
              </span>
            </p>
            <div className='relative'>
              <p className='mt-2 text-sm text-red-500'>
                Total Rooms
              </p>
              <div className='flex items-end justify-end flex-auto'>
                <NavLink to={'/rooms'} className='flex md:-mt-6'>
                  <p className='text-xs text-gray-500 cursor-pointer opacity-80'>More Info</p>
                  <img className='w-4 h-4 my-auto ml-3 opacity-50 cursor-pointer' src={mInfo}/>
                </NavLink>
              </div>
            </div>
          </div>

          <div className='w-full p-4 bg-white border-l-4 border-transparent border-green-400 dark:text-gray-200 dark:bg-secondary-dark-bg lg:w-1/3 pt-9 rounded-xl'>
            <button type='button' style={{color: 'rgb(0, 194, 146)', backgroundColor: 'rgb(235, 250, 242)'}} className='text-2xl opacity-0.9 rounded-full p-4 hover:shadow-xl'>
              <FaRegListAlt />
            </button>
            <p className='mt-3'>
              <span className='ml-2 text-xl font-semibold'>
                {totalStatus || 0}
              </span>
            </p>
            <div className='relative'>
              <p className='mt-2 text-sm text-green-700'>
                Total Status
              </p>
              <div className='flex items-end justify-end flex-auto'>
                <NavLink to={'/status'} className='flex md:-mt-6'>
                  <p className='text-xs text-gray-500 cursor-pointer opacity-80'>More Info</p>
                  <img className='w-4 h-4 my-auto ml-3 opacity-50 cursor-pointer' src={mInfo}/>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>  
  )
}

export default Dashboard