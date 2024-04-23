import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useFormManager } from '../checkoutPage/checkoutPage-Components/FormsManagerContext'
import { Menubar } from '../menubar/menubar'
import { Topbar } from '../topbar/topBar'

export function ConfirmationPage() {
  const [orderDetails, setOrderDetails] = useState(null)

  // Get the Checkout Session ID from the URL
  const urlParams = new URLSearchParams(window.location.search)
  const sessionId = urlParams.get('session_id')

  useEffect(() => {
    if (sessionId) {
      // Fetch the Checkout Session from your backend
      fetch(`/payments/success?session_id=${sessionId}`)
        .then((response) => response.json())
        .then((data) => {
          // Store the order details in state
          setOrderDetails(data)
        })
    }
  }, [sessionId])

  return (
    <>
      <Topbar />
      <Menubar />
      <h1>Thanks for your order!</h1>
      {orderDetails && (
        <div>
          <h2>Order Details:</h2>
          {/* Display the order details */}

          {/* Add more fields as necessary */}
        </div>
      )}
    </>
  )
}
