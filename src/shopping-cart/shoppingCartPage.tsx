import './shoppingCartPage.css'
import { ItemListComponent } from './shoppingCart-Components/ItemlistComponent'
import { TotalPriceComponent } from './shoppingCart-Components/totalPriceComponent'
import { Menubar } from '../menubar/menubar'
import { Topbar } from '../topbar/topBar'
import { Helmet, HelmetProvider } from 'react-helmet-async'
export function ShoppingCart() {
  console.log('ShoppingCart rendered')

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <meta name="description" content="This is the shopping cart page" />
        </Helmet>
      </HelmetProvider>
      <Topbar />
      <Menubar />
      <main className="shopping-cart-container">
        <section className="shopping-cart">
          <ItemListComponent />
        </section>
        <section className="total">
          <TotalPriceComponent />
        </section>
      </main>
    </>
  )
}
