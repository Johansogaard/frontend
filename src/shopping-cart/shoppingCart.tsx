import React, { useState} from 'react';
import './shoppingCart.css';
import itemPlaceholder from '../assets/placeholderItem.svg';

interface Item {
    id: number;
    name: string;
    currency: string;
    quantity: number;
    price: number;
  }
  // Sample items just for demonstration
const initialItems: Item[] = [
    { id: 1, name: "Royal Copenhagen",currency: "DKK", quantity: 2, price: 1.99 },
    { id: 2, name: "Banana", currency: "DKK",quantity: 3, price: 2.99 },
    // Add more items as needed
  ];


export function ShoppingCart() {
    const [items, setItems] = useState<Item[]>(initialItems);

    return (
        <div className="shopping-cart-container">

            <div className="shopping-cart">
            <h2>Shopping Cart</h2>
            <ul id="cart-items" className="no-list-style">
            {items.map((item) => (
            <li key={item.id}>
                {shoppingCartItem(item)}
                </li>
          ))}
             </ul>

            </div>
            <div className="subtotal">
            <h2>Subtotal</h2>


            </div>
        </div>
    );
}
function subtotalItems(items: Item) {
    
}
function shoppingCartItem(item: Item){
    return(
       <section>
             <div className = "divider"></div>
        <div className = "item-container">
        <img src={itemPlaceholder} alt="item placeholder" className="item-image" />
        <h3>{item.name}</h3>
        <h3>{item.price} {item.currency}</h3>
        </div>
        </section>
    );
}