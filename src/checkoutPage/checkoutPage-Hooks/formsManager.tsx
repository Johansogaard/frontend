import {useState,useEffect} from 'react';



export function formsManager() {
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false);
  const [vatNumber, setVatNumber] = useState('');
  const [isVatNumberValid, setIsVatNumberValid] = useState(true);

  useEffect(() => {
    validateEmail();
  }, [email]);

  useEffect(() => {
    validateVatNumber();
  }, [vatNumber]);

  const validateEmail = () => {
    var re = /\S+@\S+\.\S+/;
    setIsEmailValid(re.test(email));
  };

  const validateVatNumber = () => {
    // VAT nummer validering
    const isValid = /^\d{8}$/.test(vatNumber);
    setIsVatNumberValid(isValid);
  };

  // Validate phone number only when called
  const validatePhoneNumb = () => {
    const isValid = /^\d{8}$/.test(phoneNumber);
    setIsPhoneNumberValid(isValid);
  };

  return {
    email,
    phoneNumber,
    vatNumber,
    setEmail,
    setPhoneNumber,
    setVatNumber,
    isEmailValid,
    isPhoneNumberValid,
    isVatNumberValid,
    validatePhoneNumb, // Return the validatePhoneNumb function
  };
}