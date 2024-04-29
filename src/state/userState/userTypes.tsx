import { Order } from '../../models/Orders'

export type UserState = {
  isAuthenticated: boolean
  customer_id: number | null
  customer_name: string | null
  token: string | null
  message: String | null
  orders: Order[] | null
  loadingOrders: boolean
  ordersError: String | null

}

export type UserAction =
  | {
    type: 'LOGIN_SUCCESS'
    payload: {
      customer_id: number
      customer_name: string
      token: string
      message: string
    }
  }
  | { type: 'LOGIN_FAILURE'; payload: { error: String } }
  | { type: 'LOGOUT' }
  | { type: 'REGISTER_SUCCESS'; payload: { message: String } }
  | { type: 'REGISTER_FAILURE'; payload: { error: String } }
  | { type: 'FETCH_ORDERS'; }
  | { type: 'FETCH_ORDERS_SUCCESS'; payload: { orders: Order[] } }
  | { type: 'FETCH_ORDERS_FAILURE'; payload: { error: String } }
  | { type: 'SET_USER_STATE'; payload: { userState: UserState } }
