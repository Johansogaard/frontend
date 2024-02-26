import  { useState } from 'react';
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
    //Not sure if toFixed  with decimals is the right solution in terms of optimization, but does the job for now.
    const calcTotal = () => {
        return items.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2);
    };

   /* const calcSubTotal = () => {
        return items.reduce((total, item) =>  item.quantity * item.price, 0).toFixed(2);
    };*/

    const removeItem = (itemId: number) => {
        setItems(items.filter(item => item.id !== itemId));
      };
      
    const calcItemSubTotal = (item: Item) => {
        return (item.quantity * item.price).toFixed(2);
    };
  
    //Don't know how to reference methods yet inside icons for react, but should be ideal inside an ellipse on shopping cart Icon.
    //For now placeholder of total items.
    const calctotalItems = () => {
        return items.reduce((total, item) => total + item.quantity, 0).toFixed(0);
    };

    return (
        <div className="shopping-cart-container">
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
                        <h3>{item.name} Subtotal: {calcItemSubTotal(item)} DKK</h3>
                    </div>

                    //This aligns the subtotal with the item.id and it's row
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

