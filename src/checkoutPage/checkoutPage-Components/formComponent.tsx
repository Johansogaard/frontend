import React, { useEffect, useState } from 'react'
import { formsManager } from '../checkoutPage-Hooks/formsManager'
import './formComponent.css'




export function FormComponent({ validateForm }) {
  const [error, setError] = useState(""); // State for form validation error
  const [isValidated, setIsValidated] = useState(false); // State to track if form has been validated

  const { email, phoneNumber, vatNumber, setEmail, setPhoneNumber, setVatNumber, isEmailValid, isPhoneNumberValid, isVatNumberValid, validatePhoneNumb } = formsManager();

  useEffect(() => {
    // Validate form fields if the form has been validated
    if (isValidated) {
      handleValidation();
    }
  }, [isValidated]); // Re-run validation when isValidated changes

  const handleValidation = () => {
    // Validate form fields
    validatePhoneNumb();

    // Check for validation errors
    if (!isEmailValid || !isPhoneNumberValid || !isVatNumberValid) {
      setError("Please fill in all required fields correctly.");
      return false; // Validation failed
    } else {
      setError(""); // Clear error if validation succeeds
      return true; // Validation succeeded
    }
  };

  const handleCheckoutClick = () => {
    // Mark the form as validated
    setIsValidated(true);

    // Perform validation before proceeding to checkout
    const isValid = handleValidation();

    // Return validation status to parent component
    validateForm(isValid);
  };

  return (
    <section className="form">
      <h2>Customer information</h2>
      <form className='form-content'>
        {/* Email */}
        <div className='form-field'>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Phone Number */}
        <div className='form-field'>
          <input
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        {/* VAT Number */}
        <div className='form-field'>
          <input
            type="text"
            name="vatNumber"
            placeholder="Enter your VAT number"
            value={vatNumber}
            onChange={(e) => setVatNumber(e.target.value)}
          />
        </div>

        {/* Error message for form validation */}
        {error && <div className="error-message">{error}</div>}
      </form>

      {/* No button needed here */}
    </section>
  );
}


//export default ZipForm

//For making a checkbox with a label (So both text and checkbox has a certain size).

