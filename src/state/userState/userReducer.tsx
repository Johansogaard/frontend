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
        message: 'LOGIN_SUCCESS',
      }
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        customer_id: null,
        customer_name: null,
        token: null,
        message: 'LOGIN_FAIL: ' + action.payload.error,
      }
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        customer_id: null,
        customer_name: null,
        token: null,
        message: 'LOGOUT',
      }
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        isAuthenticated: false,
        customer_id: null,
        customer_name: null,
        token: null,
        message: 'Succesfully created account',
      }
    case 'REGISTER_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        customer_id: null,
        customer_name: null,
        token: null,
        message: 'Registration failed: ' + action.payload.error,
      }
    case 'FETCH_ORDERS':
      return {
        ...state,
        loadingOrders: true,
        ordersError: null,
      }
    case 'FETCH_ORDERS_SUCCESS':
      return {
        ...state,
        loadingOrders: false,
        orders: action.payload.orders,
        ordersError: null,
      }
    case 'FETCH_ORDERS_FAILURE':
      return {
        ...state,
        loadingOrders: false,
        orders: null,
        ordersError: action.payload.error,
      }
    case 'SET_USER_STATE':
      return {
        ...state,
        ...action.payload.userState,
      }
    default:
      return state
  }
}
