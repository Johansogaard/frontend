//import React from 'react';
import './menubar.css';
import search from '../assets/search.svg';
import basket from '../assets/basket.svg';
import coffee from '../assets/coffee.svg';
import { Link } from 'react-router-dom';

export function Menubar() {
  return (
    <div className="menubar-container">
      <Link to="/"> <img src={coffee} alt="coffee"/> </Link>
      <div className="menu-items">
        <Link to="/dinnerware" className='menu-item'>DINNERWARE</Link>
        <Link to="/drinkware" className='menu-item'>DRINKWARE</Link>
        <Link to="/serveware" className='menu-item'>SERVEWARE</Link>
        <Link to="/table-accessories" className='menu-item'>TABLE ACCESSORIES</Link>
        <Link to="/all-products" className='menu-item'>ALL PRODUCTS</Link>
      </div>
      <div>
        <img src={search} alt="Search icon" className="menu-icon" />
        <Link to="/cart">
          <img src={basket} alt="basket icon" className="menu-icon" />
        </Link>
      </div>
    </div>
  );
}