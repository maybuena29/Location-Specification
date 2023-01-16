import React, { useState,useNavigate } from 'react';
import { Nav, Navbar, NavDropdown, Form, Button, InputGroup } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './css/NavigationBar.css'
import Logo from '../images/CorumedTransparent.png'
import CartIcon from '../images/shopCart.png'
import {BsSearch} from 'react-icons/bs'
import {TbLogout} from 'react-icons/tb'
import mainApi from './ContextFiles/Api';
import Axios from "axios";

import { useEffect,useContext } from 'react';
import { AuthContext } from './ContextFiles/AuthContext';

const NavigationBar = () => {
    
    const {user, verify, setLoginStatus, isLoggedIn}= useContext(AuthContext)
    const [categoryList, setCategoryList] = useState([]);
    const abortController = new AbortController();
    const navigate = useNavigate()

    const fetchCategoryList = () => {
        Axios.get(`${mainApi}/api/category/get/categname/active`, {signal: abortController.signal}).then((response)=>{
            setCategoryList(response.data);
        });
    }
    function LogoutBTN(event){
        if(window.confirm('Are you sure that you wanted to logout?')){
          Axios.post(`${mainApi}/api/customer/account/logout`, {}, {withCredentials: true})
            setLoginStatus(false);
            navigate("/Home")
        }
      }

    useEffect(() => {
        fetchCategoryList();
        return () => {  
            abortController.abort();
        }
    },[])

    return (
        <div className='w-full'>
            <Navbar variant="light" sticky='top' expand="md" collapseOnSelect>
                <Navbar.Brand>
                    <img src={Logo} width="100px" height="100px"/>
                </Navbar.Brand>
                <Navbar.Toggle/>
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
                    
                    <InputGroup className="mb-3 ">
                        <Form.Control placeholder="Search..." aria-label="Search..."/>
                        <Button variant="outline-secondary" id="button-search"><BsSearch/></Button>
                    </InputGroup>
                </Navbar.Collapse>
                
                {isLoggedIn ?
                    <Nav className='icon'>
                        <div className="cart-icon">
                            <Button className='bg-transparent' variant='light' href='/Cart'>
                            <img src={CartIcon} width="40px" height="40px"/>
                            </Button>
                        </div>
                    </Nav>:null}
                
                {isLoggedIn ?
                    <div className="flex items-center gap-2 mr-5 ">
                        <span className='sign-in-btn'>{user.CustName}</span> 
                        <TbLogout onClick={LogoutBTN} className="text-xl cursor-pointer"/>
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
