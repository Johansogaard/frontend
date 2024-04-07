import { FormComponent } from "./checkoutPage-Components/formComponent"
import { CheckoutMenuBar } from "./checkoutMenuBar/checkoutMenuBar"


export function CheckoutPage(){
    return(
<>
       <CheckoutMenuBar/>
  <section className="delivery">
        <FormComponent />
      </section>
    </>
    )
}