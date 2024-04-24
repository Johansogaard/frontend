import {useState,useEffect} from 'react';

export function formsManager() {
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
  const [vatNumber, setVatNumber] = useState('');
  const [isVatNumberValid, setIsVatNumberValid] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [isFirstNameValid, setIsFirstNameValid] = useState(true);
  const [isLastNameValid, setIsLastNameValid] = useState(true);
  const [isAddressValid, setIsAddressValid] = useState(true);

  useEffect(() => {
    validateEmail();
  }, [email]);

  useEffect(() => {
    validatePhoneNumb();
  }, [phoneNumber]);

  useEffect(() => {
    validateVatNumber();
  }, [vatNumber]);

  const validateEmail = () => {
    const re = /\S+@\S+\.\S+/;
    setIsEmailValid(re.test(email));
  };

  const validatePhoneNumb = () => {
    const isValid = /^\d{8}$/.test(phoneNumber);
    setIsPhoneNumberValid(isValid);
  };

  const validateVatNumber = () => {
    const isValid = /^\d{8}$/.test(vatNumber);
    setIsVatNumberValid(isValid);
  };

  const validateName = (name, setIsValid) => {
    setIsValid(name.trim().length >= 2);
  };

  const validateAddress = () => {
    setIsAddressValid(address.trim().length >= 2);
  };

  return {
    email,
    phoneNumber,
    vatNumber,
    firstName,
    lastName,
    address,
    setEmail,
    setPhoneNumber,
    setVatNumber,
    setFirstName,
    setLastName,
    setAddress,
    isEmailValid,
    isPhoneNumberValid,
    isVatNumberValid,
    isFirstNameValid,
    isLastNameValid,
    isAddressValid,
    validateName,
    validateAddress,
  };
}