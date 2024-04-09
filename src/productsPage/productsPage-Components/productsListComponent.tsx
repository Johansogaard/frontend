
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
            <p>Our backend doesn't have a certified SSL certificate because it is not possible with the server we are provided, so for that reason, we use a self-signed certificate.</p>
             <p>You will need to go to <a href="https://dtu62597.eduhost.dk:10132/" target="_blank">this link</a>, press advanced, then continue, and finally return to this site to see any products.</p>

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