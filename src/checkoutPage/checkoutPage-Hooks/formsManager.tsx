/*import { useEffect, useContext } from 'react'
import { FormsContext } from '../../state/fromsState/formsContext'

export function FormsManager() {
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
  const [vatNumber, setVatNumber] = useState('');
  const [isVatNumberValid, setIsVatNumberValid] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [isFirstNameValid, setIsFirstNameValid] = useState(false);
  const [lastName, setLastName] = useState('');
  const [isLastNameValid, setIsLastNameValid] = useState(false);
  const [address, setAddress] = useState('');
  const [isAddressValid, setIsAddressValid] = useState(false);


  useEffect(() => {
    validateEmail();
  }, [email]);

  useEffect(() => {
    validatePhoneNumb();
  }, [phoneNumber]);

  useEffect(() => {
    validateVatNumber();
  }, [vatNumber]);

  useEffect(() => {
    validateFirstName();
  }, [firstName]);

  useEffect(() => {
    validateLastName();
  }, [lastName]);

  useEffect(() => {
    validateAddress();
  }, [address]);

  const validateEmail = () => {
    const re = /\S+@\S+\.\S+/;
    setIsEmailValid(re.test(email));
  };

  const validatePhoneNumb = () => {
    const isValid = /^\d{8}$/.test(phoneNumber);
    setIsPhoneNumberValid(isValid);
  };

  const validateVatNumber = () => {
    const isValid = /^[a-zA-Z]{2}\d{8}$/.test(vatNumber);
    setIsVatNumberValid(isValid);
  }



  const validateFirstName = () => {
    const isValid = /^[a-zA-Z -]{2,}$/.test(firstName);
    setIsFirstNameValid(isValid);
  };

  const validateLastName = () => {
    const isValid = /^[a-zA-Z -]{2,}$/.test(lastName);
    setIsLastNameValid(isValid);
  };

  const validateAddress = () => {
    const isValid = /^[a-zA-Z0-9 -]{3,}$/.test(address);
    setIsAddressValid(isValid);
  };

  return {
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
  };
}
*/