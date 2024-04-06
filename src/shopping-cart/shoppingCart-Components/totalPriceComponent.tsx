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
            <div className='item-subtotal-price'>
            <span>
              {item.product.product_name} x {item.quantity} 
            </span>
            <span>{calcItemSubTotal(item.product.product_id)}</span>
            </div>
            <div className='item-subtotal-discount'>
            <span>{remainingItemsForDiscount(item.product.product_id)}</span>
            </div>
          </div>

          //This Div aligns the subtotal with the item.id and it's row
        ))}

        <div className="subtotal-total">
          <strong>Your total price</strong>
          <strong>{calcTotal()}</strong> 
        
          
        </div>
        <button className="checkout-button">
        <Link to="/checkout" className="link">
          Go to checkout
        </Link>
        </button>
      </section>
      

      )
}