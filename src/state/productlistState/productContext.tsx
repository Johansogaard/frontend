import { createContext, useReducer, Dispatch, ReactNode, useCallback, useEffect } from 'react';
import { ProductState, ProductAction } from './productTypes';
import { productReducer } from './productReducer';
import { Product } from '../../models/Product';
import { Category } from '../../models/Category';


const initialState: ProductState = {
  products: null,
  category: null,
  isloading: false,
  message: null,
  guestToken: null
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

async function fetchGuestToken() {
  try {
    const response = await fetch('https://127.0.0.1:443/api/generateguestToken', {  // Switch to HTTP and correct port if HTTPS isn't configured locally
        method: 'Get',
        headers: {
            'Content-Type': 'application/json',
        }
        
    });
    console.log('response' + response)
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    sessionStorage.setItem('guestToken', data.token);
    console.log('token generated'+ data.token)
  } catch (error) {
    console.error("Failed to fetch guest token:", error);
  }
}
/*
useEffect(() => {
  const guestToken = sessionStorage.getItem('guestToken');
  if (!guestToken) {
      fetchGuestToken();
  }
}, []);
*/


export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [state, dispatch] = useReducer(productReducer, initialState);
  const guestToken = sessionStorage.getItem('guestToken');

  if (!guestToken) {
    fetchGuestToken();
    console.log('genereated token:'+ guestToken)
  }

  useEffect(() => {
    if (state.category !== null) {
      fetchProducts();
    }
  }, [state.category]);

  const token = localStorage.getItem('userToken') || sessionStorage.getItem('guestToken');


  const fetchProducts = useCallback(async () => {
    try {
      dispatch({ type: 'PRODUCT_LIST_REQUEST' });
      let path = '';
      if (state.category !== Category.all) {
        path = '/' + state.category
      }
      console.log('fetchProducts: ' + state.category)
      const response = await fetch(`https://127.0.0.1:443/${path}`, {  // Assuming localhost for local development
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

      if (!response.ok) {
        dispatch({ type: 'PRODUCT_LIST_FAILURE' })
      }
      else {
        const data: Product[] = await response.json();
        dispatch({ type: 'PRODUCT_LIST_SUCCESS', payload: { products: data } })
      }
    }
    catch (error: unknown) {
      dispatch({ type: 'PRODUCT_LIST_FAILURE' })
      const e = error as Error;  // Handle the error as an instance of Error
      console.error(e.message);
    }

  }, [dispatch, state.category]);







  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};