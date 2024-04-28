import { FormComponent } from "./checkoutPage-Components/formComponent";
//import { CheckoutMenuBar } from "./checkoutMenuBar/checkoutMenuBar";
import './checkoutPage.css';
import { Link } from "react-router-dom";
//import { useCart } from "../shopping-cart/shoppingCart-Context/cartContext";
import React, { useState } from 'react';
//import { handleCheckout } from '../shopping-cart/shoppingCart-Components/handleCheckout.tsx'
import { FormsManager } from './checkoutPage-Hooks/formsManager'

export function CheckoutPage() {

  const {
    email,
    setEmail,
    phoneNumber,
    setPhoneNumber,
    vatNumber,
    setVatNumber,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    address,
    setAddress,
    isEmailValid,
    isPhoneNumberValid,
    isVatNumberValid,
    isFirstNameValid,
    isLastNameValid,
    isAddressValid,


  } = FormsManager();

  const [termsChecked, setTermsChecked] = useState(false);
  const [newsChecked, setNewsChecked] = useState(false);
  const [error, setError] = useState('');



  const handleCheckoutClick = () => {

    const errors = [];

  if (!email || !isEmailValid) {
     errors.push('Email is not valid');
   }

   if (!firstName || !isFirstNameValid) {
     errors.push('Fill out First Name');
   }
   if (!lastName || !isLastNameValid) {
     errors.push('Fill out Last Name');
   }
    if (!phoneNumber || !isPhoneNumberValid) {
        errors.push('Phone number does not exist');
      }
      if (vatNumber && !isVatNumberValid) {
        errors.push('VAT number is not valid');
      }
   if (!address || !isAddressValid) {
     errors.push('Address is not valid');
   }
   if (!termsChecked) {
     errors.push('Please accept the Terms and Conditions to proceed.');
   }

if (errors.length > 0) {
  setError(errors.join('<br>'));
  // workaround because '\n' HTML don't work.
  return;
}
};


   return (
      <div className='checkout-page-container'>
        <section className="checkout-delivery">
          <FormComponent
            email={email}
            setEmail={setEmail}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            vatNumber={vatNumber}
            setVatNumber={setVatNumber}
            isEmailValid={isEmailValid}
            isPhoneNumberValid={isPhoneNumberValid}
            isVatNumberValid={isVatNumberValid}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            address={address}
            setAddress={setAddress}
            isFirstNameValid={isFirstNameValid}
            isLastNameValid={isLastNameValid}
            isAddressValid={isAddressValid}         />
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

<section>
</section>

{error && (
  <div className="error-message" dangerouslySetInnerHTML={{ __html: error }} />
)}


      <button className="checkout-button" onClick={handleCheckoutClick} >
        <Link to={termsChecked && isAddressValid && isEmailValid && isFirstNameValid && isLastNameValid && isPhoneNumberValid  ? "/payment" : "/checkout"} className="link">


        Go to payment
        </Link>
      </button>
    </div>
  );
}
// FYI, could not directly use error as a list inside the check for link= to {} , since this cause it to be checked constantly and can be bypassed if you spam right click on the button.

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

