import {useEffect} from 'react'
import ProductListComponent from './productsPage-Components/productsListComponent'
import { useProducts } from './productsPage-Context/productsContext'
import { Category } from '../models/Category';
import './productsPage.css'
import { Menubar } from '../menubar/menubar';
import { Topbar } from '../topbar/topBar';


export function DinnerwarePage(){
    const {setCategory} = useProducts();

    useEffect(() => {
        setCategory(Category.dinnerware)
    }, [])
  return (
    <>
      <Topbar />
      <Menubar />
      <h1>Dinnerware</h1>
      <ProductListComponent />
  
      </>
  )
}

