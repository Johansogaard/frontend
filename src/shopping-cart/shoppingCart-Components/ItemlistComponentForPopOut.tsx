import { useCart } from '../shoppingCart-Context/cartContext'
import { Item } from '../../models/Item'
import { Link } from 'react-router-dom'
import deleteIcon from '../../assets/delete.svg'

export function ItemListComponent() {
  console.log('ItemListComponent rendered')
  const { items } = useCart()
  console.log(items)

  return (
    <>
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
          <li>
          {items.map((item) => (
            <ShoppingCartItem key={item.product.product_id} item={item} />
          ))}
          </li>
        </ul>
      )}
    </>
  )
}

function ShoppingCartItem({ item }: { item: Item }) {
  const { handleShopQuantityComponent, removeItem } = useCart()
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
          <div className="item-info">
            <h1>{item.product.product_name}</h1>
          </div>
          <div className="item-pricing">
            <div className="item-pricing">
              <div className="quantity-Checker">
                <button
                  className="quantity-btn"
                  onClick={() =>
                    handleShopQuantityComponent(item.product.product_id, -1)
                  }
                >
                  -
                </button>
                <p className="quantity-numb">{item.quantity}</p>
                <button
                  className="quantity-btn"
                  onClick={() =>
                    handleShopQuantityComponent(item.product.product_id, 1)
                  }
                >
                  +
                </button>
                <button
                  className="remove-btn1"
                  onClick={() => removeItem(item.product.product_id)}
                  style={{ cursor: 'pointer' }}
                >
                  <img src={deleteIcon} alt="delete" className="remove-image" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  )
}
