import { useState, useEffect, useContext } from 'react';
 import { Receipt } from '../../models/Receipt';
import './confirmationPage.css'
import { CartContext } from '../../state/cartState/cartContext';

import { CheckoutMenuBar } from "../checkoutMenuBar/checkoutMenuBar";
import { Topbar } from '../../topbar/topBar'
import { Item } from '../../models/Item';


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
        setReceipt(receipt); 
        dispatch({ type: 'CART_CLEAR' }); 
      } catch (err) {
        console.error(err);
        setError( 'Failed to fetch order details');
      } finally {
        setLoading(false); 
   
      }
    };

    if (sessionId) {
      fetchOrderDetails();
    }

   
    return () => {
      setLoading(false); 
      setError(''); 
    };
  }, [sessionId, dispatch]);
    

    const itemList = receipt?.items.map((item, index) => (
      <ReceiptItem key={index} {...item} />
    ));

  return (
    
    <>
      <Topbar />
      <CheckoutMenuBar step={3} />                    
      <h1>Thanks for your order!</h1>
      {receipt && (
        <div className='receipt_Container'>
          <h2>Receipt</h2>
          <h3>Order ID: #{receipt.order_id}</h3>
          <p>Shipping Address: {receipt.shipping_address}</p>
          <p>Billing Address: {receipt.billing_address}</p>
          
          {itemList}
          <p className='receipt_total'>Total Amount: {receipt.total_amount}</p>
        </div>
      )}
    </>
  );
}

function ReceiptItem(item: Item) {
  const calcDiscountForItem = (item: Item) => { 
    let discount = 0;
    if(item.product.rebateQuantity && item.product.rebatePercent)
      {
    discount = (item.product.product_price * item.product.rebateQuantity)/item.product.rebatePercent;
      }
    return discount.toFixed(2);
  }
  return (
    <div className='receiptItem_Container'>
      <div className='receiptItem_Container_firstline'>
      <p className='receiptItem_Item'>Item: {item.product.product_name}</p>
      <p className='receiptItem_Quan'>Quantity: {item.quantity} X {item.product.product_price}</p>
      </div>
      {item.product.rebateQuantity && item.product.rebateQuantity <= item.quantity ? (
  <p className='receiptItem_discount'>Discount: -{calcDiscountForItem(item)}</p>
) : null}
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
      order_id: data.orderId,
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


