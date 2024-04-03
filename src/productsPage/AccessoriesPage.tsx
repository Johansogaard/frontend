import {useEffect} from 'react'
import ProductListComponent from './productsPage-Components/productsListComponent'
import { useProducts} from './productsPage-Context/productsContext'
import { Category } from '../models/Category';
import './productsPage.css'
import CategoryIntroduction from './productsPage-Components/CategoryIntroduction';


export function AccessoriesPage(){
    const {setCategory, category} = useProducts();

    useEffect(() => {
        setCategory(Category.accessories)
    }, [])
    console.log('category', category)

  return (
    <>
      <CategoryIntroduction 
              title="Table Accessories" 
              description="Every well-appointed dining experience begins with the small details. Our range of table accessories is designed to bring elegance and function to your table setting. 
              From the finest napkin rings to decorative vases, each detail is crafted with the intent to transform everyday meals into special gatherings. 
              Explore our collection and discover the perfect elements to complete your table décor."
              />
        <ProductListComponent />
      </>
  )
}

