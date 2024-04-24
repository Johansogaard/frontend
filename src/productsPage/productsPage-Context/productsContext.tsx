/*import { createContext, useContext, useEffect, ReactNode,useState } from 'react';
import apiCaller from '../../customHooks/apiCaller';
import { Product } from '../../models/Product';
import { Category } from '../../models/Category';


interface ProductsContextProps {
  products: Product[]
  setCategory: (category: Category) => void
  category: Category
}

const ProductsContext = createContext<ProductsContextProps | undefined>(
  undefined,
)

export const useProducts = () => {
  const context = useContext(ProductsContext)
  if (!context)
    throw new Error('ProductCart must be used within a ProductProvider')
  return context
}

interface ProductProviderProps {
  children: ReactNode
}

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const { products, fetchAllProducts, fetchProductsByCategory } = apiCaller()
  const [category, setCategory] = useState<Category>(Category.all)

  useEffect(() => {
    console.log('useEffect ran', category)
    const fetchCorrectProducts = async () => {
      console.log('fetchCorrectProducts called', category)
      if (category === Category.all) {
        console.log('fetching all products')
        await fetchAllProducts()
      } else {
        console.log('fetching category', category)
        await fetchProductsByCategory(category)
      }
    }

    console.log('DEBUG', products)
    fetchCorrectProducts()
  }, [category])

  return (
    <ProductsContext.Provider value={{ products, setCategory, category }}>
      {children}
    </ProductsContext.Provider>
  );
};*/