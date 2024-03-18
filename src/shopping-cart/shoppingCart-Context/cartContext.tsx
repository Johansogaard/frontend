// CartContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Item } from '../../models/Item';

import { Product } from '../../models/Product';

interface CartContextProps {
  items: Item[];
  handleShopQuantityComponent: (itemId: number, change: number) => void;
  addItem: (product: Product) => void;
  removeItem: (itemId: number) => void;
  calcItemSubTotal: (itemId: number) => string;
  calcTotal: () => string;
  remainingItemsForDiscount: (itemId: number) => string;
  calcTotalItems: () => string;
  
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<Item[]>(() => {
    // Load cart items from localStorage or initialize to an empty array
    const savedItems = localStorage.getItem('cartItems');
    return savedItems ? JSON.parse(savedItems) : [];
  });

// Function to add items to the cart
const addItem = (product: Product) => {
  setItems((prevItems) => {
    const itemIndex = prevItems.findIndex(item => item.product.product_id === product.product_id);
    if (itemIndex > -1) {
      // If the item already exists, update the quantity
      const newItems = [...prevItems];
      newItems[itemIndex] = { ...newItems[itemIndex], quantity: newItems[itemIndex].quantity + 1 };
      return newItems;
    } else {
      // If the product is new, create a new item with the product and a quantity of 1
      const newItem = { product: product, quantity: 1 };
      return [...prevItems, newItem];
    }
  });
};
 

  const handleShopQuantityComponent = (itemId: number, change: number) => {
    console.log('itemId to handle', itemId);
    setItems((prevItems) =>
      prevItems.map(item =>
        item.product.product_id === itemId ? { ...item, quantity: Math.max(0, item.quantity + change) } : item,
      ).filter(item => item.quantity > 0),
    );
  };

  const removeItem = (itemId: number) => {
    setItems(prevItems => prevItems.filter(item => item.product.product_id !== itemId));
  };

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

  const calcTotalItems = ():string => {
    return items.reduce((total, item) => total + item.quantity, 0).toFixed(0)
  }
  const remainingItemsForDiscount = (itemId: number):string => {
    const item = items.find((item) => item.product.product_id === itemId)
    if (item?.product?.rebateQuantity && item.quantity < item.product.rebateQuantity) {
      return `Buy only ${item.product.rebateQuantity - item.quantity} more ${item.product.product_name} to get a 20% discount!`
    } // if you got enough items for that item, it's applied. (Visual text change)
    return '20% Discount Applied!'
  }
  const calcItemSubTotalWithDiscount = (item: Item):string => {
    const discountprice = item.quantity >= 5 ? item.product.product_price * 0.8 : item.product.product_price
    //20%  math calc discount HERE!!
    return (item.quantity * discountprice).toFixed(2)
  }
  const calcItemSubTotal = (itemId: number) => {
    const item = items.find((item) => item.product.product_id === itemId)
    if (item) {
      return calcItemSubTotalWithDiscount(item)
    }
    return '0.00';
    }

  
  // Update localStorage when items change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(items));
  }, [items]);



  return (
    <CartContext.Provider value={{ items, handleShopQuantityComponent, removeItem,calcItemSubTotal,calcTotal,remainingItemsForDiscount,calcTotalItems,addItem}}>
      {children}
    </CartContext.Provider>
  );
};
