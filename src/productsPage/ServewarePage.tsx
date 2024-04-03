import {useEffect} from 'react'
import ProductListComponent from './productsPage-Components/productsListComponent'
import { useProducts } from './productsPage-Context/productsContext'
import { Category } from '../models/Category';
import './productsPage.css'
import CategoryIntroduction from './productsPage-Components/CategoryIntroduction';


export function ServewarePage(){
    const {setCategory} = useProducts();

    useEffect(() => {
        setCategory(Category.serveware)
    }, [])
  return (
    <>
    <CategoryIntroduction 
            title="Serveware" 
            description="Complete your hosting ensemble with our functional and stylish serveware. 
            Each platter, bowl, and set is thoughtfully designed to present your culinary masterpieces. 
            Make every course an event from appetizers to desserts with serveware that complements your gastronomic flair."
            />
      <ProductListComponent />
    </>
  )
}

