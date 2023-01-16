import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Link, useParams, NavLink, useNavigate } from 'react-router-dom';
import ImageNotAvail from '../images/imagenotavail.png';
import {Card, Col, Row, Button} from 'react-bootstrap';
import './css/ViewProductsPage.css';
import { Input, Modal, message } from 'antd';
import medLogo from '../images/corumed_med_logo.png'
import Neozep from '../images/Medicines/Neozep.jpg';
import Propan from '../images/Medicines/Propan.jpg';
import Diatabs from '../images/Medicines/Diatabs.jpg';
import Cetrizine from '../images/Medicines/Cetrizine.png';
import mainApi from './ContextFiles/Api';
import { v4 as uuidv4, validate } from "uuid";
import Axios from "axios";
import { AuthContext } from './ContextFiles/AuthContext';
import { useStateContext } from './ContextFiles/ContextProvider';

const ViewProductsPage = () => {

    const {user, verify, setLoginStatus, isLoggedIn}= useContext(AuthContext)
    const { checkoutItem, setCheckoutItem, handleCheckItemChange, fetchCartCount } = useStateContext();
    const navigate = useNavigate();
    const {id} = useParams();
    const [product, setProduct] = useState([]);
    const [modalMessage, setModalMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [errorMessage, setErrorMessage] = useState('');
    const [productSuggestion, setProductSuggestion] = useState([]);
    const [currentCartItem, setCurrentCartItem] = useState([]);
    const abortController = new AbortController();

    const numberFormat = (value) =>
        new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'PHP'
    }).format(value);

    useEffect(() => {
        fetchCurrentProduct();
        return () => {  
            abortController.abort();
        }
    }, [])

    useEffect(() => {
        try{
            fetchSuggestedProducts();
            fetchCurrentCartItems();
        }catch(err){
            console.log(err)
        }
        return () => {  
            abortController.abort();  
        }
    }, [product])

    const fetchCurrentProduct = () => {
        Axios.get(`${mainApi}/api/inventory/get/selected/product/${id}`, {signal: abortController.signal}).then((response)=>{
            setProduct(response.data);
        });
    }

    const fetchSuggestedProducts = () => {
        Axios.get(`${mainApi}/api/inventory/get/suggestion/${id}`, {signal: abortController.signal}).then((response)=>{
            setProductSuggestion(response.data);
        });
    }

    const fetchCurrentCartItems = () => {
        Axios.get(`${mainApi}/api/customer/cart/get/item/${user.CustCode}`, {signal: abortController.signal}).then((response)=>{
            setCurrentCartItem(response.data);
        });
    }

    const renderOtherCards = (card, index) =>{
        return (
            <Col key={index} md={3} className="mb-3">
                <Card className="box h-100">
                    <center><Card.Img variant="top" src={card.productImage? card.productImage:medLogo}/></center>
                    <Card.Body>
                        <Card.Title className="text-center">{card.productName}</Card.Title>
                        <Card.Text className="text-center">{card.productCategory}</Card.Text>
                        <Card.Text className="text-center">{numberFormat(card.inventorySalesPrice)}</Card.Text>
                        <center>
                            <Button style={{backgroundColor: 'rgb(130, 188, 231)'}} variant='primary' className='border-0' onClick={() => {
                                navigate(/view/product/${card.inventoryID});
                                window.location.reload(true);
                            }}>
                                Add to Cart
                            </Button>
                        </center>
                        {/* <Button variant="primary">View Product</Button> */}
                    </Card.Body>
                </Card>
            </Col>
        );    
    };

    //For Modal
    const handleModalClose = () => {
        setShowModal(false);
        setQuantity(1);
        setErrorMessage('');
    }

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    }

    const addToCart = useCallback(async () => {
        if (quantity < 1) {
          setErrorMessage(`Value should be atleast 1`);
          return;
        }
        if (quantity > product.inventoryQuantity) {
            setErrorMessage(`Value should not exceed ${product.inventoryQuantity}`);
          return;
        }

        const validQuantity = currentCartItem.some(e => (e.inventoryID === product.inventoryID && (e.Quantity + parseInt(quantity)) > product.inventoryQuantity))

        // currentCartItem.map((item) => {
        //     if(item.inventoryID === product.inventoryID && (item.Quantity + parseInt(quantity)) > product.inventoryQuantity){
        //         console.log('di papasok sa cart');
        //         console.log('quantity: ',item.Quantity + parseInt(quantity))
        //         console.log('curren cart: ', item.inventoryID === product.inventoryID);
        //     }else{
        //         console.log('papasok sa cart')
        //     }
        // })

        if(!validQuantity){
            await handleAddItem();
            handleModalClose();
        }else{
            console.log(product.inventoryID)
            message.open({
                type: 'warning',
                content: 'Quantity in your cart exceeds the total stocks.',
                className: 'custom-class',
                style: {
                  marginTop: '15vh',
                },
            })
        }

    }, [showModal, quantity]);

    const handleAddItem = () => {
        Axios.post(`${mainApi}/api/customer/cart/insert/item`, {
            CustomerCode: user.CustCode,
            invID: id,
            Quantity: quantity,
        }).then(() => {
            console.log('Item added to cart successfully');
        }).catch((err) => {
            alert('Insert Item Error: ', err.response.data);
        });

        fetchCartCount(user.CustCode);
        message.open({
            type: 'success',
            content: 'Item added to cart.',
            className: 'custom-class',
            style: {
              marginTop: '15vh',
            },
        })
    }
    
    return (
        <div className='viewprods-section p-5 bg-[#f6f5f5]'>
            <Row>
                <Col md={8}>
                    <Col md={10} className='mb-3'>
                        <Card className="box3 py-14 ">
                            <center>
                                <Card.Img variant="top" src={product.productImage? product.productImage:medLogo}/>
                                {product.productImage?
                                <></>
                                :
                                <p>Image Not Available</p>
                                }
                            </center>
                        </Card>
                    </Col>
                </Col>
                <Col className='bg-[#fff] p-0 pt-4 rounded-3xl shadow-md'>
                    <h3 className='text-center'>{product.productName}</h3>
                    <div className='flex items-center justify-center'>
                        <hr className='viewprods-line'/>
                    </div>
                    <p className='text-center'>Stocks: {product.inventoryQuantity}</p>
                    <p className='-mt-2 text-center'>Brand: {product.productBrand}</p>
                    <p className='-mt-2 text-center'>Category: {product.productCategory}</p>
                    <p className='-mt-2 -mb-2 text-center'>{product.productAttribute}: {product.productAttrValue}</p>
                    <div className='flex items-center justify-center'>
                        <hr className='viewprods-line'/>
                    </div>
                    <h3 className='p-3 text-center'>{numberFormat(product.inventorySalesPrice)}</h3>
                    <center className='mb-4'>
                        <NavLink to={isLoggedIn? '' : '/login'}>
                            <Button style={{backgroundColor: 'rgb(130, 188, 231)'}} onClick={()=>isLoggedIn? setShowModal(true):{}} className='border-0 shadow-md'>
                                Add to Cart
                            </Button>
                        </NavLink>
                    </center>
                </Col>
            </Row>
            <Row className='p-0'>
                <Col className='bg-[#fff] mt-5 p-0'>
                    <p className='pt-4 ml-4 text-lg font-bold'>Product Description</p>
                    <hr className='viewprods-line2'/>
                    <p className='p-3 text-justify'>{product.productDescription}</p>
                </Col>
            </Row>  
            <Row>
                <Col className='bg-[#ED5264]'>
                    <p className='pt-4 ml-1 text-lg font-bold text-white'>You may also like: </p>
                    <hr className='viewprods-line3'/>
                </Col> 
            </Row>
            <Row className=" bg-[#ED5264] d-flex flex-row overflow-auto p-4">
                {productSuggestion.map(renderOtherCards)}
            </Row>
            <Modal 
                title={"Product Name: " + product.productName}
                open={showModal}
                onCancel={handleModalClose}
                centered
                width={300}
                onOk={handleModalClose}
                footer={[
                    <Button key="submit" size='sm' style={{backgroundColor: '#14D89A'}} className="w-20 mr-4 border-0 rounded" type="primary" onClick={addToCart}>Add</Button>,
                    <Button key="back" size='sm' style={{backgroundColor: '#ED5264'}} className='border-0 rounded' onClick={handleModalClose}>Cancel</Button>,
                ]}>
                    <div className="flex flex-col items-center justify-between w-full -mt-2 min-w-screen">
                        <div className="flex flex-col justify-center w-full h-16 p-0 md:w-10/12 sm:w-full">
                            <div className="flex flex-col justify-center w-full gap-2 textboxes h-9">
                                <p className="w-auto my-auto sm:w-34 md:w-72">Please Enter Quantity:</p>
                                <Input type="number"
                                min={1}
                                className="w-full h-auto"
                                placeholder="Enter quantity"
                                value={quantity}
                                onChange={handleQuantityChange}
                                />
                                <small className="-mt-2 text-red-400">{errorMessage}</small>
                            </div>
                        </div>
                    </div>
                
            </Modal>
        </div>
    );
}

export default ViewProductsPage;
