import React from 'react';
import { render, screen } from '@testing-library/react';
import { UserPage } from '../../../src/userPage/userPage'; // Adjust the path as necessary
import { UserProvider } from '../../../src/state/userState/userContext';
import { BrowserRouter as Router } from 'react-router-dom';
import { vi } from 'vitest';
import { ProductContext, ProductProvider } from '../../../src/state/productlistState/productContext'
import { CartProvider } from '../../../src/state/cartState/cartContext'




describe('UserPage', () => {
    React
    beforeEach(() => {
      render(
      <Router>
        <ProductProvider>
          <UserProvider>
        <CartProvider>
        <UserPage />
        </CartProvider>             
          </UserProvider>
        </ProductProvider>
      </Router>
      
    )});


  it('renders login form by default', () => {

    

    expect(screen.getByLabelText('Email')).toBeDefined();
    expect(screen.getByLabelText('Password')).toBeDefined();
    expect(screen.getByRole('button', { name: 'Login' })).toBeDefined();
  });


  // You can write more tests for handling form submissions, error messages, etc.
});
