import React from 'react';
import { useState } from 'react';

import '../styles/Slider.css';

import nextArrow from '../images/nextArrow.png';
import prevArrow from '../images/prevArrow.png';

import lol from '../images/banner.png';
import rl from '../images/rl8.jpg';
import val from '../images/valo.webp';

const EventSlider = () => {

    const [currentIndex, setCurrentIndex] = useState(0);

    const cards = [
        { id: 1, img: rl },
        { id: 2, img: lol },
        { id: 3, img: val },
    ];

    const previousSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? cards.length - 1 : prevIndex - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === cards.length - 1 ? 0 : prevIndex + 1));
    };
    return (
        <div className='EventSlider'>
            <img src={prevArrow} alt='Arrow' className='eventArrow prev' onClick={previousSlide} />
            <div className='slideCardContainer'>
                <div className='slideCard previousCard'>
                    <img src={cards[currentIndex === 0 ? cards.length - 1 : currentIndex - 1].img} alt={`Card ${cards[currentIndex === 0 ? cards.length - 1 : currentIndex - 1].id}`} className="imgTest" />
                    <a className='eventBtn' href='#'>En savoir plus</a>
                </div>
                <div className='slideCard currentCard'>
                    <img src={cards[currentIndex].img} alt={`Card ${cards[currentIndex].id}`} className="imgTest" />
                    <a className='eventBtn' href='#'>En savoir plus</a>
                </div>
                <div className='slideCard nextCard'>
                    <img src={cards[currentIndex === cards.length - 1 ? 0 : currentIndex + 1].img} alt={`Card ${cards[currentIndex === cards.length - 1 ? 0 : currentIndex + 1].id}`} className="imgTest" />
                    <a className='eventBtn' href='#'>En savoir plus</a>
                </div>
            </div>
            <img src={nextArrow} alt='Arrow' className='eventArrow next' onClick={nextSlide} />
        </div>
    )

}

export default EventSlider