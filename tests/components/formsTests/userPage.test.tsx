import React from 'react';
import { render, screen } from '@testing-library/react';
import { UserPage } from '../../../src/userPage/userPage'; // Adjust the path as necessary
import { UserProvider } from '../../../src/state/userState/userContext';
import { BrowserRouter as Router } from 'react-router-dom';
//import { ProductContext, ProductProvider } from '../../../src/state/productlistState/productContext'
//import { CartProvider } from '../../../src/state/cartState/cartContext'


// Mock for react-helmet-async
jest.mock('react-helmet-async', () => ({
    Helmet: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    HelmetProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>
  }));


describe('userPage', () => {
    React
    
  it('renders login form by default', () => {
    render(
    <Router>
        <UserProvider>
      
              <UserPage />
           
        </UserProvider>
    </Router>
    
    );

    expect(screen.getByLabelText('Email')).toBeDefined();
    expect(screen.getByLabelText('Password')).toBeDefined();
    expect(screen.getByRole('button', { name: 'Login' })).toBeDefined();
  });


  // You can write more tests for handling form submissions, error messages, etc.
});
