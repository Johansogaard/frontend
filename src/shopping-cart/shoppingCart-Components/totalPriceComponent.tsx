import { useCart } from '../shoppingCart-Context/cartContext'
import Link from '../../components/Link'




export function TotalPriceComponent() {
const { items, calcTotal, calcItemSubTotal,remainingItemsForDiscount,calcTotalItems } = useCart();
console.log('TotalPriceComponent rendered')
return(
<section className="subtotal">
        <h2>{calcTotalItems()} products - {calcTotal()} DKK</h2>
        <hr></hr>
        {items.map((item) => (
          <div key={item.product.product_id} className="item-subtotal">
            <h3>
              {item.product.product_name} Subtotal: {calcItemSubTotal(item.product.category_id)} DKK
            </h3>
            <p>{remainingItemsForDiscount(item.product.product_id)}</p>
          </div>

          //This Div aligns the subtotal with the item.id and it's row
        ))}

        <div className="subtotal-total">
          <h2>Total Items</h2>
          <h3>{calcTotalItems()} </h3>
          <h2>Total</h2>
          <h3>
            {parseFloat(calcTotal()) > 300
              ? '10% Discount Applied!'
              : `Add ${(300 - parseFloat(calcTotal())).toFixed(2)} more to get a 10% discount`}
          </h3>
          
        </div>
        <button className="checkout-button">
        <Link to="/checkout" className="link">
          Go to checkout
        </Link>
        </button>
      </section>
      

      )
}