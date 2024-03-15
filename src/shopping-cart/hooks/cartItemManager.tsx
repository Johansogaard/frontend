import {useState} from 'react';
import apiCaller from '../../customHooks/apiCaller';

import { Product } from '../../models/Product';

export interface Item {

   product: Product;
   quantity: number;
}

// Sample items

export function CartItemManager() {
    const { products, fetchAllProducts } = apiCaller();
    const [items, setItems] = useState<Item[]>([]);


    const initTestItems = async () => {
        
        await fetchAllProducts();
        
        if (products.length) {
            setItems(products.map(product => ({
              product,
              quantity: 1,
            })));
          }
    };
   
    const handleShopQuantityComponent = (itemId: number, change: number) => {
        setItems((previousItems) =>
          previousItems.map((item) =>
            item.product.product_id === itemId
              ? { ...item, quantity: Math.max(0, item.quantity + change) }
              : item,
          ).filter((item) => item.quantity > 0),
        )
      }
    
      const remainingItemsForDiscount = (itemId: number) => {
        const item = items.find((item) => item.product.product_id === itemId)
        if (item?.product?.rebateQuantity && item.quantity < item.product.rebateQuantity) {
          return `Buy only ${item.product.rebateQuantity - item.quantity} more ${item.product.product_name} to get a 20% discount!`
        } // if you got enough items for that item, it's applied. (Visual text change)
        return '20% Discount Applied!'
      }


      const removeItem = (itemId: number) => {
        setItems(items.filter((item) => item.product.product_id !== itemId))
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

      const calcItemSubTotalWithDiscount = (item: Item) => {
        const discountprice = item.quantity >= 5 ? item.product.product_price * 0.8 : item.product.product_price
        //20%  math calc discount HERE!!
        return (item.quantity * discountprice).toFixed(2)
      }
      const calcItemSubTotal = (itemId: number) => {
        const item = items.find((item) => item.product.product_id === itemId)
        if (item) {
          return calcItemSubTotalWithDiscount(item)
        }
        }

return { items, initTestItems, handleShopQuantityComponent,remainingItemsForDiscount,calcTotal,removeItem,calcItemSubTotal};
};