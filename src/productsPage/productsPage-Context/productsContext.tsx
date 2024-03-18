import { createContext, useContext, useEffect, ReactNode } from 'react';
import apiCaller from '../../customHooks/apiCaller';
import { Product } from '../../models/Product';

interface ProductsContextProps{
 products: Product[];
}

const ProductsContext = createContext<ProductsContextProps | undefined>(undefined);


export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) throw new Error('ProductCart must be used within a ProductProvider');
  return context;
};

interface ProductProviderProps {
  children: ReactNode;
}


export const ProductProvider = ({ children }: ProductProviderProps) => {
  const { products, fetchAllProducts } = apiCaller();
  console.log('products in productProvider', products);
  useEffect(() => {
    const fetchProducts = async () => {
      await fetchAllProducts();
      // Additional logic after fetching products
    };

    fetchProducts();
  }, []);
  

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};