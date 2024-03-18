
import './shoppingCartPage.css'
import {CartProvider } from './shoppingCart-Context/cartContext';
import { ItemListComponent } from './shoppingCart-Components/ItemlistComponent';
import { FormComponent } from './shoppingCart-Components/formComponent';
import { TotalPriceComponent } from './shoppingCart-Components/totalPriceComponent';

export function ShoppingCart() {
 
 
console.log('ShoppingCart rendered')
    


  

  return (
    <main className="shopping-cart-container">
      <CartProvider>
      <section className="delivery">
        <FormComponent />
      </section>
      <section className="shopping-cart">
      <ItemListComponent />
      </section>
      <section className= "total">
      <TotalPriceComponent />
      </section>
      </CartProvider>
    </main>
  )
}





