import React, { useState,useEffect} from "react";

import { Product } from "../models/Product";

const ProductsList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await fetch('http://localhost:3000/products'); // Update with your actual API endpoint
          if (!response.ok) {
            throw new Error('Products could not be fetched');
          }
          const data: Product[] = await response.json();
          setProducts(data);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
  
      fetchProducts();
    }, []);
  
    return (
      <div>
        <h2>Product List</h2>
        <ul>
          {products.map((product) => (
            <li key={product.product_id}>
              {product.product_name}: {product.product_description} - Price: {product.product_price} {product.product_currency}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default ProductsList;