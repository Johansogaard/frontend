import { useEffect } from 'react'
import ProductListComponent from './productsPage-Components/productsListComponent'
import { useProducts } from './productsPage-Context/productsContext'
import { Category } from '../models/Category'
import './productsPage.css'
import { Menubar } from '../menubar/menubar'
import { Topbar } from '../topbar/topBar'

export function AccessoriesPage() {
  const { setCategory, category } = useProducts()

  useEffect(() => {
    setCategory(Category.accessories)
  }, [])
  console.log('category', category)
  return (
    <>
      <Topbar />
      <Menubar />
      <h1>Table Accessories</h1>
      <p className="productPageDescription">
        Discover our refined collection of Table Accessories, where
        functionality meets style. Dive into our handpicked selection of
        centerpieces, coasters, and trivets crafted to complement any tabletop.
        Ideal for those who cherish the details that make a meal memorable, our
        pieces are more than just accents; they're conversation starters.
        Upgrade your table setting with our unique finds and turn every meal
        into a special occasion.
      </p>
      <ProductListComponent />
    </>
  )
}
