// src/types/userTypes.ts


  export type UserState = {
    isAuthenticated: boolean;
    customer_id: number | null;
    customer_name: string | null;
    token: string | null;
  };
  
  export type UserAction =
    | { type: 'LOGIN_SUCCESS'; payload: { customer_id: number; customer_name: string; token: string } }
    | { type: 'LOGIN_FAILURE'; payload: { error: String } }
    | { type: 'LOGOUT' }
    | { type: 'REGISTER_SUCCESS'; payload: { message:String } }
    | { type: 'REGISTER_FAILURE'; payload: { error:String } };