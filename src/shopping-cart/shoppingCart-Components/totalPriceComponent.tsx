import { useCart } from '../shoppingCart-Context/cartContext'
import Link from '../../components/Link'
import { loadStripe } from '@stripe/stripe-js';


export async function handleCheckout() {
  try {

    
    // make a POST request to server to create a checkout session
    const response = await fetch('http://localhost/payments/create-checkout-session', {
      method: 'POST',
    });
    const responseData = await response.json();
    const { sessionId } = responseData;

    // redirecct  user to  checkout page
    const stripe = await loadStripe('pk_test_51OiCXmBMSCX1jgl0IUNdbTl3vYHRLFCzO2Hf6HsfmbdZGFvy3lwCWkYYAOaLDRXaT6XvqiT0hlnJOJ4cMqmcWBTS00TwtT3JgH');
    if (stripe) {
      stripe.redirectToCheckout({ sessionId });
    }
  } catch (error) {
    console.error('Error during checkout:', error);
  }
}


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
      

      );
}