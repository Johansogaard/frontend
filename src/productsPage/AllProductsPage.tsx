import {useEffect} from 'react'
import ProductListComponent from './productsPage-Components/productsListComponent'
import { useProducts } from './productsPage-Context/productsContext'
import { Category } from '../models/Category';
import './productsPage.css'



export function AllProductsPage(){
  const {setCategory} = useProducts();

  useEffect(() => {
    setCategory(Category.all); 
  }, []);
  return (
   <> 
    
      <h1>All Products</h1>
      <ProductListComponent />
  
      </>
  )
}
