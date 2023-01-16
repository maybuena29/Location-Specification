import React, { useState } from 'react';
import { Nav, Navbar, NavDropdown, Form, Button, InputGroup, Col, Row } from 'react-bootstrap';
import { Link, Navigate, NavLink } from 'react-router-dom';
import { FaChevronDown, FaRegCaretSquareDown } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import './css/NavigationBar.css'
import Logo from '../images/app_name_logo.png'
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
    const abortController = new AbortController();

    function LogoutBTN(event){
        if(window.confirm('Are you sure that you wanted to logout?')){
          Axios.post(`${mainApi}/api/teacher/account/logout`, {}, {withCredentials: true})
            setLoginStatus(false);
        }
    }

    useEffect(() => {
        return () => {  
            abortController.abort();
        }
    },[])
    
    const onSearch = (value) => console.log(value);

    const onClick = ({ key }) => {
        if(key === '1'){
            // window.location.replace("/customer/orders");
            window.location.replace("/Account");
        }else if(key === '2'){
            LogoutBTN()
        }
    };

    const items = [
        {
          label: 'Profile',
          key: '1',
        },
        {
          label: 'Logout',
          key: '2',
        },
    ];

    return (
        <div className='nav-bar'>
            <Navbar variant="light" sticky='top' expand="lg" collapseOnSelect>
                <Navbar.Brand>
                    <img src={Logo} className='ml-5' width="130px" height="110px"/>
                </Navbar.Brand>
                
                <Navbar.Toggle aria-controls="navbarScroll"/>
            
                <Navbar.Collapse>
                    <Nav className='items-center justify-center gap-1 color-nav'>
                        <Nav.Link href="/Home" className='text-[#016189]'>Home</Nav.Link>
                        {isLoggedIn ?
                            <div className="flex items-center justify-center w-full gap-2 mt-2 mb-3 -ml-2 user-name">
                                <Dropdown
                                    menu={{
                                        items,
                                        onClick,
                                    }}>
                                    <a onClick={(e) => e.preventDefault()} className='px-2 text-center text-[#016189]'>
                                        <Space>
                                            <span className='flex items-center justify-center w-full capitalize sign-in-btn'>{user.teacher_name}</span>
                                            <IoMdArrowDropdown />
                                        </Space>
                                    </a>
                                </Dropdown>
                            </div>
                        :
                        <div className="mb-2 sign-in1">
                            <Nav className='sign-in-btn'>
                                <Nav.Link href="/login">Sign In</Nav.Link>
                            </Nav>
                        </div>
                        }
                    </Nav>
                </Navbar.Collapse>

                {isLoggedIn ?
                    <div className="flex items-center gap-2 mt-2 mb-3 mr-10 user-name2 text-[#016189]">
                        <Dropdown
                            menu={{
                                items,
                                onClick,
                            }}>
                            <a onClick={(e) => e.preventDefault()} className='px-2'>
                        <Space> 
                            <span className='capitalize sign-in-btn'>{user.teacher_name}</span>
                            <IoMdArrowDropdown />
                        </Space>
                            </a>
                        </Dropdown>
                    </div>
                    :
                    <div className="sign-in2">
                        <Nav className='sign-in-btn text-[#016189]'>
                            <Nav.Link href="/login">Sign In</Nav.Link>
                        </Nav>
                    </div>}
            </Navbar>
        </div>
    );
}

export default NavigationBar;
