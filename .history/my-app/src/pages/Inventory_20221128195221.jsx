import React,{useState,useEffect} from 'react';
import add from '../Images/add.png';
import impExcel from '../Images/import.png';
import edit from '../Images/edit.png';
import archive from '../Images/archive.png';
import medLogo from '../Images/corumed_med_logo.png'
import view from '../Images/view.png';
import { Header } from '../components';
import { NavLink,Link,useNavigate } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import  Axios  from 'axios';
import {Modal, Space,Table,notification, Input, Select, Image} from 'antd';
import moment from 'moment';
import mainApi from '../contexts/Api';

const { TextArea } = Input;
const { Option } = Select;

const Inventory = () => {
  
  var obtainID;
  const [count, setCount] = useState(0);
  const [inventoryList, setInventoryList] = useState([]);
  var setid;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [productImage, setPImage] = useState('');
  const [productName, setPName] = useState('');
  const [productDescription, setPDescription] = useState('');
  const [productAttribute, setPAttribute] = useState('');
  const [productAttrValue, setPAttrValue] = useState('');
  const [productPrice, setPPrice] = useState('');
  const [productCategory, setPCategory] = useState('');
  const [productBrand, setPBrand] = useState('');
  const [productSupplier, setPSupplier] = useState('');
  const [productType, setPType] = useState('');
  const [productSKU, setPSKU] = useState('');
  const [productAvailability, setPAvailability] = useState('');
  const [updateCBRP,setupdateCBRP]=useState('');

  const [status, setStatus] = useState('');
  const [inventoryQuantity, setIQuantity] = useState('');
  const [inventoryDateExp, setIDateExp] = useState('');
  const [inventoryStatus, setIStatus] = useState('');
  const [searchVal, setSearchVal] = useState('');
  const imgPath = `${mainApi}/uploads/productImages/`;

  const abortController = new AbortController();

  const dateFormat = "YYYY-MM-DD";
  const retrievedDateExp =  moment(inventoryDateExp).format(dateFormat);
  const navigate = useNavigate();

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

  const deleteButton = (invID)=>{
    if(window.confirm("Are you sure to delete this product?")){
      Axios.delete(`${mainApi}/api/inventory/remove/${invID}`);
      openNotificationWithIconDelete("success");
    }
    setCount(() => count + 1);
  }

  const [isModalShown, set] = useState(false);

  const toggleModal = () => {
    set((isShown) => !isShown);
  };    

  useEffect(() => {
    fetch()
    return () => {  
      abortController.abort();
    }
  }, []);

  const fetch = async () => {
    const { data } = await Axios.get(`${mainApi}/api/inventory/get`, {signal: abortController.signal}).catch((err)=>{
      if (err.response.status===403){
        navigate('/NotAuthorizedPage')
      }
      
    });
    setInventoryList(data);
  }

  //for view 
  const viewLoad = (event) => {
    console.log("ViewLoad initiated");
    console.log("setid: " + setid);
      Axios.get(`${mainApi}/api/inventory/get/${setid}`).then((response)=>{
        setPImage(response.data.productImage);
        setPName(response.data.productName);
        setPDescription(response.data.productDescription);
        setPAttribute(response.data.productAttribute);
        setPAttrValue(response.data.productAttrValue);
        setPPrice(response.data.productPrice);
        setPBrand(response.data.productBrand);
        setPCategory(response.data.productCategory);
        setPSupplier(response.data.Supplier);
        setupdateCBRP(response.data.productAvailability);
        setPSKU(response.data.productSKU);
        setIDateExp(response.data.inventoryDateExp);
        setIQuantity(response.data.inventoryQuantity);
        setIStatus(response.data.inventoryStatus);
    });
  };

  //For Search
  const search = (data) => {
    return data.filter((item) =>
      item.productSKU.toLowerCase().includes(searchVal) ||
      item.productName.toLowerCase().includes(searchVal) ||
      item.inventorySalesPrice.toString().toLowerCase().includes(searchVal) ||
      item.productCategory.toLowerCase().includes(searchVal) ||
      item.inventoryQuantity.toString().toLowerCase().includes(searchVal) ||
      item.Supplier.toLowerCase().includes(searchVal) ||
      item.productAvailability.toLowerCase().includes(searchVal) ||
      item.inventoryStatus.toLowerCase().includes(searchVal)
    )
  }

  const inventoryGrid = [
    {
      dataIndex: 'productImage',
      title: 'Image',
      align: 'Center',
      width: '150',
      sorter: (a, b) => a.productImage.localeCompare(b.productImage),
      render: (text, record) => {
        return <span style={{ textTransform: 'capitalize' }}>
                  {record.productImage? <Image preview={false} className='w-12 h-12' src={imgPath + record.productImage}/>:<Image className='w-12 h-12' preview={false} src={medLogo}/>}
               </span>
      }
    },
    {
      dataIndex: 'productSKU',
      title: 'Product SKU',
      align: 'Center',
      width: '20',
      sorter: (a, b) => a.productSKU.localeCompare(b.productSKU),
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    {
      dataIndex: 'productName',
      title: 'Product Name',
      align: 'Center',
      width: '150',
      sorter: (a, b) => a.productName.localeCompare(b.productName),
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    { 
      dataIndex: 'inventorySalesPrice',
      title: 'Price',
      width: '200',
      align: 'Center',
      sorter: {
        compare: (a, b) => a.inventorySalesPrice - b.inventorySalesPrice,
      },
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
      sorter: (a, b) => a.productCategory.localeCompare(b.productCategory),
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    {
      dataIndex: 'inventoryQuantity',
      title: 'Stocks',
      align: 'Center',
      width: '20',
      sorter: {
        compare: (a, b) => a.inventoryQuantity - b.inventoryQuantity,
      },
      render: (text, record) => {
        return <p>{text}pc/s.</p>
      }
    },
    {
      dataIndex: 'Supplier',
      title: 'Supplier',
      width: '120',
      align: 'Center',
      sorter: (a, b) => a.Supplier.localeCompare(b.Supplier),
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    {
      title: 'Product\nAvailability',
      dataIndex: 'productAvailability',
      align: 'Center',
      width: '100',
      sorter: (a, b) => a.productAvailability.localeCompare(b.productAvailability),
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    {
      title: 'Status',
      dataIndex: 'inventoryStatus',
      sorter: (a, b) => a.inventoryStatus.localeCompare(b.inventoryStatus),
      render: (text, record) => {
        return <p style={{color: record.inventoryStatus === 'active' ? 'green': 'red', textTransform: 'capitalize'}} className='font-semibold'>{text}</p>
      }
    },
    {
      title: 'Actions',
      dataIndex: 'inventoryID',
      key: 'inventoryID',
      width: '150',
      align: 'Center',
      render:(_,record) =>
        <Space align='center'>
          {/* <Link to={`/inventory/update/${record.inventoryID}`}>
            <Button style={{backgroundColor: '#83D2FF'}} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto w-10 sm:w-10 md:w-10 md:p-3 md:pl-3 sm:pr-2.5'>
              <img className='w-auto h-5 sm:w-auto md:w-10 md:h-5 mr-2 sm:mr-0 sm:mx-auto object-scale-down' src={edit}/>
            </Button>
          </Link> */}

          <Button style={{backgroundColor: '#46E4AC'}} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto w-10 sm:w-10 md:w-10 md:p-0 sm:pr-2.5' onClick={()=> {
                setid = record.inventoryID; 
                viewLoad(); 
                showModal();
                setCount((c) => c + 1);
            }}>
            <img className='w-auto h-5 sm:w-auto md:w-10 md:h-5 mr-2 sm:mr-0 md:mx-auto sm:mx-auto object-scale-down' src={view}/>
          </Button>

          {/* <Button style={{backgroundColor: "#ED5264", marginLeft: 12}} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto w-10 sm:w-10 md:w-10 md:p-0 sm:pr-2.5' onClick={() => {
                deleteButton(record.inventoryID);
                setCount((c) => c + 1);
            }}>
            <img className='w-auto h-5 sm:w-auto md:w-5 mr-2 sm:mr-0 md:mx-auto sm:mx-auto object-scale-down' src={archive}/>
          </Button> */}
        </Space>
      
    },
  ];

  const invList = inventoryList.map(({body,...item}) => ({
    ...item,
    key: item.inventoryID,
    message: body,
  }))
  
  return (
    <div className='md:m-10 mt-20 mx-8'>
      <Header title='Inventory'/>

        <div className='m-2 md:m-10 p-2 md:px-10 pb-5 bg-white rounded-xl shadow-md'>

          <div className='flex w-full h-12 mt-2'>
            <p className='my-auto w-auto sm:w-34 md:w-72 px-4 font-bold'>Available Stocks</p>

            <div className='relative w-full'>
              <div className='absolute right-0 w-34'>

                <NavLink to={'/inventory/purchase_order'}>
                  <Button type='button' size='sm' style={{backgroundColor: '#83D2FF'}} className='hover:bg-blue-400 text-black py-1 pl-2 pr-0 h-10 rounded inline-flex items-center my-1 mr-3 w-10 sm:w-10 md:w-auto md:p-4'>
                    <img className='w-auto h-6 sm:w-auto md:w-6 mr-2 sm:mr-0 md:mr-2 sm:mx-auto object-scale-down' src={add}/>
                    <p className='invisible text-sm font-semibold md:visible lg:flex sm:invisible'>Add</p>
                  </Button>
                </NavLink>

                <Modal title="View Product" visible={isModalVisible} onCancel={doneModal} centered width={1000} footer={null}>
                   <div className='flex flex-col md:flex-row w-full min-w-screen justify-center items-center'>

                  <div className="flex md:mr-10  flex-col gap-4 justify-center w-full md:w-1/2 p-0 sm:w-full">
                      <div className="flex textboxes w-full">
                        <p className='my-auto font-display w-32'>Product Image:</p>
                        <div className='flex flex-col justify-center items-center'>
                          <Image
                            width={150}
                            height={150}
                            preview={true}
                            fallback={medLogo}
                            src={imgPath + productImage}/>
                        </div>
                      </div>
                      <div className="flex textboxes w-full">
                        <p className='my-auto font-display w-32'>Product SKU:</p>
                        <Input className='my-auto placeholder-black placehol' value={productSKU || ''} placeholder="Please Select a SKU. "   disabled/>
                      </div>
                      <div className="flex textboxes w-full">
                        <p className='my-auto font-display w-32'>Product Name:</p>
                        <Input className='my-auto' value={productName || ''} placeholder="Please Select a SKU. "   disabled/>
                      </div>
                      <div className="flex textboxes w-full">
                        <p className='font-display w-32'>Product Description:</p>
                        <TextArea rows={4} placeholder="Enter Product Description"  value={productDescription || ""} className='resize-none' disabled/>
                      </div>
                      <div className="flex textboxes w-full">
                        <p className='my-auto font-display w-32 font-bold'>Product Attribute:</p>
                      </div>
                      <div className="flex textboxes w-full">
                        <p className='my-auto font-display w-32'>Attribute Name:</p>
                        <Input className='my-auto' value={productAttribute || ''} placeholder="Please Select a SKU. "   disabled/>
                      </div>
                      <div className="flex textboxes w-full">
                        <p className='my-auto font-display w-32'>Attribute Value:</p>
                        <Input className='my-auto' value={productAttrValue || ''} placeholder="Please Select a SKU. "   disabled/>
                      </div>
                  </div>

                  <div className="flex  flex-col gap-4 justify-center w-full md:w-1/2 p-0 sm:w-full">

                    <div className="flex textboxes w-full">
                      <p className='my-auto font-display w-32'>Unit Price (Php):</p>
                      <Input className='my-auto' value={productPrice || ''} placeholder="Please Select a SKU. " disabled/>
                    </div>

                    <div className="flex textboxes w-full">
                      <p className='my-auto font-display w-32'>Category:</p>
                      <Input className='my-auto' value={productCategory || ''} placeholder="Please Select a SKU. "   disabled/>
                    </div>

                    <div className="flex textboxes w-full">
                      <p className='my-auto font-display w-32'>Brand:</p>
                      <Input className='my-auto' value={productBrand || ''} placeholder="Please Select a SKU. "   disabled/>
                    </div>

                    <div className="flex textboxes w-full">
                      <p className='my-auto font-display w-32'>Supplier:</p>
                      <Input className='my-auto' value={productSupplier || ''} placeholder="Please Select a SKU. "   disabled/>
                    </div>

                    <div className="flex textboxes w-full">
                      <p className='my-auto font-display w-32'>Inventory Quantity:</p>
                      <Input className='my-auto' type="number" value={inventoryQuantity || ''} placeholder="0"   disabled/>
                    </div>

                    <div className="flex textboxes w-full">
                      <p className='my-auto font-display w-32'>Date Expiration:</p>
                      <Input className='my-auto' value={retrievedDateExp} placeholder="Date Expiration"   disabled/>
                    </div>

                    <div className="flex textboxes w-full">
                      <p className='my-auto font-display w-32'>Inventory Status:</p>
                      <Input className='my-auto' value={inventoryStatus || ''} placeholder="Please Select a SKU. "   disabled/>
                    </div>

                    <div className="flex textboxes w-full">
                      <p className='my-auto font-display w-32'>Availability: </p>
                      <Input className='my-auto' value={updateCBRP} placeholder='No Value' disabled />
                    </div>
                    
                  </div>
                  </div>

                </Modal>

              </div>
            </div>
          </div>
          
          <div style={{borderColor: "#747C95"}} className=" w-full my-5 border-b-2 rounded"></div>

          {/* For search bar */}
          <div className='relative w-full'>
            <div className='absolute right-0 mt-1 mr-2'>
                  <Input style={{ fontSize: '16' }} className='w-full mr-3.5 items-center font-poppins' placeholder='Search...'
                  onChange = {(e) => {setSearchVal(e.target.value)}}
                  value={searchVal}
                  />
            </div>
          </div>

          <div className='m-2 my-auto bg-white rounded overflow-auto'>
            <Table bordered className='mt-14' columns={inventoryGrid} pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '25', '50', '100']}} dataSource={search(invList)}></Table>
          </div>

        </div>
    </div>
  )
}

export default Inventory