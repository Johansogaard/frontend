import Link from "../components/Link"
import { FormComponent } from "../shopping-cart/shoppingCart-Components/formComponent"
import { CheckoutMenuBar } from "./checkoutMenuBar/checkoutMenuBar"
import { handleCheckout } from "../shopping-cart/shoppingCart-Components/totalPriceComponent"

export function CheckoutPage(){
    return(
<>
       <CheckoutMenuBar/>
  <section className="delivery">
        <FormComponent />
      </section>
      <button className="checkout-button" onClick={handleCheckout}>
        <Link to="/payment" className="link">
          Go to payment
        </Link>
      </button>
    </>
    )
}