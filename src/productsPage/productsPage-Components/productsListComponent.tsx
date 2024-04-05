import { Product } from "../../models/Product";
import { useProducts } from "../productsPage-Context/productsContext";
import { useCart } from "../../shopping-cart/shoppingCart-Context/cartContext";
import { useState } from 'react';

function ProductListComponent() {
    const { products} =useProducts();
    //console.log('products in productsList', products);

  
    return (
      <div className = "productListComponent" >

        <ul id="products" className="productList">
          {products.map((product) => (
          <ProductDisplay key={product.product_id} product={product} />
        ))}
</ul>
      </div>
    );
  };
  
  export default ProductListComponent;

  function ProductDisplay({product} : {product: Product}) {
    const { addItem } = useCart();
    const [buttonText, setButtonText] = useState('Add to cart'); // Gives a state to the button/text to change
    const [buttonColor, setButtonColor] = useState(''); // State to control button color

    const handleAddToCart = () => {
      addItem(product); 
      setButtonText('Item added to cart'); // Update button text
      setButtonColor('#D4D2D2'); // Change button color to grey
      setTimeout(() => {
        setButtonText('Add To Cart'); // Reset button text after 2 sec.
        setButtonColor(''); // Reset button color after 2 sec.
      }, 2000); 
    }

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
      <button className="add-to-cart-button" onClick={handleAddToCart} style={{backgroundColor: buttonColor}}>
        {buttonText}
      </button>
      </article>
   
  );
    
  }