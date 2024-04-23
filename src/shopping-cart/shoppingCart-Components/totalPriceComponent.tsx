import { useCart } from '../shoppingCart-Context/cartContext'
import { Link } from 'react-router-dom'

export function TotalPriceComponent() {
  const {
    items,
    calcTotal,
    calcItemSubTotal,
    remainingItemsForDiscount,
    calcTotalItems,
    calcTotalDiscount,
    calcTotalWithDiscount,
    calcDiscountForItem,
  } = useCart()
  console.log('TotalPriceComponent rendered')
  return (
    <section className="subtotal">
      <h2>
        {calcTotalItems()} products - {calcTotal()} DKK
      </h2>
      <hr></hr>
      {items.map((item) => (
        <div key={item.product.product_id} className="item-subtotal">
          <div className="item-subtotal-price">
            <span>
              {item.product.product_name} x {item.quantity}
            </span>
            <span>{calcItemSubTotal(item.product.product_id)}</span>
          </div>
          <div className="item-subtotal-discount">
            {calcDiscountForItem(item) !== '0.00' &&
              (remainingItemsForDiscount(item) !== '0' ? (
                <span>
                  {' '}
                  add {remainingItemsForDiscount(item)} for{' '}
                  {calcDiscountForItem(item)} DKK discount!
                </span>
              ) : (
                <span className="item-subtotal-discount-applied">
                  {' '}
                  -{calcDiscountForItem(item)} DKK discount!
                </span>
              ))}
          </div>
        </div>

        //This Div aligns the subtotal with the item.id and it's row
      ))}
      <div className="subtotal-total">
        <span>Price</span>
        <span>{calcTotal()}</span>
      </div>
      <div className="subtotal-discount">
        <span>Discount</span>
        <span>-{calcTotalDiscount()}</span>
      </div>
      <div className="subtotal-total-withDiscount">
        <strong>Your total price</strong>
        <strong>{calcTotalWithDiscount()}</strong>
      </div>
      <Link to="/checkout" className="link">
        <button className="checkout-button">Go to checkout</button>
      </Link>
    </section>
  )
}
