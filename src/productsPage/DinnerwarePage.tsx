import {useEffect} from 'react'
import ProductListComponent from './productsPage-Components/productsListComponent'
import { useProducts } from './productsPage-Context/productsContext'
import { Category } from '../models/Category';
import './productsPage.css'
import CategoryIntroduction from './productsPage-Components/CategoryIntroduction';


export function DinnerwarePage(){
    const {setCategory} = useProducts();

    useEffect(() => {
        setCategory(Category.dinnerware)
    }, [])
  return (
    <>
    <CategoryIntroduction 
            title="Dinnerware" 
            description="Set the stage for memorable meals with our exquisite dinnerware collection. 
            Each piece is a canvas for culinary creation, blending timeless elegance with durable craftsmanship. 
            Whether for casual family dinners or formal gatherings, our dinnerware sets the perfect tone for every dish."
            />
      <ProductListComponent />
    </>
  )
}

