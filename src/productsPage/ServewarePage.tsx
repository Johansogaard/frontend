import {useEffect,useContext} from 'react'
import ProductListComponent from './productsPage-Components/productsListComponent'
import {ProductContext } from '../state/productlistState/productContext'
import { Category } from '../models/Category';
import './productsPage.css'
import { Menubar } from '../menubar/menubar';
import { Topbar } from '../topbar/topBar';


export function ServewarePage(){
  const {state,dispatch} = useContext(ProductContext);
  const thisCategory = Category.serveware
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
      <h1>Serveware</h1>
      <p className='productPageDescription'>Welcome to our Serveware Collection, where every dish is presented with distinction. Our selection is designed to make every meal an occasion and every table a showcase of your personal taste. From elegant serving platters to versatile bowls, each piece is crafted to not only serve your culinary creations but to enhance them. Whether hosting a lavish dinner party or a cozy family brunch, find the perfect serveware that reflects the sophistication and spirit of your gatherings.</p>
      <ProductListComponent />
  
      </>
  )
}

