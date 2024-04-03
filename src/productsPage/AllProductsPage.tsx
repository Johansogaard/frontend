import {useEffect} from 'react'
import ProductListComponent from './productsPage-Components/productsListComponent'
import { useProducts } from './productsPage-Context/productsContext'
import { Category } from '../models/Category';
import './productsPage.css'
import CategoryIntroduction from './productsPage-Components/CategoryIntroduction';


export function AllProductsPage(){
  const {setCategory} = useProducts();

  useEffect(() => {
    setCategory(Category.all); 
  }, []);
  return (
    <>
    <CategoryIntroduction 
            title="All Products" 
            description="Discover the essence of excellence in our comprehensive collection. Our 'All Products' array offers an array of choices for every preference and occasion. 
            Whether you're in pursuit of practicality or sheer beauty, you'll find it within our carefully curated selection, where tradition embraces contemporary design. 
            Embark on a journey of discovery and let inspiration guide you in crafting your distinct space."
            />
      <ProductListComponent />
    </>
  )
}
