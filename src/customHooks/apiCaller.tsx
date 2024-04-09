import {useState} from 'react';
import { Product } from "../models/Product";



function apiCaller() 
{
    //const [product, setProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

    async function fetchAllProducts() {
      console.log('fetchAllProducts called');
    setIsLoading(true);
    try {
      const response = await fetch('https://dtu62597.eduhost.dk:10132/products');
      if (!response.ok) throw new Error('Could not fetch products.');
      const data: Product[] = await response.json();
      setProducts(data);
    } catch (err:unknown) {
        const message = (err as Error).message;
        setError(message);
    } finally {
      setIsLoading(false);
    }
    console.log('Api caller returns :',products);
  };

  async function fetchProductsByCategory(category : string) {
    console.log('fetchProductsByCategory called with :',category);
    //categories are DINNERWARE, DRINKWARE, SERVEWARE, TABLE, ACCESSORIES

    setIsLoading(true);
    try {
      const response = await fetch('https://dtu62597.eduhost.dk:10132/products/'+category);
      if (!response.ok) throw new Error('Could not fetch products.');
      const data: Product[] = await response.json();
      setProducts(data);
    } catch (err:unknown) {
        const message = (err as Error).message;
        setError(message);
    } finally {
      setIsLoading(false);
    }
    console.log('Api caller returns :',products);
  };


    return { products, isLoading, error, fetchAllProducts, fetchProductsByCategory};
}
export default apiCaller;

