import React from 'react';
import './menubar.css';
import search from '../assets/search.svg'
import basket from '../assets/basket.svg'
import cofee from '../assets/coffee.svg'


export function Menubar() {
    return (
        <div className="menubar-container">
            <img src={cofee} alt="coffee" className="coffee-icon" />
            <div className="menu-items">
                <a href="#" className="menu-item">DINNERWARE</a>
                <a href="#" className="menu-item">DRINKWARE</a>
                <a href="#" className="menu-item">SERVEWARE</a>
                <a href="#" className="menu-item">TABLE ACCESSORIES</a>
                <a href="#" className="menu-item">ALL PRODUCTS</a>
            </div>
            <div className="menu-icons">
                <a href="#" target="_blank" rel="noreferrer noopener">
                    <img src={search} alt="Search icon" className="menu-icon" />
                </a>
                <a href="#" target="_blank" rel="noreferrer noopener">
                    <img src={basket} alt="basket icon" className="menu-icon" />
                </a>
            </div>
        </div>
    );
}