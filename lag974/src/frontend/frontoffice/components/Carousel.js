import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import prevArrow from '../images/prevArrow.png';
import nextArrow from '../images/nextArrow.png';

// simulation bdd
import lol from '../images/banner.png'
import rl from '../images/rl8.jpg'
import val from '../images/valo.webp'

const Container = styled.div`
    width: 95vw;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 350px;
  position: relative;
`;

const CardsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease-out;
  width: 500px;
`;

const Card = styled.div`
  width: 45vw;
  height: 30vh;
  background: #eee;
  border-radius: 10px;
  position: absolute;
  transition: all 0.5s ease-out;
  overflow: hidden;
  
  @media (max-width: 940px) {
    width: 40vw;
    height: 25vh;
  }
  @media (max-width: 820px) {
    width: 35vw;
    height: 20vh;
  }
  @media (max-width: 760px) {
    transform: rotateY(${props => props.angle || '0deg'});
    width: 45vw;
    height: 15vh;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  object-fit: cover; // assure que toutes les images ont la même taille
`;

const ButtonLink = styled.a`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px 12px;
  background-color: rgba(247, 180, 0, 0.7);
  color: black;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;
  z-index: 2;

  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
    color: #F7B400;
  }

  @media (max-width: 760px) {
    font-size:0.7rem
  }
`;

const ArrowContainer = styled.a`
    position: absolute;
    display:flex;
    width: 80vw;
    height: 40vh;
    justify-content:space-between;
    align-items:center;

    @media (max-width: 768px) { // Ajustements pour les tablettes et les mobiles
        transform: rotateZ(90deg);
        width: 100vw;
    }
`;
const ArrowButton = styled.button`
    background: url(${props => props.img}) no-repeat center;
    background-size: contain;
    width: 3vw;
    height: 6vh;
    border: none;
    cursor: pointer;
    ${props => props.direction === 'left' ? 'left: 1vw;' : 'right: 1vw;'}
    opacity: 0.7;
    z-index: 3;
    &:hover {
        opacity: 1;
    }

    @media (max-width: 768px) { // Ajustements pour les tablettes et les mobiles
        width: 5vw;
        height: 10vh;
        ${props => props.direction === 'left' ? 'left: 2vw;' : 'right: 2vw;'}
    }
`;

const Carousel = () => {
    //pour definir les positions des cartes :
    const [position, setPosition] = useState(0);

    const handleNext = () => {
        setPosition(prev => (prev + 1) % 3);
    };

    const handlePrev = () => {
        setPosition(prev => (prev - 1 + 3) % 3);
    };

    const styles = [
        {
            transform: 'rotateY(70deg) translateX(-700px) rotateY(-70deg)',
            opacity: 0.6, zIndex: 1
        },
        {
            transform: 'rotateY(0deg) translateX(0) scale(1.3)',
            opacity: 1, zIndex: 3
        },
        {
            transform: 'rotateY(-70deg) translateX(700px) rotateY(70deg)',
            opacity: 0.6, zIndex: 1
        }
    ];

    // responsive:

    const mobileStyles = [
        {
            transform: 'rotateX(70deg) translateY(-250px) rotateX(-70deg)',
            opacity: 0.6, zIndex: 1
        },
        {
            transform: 'rotateX(0deg) translateY(0) scale(1.8)',
            opacity: 1, zIndex: 3
        },
        {
            transform: 'rotateX(-70deg) translateY(250px) rotateX(70deg)',
            opacity: 0.6, zIndex: 1
        }
    ];

    // pour voir si l'écran est mobile:

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 760);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 760);
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    //pour choisir quel jeu de styles utiliser:

    const currentStyles = isMobile ? mobileStyles : styles;

    const orderedStyles = [
        currentStyles[(3 - position) % 3],
        currentStyles[(4 - position) % 3],
        currentStyles[(5 - position) % 3]
    ];


    const [cardsData, setCardsData] = useState([]); // Données du carrousel
    // Simule l'appel API pour récupérer les données
    useEffect(() => {
        // axios.get('YOUR_BACKEND_API_URL').then(response => {
        //   setCardsData(response.data);
        // });
        setCardsData([
            { imgSrc: lol, alt: 'Image 1' },
            { imgSrc: rl, alt: 'Image 2' },
            { imgSrc: val, alt: 'Image 3' }
        ]);
    }, []);


    return (
        <Container>
            <Wrapper>
                <ArrowContainer>
                    <ArrowButton onClick={handlePrev} direction="left" img={prevArrow} />
                    <ArrowButton onClick={handleNext} direction="right" img={nextArrow} />
                </ArrowContainer>
                <CardsWrapper>
                    {cardsData.map((card, index) => (
                        <Card key={index} style={orderedStyles[index % 3]}>
                            <Image src={card.imgSrc} alt={card.alt} />
                            <ButtonLink href="#">En savoir plus</ButtonLink>
                        </Card>
                    ))}
                </CardsWrapper>
            </Wrapper>
        </Container>
    );
}

export default Carousel;