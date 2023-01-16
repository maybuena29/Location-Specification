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
import { Badge, Calendar, Modal, Popover, Table, Tabs } from 'antd';
import { Button } from '@material-tailwind/react';
import Axios from 'axios';
import moment from 'moment';
import { FaCoins, FaJediOrder } from 'react-icons/fa';
import { FiBarChart } from 'react-icons/fi';
import { MdOutlineInventory2, MdOutlineSupervisorAccount } from 'react-icons/md';
import { BiReceipt } from 'react-icons/bi';
import { GiTwoCoins } from 'react-icons/gi';
import mainApi from '../contexts/Api';
import print from '../Images/print.png';
import ReactToPrint from 'react-to-print';

const TabPane = Tabs.TabPane;

const Reports = () => {

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
  const [viewModal,setViewModal]= useState(false);

  //For Product Reports Variables
  const [dailyOrders, setDailyOrders] = useState([]);
  const [weeklyOrders, setWeeklyOrders] = useState([]);
  const [monthlyOrders, setMonthlyOrders] = useState([]);
  const [yearlyOrders, setYearlyOrders] = useState([]);
  const abortController = new AbortController();

  //For Supplier Reports Variables
  const [dailySupplier, setDailySupplier] = useState([]);
  const [weeklySupplier, setWeeklySupplier] = useState([]);
  const [monthlySupplier, setMonthlySupplier] = useState([]);
  const [yearlySupplier, setYearlySupplier] = useState([]);

  const [earningBtnVisible, setEarningBtnVisible] = useState(true);
 
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
    fetchDailyProductSale();
    fetchWeeklyProductSale();
    fetchMonthlyProductSale();
    fetchYearlyProductSale();
    fetchDailySupplier();
    fetchWeeklySupplier();
    fetchMonthlySupplier();
    fetchYearlySupplier();
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

  const fetchDailyProductSale = async () => {
    await Axios.get(`${mainApi}/api/reports/get/itemsales/daily/datanl`, {signal: abortController.signal}).then((response)=>{
      setDailyOrders(response.data);
    });
  }
  
  const fetchWeeklyProductSale = async () => {
    await Axios.get(`${mainApi}/api/reports/get/itemsales/weekly/datanl`, {signal: abortController.signal}).then((response)=>{
      setWeeklyOrders(response.data);
    });
  }
  
  const fetchMonthlyProductSale = async () => {
    await Axios.get(`${mainApi}/api/reports/get/itemsales/monthly/datanl`, {signal: abortController.signal}).then((response)=>{
      setMonthlyOrders(response.data);
    });
  }
  
  const fetchYearlyProductSale = async () => {
    await Axios.get(`${mainApi}/api/reports/get/itemsales/yearly/datanl`, {signal: abortController.signal}).then((response)=>{
      setYearlyOrders(response.data);
    });
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


  const numberFormat = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'PHP'
  }).format(value);

  //Grids for Earning Report
  const DailyEarningTblGrid = [
    {
      title: 'Name',
      dataIndex: 'Name',
      align: 'center',
      sorter: (a, b) => a.Name.localeCompare(b.Name),
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    {
      title: 'Total',
      dataIndex: 'Total',
      align: 'center',
      sorter: {
        compare: (a, b) => a.Total - b.Total,
      },
      sortDirections: ['descend', 'ascend'],
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{numberFormat(text)}</p>
      }
    },
    {
      title: 'Month',
      dataIndex: 'Month',
      align: 'center',
      sorter: (a, b) => a.Month.localeCompare(b.Month),
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    {
      title: 'Day',
      dataIndex: 'Day',
      align: 'center',
      sorter: (a, b) => moment(a.Day).unix() - moment(b.Day).unix(),
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
  ]; 

  const WeeklyEarningTblGrid = [
    {
      title: 'Name',
      dataIndex: 'Name',
      align: 'center',
      sorter: (a, b) => a.Name.localeCompare(b.Name),
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    {
      title: 'Total',
      dataIndex: 'Total',
      align: 'center',
      sorter: {
        compare: (a, b) => a.Total - b.Total,
      },
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{numberFormat(text)}</p>
      }
    },
    {
      title: 'Month',
      dataIndex: 'Month',
      align: 'center',
      sorter: (a, b) => a.Month.localeCompare(b.Month),
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    {
      title: 'Week',
      dataIndex: 'Week',
      align: 'center',
      sorter: (a, b) => moment(a.Week).unix() - moment(b.Week).unix(),
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
  ]; 

  const MonthlyEarningTblGrid = [
    {
      title: 'Name',
      dataIndex: 'Name',
      align: 'center',
      sorter: (a, b) => a.Name.localeCompare(b.Name),
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    {
      title: 'Total',
      dataIndex: 'Total',
      align: 'center',
      sorter: {
        compare: (a, b) => a.Total - b.Total,
      },
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{numberFormat(text)}</p>
      }
    },
    {
      title: 'Year',
      dataIndex: 'Year',
      align: 'center',
      sorter: (a, b) => moment(a.Year).unix() - moment(b.Year).unix(),
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    {
      title: 'Month',
      dataIndex: 'Month',
      align: 'center',
      sorter: (a, b) => a.Month.localeCompare(b.Month),
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
  ];

  const YearlyEarningTblGrid = [
    {
      title: 'Name',
      dataIndex: 'Name',
      align: 'center',
      sorter: (a, b) => a.Name.localeCompare(b.Name),
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    {
      title: 'Total',
      dataIndex: 'Total',
      align: 'center',
      sorter: {
        compare: (a, b) => a.Total - b.Total,
      },
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{numberFormat(text)}</p>
      }
    },
    {
      title: 'Year',
      dataIndex: 'Year',
      align: 'center',
      sorter: (a, b) => moment(a.Year).unix() - moment(b.Year).unix(),
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
  ]; 

  //Grid for Product Reports
  const DailyProductTblGrid = [
    {
      title: 'Product Name',
      dataIndex: 'ProductName',
      align: 'center',
      sorter: (a, b) => a.ProductName.localeCompare(b.ProductName),
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    {
      title: 'Total Sales',
      dataIndex: 'TotalSales',
      align: 'center',
      sorter: {
        compare: (a, b) => a.TotalSales - b.TotalSales,
      },
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{numberFormat(text)}</p>
      }
    },
    {
      title: 'Month',
      dataIndex: 'Month',
      align: 'center',
      sorter: (a, b) => a.Month.localeCompare(b.Month),
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    {
      title: 'Day',
      dataIndex: 'Day',
      align: 'center',
      sorter: (a, b) => moment(a.Day).unix() - moment(b.Day).unix(),
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
  ]; 

  const WeeklyProductTblGrid = [
    {
      title: 'Product Name',
      dataIndex: 'ProductName',
      align: 'center',
      sorter: (a, b) => a.ProductName.localeCompare(b.ProductName),
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    {
      title: 'Total Sales',
      dataIndex: 'TotalSales',
      align: 'center',
      sorter: {
        compare: (a, b) => a.TotalSales - b.TotalSales,
      },
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{numberFormat(text)}</p>
      }
    },
    {
      title: 'Month',
      dataIndex: 'Month',
      align: 'center',
      sorter: (a, b) => a.Month.localeCompare(b.Month),
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    {
      title: 'Week',
      dataIndex: 'Week',
      align: 'center',
      sorter: (a, b) => moment(a.Week).unix() - moment(b.Week).unix(),
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
  ]; 

  const MonthlyProductTblGrid = [
    {
      title: 'Product Name',
      dataIndex: 'ProductName',
      align: 'center',
      sorter: (a, b) => a.ProductName.localeCompare(b.ProductName),
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    {
      title: 'Total Sales',
      dataIndex: 'TotalSales',
      align: 'center',
      sorter: {
        compare: (a, b) => a.TotalSales - b.TotalSales,
      },
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{numberFormat(text)}</p>
      }
    },
    {
      title: 'Year',
      dataIndex: 'Year',
      align: 'center',
      sorter: (a, b) => moment(a.Year).unix() - moment(b.Year).unix(),
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    {
      title: 'Month',
      dataIndex: 'Month',
      align: 'center',
      sorter: (a, b) => a.Month.localeCompare(b.Month),
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
  ]; 

  const YearlyProductTblGrid = [
    {
      title: 'Product Name',
      dataIndex: 'ProductName',
      align: 'center',
      sorter: (a, b) => a.ProductName.localeCompare(b.ProductName),
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    {
      title: 'Total Sales',
      dataIndex: 'TotalSales',
      align: 'center',
      sorter: {
        compare: (a, b) => a.TotalSales - b.TotalSales,
      },
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{numberFormat(text)}</p>
      }
    },
    {
      title: 'Year',
      dataIndex: 'Year',
      align: 'center',
      sorter: (a, b) => moment(a.Year).unix() - moment(b.Year).unix(),
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
  ];

  //Grid for Supplier Reports
  const DailySupplierTblGrid = [
    {
      title: 'Supplier Company Name',
      dataIndex: 'SupplierName',
      align: 'center',
      sorter: (a, b) => a.SupplierName.localeCompare(b.SupplierName),
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    {
      title: 'Total Supplier Orders',
      dataIndex: 'TotalSupplierOrder',
      align: 'center',
      sorter: {
        compare: (a, b) => a.TotalSupplierOrder - b.TotalSupplierOrder,
      },
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    {
      title: 'Month',
      dataIndex: 'Month',
      align: 'center',
      sorter: (a, b) => a.Month.localeCompare(b.Month),
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    {
      title: 'Day',
      dataIndex: 'Day',
      align: 'center',
      sorter: (a, b) => moment(a.Day).unix() - moment(b.Day).unix(),
      sortDirections: ['descend', 'ascend'],
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
  ]; 
  
  const WeeklySupplierTblGrid = [
    {
      title: 'Supplier Company Name',
      dataIndex: 'SupplierName',
      align: 'center',
      sorter: (a, b) => a.SupplierName.localeCompare(b.SupplierName),
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    {
      title: 'Total Supplier Orders',
      dataIndex: 'TotalSupplierOrder',
      align: 'center',
      sorter: {
        compare: (a, b) => a.TotalSupplierOrder - b.TotalSupplierOrder,
      },
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    {
      title: 'Month',
      dataIndex: 'Month',
      align: 'center',
      sorter: (a, b) => a.Month.localeCompare(b.Month),
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    {
      title: 'Week',
      dataIndex: 'Week',
      align: 'center',
      sorter: (a, b) => moment(a.Week).unix() - moment(b.Week).unix(),
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
  ]; 
  
  const MonthlySupplierTblGrid = [
    {
      title: 'Supplier Company Name',
      dataIndex: 'SupplierName',
      align: 'center',
      sorter: (a, b) => a.SupplierName.localeCompare(b.SupplierName),
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    {
      title: 'Total Supplier Orders',
      dataIndex: 'TotalSupplierOrder',
      align: 'center',
      sorter: {
        compare: (a, b) => a.TotalSupplierOrder - b.TotalSupplierOrder,
      },
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    {
      title: 'Year',
      dataIndex: 'Year',
      align: 'center',
      sorter: (a, b) => moment(a.Year).unix() - moment(b.Year).unix(),
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    {
      title: 'Month',
      dataIndex: 'Month',
      align: 'center',
      sorter: (a, b) => a.Month.localeCompare(b.Month),
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
  ]; 
  
  const YearlySupplierTblGrid = [
    {
      title: 'Supplier Company Name',
      dataIndex: 'SupplierName',
      align: 'center',
      sorter: (a, b) => a.SupplierName.localeCompare(b.SupplierName),
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    {
      title: 'Total Supplier Orders',
      dataIndex: 'TotalSupplierOrder',
      align: 'center',
      sorter: {
        compare: (a, b) => a.TotalSupplierOrder - b.TotalSupplierOrder,
      },
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    {
      title: 'Year',
      dataIndex: 'Year',
      align: 'center',
      sorter: (a, b) => moment(a.Year).unix() - moment(b.Year).unix(),
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
  ]; 

  const handleCloseModal = () => {
    setViewModal(false);
  };

  //For Print
  let componentRefEarning = null;
  let componentRefProduct = null;
  let componentRefSupplier = null;

  const setComponentRefEarning = (ref) => {
    componentRefEarning = ref;
  };

  const setComponentRefProduct = (ref) => {
    componentRefProduct = ref;
  };

  const setComponentRefSupplier = (ref) => {
    componentRefSupplier = ref;
  };

  const reactToPrintContentEarning = () => {
    return componentRefEarning;
  };

  const reactToPrintContentProduct = () => {
    return componentRefProduct;
  };

  const reactToPrintContentSupplier = () => {
    return componentRefSupplier;
  };

  const pageStyle = `
    @page {
      size: 8.5in 11in;
      margin: 100px;
    }

    @media all {
      .pagebreak {
        display: auto;
      }
    }

    @media print {
      .pagebreak {
        page-break-before: always;
      }
    }
  `;

  return (

    <div className='mt-12 h-auto'>
      <div className='md:m-10 mt-20 mx-8'>
        <Header title='Reports'/>
      </div>
      <div className='flex flex-wrap lg:flex-nowrap justify-center lg:px-10' ref={setComponentRefEarning}>
        <div className='m-2 md:my-5 p-2 md:px-10 pb-5 bg-white rounded-xl shadow-md w-full'>
          <div className='flex w-full h-12 mt-2'>
            <p className='my-auto w-auto sm:w-34 md:w-72 px-4 font-bold'>Earning Reports</p>
            <div className='relative w-full'>
              <div className='absolute right-0 w-34'>
                <ReactToPrint key='print'
                  trigger = {() => {
                    return(
                      <Button className='inline-flex items-center w-auto my-auto mb-4 text-black rounded' style={{ backgroundColor: '#46E4AC' }}>
                        <img className='object-scale-down w-auto h-5 mr-2 md:mr-2 sm:mx-auto' src={print}/>
                        <p className='font-semibold text-black'>Print</p>
                      </Button>
                    )
                  }}
                  pageStyle={pageStyle}
                  content={reactToPrintContentEarning}
                />
              </div>
            </div>
          </div>
          
          <div style={{borderColor: "#747C95"}} className="w-full mb-5 border-b-2 rounded"></div>
          <div className='my-auto bg-white w-full rounded p-0 overflow-scroll'>
            <Tabs defaultActiveKey="1" className='w-full' size='small'>
              <TabPane tab='Daily' key='1'>
                <Table bordered pagination={false} columns={DailyEarningTblGrid} dataSource={dailyEarnings} rowKey={(record,index)=>index} ></Table>
              </TabPane>
              <TabPane tab='Weekly' key='2'>
                <Table bordered pagination={false} columns={WeeklyEarningTblGrid} dataSource={weeklyEarnings} rowKey={(record,index)=>index}></Table>
              </TabPane>
              <TabPane tab='Monthly' key='3'>
                <Table bordered pagination={false} columns={MonthlyEarningTblGrid} dataSource={monthlyEarnings} rowKey={(record,index)=>index}></Table>
              </TabPane>
              <TabPane tab='Yearly' key='4'>
                <Table bordered pagination={false} columns={YearlyEarningTblGrid} dataSource={yearlyEarnings} rowKey={(record,index)=>index}></Table>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>

      <div className='flex flex-wrap lg:flex-nowrap justify-center lg:px-10' ref={setComponentRefProduct}>
        <div className='m-2 md:my-5 p-2 md:px-10 pb-5 bg-white rounded-xl shadow-md w-full'>
          <div className='flex w-full h-12 mt-2'>
            <p className='my-auto w-auto sm:w-34 md:w-72 px-4 font-bold'>Product Reports</p>
            <div className='relative w-full'>
              <div className='absolute right-0 w-34'>
                <ReactToPrint key='print'
                  trigger = {() => {
                    return(
                      <Button className='inline-flex items-center w-auto my-auto mb-4 text-black rounded' style={{ backgroundColor: '#46E4AC' }}>
                        <img className='object-scale-down w-auto h-5 mr-2 md:mr-2 sm:mx-auto' src={print}/>
                        <p className='font-semibold text-black'>Print</p>
                      </Button>
                    )
                  }}
                  pageStyle={pageStyle}
                  content={reactToPrintContentProduct}
                />
              </div>
            </div>
          </div>
          
          <div style={{borderColor: "#747C95"}} className=" w-full mb-5 border-b-2 rounded"></div>
          <div className='my-auto bg-white w-full rounded p-0 overflow-scroll'>
            <Tabs defaultActiveKey="1" className='w-full' size='small'>
              <TabPane tab='Daily' key='1'>
                <Table  bordered pagination={false} columns={DailyProductTblGrid} dataSource={dailyOrders} rowKey={(record,index)=>index} ></Table>
              </TabPane>
              <TabPane tab='Weekly' key='2'>
                <Table bordered pagination={false} columns={WeeklyProductTblGrid} dataSource={weeklyOrders} rowKey={(record,index)=>index}></Table>
              </TabPane>
              <TabPane tab='Monthly' key='3'>
                <Table bordered pagination={false} columns={MonthlyProductTblGrid} dataSource={monthlyOrders} rowKey={(record,index)=>index}></Table>
              </TabPane>
              <TabPane tab='Yearly' key='4'>
                <Table bordered pagination={false} columns={YearlyProductTblGrid} dataSource={yearlyOrders} rowKey={(record,index)=>index}></Table>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>

      <div className='flex flex-wrap lg:flex-nowrap justify-center lg:px-10' ref={setComponentRefSupplier}>
        <div className='m-2 md:my-5 p-2 md:px-10 pb-5 bg-white rounded-xl shadow-md w-full'>
          <div className='flex w-full h-12 mt-2'>
            <p className='my-auto w-auto sm:w-34 md:w-72 px-4 font-bold'>Supplier Reports</p>
            <div className='relative w-full'>
              <div className='absolute right-0 w-34'>
                <ReactToPrint key='print'
                  trigger = {() => {
                    return(
                      <Button className='inline-flex items-center w-auto my-auto mb-4 text-black rounded' style={{ backgroundColor: '#46E4AC' }}>
                        <img className='object-scale-down w-auto h-5 mr-2 md:mr-2 sm:mx-auto' src={print}/>
                        <p className='font-semibold text-black'>Print</p>
                      </Button>
                    )
                  }}
                  pageStyle={pageStyle}
                  content={reactToPrintContentSupplier}
                />
              </div>
            </div>
          </div>
          <div style={{borderColor: "#747C95"}} className=" w-full mb-5 border-b-2 rounded"></div>
          <div className='w-full p-0 my-auto overflow-scroll bg-white rounded'>
            <Tabs defaultActiveKey="1" className='w-full' size='small'>
              <TabPane tab='Daily' key='1'>
                <Table  bordered pagination={false} columns={DailySupplierTblGrid} dataSource={dailySupplier} rowKey={(record,index)=>index} ></Table>
              </TabPane>
              <TabPane tab='Weekly' key='2'>
                <Table bordered pagination={false} columns={WeeklySupplierTblGrid} dataSource={weeklySupplier} rowKey={(record,index)=>index}></Table>
              </TabPane>
              <TabPane tab='Monthly' key='3'>
                <Table bordered pagination={false} columns={MonthlySupplierTblGrid} dataSource={monthlySupplier} rowKey={(record,index)=>index}></Table>
              </TabPane>
              <TabPane tab='Yearly' key='4'>
                <Table bordered pagination={false} columns={YearlySupplierTblGrid} dataSource={yearlySupplier} rowKey={(record,index)=>index}></Table>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Reports