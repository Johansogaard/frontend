import { Item } from "../../models/Item";
import { loadStripe } from '@stripe/stripe-js';
export async function handleCheckout(items: Item[]) {
    try {
      console.log('Items:', items);
  
      const bodyData = {
        items: items,
      };
  
      console.log('Body Data:', bodyData);
  
      // make a POST request to server to create a checkout session
    //const response = await fetch('http://localhost/payments/create-checkout-session', {
    const response = await fetch(`https://dtu62597.eduhost.dk:10132/payments/create-checkout-session`, {
            
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