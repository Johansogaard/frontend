// CartContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Item } from '../../models/Item';
import apiCaller from '../../customHooks/apiCaller';

interface CartContextProps {
  items: Item[];
  handleShopQuantityComponent: (itemId: number, change: number) => void;
  removeItem: (itemId: number) => void;
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
  const { products, fetchAllProducts } = apiCaller();
  const [items, setItems] = useState<Item[]>([]);


 

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

  useEffect(() => {
    const fetchProducts = async () => {
      await fetchAllProducts();
      // Additional logic after fetching products
    };

    fetchProducts();
  }, []);
  useEffect(() => {
    if (products.length) {
      setItems(products.map(product => ({ product, quantity: 1 })));
    }
    console.log('products', products);
  }, [products]);

  return (
    <CartContext.Provider value={{ items, handleShopQuantityComponent, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};
