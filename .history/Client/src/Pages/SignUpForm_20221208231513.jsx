import React, { useState, useEffect } from 'react';
import {useParams, useNavigate } from 'react-router-dom';
import CoruLogo from '../images/Corumed_Logo.png';
import {Form, Container, Button, Row, Col, InputGroup, FormGroup, CloseButton, NavLink, NavItem} from 'react-bootstrap'
import './css/SignUpForm.css';
import { BsPersonFill, BsLockFill, BsFillEnvelopeFill, BsTelephoneFill, BsMapFill, BsCalendarMinusFill} from 'react-icons/bs';
import Header from './Header';
import { Input, message, notification, Tooltip } from 'antd';
import Axios from "axios";
import mainApi from '../Pages/ContextFiles/Api';
import { customAlphabet } from 'nanoid';

const openNotif = (type) => {
    if(type === 'success'){
      notification[type]({
        message: 'SUCCESS!',
        description: 'Account Created Successfully.',
        duration: 4,
        placement: 'bottomRight',
        style: {borderRadius: '5px', zIndex: 'auto', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'},
      });
    }else if(type === 'warning'){
      notification[type]({
        message: 'Failed!',
        description: 'Username already exist.',
        duration: 4,
        placement: 'bottomRight',
        style: {borderRadius: '5px', zIndex: 'auto', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'},
      });
    }else if(type === 'error'){
      notification[type]({
        message: 'FAILED!',
        description: 'Email is not valid.',
        duration: 4,
        placement: 'bottomRight',
        style: {borderRadius: '5px', zIndex: 100, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'},
      });
    }else{
      notification['error']({
        message: 'FAILED!',
        description: 'All fields are required.',
        duration: 4,
        placement: 'bottomRight',
        style: {borderRadius: '5px', zIndex: 100, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'},
      });
    }
};
function myFunction() {
    window.open("/TermsAndCondition");
  }

const SignUpForm = () => {

    const navigate = useNavigate();
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [customerCode, setCustomerCode] = useState('');
    const [email, setEmail] = useState('');
    const [emailIsValid, setEmailIsValid] = useState(false);
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [existingAccounts, setExistingAccounts] = useState([]);

    const uniqueid = customAlphabet('1234567890', 10);
    const abortController = new AbortController();

    useEffect(() => {
        fetchCustomerAccountList();
        setCustomerCode(uniqueid(10));
        return () => {
            abortController.abort();
        }
    }, [])

    const fetchCustomerAccountList = async () => {
        await Axios.get(`${mainApi}/api/customer/account/get`, {signal: abortController.signal}).then((response)=>{
            setExistingAccounts(response.data);
        });
    }

    const handleMobileNumber = (event) => {
        setContact(event.target.value.replace(/\D/g, ''));
    }

    const isValidEmail = (e) => {
        return /\S+@\S+\.\S+/.test(e);
    }

    const handleValidEmail = (e) => {
        if(e.target.value === ''){
            setEmailIsValid(false);
        }else if(!isValidEmail(e.target.value)){
            setEmailIsValid(true);
        }else{
            setEmailIsValid(false);
        }
        setEmail(e.target.value);
    }

    const handleSignIn = async (e) => {

        e.preventDefault();
        if(firstname === '' || lastname === '' || customerCode === '' || email === '' || contact === '' || address === '' || username === '' || password === '' || confirmPassword === ''){
            openNotif('empty');
        }else if(password !== confirmPassword){
            message.open({
                type: 'error',
                content: 'Password did not match',
                className: 'custom-class',
                style: {
                    marginTop: '15vh',
                },
            });
        }else{
            let exist = existingAccounts.find((acc) => acc.Username === username)
            if(exist){
                openNotif('warning');
            }else{
                await createAccount();
                openNotif('success');
                navigate(-1);
            }
        }

    }

    const createAccount = async () => {
        await Axios.post(`${mainApi}/api/customer/account/insert`, {
            CustomerCode: customerCode,
            Username: username,
            Password: password,
            Name: firstname.concat(' ' + lastname),
            Contact: contact,
            Address: address,
            Email: email,
            Status: 'active',
        }).then(() => {
            console.log('account created successfully');
            clearFields();
        }).catch((err) => {
            alert('Create account error: ', err.response.data);
        });
        
        await createCart();
    }

    const createCart = () => {
        Axios.post(`${mainApi}/api/customer/cart/insert`, {
            CustomerCode: customerCode,
        }).then(() => {
            console.log('cart created successfully');
        }).catch((err) => {
            alert('Create cart error: ', err);
        });
    }

    const clearFields = () => {
        setFirstname('');
        setLastname('');
        setEmail('');
        setContact('');
        setAddress('');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
    }

    return (
        <Container>
        <div className='mb-5 row justify-content-center'>
            <div className="col-md-12 col-lg-11">
                <div className="wrap d-md-flex lg-flex">
                    <img src={CoruLogo} className="img-logo"/>
                    
                    <div className="p-4 p-md-5">
                        <div className="d-flex">
                            <div className="w-100">
                                <p className="mb-4 font-semibold text-white create-acc"> Create an Account</p>
                                <hr className="white-line" />            
                            </div>
                        </div>
                        <Form onSubmit={handleSignIn}>
                            <InputGroup className='mb-2'>
                                <InputGroup.Text><BsPersonFill/></InputGroup.Text>
                                <Form.Control type="text" onChange={(e) => setFirstname(e.target.value)} placeholder="Firstname*"/>
                                <Form.Control.Feedback>Please enter your firstname.</Form.Control.Feedback>
                                <Form.Control type="text" onChange={(e) => setLastname(e.target.value)} placeholder="Lastname*"/>
                                <Form.Control.Feedback>Please enter your lastname.</Form.Control.Feedback>
                            </InputGroup>
                            <InputGroup className='mb-2'>
                                <InputGroup.Text><BsTelephoneFill/></InputGroup.Text>
                                <Form.Control onChange={handleMobileNumber} maxLength={11} value={contact} placeholder="Mobile Number*"/>
                            </InputGroup>
                            <InputGroup className='mb-2'>
                                <InputGroup.Text><BsMapFill/></InputGroup.Text>
                                <Form.Control type="text" onChange={(e) => setAddress(e.target.value)} placeholder="Address*"/>
                            </InputGroup>
                            <Tooltip placement="bottom" title={'Please enter a valid email'} open={emailIsValid}>
                                <InputGroup className='mb-2'>
                                    <InputGroup.Text><BsFillEnvelopeFill/></InputGroup.Text>
                                    <Form.Control type="email" value={email} onChange={(e) => handleValidEmail(e)} placeholder="Email*" />
                                </InputGroup>
                            </Tooltip>
                            <InputGroup className='mb-2'>
                                <InputGroup.Text><BsPersonFill/></InputGroup.Text>
                                <Form.Control type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Username*"/>
                            </InputGroup>
                            <InputGroup className='mb-2'>
                                <InputGroup.Text><BsLockFill/></InputGroup.Text>
                                <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password*"/>
                            </InputGroup>
                            <InputGroup className='mb-2'>
                                <InputGroup.Text><BsLockFill/></InputGroup.Text>
                                <Form.Control type="password" onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password*" />
                            </InputGroup>
                            <Button type='submit' variant='danger' className='w-full rounded-3xl' value={'Create Account'}>Create Account</Button>
                            <p className='w-full p-2 text-center text-white'>By clicking this button, you agree to our <a style={{textDecoration: 'inherit'}} className='text-white hover:text-blue-500' onClick={()=>myFunction()}>Terms and Privacy Policy</a></p>
                            <p className='-mt-2 text-center text-white'>
                                Already have an account?
                                <a id="link-login" href="Login"> Log in</a>
                            </p>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
        </Container>
    );
}

export default SignUpForm;
