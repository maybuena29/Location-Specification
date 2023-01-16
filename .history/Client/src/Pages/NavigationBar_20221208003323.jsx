import React, { useState } from 'react';
import { Nav, Navbar, NavDropdown, Form, Button, InputGroup } from 'react-bootstrap';
import { Link, Navigate, NavLink } from 'react-router-dom';
import { FaChevronDown, FaRegCaretSquareDown } from "react-icons/fa";
import './css/NavigationBar.css'
import Logo from '../images/CorumedTransparent.png'
import CartIcon from '../images/shopCart.png'
import {BsSearch} from 'react-icons/bs'
import {TbLogout} from 'react-icons/tb'
import mainApi from './ContextFiles/Api';
import Axios from "axios";
import { useEffect,useContext } from 'react';
import { useStateContext } from './ContextFiles/ContextProvider';
import { AuthContext } from './ContextFiles/AuthContext';
import { Badge, Dropdown, message, Space } from 'antd';
import Search from 'antd/lib/input/Search';

const NavigationBar = () => {
    
    const { checkoutItem, setCheckoutItem, handleCheckItemChange, cartItemCounter, setCartItemCounter } = useStateContext();
    const {user, verify, setLoginStatus, isLoggedIn}= useContext(AuthContext)
    const [categoryList, setCategoryList] = useState([]);
    const abortController = new AbortController();

    const fetchCategoryList = () => {
        Axios.get(`${mainApi}/api/category/get/categname/active`, {signal: abortController.signal}).then((response)=>{
            setCategoryList(response.data);
        });
    }

    function LogoutBTN(event){
        if(window.confirm('Are you sure that you wanted to logout?')){
          Axios.post(`${mainApi}/api/customer/account/logout`, {}, {withCredentials: true})
            setLoginStatus(false);
        }
    }

    function myOrders(event){
        <Navigate to={"/customer/orders"}></Navigate>
    }
    
    const fetchCartItems = () => {
        Axios.get(`${mainApi}/api/customer/cart/get/item/${user.CustCode}`, {signal: abortController.signal}).then((response)=>{
            setCartItemCounter(response.data);
        });
    }

    useEffect(() => {
        fetchCategoryList();
        fetchCartItems();
        return () => {  
            abortController.abort();
        }
    },[])

    useEffect(() => {
        fetchCartItems()
    }, [cartItemCounter])
    
    const onSearch = (value) => console.log(value);

    const onClick = ({ key }) => {
        if(key === '1'){
            window.location.replace("/customer/orders");
        }else if(key === '2'){
            window.location.replace("/Account");
        }else if(key === '3'){
            LogoutBTN()
        }
    };

    const items = [
        {
          label: 'My Orders',
          key: '1',
        },
        {
          label: 'Profile',
          key: '2',
        },
        {
          label: 'Logout',
          key: '3',
        },
    ];

    return (
        <div className='nav-bar'>
            <Navbar variant="light" sticky='top' expand="md" collapseOnSelect>
                <Navbar.Brand>
                    <img src={Logo} width="110px" height="110px"/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll"/>
                <Navbar.Collapse>
                    <Nav className='color-nav'>
                        <Nav.Link href="/Home">Home</Nav.Link>
                        <NavDropdown title="Categories" className='drop-categ'>
                            {Array.from(categoryList).map((category, index) => {
                                return(
                                    <div key={index}>
                                        <NavDropdown.Item href={`/Products/${category.Category_Name}`} onClick={(e) => setCategoryList(e.target.ariaValueText)}>{category.Category_Name}</NavDropdown.Item>
                                        <NavDropdown.Divider/>
                                    </div>
                                )
                            })}
                        </NavDropdown>              
                        <Nav.Link href='/Products'>Products</Nav.Link>
                        <Nav.Link href="/About">About</Nav.Link>
                    </Nav>
                    <Search className='pr-3' placeholder="Search" onSearch={onSearch} enterButton size='middle'/>
                </Navbar.Collapse>
                
                {isLoggedIn ?
                    <Nav className='mt-2 icon'>
                        <div className="cart-icon">
                            <Button className='bg-transparent' variant='light' href='/Cart'>
                                <Badge count={cartItemCounter.length} className='text-xl'>
                                    <img src={CartIcon} width="40px" height="40px"/>
                                </Badge>
                            </Button>
                        </div>
                    </Nav>:null}
                
                {isLoggedIn ?
                    <div className="flex items-center gap-2 mt-2 mr-5">
                        <Dropdown
                            menu={{
                                items,
                                onClick,
                            }}
                        >
                            <a onClick={(e) => e.preventDefault()} className='px-2 text-black'>
                                <Space> 
                                    <span className='capitalize sign-in-btn'>{user.CustName}</span>
                                    <FaRegCaretSquareDown />
                                </Space>
                            </a>
                        </Dropdown>
                    </div>
                :
                    <div className="sign-in">
                        <Nav className='sign-in-btn'>
                            <Nav.Link href="/login">Sign In</Nav.Link>
                        </Nav>
                    </div>
                }
                
            </Navbar>
        </div>
    );
}

export default NavigationBar;
