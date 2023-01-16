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

const GoodsReceipt = () => {

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

  const [searchVal, setSearchVal] = useState('');

  const abortController = new AbortController();

  const retrievedDeliveryDate = moment(poDeliveryDate).format("YYYY-MM-DD");

  const openNotificationWithIconDelete = (type) => {
    notification[type]({
      message: "SUCCESS!",
      description: "Goods Receipt Deleted Successfully.",
      duration: 2,
    });
  };

  const deleteButton = (grID)=>{
    if(window.confirm("Are you sure to delete this purchase order?")){
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
    const { data } = await Axios.get("http://localhost:3001/api/goodsreceipt/get", {signal: abortController.signal})
    setGoodsReceiptList(data);
  }

  //For Search
  const search = (data) => {
    return data.filter((item) =>
      item.GRNumber.toString().toLowerCase().includes(searchVal) ||
      item.Supplier.toLowerCase().includes(searchVal) ||
      moment(item.DueDate).format("YYYY-MM-DD").toString().toLowerCase().includes(searchVal) ||
      moment(item.DateDelivered).format("YYYY-MM-DD").toString().toLowerCase().includes(searchVal) ||
      item.Remarks.toLowerCase().includes(searchVal) ||
      item.Status.toLowerCase().includes(searchVal)
    )
  }

  const goodsReceiptGrid = [
    {
      dataIndex: 'GRNumber',
      title: 'GR Number',
      align: 'Center',
      width: '20',
      sorter: (a, b) => a.GRNumber.localeCompare(b.GRNumber),
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
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
      dataIndex: 'DateDelivered',
      title: 'Date Delivered',
      width: '200',
      align: 'Center',
      sorter: (a, b) => moment(a.DateDelivered).unix() - moment(b.DateDelivered).unix(),
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{moment(text).format("YYYY-MM-DD")}</p>
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
        return <p style={{color: record.Status === 'paid' ? 'green': '#8A8A8A', textTransform: 'capitalize'}} className='font-semibold'>{text}</p>
      }
    },
    {
      title: 'Actions',
      dataIndex: 'goodsID',
      key: 'goodsID',
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
          
          <Link to={`/inventory/goods_receipt/view_goods_receipt/${record.GRNumber}`}>
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

  const grList = goodsReceiptList.map(({body,...item}) => ({
    ...item,
    key: item.goodsID,
    message: body,
  }))
  
  return (
    <div className='md:m-10 mt-20 mx-8'>
      <Header title='Supplier Transaction'/>

        <div className='m-2 md:m-10 p-2 md:px-10 pb-5 bg-white rounded-xl shadow-md'>

          <div className='flex w-full h-12 mt-2'>
            <p className='my-auto w-auto sm:w-34 md:w-72 px-4 font-bold'>Goods Receipt PO</p>

            <div className='relative w-full'>
              <div className='absolute right-0 w-34'>

                <NavLink to={'/inventory/goods_receipt/add_goods_receipt'}>
                  <Button type='button' size='sm' style={{backgroundColor: '#83D2FF'}} className='hover:bg-blue-400 text-black py-1 pl-2 pr-0 h-10 rounded inline-flex items-center my-1 mr-3 w-10 sm:w-10 md:w-auto md:p-4'>
                    <img className='w-auto h-6 sm:w-auto md:w-6 mr-2 sm:mr-0 md:mr-2 sm:mx-auto object-scale-down' src={add}/>
                    <p className='invisible text-sm font-semibold md:visible lg:flex sm:invisible'>Add</p>
                  </Button>
                </NavLink>

              </div>
            </div>
          </div>
          
          <div style={{borderColor: "#747C95"}} className=" w-full my-5 border-b-2 rounded"></div>

          <div className='m-2 my-auto bg-white rounded overflow-auto'>
            <div className='flex flex-auto w-full mb-10 md:mb-0 sm:mb-10'>
              <div className='relative w-full'>
                <div className='absolute right-0 mr-4 mt-1'>
                      <Input style={{ fontSize: '16' }} className='z-20 w-full mr-3.5 items-center font-poppins' placeholder='Search...'
                      onChange = {(e) => {setSearchVal(e.target.value)}}
                      value={searchVal}
                      />
                </div>
              </div>
            </div>
            <Tabs defaultActiveKey="0" className='w-auto'>
              <TabPane tab='Pending' key='0'>
                <div className="flex w-full min-w-screen overflow-auto justify-center items-center">
                    <Table bordered className='mt-14' columns={goodsReceiptGrid} pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '25', '50', '100']}} dataSource={search(grList).filter((data) => data.Status === 'pending')}className='w-full'></Table>
                </div>
              </TabPane>
              <TabPane tab='Paid' key='1'>
                <div className="flex w-full min-w-screen overflow-auto justify-center items-center">
                    <Table bordered className='mt-14' columns={goodsReceiptGrid} pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '25', '50', '100']}} dataSource={search(grList).filter((data) => data.Status === 'paid')}className='w-full'></Table>
                </div>
              </TabPane>
            </Tabs>

          </div>

        </div>
    </div>
  )
}

export default GoodsReceipt