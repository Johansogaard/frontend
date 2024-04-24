import {useEffect,useContext} from 'react'
import ProductListComponent from './productsPage-Components/productsListComponent'
import {ProductContext } from '../state/productlistState/productContext'
import { Category } from '../models/Category';
import './productsPage.css'
import { Menubar } from '../menubar/menubar';
import { Topbar } from '../topbar/topBar';



export function AllProductsPage(){
  const {state,dispatch} = useContext(ProductContext);
  const thisCategory = Category.all
  useEffect(() => {
     if(state.category !==thisCategory )
      {
        
        dispatch({type: 'PRODUCT_LIST_CATEGORY', payload : {category: thisCategory}});
      }
  }, [])
  return (
   <> 
      <Topbar />
      <Menubar />
      <h1>All Products</h1>
      <p className='productPageDescription'>Welcome to our Complete Collection, where quality meets quintessential design across every category of our offerings. Dive into our diverse range of products, from the elegance of our Dinnerware to the practical charm of our Serveware, the refined touch of our Drinkware, and the stylish detail of our Table Accessories. Whether you're looking to refresh your table setting or find the perfect gift, our carefully curated selection promises something for every taste and occasion. Explore the possibilities and elevate your everyday living with pieces that are as beautiful as they are functional.</p>
      <ProductListComponent />
  
      </>
  )
}
