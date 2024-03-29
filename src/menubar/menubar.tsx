//import React from 'react';
import './menubar.css'
import search from '../assets/search.svg'
import basket from '../assets/basket.svg'
import cofee from '../assets/coffee.svg'
import Link from '../components/Link'
import hamburger from '../assets/hamburger.svg'
import { useState } from 'react'

export function Menubar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="menubar-container">
      <button
        className="menu-button"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <img src={hamburger} alt="Menu" />
      </button>

      <Link to="/">
        {' '}
        <img src={cofee} alt="coffee" />
      </Link>

      <nav className={`menu-items ${isMenuOpen ? 'open' : ''}`}>
        {isMenuOpen && (
          <button className="exit-button" onClick={() => setIsMenuOpen(false)}>
            X
          </button>
        )}
        <Link to="/dinnerware" className="menu-item">
          DINNERWARE
        </Link>
        <Link to="/drinkware" className="menu-item">
          DRINKWARE
        </Link>
        <Link to="/serveware" className="menu-item">
          SERVEWARE
        </Link>
        <Link to="/table-accessories" className="menu-item">
          TABLE ACCESSORIES
        </Link>
        <Link to="/all-products" className="menu-item">
          ALL PRODUCTS
        </Link>
      </nav>
      <div className={`overlay ${isMenuOpen ? 'open' : ''}`}></div>

      <nav>
        <Link to="#" target="_self" rel="noreferrer noopener">
          <img src={search} alt="Search icon" className="menu-icon" />
        </Link>
        <Link to="/cart" target="_self" rel="noreferrer noopener">
          <img src={basket} alt="basket icon" className="menu-icon" />
        </Link>
      </nav>
    </header>
  )
}
