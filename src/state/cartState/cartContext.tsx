// CartContext.tsx
import { createContext, useReducer, Dispatch, ReactNode, useEffect } from 'react';
import { Item } from '../../models/Item';
import { CartState, CartAction } from './cartTypes';
import { cartReducer } from './cartReducer';

const initialState: CartState = {
  items: [],

};
const init = (initialState: CartState) => {
  const savedItems = localStorage.getItem('cartItems');
  return {
    ...initialState,
    items: savedItems ? JSON.parse(savedItems) : []
  };
};
interface CartProviderProps {
  children: ReactNode;
}
export const CartContext = createContext<{
  state: CartState;
  dispatch: Dispatch<CartAction>;
  calcItemSubTotal: (itemId: number) => string;
  calcTotal: () => string;
  remainingItemsForDiscount: (item: Item) => string;
  calcTotalItems: () => string;
  calcTotalDiscount: () => string;
  calcTotalWithDiscount: () => string;
  calcDiscountForItem: (item: Item) => string;
}>({
  state: initialState,
  dispatch: () => null, // Placeholder function
  calcItemSubTotal: () => '0.00',
  calcTotal: () => '0.00',
  remainingItemsForDiscount: () => 'no discount available',
  calcTotalItems: () => '0',
  calcTotalDiscount: () => '0.00',
  calcTotalWithDiscount: () => '0.00',
  calcDiscountForItem: () => '0.00'

});


export const CartProvider = ({ children }: CartProviderProps) => {
  const [state, dispatch] = useReducer(cartReducer, initialState, init);

  // Update localStorage when items change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(state.items));
  }, [state.items]);


  const calcTotal = () => {
    let total = 0;

    for (let item of state.items) {
      total += item.product.product_price * item.quantity;

    }

    return total.toFixed(2);

  }
  const calcTotalWithDiscount = () => {
    const totalMinusDiscount = parseFloat(calcTotal()) - parseFloat(calcTotalDiscount());
    return totalMinusDiscount.toFixed(2);
  }
  //this method returns the total amount of discount for a order
  const calcTotalDiscount = () => {
    let totalDiscount = 0;

    for (let item of state.items) {
      if (item.product.rebateQuantity) {
        if (item.quantity >= item.product.rebateQuantity) {
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
    if (item.product.rebateQuantity && item.product.rebatePercent) {
      discount = (item.product.product_price * item.product.rebateQuantity) / item.product.rebatePercent;
    }
    return discount.toFixed(2);
  }


  const calcTotalItems = (): string => {
    return state.items.reduce((total, item) => total + item.quantity, 0).toFixed(0)
  }
  //returns the number of items remainging to get a discount 
  const remainingItemsForDiscount = (item: Item): string => {
    if (item.product.rebateQuantity) {
      if (item.product.rebateQuantity > item.quantity) {
        return (item.product.rebateQuantity - item.quantity).toFixed(0)
      }
      else {
        return '0';
      }
    }
    else {
      return 'no discount available';
    }
  }
  const calcItemSubTotalWithDiscount = (item: Item): string => {
    const discountprice = item.quantity >= 5 ? item.product.product_price * 0.8 : item.product.product_price
    //20%  math calc discount HERE!!
    return (item.quantity * discountprice).toFixed(2)
  }
  const calcItemSubTotal = (itemId: number) => {
    const item = state.items.find((item) => item.product.product_id === itemId)
    if (item) {
      return calcItemSubTotalWithDiscount(item)
    }
    return '0.00';
  }






  return (
    <CartContext.Provider value={{
      state, dispatch, calcItemSubTotal, calcTotal, remainingItemsForDiscount, calcTotalItems,
      calcTotalDiscount,
      calcTotalWithDiscount,
      calcDiscountForItem
    }}>
      {children}
    </CartContext.Provider>
  );
};
