import { useEffect, useState } from 'react'
import './shoppingCart.css'
import itemPlaceholder from '../assets/placeholderItem.svg'

export interface Item {
  id: number
  name: string
  currency: string
  quantity: number
  price: number
  clicks: number // Click Counter
}

// Sample items
const initialItems: Item[] = [
  {
    id: 1,
    name: 'Royal Copenhagen',
    currency: 'DKK',
    quantity: 2,
    price: 1.99,
    clicks: 0,
  },
  {
    id: 2,
    name: 'tablecloth-silk',
    currency: 'DKK',
    quantity: 3,
    price: 250,
    clicks: 0,
  },
  {
    id: 3,
    name: 'Luxury Tablecloth',
    currency: 'DKK',
    quantity: 1,
    price: 399,
    clicks: 0,
  }, // hardcoded upSell item
]

export function ShoppingCart() {
  const [items, setItems] = useState<Item[]>(initialItems)

  const handleShopQuantityComponent = (itemId: number, change: number) => {
    setItems((previousItems) =>
      previousItems.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item,
      ).filter((item) => item.quantity > 0),
    )
  }

  if (items.length === 0) {
    return <p>Your shopping cart is empty.</p>
  }

  const numberOfItemsfordiscount = 5
  const remainingItemsForDiscount = (itemId: number) => {
    const item = items.find((item) => item.id === itemId)
    if (item && item.quantity < numberOfItemsfordiscount) {
      return `Buy only ${numberOfItemsfordiscount - item.quantity} more ${item.name} to get a 20% discount!`
    } // if you got enough items for that item, it's applied. (Visual text change)
    return '20% Discount Applied!'
  }

  const calcTotal = () => {
    const total = items.reduce(
      (total, item) => total + parseFloat(calcItemSubTotalWithDiscount(item)),
      0,
    )
    const discountThreshold = 300
    const discountPercentage = 0.1 // 10% discount

    if (total > discountThreshold) {
      // Apply discount
      const discountedTotal = total * (1 - discountPercentage)
      return discountedTotal.toFixed(2)
    } else {
      return total.toFixed(2)
    }
  }

  const removeItem = (itemId: number) => {
    setItems(items.filter((item) => item.id !== itemId))
  }

  const calcItemSubTotalWithDiscount = (item: Item) => {
    const discountprice = item.quantity >= 5 ? item.price * 0.8 : item.price
    //20%  math calc discount HERE!!
    return (item.quantity * discountprice).toFixed(2)
  }

  const calcItemSubTotal = (itemId: number) => {
    const item = items.find((item) => item.id === itemId)
    if (item) {
      return calcItemSubTotalWithDiscount(item)
    }
    }

 //Email validering
    const [email, setEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true); 

    const validateEmail = (email: string) => {
     var re = /\S+@\S+\.\S+/;
     return re.test(email);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
     console.log('Email changed:', email); 
     setEmail(email);
     setIsEmailValid(validateEmail(email));
    };

 //Telefon nummer validering
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);

    const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const phone = event.target.value;
 
    const isValid = /^\d{8}$/.test(phone);
     setPhoneNumber(phone);
     setIsPhoneNumberValid(isValid);
    };    

 // VAT nummer validering
 const [vatNumber, setVatNumber] = useState('');
 const [isVatNumberValid, setIsVatNumberValid] = useState(true);

 const handleVatNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
 const vat = event.target.value;
     // Tjekker om VAT-nummeret kun indeholder tal og er 8 cifre langt
 const isValid = /^\d{8}$/.test(vat);
     setVatNumber(vat);
     setIsVatNumberValid(isValid);
};

  //Don't know how to reference methods yet inside icons for react, but should be ideal inside an ellipse on shopping cart Icon.
  //For now placeholder of total items.
  const calctotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0).toFixed(0)
  }
  return (
    <main className="shopping-cart-container">
      <section className="delivery">
        <h2>Contact Information</h2>
        <form>
          <input type="email" name="email" placeholder="Indtast din email" required value={email} onChange={handleEmailChange} 
          style={{ borderColor: isEmailValid ? 'green' : 'red' }} // Visuel feedback med grænsefarve rød eller grøn når det er korrekt/forkert/
          />
          {!isEmailValid && <p style={{ color: 'red' }}>Emailen er ikke gyldig.</p>} 
          <h2>Delivery</h2>
          <select id="country" name="country" required>
            <option value="dk">Denmark</option>
            
          </select>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              className="small-input"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              className="small-input"
            />
          </div>
          
{ 
// Tjekker at det er et 8 cifre langt, som er krav for VAT nummeret.
}
        <input type="text" name="company" placeholder="Company VAT number (optional)" value={vatNumber} onChange={handleVatNumberChange} 
          style={{ borderColor: isVatNumberValid ? 'green' : 'red' }} maxLength={8} required/>
          <input type="text" name="address" placeholder="Address" 
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}/>
        {!isVatNumberValid && <p style={{ color: 'red' }}>VAT-nummeret skal være 8 cifre langt.</p>} 

          <ZipForm />
{
// Tjekker at det er et telefonnummer. Ved at sikre det er præcis 8 cifre, og ingen af disse cifre kan være bogstaver.
}
        <input type="tel" 
        name="phone"  placeholder='Phone number' value={phoneNumber} onChange={handlePhoneNumberChange} 
        style={{ borderColor: isPhoneNumberValid ? 'green' : 'red' }} required
        onKeyPress={(event) => {
        if (!/[0-9]/.test(event.key)) {
        event.preventDefault();
         }
         }}
         maxLength={8}
        /> 
       {!isPhoneNumberValid && <p style={{ color: 'red' }}>Telefonnummeret er forkert.</p>}
        </form>
      </section>
      <section className="shopping-cart">
        <h2>Shopping Cart</h2>
        <ul id="cart-items" className="unsortList">
          {items.map(
            (item) =>
              item.id != 3 && (
                <li key={item.id}>
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
