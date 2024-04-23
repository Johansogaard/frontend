import { FormComponent } from './checkoutPage-Components/formComponent'
import { CheckoutMenuBar } from './checkoutMenuBar/checkoutMenuBar'
import './checkoutPage.css'
import { Link } from 'react-router-dom'
import { handleCheckout } from '../shopping-cart/shoppingCart-Components/handleCheckout'

import { useCart } from '../shopping-cart/shoppingCart-Context/cartContext'
import { formsManager } from './checkoutPage-Hooks/formsManager'
import { Helmet } from 'react-helmet';


export function CheckoutPage() {
  const { items } = useCart() // Access items from the shopping cart
  const handleCheckoutClick = () => {
    // Call handleCheckout function with the items from the shopping cart
    handleCheckout(items, '1', 'Voddervej 12', 'Stengavl 6', 2020)
  }

  return (
    <>
      <Helmet>
        <meta name="description" content="This is the checkout page" />
      </Helmet>
      <CheckoutMenuBar />
      <section className="checkout-delivery">
        <FormComponent />
      </section>

      <button className="checkout-button" onClick={handleCheckoutClick}>
        Go to payment
      </button>
    </>
  )
}
