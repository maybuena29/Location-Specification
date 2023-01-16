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
import { Line } from '@ant-design/plots';
import { NavLink, useNavigate } from 'react-router-dom';
import { Badge, Calendar, Popover, Table } from 'antd';
import { Button } from '@material-tailwind/react';
import Axios from 'axios';
import moment from 'moment';
import { FaCoins, FaJediOrder } from 'react-icons/fa';
import { FiBarChart } from 'react-icons/fi';
import { MdOutlineInventory2, MdOutlineSupervisorAccount } from 'react-icons/md';
import { BiReceipt } from 'react-icons/bi';
import { GiTwoCoins } from 'react-icons/gi';
import mainApi from '../contexts/Api';

const Reports = () => {

  // const [expiryList, setExpiryList] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [totalStocks, setTotalStocks] = useState(0);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const abortController = new AbortController();

  

  useEffect(() => {
    asyncFetch();
    fetchTotalEarnings();
    fetchTotalExpense();
    fetchTotalSales();
    fetchTotalStocks();
    return () => {  
      abortController.abort();
    }
  }, [])

  const asyncFetch = () => {
    fetch(`${mainApi}/api/reports/get/itemsales/data`)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        if (error.response.status===403){
          navigate('/NotAuthorizedPage')
        }
        console.log('fetch data failed', error);
      });
  };

  // const fetchItemTotalSales = () => {
  //   // await Axios.get(`${mainApi}/api/reports/get/itemsales/data`, {signal: abortController.signal}).then((response)=>{
  //   //   setItemSalesData(response.data);
  //   // }).catch((err) => console.log(err));
  //   fetch(`https://gw.alipayobjects.com/os/bmw-prod/e00d52f4-2fa6-47ee-a0d7-105dd95bde20.json`, {signal: abortController.signal})
  //     .then((response) => response.json())
  //     .then((json) => setItemSalesData(json))
  //     .catch((error) => {
  //       console.log('fetch data failed', error);
  //     });
  // };

  const fetchTotalEarnings = async () => {
    await Axios.get(`${mainApi}/api/reports/get/totalearnings`, {signal: abortController.signal}).then((response)=>{
      setTotalEarnings(response.data.TotalEarnings);
    });
  }
  
  const fetchTotalExpense = async () => {
    await Axios.get(`${mainApi}/api/reports/get/totalexpenses`, {signal: abortController.signal}).then((response)=>{
      setTotalExpense(response.data.TotalExpense);
    });
  }
  
  const fetchTotalSales = async () => {
    await Axios.get(`${mainApi}/api/reports/get/totalsales`, {signal: abortController.signal}).then((response)=>{
      setTotalSales(response.data.TotalSales);
    });
  }
  
  const fetchTotalStocks = async () => {
    await Axios.get(`${mainApi}/api/reports/get/totalstocks`, {signal: abortController.signal}).then((response)=>{
      setTotalStocks(response.data.TotalStocks);
    });
  }

  const numberFormat = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'PHP'
  }).format(value);

  // const content = (item) => (
  //   <div className='text-center'>
  //     <p>{item.productName}</p>
  //     <p>{moment(item.inventoryDateExp).format("YYYY-MM-DD")}</p>
  //   </div>
  // )

  // const dateCellRender = (value) => {
  //   const stringValue = value.format("YYYY-MM-DD");
  //   const listData = expiryList.filter((item) => moment(item.inventoryDateExp).format("YYYY-MM-DD") === stringValue)
  //   const dateToday = moment();
  //   return (
  //     listData.map((item) => (
  //       <NavLink to={'/inventory/stocks'} key={item.inventoryID}>
  //         <ul className="events">
  //           <Popover content={content(item)} title={dateToday.isAfter(item.inventoryDateExp)? "Item Expired!" : "Near to Expire"}>
  //             <li className='text-xs'>
  //               <Badge status={dateToday.isAfter(item.inventoryDateExp)? "error" : "warning"} size={'small'} text={item.productName}/>
  //             </li>
  //           </Popover>
  //         </ul>
  //       </NavLink>
  //     ))
  //   );
  // };

  const config = {
    data,
    xField: 'Month',
    yField: 'TotalSales',
    seriesField: 'ProductName',
    yAxis: {
      label: {
        formatter: (v) => `₱${(v / 10).toFixed(2)}`,
      },
    },
    legend: {
      position: 'top',
    },
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 5000,
      },
    },
  };

  const pendingOrderGrid: ColumnsType<DataType> = [
    {
      title: 'Customer',
      dataIndex: 'CustName',
      defaultSortOrder: 'descend',
      align: 'center',
      // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
      sortDirections: ['descend', 'ascend'],
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    {
      title: 'Reference Number',
      dataIndex: 'ReferenceNumber',
      defaultSortOrder: 'descend',
      align: 'center',
      // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
      sortDirections: ['descend', 'ascend'],
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    {
      title: 'Total Products',
      dataIndex: 'TotalProducts',
      defaultSortOrder: 'descend',
      align: 'center',
      // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
      sortDirections: ['descend', 'ascend'],
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
  ];

  return (
    <div className='mt-12 h-auto'>
      <div className='md:m-10 mt-20 mx-8'>
        <Header title='Reports'/>
      </div>
      <div className='flex flex-wrap lg:flex-nowrap justify-center lg:px-10'>
        <div className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-36 rounded-lg w-full lg:w-1/4 p-5 pt-5 m-3 border-blue-400 border-transparent border-l-4 shadow-lg overflow-hidden bg-no-repeat bg-cover bg-center'>
          <div className='flex justify-between items-center'>
            <div className='z-50'>
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

        <div className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-36 rounded-lg w-full lg:w-1/4 p-5 pt-5 m-3 border-green-400 border-transparent border-l-4 shadow-lg overflow-hidden bg-no-repeat bg-cover bg-center'>
          <div className='flex justify-between items-center'>
            <div className='z-50'>
              <p className='text-2xl text-gray-700 font-semibold mt-5 z-50'>{numberFormat(totalSales) || '₱0'}</p>
              <p className='font-medium text-green-500 text-lg mt-5'>Total Sales</p>
            </div>
            <div className='relative w-auto'>
              <div className='absolute right-0 w-34 -bottom-5'>
                <button type='button' style={{color: 'rgb(0, 194, 146)', backgroundColor: 'rgb(235, 250, 242)'}} className='lg:text-3xl sm:text-4xl z-0 opacity-0.9 rounded-full p-4 hover:shadow-xl'>
                  <GiTwoCoins />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-36 rounded-lg w-full lg:w-1/4 p-5 pt-5 m-3 border-red-400 border-transparent border-l-4 shadow-lg overflow-hidden bg-no-repeat bg-cover bg-center'>
          <div className='flex justify-between items-center'>
            <div className='z-50'>
              <p className='text-2xl text-gray-700 font-semibold mt-5 z-50'>{numberFormat(totalExpense) || '₱0'}</p>
              <p className='font-medium text-red-500 text-lg mt-5'>Total Expenses</p>
            </div>
            <div className='relative w-auto'>
              <div className='absolute right-0 w-34 -bottom-5'>
                <button type='button' style={{color: 'rgb(255, 93, 108)', backgroundColor: 'rgb(255, 231, 237)'}} className='lg:text-3xl sm:text-4xl z-0 opacity-0.9 rounded-full p-4 hover:shadow-xl'>
                  <GiTwoCoins />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-36 rounded-lg w-full lg:w-1/4 p-5 pt-5 m-3 border-indigo-400 border-transparent border-l-4 shadow-lg overflow-hidden bg-no-repeat bg-cover bg-center'>
          <div className='flex justify-between items-center'>
            <div className='z-50'>
              <p className='text-2xl text-gray-700 font-semibold mt-5'>{totalStocks || '0'}</p>
              <p className='font-medium text-indigo-500 text-lg mt-5'>Total Stocks</p>
            </div>
            <div className='relative w-auto'>
              <div className='absolute right-0 w-34 -bottom-5'>
                <button type='button' style={{color: 'rgb(60, 34, 174)', backgroundColor: 'rgb(240, 222, 255)'}} className='lg:text-3xl sm:text-4xl z-0 opacity-0.9 rounded-full p-4 hover:shadow-xl'>
                  <MdOutlineInventory2 />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
      
      <div className='flex flex-col lg:flex-row'>

        <div className='flex w-full lg:w-2/3 mb-5 lg:ml-10'>
          <div className='m-2 md:my-10 p-2 md:px-10 pb-5 bg-white rounded-xl shadow-md w-full'>
            <div className='flex w-full h-12 mt-2'>
              <p className='my-auto w-auto sm:w-34 md:w-72 px-4 font-bold'>Total Earnings</p>
            </div>
            <div style={{borderColor: "#747C95"}} className=" w-full mb-5 border-b-2 rounded"></div>
            <div className='my-auto bg-white rounded overflow-scroll'>
              <Line {...config} />
            </div>
          </div>
        </div>

      {/* 
        <div className='flex lg:w-1/3 w-full h-auto lg:mr-10'>
          <div className='m-2 md:my-10 p-2 md:px-10 pb-5 bg-white rounded-xl shadow-md w-full'>
            <div className='flex w-full h-12 mt-2'>
              <p className='my-auto w-auto sm:w-34 md:w-72 px-4 font-bold'>Pending Orders</p>
              <div className='relative w-full'>
                <div className='absolute right-0 w-34'>
                  <NavLink to={'/pos/orders'}>
                    <Button type='button' size='sm' style={{backgroundColor: '#83D2FF'}} className='hover:bg-blue-400 text-black py-1 pl-2 pr-0 h-10 rounded inline-flex items-center my-1 mr-3 w-10 sm:w-10 md:w-auto md:p-4'>
                      <img alt='' className='w-auto h-4 ml-1.5 sm:w-auto md:w-4 sm:mr-0 sm:mx-auto object-scale-down' src={navArrow}/>
                    </Button>
                  </NavLink>
                </div>
              </div>  
            </div>
            <div style={{borderColor: "#747C95"}} className="w-full mb-5 border-b-2 rounded"></div>
            <div className='m-2 my-auto bg-white rounded overflow-scroll'>
              <Table bordered columns={pendingOrderGrid} dataSource={pendingOrders} className='h-96' rowKey="OrderID"></Table>
            </div>
          </div>
        </div> */}

      </div>
    </div>  
  )
}

export default Reports