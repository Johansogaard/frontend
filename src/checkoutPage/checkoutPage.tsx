import { FormComponent } from "./checkoutPage-Components/formComponent"
import { CheckoutMenuBar } from "./checkoutMenuBar/checkoutMenuBar"
import './checkoutPage.css'

export function CheckoutPage(){
    return(
<>
       <CheckoutMenuBar/>
  <section className="checkout-delivery">
        <FormComponent />
      </section>
    </>
    )
}