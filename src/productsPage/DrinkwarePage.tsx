import {useEffect} from 'react'
import ProductListComponent from './productsPage-Components/productsListComponent'
import { useProducts } from './productsPage-Context/productsContext'
import { Category } from '../models/Category';
import './productsPage.css'


export function DrinkwarePage(){
    const {setCategory} = useProducts();

    useEffect(() => {
        setCategory(Category.drinkware)
    }, [])
  return (
    <>
    
      <h1>Drinkware</h1>
      <ProductListComponent />
  
      </>
  )
}

