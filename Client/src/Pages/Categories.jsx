import React from 'react';
import BabyCareImg from '../images/Categories/BabyCareCateg.png';
import BrandedMedicinesImg from '../images/Categories/BrandedMedicinesCateg.png';
import ContraceptivesImg from '../images/Categories/ContraceptivesCateg.png';
import FoodsDrinksImg from '../images/Categories/FoodsDrinksCateg.png';
import FoodSuppImg from '../images/Categories/FoodSuppCateg.png';
import OintmentsImg from '../images/Categories/OintmentsCateg.png';
import {Row, Col, Image, Container} from 'react-bootstrap';
import './css/Categories.css';

const Categories = () => {
    return (
        <div className='p-3 mt-2 bg-red-400 categ-section'>
            <h3 className='mt-3 ml-4 text-white'>Categories</h3>
            <hr className='text-white opacity-100'/>
            <center>
            <Row>
                <Col md={4} className="mb-3">
                    <a href="/Products/Baby Cares">
                        <Image src={BabyCareImg} height="350px" width="350px" thumbnail></Image>
                    </a>
                </Col>
                <Col md={4} className="mb-3">
                    <a href="/Products/Branded Medicine">
                        <Image src={BrandedMedicinesImg} height="350px" width="350px" thumbnail></Image>
                    </a>
                </Col>
                <Col md={4} className="mb-3">
                    <a href="/Products/Contraceptives">
                        <Image src={ContraceptivesImg} height="350px" width="350px" thumbnail></Image>
                    </a>
                </Col>
            </Row>
            <Row>
                <Col md={4} className="mb-3">
                    <a href="/Products/Food & Drink">
                        <Image src={FoodsDrinksImg} height="350px" width="350px" thumbnail></Image>
                    </a>
                </Col> 
                <Col md={4} className="mb-3">
                    <a href="/Products/Food Suppliments">
                        <Image src={FoodSuppImg} height="350px" width="350px" thumbnail></Image>
                    </a>
                </Col>
                <Col md={4} >
                    <a href="/Products/Ointment">
                        <Image src={OintmentsImg} height="350px" width="350px" thumbnail></Image>
                    </a>
                </Col> 
            </Row>
            </center>
        </div>
    );
}

export default Categories;
