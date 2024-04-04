import './App.css'
import Route from './components/Route'
import Home from './landingPage/landingPage'
import {AllProductsPage} from './productsPage/AllProductsPage'
import {DinnerwarePage} from './productsPage/DinnerwarePage'
import {DrinkwarePage} from './productsPage/DrinkwarePage'
import {ServewarePage} from './productsPage/ServewarePage'
import {AccessoriesPage} from './productsPage/AccessoriesPage'
import React from 'react'
import { ShoppingCart } from './shopping-cart/shoppingCartPage'

import { CartProvider } from './shopping-cart/shoppingCart-Context/cartContext'
import { ProductProvider } from './productsPage/productsPage-Context/productsContext'
import { CheckoutPage } from './checkoutPage/checkoutPage'

const App: React.FC = () => {
  return (
    <>
      <CartProvider>
      
      
     
      
      <Route path="/" component={() => <Home />} />
      <Route path="/cart" component={() => <ShoppingCart />} />
      <ProductProvider>
      <Route path="/all-products" component={() => <AllProductsPage />} />
      <Route path="/dinnerware" component={() => <DinnerwarePage  />} />
      <Route path="/drinkware" component={() => <DrinkwarePage />} />
      <Route path="/serveware" component={() => <ServewarePage />} />
      <Route path="/table-accessories" component={() => <AccessoriesPage />} />
      <Route path= "/checkout" component={() => <CheckoutPage />} />
      </ProductProvider>
      </CartProvider>
    </>
  )
}

export default App
