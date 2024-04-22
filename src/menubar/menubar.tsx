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
import back from '../assets/delete.svg'
import hamburger from '../assets/hamburger.svg'
import { useState } from 'react'
import { useCart } from '../shopping-cart/shoppingCart-Context/cartContext'
import { ItemListComponent } from '../shopping-cart/shoppingCart-Components/ItemlistComponent'; // Adjust the import path as needed


type ShoppingCartProps = {
  isOpen: boolean;
  onClose?: () => void;
};

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
        </Link>      </nav>
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
          justifyContent="space-between"
          backgroundColor="red"
          width="300px"
          position="absolute"
          right="0"
          top="0"
          height="100vh"
          background="#F2F0EB"
          padding="10px"
          borderLeft="1px solid #111111"
        >
          <Box display="flex" flexDirection="column" gap="50px">  // equivalent to 3.125rem
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text fontSize="lg" fontWeight="600">Cart</Text>
              <Button onClick={() => setIsCartOpen(false)} backgroundColor="transparent" padding="0" _hover={{ backgroundColor: "transparent" }}>
                <img src={hamburger} alt="Menu" />
              </Button>
            </Box>
            <VStack
              divider={<StackDivider borderColor="gray.200" />}
              spacing={4}
              align="stretch"
            >
              <ItemListComponent />
            </VStack>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            borderTop="1px solid #111111"
            padding="24px 0"  // equivalent to .9375rem 0
          >
            <Text fontWeight="600" fontSize="lg">Total</Text>
            <Text fontWeight="600" fontSize="lg">
              {/* Total calculation logic here */}
            </Text>
          </Box>
        </Box>
      </Slide>
    </header>
  );
}