import { steps } from 'framer-motion';
import { FormsAction, FormsState } from './formsTypes';


export const formsReducer = (state: FormsState, action: FormsAction): FormsState => {
    const { type } = action;
    
    switch (type) {
        case 'FORM_UPDATE_EMAIL': 
        return{
            ...state,
            email: action.payload.email
        };
    
        case 'FORM_UPDATE_FIRST_NAME': 
        return{
            ...state,
            first_name: action.payload.first_name
        };
        case 'FORM_UPDATE_LAST_NAME':
        return{
        ...state,
        last_name: action.payload.last_name
        }
        
        case 'FORM_UPDATE_PHONE_NUMBER':
        return{
        ...state,
        phoneNumber: action.payload.phoneNumber,
        }
        case 'FORM_UPDATE_VAT_NUMBER':
        return{
        ...state,
        vatNumber: action.payload.vatNumber,
        }
        case 'ZIPFORM_UPDATE_POSTAL_CODES':
        return{
        ...state,
        postalCodes: action.payload.postalCodes,
        }
        case 'ZIPFORM_UPDATE_POSTAL_CODE':
        return{
        ...state,
        postalCode: action.payload.postalCode,
        }
        case 'ZIPFORM_UPDATE_MESSAGE':
        return{
        ...state,
        message: action.payload.message,
        }
        case 'ZIPFORM_UPDATE_CITY':
        return{
        ...state,
        city: action.payload.city,
        }
        case 'SET_IS_EMAIL_VALID':
        return{
        ...state,
        isEmailValid: action.payload.isEmailValid,
        }
        case 'SET_IS_PHONE_NUMBER_VALID':
        return{
        ...state,
        isPhoneNumberValid: action.payload.isPhoneNumberValid,
        }
        case 'SET_IS_VAT_NUMBER_VALID':
        return{
        ...state,
        isVatNumberValid: action.payload.isVatNumberValid,
        }
        case 'FORM_UPDATE_ADDRESS':
        return{
        ...state,
        address: action.payload.address,
        }
        case 'FORM_UPDATE_COUNTRY':
        return{
        ...state,
        city: action.payload.country,
        }
        case 'FORM_UPDATE_BILLING_ADDRESS':
        return{
        ...state,
        billing_address: action.payload.billing_address,
        }
        case 'FORM_UPDATE_COMPANY_NAME':
            return{
                ...state,
                company_name: action.payload.company_name
            }
        case 'SET_IS_FIRST_NAME_VALID' :
            return{
                ...state,
                isFirstNameValid : action.payload.isFirstNameValid
            }
         case 'SET_IS_LAST_NAME_VALID' :
                return{
                    ...state,
                    isLastNameValid : action.payload.isLastNameValid
                }
        case 'SET_IS_ADDRESS_VALID' :
            return{
                ...state,
                isAddressValid: action.payload.isAddressValid
            }
        case 'FORM_UPDATE_USERTYPE' :
            return{
                ...state,
                userType: action.payload.userType
            }
        case 'ZIPFORM_UPDATE_POSTAL_CODE_SUCCESS' :
        return{
            ...state,
            city: action.payload.city,
            postalCode:action.payload.postalCode,
            isPostalCodeValid: true
        }
        case 'ZIPFORM_UPDATE_POSTAL_CODE_FAILURE' :
        return{
            ...state,
            city: '',
            postalCode:'',
            isPostalCodeValid: false
        }

    default: 
        return state;
    
    }
    }