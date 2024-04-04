import {useEffect} from 'react'
import ProductListComponent from './productsPage-Components/productsListComponent'
import { useProducts} from './productsPage-Context/productsContext'
import { Category } from '../models/Category';
import './productsPage.css'
import { Menubar } from '../menubar/menubar';
import { Topbar } from '../topbar/topBar';


export function AccessoriesPage(){
    const {setCategory, category} = useProducts();

    useEffect(() => {
        setCategory(Category.accessories)
    }, [])
    console.log('category', category)
  return (
    <>
      <Topbar />
      <Menubar />
      <h1>Table Accessories</h1>
      <ProductListComponent />
  
      </>
  )
}

