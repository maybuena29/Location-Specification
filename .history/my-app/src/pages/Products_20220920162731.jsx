import React, { useState, useEffect } from 'react';
import add from '../Images/add.png';
import impExcel from '../Images/import.png';
import edit from '../Images/edit.png';
import archive from '../Images/archive.png';
import view from '../Images/view.png';

import { Header } from '../components';
import { NavLink, Link } from 'react-router-dom';
import { Button } from '@material-tailwind/react';

import Axios from 'axios';
import { Modal, Space, Table, notification, Input } from 'antd';


const { TextArea } = Input;

const Products = () => {
  const [modal, setModal] = useState({Title: 'Import from Excel', Visible: false, });
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
    supplier: "",
    status: "",
    type: "",
    sku: "",
    requiredPrescription: undefined,
    updateCBRP: undefined,
  })
  const showModal = () => {
    setIsModalVisible(true);
  };

  const doneModal = () => {
    setIsModalVisible(false);
  };
  const handleOk = () => {
    setModal({Visible: false});
  };
  const openNotificationWithIconDelete = (type) => {
    notification[type]({
      message: "SUCCESS!",
      description: "Product Deleted Successfully.",
      duration: 2,
    });
  };

  const deleteProduct = async (PID) => {
    if (window.confirm("Are you sure to delete this product?")) {
      await Axios.delete(`http://localhost:3001/api/products/remove/${PID}`);
      fetch()
      openNotificationWithIconDelete("success");
    }
   
  }
  //pag load ng page at show ng data sa table
  useEffect(() => {
    fetch()
  }, []);

  const fetch = async () => {
    const { data } = await Axios.get("http://localhost:3001/api/products/get")
    setProductList(data)
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
      supplier: record.productSupplier,
      type: record.productType,
      updateCBRP: record.productReqPres
    })
  };

  const productGrid = [

    {
      dataIndex: 'productName',
      title: 'Product Name',
      align: 'Center',
      width: '150',
      render: (text, record) => {
        return <span style={{ textTransform: 'capitalize' }}>{text}</span>
      }
    },
    {
      dataIndex: 'productDescription',
      title: 'Product Description',
      width: '150',
      align: 'Center',
      render: (text, record) => {
        return <span style={{ textTransform: 'capitalize' }}>{text}</span>
      }
    },
    {
      dataIndex: 'productPrice',
      title: 'Price',
      width: '200',
      align: 'Center',
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
      render: (text, record) => {
        return <span style={{ textTransform: 'capitalize' }}>{text}</span>
      }
    },
    {
      dataIndex: 'productSupplier',
      title: 'Supplier',
      width: '120',
      align: 'Center',
      render: (text, record) => {
        return <span style={{ textTransform: 'capitalize' }}>{text}</span>
      }
    },
    {
      title: 'Prescription Required',
      dataIndex: 'productReqPres',
      align: 'Center',
      width: '100',
      render: (text, record) => {
        return <span style={{ textTransform: 'capitalize' }} className='font-extrabold'>{text}</span>
      }
    },
    {
      title: 'Status',
      dataIndex: 'productStatus',
      defaultSortOrder: 'descend',
      // sorter: (a, b) => a.status.localeCompare(b.status),
      sortDirections: ['descend', 'ascend'],
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
                <Button type='button' size='sm' style={{ backgroundColor: '#46E4AC' }} className='hover:bg-green-400 text-black py-1 pl-2 pr-0 h-10 rounded inline-flex items-center my-1 w-10 sm:w-10 md:w-auto md:p-4'>
                  <img className='w-6 h-6 mx-auto md:w-5 mr-2 sm:mr-0 md:mr-2 sm:mx-auto object-scale-down' src={impExcel} />
                  <p className='invisible text-sm font-semibold md:visible lg:flex sm:invisible'>Import</p>
                </Button>
              </NavLink>

              <Modal title="View Product" visible={isModalVisible} onCancel={doneModal} centered width={1000} footer={null}>
                <div className='flex flex-col md:flex-row w-full min-w-screen justify-center items-center'>

                  <div className="flex md:mr-10  flex-col gap-4 justify-center w-full md:w-1/2 p-0 sm:w-full">
                    <div className="flex textboxes w-full">
                      <p className='my-auto font-display w-32'>Product Name:</p>
                      <Input className='my-auto' placeholder="Enter Product Name" floatlabeltype="Auto" value={product.name} />
                    </div>
                    <div className="flex textboxes w-full">
                      <p className='font-display w-32'>Product Description:</p>
                      <TextArea rows={4} placeholder="Enter Product Description" floatlabeltype="Auto" className='resize-none' value={product.description} />
                    </div>
                    <div className="flex textboxes w-full">
                      <p className='my-auto font-display w-32 font-bold'>Product Attribute:</p>
                    </div>
                    <div className="flex textboxes w-full">
                      <p className='my-auto font-display w-32'>Attribute Name:</p>
                      <Input className='my-auto' placeholder="Choose Size" floatlabeltype="Auto" value={product.attribute} />
                    </div>
                    <div className="flex textboxes w-full">
                      <p className='my-auto font-display w-32'>Attribute Value:</p>
                      <Input className='my-auto' placeholder="Enter Product Unit" floatlabeltype="Auto" value={product.attributeValue} />
                    </div>
                  </div>

                  <div className="flex  flex-col gap-4 justify-center w-full md:w-1/2 p-0 sm:w-full">

                    <div className="flex textboxes w-full">
                      <p className='my-auto font-display w-32'>Price:</p>
                      <Input placeholder="Enter Price" type="number" floatlabeltype="Auto" value={product.price} />
                    </div>

                    <div className="flex textboxes w-full">
                      <p className='my-auto font-display w-32'>Category:</p>
                      <Input className='my-auto' placeholder="Enter Product Category" floatlabeltype="Auto" value={product.category} />
                    </div>

                    <div className="flex textboxes w-full">
                      <p className='my-auto font-display w-32'>Brand:</p>
                      <Input className='my-auto' placeholder="Enter Product Brand" floatlabeltype="Auto" value={product.brand} />
                    </div>

                    <div className="flex textboxes w-full">
                      <p className='my-auto font-display w-32'>Product SKU:</p>
                      <Input className='my-auto' value={product.sku} placeholder="Enter Product SKU" />
                    </div>
                    <div className="flex textboxes w-full">
                      <p className='my-auto font-display w-32'>Supplier:</p>
                      <Input className='my-auto' placeholder="Enter Product Supplier" floatlabeltype="Auto" value={product.supplier} />
                    </div>

                    <div className="flex textboxes w-full">
                      <p className='my-auto font-display w-32'>Requires Prescription: </p>
                      <Input type="checkbox" floatlabeltype="Auto" value="1" checked={product.updateCBRP === "✔" ? true : false} />
                    </div>

                  </div>
                </div>
              </Modal>

              <Modal title={modal.Title} visible={modal.Visible} onOk={handleOk} onCancel={handleOk}
                  footer={[
                    <Button key="submit" size='sm' style={{backgroundColor: '#14D89A'}} className="w-20 mr-4" type="primary" onClick={handleSubmit}>Import</Button>,
                    <Button key="back" size='sm' style={{backgroundColor: '#ED5264'}} className='rounded' onClick={handleOk}>Cancel</Button>,
                  ]}>

                  <div className='flex flex-col gap-4'>
                    <div>
                      <p className='text-red-700'>{message}</p>
                      
                    </div>
                    <div>
                      <p className='text-red-700'>{message2}</p>
                      
                     
                    </div>
                  </div>
                </Modal>
            </div>
          </div>
        </div>

        <div style={{ borderColor: "#747C95" }} className=" w-full my-5 border-b-2 rounded"></div>

        <div className='m-2 my-auto bg-white rounded overflow-auto'>
          <Table bordered className='mt-14' columns={productGrid} dataSource={productList} rowKey="productID"></Table>
        </div>

      </div>
    </div>
  )
}

export default Products