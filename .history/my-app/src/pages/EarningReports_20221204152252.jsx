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
  const [salesType, setSalesType] = useState('Daily');

  const abortController = new AbortController();
  
  const productGrid = [
    {
      dataIndex: 'productImage',
      title: 'Image',
      align: 'Center',
      width: '150',
      sorter: (a, b) => a.productImage.localeCompare(b.productImage),
      render: (text, record) => {
        return <span style={{ textTransform: 'capitalize' }}>
                  {record.productImage? <Image preview={false} className='w-12 h-12' src={record.productImage}/>:<Image className='w-12 h-12' preview={false} src={medLogo}/>}
               </span>
      }
    },
    {
      dataIndex: 'productName',
      title: 'Product Name',
      align: 'Center',
      width: '150',
      sorter: (a, b) => a.productName.localeCompare(b.productName),
      render: (text, record) => {
        return <span style={{ textTransform: 'capitalize' }}>{text}</span>
      }
    },
    {
      dataIndex: 'productDescription',
      title: 'Product Description',
      width: '150',
      align: 'Center',
      sorter: (a, b) => a.productDescription.localeCompare(b.productDescription),
      render: (text, record) => {
        return <span style={{ textTransform: 'capitalize' }}>{text}</span>
      }
    },
    {
      dataIndex: 'productPrice',
      title: 'Unit Price',
      width: '200',
      align: 'Center',
      sorter: {
        compare: (a, b) => a.productPrice - b.productPrice,
      },
      render: (text, record) => {
        return <span style={{ textTransform: 'capitalize' }}>₱{text}</span>
      }
    },
    {
      dataIndex: 'productCategory',
      title: 'Category',
      format: 'C2',
      align: 'Center',
      width: '150',
      sorter: (a, b) => a.productCategory.localeCompare(b.productCategory),
      render: (text, record) => {
        return <span style={{ textTransform: 'capitalize' }}>{text}</span>
      }
    },
    {
      title: 'Availability',
      dataIndex: 'productAvailability',
      align: 'Center',
      width: '100',
      sorter: (a, b) => a.productAvailability.localeCompare(b.productAvailability),
      render: (text, record) => {
        return <span style={{ textTransform: 'capitalize' }}>{text}</span>
      }
    },
    {
      title: 'Status',
      dataIndex: 'productStatus',
      sorter: (a, b) => a.productStatus.localeCompare(b.productStatus),
      render: (text, record) => {
        return <span style={{ color: record.productStatus === 'active' ? 'green' : 'red', textTransform: 'capitalize' }} className='font-semibold'>{text}</span>
      }
    },
    {
      title: 'Actions',
      dataIndex: 'productID',
      key: 'productID',
      width: '150',
      align: 'Center',
      render: (_, record) =>
        <Space align='end'>
          <Link to={`/products/update/${record.productID}`}>
            <Button style={{ backgroundColor: '#83D2FF' }} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto w-10 sm:w-10 md:w-10 md:p-3 md:pl-3 sm:pr-2.5'>
              <img className='object-scale-down w-auto h-5 mr-2 sm:w-auto md:w-10 md:h-5 sm:mr-0 sm:mx-auto' src={edit} />
            </Button>
          </Link>

          <Button style={{ backgroundColor: '#46E4AC' }} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto -mr-3 w-10 sm:w-10 md:w-10 md:p-0 sm:pr-2.5' onClick={() => {
            viewLoad(record);
            showModal();

          }}>
            <img className='object-scale-down w-auto h-5 mr-2 sm:w-auto md:w-10 md:h-5 sm:mr-0 md:mx-auto sm:mx-auto' src={view} />
          </Button>

          <Button style={{ backgroundColor: "#ED5264", marginLeft: 12 }} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto w-10 sm:w-10 md:w-10 md:p-0 sm:pr-2.5' onClick={() => {
            deleteProduct(record.productID);
          }}>
            <img className='object-scale-down w-auto h-5 mr-2 sm:w-auto md:w-5 sm:mr-0 md:mx-auto sm:mx-auto' src={archive} />
          </Button>
        </Space>

    },
  ];

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
              <Tabs defaultActiveKey="1" className='w-full' onChange={tabChange} tabPosition='right' size='small'>
                <TabPane tab='Daily' key='1'>
                  <Area {...earningOverview} /> 
                </TabPane>
                <TabPane tab='Weekly' key='2'>
                  <Area {...earningOverview} /> 
                </TabPane>
                <TabPane tab='Monthly' key='3'>
                  <Area {...earningOverview} /> 
                </TabPane>
                <TabPane tab='Yearly' key='4'>
                  <Area {...earningOverview} />
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      <div className='lg:grid lg:grid-flow-row-dense lg:grid-cols-4 -mt-16 flex flex-col justify-center lg:px-10 lg:gap-5'>
        <div className='lg:w-full w-auto col-span-2 mb-5 lg:mr-10 mr-5'>
          <div className='m-2 md:my-10 p-2 md:px-10 pb-5 bg-white rounded-xl shadow-md w-full'>
            <div className='flex w-full h-12 mt-2'>
              <p className='my-auto w-auto sm:w-34 md:w-72 px-4 font-bold'>Total Sales per Brand</p>
            </div>
            <div style={{borderColor: "#747C95"}} className=" w-full mb-5 border-b-2 rounded"></div>
            <div className='my-auto bg-white w-full rounded p-0 overflow-scroll'>
              <Bar {...salesPerBrand} />
            </div>
          </div>
        </div>

        <div className='lg:w-full w-auto col-span-2 mb-5 lg:mr-0 mr-5'>
          <div className='m-2 md:my-10 p-2 md:px-10 pb-5 bg-white rounded-xl shadow-md w-full'>
            <div className='flex w-full h-12 mt-2'>
              <p className='my-auto w-auto sm:w-34 md:w-72 px-4 font-bold'>Total Sales per Category</p>
            </div>
            <div style={{borderColor: "#747C95"}} className=" w-full mb-5 border-b-2 rounded"></div>
            <div className='my-auto bg-white w-full rounded p-0 overflow-scroll'>
              <Bar {...salesPerCategory} />
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
            <div className='m-2 my-auto overflow-auto bg-white rounded'>
          {/* <Table bordered className='mt-14' pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '25', '50', '100']}} columns={productGrid} dataSource={search(productList)} rowKey="productID"></Table> */}
        </div>
            </div>
          </div>
        </div>
      </div>

    </div>  

  )
}

export default EarningReports