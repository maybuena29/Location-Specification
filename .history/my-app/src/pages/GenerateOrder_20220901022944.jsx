import React,{useContext,useState,useEffect,useRef}  from 'react';
import { Header } from '../components';
import { NavLink,Link } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import {Modal, Space,Table,notification, Input, Select,Form} from 'antd';
import Axios from 'axios';

const { Search } = Input;
  
  // useEffect(() => {
  //   Axios.get("http://localhost:3001/api/inventory/get").then((response) => {
  //     setInventoryList(response.data);
  //   });
  // }, [count]);
 
 
  
  const GenerateOrder = () => {
    
  const [soldCounter,setsoldCounter]=useState(1);


    const [count, setCount] = useState(0);
    const [InventorySelectionTable,setInventorySelectionTable] = useState([]);
    const [selectedRowIDs,setselectedRowIDs] = useState([]);
    const [obtainSelectedOrder,setobtainSelectedOrder] = useState([]);
    const [editingRow ,seteditingRow] = useState('');
    console.log(selectedRowIDs);
    
    const onInputChange = (key, index) => (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const newData = [...obtainSelectedOrder];
      newData[index][key] = e.target.value;
      setTotal(newData, index);
      setobtainSelectedOrder(newData);
    };
    
    const setTotal = (data, index) => {
      // Set total
      data[index]["TotalPrice"] = Number(
        data[index]["SoldQty"] * data[index]["productPrice"]
      );
    };
 
  useEffect(() => {
   Axios.get("http://localhost:3001/api/generateOrder/get").then((response) => {
     setInventorySelectionTable(response.data)
    });
  }, [count]);
  console.log(selectedRowIDs);
  console.log(soldCounter);

 
  const selectionColumns = [
    {
      title: 'productSKU',
      dataIndex: 'productSKU',
      defaultSortOrder: 'descend',
      // sorter: (a, b) => a.status.localeCompare(b.status),
      sortDirections: ['descend', 'ascend'],
      render: (text, record) => {
        return <p style={{color: record.productStatus === 'active' ? 'green': 'red', textTransform: 'capitalize'}} className='font-semibold'>{text}</p>
      }
    },
    {
      dataIndex: 'productName',
      title: 'Product Name',
      align: 'Center',
      width: '150',
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    { 
      dataIndex: 'SoldQty',
      title: 'Sold Qty',
      width: '200',
      align: 'Center',
      render: (text, record) => {
        return (
          <Input value={text} onChange={onInputChange("goals", record.productID)} />
        )
        
    //  var ssoldCounter=1;
    //   function Sub(){
    //     if (ssoldCounter>=1){
    //    //setsoldCounter(soldCounter-1); 
    //    ssoldCounter=ssoldCounter-1;
    //   }
    //   }
    //   function Add(){
    //     if (ssoldCounter>=1){
    //       //setsoldCounter(soldCounter+1);
    //       ssoldCounter=ssoldCounter+1;
    //   }
    //   }
    //   return(
        
    //     <Space size='middle'>
          
    //     <Button style={{backgroundColor: "#ED5264"}} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto w-10 sm:w-10 md:w-10 md:p-0 sm:pr-2.5' 
    //     onClick={Sub}>
    //          <p>-</p>
    //       </Button>
    //       <p value={soldCounter}>{soldCounter}</p> 
    //       <Button style={{backgroundColor: '#46E4AC'}} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto -mr-3 w-10 sm:w-10 md:w-10 md:p-0 sm:pr-2.5'
    //       onClick={Add}>
    //       <p>+</p> 
    //       </Button>

          
    //     </Space>
    //     )
      }
    },
    
    { 
      dataIndex: 'productPrice',
      title: 'Price',
      width: '200',
      align: 'Center',
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>₱{text}</p>
      }
    },
    { 
      dataIndex: 'TotalPrice',
      title: 'Total Price',
      width: '150',
      align: 'Center',
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>₱{text}</p>
      }
    },
  
    
  ];
  const invselectionColumns = [
    {
      title: 'productSKU',
      dataIndex: 'productSKU',
      defaultSortOrder: 'descend',
      sortDirections: ['descend', 'ascend'],
      render: (text, record) => {
        return <p style={{color: record.productStatus === 'active' ? 'green': 'red', textTransform: 'capitalize'}} className='font-semibold'>{text}</p>
      }
    },
    {
      dataIndex: 'productName',
      title: 'Product Name',
      align: 'Center',
      width: '150',
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    {
      dataIndex: 'inventoryQuantity',
      title: 'Quantity',
      align: 'Center',
      width: '150',
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    { 
      dataIndex: 'productPrice',
      title: 'Price',
      width: '200',
      align: 'Center',
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>₱{text}</p>
      }
    },
    
   
    
  ];



  const invSelectList = InventorySelectionTable.map(({body,...item}) => ({
    ...item,
    key: item.inventoryID,
    message: body,
  }))
  const orderSelectList = obtainSelectedOrder.map(({body,...item}) => ({
    ...item,
    key: item.inventoryID,
    message: body,
  }))







  return (
    <div className='md:m-10 mt-20 mx-8'>
    <Header title='Generate Orders'/>

      <div className='m-2 md:m-10 p-2 md:px-10 pb-5 bg-white rounded-xl shadow-md'>

          <div className='flex w-full h-12 mt-2'>
            <p className='my-auto w-auto sm:w-34 md:w-72 px-4 font-bold'>Transaction</p>

            
          </div>  
          <div style={{borderColor: "#747C95"}} className=" w-full my-5 border-b-2 rounded"></div>



          {/* <div className='relative w-full'>
              <div className='absolute right-0 w-34'>
  
          

                 <NavLink to={''}>
                  <Button type='button' size='sm' style={{backgroundColor: '#46E4AC'}} className='hover:bg-green-400 text-black py-1 pl-2 pr-0 h-10 rounded inline-flex items-center my-1 w-10 sm:w-10 md:w-auto md:p-4'>
                    <img alt='' className='w-6 h-6 mx-auto md:w-5 mr-2 sm:mr-0 md:mr-2 sm:mx-auto object-scale-down' src={impExcel}/>
                    <p className='invisible text-sm font-semibold md:visible lg:flex sm:invisible'>Import</p>
                  </Button>
                </NavLink> 

              </div>
            </div> */}
            <form action='' className=''>
            
            <div className='flex flex-col md:flex-row w-full min-w-screen justify-center items-center'>
              
              <div className="flex md:mr-10  flex-col gap-4 justify-center w-full md:w-1/2 p-0 sm:w-full">
                <div className="">
                    <Table columns={selectionColumns} dataSource={obtainSelectedOrder} pagination={false}
               
                ></Table>
                </div>
                <div className="">
                    <p>Total: </p>
                    
                </div>
              </div>

              <div className="flex flex-col gap-4 justify-center w-full md:w-1/2 p-0 sm:w-full">
              <div className='relative  w-1/2 '>
                    <Search
                    placeholder="input search text"
                    allowClear
                    enterButton="Search"
                    //onSearch={onSearch}
                  />
              </div>

              <div>
              <Table height={1000} rowSelection={{
                  onChange: (selectedRowID, selectedRows) => {
                    setselectedRowIDs(selectedRowID);
                    setobtainSelectedOrder(selectedRows);
                    console.log(`selectedRowKeys: ${selectedRowID}`, 'selectedRows: ', selectedRows);
                  }
              }} 

              columns={invselectionColumns} dataSource={invSelectList}
              onRow={(record) => ({
                onClick: () => {
                 
                },
              })} ></Table>
              </div>
              </div>
              
            </div>
            </form>
          

        </div>
        
      </div>
 
  )
}

export default GenerateOrder