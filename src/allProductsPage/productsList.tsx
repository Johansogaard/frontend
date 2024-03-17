import {useEffect} from "react";
import apiCaller from "../customHooks/apiCaller";


function ProductsList() {
    const { products, fetchAllProducts } = apiCaller();
  
    useEffect(() => {
     fetchAllProducts();
    },
    []);
  
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