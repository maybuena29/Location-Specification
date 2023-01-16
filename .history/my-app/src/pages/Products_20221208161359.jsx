import React, { useState, useEffect,useContext } from 'react';
import add from '../Images/add.png';
import impExcel from '../Images/import.png';
import edit from '../Images/edit.png';
import archive from '../Images/archive.png';
import medLogo from '../Images/corumed_med_logo.png'
import view from '../Images/view.png';
import { TrinityRingsSpinner } from 'react-epic-spinners'
import type { ColumnsType, FilterValue, SorterResult } from 'antd/es/table/interface';
import { AuthContext } from '../contexts/AuthContext';
import * as FileSaver from 'file-saver';
import { Header } from '../components';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import mainApi from '../contexts/Api';
import Axios from 'axios';
import { Modal, Space, Table, notification, Input, Image, Spin, message } from 'antd';
import * as XLSX from 'xlsx';

const EXTENSIONS = ['xlsx'];
const { TextArea } = Input;

const Products = () => {
  const {isLoggedIn}= useContext(AuthContext);
  const navigate = useNavigate();
  
  const [productList, setProductList] = useState([]);
  const [productListExl, setProductListExl] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    attribute: "",
    attributeValue: "",
    quantity: 0,
    price: 0,
    category: "",
    brand: "",
    status: "",
    type: "",
    sku: "",
    requiredPrescription: undefined,
    updateCBRP: undefined,
  })
  const [searchVal, setSearchVal] = useState('');
  const [loading, setLoading] = useState(false);
  const [importValidation, setImportValidation] = useState(false);
  const abortController = new AbortController();

  const handleOk = () => {
    setModal({Visible: false});
    setLoading(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const doneModal = () => {
    setIsModalVisible(false);
  };
  const [colDefs, setColDefs] = useState()
  const [data, setData] = useState()
  const [modal, setModal] = useState({Title: 'Import from Excel', Visible: false, });

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

  const importExceltoDB = async (e) =>{
    
    if(importValidation){
      setLoading(true)
      await Axios.post(`${mainApi}/api/import/product`,{
        data:data
      })
      .then((response)=>{
        console.log(response);
      } )
      .catch((error)=>{
      // your action on error success
        console.log(error);
      });

      setModal({Visible:false});
      setLoading(false);
      handleOk();
      fetch();
    }else{
      message.error('Please choose a file first.');
    }

  }
  

  const importExcel = (e) => {
    const excelfile = e.target.files[0];
    console.log(excelfile.File);
    if(excelfile[0] === null){
      alert("No Excel Detected.");
    }
    else{
      setImportValidation(true);
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
      }
  
      if (file) {
        if (getExention(file)) {
          reader.readAsBinaryString(file)
          
        }
        else {
          alert("Invalid file input, Select Excel, XLSX file")
        }
      } else {
        setData([])
        setColDefs([])
      }
    }
    
  }

  const ExportToExcel = () => {
    const fileType = "xlsx"
    console.log(productListExl)
    const exportToCSV = () => {
      productListExl.map((item, index)=> {
            // console.log("item", item)
             item['json'] = XLSX.utils.json_to_sheet(item.data);
        })
        const obj = {
            Sheets:{},
            SheetNames:[]
        }
        productListExl.map((item, key)=> {
           return( obj.Sheets[item.category] = item.json,
           obj.SheetNames.push(item.category))
        })
        const test = {...obj}
        const excelBuffer = XLSX.write(test, {bookType:"xlsx", type:"array"});
        const data = new Blob([excelBuffer], {type:fileType});
        FileSaver.saveAs(data, "Corumed-Masterlist"+".xlsx")
       console.log("exportToExl")
    }
    exportToCSV();
  }

  const openNotificationWithIconDelete = (type) => {
    notification[type]({
      message: "SUCCESS!",
      description: "Product Deleted Successfully.",
      duration: 2,
    });
  };

  const deleteProduct = async (PID) => {
    if (window.confirm("Are you sure to delete this product?")) {
      const { data } = await Axios.delete(`${mainApi}/api/products/remove/${PID}`);

      if(data === ''){
        alert("This product is used by another module. \nYou cannot delete this data.");
        return;
      }
      fetch();
      openNotificationWithIconDelete("success");
    }
   
  }


  //pag load ng page at show ng data sa table
  useEffect(() => {
    fetch()

    
    return () => {  
      abortController.abort();
    }
  }, []);

  const fetch = async () => {
    const { data } = await Axios.get(`${mainApi}/api/products/get`, {
      signal: abortController.signal
    }).catch((err)=>{
      if (err.response.status===403){
        navigate('/NotAuthorizedPage')
      }
      
    });
    setProductList(data)


    
    
  }
 
  //For search
  const search = (data) => {
    return data.filter((item) =>
      item.productName.toLowerCase().includes(searchVal.toLowerCase()) ||
      item.productDescription.toLowerCase().includes(searchVal.toLowerCase()) ||
      item.productCategory.toLowerCase().includes(searchVal.toLowerCase()) ||
      item.productPrice.toString().toLowerCase().includes(searchVal.toLowerCase()) ||
      item.productAvailability.toLowerCase().includes(searchVal.toLowerCase()) ||
      item.productStatus.toLowerCase().includes(searchVal.toLowerCase())
    )
  }

  //for view 
  const viewLoad = (record) => {
    setProduct({
      name: record.productName,
      description: record.productDescription,
      attribute: record.productAttribute,
      attributeValue: record.productAttrValue,
      price: record.productPrice,
      brand: record.productBrand,
      sku: record.productSKU,
      category: record.productCategory,
      updateCBRP: record.productAvailability
    })
  };

  const productGrid = [
    {
      dataIndex: 'productImage',
      title: 'Image',
      align: 'Center',
      width: '150',
      sorter: (a, b) => a.productImage.localeCompare(b.productImage),
      render: (text, record) => {
        return <span style={{ textTransform: 'capitalize' }}>
                  {record.productImage? <Image preview={false} className='w-12 h-12' src={record.productImage}/>:<Image className='w-12 h-12' preview={false} src={medLogo}/>}
               </span>
      }
    },
    {
      dataIndex: 'productName',
      title: 'Product Name',
      align: 'Center',
      width: '150',
      sorter: (a, b) => a.productName.localeCompare(b.productName),
      render: (text, record) => {
        return <span style={{ textTransform: 'capitalize' }}>{text}</span>
      }
    },
    {
      dataIndex: 'productDescription',
      title: 'Product Description',
      width: '150',
      align: 'Center',
      sorter: (a, b) => a.productDescription.localeCompare(b.productDescription),
      render: (text, record) => {
        return <span style={{ textTransform: 'capitalize' }}>{text}</span>
      }
    },
    {
      dataIndex: 'productPrice',
      title: 'Unit Price',
      width: '200',
      align: 'Center',
      sorter: {
        compare: (a, b) => a.productPrice - b.productPrice,
      },
      render: (text, record) => {
        return <span style={{ textTransform: 'capitalize' }}>₱{text}</span>
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
        return <span style={{ textTransform: 'capitalize' }}>{text}</span>
      }
    },
    {
      title: 'Availability',
      dataIndex: 'productAvailability',
      align: 'Center',
      width: '100',
      sorter: (a, b) => a.productAvailability.localeCompare(b.productAvailability),
      render: (text, record) => {
        return <span style={{ textTransform: 'capitalize' }}>{text}</span>
      }
    },
    {
      title: 'Status',
      dataIndex: 'productStatus',
      sorter: (a, b) => a.productStatus.localeCompare(b.productStatus),
      render: (text, record) => {
        return <span style={{ color: record.productStatus === 'active' ? 'green' : 'red', textTransform: 'capitalize' }} className='font-semibold'>{text}</span>
      }
    },
    {
      title: 'Actions',
      dataIndex: 'productID',
      key: 'productID',
      width: '150',
      align: 'Center',
      render: (_, record) =>
        <Space align='end'>
          <Link to={`/products/update/${record.productID}`}>
            <Button style={{ backgroundColor: '#83D2FF' }} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto w-10 sm:w-10 md:w-10 md:p-3 md:pl-3 sm:pr-2.5'>
              <img className='object-scale-down w-auto h-5 mr-2 sm:w-auto md:w-10 md:h-5 sm:mr-0 sm:mx-auto' src={edit} />
            </Button>
          </Link>

          <Button style={{ backgroundColor: '#46E4AC' }} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto -mr-3 w-10 sm:w-10 md:w-10 md:p-0 sm:pr-2.5' onClick={() => {
            viewLoad(record);
            showModal();

          }}>
            <img className='object-scale-down w-auto h-5 mr-2 sm:w-auto md:w-10 md:h-5 sm:mr-0 md:mx-auto sm:mx-auto' src={view} />
          </Button>

          <Button style={{ backgroundColor: "#ED5264", marginLeft: 12 }} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto w-10 sm:w-10 md:w-10 md:p-0 sm:pr-2.5' onClick={() => {
            deleteProduct(record.productID);
          }}>
            <img className='object-scale-down w-auto h-5 mr-2 sm:w-auto md:w-5 sm:mr-0 md:mx-auto sm:mx-auto' src={archive} />
          </Button>
        </Space>

    },
  ];
  return (
    <div className='mx-8 mt-20 md:m-10'>
      <Header title='Products' />

      <div className='p-2 pb-5 m-2 bg-white shadow-md md:m-10 md:px-10 rounded-xl'>

        <div className='flex w-full h-12 mt-2'>
          <p className='w-auto px-4 my-auto font-bold sm:w-34 md:w-72'>Masterlist</p>

          <div className='relative w-full'>
            <div className='absolute right-0 w-34'>

              <NavLink to={'/addproduct'}>
                <Button type='button' size='sm' style={{ backgroundColor: '#83D2FF' }} className='inline-flex items-center w-10 h-10 py-1 pl-2 pr-0 my-1 mr-3 text-black rounded hover:bg-blue-400 sm:w-10 md:w-auto md:p-4'>
                  <img className='object-scale-down w-auto h-6 mr-2 sm:w-auto md:w-6 sm:mr-0 md:mr-2 sm:mx-auto' src={add} />
                  <p className='invisible text-sm font-semibold md:visible lg:flex sm:invisible'>Add</p>
                </Button>
              </NavLink>
              <NavLink to={''}>
                <Button type='button' size='sm' onClick={()=>setModal({Title:"Import from Excel Modal" , Visible:true})} style={{ backgroundColor: '#46E4AC' }} className='inline-flex items-center w-10 h-10 py-1 pl-2 pr-0 my-1 text-black rounded hover:bg-green-400 sm:w-10 md:w-auto md:p-4'>
                  <img className='object-scale-down w-6 h-6 mx-auto mr-2 md:w-5 sm:mr-0 md:mr-2 sm:mx-auto' src={impExcel} />
                  <p className='invisible text-sm font-semibold md:visible lg:flex sm:invisible'>Import</p>
                </Button>
              </NavLink>
              <NavLink to={''}>
                <Button type='button' size='sm' onClick={()=>ExportToExcel()} style={{ backgroundColor: '#46E4AC' }} className='inline-flex items-center w-10 h-10 py-1 pl-2 pr-0 my-1 text-black rounded hover:bg-green-400 sm:w-10 md:w-auto md:p-4'>
                  <img className='object-scale-down w-6 h-6 mx-auto mr-2 md:w-5 sm:mr-0 md:mr-2 sm:mx-auto' src={impExcel} />
                  <p className='invisible text-sm font-semibold md:visible lg:flex sm:invisible'>Export</p>
                </Button>
              </NavLink>

              {/* {loading? 
                <div className='flex items-center justify-center flex-auto w-full mb-10'>
                  <div className='mx-auto mt-10 text-center'>
                      <TrinityRingsSpinner color="#FF3C52" size={100} animationDelay={0.1} className='mx-auto mb-5'></TrinityRingsSpinner>
                      <label className='mx-auto text-xl font-medium tracking-wide font-poppins'>Loading...</label>
                  </div>
                </div>
              : */}
                <Modal title={modal.Title} visible={modal.Visible} onOk={handleOk} onCancel={handleOk}
                  footer={[
                    <Button key="submit" size='sm' style={{backgroundColor: '#14D89A'}} className="w-20 mr-4" type="primary" onClick={() => {importExceltoDB();}}>Import</Button>,
                    <Button key="back" size='sm' style={{backgroundColor: '#ED5264'}} className='rounded' onClick={handleOk}>Cancel</Button>,
                  ]}>

                  <div className='flex flex-col gap-4'>
                    <div>
                      <p>Import from Excel Modal</p>
                      <input type="file" onChange={importExcel} accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'></input>
                    </div>
                    <div className='relative w-full overflow-x-auto'></div>
                  </div>
                </Modal>
              {/* } */}
              
                {/* <Modal title={modal.Title} visible={modal.Visible} onOk={handleOk} onCancel={handleOk}
                  footer={[
                    <Button key="submit" size='sm' style={{backgroundColor: '#14D89A'}} className="w-20 mr-4" type="primary" onClick={() => {importExceltoDB(); setLoading(true)}}>Import</Button>,
                    <Button key="back" size='sm' style={{backgroundColor: '#ED5264'}} className='rounded' onClick={handleOk}>Cancel</Button>,
                  ]}>

                  <div className='flex flex-col gap-4'>
                    <div>
                      <p>Import from Excel Modal</p>
                      <input type="file" onChange={importExcel} accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'></input>
                    </div>
                    <div className='relative w-full overflow-x-auto'></div>
                  </div>
                </Modal> */}

              <Modal title="View Product" visible={isModalVisible} onCancel={doneModal} centered width={1000} footer={null}>
                <div className='flex flex-col items-center justify-center w-full md:flex-row min-w-screen'>

                  <div className="flex flex-col justify-center w-full gap-4 p-0 md:mr-10 md:w-1/2 sm:w-full">
                    <div className="flex w-full textboxes">
                      <p className='w-32 my-auto font-display'>Product Name:</p>
                      <Input className='my-auto' placeholder="No Value" floatlabeltype="Auto" value={product.name} />
                    </div>
                    <div className="flex w-full textboxes">
                      <p className='w-32 font-display'>Product Description:</p>
                      <TextArea rows={4} placeholder="No Value" floatlabeltype="Auto" className='resize-none' value={product.description} />
                    </div>
                    <div className="flex w-full textboxes">
                      <p className='w-32 my-auto font-bold font-display'>Product Attribute:</p>
                    </div>
                    <div className="flex w-full textboxes">
                      <p className='w-32 my-auto font-display'>Attribute Name:</p>
                      <Input className='my-auto' placeholder="No Value" floatlabeltype="Auto" value={product.attribute} />
                    </div>
                    <div className="flex w-full textboxes">
                      <p className='w-32 my-auto font-display'>Attribute Value:</p>
                      <Input className='my-auto' placeholder="No Value" floatlabeltype="Auto" value={product.attributeValue} />
                    </div>
                  </div>

                  <div className="flex flex-col justify-center w-full gap-4 p-0 md:w-1/2 sm:w-full">

                    <div className="flex w-full textboxes">
                      <p className='w-32 my-auto font-display'>Price:</p>
                      <Input placeholder="No Value" type="number" floatlabeltype="Auto" value={product.price} />
                    </div>

                    <div className="flex w-full textboxes">
                      <p className='w-32 my-auto font-display'>Category:</p>
                      <Input className='my-auto' placeholder="No Value" floatlabeltype="Auto" value={product.category} />
                    </div>

                    <div className="flex w-full textboxes">
                      <p className='w-32 my-auto font-display'>Brand:</p>
                      <Input className='my-auto' placeholder="No Value" floatlabeltype="Auto" value={product.brand} />
                    </div>

                    <div className="flex w-full textboxes">
                      <p className='w-32 my-auto font-display'>Product SKU:</p>
                      <Input className='my-auto' value={product.sku} placeholder="No Value" />
                    </div>

                    <div className="flex w-full textboxes">
                      <p className='w-32 my-auto font-display'>Availability:</p>
                      <Input className='my-auto' placeholder='No Value' floatlabeltype="auto" value={product.updateCBRP} />
                    </div>

                  </div>
                </div>
              </Modal>

            </div>
          </div>
        </div>

        <div style={{ borderColor: "#747C95" }} className="w-full my-5 border-b-2 rounded "></div>

        {/* For search bar */}
        <div className='relative w-full'>
          <div className='absolute right-0 mt-1 mr-2'>
                <Input style={{ fontSize: '16' }} className='w-full mr-3.5 items-center font-poppins' placeholder='Search...'
                onChange = {(e) => {setSearchVal(e.target.value)}}
                value={searchVal}
                />
          </div>
        </div>

        <div className='m-2 my-auto overflow-auto bg-white rounded'>
          <Table bordered className='mt-14' pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '25', '50', '100']}} columns={productGrid} dataSource={search(productList)} rowKey="productID"></Table>
        </div>

      </div>
    </div>
  )
}

export default Products