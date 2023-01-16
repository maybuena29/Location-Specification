import React,{useState,useEffect} from 'react';
import add from '../Images/add.png';
import impExcel from '../Images/import.png';
import edit from '../Images/edit.png';
import archive from '../Images/archive.png';
import view from '../Images/view.png';
import { Header } from '../components';
import { NavLink,Link } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import  Axios  from 'axios';
import {Modal, Space,Table,notification, Input, Select} from 'antd';
import moment from 'moment';
import * as XLSX from 'xlsx';

const EXTENSIONS = ['xlsx', 'xls', 'csv'];

const { TextArea } = Input;
const { Option } = Select;

const Inventory = () => {
  
  var obtainID;
  const [count, setCount] = useState(0);
  const [inventoryList, setInventoryList] = useState([]);
  var setid;
  const [isModalVisible, setIsModalVisible] = useState(false);
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
  const [productReqPres, setPRequiredPres] = useState('');
  const [updateCBRP,setupdateCBRP]=useState('');

  const [status, setStatus] = useState('');
  const [inventoryQuantity, setIQuantity] = useState('');
  const [inventoryDateManu, setIDateManu] = useState('');
  const [inventoryDateExp, setIDateExp] = useState('');
  const [inventoryStatus, setIStatus] = useState('');

  const dateFormat = "YYYY-MM-DD";
  const retrievedDateManu = moment(inventoryDateManu).format(dateFormat);
  const retrievedDateExp =  moment(inventoryDateExp).format(dateFormat);
  const [modal, setModal] = useState({Title: 'Import to Excel', Visible: false, });
  const handleSubmit = () => {

  };
  const handleOk = () => {
    setModal({Visible: false});
    
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const doneModal = () => {
    setIsModalVisible(false);
  };

  const [colDefs, setColDefs] = useState()
  const [data, setData] = useState()

  const getExention = (file) => {
    const parts = file.name.split('.')
    const extension = parts[parts.length - 1]
    return EXTENSIONS.includes(extension) // return boolean
  }

  const convertToJson = (headers, data) => {
    const rows = []
    data.forEach(row => {
      let rowData = {}
      row.forEach((element, index) => {
        rowData[headers[index]] = element
      })
      rows.push(rowData)

    });
    return rows
  }

  const importExceltoDB =(e) =>{
    // Axios.post("http://localhost:3001/api/inventory/insertExl",{
    //   data:data
    // })
    // .then(function (response) {
    //     // your action after success
    //     console.log(response);
    //     setModal({Visible:false});
    // })
    // .catch(function (error) {
    //    // your action on error success
    //     console.log(error);
    // });

    //for adding Brands
    data.map((rows)=>{
      console.log(rows[rows].productName);
      // Axios.post('http://localhost:3001/api/brand/insertExl', {
      //   BrandName: rows[rows].inventoryID,
       
      // }).then(() => {
      //   console.log('Data added successfully to order items');
      // }).catch((err) => {
      //   alert(err.response.data);
      //   return;
      // });
    })
  }
  
  const importExcel = (e) => {

    if(e.target.files[0]===null){
      alert("No Excel Detected.");
    }
    else{
      const file = e.target.files[0]

      const reader = new FileReader()
      reader.onload = (event) => {
        //parse data
  
        const bstr = event.target.result
        // const workBook = XLSX.read(bstr, { type: "binary" })
        const workBook = XLSX.read(bstr, { type: "binary", raw:false, cellDates:true ,dateNF: 'dd-MM-yyyy' ,strip: false,blankrows:true})
  
        //get first sheet
        const workSheetName = workBook.SheetNames[0]
        const workSheet = workBook.Sheets[workSheetName]
        //convert to array
        const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 })
        // console.log(fileData)
        const headers = fileData[0]
        const heads = headers.map(head => ({ title: head, field: head }))
        setColDefs(heads)
  
        //removing header
        fileData.splice(0, 1)
  
        
        setData(convertToJson(headers, fileData))
        console.log(data[0].productName);
      }
  
      if (file) {
        if (getExention(file)) {
          reader.readAsBinaryString(file)
          
        }
        else {
          alert("Invalid file input, Select Excel, CSV file")
        }
      } else {
        setData([])
        setColDefs([])
      }
    }
    
  }

  


  const openNotificationWithIconDelete = (type) => {
    notification[type]({
      message: "SUCCESS!",
      description: "Product Deleted Successfully.",
      duration: 2,
    });
  };

  const deleteButton = (invID)=>{
    if(window.confirm("Are you sure to delete this product?")){
      Axios.delete(`http://localhost:3001/api/inventory/remove/${invID}`);
      openNotificationWithIconDelete("success");
    }
    setCount(() => count + 1);
  }

  const [isModalShown, set] = useState(false);

  const toggleModal = () => {
    set((isShown) => !isShown);
  };    

  //pag load ng page at show ng data sa table
  // useEffect(() => {
  //   Axios.get("http://localhost:3001/api/inventory/get").then((response) => {
  //     setInventoryList(response.data);
  //   });
  // }, [count]);

  useEffect(() => {
    fetch()
    console.log(inventoryList);
  }, []);

  const fetch = async () => {
    const { data } = await Axios.get("http://localhost:3001/api/inventory/get")
    setInventoryList(data);
  }

  //for view 
  const viewLoad = (event) => {
    console.log("ViewLoad initiated");
    console.log("setid: " + setid);
      Axios.get(`http://localhost:3001/api/inventory/get/${setid}`).then((response)=>{
        setPName(response.data.productName);
        setPDescription(response.data.productDescription);
        setPAttribute(response.data.productAttribute);
        setPAttrValue(response.data.productAttrValue);
        setPPrice(response.data.productPrice);
        setPBrand(response.data.productBrand);
        setPCategory(response.data.productCategory);
        setPSupplier(response.data.productSupplier);
        setupdateCBRP(response.data.productReqPres);
        setPSKU(response.data.productSKU);
        setIDateExp(response.data.inventoryDateExp);
        setIDateManu(response.data.inventoryDateManu);
        setIQuantity(response.data.inventoryQuantity);
        setIStatus(response.data.inventoryStatus);
    });
  };

  const inventoryGrid = [
    {
      dataIndex: 'productSKU',
      title: 'Product SKU',
      align: 'Center',
      width: '20',
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
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
      dataIndex: 'inventoryQuantity',
      title: 'Stocks',
      align: 'Center',
      width: '20',
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
      title: 'Prescription\nRequired',
      dataIndex: 'productReqPres',
      align: 'Center',
      width: '100',
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}} className='font-extrabold'>{text}</p>
      }
    },
    {
      title: 'Status',
      dataIndex: 'inventoryStatus',
      defaultSortOrder: 'descend',
      // sorter: (a, b) => a.status.localeCompare(b.status),
      sortDirections: ['descend', 'ascend'],
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
        <Space align='end'>
          <Link to={`/inventory/update/${record.inventoryID}`}>
            <Button style={{backgroundColor: '#83D2FF'}} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto w-10 sm:w-10 md:w-10 md:p-3 md:pl-3 sm:pr-2.5'>
              <img className='w-auto h-5 sm:w-auto md:w-10 md:h-5 mr-2 sm:mr-0 sm:mx-auto object-scale-down' src={edit}/>
            </Button>
          </Link>

          <Button style={{backgroundColor: '#46E4AC'}} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto -mr-3 w-10 sm:w-10 md:w-10 md:p-0 sm:pr-2.5' onClick={()=> {
                setid = record.inventoryID; 
                viewLoad(); 
                showModal();
                setCount((c) => c + 1);
            }}>
            <img className='w-auto h-5 sm:w-auto md:w-10 md:h-5 mr-2 sm:mr-0 md:mx-auto sm:mx-auto object-scale-down' src={view}/>
          </Button>

          <Button style={{backgroundColor: "#ED5264", marginLeft: 12}} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto w-10 sm:w-10 md:w-10 md:p-0 sm:pr-2.5' onClick={() => {
                deleteButton(record.inventoryID);
                setCount((c) => c + 1);
            }}>
            <img className='w-auto h-5 sm:w-auto md:w-5 mr-2 sm:mr-0 md:mx-auto sm:mx-auto object-scale-down' src={archive}/>
          </Button>
        </Space>
      
    },
  ];

  // const invList = inventoryList.map(({body,...item}) => ({
  //   ...item,
  //   key: item.inventoryID,
  //   message: body,
  // }))
  
  return (
    <div className='md:m-10 mt-20 mx-8'>
      <Header title='Inventory'/>

        <div className='m-2 md:m-10 p-2 md:px-10 pb-5 bg-white rounded-xl shadow-md'>

          <div className='flex w-full h-12 mt-2'>
            <p className='my-auto w-auto sm:w-34 md:w-72 px-4 font-bold'>Available Products</p>

            <div className='relative w-full'>
              <div className='absolute right-0 w-34'>

                <NavLink to={'/addinventory'}>
                  <Button type='button' size='sm' style={{backgroundColor: '#83D2FF'}} className='hover:bg-blue-400 text-black py-1 pl-2 pr-0 h-10 rounded inline-flex items-center my-1 mr-3 w-10 sm:w-10 md:w-auto md:p-4'>
                    <img className='w-auto h-6 sm:w-auto md:w-6 mr-2 sm:mr-0 md:mr-2 sm:mx-auto object-scale-down' src={add}/>
                    <p className='invisible text-sm font-semibold md:visible lg:flex sm:invisible'>Add</p>
                  </Button>
                </NavLink>
                <NavLink to={''}>
                  <Button type='button' onClick={()=>setModal({Title:"Import from Excel Modal" ,Visible:true})}size='sm' style={{backgroundColor: '#46E4AC'}} className='hover:bg-green-400 text-black py-1 pl-2 pr-0 h-10 rounded inline-flex items-center my-1 w-10 sm:w-10 md:w-auto md:p-4'>
                    <img className='w-6 h-6 mx-auto md:w-5 mr-2 sm:mr-0 md:mr-2 sm:mx-auto object-scale-down' src={impExcel}/>
                    <p className='invisible text-sm font-semibold md:visible lg:flex sm:invisible'>Import</p>
                  </Button>
                </NavLink>

                <Modal title={modal.Title} visible={modal.Visible} onOk={handleOk} onCancel={handleOk}
                  footer={[
                    <Button key="submit" size='sm' style={{backgroundColor: '#14D89A'}} className="w-20 mr-4" type="primary" onClick={importExceltoDB}>Import</Button>,
                    <Button key="back" size='sm' style={{backgroundColor: '#ED5264'}} className='rounded' onClick={handleOk}>Cancel</Button>,
                  ]}>

                  <div className='flex flex-col gap-4'>
                    <div>
                      <p>Import To Excel Modal</p>
                      {/* <Upload onChange={importExcel} accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'>
                        <Button>Click to Upload Excel to Import</Button>
                      </Upload>  */}
                      <input type="file" onChange={importExcel} accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'></input>
                    </div>
                    <div className='relative w-full overflow-x-auto'>
                    {/* <Table columns={colDefs} dataSource={data}></Table> */}
                    </div>
                  </div>
                </Modal>

                <Modal title="View Product" visible={isModalVisible} onCancel={doneModal} centered width={1000} footer={null}>
                   <div className='flex flex-col md:flex-row w-full min-w-screen justify-center items-center'>

                  <div className="flex md:mr-10  flex-col gap-4 justify-center w-full md:w-1/2 p-0 sm:w-full">

                  <div className="flex textboxes w-full">
                        <p className='my-auto font-display w-32'>Product SKU:</p>
                        <Input className='my-auto' value={productSKU || ''} placeholder="Please Select a SKU. "   disabled/>
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
                        <p className='my-auto font-display w-32'>Price (Php):</p>
                        <Input className='my-auto' value={productPrice || ''} placeholder="Please Select a SKU. "   disabled/>
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
                        <p className='my-auto font-display w-32'>Date Manufactured:</p>
                        <Input className='my-auto' value={retrievedDateManu} placeholder="Date Manufactured"   disabled/>
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
                        <p className='my-auto font-display w-32'>Requires Prescription: </p>
                        <Input type = "checkbox" defaultChecked={updateCBRP? true:null} disabled />
                    </div>
                    
                  </div>
                  </div>

                </Modal>

              </div>
            </div>
          </div>
          
          <div style={{borderColor: "#747C95"}} className=" w-full my-5 border-b-2 rounded"></div>

          <div className='m-2 my-auto bg-white rounded overflow-auto'>
            <Table bordered className='mt-14' columns={inventoryGrid} dataSource={inventoryList}></Table>
          </div>

        </div>
    </div>
  )
  }



export default Inventory