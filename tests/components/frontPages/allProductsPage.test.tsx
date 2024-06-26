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
import { AllProductsPage } from '../../../src/productsPage/AllProductsPage'
import { ProductContext, ProductProvider } from '../../../src/state/productlistState/productContext'

import { CartProvider } from '../../../src/state/cartState/cartContext'

//import { ProductListComponent } from '../../src/productsPage/productsPage-Components/productsListComponent'
import { BrowserRouter as Router } from 'react-router-dom';




  vi.mock('../../../src/customHooks/apiCaller', () => ({
    default: () => {
        
      const products = [
        { id: 1, product_name: 'Plate', product_description: 'Round ceramic plate', product_price: '15.99', product_currency: 'USD', product_image_url: '/images/plate.jpg' },
        { id: 2, product_name: 'Bowl', product_description: 'Deep wooden bowl', product_price: '12.99', product_currency: 'USD', product_image_url: '/images/bowl.jpg' },
        { id: 3, product_name: 'Bowl1', product_description: 'Deep wooden bowl2', product_price: '12.99', product_currency: 'USD', product_image_url: '/images/bowl.jpg' },
        { id: 4, product_name: 'Bowl2', product_description: 'Deep wooden bowl3', product_price: '12.99', product_currency: 'USD', product_image_url: '/images/bowl.jpg' },

      ];
      
  
      return {
        products,
        isLoading: false,
        error: null,
        fetchAllProducts: vi.fn().mockResolvedValue(products),
        fetchProductsByCategory: vi.fn().mockResolvedValue(products),
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
              <AllProductsPage />
            </CartProvider>
          </ProductProvider>
        </Router>,
      )
    });

  
   


    it('renders correctly', () => {
      expect(screen.getByText('All Products')).toBeDefined();
      expect(screen.getByText('DINNERWARE')).toBeDefined();
      expect(screen.getByText('Free shipping on all orders today!')).toBeDefined();
    });

    
  });