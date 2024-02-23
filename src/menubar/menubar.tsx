import React from 'react';
import './menubar.css';
import search from '../assets/search.svg'
import basket from '../assets/basket.svg'
import cofee from '../assets/coffee.svg'
import Link from '../components/Link';

export function Menubar() {
    return (
        <div className="menubar-container">
                <Link to="/"> <img src={cofee} alt="coffee"/></Link> 
            <div className="menu-items">
                <Link to="/dinnerware" className='menu-item'>DINNERWARE</Link>
                <Link to="/drinkware"  className='menu-item'>DRINKWARE</Link>
                <Link to="/serveware"  className='menu-item'>SERVEWARE</Link>
                <Link to="/table-accessories" className='menu-item'>TABLE ACCESSORIES</Link>
                <Link to="/all-products" className='menu-item'>ALL PRODUCTS</Link>
            </div>
            <div>
                <Link to="#" target="_self" rel="noreferrer noopener">
                        <img src={search} alt="Search icon" className="menu-icon" />
                    </Link>
                <Link to="/cart" target="_self" rel="noreferrer noopener">
                    <img src={basket} alt="basket icon" className="menu-icon" />
                </Link>
            </div>
        </div>
    );
}