import { createContext, useReducer, Dispatch, ReactNode, useCallback } from 'react';
import {ProductState, ProductAction } from './productTypes';
import apiCaller from '../../customHooks/apiCaller';
import { productReducer } from './productReducer';
import { Product } from '../../models/Product';
import { Category } from '../../models/Category';


const initialState: ProductState = {
    products: null,
    category: null,
    isloading: false,
    message: null
  };
interface ProductsProviderProps{
 children: ReactNode;
}

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
  const { products, fetchAllProducts,fetchProductsByCategory } = apiCaller();
  const [category, setCategory] = useState<Category>(Category.all);
  

  const fetchProducts = useCallback(async () => {

  useEffect(() => {
    console.log('useEffect ran', category);
    const fetchCorrectProducts = async () => {
      console.log('fetchCorrectProducts called', category);
    if (category === Category.all) {
      console.log('fetching all products');
      await fetchAllProducts();
    }
    else {
      console.log('fetching category', category);
      await fetchProductsByCategory(category);
    }
    };

    console.log('DEBUG', products);
    fetchCorrectProducts();

      
  }, [category]);
  

  

  

  return (
    <ProductsContext.Provider value={{ products,setCategory,category }}>
      {children}
    </ProductsContext.Provider>
  );
};