import React, { useEffect, useState } from 'react'
import { BsBoxSeam, BsCurrencyDollar, BsPeopleFill } from 'react-icons/bs';
import { GoListOrdered, GoPrimitiveDot } from 'react-icons/go';
import  { earningData, SparklineAreaData, ecomPieChartData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import { Header } from '../components';
import mInfo from '../Images/moreInfoBlack.png';
import navArrow from '../Images/navArrow.png';
import earnIcon from '../Images/earning.png';
import { Bar, Line, measureTextWidth, Pie } from '@ant-design/plots';
import { NavLink, useNavigate } from 'react-router-dom';
import { Badge, Calendar, Popover, Table, Tabs } from 'antd';
import { Button } from '@material-tailwind/react';
import Axios from 'axios';
import moment from 'moment';
import { FaCoins, FaJediOrder } from 'react-icons/fa';
import { FiBarChart } from 'react-icons/fi';
import { MdOutlineInventory2, MdOutlineSupervisorAccount } from 'react-icons/md';
import { BiReceipt } from 'react-icons/bi';
import { GiTwoCoins } from 'react-icons/gi';
import mainApi from '../contexts/Api';
const TabPane = Tabs.TabPane;

const SupplierAnalytics = () => {

  // const [expiryList, setExpiryList] = useState([]);
  const [totalSupplier, setTotalSupplier] = useState([]);
  const [dailySupplier, setDailySupplier] = useState([]);
  const [weeklySupplier, setWeeklySupplier] = useState([]);
  const [monthlySupplier, setMonthlySupplier] = useState([]);
  const [yearlySupplier, setYearlySupplier] = useState([]);
  const [totalPO, setTotalPO] = useState([]);
  const [salesType, setSalesType] = useState('Daily');
  const [totalGRPO, setTotalGRPO] = useState([]);
  const [totalAP, setTotalAP] = useState([]);
  const navigate = useNavigate();
  const abortController = new AbortController();

  

  useEffect(() => {
    fetchVerify();
    fetchTotalSupplier();
    fetchTotalPO();
    fetchTotalGRPO();
    fetchTotalAP();
    return () => {  
      abortController.abort();
    }
  }, [])

  const fetchTotalSupplier = async () => {
    await Axios.get(`${mainApi}/api/reports/get/total/supplier`, {signal: abortController.signal}).then((response)=>{
      setTotalSupplier(response.data.TotalSupplier);
    });
  }

  const fetchVerify= async () => {
    await Axios.get(`${mainApi}/api/reports/get/verify`, {signal: abortController.signal}).then((response)=>{
     
    }).catch((err)=>{
      if (err.response.status===403){
        console.log("error");
        navigate('/NotAuthorizedPage')
      }
      
    });
  
  
  console.log("verify");
  }

  const fetchDailySupplier = async () => {
    await Axios.get(`${mainApi}/api/reports/get/supplier/daily/data`, {signal: abortController.signal}).then((response)=>{
      setDailySupplier(response.data);
    });
  }
  const fetchWeeklySupplier = async () => {
    await Axios.get(`${mainApi}/api/reports/get/supplier/weekly/data`, {signal: abortController.signal}).then((response)=>{
      setWeeklySupplier(response.data);
    });
  }
  const fetchMonthlySupplier = async () => {
    await Axios.get(`${mainApi}/api/reports/get/supplier/monthly/data`, {signal: abortController.signal}).then((response)=>{
      setMonthlySupplier(response.data);
    });
  }
  const fetchYearlySupplier = async () => {
    await Axios.get(`${mainApi}/api/reports/get/supplier/yearly/data`, {signal: abortController.signal}).then((response)=>{
      setYearlySupplier(response.data);
    });
  }

  const fetchTotalPO = async () => {
    await Axios.get(`${mainApi}/api/reports/get/total/po`, {signal: abortController.signal}).then((response)=>{
      setTotalPO(response.data.TotalPO);
    });
  }

  const fetchTotalGRPO = async () => {
    await Axios.get(`${mainApi}/api/reports/get/total/grpo`, {signal: abortController.signal}).then((response)=>{
      setTotalGRPO(response.data.TotalGRPO);
    });
  }

  const fetchTotalAP = async () => {
    await Axios.get(`${mainApi}/api/reports/get/total/apinvoice`, {signal: abortController.signal}).then((response)=>{
      setTotalAP(response.data.TotalAP);
    });
  }

  const numberFormat = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'PHP'
  }).format(value);

  const productSales = {
    data: salesType === 'Daily'? dailyTopEarning : (salesType === 'Weekly'? weeklyTopEarning : (salesType === 'Monthly'? monthlyTopEarning : yearlyTopEarning)),
    xField: salesType === 'Daily'? 'Day' : (salesType === 'Weekly'? 'Week' : (salesType === 'Monthly'? 'Month' : 'Year')),
    yField: 'TotalSales',
    seriesField: 'ProductName',
    yAxis: {
      label: {
        formatter: (v) => `₱${(v / 1).toFixed(2)}`,
      },
      title: {
        text: 'Sales',
      },
    },
    xAxis: {
      label: {
        formatter: (v) => salesType === 'Weekly'? `Week ${v}` : `${v}`,
      },
      title: {
        text: salesType === 'Daily'? 'Day' : (salesType === 'Weekly'? 'Week' : (salesType === 'Monthly'? 'Month' : 'Year')),
      },
    },
    isGroup: true,
    columnStyle: {
      radius: [10, 10, 0, 0],
    },
    tooltip: {
      formatter: (data) => {
        return { name: data.ProductName, value: numberFormat(data.TotalSales) };
      },
    },
    legend: {
      position: 'top',
    },
    limitInPlot: true,
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 1000,
      },
    },
  };

  const tabChange = (key: string) => {
    console.log(key);
    console.log(salesType);
    if(key === '1'){
      setSalesType('Daily');
    }else if(key === '2'){
      setSalesType('Weekly');
    }else if(key === '3'){
      setSalesType('Monthly');
    }else{
      setSalesType('Yearly');
    }
  };


  return (
    <div className='mt-12 h-auto'>
      <div className='md:m-10 mt-20 mx-8'>
        <Header title='Supplier Reports'/>
      </div>
      <div className='flex flex-wrap lg:flex-nowrap justify-center lg:px-10'>
        <div className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-36 rounded-lg w-full lg:w-1/3 p-5 pt-5 m-3 border-blue-400 border-transparent border-l-4 shadow-lg overflow-hidden bg-no-repeat bg-cover bg-center'>
          <div className='flex justify-between items-center'>
            <div className='z-10'>
              <p className='text-2xl text-gray-700 font-semibold mt-5 z-50'>{totalSupplier || '0'}</p>
              <p className='font-medium text-blue-400 text-lg mt-5'>Total Suppliers</p>
            </div>
            <div className='relative w-auto'>
              <div className='absolute right-0 w-34 -bottom-5'>
                <button type='button' style={{backgroundColor: 'rgb(219, 240, 255)'}} className='text-blue-400 lg:text-3xl sm:text-4xl z-0 text-xl opacity-0.9 rounded-full p-4 hover:shadow-xl'>
                  <BsPeopleFill />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-36 rounded-lg w-full lg:w-1/3 p-5 pt-5 m-3 border-green-400 border-transparent border-l-4 shadow-lg overflow-hidden bg-no-repeat bg-cover bg-center'>
          <div className='flex justify-between items-center'>
            <div className='z-10'>
              <p className='text-2xl text-gray-700 font-semibold mt-5 z-50'>{totalPO || '0'}</p>
              <p className='font-medium text-green-500 text-lg mt-5'>Total Purchase Order</p>
            </div>
            <div className='relative w-auto'>
              <div className='absolute right-0 w-34 -bottom-5'>
                <button type='button' style={{color: 'rgb(0, 194, 146)', backgroundColor: 'rgb(235, 250, 242)'}} className='lg:text-3xl sm:text-4xl z-0 text-xl opacity-0.9 rounded-full p-4 hover:shadow-xl'>
                  <BiReceipt />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-36 rounded-lg w-full lg:w-1/3 p-5 pt-5 m-3 border-indigo-400 border-transparent border-l-4 shadow-lg overflow-hidden bg-no-repeat bg-cover bg-center'>
          <div className='flex justify-between items-center'>
            <div className='z-10'>
              <p className='text-2xl text-gray-700 font-semibold mt-5'>{totalGRPO || '0'}</p>
              <p className='font-medium text-indigo-400 text-lg mt-5'>Total Goods Receipt</p>
            </div>
            <div className='relative w-auto'>
              <div className='absolute right-0 w-34 -bottom-5'>
                <button type='button' style={{color: 'rgb(60, 60, 204)', backgroundColor: 'rgb(240, 222, 255)'}} className='lg:text-3xl sm:text-4xl z-0 text-xl opacity-0.9 rounded-full p-4 hover:shadow-xl'>
                  <BiReceipt />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-36 rounded-lg w-full lg:w-1/3 p-5 pt-5 m-3 border-yellow-700 border-transparent border-l-4 shadow-lg overflow-hidden bg-no-repeat bg-cover bg-center'>
          <div className='flex justify-between items-center'>
            <div className='z-10'>
              <p className='text-2xl text-gray-700 font-semibold mt-5'>{totalAP || '0'}</p>
              <p className='font-medium text-yellow-800 text-lg mt-5'>Total A/P Invoice</p>
            </div>
            <div className='relative w-auto'>
              <div className='absolute right-0 w-34 -bottom-5'>
                <button type='button' style={{color: 'rgb(255, 185, 0)', backgroundColor: 'rgb(255, 233, 132)'}} className='lg:text-3xl sm:text-4xl z-0 text-xl opacity-0.9 rounded-full p-4 hover:shadow-xl'>
                  <BiReceipt />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className='lg:grid lg:grid-flow-row-dense lg:grid-cols-3 flex flex-col justify-center lg:px-10 gap-5'>
        <div className='w-auto col-span-2 mb-5 lg:mr-0 mr-5'>
          <div className='m-2 md:my-10 p-2 md:px-10 pb-5 bg-white rounded-xl shadow-md w-full'>
            <div className='flex w-full h-12 mt-2'>
              <p className='my-auto w-auto sm:w-34 md:w-72 px-4 font-bold'>Product Sales</p>
            </div>
            <div style={{borderColor: "#747C95"}} className=" w-full mb-5 border-b-2 rounded"></div>
            <div className='my-auto bg-white w-full rounded p-0 overflow-scroll'>
              <Tabs defaultActiveKey="1" className='w-full' onChange={tabChange} tabPosition='right' size='small'>
                <TabPane tab='Daily' key='1'>
                  <Line {...productSales} />
                </TabPane>
                <TabPane tab='Weekly' key='2'>
                  <Line {...productSales} />
                </TabPane>
                <TabPane tab='Monthly' key='3'>
                  <Line {...productSales} />
                </TabPane>
                <TabPane tab='Yearly' key='4'>
                  <Line {...productSales} />
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
        <div className='w-auto col-span-1 mb-5 mr-5 lg:mr-0'>
          <div className='m-2 md:my-10 p-2 md:px-10 pb-5 bg-white rounded-xl shadow-md w-full'>
            <div className='flex w-full h-12 mt-2'>
              <p className='my-auto w-auto sm:w-34 md:w-72 px-4 font-bold'>Top Products</p>
            </div>
            <div style={{borderColor: "#747C95"}} className=" w-full mb-5 border-b-2 rounded"></div>
            <div className='my-auto bg-white w-full rounded p-0 overflow-scroll'>
              <Pie {...config} />
            </div>
          </div>
        </div>
      </div>

      </div>
      
      {/* <div className='lg:grid lg:grid-flow-row-dense lg:grid-cols-3 flex flex-col justify-center lg:px-10 gap-5'>
        <div className='w-auto col-span-2 mb-5 lg:mr-0 mr-5'>
          <div className='m-2 md:my-10 p-2 md:px-10 pb-5 bg-white rounded-xl shadow-md w-full'>
            <div className='flex w-full h-12 mt-2'>
              <p className='my-auto w-auto sm:w-34 md:w-72 px-4 font-bold'>Product Sales</p>
            </div>
            <div style={{borderColor: "#747C95"}} className=" w-full mb-5 border-b-2 rounded"></div>
            <div className='my-auto bg-white w-full rounded p-0 overflow-scroll'>
              <Tabs defaultActiveKey="1" className='w-full' onChange={tabChange} tabPosition='right' size='small'>
                <TabPane tab='Daily' key='1'>
                  <Line {...productSales} />
                </TabPane>
                <TabPane tab='Weekly' key='2'>
                  <Line {...productSales} />
                </TabPane>
                <TabPane tab='Monthly' key='3'>
                  <Line {...productSales} />
                </TabPane>
                <TabPane tab='Yearly' key='4'>
                  <Line {...productSales} />
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
        <div className='w-auto col-span-1 mb-5 mr-5 lg:mr-0'>
          <div className='m-2 md:my-10 p-2 md:px-10 pb-5 bg-white rounded-xl shadow-md w-full'>
            <div className='flex w-full h-12 mt-2'>
              <p className='my-auto w-auto sm:w-34 md:w-72 px-4 font-bold'>Top Products</p>
            </div>
            <div style={{borderColor: "#747C95"}} className=" w-full mb-5 border-b-2 rounded"></div>
            <div className='my-auto bg-white w-full rounded p-0 overflow-scroll'>
              <Pie {...config} />
            </div>
          </div>
        </div>
      </div>
      <div className='lg:grid lg:grid-flow-row-dense lg:grid-cols-4 -mt-16 flex flex-col justify-center lg:px-10 gap-5'>
        <div className='w-full col-span-2 mb-5 lg:mr-10 mr-5'>
          <div className='m-2 md:my-10 p-2 md:px-10 pb-5 bg-white rounded-xl shadow-md w-full'>
            <div className='flex w-full h-12 mt-2'>
              <p className='my-auto w-auto sm:w-34 md:w-72 px-4 font-bold'>Sales per Brand</p>
            </div>
            <div style={{borderColor: "#747C95"}} className=" w-full mb-5 border-b-2 rounded"></div>
            <div className='my-auto bg-white w-full rounded p-0 overflow-scroll'>
              <Bar {...salesPerBrand} />
            </div>
          </div>
        </div>
        <div className='w-full col-span-2 mb-5 lg:mr-0 mr-5'>
          <div className='m-2 md:my-10 p-2 md:px-10 pb-5 bg-white rounded-xl shadow-md w-full'>
            <div className='flex w-full h-12 mt-2'>
              <p className='my-auto w-auto sm:w-34 md:w-72 px-4 font-bold'>Sales per Category</p>
            </div>
            <div style={{borderColor: "#747C95"}} className=" w-full mb-5 border-b-2 rounded"></div>
            <div className='my-auto bg-white w-full rounded p-0 overflow-scroll'>
              <Bar {...salesPerCategory} />
            </div>
          </div>
        </div>
      </div> */}
    </div>  
  )
}

export default SupplierAnalytics