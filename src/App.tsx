import './App.css'
import Route from './components/Route'
import Home from './landingPage/landingPage'
import AllProductsPage from './productsPage/ProductsPage'
import React from 'react'
import { ShoppingCart } from './shopping-cart/shoppingCartPage'
import { Topbar } from './topbar/topBar'
import { Menubar } from './menubar/menubar'
import { CartProvider } from './shopping-cart/shoppingCart-Context/cartContext'

const App: React.FC = () => {
  return (
    <>
      <CartProvider>
      <Topbar />
      <Menubar />
      <Route path="/" component={() => <Home />} />
      <Route path="/cart" component={() => <ShoppingCart />} />
      <Route path="/all-products" component={() => <AllProductsPage />} />
      </CartProvider>
    </>
  )
}

export default App
