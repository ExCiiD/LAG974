import React from 'react'

import GameCard from '../components/GameCard';
import { NavLink } from "react-router-dom";

import '../styles/Equipes.css';

const Equipes = () => {
    return (
        <div className='content equipes'>
            <div className='pageTitleCorners'>
                <div className='pageTitle'>
                    <h1 className='pageTitleContent'>EQUIPES</h1>
                </div>
            </div>
            <div className='equipesCardsContainer'>
                <NavLink className='navLinks' to={"/equipes/roster"}><GameCard /></NavLink>
                <NavLink className='navLinks' to={"/equipes/roster"}><GameCard /></NavLink>
                <NavLink className='navLinks' to={"/equipes/roster"}><GameCard /></NavLink>
            </div>
        </div>
    )
}

export default Equipes