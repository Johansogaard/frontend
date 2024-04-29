import { createContext, useReducer, Dispatch, ReactNode, useCallback, useEffect } from 'react';
import {ProductState, ProductAction } from './productTypes';
import { productReducer } from './productReducer';
import { Product } from '../../models/Product';
import { Category } from '../../models/Category';


const initialState: ProductState = {
    products: null,
    category: null,
    isloading: false,
    message: null
  };


export const ProductContext = createContext<{
  state: ProductState;
  
  dispatch: Dispatch<ProductAction>;
}>({
  state: initialState,
  dispatch: () => null, // Placeholder function
  

  
});


interface ProductProviderProps {
  children: ReactNode;
}


export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [state, dispatch] = useReducer(productReducer, initialState);
 
  useEffect(() => {
    if(state.category !==null)
      {
    fetchProducts();
      }
  },[state.category]);
  

  const fetchProducts = useCallback(async () => {
    try{
      dispatch({type: 'PRODUCT_LIST_REQUEST'});
      let path = '';
      if(state.category !== Category.all)
        {
            path = '/'+state.category
        }
        console.log('fetchProducts: '+state.category)
      const response = await fetch('https://dtu62597.eduhost.dk:10132/products'+path);
        
     
      if (!response.ok)
        {
          dispatch({type: 'PRODUCT_LIST_FAILURE'})
        }
      else{
        const data: Product[] = await response.json();
        dispatch({type: 'PRODUCT_LIST_SUCCESS', payload : {products: data}})
      }
    }
    catch(error: unknown)
    {
      dispatch({type: 'PRODUCT_LIST_FAILURE'})
      const e = error as Error;  // Handle the error as an instance of Error
      console.error(e.message);
    }

  },[dispatch,state.category]);

  

  

  

  return (
    <ProductContext.Provider value={{ state,dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};