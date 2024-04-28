import { useState, useEffect, useContext } from 'react';
 import { Receipt } from '../../models/Receipt';
import './confirmationPage.css'
import { CartContext } from '../../state/cartState/cartContext';

import { CheckoutMenuBar } from "../checkoutMenuBar/checkoutMenuBar";
import { Topbar } from '../../topbar/topBar'


export function ConfirmationPage() {
  const {dispatch } = useContext(CartContext);

  const [success, setSucces] = useState(false);
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(String);
  // Get the Checkout Session ID from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get('session_id');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!sessionId) {
        setError('Session ID is null');
        return;
      }
      try {
        setLoading(true); 
        setError(''); 

        const receipt = await callSuccess(sessionId);
        setReceipt(receipt); // Set the order details received from the response
        dispatch({ type: 'CART_CLEAR' }); // Clear the cart after successfully fetching order details
      } catch (err) {
        console.error(err);
        setError( 'Failed to fetch order details'); // Set the error state
      } finally {
        setLoading(false); // Stop loading whether there was an error or not
   
      }
    };

    if (sessionId) {
      fetchOrderDetails();
    }

    // Clean-up function to avoid setting state after the component has unmounted
    return () => {
      setLoading(false); // Cleanup loading state
      setError(''); // Cleanup error state
    };
  }, [sessionId, dispatch]);
    

    

  return (
    <>
      <Topbar />
      <CheckoutMenuBar step={3} />                    
      <h1>Thanks for your order!</h1>
      {receipt && (
        <div className='receipt_Container'>
          <h2>Receipt</h2>
          <p>Shipping Address: {receipt.shipping_address}</p>
          <p>Billing Address: {receipt.billing_address}</p>
          <p>Total Amount: {receipt.total_amount}</p>
          {receipt.items.map((item) => receiptItem(item.product.product_name, item.quantity.toString()))}
          {/* Display the order details */}

          {/* Add more fields as necessary */}
        </div>
      )}
    </>
  );
}

function receiptItem(name:String, quantity:String ) {
  return (
    <div>
      <p>Name: {name}</p>
      <p>Quantity: {quantity}</p>
    </div>
  );
};

async function callSuccess(sessionId: string): Promise<Receipt> {

  //const { state: userState,dispatch: userDispatch } = useContext(UserContext);
  try{
    //https://localhost:443/payments/success?session_id='+sessionId
    //https://dtu62597.eduhost.dk:10132/payments/success?session_id='+sessionId
    const response = await fetch('https://localhost:443/payments/success?session_id='+sessionId);
    if (!response.ok) 
      {throw new Error('Could not call success.');}
    const data = await response.json();
    console.log(data);

    
    const receipt: Receipt = {
      shipping_address: data.shipping_address,
      billing_address: data.billing_address,
      total_amount: data.total_amount,
      items: data.items,
    }
  
    return receipt;
       //userDispatch({type: 'SET_USER_STATE' , payload: {data.}})
         
  
  }

  catch (err:unknown) {
    throw new Error("failed to call success")
  }
  
}

async function getProductsFromRecipt(itemId: string[]) {
  

}
