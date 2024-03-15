import { useEffect, useState } from 'react'
import React from 'react';
import './shoppingCart.css'
import itemPlaceholder from '../assets/placeholderItem.svg'
import { Product } from "../models/Product";
import { CartItemManager } from './hooks/cartItemManager';
import { formsManager } from './hooks/formsManager';


export function ShoppingCart() {
  const {items, initTestItems, handleShopQuantityComponent} = CartItemManager();
  const {email,phoneNumber,vatNumber,setEmail,setPhoneNumber,setVatNumber,isEmailValid,isPhoneNumberValid,isVatNumberValid } = formsManager();

    useEffect(() => {
     initTestItems();
    },
    []);


  

  if (items.length === 0) {
    return <p>Your shopping cart is empty.</p>
  }

 // const numberOfItemsfordiscount = 5
  

 //Email validering
   


 //Telefon nummer validering

  return (
    <main className="shopping-cart-container">
      <section className="delivery">
        
      </section>
      <section className="shopping-cart">
        <h2>Shopping Cart</h2>
        <ul id="cart-items" className="unsortList">
          {items.map(
            (item) =>
              item.product.product_id != 3 && (
                <li key={item.product.product_id}>
                  {shoppingCartItem(
                    item,
                    handleShopQuantityComponent,
                    removeItem,
                  )}
                </li>
              ),
          )}
        </ul>

        <section className="upselling">
          <p>Consider Luxury Tablecloth cloth for only 149 DKK Ekstra</p>
          {items.map(
            (item) =>
              item.id === 3 && (
                <li key={item.id}>
                  {shoppingCartItem(
                    item,
                    handleShopQuantityComponent,
                    removeItem,
                  )}
                </li>
              ),
          )}
        </section>
      </section>
      <section className="subtotal">
        <h2>Check out basket</h2>
        {items.map((item) => (
          <div key={item.id} className="item-subtotal">
            <h3>
              {item.name} Subtotal: {calcItemSubTotal(item.id)} DKK
            </h3>
            <p>{remainingItemsForDiscount(item.id)}</p>
          </div>

          //This Div aligns the subtotal with the item.id and it's row
        ))}

        <div className="total">
          <h2>Total Items</h2>
          <h3>{calctotalItems()} </h3>
          <h2>Total</h2>
          <h3>
            {parseFloat(calcTotal()) > 300
              ? '10% Discount Applied!'
              : `Add ${(300 - parseFloat(calcTotal())).toFixed(2)} more to get a 10% discount`}
          </h3>
          <h3>{calcTotal()} DKK</h3>
        </div>
      </section>
    </main>
  )
}

function shoppingCartItem(
  item: Item,
  handleShopQuantityComponent: (itemId: number, change: number) => void,
  removeItem: (itemId: number) => void,
) {
  return (
    <section>
      <div className="divider"></div>
      <article className="item-container">
        <img
          src={itemPlaceholder}
          alt="item placeholder"
          className="item-image"
        />
        <p>{item.name}</p>
        <p>
          {item.price} {item.currency}
        </p>

        <div className="quantity-Checker">
          <button onClick={() => handleShopQuantityComponent(item.id, -1)}>
            -
          </button>
          <p>{item.quantity}</p>
          <button onClick={() => handleShopQuantityComponent(item.id, 1)}>
            +
          </button>
        </div>
        <p onClick={() => removeItem(item.id)} style={{ cursor: 'pointer' }}>
          remove
        </p>
      </article>
    </section>
  )
}

function ZipForm() {
  type PostalCodeData = {
    nr: string
    navn: string
  }
  const [postalCode, setPostalCode] = useState('')
  const [postalCodes, setPostalCodes] = useState<PostalCodeData[]>([])
  const [message, setMessage] = useState('')
  const [city, setCity] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://api.dataforsyningen.dk/postnumre')
      const data = await response.json()
      setPostalCodes(data)
    }
    fetchData()
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setPostalCode(value)

    if (value.length === 4) {
      const postalCodeData = postalCodes.find(
        (item: { nr: string; navn: string }) => item.nr === value,
      )
      if (postalCodeData) {
        setMessage('')
        setCity(postalCodeData.navn)
      } else {
        setMessage('Postal code is not valid')
        setCity('')
      }
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <input
        type="text"
        name="postalCode"
        placeholder="Postal Code"
        value={postalCode}
        onChange={handleChange}
        className="small-input"
        maxLength={4}
      />
      {message && <p style={{ color: 'red' }}>{message}</p>}

      <input
        type="text"
        name="City"
        placeholder="City"
        value={city}
        readOnly
        className="small-input"
      />
    </div>
  )
}

export default ZipForm



