import { useCart } from '../shoppingCart-Context/cartContext'
import Link from '../../components/Link'
import { loadStripe } from '@stripe/stripe-js';
import { Item } from '../../models/Item';



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



export async function handleCheckout(items: Item[]) {
  try {
    console.log('Items:', items);

    const bodyData = {
      items: items,
    };

    console.log('Body Data:', bodyData);

    // make a POST request to server to create a checkout session
    const response = await fetch('http://localhost/payments/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyData),
    });
    const responseData = await response.json();
    const { sessionId } = responseData;

    // redirect user to checkout page
    const stripe = await loadStripe('pk_test_51OiCXmBMSCX1jgl0IUNdbTl3vYHRLFCzO2Hf6HsfmbdZGFvy3lwCWkYYAOaLDRXaT6XvqiT0hlnJOJ4cMqmcWBTS00TwtT3JgH');
    if (stripe) {
      stripe.redirectToCheckout({ sessionId });
    }
  } catch (error) {
    console.error('Error during checkout:', error);
  }
}