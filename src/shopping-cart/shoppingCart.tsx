import React, { useState } from 'react';
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
  { id: 1, name: "Royal Copenhagen", currency: "DKK", quantity: 2, price: 1.99 },
  { id: 2, name: "Banana", currency: "DKK", quantity: 3, price: 2.99 },
  // Add more items as needed
];


export function ShoppingCart() {
  const [items, setItems] = useState<Item[]>(initialItems);

  const handleQuantityChange = (itemId: number, delta: number) => {
    setItems(items.map(item =>
      item.id === itemId ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
    ));
  };



  // Calculate subtotal
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="shopping-cart-container">
      <div className="shopping-cart">
        <h2>Shopping Cart</h2>
        <ul id="cart-items" className="no-list-style">
          {items.map((item) => (
            <li key={item.id}>
              {shoppingCartItem(item, handleQuantityChange)}
            </li>
          ))}
        </ul>
      </div>
      <div className="subtotal">
        <h2>Subtotal</h2>
        <p>{subtotal.toFixed(2)} DKK</p>
      </div>
    </div>
  );
}


function shoppingCartItem(item: Item, onQuantityChange: (itemId: number, delta: number) => void) {
  return (
    <section>
      <div className="divider"></div>
      <div className="item-container">
        <img src={itemPlaceholder} alt="item placeholder" className="item-image" />
        <div className="item-details">
          <h3>{item.name}</h3>
          <h3>{item.price} {item.currency}</h3>
        </div>
        <div className="quantity-selector">
          <button onClick={() => onQuantityChange(item.id, -1)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => onQuantityChange(item.id, 1)}>+</button>
        </div>
      </div>
    </section>
  );
}

