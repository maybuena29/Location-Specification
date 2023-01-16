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
import { NavLink } from 'react-router-dom';
import { Badge, Calendar, Popover, Table } from 'antd';
import { Button } from '@material-tailwind/react';
import Axios from 'axios';
import moment from 'moment';
import { FaJediOrder } from 'react-icons/fa';
import { FiBarChart } from 'react-icons/fi';
import { MdOutlineSupervisorAccount } from 'react-icons/md';
import { BiReceipt } from 'react-icons/bi';
import mainApi from "../contexts/Api";

const Dashboard = () => {

  const [expiryList, setExpiryList] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [pendingOrders, setPendingOrders] = useState([]);

  const abortController = new AbortController();

  const fetchTotalEarnings = async () => {
    await Axios.get(`${mainApi}/api/reports/get/totalearnings`, {signal: abortController.signal}).then((response)=>{
      setTotalEarnings(response.data.TotalEarnings);
    });
  }

  const fetchExpiryDate = async () => {
    await Axios.get(`${mainApi}/api/inventory/get/dashboard`, {signal: abortController.signal}).then((response)=>{
      setExpiryList(response.data);
    });
  }

  const fetchTotalOrders = async () => {
    await Axios.get(`${mainApi}/api/dashboard/get/totalorders`, {signal: abortController.signal}).then((response)=>{
      setTotalOrders(response.data.TotalOrders);
    });
  }
  
  const fetchTotalProducts = async () => {
    await Axios.get(`${mainApi}/api/dashboard/get/totalproducts`, {signal: abortController.signal}).then((response)=>{
      setTotalProducts(response.data.TotalProducts);
    });
  }
  
  const fetchTotalCustomers = async () => {
    await Axios.get(`${mainApi}/api/dashboard/get/totalcustomers`, {signal: abortController.signal}).then((response)=>{
      setTotalCustomers(response.data.TotalCustomers);
    });
  }
  
  const fetchTotalSales = async () => {
    await Axios.get(`${mainApi}/api/dashboard/get/totalsales`, {signal: abortController.signal}).then((response)=>{
      setTotalSales(response.data.TotalSales);
    });
  }
  
  const fetchPendingOrders = async () => {
    await Axios.get(`${mainApi}/api/dashboard/get/totalpending`, {signal: abortController.signal}).then((response)=>{
      setPendingOrders(response.data);
    });
  }

  useEffect(() => {
    fetchTotalEarnings();
    fetchExpiryDate();
    fetchTotalOrders();
    fetchTotalProducts();
    fetchTotalSales();
    fetchPendingOrders();
    fetchTotalCustomers();
    return () => {  
      abortController.abort();  
    }
  }, [])

  const numberFormat = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'PHP'
  }).format(value);

  const content = (item) => (
    <div className='text-center'>
      <p>{item.productName}</p>
      <p>{moment(item.inventoryDateExp).format("YYYY-MM-DD")}</p>
    </div>
  )

  const dateCellRender = (value) => {
    const stringValue = value.format("YYYY-MM-DD");
    const listData = expiryList.filter((item) => moment(item.inventoryDateExp).format("YYYY-MM-DD") === stringValue)
    const dateToday = moment();
    return (
      listData.map((item) => (
        <NavLink to={'/inventory/stocks'} key={item.inventoryID}>
          <ul className="events">
            <Popover content={content(item)} title={dateToday.isAfter(item.inventoryDateExp)? "Item Expired!" : "Near to Expire"}>
              <li className='text-xs'>
                <Badge status={dateToday.isAfter(item.inventoryDateExp)? "error" : "warning"} size={'small'} text={item.productName}/>
              </li>
            </Popover>
          </ul>
        </NavLink>
      ))
    );
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
    <div className='h-auto mt-12'>
      <div className='mx-8 mt-20 md:m-10'>
        <Header title='Dashboard'/>
      </div>
      <div className='flex flex-wrap justify-center lg:flex-nowrap'>
        <div className='w-full p-5 pt-5 m-3 overflow-hidden bg-white bg-center bg-no-repeat bg-cover border-l-4 border-transparent border-blue-400 rounded-lg shadow-lg dark:text-gray-200 dark:bg-secondary-dark-bg h-44 lg:w-80 bg-hero-pattern'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-lg font-bold text-blue-400'>Total Earnings</p>
              <p className='text-3xl font-semibold text-gray-700'>{numberFormat(totalEarnings || 0)}</p>
            </div>
          </div>
          <div className='my-auto mt-16'>
            <NavLink to={'/reports/earningreports'} className='flex'>
              <p className='text-xs text-gray-500 cursor-pointer opacity-80'>More Info</p>
              <img className='w-4 h-4 my-auto ml-3 opacity-50 cursor-pointer' src={mInfo}/>
            </NavLink>
          </div>
        </div>

        <div className='flex flex-wrap items-center justify-center gap-1 m-3'>


          <div className='w-full p-4 bg-white border-l-4 border-transparent border-red-400 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 pt-9 rounded-xl'>
            <button type='button' style={{color: 'rgb(255, 93, 108)', backgroundColor: 'rgb(255, 231, 237)'}} className='text-2xl opacity-0.9 rounded-full p-4 hover:shadow-xl'>
              <BsBoxSeam />
            </button>
            <p className='mt-3'>
              <span className='ml-2 text-xl font-semibold'>
                {totalProducts}
              </span>
            </p>
            <div className='relative'>
              <p className='mt-2 text-sm text-red-500'>
                Total Products
              </p>
              <div className='flex items-end justify-end flex-auto'>
                <NavLink to={'/products/masterlist'} className='flex md:-mt-6'>
                  <p className='text-xs text-gray-500 cursor-pointer opacity-80'>More Info</p>
                  <img className='w-4 h-4 my-auto ml-3 opacity-50 cursor-pointer' src={mInfo}/>
                </NavLink>
              </div>
            </div>
          </div>

          <div className='w-full p-4 bg-white border-l-4 border-transparent border-green-400 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 pt-9 rounded-xl'>
            <button type='button' style={{color: 'rgb(0, 194, 146)', backgroundColor: 'rgb(235, 250, 242)'}} className='text-2xl opacity-0.9 rounded-full p-4 hover:shadow-xl'>
              <MdOutlineSupervisorAccount />
            </button>
            <p className='mt-3'>
              <span className='ml-2 text-xl font-semibold'>
                {totalCustomers || 0}
              </span>
            </p>
            <div className='relative'>
              <p className='mt-2 text-sm text-green-700'>
                Total Customers
              </p>
              <div className='flex items-end justify-end flex-auto'>
                <NavLink to={'/users/customeracc'} className='flex md:-mt-6'>
                  <p className='text-xs text-gray-500 cursor-pointer opacity-80'>More Info</p>
                  <img className='w-4 h-4 my-auto ml-3 opacity-50 cursor-pointer' src={mInfo}/>
                </NavLink>
              </div>
            </div>
          </div>

            <div className='w-full p-4 bg-white border-l-4 border-transparent border-indigo-400 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 pt-9 rounded-xl'>
              <button type='button' style={{color: 'rgb(60, 34, 174)', backgroundColor: 'rgb(240, 222, 255)'}} className='text-2xl opacity-0.9 rounded-full p-4 hover:shadow-xl'>
                <FiBarChart />
              </button>
              <p className='mt-3'>
                <span className='ml-2 text-xl font-semibold'>
                  {numberFormat(totalSales)}
                </span>
              </p>
              <div className='relative'>
                <p className='mt-2 text-sm text-indigo-400'>
                  Total Sales
                </p>
                <div className='flex items-end justify-end flex-auto'>
                  <NavLink to={'/reports/earningreports'} className='flex md:-mt-6'>
                    <p className='text-xs text-gray-500 cursor-pointer opacity-80'>More Info</p>
                    <img className='w-4 h-4 my-auto ml-3 opacity-50 cursor-pointer' src={mInfo}/>
                  </NavLink>
                </div>
              </div>
            </div>

            <div className='w-full p-4 bg-white border-l-4 border-transparent border-yellow-600 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 pt-9 rounded-xl'>
              <button type='button' style={{color: 'rgb(206, 216, 0)', backgroundColor: 'rgb(254, 255, 179)'}} className='text-2xl opacity-0.9 rounded-full p-4 hover:shadow-xl'>
                <BiReceipt />
              </button>
              <p className='mt-3'>
                <span className='ml-2 text-xl font-semibold'>
                  {totalOrders}
                </span>
              </p>
              <div className='relative'>
                <p className='mt-2 text-sm text-yellow-800'>
                  Total Orders
                </p>
                <div className='flex items-end justify-end flex-auto'>
                  <NavLink to={'/pos/orders'} className='flex md:-mt-6'>
                    <p className='text-xs text-gray-500 cursor-pointer opacity-80'>More Info</p>
                    <img className='w-4 h-4 my-auto ml-3 opacity-50 cursor-pointer' src={mInfo}/>
                  </NavLink>
                </div>
              </div>
            </div>

        </div>
      </div>
      
      <div className='flex flex-col lg:flex-row'>

        <div className='flex w-full mb-5 lg:w-2/3 lg:ml-10'>
          <div className='w-full p-2 pb-5 m-2 bg-white shadow-md md:my-10 md:px-10 rounded-xl'>
            <div className='flex w-full h-12 mt-2'>
              <p className='w-auto px-4 my-auto font-bold sm:w-34 md:w-72'>Calendar</p>
            </div>
            <div style={{borderColor: "#747C95"}} className="w-full mb-5 border-b-2 rounded "></div>
            <div className='my-auto overflow-scroll bg-white rounded'>
              <Calendar className='shadow-md rounded-2xl h-96' dateCellRender={dateCellRender}/>
            </div>
          </div>
        </div>

        <div className='flex w-full h-auto lg:w-1/3 lg:mr-10'>
          <div className='w-full p-2 pb-5 m-2 bg-white shadow-md md:my-10 md:px-10 rounded-xl'>
            <div className='flex w-full h-12 mt-2'>
              <p className='w-auto px-4 my-auto font-bold sm:w-34 md:w-72'>Pending Orders</p>
              <div className='relative w-full'>
                <div className='absolute right-0 w-34'>
                  <NavLink to={'/pos/orders'}>
                    <Button type='button' size='sm' style={{backgroundColor: '#83D2FF'}} className='inline-flex items-center w-10 h-10 py-1 pl-2 pr-0 my-1 mr-3 text-black rounded hover:bg-blue-400 sm:w-10 md:w-auto md:p-4'>
                      <img alt='' className='w-auto h-4 ml-1.5 sm:w-auto md:w-4 sm:mr-0 sm:mx-auto object-scale-down' src={navArrow}/>
                    </Button>
                  </NavLink>
                </div>
              </div>  
            </div>
            <div style={{borderColor: "#747C95"}} className="w-full mb-5 border-b-2 rounded"></div>
            <div className='m-2 my-auto overflow-scroll bg-white rounded'>
              <Table bordered columns={pendingOrderGrid} dataSource={pendingOrders} className='h-96' rowKey="OrderID"></Table>
            </div>
          </div>
        </div>

      </div>
    </div>  
  )
}

export default Dashboard