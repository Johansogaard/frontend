import {useState} from 'react';
import { Product } from "../models/Product";


function apiCaller() 
{
    //const [product, setProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

    async function fetchAllProducts() {
    setIsLoading(true);
    try {
      const response = await fetch('http://dtu62597.eduhost.dk:10131/products');
      if (!response.ok) throw new Error('Could not fetch products.');
      const data: Product[] = await response.json();
      setProducts(data);
    } catch (err:unknown) {
        const message = (err as Error).message;
        setError(message);
    } finally {
      setIsLoading(false);
    }
  };


    return { products, isLoading, error, fetchAllProducts};
}
export default apiCaller;