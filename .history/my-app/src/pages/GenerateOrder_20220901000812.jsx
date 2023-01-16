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


    const [count, setCount] = useState(0);
    const [InventorySelectionTable,setInventorySelectionTable] = useState([]);
    const [selectedRowIDs,setselectedRowIDs] = useState([]);
    const [obtainSelectedOrder,setobtainSelectedOrder] = useState([]);
    const [editingRow ,seteditingRow] = useState('');
    console.log(selectedRowIDs);
    
    
 
  useEffect(() => {
   Axios.get("http://localhost:3001/api/generateOrder/get").then((response) => {
     setInventorySelectionTable(response.data)
    });
  }, [count]);
  console.log(selectedRowIDs);


 
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
        
      var soldCounter=1;
      return(
        
        <Space size='middle'>
          
        <Button style={{backgroundColor: "#ED5264"}} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto w-10 sm:w-10 md:w-10 md:p-0 sm:pr-2.5' 
        onClick={soldCounter-1; console.log("clicked -")}>
             <p>-</p>
          </Button>
          <p value={soldCounter}>{soldCounter}</p> 
          <Button style={{backgroundColor: '#46E4AC'}} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto -mr-3 w-10 sm:w-10 md:w-10 md:p-0 sm:pr-2.5'
          onClick={soldCounter===1? soldCounter +1  : null}>
          <p>+</p> 
          </Button>

          
        </Space>
        )
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
      dataIndex: 'Total Price',
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












  const EditableContext = React.createContext(null);

  const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };

  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        inputRef.current.focus();
      }
    }, [editing]);
  
    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    };

    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({ ...record, ...values });
      } catch (errInfo) {
        console.log('Save failed:', errInfo);
      }
    };
  
    let childNode = children;
  
    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }
  
    return <td {...restProps}>{childNode}</td>;
  };


  const handleSave = (row) => {
    const newData = [...obtainSelectedOrder];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setobtainSelectedOrder(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = selectionColumns.map((col) => {

    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

























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
                    <Table columns={columns} dataSource={obtainSelectedOrder} pagination={false} components={components}
        rowClassName={() => 'editable-row'}
        bordered
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