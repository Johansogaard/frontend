import React from 'react'
import ProductListComponent from './productsPage-Components/productsListComponent'
import { ProductProvider } from './productsPage-Context/productsContext'
import './productsPage.css'


const AllItemsPage: React.FC = () => {
  return (
    <ProductProvider>
    
      <h1>Here is all the items</h1>
      <ProductListComponent />
  

    </ProductProvider>
  )
}

export default AllItemsPage
