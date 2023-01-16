import React, { useState, useEffect } from 'react';
import add from '../Images/add.png';
import impExcel from '../Images/import.png';
import edit from '../Images/edit.png';
import archive from '../Images/archive.png';
import medLogo from '../Images/corumed_med_logo.png'
import view from '../Images/view.png';
import type { ColumnsType, FilterValue, SorterResult } from 'antd/es/table/interface';

import { Header } from '../components';
import { NavLink, Link } from 'react-router-dom';
import { Button } from '@material-tailwind/react';

import Axios from 'axios';
import { Modal, Space, Table, notification, Input, Image, Spin } from 'antd';
import * as XLSX from 'xlsx';

const EXTENSIONS = ['xlsx'];
const { TextArea } = Input;

const Products = () => {

  const [productList, setProductList] = useState([]);
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
  const imgPath = "http://localhost:3001/uploads/productImages/";
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
    
    await Axios.post("http://localhost:3001/api/import/product",{
      data:data
    })
    .then((response)=>{
      console.log(response);
      setModal({Visible:false});
    } )
    .catch((error)=>{
    // your action on error success
      console.log(error);
    });

    handleOk();
  }
  

  const importExcel = (e) => {
    const excelfile = e.target.files[0];

    if(excelfile[0]===null){
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
        console.log(data);
        
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

  const openNotificationWithIconDelete = (type) => {
    notification[type]({
      message: "SUCCESS!",
      description: "Product Deleted Successfully.",
      duration: 2,
    });
  };

  const deleteProduct = async (PID) => {
    if (window.confirm("Are you sure to delete this product?")) {
      const { data } = await Axios.delete(`http://localhost:3001/api/products/remove/${PID}`);

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
    const { data } = await Axios.get("http://localhost:3001/api/products/get", {
      signal: abortController.signal
    })
    setProductList(data)
  }

  //For search
  const search = (data) => {
    return data.filter((item) =>
      item.productName.toLowerCase().includes(searchVal) ||
      item.productDescription.toLowerCase().includes(searchVal) ||
      item.productCategory.toLowerCase().includes(searchVal) ||
      item.productPrice.toString().toLowerCase().includes(searchVal) ||
      item.productAvailability.toLowerCase().includes(searchVal) ||
      item.productStatus.toLowerCase().includes(searchVal)
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
                  {record.productImage? <Image preview={false} className='w-12 h-12' src={imgPath + record.productImage}/>:<Image className='w-12 h-12' preview={false} src={medLogo}/>}
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
              <img className='w-auto h-5 sm:w-auto md:w-10 md:h-5 mr-2 sm:mr-0 sm:mx-auto object-scale-down' src={edit} />
            </Button>
          </Link>

          <Button style={{ backgroundColor: '#46E4AC' }} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto -mr-3 w-10 sm:w-10 md:w-10 md:p-0 sm:pr-2.5' onClick={() => {
            viewLoad(record);
            showModal();

          }}>
            <img className='w-auto h-5 sm:w-auto md:w-10 md:h-5 mr-2 sm:mr-0 md:mx-auto sm:mx-auto object-scale-down' src={view} />
          </Button>

          <Button style={{ backgroundColor: "#ED5264", marginLeft: 12 }} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto w-10 sm:w-10 md:w-10 md:p-0 sm:pr-2.5' onClick={() => {
            deleteProduct(record.productID);
          }}>
            <img className='w-auto h-5 sm:w-auto md:w-5 mr-2 sm:mr-0 md:mx-auto sm:mx-auto object-scale-down' src={archive} />
          </Button>
        </Space>

    },
  ];
  return (
    <div className='md:m-10 mt-20 mx-8'>
      <Header title='Products' />

      <div className='m-2 md:m-10 p-2 md:px-10 pb-5 bg-white rounded-xl shadow-md'>

        <div className='flex w-full h-12 mt-2'>
          <p className='my-auto px-4 font-semibold'>Masterlist</p>

          <div className='relative w-full'>
            <div className='absolute right-0 w-34'>

              <NavLink to={'/addproduct'}>
                <Button type='button' size='sm' style={{ backgroundColor: '#83D2FF' }} className='hover:bg-blue-400 text-black py-1 pl-2 pr-0 h-10 rounded inline-flex items-center my-1 mr-3 w-10 sm:w-10 md:w-auto md:p-4'>
                  <img className='w-auto h-6 sm:w-auto md:w-6 mr-2 sm:mr-0 md:mr-2 sm:mx-auto object-scale-down' src={add} />
                  <p className='invisible text-sm font-semibold md:visible lg:flex sm:invisible'>Add</p>
                </Button>
              </NavLink>
              <NavLink to={''}>
                <Button type='button' size='sm' onClick={()=>setModal({Title:"Import from Excel Modal" , Visible:true})} style={{ backgroundColor: '#46E4AC' }} className='hover:bg-green-400 text-black py-1 pl-2 pr-0 h-10 rounded inline-flex items-center my-1 w-10 sm:w-10 md:w-auto md:p-4'>
                  <img className='w-6 h-6 mx-auto md:w-5 mr-2 sm:mr-0 md:mr-2 sm:mx-auto object-scale-down' src={impExcel} />
                  <p className='invisible text-sm font-semibold md:visible lg:flex sm:invisible'>Import</p>
                </Button>
              </NavLink>

              <Modal title={modal.Title} visible={modal.Visible} onOk={handleOk} onCancel={handleOk}
                footer={[
                  <Button key="submit" size='sm' style={{backgroundColor: '#14D89A'}} className="w-20 mr-4" type="primary" onClick={() => {importExceltoDB(); setLoading(true);}}>Import</Button>,
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

              <Modal title="View Product" visible={isModalVisible} onCancel={doneModal} centered width={1000} footer={null}>
                <div className='flex flex-col md:flex-row w-full min-w-screen justify-center items-center'>

                  <div className="flex md:mr-10  flex-col gap-4 justify-center w-full md:w-1/2 p-0 sm:w-full">
                    <div className="flex textboxes w-full">
                      <p className='my-auto font-display w-32'>Product Name:</p>
                      <Input className='my-auto' placeholder="No Value" floatlabeltype="Auto" value={product.name} />
                    </div>
                    <div className="flex textboxes w-full">
                      <p className='font-display w-32'>Product Description:</p>
                      <TextArea rows={4} placeholder="No Value" floatlabeltype="Auto" className='resize-none' value={product.description} />
                    </div>
                    <div className="flex textboxes w-full">
                      <p className='my-auto font-display w-32 font-bold'>Product Attribute:</p>
                    </div>
                    <div className="flex textboxes w-full">
                      <p className='my-auto font-display w-32'>Attribute Name:</p>
                      <Input className='my-auto' placeholder="No Value" floatlabeltype="Auto" value={product.attribute} />
                    </div>
                    <div className="flex textboxes w-full">
                      <p className='my-auto font-display w-32'>Attribute Value:</p>
                      <Input className='my-auto' placeholder="No Value" floatlabeltype="Auto" value={product.attributeValue} />
                    </div>
                  </div>

                  <div className="flex  flex-col gap-4 justify-center w-full md:w-1/2 p-0 sm:w-full">

                    <div className="flex textboxes w-full">
                      <p className='my-auto font-display w-32'>Price:</p>
                      <Input placeholder="No Value" type="number" floatlabeltype="Auto" value={product.price} />
                    </div>

                    <div className="flex textboxes w-full">
                      <p className='my-auto font-display w-32'>Category:</p>
                      <Input className='my-auto' placeholder="No Value" floatlabeltype="Auto" value={product.category} />
                    </div>

                    <div className="flex textboxes w-full">
                      <p className='my-auto font-display w-32'>Brand:</p>
                      <Input className='my-auto' placeholder="No Value" floatlabeltype="Auto" value={product.brand} />
                    </div>

                    <div className="flex textboxes w-full">
                      <p className='my-auto font-display w-32'>Product SKU:</p>
                      <Input className='my-auto' value={product.sku} placeholder="No Value" />
                    </div>

                    <div className="flex textboxes w-full">
                      <p className='my-auto font-display w-32'>Availability:</p>
                      <Input className='my-auto' placeholder='No Value' floatlabeltype="auto" value={product.updateCBRP} />
                    </div>

                  </div>
                </div>
              </Modal>

            </div>
          </div>
        </div>

        <div style={{ borderColor: "#747C95" }} className=" w-full my-5 border-b-2 rounded"></div>

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
          <Table bordered className='mt-14' pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '25', '50', '100']}} columns={productGrid} dataSource={search(productList)} rowKey="productID"></Table>
        </div>

      </div>
    </div>
  )
}

export default Products