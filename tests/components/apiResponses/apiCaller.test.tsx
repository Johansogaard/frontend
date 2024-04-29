import React from 'react';
import apiCaller from '../../../src/customHooks/apiCaller';  // Adjust the path as necessary
import {
  render,
  renderHook,
  act,
  waitFor,
  screen
} from '@testing-library/react'
import { AllProductsPage } from '../../../src/productsPage/AllProductsPage'
import { ProductProvider } from '../../../src/state/productlistState/productContext'
import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from '../../../src/state/cartState/cartContext'



// Mock fetch globally
//global.fetch = jest.fn();

jest.mock('../../../src/customHooks/apiCaller', () => ({
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
        fetchAllProducts: jest.fn().mockResolvedValue(products),
        fetchProductsByCategory: jest.fn().mockResolvedValue(products),
      };
    }
  }));
  
/*
beforeEach(() => {
  jest.resetAllMocks();
});
*/

describe('AllProductsPage', () => {
    beforeEach(() => {
       React
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

    it('should fetch all products and update state correctly', async () => {
        const products = [
            { id: 1, product_name: 'Plate', product_description: 'Round ceramic plate', product_price: '15.99', product_currency: 'USD', product_image_url: '/images/plate.jpg' },
            { id: 2, product_name: 'Bowl', product_description: 'Deep wooden bowl', product_price: '12.99', product_currency: 'USD', product_image_url: '/images/bowl.jpg' },
            { id: 3, product_name: 'Bowl1', product_description: 'Deep wooden bowl2', product_price: '12.99', product_currency: 'USD', product_image_url: '/images/bowl.jpg' },
            { id: 4, product_name: 'Bowl2', product_description: 'Deep wooden bowl3', product_price: '12.99', product_currency: 'USD', product_image_url: '/images/bowl.jpg' },
    
          ];
      
        const { result } = renderHook(() => apiCaller());
      
        act(() => {
          result.current.fetchAllProducts();
        });
      
        await new Promise(resolve => setTimeout(resolve, 500));

        expect(result.current.products).toEqual(products);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBeNull();
      });
      
      it('products are displayed after fetching', async () => {
        render(
            <Router>
                <ProductProvider>
                    <CartProvider>
                        <AllProductsPage />
                    </CartProvider>
                </ProductProvider>
            </Router>
        );

        // Wait for the component to finish all asynchronous operations
        await waitFor(() => {
            // Check for product display elements
            const productDisplays = screen.getAllByText(/Plate|Bowl/); // Adjust text match according to what's rendered
            expect(productDisplays.length).toBeGreaterThan(0);
        });
    });
  
      
   

    
    
    


      // Tests for error responses using apiCaller

    
  });


