import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './css/Footer.css';
import mainLogo from '../images/app_name_logo.png'
import CoruLogoTransparent from '../images/CorumedTransparent.png';
import gcashLogo from '../images/Payment/gcash.png';
import mayaLogo from '../images/Payment/paymaya.png';
import onSiteLogo from '../images/Payment/cash.png';
import {BsFillTelephoneFill} from 'react-icons/bs';

const Footer = () => {
    return (
        <div className='main-footer'>
            <Row>
                <p className='mt-3 font-bold text-center text-white col-sm'>
                    &copy;{new Date().getFullYear()} Location Specification. All Rights Reserved
                </p>
            </Row>
        </div>
    );
}

export default Footer;
