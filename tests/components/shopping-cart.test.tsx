import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ShoppingCart } from '../../src/shopping-cart/shoppingCart'

describe('ShoppingCart', () => {
  it('should render the shopping cart', () => {
    render(<ShoppingCart />)
    expect(screen.getByText('Contact Information')).toBeDefined()
  })
})
