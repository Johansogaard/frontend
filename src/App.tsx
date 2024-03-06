// import React from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './landingPage/landingPage';
import { ShoppingCart } from "./shopping-cart/shoppingCart";
import Checkout from './Checkout';
import {Topbar} from './topbar/topBar';
import {Menubar} from './menubar/menubar';

const App = () => {
  return (
    <Router>
      <Topbar />
      <Menubar />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
};

export default App;