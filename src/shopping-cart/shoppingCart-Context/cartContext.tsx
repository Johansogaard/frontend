// CartContext.tsx
/*
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
  remainingItemsForDiscount: (item:Item) => string;
  calcTotalItems: () => string;
  calcTotalDiscount: () => string;
  calcTotalWithDiscount: () => string;
  calcDiscountForItem: (item: Item) => string;
  
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
    let total =0;

    for (let item of items) {
     total += item.product.product_price*item.quantity;

    }

    return total.toFixed(2);

  }
  const calcTotalWithDiscount= () => {
    const totalMinusDiscount = parseFloat(calcTotal()) - parseFloat(calcTotalDiscount());
    return totalMinusDiscount.toFixed(2);
  }
  //this method returns the total amount of discount for a order
  const calcTotalDiscount = () => {
    let totalDiscount =0;

    for (let item of items) {
      if(item.product.rebateQuantity)
        {
      if(item.quantity >= item.product.rebateQuantity){
        totalDiscount += parseFloat(calcDiscountForItem(item));
      }
     
    }
  }
    return totalDiscount.toFixed(2);
  }
  //This method returns the total amount of discount for a specific item and this is the way we calculate all discounts
  //so if there is 10 % discount if you buy 5 items and the total is 100 this method returns 10 eventho you add more items you only
  //get 10% discount for 5 items which is the way we give discounts
 const calcDiscountForItem = (item: Item) => { 
    let discount = 0;
    if(item.product.rebateQuantity && item.product.rebatePercent)
      {
    discount = (item.product.product_price * item.product.rebateQuantity)/item.product.rebatePercent;
      }
    return discount.toFixed(2);
  }


  const calcTotalItems = ():string => {
    return items.reduce((total, item) => total + item.quantity, 0).toFixed(0)
  }
  //returns the number of items remainging to get a discount 
  const remainingItemsForDiscount = (item: Item):string => {
    if(item.product.rebateQuantity)
      {
    if (item.product.rebateQuantity> item.quantity) {
      return (item.product.rebateQuantity - item.quantity).toFixed(0)
    }
    else  
    {
      return '0';
    }
      }
      else
      {
        return 'no discount available';
      }
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
    <CartContext.Provider value={{ items, handleShopQuantityComponent, 
    removeItem,calcItemSubTotal,calcTotal,remainingItemsForDiscount,calcTotalItems,addItem,  
    calcTotalDiscount,
    calcTotalWithDiscount,
    calcDiscountForItem}}>
      {children}
    </CartContext.Provider>
  );
};
*/