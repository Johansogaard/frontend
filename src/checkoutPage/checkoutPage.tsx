import { FormComponent } from "./checkoutPage-Components/formComponent";
import { CheckoutMenuBar } from "./checkoutMenuBar/checkoutMenuBar";
import './checkoutPage.css';
import { Link } from "react-router-dom";
import { useCart } from "../shopping-cart/shoppingCart-Context/cartContext";
import React, { useState } from 'react';
import { handleCheckout } from '../shopping-cart/shoppingCart-Components/handleCheckout.tsx'

export function CheckoutPage() {
  const { items } = useCart(); // Access items from the shopping cart
  const [termsChecked, setTermsChecked] = useState(false);
  const [newsChecked, setNewsChecked] = useState(false);
  const [error, setError] = useState("");


  const handleCheckoutClick = () => {
    if (!termsChecked) {
      setError("Please accept the Terms and Conditions to proceed.");
      return;
    }
    //handleCheckout(items);
    handleCheckout(items, "1", "shipping_address", "billing_address", 200020);
  };

  return (
    <div className ='checkout-page-container'>
      <CheckoutMenuBar />
      <section className="checkout-delivery">
        <FormComponent />
      </section>

      <section className="checkout-checkboxNews">
        <CheckboxNews
          name="News"
          val={newsChecked}
          setValue={setNewsChecked}
          label="I would like to receive possible future offers and emails from Porcelain Shop."

        />
      </section>
      <section className="checkout-checkboxTerm">
        <CheckboxTerms
          name="Terms"

          val={termsChecked}
          setValue={setTermsChecked}

          label="I confirm that my details are correct and accept the Terms and Conditions"
          error={error} // Pass error state as a prop
        />
      </section>
      <section className="checkout-Comment">
        <div>
        <CommentTextField
          label="Order Comments :"
        />
        </div>
      </section>


      {error && <div className="error-message">{error}</div>}

      <button className="checkout-button" onClick={() => {
        if (termsChecked)
        {handleCheckoutClick();}}}>
          Go to payment
      </button>
    </div>
  );
}

interface CheckboxProps {
  name: string;
  val: boolean;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
  label: string;

}

const CheckboxTerms: React.FC<CheckboxProps & { error: string }> = ({ name, val, setValue, label, error }) => {
  return (
    <div className={`checkbox-wrapper ${error ? 'error' : ''}`}>
      <label className={`checkout-checkboxTerm ${error ? 'error' : ''}`} style={{ color: 'black' }}>
        <input
          type="checkbox"
          name={name}
          checked={val}
          onChange={() => {
            setValue(!val)
          }}
        />
        {label}
      </label>
    </div>
  );
};

const CheckboxNews: React.FC<CheckboxProps> = ({ name, val, setValue, label }) => {
  return (
    <div className="checkbox-wrapper">
      <label className="checkout-checkboxNews" style={{ color: 'black' }}>
        <input
          type="checkbox"
          name={name}
          checked={val}
          onChange={() => {
            setValue(!val);
          }}
        />
        {label}
      </label>
    </div>
  );
};


interface CommentTextFieldCharacterCounter {
  label: string;
}

const CommentTextField: React.FC<CommentTextFieldCharacterCounter> = ({ label }) => {
  const [inputValue, setInputValue] = useState('');
  const maxLengthCharText = 500;
  const remainingCharacters = maxLengthCharText - inputValue.length;
  /* This below use an event handler 'e' which retrieve the value of the textarea, so it knows its active by using onChange, to change border and allows you to type by using react inputValue component  */

  return (
    <div className="checkbox-commentWrapper">
      <label className="checkout-Comment" style={{ color: 'black' }}>
        {label} ({remainingCharacters} characters remaining)
      </label>

      <textarea
        placeholder="Special request or delivery instructions for your fine items."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        maxLength={maxLengthCharText}
        className="checkbox-textfield"
      />

    </div>
    /* "checkbox-textfield" calls the CSS properties that enables border change fyi.*/
  );
};

