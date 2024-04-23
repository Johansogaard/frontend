import { UserState, UserAction } from './userTypes'

export const userReducer = (
  state: UserState,
  action: UserAction,
): UserState => {
  const { type } = action

  switch (type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        customer_id: action.payload.customer_id,
        customer_name: action.payload.customer_name,
        token: action.payload.token,
<<<<<<< HEAD
      }
    case 'LOGIN_FAILURE':
=======
        message: 'LOGIN_SUCCESS'
      };
      case 'LOGIN_FAILURE':
>>>>>>> development
      return {
        ...state,
        isAuthenticated: false,
        customer_id: null,
        customer_name: null,
        token: null,
<<<<<<< HEAD
      }
=======
        message: 'LOGIN_FAIL: ' + action.payload.error
      };
>>>>>>> development
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        customer_id: null,
        customer_name: null,
        token: null,
<<<<<<< HEAD
      }
=======
        message: 'LOGOUT'
      };
>>>>>>> development
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        isAuthenticated: false,
        customer_id: null,
        customer_name: null,
        token: null,
<<<<<<< HEAD
      }
    case 'REGISTER_FAILURE':
=======
        message: 'Succesfully created account'
      };
      case 'REGISTER_FAILURE':
>>>>>>> development
      return {
        ...state,
        isAuthenticated: false,
        customer_id: null,
        customer_name: null,
        token: null,
<<<<<<< HEAD
      }
=======
        message: 'Registration failed: ' + action.payload.error
      };
>>>>>>> development

    default:
      return state
  }
}
