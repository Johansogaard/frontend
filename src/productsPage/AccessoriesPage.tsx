import {useEffect,useContext} from 'react'
import ProductListComponent from './productsPage-Components/productsListComponent'
import {ProductContext } from '../state/productlistState/productContext'
import { Category } from '../models/Category';
import './productsPage.css'
import { Menubar } from '../menubar/menubar'
import { Topbar } from '../topbar/topBar'
import { Helmet,HelmetProvider } from 'react-helmet-async'


export function AccessoriesPage(){
    const {state,dispatch} = useContext(ProductContext);
    const thisCategory = Category.accessories
    useEffect(() => {
       if(state.category !==thisCategory )
        {
         
          dispatch({type: 'PRODUCT_LIST_CATEGORY', payload : {category: thisCategory}});
        }
    }, [])

  return (
    <>
    <HelmetProvider>
      <Helmet>
        <meta name="description" content="This is the accessories page" />
      </Helmet>
      </HelmetProvider>
      <Topbar />
      <Menubar />
      <h1>Table Accessories</h1>
      <p className="productPageDescription">
        Discover our refined collection of Table Accessories, where
        functionality meets style. Dive into our handpicked selection of
        centerpieces, coasters, and trivets crafted to complement any tabletop.
        Ideal for those who cherish the details that make a meal memorable, our
        pieces are more than just accents; they're conversation starters.
        Upgrade your table setting with our unique finds and turn every meal
        into a special occasion.
      </p>
      <ProductListComponent />
    </>
  )
}
