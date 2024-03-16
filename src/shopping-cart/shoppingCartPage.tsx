
import './shoppingCartPage.css'
import {CartProvider } from './shoppingCart-Context/cartContext';
import { ItemListComponent } from './shoppingCart-Components/ItemlistComponent';
import { FormComponent } from './shoppingCart-Components/formComponent';


export function ShoppingCart() {
 
 

    


  

  /*if (items.length === 0) {
    return <p>Your shopping cart is empty.</p>
  }*/

 // const numberOfItemsfordiscount = 5
  

 //Email validering
   


 //Telefon nummer validering

  return (
    <main className="shopping-cart-container">
      <CartProvider>
      <section className="delivery">
        <FormComponent />
      </section>
      <section className="shopping-cart">
      <ItemListComponent />
      </section>
      </CartProvider>
    </main>
  )
}





