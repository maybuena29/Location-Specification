import React from 'react';
import './css/CarouselSlide.css';
import CarouselImg from '../images/Promos/CarouselPromo.png';
import CarouselImg2 from '../images/Promos/CarouselPromo2.png';
import {Container, Carousel} from 'react-bootstrap';

const CarouselSlide = () => {
    return (
        <Container>
            <center>
            <Carousel fade>
                <Carousel.Item>
                    <img src={CarouselImg} className='img-slide object-cover'/>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={CarouselImg2} className='img-slide object-cover'/>
                </Carousel.Item>
            </Carousel>
            </center>
        </Container>
    );
}

export default CarouselSlide;
