import React, { useState } from 'react';
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
    { id: 2, name: "Banana", currency: "DKK", quantity: 3, price: 2.99, clicks: 0 },
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


    //Not sure if toFixed  with decimals is the right solution in terms of optimization, but does the job for now.
    const calculateTotal = () => {
        return items.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2);
    };

    const calculateSubTotal = () => {
        return items.reduce((total, item) =>  item.quantity * item.price, 0).toFixed(2);
    };





    //Don't know how to reference methods yet inside icons for react, but should be ideal inside an ellipse on shopping cart Icon.
    //For now placeholder of total items.
    const calculatetotalItems = () => {
        return items.reduce((total, item) => total + item.quantity, 0).toFixed(0);
    };



    return (
        <div className="shopping-cart-container">
            <div className="shopping-cart">
                <h2>Shopping Cart</h2>
                <ul id="cart-items" className="unsortList">
                    {items.map((item) => (
                        <li key={item.id}>
                            {shoppingCartItem(item, handleShopQuantityComponent)}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="subtotal">
                <h2>subTotal</h2>
                <h3>{calculateSubTotal()} DKK</h3>
                <div className="subtotal">
                    <h2>Total Items</h2>
                    <h3>{calculatetotalItems()} Number of Items total. </h3>
            </div>
            </div>
            <div className="total">
                <h2>Total</h2>
                <h3>{calculateTotal()} DKK</h3>
                <div className="total">

                </div>
            </div>
        </div>
    );
}

function shoppingCartItem(item: Item, handleShopQuantityComponent: (itemId: number, change: number) => void) {
    return (
        <section>
            <div className="divider"></div>
            <div className="item-container">
                <img src={itemPlaceholder} alt="item placeholder" className="item-image" />
                <h3>{item.name}</h3>
                <h3>{item.price} {item.currency}</h3>

                <div className="quantity-Checker">
                    <button onClick={() => handleShopQuantityComponent(item.id, -1)} style={{ marginRight: '5px' }}>-</button>
                    <span style={{ margin: '0 5px' }}>{item.quantity}</span>
                    <button onClick={() => handleShopQuantityComponent(item.id, 1)} style={{ marginLeft: '5px' }}>+</button>
                </div>
            </div>
        </section>
    );
}
