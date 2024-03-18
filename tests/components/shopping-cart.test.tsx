import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { ShoppingCart} from '../../src/shopping-cart/shoppingCartPage'
import { CartProvider } from '../../src/shopping-cart/shoppingCart-Context/cartContext'

vi.mock('../assets/placeholderItem.svg', () => {})

describe('ShoppingCart', () => {
  beforeEach(() => {
    render(<CartProvider><ShoppingCart /></CartProvider>)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })
  it('renders the contact information section', () => {
    expect(screen.getByText('Contact Information')).not.toBeNull()
  })

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
