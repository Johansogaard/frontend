
export type PostalCodeData = {
    nr: string
    navn: string
  }

export type FormsState = {
    email: string;
    first_name: string;
    last_name: string;
    phoneNumber: string;
    address: string;
    billing_address: string;
    country: string;
    vatNumber: string;
    isEmailValid: boolean;
    isPhoneNumberValid: boolean;
    isVatNumberValid: boolean;
    postalCode: string;
    postalCodes: PostalCodeData[];
    message: string;
    city: string;
  };
  
  export type FormsAction =
    | { type: 'FORM_UPDATE_EMAIL'; payload: { email: string } }
    | { type: 'FORM_UPDATE_FIRST_NAME'; payload: { first_name: string } }
    | { type: 'FORM_UPDATE_LAST_NAME'; payload: { last_name: string } }

    | { type: 'FORM_UPDATE_PHONE_NUMBER'; payload: { phoneNumber: string } }
    | { type: 'FORM_UPDATE_VAT_NUMBER'; payload: { vatNumber: string } }
    | { type: 'SET_IS_EMAIL_VALID'; payload: { isEmailValid: boolean } }
    | { type: 'SET_IS_PHONE_NUMBER_VALID'; payload: { isPhoneNumberValid: boolean } }
    | { type: 'SET_IS_VAT_NUMBER_VALID'; payload: { isVatNumberValid: boolean } }
    | { type: 'ZIPFORM_UPDATE_POSTAL_CODES'; payload: { postalCodes: PostalCodeData[]} }
    | { type: 'ZIPFORM_UPDATE_POSTAL_CODE'; payload: { postalCode: string } }
    | { type: 'ZIPFORM_UPDATE_MESSAGE'; payload: { message: string } }
    | { type: 'ZIPFORM_UPDATE_CITY'; payload: { city: string } }
    | { type: 'FORM_UPDATE_ADDRESS'; payload: { address: string } }
    | { type: 'FORM_UPDATE_COUNTRY'; payload: { country: string } }
    | { type: 'FORM_UPDATE_BILLING_ADDRESS'; payload: { billing_address: string } }