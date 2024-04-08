import React from 'react'
import { render, screen, fireEvent, renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { ShoppingCart} from '../../src/shopping-cart/shoppingCartPage'
import { CartProvider } from '../../src/shopping-cart/shoppingCart-Context/cartContext'
import { useCart } from '../../src/shopping-cart/shoppingCart-Context/cartContext'



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



  it('applies discounts correctly', () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });
    act(() => {
      // Assuming the discount applies for quantities of 5 or more
      result.current.addItem({ product_id: 1, product_name: 'Coffee Mug', product_price: 10, rebateQuantity: 5, rebatePercent: 10, product_currency: 'DKK', category_id: 12 });
      for (let i = 0; i < 4; i++) { // Adding 4 more to have a total of 5
        result.current.handleShopQuantityComponent(1, 1); 
      }
    });
    expect(result.current.calcTotalDiscount()).not.toBe('0.00');
  });

  /*
it('updates item quantity correctly', () => {
  const { result } = renderHook(() => useCart(), { wrapper: CartProvider });
  act(() => {
    result.current.addItem({ product_id: 1, product_name: 'Coffee Mug', product_price: 12.99, rebateQuantity: 5, rebatePercent: 10, product_currency: 'DKK', category_id: 12 });
    // Increase quantity by 1
    result.current.handleShopQuantityComponent(1, 1);
  });
  expect(result.current.items.find(item => item.product.product_id === 1)?.quantity).toBe(2);
});
*/

/*
  it('increases item quantity when "+" button is clicked', () => {
    const addButton = screen.getAllByText('+')[0]
    fireEvent.click(addButton)
    const quantityText = screen.getAllByText('3')[0]
    expect(quantityText).not.toBeNull()
  })

  it('decreases item quantity when "-" button is clicked', () => {
    const subtractButton = screen.getAllByText('-')[0]
    fireEvent.click(subtractButton)
    const quantityText = screen.getAllByText('1')[0]
    expect(quantityText).not.toBeNull()
  })

  it('removes an item when "remove" is clicked', () => {
    const removeButton = screen.getAllByText('remove')[0]
    fireEvent.click(removeButton)
    expect(screen.queryByText('Royal Copenhagen')).toBeNull()
  })
  /*
  it('displays the correct total price', () => {
    const total = screen.getByText(/Total/);
    expect(total).toHaveTextContent('Total 752.97 DKK'); 
  });*/
})
