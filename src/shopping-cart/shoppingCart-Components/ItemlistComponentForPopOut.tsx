import { CartContext } from '../../state/cartState/cartContext'
import {useContext  } from 'react'
import {Item} from '../../models/Item'
import { Link } from 'react-router-dom'
import deleteIcon from '../../assets/delete.svg'
import React from 'react'

export function ItemListComponent(){
  console.log('ItemListComponent rendered')
  const { state} = useContext(CartContext);
 

  
  return(
    <>
    {state.items.length === 0 ? (
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
{state.items.map((item) => (
          <ShoppingCartItem key={item.product.product_id} item={item} />
        ))}
</ul>
    )}
</>
  )
}


function ShoppingCartItem({item}: {item: Item}) {
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
          alt="item image"
          className="item-image-popOut"
        />
        <div className="item-details">
          <div className='item-info'>
            <h1>{item.product.product_name}</h1>
          </div>
          <div className="item-pricing">
            
            <div className='item-pricing'>
              <div className="quantity-Checker">
                <button className='quantity-btn' onClick={() => handleProductQuantity(item.product.product_id, -1)}>
                  -
                </button>
                <p className='quantity-numb'>{item.quantity}</p>
                <button className='quantity-btn' onClick={() => handleProductQuantity(item.product.product_id, 1)}>
                  +
                </button>
                <button className='remove-btn1' onClick={() => handleRemoveItem(item.product.product_id)} style={{ cursor: 'pointer' }}>
                    <img src={deleteIcon} alt='delete' className='remove-image' />
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
