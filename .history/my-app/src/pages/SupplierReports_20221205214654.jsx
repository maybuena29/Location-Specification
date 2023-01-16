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
import { Badge, Calendar, Popover, Table, Tabs,Modal } from 'antd';
import { Button } from '@material-tailwind/react';
import Axios from 'axios';
import moment from 'moment';
import { FaCoins, FaJediOrder } from 'react-icons/fa';
import { FiBarChart } from 'react-icons/fi';
import { MdOutlineInventory2, MdOutlineSupervisorAccount } from 'react-icons/md';
import { BiReceipt } from 'react-icons/bi';
import { GiTwoCoins } from 'react-icons/gi';
import mainApi from '../contexts/Api';
import ReactToPrint from 'react-to-print';
import print from '../Images/print.png';

const TabPane = Tabs.TabPane;

const SupplierReports = () => {

  // const [expiryList, setExpiryList] = useState([]);
  const [totalSupplier, setTotalSupplier] = useState([]);
  const [dailySupplier, setDailySupplier] = useState([]);
  const [weeklySupplier, setWeeklySupplier] = useState([]);
  const [monthlySupplier, setMonthlySupplier] = useState([]);
  const [yearlySupplier, setYearlySupplier] = useState([]);
  const [totalPO, setTotalPO] = useState([]);
  const [totalGRPO, setTotalGRPO] = useState([]);
  const [totalAP, setTotalAP] = useState([]);
  const navigate = useNavigate();
  const [salesType, setSalesType] = useState('Daily');
  const abortController = new AbortController();
  const [viewModal,setViewModal]= useState(false);

  const [orderType, setOrderType] = useState('Daily');
  
  

  useEffect(() => {
    fetchVerify();
    fetchTotalSupplier();
    fetchTotalPO();
    fetchTotalGRPO();
    fetchTotalAP();
    fetchDailySupplier();
    fetchMonthlySupplier();
    fetchWeeklySupplier();
    fetchYearlySupplier();
    return () => {  
      abortController.abort();
    }
  }, [])

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

  const totalOrderTabChange = (key: string) => {
    console.log(orderType);
    if(key === '1'){
      setOrderType('Daily');
    }else if(key === '2'){
      setOrderType('Weekly');
    }else if(key === '3'){
      setOrderType('Monthly');
    }else{
      setOrderType('Yearly');
    }
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


  const handleCloseModal = () => {
    setViewModal(false);
    
  };
  //For Print
  let componentRef = null;
  const setComponentRef = (ref) => {
    componentRef = ref;
  };

  const reactToPrintContent = () => {
    return componentRef;
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

const DailySupplierTblGrid: ColumnsType<DataType> = [
  {
    title: 'Month',
    dataIndex: 'Month',
    defaultSortOrder: 'descend',
    align: 'center',
    
    sortDirections: ['descend', 'ascend'],
    render: (text, record) => {
      return <p style={{textTransform: 'capitalize'}}>{text}</p>
    }
  },
  
  {
    title: 'Day',
    dataIndex: 'Day',
    defaultSortOrder: 'descend',
    align: 'center',
    
    sortDirections: ['descend', 'ascend'],
    render: (text, record) => {
      return <p style={{textTransform: 'capitalize'}}>{text}</p>
    }
  },

  {
    title: 'Total Supplier Orders',
    dataIndex: 'TotalSupplierOrders',
    defaultSortOrder: 'descend',
    align: 'center',
    // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
    sortDirections: ['descend', 'ascend'],
    render: (text, record) => {
      return <p style={{textTransform: 'capitalize'}}>{text}</p>
    }
  },
]; 

const WeeklySupplierTblGrid: ColumnsType<DataType> = [
  {
    title: 'Month',
    dataIndex: 'Month',
    defaultSortOrder: 'descend',
    align: 'center',
    
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
    
    sortDirections: ['descend', 'ascend'],
    render: (text, record) => {
      return <p style={{textTransform: 'capitalize'}}>{text}</p>
    }
  },

  {
    title: 'Total Supplier Orders',
    dataIndex: 'TotalSupplierOrders',
    defaultSortOrder: 'descend',
    align: 'center',
    // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
    sortDirections: ['descend', 'ascend'],
    render: (text, record) => {
      return <p style={{textTransform: 'capitalize'}}>{text}</p>
    }
  },
]; 
const MonthlySupplierTblGrid: ColumnsType<DataType> = [
  {
    title: 'Year',
    dataIndex: 'Year',
    defaultSortOrder: 'descend',
    align: 'center',
    
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
    
    sortDirections: ['descend', 'ascend'],
    render: (text, record) => {
      return <p style={{textTransform: 'capitalize'}}>{text}</p>
    }
  },

  {
    title: 'Total Supplier Orders',
    dataIndex: 'TotalSupplierOrders',
    defaultSortOrder: 'descend',
    align: 'center',
    // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
    sortDirections: ['descend', 'ascend'],
    render: (text, record) => {
      return <p style={{textTransform: 'capitalize'}}>{text}</p>
    }
  },
]; 

const YearlySupplierTblGrid: ColumnsType<DataType> = [

  {
    title: 'Year',
    dataIndex: 'Year',
    defaultSortOrder: 'descend',
    align: 'center',
    
    sortDirections: ['descend', 'ascend'],
    render: (text, record) => {
      return <p style={{textTransform: 'capitalize'}}>{text}</p>
    }
  },

  {
    title: 'Total Supplier Orders',
    dataIndex: 'TotalSupplierOrders',
    defaultSortOrder: 'descend',
    align: 'center',
    // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
    sortDirections: ['descend', 'ascend'],
    render: (text, record) => {
      return <p style={{textTransform: 'capitalize'}}>{text}</p>
    }
  },
]; 


  const numberFormat = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'PHP'
  }).format(value);

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

      </div>
      <div ref={setComponentRef}  className='grid grid-flow-row-dense grid-cols-1 justify-center lg:px-10'>
        <div className='w-auto col-span-1 mb-5'>
          <div className='m-2 md:my-10 p-2 md:px-10 pb-5 bg-white rounded-xl shadow-md w-full'>
            <div className='flex w-full h-12 mt-2'>
              <p className='my-auto w-auto sm:w-34 md:w-72 px-4 font-bold'>Product Overview</p>
              <div className='relative w-full'>
              <div className='absolute right-0 w-34'>
           
                <Button type='button' onClick={()=> setViewModal(true)} size='sm' style={{ backgroundColor: '#46E4AC' }} className='inline-flex items-center w-10 h-10 py-1 pl-2 pr-0 my-1 text-black rounded hover:bg-green-400 sm:w-10 md:w-auto md:p-4' >
                  <img className='object-scale-down w-6 h-6 mx-auto mr-2 md:w-5 sm:mr-0 md:mr-2 sm:mx-auto' src={print} />
                  <p className='invisible text-sm font-semibold md:visible lg:flex sm:invisible'>Print</p>
                </Button>
              
              </div>
              </div>
            </div>
            
            <div style={{borderColor: "#747C95"}} className=" w-full mb-5 border-b-2 rounded"></div>
            <div className='my-auto bg-white w-full rounded p-0 overflow-scroll'>
              <Tabs defaultActiveKey="1" className='w-full' onChange={tabChange}  size='small'>
                <TabPane tab='Daily' key='1'>
                <Table  bordered pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '25', '50', '100']}} columns={DailySupplierTblGrid} dataSource={dailySupplier} 
                rowKey={(record,index)=>index} ></Table>
                </TabPane>
                <TabPane tab='Weekly' key='2'>
                <Table bordered pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '25', '50', '100']}} columns={WeeklySupplierTblGrid} dataSource={weeklySupplier}
                rowKey={(record,index)=>index}></Table>
                </TabPane>
                <TabPane tab='Monthly' key='3'>
                <Table bordered pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '25', '50', '100']}} columns={MonthlySupplierTblGrid} dataSource={monthlySupplier} 
                rowKey={(record,index)=>index}></Table>
                </TabPane>
                <TabPane tab='Yearly' key='4'>
                <Table bordered pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '25', '50', '100']}} columns={YearlySupplierTblGrid} dataSource={yearlySupplier} 
                rowKey={(record,index)=>index}></Table>
                </TabPane>
              </Tabs>

              <Modal title={'PO Overview'} visible={viewModal} onOk={handleCloseModal} onCancel={handleCloseModal} width={1000} style={{ top: 30 }}
          footer={[
            <ReactToPrint key='print'
              trigger = {() => {
                return(
                  <Button className='inline-flex items-center w-auto my-auto mb-4 text-black rounded' style={{backgroundColor: "#83D2FF", borderRadius: 5}}>
                    <img className='object-scale-down w-auto h-5 mr-2 md:mr-2 sm:mx-auto' src={print}/>
                    <p className='font-semibold text-black'>Print</p>
                  </Button>
                )
              }}
              pageStyle={pageStyle}
              content={reactToPrintContent}
            />,
          ]}>
          <div className='flex flex-col gap-3 p-3' >

          </div>
        </Modal>
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

export default SupplierReports