//import React from 'react';
import {
  Box,
  Button,
  Slide,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react'
import './menubar.css'
import basket from '../assets/basket.svg'
import cofee from '../assets/coffee.svg'
import { Link } from 'react-router-dom'
import hamburger from '../assets/hamburger.svg'
import { useState,useContext, useEffect } from 'react'
import { CartContext} from '../state/cartState/cartContext'; 
import { ItemListComponent } from '../shopping-cart/shoppingCart-Components/ItemlistComponentForPopOut';
import profile  from '../assets/profile.svg'

export function Menubar() {
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false); // Define the state for cart drawer visibility
  const { calcTotalItems } = useContext(CartContext);
  const itemCount = Number(calcTotalItems());

  const [isScrolled] = useState(false);

  useEffect(() => {
    const preventHorizontalScroll = () => {
      window.scrollTo(0, window.scrollY);
    };
  
    window.addEventListener('scroll', preventHorizontalScroll);
  
    return () => {
      window.removeEventListener('scroll', preventHorizontalScroll);
    };
  }, []);
  return (
    <>
    <header className={`menubar-container ${isScrolled ? 'fixed-menubar' : ''}`}>
      
      <button
        className="menu-button"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <img src={hamburger} alt="Menu" />
      </button>
      <div className='coffe-logo'>
      <Link to="/">
        <img src={cofee} alt="coffee-logo" />
      </Link>
      </div>
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

      <nav className="end-icons">
        <Link to="/user" target="_self" rel="noreferrer noopener">
          <img src={profile} alt="Profile icon" className="menu-icon" />
        </Link>
        <button
          onClick={() => setIsCartOpen(!isCartOpen)}
          className="basket-icon-button"
        >
          <img src={basket} alt="basket icon" className="basket-icon" />
          {itemCount > 0 && <div className="item-count-badge">{itemCount}</div>}
        </button>
      </nav>
      
      <Slide
        direction="right"
        in={isCartOpen}
        style={{ zIndex: 7, width: '300px' }}
      >
        <Box
          display="flex"
          flexDirection="column"
          backgroundColor="#F2F0EB"
          width="300px"
          position="absolute"
          right={isCartOpen ? '0' : '-20px'}
          top="0"
          height="100vh"
          padding="0px"
          borderLeft="1px solid #111111"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            padding="0 16px"
            
          >
            <Text fontSize="lg" fontWeight="bold">
              Shopping Cart
            </Text>
            <Button
              onClick={() => setIsCartOpen(false)}
              backgroundColor="transparent"
              padding="0"
              _hover={{ backgroundColor: 'transparent' }}
            >
              <img src={hamburger} alt="Close Menu" />
            </Button>
          </Box>

          {/* Scrollable content area */}
          <Box flex="1" overflowY="auto" paddingY="20px" >
            
            <VStack
              divider={<StackDivider borderColor="gray.200" />}
              spacing={4}
              align="stretch"

            >
              <ItemListComponent />
            </VStack>
          </Box>

          {/* Fixed footer with button */}
          <Box borderTop="1px solid #111111" padding="24px 10px">
            <Link to="/cart" style={{ width: '100%' }}>
              <Button
                width="100%"
                backgroundColor="#616569"
                color="white"
                _hover={{ bg: '#4299e1' }}
              >
                Continue to shopping cart
              </Button>
            </Link>
          </Box>
        </Box>
      </Slide>
    </header>
        {isScrolled && <div className="menubar-placeholder"></div>}
  </>
  )
}
