import React, { useContext, useEffect } from 'react';
import apiCaller from '../../../src/customHooks/apiCaller';  // Adjust the path as necessary
import {
  render,
  screen,
  fireEvent,
  renderHook,
  act,
  waitFor
} from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { Category } from '../../../src/models/Category';
import { CheckoutPage } from '../../../src/checkoutPage/checkoutPage.tsx';
import { AllProductsPage } from '../../../src/productsPage/AllProductsPage'
import { ProductContext, ProductProvider } from '../../../src/state/productlistState/productContext'
import { productReducer } from '../../../src/state/productlistState/productReducer'
import { formsManager } from '../../../src/checkoutPage/checkoutPage-Hooks/formsManager';
import { CartProvider } from '../../../src/state/cartState/cartContext'

//import { ProductListComponent } from '../../src/productsPage/productsPage-Components/productsListComponent'
import { BrowserRouter as Router } from 'react-router-dom';



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
  



// Test setup
describe('AllProductsPage', () => {
    beforeEach(() => {
    
        
        
      render(
        <Router>
          <ProductProvider>
            <CartProvider>
              <CheckoutPage />
            </CartProvider>
          </ProductProvider>
        </Router>,
      )
    });



  it('renders correctly', () => {
    expect(screen.getByText('Customer information')).toBeDefined();
    expect(screen.getByText('Go to payment')).toBeDefined();
  });
  
});




//Forms testing

it('should initialize with default values', () => {
    const { result } = renderHook(() => formsManager());

    expect(result.current.email).toBe('');
    expect(result.current.isEmailValid).toBe(false);
    expect(result.current.phoneNumber).toBe('');
    expect(result.current.isPhoneNumberValid).toBe(false);
    expect(result.current.vatNumber).toBe('');
    expect(result.current.isVatNumberValid).toBe(false);
  });



  it('validates email correctly', () => {
    const { result } = renderHook(() => formsManager());

    act(() => {
      result.current.setEmail('test@example.com');
    });

    expect(result.current.email).toBe('test@example.com');
    expect(result.current.isEmailValid).toBe(true);

    act(() => {
      result.current.setEmail('test@');
    });

    expect(result.current.isEmailValid).toBe(false);
  });



  it('validates phone number correctly', () => {
    const { result } = renderHook(() => formsManager());

    act(() => {
      result.current.setPhoneNumber('12345678');
    });

    expect(result.current.phoneNumber).toBe('12345678');
    expect(result.current.isPhoneNumberValid).toBe(true);

    act(() => {
      result.current.setPhoneNumber('1234');
    });

    expect(result.current.isPhoneNumberValid).toBe(false);

    act(() => {
        result.current.setPhoneNumber('123A4a');
      });

    expect(result.current.isPhoneNumberValid).toBe(false);
    
});



  it('validates VAT number correctly', () => {
    const { result } = renderHook(() => formsManager());

    act(() => {
      result.current.setVatNumber('87654321');
    });

    expect(result.current.vatNumber).toBe('87654321');
    expect(result.current.isVatNumberValid).toBe(true);

    act(() => {
      result.current.setVatNumber('ABC12345');
    });

    expect(result.current.isVatNumberValid).toBe(false);
  });


