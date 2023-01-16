import {React, useState, useEffect, useContext} from 'react';
import CheckoutLogo from '../images/CheckoutLogo.png';
import { Image, Row, Col, Button} from 'react-bootstrap';
import { Table, DatePicker, Space } from 'antd';
import './css/CheckoutPage.css';
import next from '../images/more-than.png';
import paypalLogo from '../images/Payment/paypal_icon.png';
import payMayaLogo from '../images/Payment/paymaya.png';
import onSiteLogo from '../images/Payment/cash.png';
import {PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer} from "@paypal/react-paypal-js";
import { useStateContext } from './ContextFiles/ContextProvider';
import medLogo from '../images/corumed_med_logo.png'
import { useNavigate } from 'react-router-dom';
import mainApi from './ContextFiles/Api';
import { v4 as uuidv4, validate } from "uuid";
import Axios from "axios";
import moment from 'moment';
import { customAlphabet } from 'nanoid';
import { AuthContext } from './ContextFiles/AuthContext';
import paymaya from 'paymaya-js-sdk';

const CheckoutPage = () => {
    
    const navigate = useNavigate();
    const uniqueid = customAlphabet('1234567890', 10);
    const {user, verify, setLoginStatus, isLoggedIn}= useContext(AuthContext)
    const { checkoutItem, setCheckoutItem, referenceNumber, setReferenceNumber } = useStateContext();
    // const [referenceNumber, setReferenceNumber] = useState('');

    //For Radio Button
    const [item, setItem] = useState({ payment: "", another: "another" });
    const [buttonVisible, setButtonVisible] = useState(false);

    const { payment } = item;

    const handleChange = e => {
      e.persist();
      console.log('payment:', e.target.value);
      setItem(prevState => ({
        ...prevState,
        payment: e.target.value
      }));
    };
    
    useEffect(() => {
        console.log(checkoutItem);
        if(checkoutItem.length === 0){
            navigate('/Cart');
        }
    }, [])

    const numberFormat = (value) =>
        new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'PHP'
    }).format(value);

    let totalAmount = checkoutItem.reduce((sum, item)=>{
        return sum + item.TotalAmount;
    }, 0);

    let totalProducts = checkoutItem.reduce((sum, item)=>{
        return sum + item.Quantity;
    }, 0);

    const handlePlaceOrder = async (reference) => {
        setReferenceNumber(reference);
        await handleAddOrder(reference);
    }

    const handleAddOrder = async (reference) => {
        try{
            await Axios.post(`${mainApi}/api/order/insert/from/client`, {
              RefNumber: reference,
              CustCode: user.CustCode,
              TotalProducts: totalProducts,
              TotalAmount: totalAmount,
              Date: currentDate,
              Time: currentTimeMilitary,
              TotalTax: 0,
              TotalDiscount: 0,
              Status: 'pending',
            }).then((err) => {
              console.log('result: ', err);
            }).catch((err) => {
              alert(err.response.data);
            });

        }catch(e){
            console.log("Error in Insert Order: " + e);
        }
        
        await handleCartItem(reference)
    }

    const handleCartItem = async (reference) => {
        try{
            {await Array.from(checkoutItem).map((item) => {
                console.log('laman ni item: ', item);
                Axios.post(`${mainApi}/api/orderitem/insert/from/client`, {
                    InventoryID: item.InventoryID,
                    ProductPrice: item.inventorySalesPrice,
                    Quantity: item.Quantity,
                    ReferenceNumber: reference,
                    Discount: 0,
                    Tax: 0,
                }).then(() => {
                    console.log('Data added successfully to order items');
                }).catch((err) => {
                    alert("Error sa order items: " + err);
                });
            })}
        }catch(e){
            console.log("Error in Insert Order Items: " + e);
        }

        await handleInsertPayment(reference)
    }

    const handleInsertPayment = async (reference) => {
        try{
          await Axios.post(`${mainApi}/api/payment/insert/from/client`, {
            RefNumber: reference,
            CustCode: user.CustCode,
            PaymentMode: payment === ""? 'cash':payment,
            AmountPaid: 0,
            TotalChange: 0,
            Status: 'pending',
          }).then((err) => {
            console.log('Data added to payment...', err);
          }).catch((err) => {
            alert(err.response.data);
          });
        }catch(e){
          console.log("Error in Insert Payment: " + e);
        }
    
        await handleCartItemDelete()
    }

    const handleCartItemDelete = async () => {
        try{
            {await Array.from(checkoutItem).map((item) => {
                Axios.delete(`${mainApi}/api/customer/cart/delete/item/${user.CustCode}/${item.InventoryID}`).then((resp)=>{
                    console.log('result in delete: ', resp)
                }).catch((err)=>{
                    console.log('Delete Error: ', err)
                });
            })}
        }catch(err){
            console.log('Error in deleting item: ' + err)
        }
        
        console.log('Order Completed')
        navigate('/transaction/success')
    };

    let cartItems = [];
    Array.from(checkoutItem).map((item) => {
        cartItems.push({name:item.productName, quantity: item.Quantity, totalAmount: {value:(item.inventorySalesPrice*item.Quantity).toFixed(2)}})
    })

    let finalTotal = (totalAmount).toFixed(2);
    
    const exampleCheckoutObject = {
        requestReferenceNumber: uniqueid(17),
        items: cartItems,
        totalAmount: {
            value: finalTotal,
            currency: 'PHP',
        },
        metadata: {},
        redirectUrl: {
            success: `http://localhost:3000/transaction/success`,
            failure: "http://localhost:3002/failure",
            cancel: "http://localhost:3002/cancel"
        },
        bodyResponse: {},
        errorResponse: {
            "code": "2553",
            "message": "Missing/invalid parameters.",
            "parameters": [
                {
                    "description": "value must be a number",
                    "field": "totalAmount.value"
                },
                {
                    "description": "A valid currency is required.",
                    "field": "totalAmount.currency"
                }
            ]
        }
    };
    //pk-Z0OSzLvIcOI2UIvDhdTGVVfRSSeiGStnceqwUE7n0Ah
    const paymayaCheckout = () => {
        paymaya.init('pk-Z0OSzLvIcOI2UIvDhdTGVVfRSSeiGStnceqwUE7n0Ah', true);
        paymaya.createCheckout(exampleCheckoutObject);
    }

    const checkoutGridColumn = [
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
            dataIndex: "inventorySalesPrice",
            title: "Price",
            width: "200",
            align: "Center",
            sorter: {
              compare: (a, b) => a.inventorySalesPrice - b.inventorySalesPrice,
            },
            render: (text, record) => {
                return <p style={{ textTransform: "capitalize" }}>{numberFormat(text)}</p>;
            },
        },
        {
            dataIndex: "Quantity",
            title: "Quantity",
            width: "200",
            align: "Center",
            sorter: {
              compare: (a, b) => a.Quantity - b.Quantity,
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
        <div className='checkout-section bg-[#f6f5f5]'>
            <Row>
                <Col>
                    <h2 className='font-bold checkout-text'>Checkout</h2>
                    <hr className='checkout-red-line'></hr>
                </Col>
            </Row>
            <Row className='p-10'>
                <Col className="p-0 mb-3 mr-4 w-100">
                    <p className='bg-[#ED5264] font-medium text-xl text-white p-3 rounded-t-lg mb-0'>Order Summary:</p>
                    <div className='overflow-x-auto'>
                        <Table dataSource={checkoutItem} columns={checkoutGridColumn} rowKey='InventoryID'/>
                    </div>
                    <p className='bg-[#ED5264] text-lg text-white p-10 mt-0'>Total: {numberFormat(totalAmount)}</p>
                </Col>
                <Col className= 'p-0 bg-white 'md={3}>
                    <p className='bg-[#ED5264] font-medium text-xl text-white p-3 rounded-t-lg mb-4'>Select a payment method:</p>
                    <center>
                        <label className='cash-radio'>
                            <input type="radio" value="cash" checked={payment === 'cash'} onChange={handleChange}/>
                            <img src={onSiteLogo} alt='Option 1' height='150px' width='150px'/>
                        </label><br></br>
                        <hr/>
                        <label className='mb-3 paypal-radio'>
                            <input type="radio" value="paypal" checked={payment === 'paypal'} onChange={handleChange}/>
                            <img src={paypalLogo} alt='Option 2' height='150px' width='150px'/>
                        </label><br></br>
                        <hr/>
                        <label className='mb-3 paypal-radio'>
                            <input type="radio" value="paymaya" checked={payment === 'paymaya'} onChange={handleChange}/>
                            <img src={payMayaLogo} alt='Option 3' height='150px' width='150px'/>
                        </label>

                        {payment === 'paypal'? 
                            <PayPalScriptProvider
                                deferLoading={true}
                                options={{
                                    "client-id": "AVkuIu_4tSIfTcYvUFMgLf-PR4vYzO8fs8CSrbl0n-hq2dGkBnJKInBIsU59UQ7IPVkQ0awUoNRk07U6",
                                    components: "buttons",
                                    currency: "PHP"
                                }}
                            >
                                <ButtonWrapper
                                    currency={currency}
                                    showSpinner={false}
                                    Items={checkoutItem}
                                    navigate={navigate}
                                    user={user}
                                />
                            </PayPalScriptProvider>
                        :
                        // (payment === 'paymaya'? 
                        //     <Button className='w-full mt-2 bg-light-green-600 placeOrder-btn' 
                        //             onClick={async ()=>{
                        //                 // await handlePlaceOrder(uniqueid(17));
                        //                 paymayaCheckout()
                        //             }}
                        //     >
                        //         Pay With Maya
                        //     </Button>
                        //     :
                            
                        // )
                        <Button variant="danger" className='w-full mt-2 placeOrder-btn' 
                        onClick={async ()=>{
                            await handlePlaceOrder(uniqueid(17));
                            // paymayaCheckout()
                        }}
                >
                    Place Order
                </Button>
                    
                    }
                    </center>
                </Col>
            </Row>
            <center>
            </center>
        </div>
    );
}

const amount = "2";
const currency = "PHP";
const style = {"layout":"vertical"};

//For Date
const current = new Date();
const currentDate = `${moment(current).format("YYYY-MM-DD")}`;
const currentTime = `${moment(current).format("h:mm A")}`;
const currentTimeMilitary = `${moment(current).format("H:mm")}`;

const ButtonWrapper = ({ currency, showSpinner, Items, user, navigate }) => {
    
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    const { checkoutItem, setCheckoutItem, referenceNumber, setReferenceNumber } = useStateContext();

    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        });
    }, [currency, showSpinner]);

    let totalAmount = checkoutItem.reduce((sum, item)=>{
        return sum + item.TotalAmount;
    }, 0);

    let totalProducts = checkoutItem.reduce((sum, item)=>{
        return sum + item.Quantity;
    }, 0);

    const handleAddOrder = async (reference) => {
        try{
            await Axios.post(`${mainApi}/api/order/insert/from/client`, {
              RefNumber: reference,
              CustCode: user.CustCode,
              TotalProducts: totalProducts,
              TotalAmount: totalAmount,
              Date: currentDate,
              Time: currentTimeMilitary,
              TotalTax: 0,
              TotalDiscount: 0,
              Status: 'pending',
            }).then((err) => {
              console.log('result: ', err);
            }).catch((err) => {
              alert(err.response.data);
            });

        }catch(e){
            console.log("Error in Insert Order: " + e);
        }
        
        await handleCartItem(reference)
    }

    const handleCartItem = async (reference) => {
        console.log('cart item reference:', referenceNumber)
        try{
            {await Array.from(checkoutItem).map((item) => {
                console.log('laman ni item: ', item);
                Axios.post(`${mainApi}/api/orderitem/insert/from/client`, {
                    InventoryID: item.InventoryID,
                    ProductPrice: item.inventorySalesPrice,
                    Quantity: item.Quantity,
                    ReferenceNumber: reference,
                    Discount: 0,
                    Tax: 0,
                }).then(() => {
                    console.log('Data added successfully to order items');
                }).catch((err) => {
                    alert("Error sa order items: " + err);
                });
            })}
        }catch(e){
            console.log("Error in Insert Order Items: " + e);
        }

        await handleInsertPayment(reference)
    }

    const handleInsertPayment = async (reference) => {
        console.log("pumasok sa insert payment");
        try{
          await Axios.post(`${mainApi}/api/payment/insert/from/client`, {
            RefNumber: reference,
            CustCode: user.CustCode,
            PaymentMode: 'paypal',
            AmountPaid: totalAmount,
            TotalChange: 0,
            Status: 'paid',
          }).then((err) => {
            console.log('Data added to payment...', err);
          }).catch((err) => {
            alert(err.response.data);
          });
        }catch(e){
          console.log("Error in Insert Payment: " + e);
        }
    
        await handleCartItemDelete();
    }
    
    const handleCartItemDelete = async () => {
        try{
            {await Array.from(checkoutItem).map((item) => {
                Axios.delete(`${mainApi}/api/customer/cart/delete/item/${user.CustCode}/${item.InventoryID}`).then((resp)=>{
                    console.log('result in delete: ', resp)
                }).catch((err)=>{
                    console.log('Delete Error: ', err)
                });
            })}
        }catch(err){
            console.log('Error in deleting item: ' + err)
        }
        
        console.log('Order Completed')
        navigate('/transaction/success')
    };

    return (<>
            { (showSpinner && isPending) && <div className="spinner" /> }
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[amount, currency, style]}
                fundingSource={undefined}
                createOrder={(data, actions) => {
                    return actions.order
                        .create({
                            "purchase_units": [{
                                "description": "Orders Overview",
                                "amount": {
                                  "value": totalAmount,
                                  "currency_code": currency,
                                  "breakdown": {
                                    "item_total": {
                                      "currency_code": currency,
                                      "value": totalAmount
                                    }
                                  }
                                },
                            }]
                        })
                        .then((orderId) => {
                            // Your code here after create the order
                            return orderId;
                        });
                }}
                onApprove={function (data, actions) {
                    return actions.order.capture().then(async function (item) {
                        // Your code here after capture the order
                        setReferenceNumber(data.orderID);
                        await handleAddOrder(data.orderID);
                    });
                }}
            />
        </>
    );
}

export default CheckoutPage;
