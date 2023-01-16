import  { earningData, } from '../data/dummy';
import { Header } from '../components';
import mInfo from '../Images/moreInfoBlack.png';
import { NavLink } from 'react-router-dom';

const Dashboard = () => {

  const [expiryList, setExpiryList] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [pendingOrders, setPendingOrders] = useState([]);

  const abortController = new AbortController();

  const fetchExpiryDate = async () => {
    await Axios.get("http://localhost:3001/api/inventory/get", {signal: abortController.signal}).then((response)=>{
      setExpiryList(response.data);
    });
  }

  const fetchTotalOrders = async () => {
    await Axios.get("http://localhost:3001/api/dashboard/get/totalorders", {signal: abortController.signal}).then((response)=>{
      setTotalOrders(response.data.TotalOrders);
    });
  }
  
  const fetchTotalProducts = async () => {
    await Axios.get("http://localhost:3001/api/dashboard/get/totalproducts", {signal: abortController.signal}).then((response)=>{
      setTotalProducts(response.data.TotalProducts);
    });
  }
  
  const fetchTotalSales = async () => {
    await Axios.get("http://localhost:3001/api/dashboard/get/totalsales", {signal: abortController.signal}).then((response)=>{
      setTotalSales(response.data.TotalSales);
    });
  }
  
  const fetchPendingOrders = async () => {
    await Axios.get("http://localhost:3001/api/dashboard/get/totalpending", {signal: abortController.signal}).then((response)=>{
      setPendingOrders(response.data);
    });
  }

  useEffect(() => {
    fetchExpiryDate();
    fetchTotalOrders();
    fetchTotalProducts();
    fetchTotalSales();
    fetchPendingOrders();
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
    <div className='mt-12 h-auto'>
      <div className='md:m-10 mt-20 mx-8'>
        <Header title='Dashboard'/>
      </div>
      <div className='flex flex-wrap lg:flex-nowrap justify-center'>
        <div className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-lg w-full lg:w-80 p-5 pt-5 m-3 border-blue-400 border-transparent border-l-4 shadow-lg overflow-hidden bg-hero-pattern bg-no-repeat bg-cover bg-center'>
          <div className='flex justify-between items-center'>
            <div>
              <p className='font-bold text-blue-400 text-lg'>Total Earnings</p>
              <p className='text-3xl text-gray-700 font-semibold'>₱50,000</p>
            </div>
          </div>
          <div className='mt-16 my-auto'>
            <NavLink to={'/reports'} className='flex'>
              <p className='text-xs text-gray-500 cursor-pointer opacity-80'>More Info</p>
              <img className='w-4 h-4 ml-3 my-auto opacity-50 cursor-pointer' src={mInfo}/>
            </NavLink>
          </div>
        </div>

        <div className='flex m-3 flex-wrap justify-center gap-1 items-center'>


          <div className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 w-full p-4 pt-9 rounded-xl border-red-400 border-transparent border-l-4'>
            <button type='button' style={{color: 'rgb(255, 93, 108)', backgroundColor: 'rgb(255, 231, 237)'}} className='text-2xl opacity-0.9 rounded-full p-4 hover:shadow-xl'>
              <BsBoxSeam />
            </button>
            <p className='mt-3'>
              <span className='text-xl font-semibold ml-2'>
                {totalProducts}
              </span>
            </p>
            <div className='relative'>
              <p className='text-sm text-red-500 mt-2'>
                Total Products
              </p>
              <div className='flex flex-auto justify-end items-end'>
                <NavLink to={'/products/masterlist'} className='flex md:-mt-6'>
                  <p className='text-xs text-gray-500 cursor-pointer opacity-80'>More Info</p>
                  <img className='w-4 h-4 ml-3 my-auto opacity-50 cursor-pointer' src={mInfo}/>
                </NavLink>
              </div>
            </div>
          </div>

          <div className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 w-full p-4 pt-9 rounded-xl border-green-400 border-transparent border-l-4'>
            <button type='button' style={{color: 'rgb(0, 194, 146)', backgroundColor: 'rgb(235, 250, 242)'}} className='text-2xl opacity-0.9 rounded-full p-4 hover:shadow-xl'>
              <MdOutlineSupervisorAccount />
            </button>
            <p className='mt-3'>
              <span className='text-xl font-semibold ml-2'>
                0
              </span>
            </p>
            <div className='relative'>
              <p className='text-sm text-green-700 mt-2'>
                Total Customers
              </p>
              <div className='flex flex-auto justify-end items-end'>
                <NavLink to={'/users/customeracc'} className='flex md:-mt-6'>
                  <p className='text-xs text-gray-500 cursor-pointer opacity-80'>More Info</p>
                  <img className='w-4 h-4 ml-3 my-auto opacity-50 cursor-pointer' src={mInfo}/>
                </NavLink>
              </div>
            </div>
          </div>

            <div className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 w-full p-4 pt-9 rounded-xl border-indigo-400 border-transparent border-l-4'>
              <button type='button' style={{color: 'rgb(172, 71, 255)', backgroundColor: 'rgb(240, 222, 255)'}} className='text-2xl opacity-0.9 rounded-full p-4 hover:shadow-xl'>
                <FiBarChart />
              </button>
              <p className='mt-3'>
                <span className='text-lg font-semibold'>
                  {item.amount}
                </span>
              </p>
              <div className='relative'>
                <p className='text-sm text-indigo-400 mt-2'>
                  Total Sales
                </p>
                <div className='flex flex-auto justify-end items-end'>
                  <NavLink to={'/reports'} className='flex md:-mt-6'>
                    <p className='text-xs text-gray-500 cursor-pointer opacity-80'>More Info</p>
                    <img className='w-4 h-4 ml-3 my-auto opacity-50 cursor-pointer' src={mInfo}/>
                  </NavLink>
                </div>
              </div>
            </div>

            <div className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 w-full p-4 pt-9 rounded-xl border-yellow-600 border-transparent border-l-4'>
              <button type='button' style={{color: 'rgb(206, 216, 0)', backgroundColor: 'rgb(254, 255, 179)'}} className='text-2xl opacity-0.9 rounded-full p-4 hover:shadow-xl'>
                <BiReceipt />
              </button>
              <p className='mt-3'>
                <span className='text-xl font-semibold ml-2'>
                  {totalOrders}
                </span>
              </p>
              <p className='text-sm text-gray-400 mt-1'>
                {item.title}
              </p>
            </div>
          ))}

        </div>
      </div>
      
      <div className='flex flex-col lg:flex-row'>

        <div className='flex w-full lg:w-2/3 mb-5 lg:ml-10'>
          <div className='m-2 md:my-10 p-2 md:px-10 pb-5 bg-white rounded-xl shadow-md w-full'>
            <div className='flex w-full h-12 mt-2'>
              <p className='my-auto w-auto sm:w-34 md:w-72 px-4 font-bold'>Calendar</p>
            </div>
            <div style={{borderColor: "#747C95"}} className=" w-full mb-5 border-b-2 rounded"></div>
            <div className='my-auto bg-white rounded overflow-scroll'>
              <Calendar className='rounded-2xl shadow-md h-96' dateCellRender={dateCellRender}/>
            </div>
          </div>
        </div>

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
        </div>

      </div>
    </div>  

  )
}

export default Dashboard