import {useEffect} from 'react'
import ProductListComponent from './productsPage-Components/productsListComponent'
import { useProducts } from './productsPage-Context/productsContext'
import { Category } from '../models/Category';
import './productsPage.css'
import CategoryIntroduction from './productsPage-Components/CategoryIntroduction';


export function DrinkwarePage(){
    const {setCategory} = useProducts();

    useEffect(() => {
        setCategory(Category.drinkware)
    }, [])
  return (
    <>
    <CategoryIntroduction 
            title="Drinkware" 
            description="Savor every sip with our sophisticated drinkware selection. 
            From the morning's first coffee to a toast at twilight, our glasses and mugs pair perfectly with every beverage. 
            Elevate your drinking experience with options designed to suit every taste and occasion"
            />
      <ProductListComponent />
    </>
  )
}

