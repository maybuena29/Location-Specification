import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './css/Footer.css';
import CoruLogoTransparent from '../images/CorumedTransparent.png';
import gcashLogo from '../images/Payment/gcash.png';
import mayaLogo from '../images/Payment/paymaya.png';
import onSiteLogo from '../images/Payment/cash.png';
import {BsFillTelephoneFill} from 'react-icons/bs';

const Footer = () => {
    return (
        <div className='main-footer'>
            {/* <Container className="-mt-5 w-100"> */}
                <Row>
                    <Col>
                        <img src={CoruLogoTransparent} height="250px" width="250px" />
                    </Col>
                    <Col>
                        <h5 className='font-bold'>Contact Info</h5>
                        <ul className='list-unstyled'>
                            <li>+639760254804</li>
                            <li>corumedph@gmail.com</li>
                            <li>www.corumedpharmacy.com.ph</li>
                            <li>www.facebook.com/corumedph</li>
                        </ul>
                    </Col>
                    <Col>
                        <h5 className='font-bold'>INFORMATION</h5>
                        <ul className='list-unstyled'>
                            <a href="Home"><li>Home</li></a>
                            <a href="About"><li>About</li></a>
                            <a href="#MyAccount"><li>My Account</li></a>
                        </ul>
                    </Col>
                    <Col>
                        <h5 className='font-bold'>OUR SERVICES</h5>
                        <ul className='list-unstyled'>
                            {/* <a href="#Prescription"><li>Order with Prescription</li></a> */}
                            <a href="Products"><li>All Products</li></a>
                        </ul>
                    </Col>
                    {/* <Col>
                        <h5 className='font-bold'>Payment Options</h5>
                        <img src={gcashLogo} height="150px" width="150px"/>
                        <img src={mayaLogo} height="150px" width="150px"/>
                        <img src={onSiteLogo} height="150px" width="150px"/>
                    </Col> */}
                </Row>
                <Row className='bottom-footer'>
                    <p className='mt-3 font-bold text-center text-white col-sm'>
                        &copy;{new Date().getFullYear()} Corumed Pharmacy. All Rights Reserved
                    </p>
                </Row>
            {/* </Container> */}
        </div>
    );
}

export default Footer;
