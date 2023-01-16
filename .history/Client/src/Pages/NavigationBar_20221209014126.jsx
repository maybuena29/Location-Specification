import React, { useState } from 'react';
import { Nav, Navbar, NavDropdown, Form, Button, InputGroup } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './css/NavigationBar.css'
import Logo from '../images/CorumedTransparent.png'
import CartIcon from '../images/shopCart.png'
import {BsSearch} from 'react-icons/bs'
import mainApi from './ContextFiles/Api';
import Axios from "axios";
import { useEffect } from 'react';
import { Input, Space } from 'antd';
const { Search } = Input;

const NavigationBar = () => {

    const [categoryList, setCategoryList] = useState([]);
    const abortController = new AbortController();

    const fetchCategoryList = () => {
        Axios.get(`${mainApi}/api/category/get/categname/active`, {signal: abortController.signal}).then((response)=>{
            setCategoryList(response.data);
        });
    }

    useEffect(() => {
        fetchCategoryList();
        return () => {  
            abortController.abort();  
        }
    },[])

    const onSearch = (value) => console.log(value);

    return (
        <div className='nav-bar'>
            <Navbar variant="light" sticky='top' expand="md" collapseOnSelect> 
                <Navbar.Brand>
                    <img src={Logo} width="110px" height="110px"/>
                </Navbar.Brand>
                <Button className='cart-icon bg-transparent' variant='light' href='/Cart'>
                    <img className='cart-img'src={CartIcon} width="40px" height="40px"/>
                </Button>
                
                <Navbar.Toggle aria-controls="navbarScroll" />
                
                <Navbar.Collapse>
                    <Nav className='color-nav'>
                        <Nav.Link href="/Home">Home</Nav.Link>
                            <NavDropdown title="Categories" className='drop-categ'>
                                {Array.from(categoryList).map((category, index) => {
                                    return(
                                        <div key={index}>
                                            <NavDropdown.Item href="/Products/" onClick={(e) => setCategoryList(e.target.ariaValueText)}>{category.Category_Name}</NavDropdown.Item>
                                            <NavDropdown.Divider/>
                                        </div>
                                    )
                                })}
                            </NavDropdown>
                            <Nav.Link href='/Products'>Products</Nav.Link>
                            <Nav.Link href="/About">About</Nav.Link>
                            <Nav.Link className='sign-inLeft' href="/Login">Sign In</Nav.Link>
                    </Nav>
                    <Search className='pr-5 ml-2' placeholder="Search" onSearch={onSearch} enterButton size='medium'/>
                </Navbar.Collapse>
                {/* <div className="sign-inLeft">
                    <Nav.Link href="/Login">Sign In</Nav.Link>
                </div>  */}
                <div className="sign-inRight">
                    <Nav.Link href="/Login">Sign In</Nav.Link>
                </div> 
                <Button className='cart-iconRight bg-transparent' variant='light' href='/Cart'>
                    <img className='cart-img'src={CartIcon} width="40px" height="40px"/>
                </Button>
            </Navbar>
        </div>
    );
}

export default NavigationBar;
