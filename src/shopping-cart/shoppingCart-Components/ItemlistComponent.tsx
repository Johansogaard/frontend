import { useCart } from '../shoppingCart-Context/cartContext'
import {Item} from '../../models/Item'




export function ItemListComponent(){
  console.log('ItemListComponent rendered')
  const { items} = useCart();
  console.log(items);
  return(
    <>
    <h2>Shopping Cart</h2>
<ul id="cart-items" className="unsortList">
{items.map((item) => (
          <ShoppingCartItem key={item.product.product_id} item={item} />
        ))}
</ul>


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
        <p>{item.product.product_name}</p>
        <p>
          {item.product.product_name} {item.product.product_price} {item.product.product_currency}
        </p>

        <div className="quantity-Checker">
          <button onClick={() => handleShopQuantityComponent(item.product.product_id, -1)}>
            -
          </button>
          <p>{item.quantity}</p>
          <button onClick={() => handleShopQuantityComponent(item.product.product_id, 1)}>
            +
          </button>
        </div>
        <p onClick={() => removeItem(item.product.product_id)} style={{ cursor: 'pointer' }}>
          remove
        </p>
      </article>
    </section>
  )
}