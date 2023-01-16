import {React, useState,useContext} from 'react';
import { Row, Col, Tab, Tabs, Image} from 'react-bootstrap';
import profileIcon from '../images/profileIcon.png';
import { AuthContext } from './ContextFiles/AuthContext';
import './css/CustomerAccount.css';

const CustomerAccount = () => {


    const[key, setKey] = useState('profile');
    const {user, verify, setLoginStatus, isLoggedIn}= useContext(AuthContext)

    return (
        <div className='bg-white account-section'>

            <center><Image src={profileIcon} height='200px' width='200px' ></Image></center>
            <Row>
                <Col>
                    <center>
                    <h1>{user.CustName}</h1>
                    <hr className='customer-red-line'/>
                    </center>
                </Col>
                    <Tabs id='controlled-tab' activeKey={key} onSelect={(k) => setKey(k)} fill>
                        <Tab eventKey="profile" title="Profile" className='p-5'>
                           <div>
                            
                           </div>
                        </Tab>
                    </Tabs>
            </Row>
        </div>
    );
}

export default CustomerAccount;