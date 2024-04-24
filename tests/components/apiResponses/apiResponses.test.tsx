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
import { rest } from 'msw';
import { setupServer } from 'msw/node';




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

  // Setup API mocking
const server = setupServer(
    rest.get('https://dtu62597.eduhost.dk:10132/products', (req, res, ctx) => {
      return res(ctx.json([
        { id: 1, product_name: 'Plate', product_description: 'Round ceramic plate', product_price: '15.99', product_currency: 'USD', product_image_url: '/images/plate.jpg' },
        { id: 2, product_name: 'Bowl', product_description: 'Deep wooden bowl', product_price: '12.99', product_currency: 'USD', product_image_url: '/images/bowl.jpg' }
      ]));
    }),
    rest.get('https://dtu62597.eduhost.dk:10132/products/*', (req, res, ctx) => {
      const category = req.url.pathname.split('/').pop();
      if (category === 'DINNERWARE') {
        return res(ctx.json([{ id: 3, product_name: 'Cup', product_description: 'Sturdy ceramic cup', product_price: '5.99', product_currency: 'USD', product_image_url: '/images/cup.jpg' }]));
      }
      return res(ctx.status(404), ctx.json({ message: 'Category not found' }));
    })
  );
  
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());


  describe('apiCaller', () => {
    it('successfully fetches all products', async () => {
      const { fetchAllProducts, products } = apiCaller();
      await act(async () => {
        await fetchAllProducts();
      });
      expect(products.length).toBe(2);
      expect(products[0].product_name).toBe('Plate');
    });


    beforeEach(() => {
        vi.restoreAllMocks();  // Reset mocks before each test
      });

  
    it('handles network errors during fetch all products', async () => {
      server.use(
        rest.get('https://dtu62597.eduhost.dk:10132/products', (req, res, ctx) => {
          return res(ctx.status(500));
        })
      );
      const { fetchAllProducts, error } = apiCaller();
      await act(async () => {
        await fetchAllProducts();
      });
      expect(error).toBe('Could not fetch products.');
    });

    
    beforeEach(() => {
        vi.restoreAllMocks();  // Reset mocks before each test
      });

  
    it('fetches products by category', async () => {
      const { fetchProductsByCategory, products } = apiCaller();
      await act(async () => {
        await fetchProductsByCategory('DINNERWARE');
      });
      expect(products.length).toBe(1);
      expect(products[0].product_name).toBe('Cup');
    });


    beforeEach(() => {
        vi.restoreAllMocks();  // Reset mocks before each test
      });

  
    it('handles fetching non-existent category', async () => {
      const { fetchProductsByCategory, error } = apiCaller();
      await act(async () => {
        await fetchProductsByCategory('UNKNOWN_CATEGORY');
      });
      expect(error).toBe('Category not found');
    });
  });