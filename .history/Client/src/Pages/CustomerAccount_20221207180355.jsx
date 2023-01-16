import {React, useState,useContext} from 'react';
import { Row, Col, Tab, Tabs, Image} from 'react-bootstrap';
import profileIcon from '../images/profileIcon.png';
import { AuthContext } from './ContextFiles/AuthContext';
import './css/CustomerAccount.css';


const CustomerAccount = () => {

    const[key, setKey] = useState('profile');
    const {user, verify, setLoginStatus, isLoggedIn}= useContext(AuthContext)
    console.log(user);
    return (
        <div className='bg-white account-section'>
            <Row>
                <Col md={3}>
                    <Image src={profileIcon} height='200px' width='200px' className='ml-16' ></Image>
                </Col>
            </Row>
            <Row>
                <Col>
                    <center>
                    <h1>{user.CustName}</h1>
                    <hr className='customer-red-line'/>
                    </center>
                </Col>
                <Col md={9}>
                    <Tabs id='controlled-tab' activeKey={key} onSelect={(k) => setKey(k)} fill>
                        <Tab eventKey="profile" title="Profile">
                            
                        </Tab>
                        <Tab eventKey="orders" title="Orders">
                        </Tab>
                        {/* <Tab eventKey="prescriptions" title="Prescriptions">
                        </Tab> */}
                        <Tab eventKey="currpoints" title="Current Points">
                        <div>Profile</div>
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </div>
    );
}

export default CustomerAccount;
