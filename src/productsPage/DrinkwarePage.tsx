import { useEffect } from 'react'
import ProductListComponent from './productsPage-Components/productsListComponent'
import { useProducts } from './productsPage-Context/productsContext'
import { Category } from '../models/Category'
import './productsPage.css'
import { Menubar } from '../menubar/menubar'
import { Topbar } from '../topbar/topBar'
import { Helmet } from 'react-helmet'

export function DrinkwarePage() {
  const { setCategory } = useProducts()

  useEffect(() => {
    setCategory(Category.drinkware)
  }, [])
  return (
    <>
       <Helmet>
        <meta name="description" content="This is the drinkware page" />
      </Helmet>
      <Topbar />
      <Menubar />
      <h1>Drinkware</h1>
      <p className="productPageDescription">
        Raise a glass to impeccable style with our Drinkware Collection, where
        each sip is a toast to elegance. Whether you're winding down with a
        delicate wine or toasting to new beginnings with sparkling crystal, our
        selection of glasses and stemware caters to every beverage preference.
        Explore our range of beautifully designed options, from robust tumblers
        to sophisticated flutes, each promising to complement your favorite
        libations and enhance your drinking experience. Cheers to life's
        moments, big and small, with the perfect drinkware in hand.
      </p>
      <ProductListComponent />
    </>
  )
}
