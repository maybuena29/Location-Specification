import {React, useEffect, useState} from 'react';
import { Container, Tab, Tabs, Accordion, Col, Row} from 'react-bootstrap';
import NavigationBar from './NavigationBar';
import Contact from './Contact'
import CorumedLogo from '../images/CorumedTransparent.png';
import Axios from "axios";
import mainApi from './ContextFiles/Api';
import './css/About.css'

const About = () => {

    const [key, setkey] = useState('about');
    const [faqsList, setFaqsList] = useState([]);
    const abortController = new AbortController();

    useEffect(() => {
      fetchFaqsList();
      
      return () => {  
        abortController.abort();
      }
    }, [])

    const fetchFaqsList = () => {
      Axios.get(`${mainApi}/api/faq/get/active/item`, {signal: abortController.signal}).then((response)=>{
        setFaqsList(response.data);
      });
    }
    
    return (
        <div>
            <div className='about-container'>
                    <Tabs activeKey={key} onSelect={(k) => setkey(k)} transition={false} fill>
                        <Tab eventKey="about" title="About" className='about-tab'>
                          <div className='aboutInfo-container'>
                            <Row>
                              <center>
                              <Col md={4} lg={4}>
                                <img src={CorumedLogo} className='-mb-16 d-flex'/>
                              </Col>
                              </center>
                              <center>
                              <Col md={10} lg={10} className='p-6'>
                                <h3 className='-mb-6'>History</h3>
                                <p className='p-5 text-justify '>
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a enim sagittis,
                                  feugiat metus a, ultrices mauris. Ut accumsan dictum nunc. Class aptent taciti sociosqu
                                  ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam facilisis vehicula
                                  arcu, ut interdum diam porta quis. Curabitur sit amet tellus molestie, sagittis magna nec,
                                  sollicitudin nulla. Donec nec vestibulum felis, a dapibus neque. In et tempor purus.
                                  Aenean non auctor lorem, ut convallis turpis.<br></br><br></br>
                                  Mauris vitae luctus metus. Aliquam sit amet ipsum ornare urna pulvinar faucibus ut tempus eros.
                                  Donec a ipsum auctor, imperdiet mauris eu, auctor augue.
                                  Nullam vel nisi at sapien iaculis placerat sed sed augue. In arcu lectus, scelerisque vel ligula non,
                                  pulvinar consequat quam. Vivamus dictum, lorem at vehicula suscipit, magna justo sollicitudin mauris,
                                  eget finibus diam ante aliquam nulla. Donec auctor vitae nisi non molestie. Suspendisse ac suscipit
                                  felis.
                                </p>
                              </Col>
                              </center>
                            </Row>
                          </div>
                            
                        </Tab>
                        <Tab eventKey="privacy" title="Privacy Policy" className='privacy-tab'>
                            <div className='privacyInfo-container'>
                            <h2 className='privacy-title'>Privacy</h2>
                            <p className='privacy-txt'>
                            Last updated December 08, 2022
                            </p>
                            <p className='privacy-txt'>
                            This privacy notice for CoruMed Pharmacy ("Company," "we, " "us," or "our"), describes how and why we might collect, store, use, and/or share ("process") your information when you use our services ("Services"), such as when you Visit our website at Corumed. Questions or concerns? Reading this privacy notice will help you understand your privacy rights and choices. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at capfoam@gmail.com.
                            </p>

                            

                        </div>
                        </Tab>
                        <Tab eventKey="faqs" title="FAQ's" className='faqs-tab'>
                            <div className='faqs-container'>
                                <h2 className='faqs-title'>Frequently Asked Questions&#40;FAQs&#41;</h2>
                                <Accordion>
                                  {Array.from(faqsList).map((item) => {
                                    if(item.length === 0){
                                      return(
                                        <p key={0} className='mt-10 italic font-medium text-center'>FAQs Not Available for this Moment</p>
                                      )
                                    }else{
                                      return(
                                        <Accordion.Item key={item.faqID} eventKey={item.faqID}>
                                          <Accordion.Header>{item.question}</Accordion.Header>
                                          <Accordion.Body>
                                            {item.answer}
                                          </Accordion.Body>
                                        </Accordion.Item>
                                      )
                                    }  
                                  })}
                                  
                                  {/*<Accordion.Item eventKey="1">
                                    <Accordion.Header>Do you require prescriptions?</Accordion.Header>
                                    <Accordion.Body>
                                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                      minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                      aliquip ex ea commodo consequat. Duis aute irure dolor in
                                      reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                      culpa qui officia deserunt mollit anim id est laborum.
                                    </Accordion.Body>
                                  </Accordion.Item>
                                  <Accordion.Item eventKey="2">
                                    <Accordion.Header>What are your payment methods?</Accordion.Header>
                                    <Accordion.Body>
                                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                      minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                      aliquip ex ea commodo consequat. Duis aute irure dolor in
                                      reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                      culpa qui officia deserunt mollit anim id est laborum.
                                    </Accordion.Body>
                                  </Accordion.Item>
                                  <Accordion.Item eventKey="3">
                                    <Accordion.Header>How do you start ordering?</Accordion.Header>
                                    <Accordion.Body>
                                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                      minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                      aliquip ex ea commodo consequat. Duis aute irure dolor in
                                      reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                      culpa qui officia deserunt mollit anim id est laborum.
                                    </Accordion.Body>
                                  </Accordion.Item>
                                  <Accordion.Item eventKey="4">
                                    <Accordion.Header>How do you earn points?</Accordion.Header>
                                    <Accordion.Body>
                                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                      minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                      aliquip ex ea commodo consequat. Duis aute irure dolor in
                                      reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                      culpa qui officia deserunt mollit anim id est laborum.
                                    </Accordion.Body>
                                  </Accordion.Item> */}
                                </Accordion>
                            </div>
                        </Tab>
                        <Tab eventKey="contact" title="Contact" className='contact-tab'>
                            <div className='contactInfo-container'>
                                <Contact/>
                            </div>
                        </Tab>
                    </Tabs>
            </div>
        </div>
    );
}

export default About;
