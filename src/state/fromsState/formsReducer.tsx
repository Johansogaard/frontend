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

    default: 
        return state;
    
    }
    }