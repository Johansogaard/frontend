import {useEffect} from 'react'
import ProductListComponent from './productsPage-Components/productsListComponent'
import { useProducts} from './productsPage-Context/productsContext'
import { Category } from '../models/Category';
import './productsPage.css'


export function AccessoriesPage(){
    const {setCategory, category} = useProducts();

    useEffect(() => {
        setCategory(Category.accessories)
    }, [])
    console.log('category', category)
  return (
    <>
    
      <h1>Table Accessories</h1>
      <ProductListComponent />
  
      </>
  )
}

