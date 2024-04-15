import {useEffect} from 'react'
import ProductListComponent from './productsPage-Components/productsListComponent'
import { useProducts } from './productsPage-Context/productsContext'
import { Category } from '../models/Category';
import './productsPage.css'
import { Menubar } from '../menubar/menubar';
import { Topbar } from '../topbar/topBar';


export function DinnerwarePage(){
    const {setCategory} = useProducts();

    useEffect(() => {
        setCategory(Category.dinnerware)
    }, [])
  return (
    <>
      <Topbar />
      <Menubar />
      <h1>Dinnerware</h1>
      <p className='productPageDescription'>Step into the world of exquisite dinnerware that sets the stage for every meal you serve. Our Dinnerware Collection offers a symphony of style and sophistication that will grace your table with a touch of elegance. From classic porcelain to modern stoneware, each piece is a celebration of craftsmanship and design. Find the perfect plates, bowls, and serving pieces to reflect your culinary creations and personal style. Make every meal an event to remember with our exceptional dinnerware.</p>
      <ProductListComponent />
  
      </>
  )
}

