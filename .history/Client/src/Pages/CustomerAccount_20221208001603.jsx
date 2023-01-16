import {React, useState} from 'react';
import { Row, Col, Tab, Tabs, Image} from 'react-bootstrap';
import profileIcon from '../images/profileIcon.png';
import './css/CustomerAccount.css';

const CustomerAccount = () => {

    const[key, setKey] = useState('profile');

    return (
        <div className='bg-white account-section'>

            <center><Image src={profileIcon} height='200px' width='200px' ></Image></center>
            <Row>
                <Col>
                    <center>
                    <h1>Rayn</h1>
                    <hr className='customer-red-line'/>
                    </center>
                </Col>
                    <Tabs id='controlled-tab' activeKey={key} onSelect={(k) => setKey(k)} fill>
                        <Tab eventKey="profile" title="Profile" className='p-5'>
                            <h1>HELLO</h1>
                        </Tab>
                    </Tabs>
            </Row>
        </div>
    );
}

export default CustomerAccount;