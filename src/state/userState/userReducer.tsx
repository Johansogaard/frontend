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
      }
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        customer_id: null,
        customer_name: null,
        token: null,
      }
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        customer_id: null,
        customer_name: null,
        token: null,
      }
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        isAuthenticated: false,
        customer_id: null,
        customer_name: null,
        token: null,
      }
    case 'REGISTER_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        customer_id: null,
        customer_name: null,
        token: null,
      }

    default:
      return state
  }
}
