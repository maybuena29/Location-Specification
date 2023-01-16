import React, { useEffect, useState } from 'react'
import { BsBoxSeam, BsCurrencyDollar } from 'react-icons/bs';
import { GoListOrdered, GoPrimitiveDot } from 'react-icons/go';
import { Stacked, Pie, SparkLine } from '../components';
import  { earningData, SparklineAreaData, ecomPieChartData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import { Header } from '../components';
import mInfo from '../Images/moreInfoBlack.png';
import navArrow from '../Images/navArrow.png';
import earnIcon from '../Images/earning.png';
import { Area, Bar, Column, Line } from '@ant-design/plots';
import { NavLink,useNavigate } from 'react-router-dom';
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

const EarningReports = () => {

  // const [expiryList, setExpiryList] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalStocks, setTotalStocks] = useState(0);
  const [dailyEarnings, setDailyEarnings] = useState([]);
  const [weeklyEarnings, setWeeklyEarnings] = useState([]);
  const [monthlyEarnings, setMonthlyEarnings] = useState([]);
  const [yearlyEarnings, setYearlyEarnings] = useState([]);
  const [brandSales, setBrandSales] = useState([]);
  const [categorySales, setCategorySales] = useState([]);
  const [earningTable, setEarningTable] = useState([]);
  const [salesType, setSalesType] = useState('Daily');

  const abortController = new AbortController();
  
 
  const api = 'http://localhost:3001';
  const navigate = useNavigate();
  useEffect(() => {
    fetchVerify();
    fetchDailyEarnings();
    fetchWeeklyEarnings();
    fetchMonthlyEarnings();
    fetchYearlyEarnings();
    fetchTotalEarnings();
    fetchTotalExpense();
    fetchTotalSales();
    fetchTotalOrders();
    fetchTotalStocks();
    fetchBrandSales();
    fetchCategorySales();
    return () => {  
      abortController.abort();
    }
  }, [])

  const fetchVerify= async () => {
    await Axios.get(`${mainApi}/api/reports/get/verify`, {signal: abortController.signal}).then((response)=>{
     
    }).catch((err)=>{
      if (err.response.status===403){
        console.log("error");
        navigate('/NotAuthorizedPage')
      }
      
    });
  }

  const fetchDailyEarnings = () => {
    fetch(`${mainApi}/api/reports/get/earnings/daily/data`)
      .then((response) => response.json())
      .then((json) => setDailyEarnings(json))
      .catch((error) => {
        if (error.response.status===403){
          navigate('/NotAuthorizedPage')
        }
        
      
        console.log('fetch data failed', error);
      });
  };

  const fetchWeeklyEarnings = () => {
    fetch(`${mainApi}/api/reports/get/earnings/weekly/data`)
      .then((response) => response.json())
      .then((json) => setWeeklyEarnings(json))
      .catch((error) => {
        if (error.response.status===403){
          navigate('/NotAuthorizedPage')
        }
        console.log('fetch data failed', error);
      });
  };

  const fetchMonthlyEarnings = () => {
    fetch(`${mainApi}/api/reports/get/earnings/monthly/data`)
      .then((response) => response.json())
      .then((json) => setMonthlyEarnings(json))
      .catch((error) => {
        if (error.response.status===403){
          navigate('/NotAuthorizedPage')
        }
        console.log('fetch data failed', error);
      });
  };

  const fetchYearlyEarnings = () => {
    fetch(`${mainApi}/api/reports/get/earnings/yearly/data`)
      .then((response) => response.json())
      .then((json) => setYearlyEarnings(json))
      .catch((error) => {
        if (error.response.status===403){
          navigate('/NotAuthorizedPage')
        }
        console.log('fetch data failed', error);
      });
  };

  const fetchTotalEarnings = async () => {
    await Axios.get(`${mainApi}/api/reports/get/totalearnings`, {signal: abortController.signal}).then((response)=>{
      setTotalEarnings(response.data.TotalEarnings);
    }).catch((err)=>{
      if (err.response.status===403){
        navigate('/NotAuthorizedPage')
      }
      
    });
  }
  
  const fetchTotalExpense = async () => {
    await Axios.get(`${mainApi}/api/reports/get/totalexpenses`, {signal: abortController.signal}).then((response)=>{
      setTotalExpense(response.data.TotalExpense);
    }).catch((err)=>{
      if (err.response.status===403){
        navigate('/NotAuthorizedPage')
      }
      
    });
  }
  
  const fetchTotalSales = async () => {
    await Axios.get(`${mainApi}/api/reports/get/totalsales`, {signal: abortController.signal}).then((response)=>{
      setTotalSales(response.data.TotalSales);
    }).catch((err)=>{
      if (err.response.status===403){
        navigate('/NotAuthorizedPage')
      }
      
    });
  }
  
  const fetchTotalOrders = async () => {
    await Axios.get(`${mainApi}/api/reports/get/totalorders`, {signal: abortController.signal}).then((response)=>{
      setTotalOrders(response.data.TotalOrder);
    }).catch((err)=>{
      if (err.response.status===403){
        navigate('/NotAuthorizedPage')
      }
      
    });
  }
  
  const fetchTotalStocks = async () => {
    await Axios.get(`${mainApi}/api/reports/get/totalstocks`, {signal: abortController.signal}).then((response)=>{
      setTotalStocks(response.data.TotalStocks);
    }).catch((err)=>{
      if (err.response.status===403){
        navigate('/NotAuthorizedPage')
      }
      
    });
  }
  
  const fetchBrandSales = async () => {
    await Axios.get(`${mainApi}/api/reports/get/brand/sales/data`, {signal: abortController.signal}).then((response)=>{
      setBrandSales(response.data);
    }).catch((err)=>{
      if (err.response.status===403){
        navigate('/NotAuthorizedPage')
      }
      
    });
  }
  
  const fetchCategorySales = async () => {
    await Axios.get(`${mainApi}/api/reports/get/category/sales/data`, {signal: abortController.signal}).then((response)=>{
      setCategorySales(response.data);
    }).catch((err)=>{
      if (err.response.status===403){
        navigate('/NotAuthorizedPage')
      }
      
    });
  }

  const numberFormat = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'PHP'
  }).format(value);

  interface DataType {
    key: React.Key;
    brand_name: string;
    status: string;
  }

  const DailyEarningTblGrid: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'Name',
      defaultSortOrder: 'descend',
      align: 'center',
      // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
      sortDirections: ['descend', 'ascend'],
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    {
      title: 'Total',
      dataIndex: 'Total',
      defaultSortOrder: 'descend',
      align: 'center',
      // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
      sortDirections: ['descend', 'ascend'],
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{numberFormat(text)}</p>
      }
    },
    // {
    //   title: 'Year',
    //   dataIndex: 'Year',
    //   defaultSortOrder: 'descend',
    //   align: 'center',
    //   // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
    //   sortDirections: ['descend', 'ascend'],
    //   render: (text, record) => {
    //     return <p style={{textTransform: 'capitalize'}}>{text}</p>
    //   }
    // },
    {
      title: 'Month',
      dataIndex: 'Month',
      defaultSortOrder: 'descend',
      align: 'center',
      // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
      sortDirections: ['descend', 'ascend'],
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    // {
    //   title: 'Week',
    //   dataIndex: 'Week',
    //   defaultSortOrder: 'descend',
    //   align: 'center',
    //   // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
    //   sortDirections: ['descend', 'ascend'],
    //   render: (text, record) => {
    //     return <p style={{textTransform: 'capitalize'}}>{text}</p>
    //   }
    // },
    {
      title: 'Day',
      dataIndex: 'Day',
      defaultSortOrder: 'descend',
      align: 'center',
      // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
      sortDirections: ['descend', 'ascend'],
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
  ]; 

  const WeeklyEarningTblGrid: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'Name',
      defaultSortOrder: 'descend',
      align: 'center',
      // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
      sortDirections: ['descend', 'ascend'],
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    {
      title: 'Total',
      dataIndex: 'Total',
      defaultSortOrder: 'descend',
      align: 'center',
      // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
      sortDirections: ['descend', 'ascend'],
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{numberFormat(text)}</p>
      }
    },
    // {
    //   title: 'Year',
    //   dataIndex: 'Year',
    //   defaultSortOrder: 'descend',
    //   align: 'center',
    //   // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
    //   sortDirections: ['descend', 'ascend'],
    //   render: (text, record) => {
    //     return <p style={{textTransform: 'capitalize'}}>{text}</p>
    //   }
    // },
    {
      title: 'Month',
      dataIndex: 'Month',
      defaultSortOrder: 'descend',
      align: 'center',
      // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
      sortDirections: ['descend', 'ascend'],
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    {
      title: 'Week',
      dataIndex: 'Week',
      defaultSortOrder: 'descend',
      align: 'center',
      // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
      sortDirections: ['descend', 'ascend'],
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    // {
    //   title: 'Day',
    //   dataIndex: 'Day',
    //   defaultSortOrder: 'descend',
    //   align: 'center',
    //   // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
    //   sortDirections: ['descend', 'ascend'],
    //   render: (text, record) => {
    //     return <p style={{textTransform: 'capitalize'}}>{text}</p>
    //   }
    // },
  ]; 
  const MonthlyEarningTblGrid: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'Name',
      defaultSortOrder: 'descend',
      align: 'center',
      // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
      sortDirections: ['descend', 'ascend'],
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    {
      title: 'Total',
      dataIndex: 'Total',
      defaultSortOrder: 'descend',
      align: 'center',
      // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
      sortDirections: ['descend', 'ascend'],
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{numberFormat(text)}</p>
      }
    },
    {
      title: 'Year',
      dataIndex: 'Year',
      defaultSortOrder: 'descend',
      align: 'center',
      // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
      sortDirections: ['descend', 'ascend'],
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    {
      title: 'Month',
      dataIndex: 'Month',
      defaultSortOrder: 'descend',
      align: 'center',
      // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
      sortDirections: ['descend', 'ascend'],
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    // {
    //   title: 'Week',
    //   dataIndex: 'Week',
    //   defaultSortOrder: 'descend',
    //   align: 'center',
    //   // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
    //   sortDirections: ['descend', 'ascend'],
    //   render: (text, record) => {
    //     return <p style={{textTransform: 'capitalize'}}>{text}</p>
    //   }
    // },
    // {
    //   title: 'Day',
    //   dataIndex: 'Day',
    //   defaultSortOrder: 'descend',
    //   align: 'center',
    //   // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
    //   sortDirections: ['descend', 'ascend'],
    //   render: (text, record) => {
    //     return <p style={{textTransform: 'capitalize'}}>{text}</p>
    //   }
    // },
  ]; 
  const YearlyEarningTblGrid: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'Name',
      defaultSortOrder: 'descend',
      align: 'center',
      // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
      sortDirections: ['descend', 'ascend'],
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    {
      title: 'Total',
      dataIndex: 'Total',
      defaultSortOrder: 'descend',
      align: 'center',
      // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
      sortDirections: ['descend', 'ascend'],
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{numberFormat(text)}</p>
      }
    },
    {
      title: 'Year',
      dataIndex: 'Year',
      defaultSortOrder: 'descend',
      align: 'center',
      // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
      sortDirections: ['descend', 'ascend'],
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    // {
    //   title: 'Month',
    //   dataIndex: 'Month',
    //   defaultSortOrder: 'descend',
    //   align: 'center',
    //   // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
    //   sortDirections: ['descend', 'ascend'],
    //   render: (text, record) => {
    //     return <p style={{textTransform: 'capitalize'}}>{text}</p>
    //   }
    // },
    // {
    //   title: 'Week',
    //   dataIndex: 'Week',
    //   defaultSortOrder: 'descend',
    //   align: 'center',
    //   // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
    //   sortDirections: ['descend', 'ascend'],
    //   render: (text, record) => {
    //     return <p style={{textTransform: 'capitalize'}}>{text}</p>
    //   }
    // },
    // {
    //   title: 'Day',
    //   dataIndex: 'Day',
    //   defaultSortOrder: 'descend',
    //   align: 'center',
    //   // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
    //   sortDirections: ['descend', 'ascend'],
    //   render: (text, record) => {
    //     return <p style={{textTransform: 'capitalize'}}>{text}</p>
    //   }
    // },
  ]; 


  const earningOverview = {
    data: salesType === 'Daily'? dailyEarnings : (salesType === 'Weekly'? weeklyEarnings : (salesType === 'Monthly'? monthlyEarnings : yearlyEarnings)),
    isGroup: true,
    xField: salesType === 'Daily'? 'Day' : (salesType === 'Weekly'? 'Week' : (salesType === 'Monthly'? 'Month' : 'Year')),
    yField: 'Total',
    seriesField: 'Name',
    dodgePadding: 2,
    intervalPadding: 20,
    yAxis: {
      label: {
        formatter: (v) => `₱${(v / 1).toFixed(2)}`,
      },
      title: {
        text: 'Total',
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
    tooltip: {
      formatter: (data) => {
        return { name: data.Name, value: numberFormat(data.Total) };
      },
    },
    startOnZero: true,
    isStack: false,
    maxColumnWidth: 70,
    intervalPadding: 250,
    label: {
      formatter: (v) => `${numberFormat(v.Total)}`,
      position: 'middle',
      layout: [
        {
          type: 'interval-adjust-position',
        },
        {
          type: 'interval-hide-overlap',
        },
        {
          type: 'adjust-color',
        },
      ],
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

  const salesPerBrand = {
    data: brandSales,
    xField: 'TotalSales',
    yField: 'Brand',
    legend: {
      position: 'top-left',
    },
    xAxis: {
      label: {
        formatter: (v) => `${numberFormat(v)}`,
      },
    },
    tooltip: {
      formatter: (data) => {
        return { name: data.Brand, value: numberFormat(data.TotalSales) };
      },
    },
    maxBarWidth: 40,
    barBackground: {
      style: {
        fill: 'rgba(0,0,0,0.1)',
      },
    },
    interactions: [
      {
        type: 'active-region',
        enable: false,
      },
    ],
  };

  const salesPerCategory = {
    data: categorySales,
    xField: 'TotalSales',
    yField: 'Category',
    legend: {
      position: 'top-left',
    },
    xAxis: {
      label: {
        formatter: (v) => `${numberFormat(v)}`,
      },
    },
    tooltip: {
      formatter: (data) => {
        return { name: data.Category, value: numberFormat(data.TotalSales) };
      },
    },
    maxBarWidth: 40,
    barBackground: {
      style: {
        fill: 'rgba(0,0,0,0.1)',
      },
    },
    interactions: [
      {
        type: 'active-region',
        enable: false,
      },
    ],
  };

  return (
    <div className='mt-12 h-auto'>
      <div className='md:m-10 mt-20 mx-8'>
        <Header title='Earning Reports'/>
      </div>
      <div className='flex flex-wrap lg:flex-nowrap justify-center lg:px-10'>
        <div className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-36 rounded-lg w-full lg:w-1/3 p-5 pt-5 m-3 border-blue-400 border-transparent border-l-4 shadow-lg overflow-hidden bg-no-repeat bg-cover bg-center'>
          <div className='flex justify-between items-center'>
            <div className='z-10'>
              <p className='text-2xl text-gray-700 font-semibold mt-5 z-50'>{numberFormat(totalEarnings || 0)}</p>
              <p className='font-medium text-blue-400 text-lg mt-5'>Total Earnings</p>
            </div>
            <div className='relative w-auto'>
              <div className='absolute right-0 w-34 -bottom-5'>
                <button type='button' style={{backgroundColor: 'rgb(219, 240, 255)'}} className='text-blue-400 lg:text-3xl sm:text-4xl z-0 text-xl opacity-0.9 rounded-full p-4 hover:shadow-xl'>
                  <FaCoins />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-36 rounded-lg w-full lg:w-1/3 p-5 pt-5 m-3 border-green-400 border-transparent border-l-4 shadow-lg overflow-hidden bg-no-repeat bg-cover bg-center'>
          <div className='flex justify-between items-center'>
            <div className='z-10'>
              <p className='text-2xl text-gray-700 font-semibold mt-5 z-50'>{numberFormat(totalSales) || '₱0'}</p>
              <p className='font-medium text-green-500 text-lg mt-5'>Total Sales</p>
            </div>
            <div className='relative w-auto'>
              <div className='absolute right-0 w-34 -bottom-5'>
                <button type='button' style={{color: 'rgb(0, 194, 146)', backgroundColor: 'rgb(235, 250, 242)'}} className='lg:text-3xl sm:text-4xl z-0 text-xl opacity-0.9 rounded-full p-4 hover:shadow-xl'>
                  <GiTwoCoins />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-36 rounded-lg w-full lg:w-1/3 p-5 pt-5 m-3 border-indigo-400 border-transparent border-l-4 shadow-lg overflow-hidden bg-no-repeat bg-cover bg-center'>
          <div className='flex justify-between items-center'>
            <div className='z-10'>
              <p className='text-2xl text-gray-700 font-semibold mt-5'>{totalOrders || '0'}</p>
              <p className='font-medium text-indigo-500 text-lg mt-5'>Total Orders</p>
            </div>
            <div className='relative w-auto'>
              <div className='absolute right-0 w-34 -bottom-5'>
                <button type='button' style={{color: 'rgb(60, 34, 174)', backgroundColor: 'rgb(240, 222, 255)'}} className='lg:text-3xl sm:text-4xl z-0 text-xl opacity-0.9 rounded-full p-4 hover:shadow-xl'>
                  <BiReceipt />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className='grid grid-flow-row-dense grid-cols-1 justify-center lg:px-10'>
        <div className='w-auto col-span-1 mb-5'>
          <div className='m-2 md:my-10 p-2 md:px-10 pb-5 bg-white rounded-xl shadow-md w-full'>
            <div className='flex w-full h-12 mt-2'>
              <p className='my-auto w-auto sm:w-34 md:w-72 px-4 font-bold'>Earning Overview</p>
            </div>
            <div style={{borderColor: "#747C95"}} className=" w-full mb-5 border-b-2 rounded"></div>
            <div className='my-auto bg-white w-full rounded p-0 overflow-scroll'>
              <Tabs defaultActiveKey="1" className='w-full' onChange={tabChange}  size='small'>
                <TabPane tab='Daily' key='1'>
                <Table bordered pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '25', '50', '100']}} columns={DailyEarningTblGrid} dataSource={dailyEarnings} rowKey={(record,index)=>index} ></Table>
                </TabPane>
                <TabPane tab='Weekly' key='2'>
                <Table bordered  pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '25', '50', '100']}} columns={WeeklyEarningTblGrid} dataSource={weeklyEarnings}
                rowKey={(record,index)=>index}></Table>
                </TabPane>
                <TabPane tab='Monthly' key='3'>
                <Table bordered  pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '25', '50', '100']}} columns={MonthlyEarningTblGrid} dataSource={monthlyEarnings} 
                rowKey={(record,index)=>index}></Table>
                </TabPane>
                <TabPane tab='Yearly' key='4'>
                <Table bordered  pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '25', '50', '100']}} columns={EarningTblGrid} dataSource={yearlyEarnings} 
                rowKey={(record,index)=>index}></Table>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </div>


    

    </div>  

  )
}

export default EarningReports