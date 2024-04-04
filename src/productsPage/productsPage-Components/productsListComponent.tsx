
import { Product } from "../../models/Product";
import { useProducts } from "../productsPage-Context/productsContext";
import { useCart } from "../../shopping-cart/shoppingCart-Context/cartContext";


function ProductListComponent() {
    const { products} =useProducts();
    //console.log('products in productsList', products);

  
    return (
      <div className = "productListComponent" >
        {products.length === 0 ? (
         <div>
            <p>No products found</p>
           <p>Because we do not have a personal backend server with a personal domain, we cannot provide a CA certificate. For that reason, you will need to accept the connection using this link to our server:
            </p>
            <p><a href="https://localhost/" target="_blank" rel="noopener noreferrer">https://localhost/</a></p>
            <p>press advanced and the press continue to this</p>
            <p>After that, you can return to this page and refresh</p>
          </div>
         
        ) : (
        <ul id="products" className="productList">
          {products.map((product) => (
          <ProductDisplay key={product.product_id} product={product} />
        ))}
        
</ul>
        )}
      </div>
  );
};
  
  export default ProductListComponent;

  function ProductDisplay({product} : {product: Product}) {
    const { addItem } = useCart();
    return (
      <article className="product-display">
        <img
          src={product.product_image_url}
          alt="item imager"
          className="item-image"
        />
      <h3>{product.product_name}</h3>
      <p>{product.product_description}</p>
      <p>Price: {product.product_price} {product.product_currency}</p>
      <button className = "add-to-cart-button" onClick={() =>addItem(product)}>Add to cart</button>
      </article>
   
  );
    
  }