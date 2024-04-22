import { FormComponent} from "./checkoutPage-Components/formComponent"
import { CheckoutMenuBar } from "./checkoutMenuBar/checkoutMenuBar"
import './checkoutPage.css'
import { Link } from "react-router-dom"
import { handleCheckout } from "../shopping-cart/shoppingCart-Components/handleCheckout"

import { useCart } from "../shopping-cart/shoppingCart-Context/cartContext";


export function CheckoutPage(){
  const { items } = useCart(); // Access items from the shopping cart

 
  const handleCheckoutClick = () => {
    // Call handleCheckout function with the items from the shopping cart
    handleCheckout(items, "1", "shipping_address", "billing_address", 200020);
  };
    return(
<>
       <CheckoutMenuBar/>
  <section className="checkout-delivery">
      <FormComponent />
      </section>
      <button className="checkout-button" onClick={handleCheckoutClick}>
        <Link to="/payments" className="link">
          Go to payment
        </Link>
      </button>
    </>
    )
}