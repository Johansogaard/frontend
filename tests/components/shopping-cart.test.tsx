import React from 'react'
import { render, screen, fireEvent, renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { ShoppingCart} from '../../src/shopping-cart/shoppingCartPage'
import { CartProvider } from '../../src/shopping-cart/shoppingCart-Context/cartContext'
import { useCart } from '../../src/shopping-cart/shoppingCart-Context/cartContext'
import { ItemListComponent } from '../../src/shopping-cart/shoppingCart-Components/ItemlistComponent'



vi.mock('../assets/placeholderItem.svg', () => {})

describe('ShoppingCart', () => {
  beforeEach(() => {
    render(<CartProvider><ShoppingCart /></CartProvider>)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })
  it('renders the contact information section', () => {
    expect(screen.getByText('Go to checkout')).not.toBeNull()
  })

  it('adds an item to the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });
    act(() => {
      result.current.addItem({ product_id: 1, 
        product_name: 'Coffee Mug', 
        product_price: 12.99, 
        rebateQuantity: 5, 
        rebatePercent: 10,
        product_currency: 'USD',
        category_id: 123 });
    });
    expect(result.current.items.length).toBe(1);
    expect(result.current.calcTotalItems()).toBe('1');
  });



  it('removes an item from the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });
    act(() => {
      result.current.addItem({ product_id: 1, 
        product_name: 'Coffee Mug', 
        product_price: 12.99, 
        rebateQuantity: 5, 
        rebatePercent: 10,
        product_currency: 'USD',
        category_id: 123 });
        result.current.removeItem(1);
    });
    expect(result.current.items.length).toBe(0);
  });


  it('calculates the total price correctly', () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });
    act(() => {
      result.current.addItem({ product_id: 1, product_name: 'Coffee Mug', product_price: 10, rebateQuantity: 5, rebatePercent: 10, product_currency: 'DKK', category_id: 12 });
      result.current.addItem({ product_id: 2, product_name: 'Tea Cup', product_price: 15, rebateQuantity: 3, rebatePercent: 15, product_currency: 'DKK', category_id: 13 });
    });
    expect(result.current.calcTotal()).toBe('25.00');
  });



  
})
