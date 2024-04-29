import { FormsState, FormsAction } from "./formsTypes";
import { createContext, Dispatch, ReactNode, useReducer, useEffect } from "react";
import { formsReducer } from "./formsReducer";

const initialState: FormsState = {
    userType: 'privat',
    email: '',
    first_name: '',
    last_name: '',
    phoneNumber: '',
    vatNumber: '',
    isEmailValid: false,
    isPhoneNumberValid: false,
    isVatNumberValid: false,
    postalCode: '',
    postalCodes: [],
    message: '',
    city: '',
    address: '',
    country: '',
    billing_address: '',
    isFirstNameValid: false,
    isLastNameValid: false,
    company_name: '',
    isAddressValid: false,
    isPostalCodeValid: false,

  };
  
  
  export const FormsContext = createContext<{
    state: FormsState;
    
    dispatch: Dispatch<FormsAction>;
  }>({
    state: initialState,
    dispatch: () => null, // Placeholder function
    
  
  });
  
  
  interface FormsProviderProps {
    children: ReactNode;
  }
  
  
  export const FormsProvider = ({ children }: FormsProviderProps) => {
    const [state, dispatch] = useReducer(formsReducer, initialState);
    useEffect(() => {
        validateEmail()
      }, [state.email])
      useEffect(() => {
        validatePhoneNumb()
      }, [state.phoneNumber])
      useEffect(() => {
        validateVatNumber()
      }, [state.vatNumber])
      useEffect(() => {
        validateAddress()
      }, [state.address])
      useEffect(() => {
        validateLastName()
      }, [state.last_name])
      useEffect(() => {
        validateFirstName()
      }, [state.first_name])
     


      const validateEmail = () => {
        var re = /\S+@\S+\.\S+/
        const isValid = re.test(state.email)
        dispatch({type: 'SET_IS_EMAIL_VALID', payload: {isEmailValid: isValid}})
      }
    
      const validatePhoneNumb = () => {
        const isValid = /^\d{8}$/.test(state.phoneNumber)
        dispatch({type: 'SET_IS_PHONE_NUMBER_VALID', payload: {isPhoneNumberValid: isValid}})
      }
    
      const validateVatNumber = () => {
        // VAT nummer validering
        const isValid = /^\d{8}$/.test(state.vatNumber)
        dispatch({type: 'SET_IS_VAT_NUMBER_VALID', payload: {isVatNumberValid: isValid}})
      }
      const validateFirstName = () => {
        const isValid = /^[a-zA-Zøæå -]{2,}$/.test(state.first_name);
        dispatch({type: 'SET_IS_FIRST_NAME_VALID', payload: {isFirstNameValid: isValid}})
      }
      const validateLastName = () => {
        const isValid = /^[a-zA-Zøæå -]{2,}$/.test(state.last_name);
        dispatch({type: 'SET_IS_LAST_NAME_VALID', payload: {isLastNameValid: isValid}})
      }
      const validateAddress = () => {
        const isValid = /^[a-zA-Z0-9øæå -]{3,}$/.test(state.address);
        dispatch({type: 'SET_IS_ADDRESS_VALID', payload: {isAddressValid: isValid}})
      }
    
    
    return (
      <FormsContext.Provider value={{ state, dispatch }}>
        {children}
      </FormsContext.Provider>
    );
};