import { Product } from '../../models/Product'
import { useProducts } from '../productsPage-Context/productsContext'
import { useCart } from '../../shopping-cart/shoppingCart-Context/cartContext'
import { useState } from 'react'
import '../productsPage.css'

function ProductListComponent() {
  const { products } = useProducts()
  //console.log('products in productsList', products);

  return (
    <div className="productListComponent">
      {products.length === 0 ? (
        <div>
          <h2>No products found</h2>
          <p>
            Our backend doesn't have a certified SSL certificate because it is
            not possible with the server we are provided, so for that reason, we
            use a self-signed certificate.
          </p>
          <p>
            You will need to go to{' '}
            <a href="https://dtu62597.eduhost.dk:10132/" target="_blank">
              this link
            </a>
            , press advanced, then continue, and finally return to this site to
            see any products.
          </p>
        </div>
      ) : (
        <ul id="products" className="productList">
          <li className='productListItems'>
          {products.map((product) => (
            <ProductDisplay key={product.product_id} product={product} />
          ))}
          </li>
        </ul>
      )}
    </div>
  )
}

function ProductDisplay({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [buttonText, setButtonText] = useState('Add to cart')
  const [buttonStyle, setButtonStyle] = useState('add-to-cart-button') // New state for buttons apperance

  const handleClick = () => {
    addItem(product)
    setButtonText('Item added to cart!')
    setButtonStyle('add-to-cart-button-clicked') // Update button visual apperance to another class
    setTimeout(() => {
      setButtonText('Add to cart')
      setButtonStyle('add-to-cart-button') // Change back to old class after x sec after the click on button
    }, 1500)
  }

  return (
    <article className="product-display">
      <img
        src={product.product_image_url}
        alt="item imager"
        className="item-image"
      />
      <h1 className='productname'>{product.product_name}</h1>
      <p>{product.product_description}</p>
      <p>
        Price: {product.product_price} {product.product_currency}
      </p>
      <button className={buttonStyle} onClick={handleClick}>
        {buttonText}
      </button>
    </article>
  )
}

export default ProductListComponent
