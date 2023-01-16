import React, { useContext, useEffect, useState } from 'react'
import AddImage from '../images/addimage.png';
import back from '../images/back_white.png';
import next from '../images/more-than.png'
import { Card, Col, Input, Result, Row, Table, Tabs } from 'antd';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { Button } from '@material-tailwind/react';
import mainApi from './ContextFiles/Api';
import Axios from "axios";
import { SmileOutlined } from '@ant-design/icons';
import medLogo from '../images/corumed_med_logo.png'
import { AuthContext } from './ContextFiles/AuthContext';
import { useStateContext } from './ContextFiles/ContextProvider';
import {BiSearchAlt} from 'react-icons/bi'

const OrderItemList = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const { checkoutItem, setCheckoutItem, handleCheckItemChange } = useStateContext();
    const {user, verify, setLoginStatus, isLoggedIn}= useContext(AuthContext)
    const [searchVal, setSearchVal] = useState('');
    const [orderItems, setOrderItems] = useState([]);
    const abortController = new AbortController();

    useEffect(() => {
        fetchOrderItems();
        return () => {  
            abortController.abort();
        }
    }, [])

    const numberFormat = (value) =>
        new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'PHP'
    }).format(value);

    //For Search
    const search = (data) => {
        return data.filter((item) =>
            item.TotalAmount.toString().toLowerCase().includes(searchVal) ||
            item.productName.toString().toLowerCase().includes(searchVal) ||
            item.productPrice.toString().toLowerCase().includes(searchVal) ||
            item.quantity.toString().toLowerCase().includes(searchVal)
        )
    }

    const fetchOrderItems = () => {
        Axios.get(`${mainApi}/api/orderitem/get/client/orders/${id}`, {signal: abortController.signal}).then((response)=>{
            setOrderItems(response.data);
            console.log(response.data)
          }).catch((err)=>{
            console.log('Order display error: ', err)
          });
    }

    let totalAmount = checkoutItem.reduce((sum, item)=>{
        return sum + item.TotalAmount;
    }, 0);

    let totalProducts = checkoutItem.reduce((sum, item)=>{
        return sum + item.Quantity;
    }, 0);

    const selectionColumns = [
        {
            dataIndex: "productImage",
            title: "Image",
            align: "Center",
            width: "150",
            render: (text, record) => {
            return <span className='flex items-center justify-center' style={{ textTransform: 'capitalize' }}>
                    {record.productImage? 
                    <img className='w-12 h-12' src={record.productImage}/>
                    :
                    <img className='w-12 h-12' src={medLogo}/>
                    }
                </span>
            },
        },
        {
            dataIndex: "productName",
            title: "Product Name",
            align: "Center",
            width: "150",
            sorter: (a, b) => a.productName.localeCompare(b.productName),
            render: (text, record) => {
            return <p style={{ textTransform: "capitalize" }}>{text}</p>;
            },
        },
        {
            dataIndex: "productPrice",
            title: "Price",
            width: "200",
            align: "Center",
            sorter: {
              compare: (a, b) => a.productPrice - b.productPrice,
            },
            render: (text, record) => {
            return <p style={{ textTransform: "capitalize" }}>{numberFormat(text)}</p>;
            },
        },
        {
            dataIndex: "quantity",
            title: "Quantity",
            width: "200",
            align: "Center",
            sorter: {
              compare: (a, b) => a.quantity - b.quantity,
            },
            render: (text, record, index) => {
            return <p>{text}pc/s.</p>;
            },
        },
        {
            dataIndex: "TotalAmount",
            title: "Amount",
            width: "200",
            align: "Center",
            sorter: {
              compare: (a, b) => a.TotalAmount - b.TotalAmount,
            },
            render: (text, record) => {
                return <p>{numberFormat(text)}</p>;
            },
        },
    ];

  return (
    <div className='overflow-auto'>
        <div className='bg-[#f6f5f5] rounded-t-lg sm:h-full h-full sm:w-full w-full py-11 px-10 flex flex-col font-Montserrat m-auto' >
            <div className='flex flex-row w-full'>
                <h2 className='float-left w-full font-bold'>
                    My Orders
                </h2>
                <div className='flex flex-row justify-end'>
                    <NavLink to={'/customer/orders'}>
                        <Button action='' type='button' size='sm' style={{backgroundColor: '#747C95'}} className='inline-flex items-center w-auto h-10 py-1 pl-2 pr-2 my-1 mr-3 text-black border-none rounded hover:bg-blue-gray-700 md:w-auto md:p-4'>
                            <img alt='' className='object-scale-down w-6 h-6 mx-auto mr-2 md:w-5 sm:mr-0 md:mr-2 sm:mx-auto' src={back}/>
                            <p className='pl-2 pr-5 mx-auto my-auto text-sm font-semibold text-white'>Back</p>
                        </Button>
                    </NavLink>
                </div>
            </div>
            <div className="flex w-full h-12 mt-2">
              <p className="w-full px-4 my-auto font-bold sm:w-34">
                Reference Number: {id}
              </p>
              {/* For search bar */}
              <div className='relative w-full'>
                <div className='absolute right-0 mt-3 mr-2 lg:w-1/3'>
                    <Input style={{ fontSize: '16', borderColor: "#747C95", borderRadius: '10px' }} className='w-full rounded-2xl mr-3.5 items-center font-poppins bor' placeholder='Search Item...' suffix={<BiSearchAlt className="text-xl" style={{color: "#747C95" }}/>}
                    onChange = {(e) => {setSearchVal(e.target.value.toLowerCase())}} value={searchVal}/>
                </div>
              </div>
            </div>
            <hr className='w-full'></hr>
            <div className='flex flex-col justify-center'>
                <div className='overflow-x-auto tb-cart'>
                    <Table dataSource={search(orderItems)} columns={selectionColumns} rowKey='itemOrderID'/>
                </div>
            </div>
            <div className='flex flex-col justify-center'>
                {id.length === 0?
                    <div className='flex flex-col items-center justify-center p-10 bg-white shadow-sm'>
                        <p className='font-semibold'>No Item Selected</p>
                        <div style={{ borderColor: "#747C95" }} className="w-1/12 mb-3 border-b-2 rounded "></div>
                    </div>
                    :
                    <div className='flex flex-col items-center justify-center p-10 bg-white shadow-sm'>
                        <p className='font-semibold'>Order Summary</p>
                        <div style={{ borderColor: "#747C95" }} className="w-1/12 mb-3 border-b-2 rounded "></div>
                        <p className='font-medium'>Total Products: {totalProducts || 0}pc/s.</p>
                        <p className='font-semibold'>Total Amount: {numberFormat(totalAmount) || 0}</p>
                    </div>
                }
            </div>
        </div>
    </div>
  )
}

export default OrderItemList