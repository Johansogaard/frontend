import { loadStripe } from '@stripe/stripe-js'

import { CartState} from '../state/cartState/cartTypes'
import { UserState} from '../state/userState/userTypes'
import { FormsState} from '../state/fromsState/formsTypes'

export async function handleCheckout(cartState:CartState, userState:UserState, formsState:FormsState, total:string) {
  /*const { state:cartState, calcTotalWithDiscount} = useContext(CartContext);
  const {state:userState } = useContext(UserContext);
  const {state:formsState} = useContext(FormsContext);*/
  try {
    let billaddress = formsState.billing_address;
    if(formsState.billing_address === '')
      {
        billaddress = formsState.address;
      }
    const bodyData = {
      items: cartState.items,
      metadata: {
        customer_id: userState.customer_id,
        shipping_address: formsState.address,
        billing_address: billaddress,
        first_name: formsState.first_name,
        last_name: formsState.last_name,
        total_amount: total,
        token: userState.token,
        email: formsState.email,
        phone_number: formsState.phoneNumber,
      
        baseurl: window.location.href,
      },
    }

    console.log('Body Data:', bodyData)
    //https://dtu62597.eduhost.dk:10132/payments/create-checkout-session
    // make a POST request to server to create a checkout session
    //const response = await fetch('https://localhost/payments/create-checkout-session', {
    const response = await fetch(`https://dtu62597.eduhost.dk:10132/payments/create-checkout-session`, {
            
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
