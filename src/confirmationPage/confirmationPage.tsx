<<<<<<< HEAD
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useFormManager } from '../checkoutPage/checkoutPage-Components/FormsManagerContext'
=======
import { useState, useEffect } from 'react';


>>>>>>> development
import { Menubar } from '../menubar/menubar'
import { Topbar } from '../topbar/topBar'


export function ConfirmationPage() {
<<<<<<< HEAD
  const [orderDetails, setOrderDetails] = useState(null)
=======
  const [orderDetails] = useState(null);
>>>>>>> development

  // Get the Checkout Session ID from the URL
  const urlParams = new URLSearchParams(window.location.search)
  const sessionId = urlParams.get('session_id')

  useEffect(() => {
<<<<<<< HEAD
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
=======
    console.log('id: '+ sessionId )
    callSucces();}, [sessionId]);
    
>>>>>>> development

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
<<<<<<< HEAD
  )
=======
  );
}
async function callSucces() {
  console.log('INSIDE')
  try{
    const url = new URL(window.location.href);
    const sessionId = url.searchParams.get('session_id');
    console.log('session id '+sessionId);
    //https://localhost:443/payments/success?session_id='+sessionId
    const response = await fetch('https://dtu62597.eduhost.dk:10132/payments/success?session_id='+sessionId);
    if (!response.ok) throw new Error('Could not call success.');

  }
  catch (err:unknown) {
    throw new Error("failed to call success")
  }
  
>>>>>>> development
}
