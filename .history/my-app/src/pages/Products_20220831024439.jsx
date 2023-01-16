import React,{useState,useEffect} from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Toolbar, Edit, Inject } from '@syncfusion/ej2-react-grids';
import add from '../Images/add.png';
import impExcel from '../Images/import.png';
import edit from '../Images/edit.png';
import archive from '../Images/archive.png';
import view from '../Images/view.png';
import { ordersData, contextMenuItems, ordersGrid, productGrid, brandGrid } from '../data/dummy';
import { Header } from '../components';
import { NavLink,Link } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import { DataManager, UrlAdaptor } from "@syncfusion/ej2-data";
import  Axios  from 'axios';
import {Modal, Space,Table,notification, Input, Select} from 'antd';
import { FiEdit3, FiEye } from 'react-icons/fi';
import { BiArchiveIn, BiWindowClose } from 'react-icons/bi';

const { TextArea } = Input;
const { Option } = Select;

const Products = () => {
  
  var obtainID;
  const [count, setCount] = useState(0);
  const [productList, setProductList] = useState([]);
  var setid;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [productName, setPName] = useState('');
  const [productDescription, setPDescription] = useState('');
  const [productAttribute, setPAttribute] = useState('');
  const [productAttrValue, setPAttrValue] = useState('');
  // const [productSize, setPSize] = useState('');
  // const [productUnit, setPUnit] = useState('');
  // const [productDosage, setPDosage] = useState('');
  const [PQuantity, setPQuantity] = useState('');
  const [productPrice, setPPrice] = useState('');
  const [productCategory, setPCategory] = useState('');
  const [productBrand, setPBrand] = useState('');
  const [productSupplier, setPSupplier] = useState('');
  const [PStatus, setPStatus] = useState('');
  const [productType, setPType] = useState('');
  const [productSKU, setPSKU] = useState('');
  
  const [productReqPres, setPRequiredPres] = useState('');
  const [updateCBRP,setupdateCBRP]=useState('');

  const showModal = () => {
    setIsModalVisible(true);
  };

  const doneModal = () => {
    setIsModalVisible(false);
  };

  const openNotificationWithIconDelete = (type) => {
    notification[type]({
      message: "SUCCESS!",
      description: "Product Deleted Successfully.",
      duration: 2,
    });
  };

  const deleteButton = (PID)=>{
    if(window.confirm("Are you sure to delete this product?")){
      Axios.delete(`http://localhost:3001/api/products/remove/${PID}`);
      openNotificationWithIconDelete("success");
    }
    setCount(() => count + 1);
  }

  const [isModalShown, set] = useState(false);

  const toggleModal = () => {
    set((isShown) => !isShown);
  };    

  //pag load ng page at show ng data sa table
  useEffect(() => {
    Axios.get("http://localhost:3001/api/products/get").then((response) => {
      setProductList(response.data);
    });
  }, [count]);

  //for view 
  const viewLoad = (event) => {
    console.log("ViewLoad initiated");
      Axios.get(`http://localhost:3001/api/products/get/${setid}`).then((response)=>{
        setPName(response.data.productName);
        setPDescription(response.data.productDescription);
        setPAttribute(response.data.productAttribute);
        setPAttrValue(response.data.productAttrValue);
        // setPSize(response.data.productSize);
        // setPUnit(response.data.productUnit);
        // setPDosage(response.data.productDosage);
        setPPrice(response.data.productPrice);
        setPBrand(response.data.productBrand);
        setPCategory(response.data.productCategory);
        setPSupplier(response.data.productSupplier);
        setPType(response.data.productType);
        setupdateCBRP(response.data.productReqPres);
    });
  };

  const productGrid = [
    
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
      dataIndex: 'productDescription',
      title: 'Product Description',
      width: '150',
      align: 'Center',
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
    {
      dataIndex: 'productCategory',
      title: 'Category',
      format: 'C2',
      align: 'Center',
      width: '150',
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    {
      dataIndex: 'productSupplier',
      title: 'Supplier',
      width: '120',
      align: 'Center',
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    {
      title: 'Prescription Required',
      dataIndex: 'productReqPres',
      align: 'Center',
      width: '100',
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}} className='font-extrabold'>{text}</p>
      }
    },
    {
      title: 'Status',
      dataIndex: 'productStatus',
      defaultSortOrder: 'descend',
      // sorter: (a, b) => a.status.localeCompare(b.status),
      sortDirections: ['descend', 'ascend'],
      render: (text, record) => {
        return <p style={{color: record.productStatus === 'active' ? 'green': 'red', textTransform: 'capitalize'}} className='font-semibold'>{text}</p>
      }
    },
    {
      title: 'Actions',
      dataIndex: 'productID',
      key: 'productID',
      width: '150',
      align: 'Center',
      render:(_,record) =>
        <Space align='end'>
          <Link to={`/products/update/${record.productID}`}>
            <Button style={{backgroundColor: '#83D2FF'}} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto w-10 sm:w-10 md:w-10 md:p-3 md:pl-3 sm:pr-2.5'>
              <img className='w-auto h-5 sm:w-auto md:w-10 md:h-5 mr-2 sm:mr-0 sm:mx-auto object-scale-down' src={edit}/>
            </Button>
          </Link>

          <Button style={{backgroundColor: '#46E4AC'}} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto -mr-3 w-10 sm:w-10 md:w-10 md:p-0 sm:pr-2.5' onClick={()=> {
                setid = record.productID; 
                viewLoad(); 
                showModal();
                setCount((c) => c + 1);
            }}>
            <img className='w-auto h-5 sm:w-auto md:w-10 md:h-5 mr-2 sm:mr-0 md:mx-auto sm:mx-auto object-scale-down' src={view}/>
          </Button>

          <Button style={{backgroundColor: "#ED5264", marginLeft: 12}} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto w-10 sm:w-10 md:w-10 md:p-0 sm:pr-2.5' onClick={() => {
                deleteButton(record.productID);
                setCount((c) => c + 1);
            }}>
            <img className='w-auto h-5 sm:w-auto md:w-5 mr-2 sm:mr-0 md:mx-auto sm:mx-auto object-scale-down' src={archive}/>
          </Button>
        </Space>
      
    },
  ];

  const prodList = productList.map(({body,...item}) => ({
    ...item,
    key: item.productID,
    message: body,
  }))
  
  return (
    <div className='md:m-10 mt-20 mx-8'>
      <Header title='Products'/>

        <div className='m-2 md:m-10 p-2 md:px-10 pb-5 bg-white rounded-xl shadow-md'>

          <div className='flex w-full h-12 mt-2'>
            <p className='my-auto px-4 font-semibold'>Masterlist</p>

            <div className='relative w-full'>
              <div className='absolute right-0 w-34'>

                <NavLink to={'/addproduct'}>    
                  <Button type='button' size='sm' style={{backgroundColor: '#83D2FF'}} className='hover:bg-blue-400 text-black py-1 pl-2 pr-0 h-10 rounded inline-flex items-center my-1 mr-3 w-10 sm:w-10 md:w-auto md:p-4'>
                    <img className='w-auto h-6 sm:w-auto md:w-6 mr-2 sm:mr-0 md:mr-2 sm:mx-auto object-scale-down' src={add}/>
                    <p className='invisible text-sm font-semibold md:visible lg:flex sm:invisible'>Add</p>
                  </Button>
                </NavLink>
                <NavLink to={''}>
                  <Button type='button' size='sm' style={{backgroundColor: '#46E4AC'}} className='hover:bg-green-400 text-black py-1 pl-2 pr-0 h-10 rounded inline-flex items-center my-1 w-10 sm:w-10 md:w-auto md:p-4'>
                    <img className='w-6 h-6 mx-auto md:w-5 mr-2 sm:mr-0 md:mr-2 sm:mx-auto object-scale-down' src={impExcel}/>
                    <p className='invisible text-sm font-semibold md:visible lg:flex sm:invisible'>Import</p>
                  </Button>
                </NavLink>

                <Modal title="View Product" visible={isModalVisible} onCancel={doneModal} centered width={1000} footer={null}>
                  <div className='flex flex-col md:flex-row w-full min-w-screen justify-center items-center'>

                    <div className="flex md:mr-10  flex-col gap-4 justify-center w-full md:w-1/2 p-0 sm:w-full">
                        <div className="flex textboxes w-full">
                            <p className='my-auto font-display w-32'>Product Name:</p>
                            <Input className='my-auto' placeholder="Enter Product Name" floatlabeltype="Auto" value={productName} />
                        </div>
                        <div className="flex textboxes w-full">
                            <p className='font-display w-32'>Product Description:</p>
                            <TextArea rows={4} placeholder="Enter Product Description" floatlabeltype="Auto" className='resize-none'  value={productDescription}  />
                        </div>
                        <div className="flex textboxes w-full">
                            <p className='my-auto font-display w-32 font-bold'>Product Attribute:</p>
                        </div>
                        <div className="flex textboxes w-full">
                            <p className='my-auto font-display w-32'>Attribute Name:</p>
                            <Input className='my-auto' placeholder="Choose Size" floatlabeltype="Auto" value={productAttribute} />
                        </div>
                        <div className="flex textboxes w-full">
                            <p className='my-auto font-display w-32'>Attribute Value:</p>
                            <Input className='my-auto' placeholder="Enter Product Unit" floatlabeltype="Auto" value={productAttrValue} />
                        </div>
                    </div>

                    <div className="flex  flex-col gap-4 justify-center w-full md:w-1/2 p-0 sm:w-full">
                    
                      <div className="flex textboxes w-full">
                          <p className='my-auto font-display w-32'>Price:</p>
                          <Input placeholder="Enter Price" type="number" floatlabeltype="Auto" value={productPrice}/>
                      </div>

                      <div className="flex textboxes w-full">
                          <p className='my-auto font-display w-32'>Category:</p>
                          <Input className='my-auto' placeholder="Enter Product Category" floatlabeltype="Auto" value={productCategory} />
                      </div>

                      <div className="flex textboxes w-full">
                          <p className='my-auto font-display w-32'>Brand:</p>
                          <Input className='my-auto' placeholder="Enter Product Brand" floatlabeltype="Auto" value={productBrand} />
                      </div>

                      <div className="flex textboxes w-full">
                         <p className='my-auto font-display w-32'>Product SKU:</p>
                            <Input className='my-auto' value={productSKU} placeholder="Enter Product SKU"/>
                </div>
                      <div className="flex textboxes w-full">
                          <p className='my-auto font-display w-32'>Supplier:</p>
                          <Input className='my-auto' placeholder="Enter Product Supplier" floatlabeltype="Auto" value={productSupplier} />
                      </div>

                      <div className="flex textboxes w-full">
                          <p className='my-auto font-display w-32'>Requires Prescription: </p>
                          <Input type = "checkbox" floatlabeltype="Auto" value = "1" checked={updateCBRP === "✔" ? true : false}/>
                      </div>
                      
                    </div>
                  </div>       
                </Modal>

              </div>
            </div>
          </div>
          
          <div style={{borderColor: "#747C95"}} className=" w-full my-5 border-b-2 rounded"></div>

          <div className='m-2 my-auto bg-white rounded overflow-auto'>
            <Table bordered className='mt-14' columns={productGrid} dataSource={prodList}></Table>
          </div>

        </div>
    </div>
  )
}

export default Products