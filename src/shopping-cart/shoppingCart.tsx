
import  { useEffect, useState } from 'react';
import './shoppingCart.css';
import itemPlaceholder from '../assets/placeholderItem.svg';

interface Item {
    id: number;
    name: string;
    currency: string;
    quantity: number;
    price: number;
    clicks: number; // Click Counter
}

// Sample items
const initialItems: Item[] = [
    { id: 1, name: "Royal Copenhagen", currency: "DKK", quantity: 2, price: 1.99, clicks: 0 },
    { id: 2, name: "tablecloth-silk", currency: "DKK", quantity: 3, price: 250, clicks: 0 },
];

export function ShoppingCart() {
    const [items, setItems] = useState<Item[]>(initialItems);

    const handleShopQuantityComponent = (itemId: number, change: number) => {
        setItems(previousItems => previousItems.map(item => (
            item.id === itemId ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
        )

            )
        );
    };

    const numberOfItemsfordiscount = 5;
    const remainingItemsForDiscount = (itemId: number) => {
        const item = items.find((item) => item.id === itemId);
        if (item && item.quantity < numberOfItemsfordiscount) {
            return `Buy only ${numberOfItemsfordiscount - item.quantity} more ${item.name} to get a 20% discount!`;
        } // if you got enough items for that item, it's applied. (Visual text change)
        return '20% Discount Applied!';
    };
    const calcTotal = () => {
        return items.reduce((total, item) => total + parseFloat(calcItemSubTotalWithDiscount(item)), 0).toFixed(2);
    };

    const removeItem = (itemId: number) => {
        setItems(items.filter(item => item.id !== itemId));
      };

    const calcItemSubTotalWithDiscount = (item: Item) => {
        const discountprice = item.quantity >= 5 ? item.price * 0.8 : item.price;
        //20%  math calc discount HERE!!
        return (item.quantity * discountprice).toFixed(2);
    };

    const calcItemSubTotal = (itemId: number) => {
        const item = items.find((item) => item.id === itemId);
        if (item) {
            return calcItemSubTotalWithDiscount(item);
        }
    };
  
    //Don't know how to reference methods yet inside icons for react, but should be ideal inside an ellipse on shopping cart Icon.
    //For now placeholder of total items.
    const calctotalItems = () => {
        return items.reduce((total, item) => total + item.quantity, 0).toFixed(0);
    };
    return (


        <div className="shopping-cart-container">
            

            <div className='delivery'>
            <h2>Contact Information</h2>
            <form>
                <input type="email" name="email" placeholder="Email" required />
                <h2>Delivery</h2>
                <select id="country" name="country" required>
                    <option value="dk">Denmark</option>
                </select>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <input type="text" name="firstName" placeholder='First name' className='small-input'  />
                        <input type="text" name="lastName" placeholder='Last name' className='small-input'/>
                    </div>
                    <input type="text" name="company" placeholder='Company (optional)' />
                    <input type="text" name="address" placeholder='Address' />
                    <ZipForm />
                    <input type="tel" name="phone" placeholder='Phone number' />

                </form>

                </div>

            <div className="shopping-cart">
                <h2>Shopping Cart</h2>
                <ul id="cart-items" className="unsortList">
                    {items.map((item) => (
                        <li key={item.id}>
                            {shoppingCartItem(item, handleShopQuantityComponent,removeItem)}
                        </li>
                    ))}
                </ul>

                        
                    
                    
                    
            </div>
            
            <div className="subtotal">
                <h2>Check out basket</h2>
                {items.map((item) => (
                    <div key={item.id} className="item-subtotal">
                        <h3>{item.name} Subtotal: {calcItemSubTotal(item.id)} DKK</h3>
                        <p>{remainingItemsForDiscount(item.id)}</p>
                    </div>

                    //This Div aligns the subtotal with the item.id and it's row
                ))}

                <div className="total">
                    <h2>Total Items</h2>
                    <h3>{calctotalItems()} </h3>
                    <h2>Total</h2>
                    <h3>{calcTotal()} DKK</h3>
                </div>
            </div>
        </div>
    );
}

function shoppingCartItem(item: Item, 
    handleShopQuantityComponent: (itemId: number, change: number) => void,
    removeItem: (itemId: number) => void
    ) {
    return (
        <section>
            <div className="divider"></div>
            <div className="item-container">
                <img src={itemPlaceholder} alt="item placeholder" className="item-image" />
                <p>{item.name}</p>
                <p>{item.price} {item.currency}</p>
                
                
                <div className="quantity-Checker">
                    <button onClick={() => handleShopQuantityComponent(item.id, -1)} >-</button>
                    <p >{item.quantity}</p>
                    <button onClick={() => handleShopQuantityComponent(item.id, 1)}>+</button>
                </div>
                <p onClick={() => removeItem(item.id)} style={{ cursor: 'pointer' }}>
                remove
                </p>

            </div>
        </section>
    );
}

function ZipForm(){
    
    type PostalCodeData = {
        nr: string;
        navn: string;
      };
const [postalCode, setPostalCode] = useState('');
const [postalCodes, setPostalCodes] = useState<PostalCodeData[]>([]);    
const [message, setMessage] = useState('');
    const [city, setCity] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://api.dataforsyningen.dk/postnumre');
            const data = await response.json();
            setPostalCodes(data);
        };
        fetchData();
    }, []);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setPostalCode(value);

        if (value.length === 4) {
            const postalCodeData = postalCodes.find((item: { nr: string; navn: string }) => item.nr === value);
            if (postalCodeData) {
                setMessage('');
                setCity(postalCodeData.navn);
            } else {
                setMessage('Postal code is not valid')
                setCity('');
            }
        }
    };
    

return(
<div style={{ display: 'flex', justifyContent: 'space-between' }}>   
        <input
            type="text"
            name="postalCode"
            placeholder='Postal Code'
            value={postalCode}
            onChange={handleChange}
            className='small-input'
        />
        {message && <p style = {{color: 'red'}}>{message}</p>}

        <input
            type="text"
            name="City"
            placeholder="City"
            value={city}
            readOnly
            className='small-input'
            />
    </div>
);
}



export default ZipForm;



