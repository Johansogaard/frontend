
import './shoppingCartPage.css'

import { ItemListComponent } from './shoppingCart-Components/ItemlistComponent';

import { TotalPriceComponent } from './shoppingCart-Components/totalPriceComponent';
import { Menubar } from '../menubar/menubar';
import { Topbar } from '../topbar/topBar';
import Link from '../components/Link';

export function ShoppingCart() {
 
 
console.log('ShoppingCart rendered')
    


  

  return (
    <>
    <Topbar />
    <Menubar />
    <main className="shopping-cart-container">
      
      <section className="shopping-cart">
      <ItemListComponent />
      </section>
      <section className= "total">
      <TotalPriceComponent />
      </section>
     
    </main>
    </>
  )
}





