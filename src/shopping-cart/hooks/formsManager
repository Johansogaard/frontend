import {useState,useEffect} from 'react';



export function formsManager()
{
const [email, setEmail] = useState('');
const [isEmailValid, setIsEmailValid] = useState(true); 
const [phoneNumber, setPhoneNumber] = useState('');
const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
const [vatNumber, setVatNumber] = useState('');
const [isVatNumberValid, setIsVatNumberValid] = useState(true);

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
 var re = /\S+@\S+\.\S+/;
 setIsEmailValid(re.test(email));
};

 const validatePhoneNumb = () => {
    const isValid = /^\d{8}$/.test(phoneNumber);
    setIsPhoneNumberValid(isValid);    
};    

const validateVatNumber = () => {
 // VAT nummer validering
 const isValid = /^\d{8}$/.test(vatNumber);
     setIsVatNumberValid(isValid);
};
 


return {email,phoneNumber,vatNumber,setEmail,setPhoneNumber,setVatNumber,isEmailValid,isPhoneNumberValid,isVatNumberValid};
}