import React from 'react'
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
import { ProductProvider } from '../../../src/productsPage/productsPage-Context/productsContext'
import { CartProvider } from '../../../src/shopping-cart/shoppingCart-Context/cartContext'
import { useProducts } from '../../../src/productsPage/productsPage-Context/productsContext'
import { useCart } from '../../../src/shopping-cart/shoppingCart-Context/cartContext'
//import { ProductListComponent } from '../../src/productsPage/productsPage-Components/productsListComponent'
import { BrowserRouter as Router } from 'react-router-dom';


/*
// Mock apiCaller
vi.mock('../../src/customHooks/apiCaller', () => ({
    default: () => ({
      fetchAllProducts: vi.fn().mockResolvedValue([
        { id: 1, product_name: 'Plate', product_description: 'Round ceramic plate', product_price: '15.99', product_currency: 'USD', product_image_url: '/images/plate.jpg' },
        { id: 2, product_name: 'Bowl', product_description: 'Deep wooden bowl', product_price: '12.99', product_currency: 'USD', product_image_url: '/images/bowl.jpg' }
      ]),
      fetchProductsByCategory: vi.fn().mockResolvedValue([
        // specific category products
      ]),

      products: [
        { id: 1, product_name: 'Plate', product_description: 'Round ceramic plate', product_price: '15.99', product_currency: 'USD', product_image_url: '/images/plate.jpg' },
        { id: 2, product_name: 'Bowl', product_description: 'Deep wooden bowl', product_price: '12.99', product_currency: 'USD', product_image_url: '/images/bowl.jpg' }
        // This could be removed if your functions don't need direct access to products
      ]
    
    })
  }));
  */


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
              <AllProductsPage />
            </CartProvider>
          </ProductProvider>
        </Router>,
      )
    });

  
    it('renders correctly', () => {
      expect(screen.getByText('All Products')).toBeDefined();
      expect(screen.getByText('DINNERWARE')).toBeDefined();
      expect(screen.getByText('Free shipping on all orders over 129 USD')).toBeDefined();
    });

    it('renders mocked products correctly', () => {
        const plateText = screen.getByText('Round ceramic plate');
        const bowlText = screen.getByText('Deep wooden bowl');
        expect(plateText).toBeDefined();
        expect(bowlText).toBeDefined();
      });

  
      it('adds an item to the cart when Add to Cart button is pressed', async () => {
        // Assume the ProductListComponent properly renders "Add to Cart" buttons
        const addToCartButtons = screen.getAllByText('Add to cart');
        fireEvent.click(addToCartButtons[0]);
      
        // Setup the proper context for useCart
        const wrapper = ({ children }) => (
          <Router>
            <ProductProvider>
              <CartProvider>
                {children}
              </CartProvider>
            </ProductProvider>
          </Router>
        );
      
        // Use renderHook to test the useCart hook within the correct context
        const { result } = renderHook(() => useCart(), { wrapper });
      
        // Wait for any asynchronous updates to complete
        await waitFor(() => {
            // We expect one item to be added, after one click of add to cart
          expect(result.current.calcTotalItems()).toBe('1');
        });

      });


      it('adds multiple items to the cart when Add to Cart button is pressed', async () => {
        // Assume the ProductListComponent properly renders "Add to Cart" buttons
        const addToCartButtons = screen.getAllByText('Add to cart');
        fireEvent.click(addToCartButtons[0]);
        fireEvent.click(addToCartButtons[0]);
        fireEvent.click(addToCartButtons[0]);
        fireEvent.click(addToCartButtons[0]);

      
        // Setup the proper context for useCart
        const wrapper = ({ children }) => (
          <Router>
            <ProductProvider>
              <CartProvider>
                {children}
              </CartProvider>
            </ProductProvider>
          </Router>
        );
      
        const { result } = renderHook(() => useCart(), { wrapper });
        
      
        // Wait for any asynchronous updates to complete
        await waitFor(() => {
            // We expect 4 items to be added to the cart, there were already one item in the cart because of the last test
          expect(result.current.calcTotalItems()).toBe('5');
        });

      });


      // Tests for error responses using apiCaller

      




    
  });