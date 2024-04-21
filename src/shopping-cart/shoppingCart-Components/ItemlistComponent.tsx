import { useCart } from '../shoppingCart-Context/cartContext'
import {Item} from '../../models/Item'
import { Link } from 'react-router-dom'
import deleteIcon from '../../assets/delete.svg'

export function ItemListComponent(){
  console.log('ItemListComponent rendered')
  const { items} = useCart();
  console.log(items);

  
  return(
    <>
    <h2>Shopping Cart</h2>
    {items.length === 0 ? (
      <>
      <p>Cart is empty</p>
      <button>
        <Link to="/all-products" className="link">
          Cuntinue shopping
        </Link>
      </button>
   

    
  </>
    
    ) : (
<ul id="cart-items" className="unsortList">
{items.map((item) => (
          <ShoppingCartItem key={item.product.product_id} item={item} />
        ))}
</ul>
    )}
</>
  )
}


function ShoppingCartItem({item}: {item:Item}) {
  const { handleShopQuantityComponent, removeItem } = useCart();
  return (
    <section>
      <div className="divider"></div>
      <article className="item-container">
        <img
          src={item.product.product_image_url}
          alt="item imager"
          className="item-image"
        />
        <div className='item-info'>
        <h1>{item.product.product_name}</h1>
        <span>
          {item.product.product_description}
        </span>
        </div>
        
        <div className="item-pricing">
        <button className='remove-btn' onClick={() => removeItem(item.product.product_id)} style={{ cursor: 'pointer' }}>
          <img src={deleteIcon} alt='delete' className='remove-image' />
        </button> 
        <div className='item-pricing-lineTwo'>
        <p className='price-pr-item-tag'>
          {item.product.product_price} pr item
        </p>
        <div className="quantity-Checker">
          <button className='quantity-btn' onClick={() => handleShopQuantityComponent(item.product.product_id, -1)}>
            -
          </button>
          <p className='quantity-numb'>{item.quantity}</p>
          <button className='quantity-btn' onClick={() => handleShopQuantityComponent(item.product.product_id, 1)}>
            +
          </button>
          </div>
        </div>
        <div className='item-pricing-total'>
          <p className='price-tag'>Price:</p>
          <p>{item.product.product_price * item.quantity} DKK</p>
          </div>
        </div>
      </article>
    </section>
  )
}
