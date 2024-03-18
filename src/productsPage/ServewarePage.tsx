import {useEffect} from 'react'
import ProductListComponent from './productsPage-Components/productsListComponent'
import { useProducts } from './productsPage-Context/productsContext'
import { Category } from '../models/Category';
import './productsPage.css'


export function ServewarePage(){
    const {setCategory} = useProducts();

    useEffect(() => {
        setCategory(Category.serveware)
    }, [])
  return (
    <>
    
      <h1>Serveware</h1>
      <ProductListComponent />
  
      </>
  )
}

