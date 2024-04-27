import { CartState, CartAction } from './cartTypes';

export const cartReducer = (state: CartState, action: CartAction): CartState => {
  const { type } = action;

  switch (type) {
    case 'CART_ADD_PRODUCT':
      const productToAdd = action.payload.product;
      const existingItemIndex = state.items.findIndex(item => item.product.product_id === productToAdd.product_id);
      if (existingItemIndex > -1) {
        // Update the quantity if the item already exists
        const newItems = [...state.items];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + 1
        };
        return {
          ...state, 
          items: newItems 

        };
      } else {
        // Add a new item if it doesn't exist
        const newItem = { product: productToAdd, quantity: 1 };
        return { 
          ...state, 
          items: [...state.items, newItem] };
      }
  case 'CART_REMOVE_PRODUCT': {
    const itemIdToRemove = action.payload.product_Id;
    const filteredItems = state.items.filter(item => item.product.product_id !== itemIdToRemove);
    return { ...state, items: filteredItems };
  }
  case 'CART_UPDATE_PRODUCT_QUANTITY': {
    const { product_Id, quantity } = action.payload;
  return {
    ...state,
    items: state.items.map(item =>
      item.product.product_id === product_Id ? { ...item, quantity: Math.max(0, item.quantity + quantity) } : item
    ).filter(item => item.quantity > 0)
  };
  }
  case 'CART_CLEAR': {
    localStorage.setItem('cartItems', JSON.stringify([]));
    return { ...state, items: [] };
  }

  default: 
    return state;
}

};