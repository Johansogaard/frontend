import React from 'react'
import {
  render,
  screen,
  fireEvent,
  renderHook,
  act,
} from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { ShoppingCart } from '../../../src/shopping-cart/shoppingCartPage'
import { CartProvider } from '../../../src/state/cartState/cartContext'
import { cartReducer } from '../../../src/state/cartState/cartReducer'
import { ItemListComponent } from '../../../src/shopping-cart/shoppingCart-Components/ItemlistComponent'
import { BrowserRouter as Router } from 'react-router-dom';


vi.mock('../assets/placeholderItem.svg', () => {})

vi.mock('../../../src/customHooks/apiCaller', () => ({
  default: () => {
      
    const products = [
      { id: 1, product_name: 'Plate', product_description: 'Round ceramic plate', product_price: '15.99', product_currency: 'USD', product_image_url: '/images/plate.jpg' },
      { id: 2, product_name: 'Bowl', product_description: 'Deep wooden bowl', product_price: '12.99', product_currency: 'USD', product_image_url: '/images/bowl.jpg' }
    ];

    return {
      products,
      isLoading: false,
      error: null,
      fetchAllProducts: vi.fn().mockResolvedValue(products),
      fetchProductsByCategory: vi.fn().mockResolvedValue(products)
    };
    
  }
}));

describe('ShoppingCart', () => {
  beforeEach(() => {
    render(
      <Router>
        <CartProvider>
        <ShoppingCart />
      </CartProvider>,
      </Router>
    )
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })
  it('renders the correct cart information', () => {
    expect(screen.getByText('Go to checkout')).not.toBeNull()
    expect(screen.getAllByText('Continue shopping')).toBeDefined()
    expect(screen.getAllByText('Cart is empty')).toBeDefined
    expect(screen.getByText('Discount')).toBeDefined

  })




})
