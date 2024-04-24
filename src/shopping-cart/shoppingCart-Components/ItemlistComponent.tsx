import { CartContext } from '../../state/cartState/cartContext'
import {useContext} from 'react'
import {Item} from '../../models/Item'
import { Link } from 'react-router-dom'
import deleteIcon from '../../assets/delete.svg'

export function ItemListComponent(){

  const { state} = useContext(CartContext);
 

  
  return(
    <>
    <h2>Shopping Cart</h2>
    {state.items.length === 0 ? (
      <>
      <p>Cart is empty</p>
      <button>
        <Link to="/all-products" className="link">
          Continue shopping
        </Link>
      </button>
   

  </>
    
    ) : (
<ul id="cart-items" className="unsortList">
{state.items.map((item) => (
          <ShoppingCartItem key={item.product.product_id} item={item} />
        ))}
</ul>
    )}
</>
  )
}


function ShoppingCartItem({item}: {item:Item}) {
  const { dispatch } = useContext(CartContext);
  const handleProductQuantity = (product_Id: number, quantity: number) => {
    dispatch({type: 'CART_UPDATE_PRODUCT_QUANTITY', payload: {product_Id, quantity}});
  };
  const handleRemoveItem = (product_Id: number) => {
    dispatch({type: 'CART_REMOVE_PRODUCT', payload: {product_Id}});
  }
  

  return (
    <section>
      <div className="divider"></div>
      <article className="item-container">
        <img
          src={item.product.product_image_url}
          alt="item imager"
          className="item-image"
        />
        <div className="item-info">
          <h1>{item.product.product_name}</h1>
          <span>{item.product.product_description}</span>
        </div>
        <div className="item-pricing">
  
        <button className='remove-btn' onClick={() => {
          // This is for pop up window to ask user if they are sure about removing item from cart. 
  const isConfirmed = window.confirm('Are you sure, you want to remove this is from cart?');
  if (isConfirmed) {
    handleRemoveItem(item.product.product_id);
  }
  }} >

          <img src={deleteIcon} alt='delete' className='remove-image' />
        </button> 
        <div className='item-pricing-lineTwo'>
        <p className='price-pr-item-tag'>
          {item.product.product_price} pr item
        </p>
        <div className="quantity-Checker">
        

          <button className='quantity-btn' onClick={() => {
            // Another pop up window, when user updates quantity to 0 items
            if (item.quantity === 1) {
              const isConfirmed = window.confirm('Are you sure, you want to remove this is from cart?');
              if (isConfirmed) {
                handleRemoveItem(item.product.product_id);
              }
            } else {
              handleProductQuantity(item.product.product_id, -1);
            }
          }}>
            -
          </button>
          <p className='quantity-numb'>{item.quantity}</p>
          <button className='quantity-btn' onClick={() => handleProductQuantity(item.product.product_id, 1)}>
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
