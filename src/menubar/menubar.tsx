//import React from 'react';
import {
  Box,
  Button,
  Icon,
  Slide,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import './menubar.css'
import search from '../assets/search.svg'
import basket from '../assets/basket.svg'
import cofee from '../assets/coffee.svg'
import {Link} from 'react-router-dom'
import hamburger from '../assets/hamburger.svg'
import { useState } from 'react'
import { useCart } from '../shopping-cart/shoppingCart-Context/cartContext'
import { ItemListComponent } from '../shopping-cart/shoppingCart-Components/ItemlistComponentForPopOut'; // Adjust the import path as needed


export function Menubar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false); // Define the state for cart drawer visibility
  const { calcTotalItems } = useCart();
  const itemCount = Number(calcTotalItems());

  return (
    <header className="menubar-container">
      <button className="menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <img src={hamburger} alt="Menu" />
      </button>

      <Link to="/">
        <img src={cofee} alt="coffee" />
      </Link>

      <nav className={`menu-items ${isMenuOpen ? 'open' : ''}`}>
        {isMenuOpen && (
          <button className="exit-button" onClick={() => setIsMenuOpen(false)}>X</button>
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

      <nav className='end-icons'>
        <Link to="#" target="_self" rel="noreferrer noopener">
          <img src={search} alt="Search icon" className="menu-icon" />
        </Link>
        <button onClick={() => setIsCartOpen(!isCartOpen)} className="menu-icon-button">
          <img src={basket} alt="basket icon" className="menu-icon" />
          {itemCount > 0 && <div className="item-count-badge">{itemCount}</div>}
        </button>
      </nav>

      <Slide direction="right" in={isCartOpen} style={{ zIndex: 5 }}>
  <Box
    display="flex"
    flexDirection="column"
    backgroundColor="#F2F0EB"
    width="300px"
    position="absolute"
    right="0"
    top="0"
    height="100vh"
    padding="10px"
    borderLeft="1px solid #111111"
  >
    <Box display="flex" justifyContent="space-between" alignItems="center" padding="0 16px">
      <Text fontSize="lg" fontWeight="bold">Shopping Cart</Text>
      <Button onClick={() => setIsCartOpen(false)} backgroundColor="transparent" padding="0" _hover={{ backgroundColor: "transparent" }}>
        <img src={hamburger} alt="Close Menu" />
      </Button>
    </Box>

    {/* Scrollable content area */}
    <Box flex="1" overflowY="auto" paddingY="20px">
      <VStack divider={<StackDivider borderColor="gray.200" />} spacing={4} align="stretch">
        <ItemListComponent />
      </VStack>
    </Box>

    {/* Fixed footer with button */}
    <Box
      borderTop="1px solid #111111"
      padding="24px 0"
    >
      <Link to="/cart" style={{ width: '100%' }}>
        <Button
          width="100%"
          backgroundColor="#616569"
          color="white"
          _hover={{ bg: "#4299e1" }}
        >
          Continue to shopping cart
        </Button>
      </Link>
    </Box>
  </Box>
</Slide>
    </header>
  );
}