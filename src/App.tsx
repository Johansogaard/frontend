import './App.css'
import Route from './components/Route'
import Home from './landingPage/landingPage'
import AllProductsPage from './allProductsPage/allProductsPage'
import React from 'react'
import { ShoppingCart } from './shopping-cart/shoppingCartPage'
import { Topbar } from './topbar/topBar'
import { Menubar } from './menubar/menubar'

const App: React.FC = () => {
  return (
    <>
      <Topbar />
      <Menubar />
      <Route path="/" component={() => <Home />} />
      <Route path="/cart" component={() => <ShoppingCart />} />
      <Route path="/all-products" component={() => <AllProductsPage />} />
    </>
  )
}

export default App
