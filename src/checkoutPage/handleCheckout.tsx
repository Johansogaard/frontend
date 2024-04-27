import { Item } from '../models/Item'
import { loadStripe } from '@stripe/stripe-js'

export async function handleCheckout(
  items: Item[],
  shipping_address: string,
  billing_address: string,
  total_amount: number,
  token: string | null,
  customer_id: number | null,

) {
  
  try {
    const bodyData = {
      items: items,
      metadata: {
        customer_id: customer_id,
        shipping_address: shipping_address,
        billing_address: billing_address,
        total_amount: total_amount,
        token: token,
      
        baseurl: window.location.href,
      },
    }

    console.log('Body Data:', bodyData)
    //https://dtu62597.eduhost.dk:10132/payments/create-checkout-session
    // make a POST request to server to create a checkout session
    //const response = await fetch('https://localhost/payments/create-checkout-session', {
    const response = await fetch(`https://localhost/payments/create-checkout-session`, {
            
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      },
    )
    const responseData = await response.json()
    const { sessionId } = responseData

    // redirect user to checkout page
    const stripe = await loadStripe(
      'pk_test_51OiCXmBMSCX1jgl0IUNdbTl3vYHRLFCzO2Hf6HsfmbdZGFvy3lwCWkYYAOaLDRXaT6XvqiT0hlnJOJ4cMqmcWBTS00TwtT3JgH',
    )
    if (stripe) {
      stripe.redirectToCheckout({ sessionId })
    }
  } catch (error) {
    console.error('Error during checkout:', error)
  }
}
