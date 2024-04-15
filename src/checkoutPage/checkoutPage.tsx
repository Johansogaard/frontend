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
  const [anyComments, checkifComments] = useState(false);

  const handleCheckoutClick = () => {
    // Call handleCheckout function with the items from the shopping cart
    handleCheckout(items);
  };

  return (
    <>
      <CheckoutMenuBar />
      <section className="checkout-delivery">
        <FormComponent />
      </section>

      <section className="checkout-checkboxNews">
        <CheckboxNews
          name="terms"
          val={termsChecked}
          setValue={setTermsChecked}
          label="I would like to receive possible future offers and emails from Porcelain Shop."

        />
      </section>
      <section className="checkout-checkboxTerm">
        <CheckboxTerms
          name="news"
          val={newsChecked}
          setValue={setNewsChecked}

          label="I confirm that my details are correct and accept the Terms and Conditions"

        />
      </section>
      <section className="checkout-Comment">
        <CommentTextField
          label="Order Comments "
          name="comment"
          val={anyComments}
          setValue={checkifComments}

        />
      </section>


      <button className="checkout-button" onClick={handleCheckoutClick}>
        <Link to="/payment" className="link">
          Go to payment
        </Link>
      </button>
    </>
  );
}

interface CheckboxProps {
  name: string;
  val: boolean;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
  label: string;

}

const CheckboxTerms: React.FC<CheckboxProps> = ({ name, val, setValue, label }) => {
  return (
    <div className="checkbox-wrapper">
      <label className="checkout-checkboxTerm" style={{ color: 'black' }}>
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


const CommentTextField: React.FC<CheckboxProps> = ({ name, val, setValue, label }) => {
  return (
    <div className="checkbox-wrapper">
      <label className="checkout-Comment" style={{ color: 'black' }}>
        {label}
      </label>
        <input
          type="checkbox-typer"
          name={name}
          checked={val}
          onChange={() => {
            setValue(!val);
          }}
        />
    </div>
  );
};


