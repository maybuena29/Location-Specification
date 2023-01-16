import React,{useState,useEffect} from 'react';
import add from '../Images/add.png';
import impExcel from '../Images/import.png';
import edit from '../Images/edit.png';
import archive from '../Images/archive.png';
import medLogo from '../Images/corumed_med_logo.png'
import view from '../Images/view.png';
import { Header } from '../components';
import { NavLink,Link } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import  Axios  from 'axios';
import {Modal, Space,Table,notification, Input, Select, Image, Tabs} from 'antd';
import moment from 'moment';

const { TextArea } = Input;
const { Option } = Select;
const TabPane = Tabs.TabPane;

const APInvoice = () => {

  //For Purchase Order
  const [count, setCount] = useState(0);
  const [poNumber, setPoNumber] = useState(0);
  const [poSupplier, setPoSupplier] = useState('');
  const [poDeliveryDate, setPoDeliveryDate] = useState('');
  const [poStatus, setPoStatus] = useState('');
  const [poNumberList, setPoNumberList] = useState([]);

  //For Goods Receipt
  const [grNumber, setGrNumber] = useState(0);
  const [dateDelivered, setDateDelivered] = useState('');
  const [grRemarks, setGrRemarks] = useState('');
  const [grStatus, setGrStatus] = useState('');
  const [goodsReceiptList, setGoodsReceiptList] = useState([]);

  //For Ap Invoice
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [apRemarks, setApRemarks] = useState('');
  const [apStatus, setApStatus] = useState('');
  const [apinvoiceList, setApInvoiceList] = useState([]);

  const [searchVal, setSearchVal] = useState('');

  const abortController = new AbortController();

  const retrievedDeliveryDate = moment(poDeliveryDate).format("YYYY-MM-DD");

  const openNotificationWithIconDelete = (type) => {
    notification[type]({
      message: "SUCCESS!",
      description: "AP Invoice Deleted Successfully.",
      duration: 2,
    });
  };

  const deleteButton = (apID)=>{
    if(window.confirm("Are you sure to delete this invoice receipt?")){
      // Axios.delete(`http://localhost:3001/api/purchaseorder/remove/${grID}`);
      openNotificationWithIconDelete("success");
    }
    setCount(() => count + 1);
  }

  useEffect(() => {
    fetch()
    return () => {  
      abortController.abort();
    }
  }, []);

  const fetch = async () => {
    const { data } = await Axios.get("http://localhost:3001/api/apinvoice/get", {signal: abortController.signal})
    setApInvoiceList(data);
  }

  //For Search
  const search = (data) => {
    return data.filter((item) =>
      item.invoiceNumber.toString().toLowerCase().includes(searchVal) ||
      item.GRNumber.toString().toLowerCase().includes(searchVal) ||
      item.Supplier.toLowerCase().includes(searchVal) ||
      moment(item.DueDate).format("YYYY-MM-DD").toString().toLowerCase().includes(searchVal) ||
      moment(item.invoiceDate).format("YYYY-MM-DD").toString().toLowerCase().includes(searchVal) ||
      item.paymentMode.toLowerCase().includes(searchVal) ||
      item.Remarks.toLowerCase().includes(searchVal) ||
      item.Status.toLowerCase().includes(searchVal)
    )
  }

  const apInvoiceGrid = [
    {
      dataIndex: 'invoiceNumber',
      title: 'Invoice Number',
      align: 'Center',
      width: '20',
      sorter: (a, b) => a.invoiceNumber.localeCompare(b.invoiceNumber),
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    {
      dataIndex: 'totalAmount',
      title: 'Total Amoount',
      align: 'Center',
      width: '20',
      sorter: {
        compare: (a, b) => a.totalAmount - b.totalAmount
      },
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>₱{text}</p>
      }
    },
    {
      dataIndex: 'Supplier',
      title: 'Supplier',
      align: 'Center',
      width: '150',
      sorter: (a, b) => a.Supplier.localeCompare(b.Supplier),
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    { 
      dataIndex: 'DueDate',
      title: 'Due Date',
      width: '200',
      align: 'Center',
      sorter: (a, b) => moment(a.DueDate).unix() - moment(b.DueDate).unix(),
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{moment(text).format("YYYY-MM-DD")}</p>
      }
    },
    { 
      dataIndex: 'invoiceDate',
      title: 'Invoice Date',
      width: '200',
      align: 'Center',
      sorter: (a, b) => moment(a.invoiceDate).unix() - moment(b.invoiceDate).unix(),
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{moment(text).format("YYYY-MM-DD")}</p>
      }
    },
    { 
      dataIndex: 'paymentMode',
      title: 'Payment Mode',
      width: '200',
      align: 'Center',
      sorter: (a, b) => a.paymentMode.localeCompare(b.paymentMode),
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    { 
      dataIndex: 'Remarks',
      title: 'Remarks',
      width: '200',
      align: 'Center',
      sorter: (a, b) => a.Remarks.localeCompare(b.Remarks),
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      align: 'center',
      width: '150',
      sorter: (a, b) => a.Status.localeCompare(b.Status),
      render: (text, record) => {
        return <p style={{color: record.Status === 'success' ? 'green': '#8A8A8A', textTransform: 'capitalize'}} className='font-semibold'>{text}</p>
      }
    },
    {
      title: 'Actions',
      dataIndex: 'invoiceID',
      key: 'invoiceID',
      width: '150',
      align: 'Center',
      render:(_,record) =>
        <Space align='end'>
          {/* {record.POStatus === 'paid'? <></> :
            <Link to={`/inventory/goods_receipt/add_goods_receipt/${record.GRNumber}`}>
              <Button style={{backgroundColor: '#83D2FF'}} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto w-10 sm:w-10 md:w-10 md:p-3 md:pl-3 sm:pr-2.5'>
                <img className='w-auto h-5 sm:w-auto md:w-10 md:h-5 mr-2 sm:mr-0 sm:mx-auto object-scale-down' src={edit}/>
              </Button>
            </Link>
          } */}
          
          <Link to={`/inventory/accounts_payable/add_apinvoice/${record.invoiceNumber}`}>
            <Button style={{backgroundColor: '#46E4AC'}} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto w-10 sm:w-10 md:w-10 md:p-0 sm:pr-2.5' onClick={()=> {
                  setCount((c) => c + 1);
              }}>
              <img className='w-auto h-5 sm:w-auto md:w-10 md:h-5 mr-2 sm:mr-0 md:mx-auto sm:mx-auto object-scale-down' src={view}/>
            </Button>
          </Link>

          {/* <Button style={{backgroundColor: "#ED5264", marginLeft: 12}} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto w-10 sm:w-10 md:w-10 md:p-0 sm:pr-2.5' onClick={() => {
                deleteButton(record.inventoryID);
                setCount((c) => c + 1);
            }}>
            <img className='w-auto h-5 sm:w-auto md:w-5 mr-2 sm:mr-0 md:mx-auto sm:mx-auto object-scale-down' src={archive}/>
          </Button> */}
        </Space>
      
    },
  ];

  const apList = apinvoiceList.map(({body,...item}) => ({
    ...item,
    key: item.invoiceID,
    message: body,
  }))
  
  return (
    <div className='md:m-10 mt-20 mx-8'>
      <Header title='Supplier Transaction'/>

        <div className='m-2 md:m-10 p-2 md:px-10 pb-5 bg-white rounded-xl shadow-md'>

          <div className='flex w-full h-12 mt-2'>
            <p className='my-auto w-auto sm:w-34 md:w-72 px-4 font-bold'>A/P Invoice</p>
            <div className='relative w-full'>
              <div className='absolute right-0 w-34'>
                
                <NavLink to={'/inventory/accounts_payable/add_apinvoice'}>
                  <Button type='button' size='sm' style={{backgroundColor: '#83D2FF'}} className='hover:bg-blue-400 text-black py-1 pl-2 pr-0 h-10 rounded inline-flex items-center my-1 mr-3 w-10 sm:w-10 md:w-auto md:p-4'>
                    <img className='w-auto h-6 sm:w-auto md:w-6 mr-2 sm:mr-0 md:mr-2 sm:mx-auto object-scale-down' src={add}/>
                    <p className='invisible text-sm font-semibold md:visible lg:flex sm:invisible'>Add</p>
                  </Button>
                </NavLink>
              </div>
            </div>
          </div>
          
          <div style={{borderColor: "#747C95"}} className=" w-full my-5 border-b-2 rounded"></div>

          <div className='relative w-full'>
            <div className='absolute right-0 mt-1 mr-2'>
                  <Input style={{ fontSize: '16' }} className='w-full mr-3.5 items-center font-poppins' placeholder='Search...'
                  onChange = {(e) => {setSearchVal(e.target.value)}}
                  value={searchVal}
                  />
            </div>
          </div>

          <div className='m-2 my-auto bg-white rounded overflow-auto'>
            <Table bordered className='mt-14' columns={apInvoiceGrid} pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '25', '50', '100']}} dataSource={search(apList)}></Table>
          </div>

        </div>
    </div>
  )
}

export default APInvoice