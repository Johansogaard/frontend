import { createContext, useReducer, Dispatch, ReactNode, useCallback } from 'react';
import { UserState, UserAction } from './userTypes';
import { userReducer } from './userReducer';


// Define the initial state
const initialState: UserState = {
    isAuthenticated: false,
    customer_id: null,
    customer_name: null,
    token: null,
    message: null
  };


  
  interface UserProviderProps {
    children: ReactNode;
  }


  export const UserContext = createContext<{
    state: UserState;
    login: (credentials: { email: string; customer_password: string }) => Promise<void>;
    dispatch: Dispatch<UserAction>;
    register: (credentials: { email: string; customer_password: string; customer_name: string; phone_number: string }) => Promise<void>; 
    
  }>({
    state: initialState,
    dispatch: () => null, // Placeholder function
    login: async () => {},
    register: async () => {},
  });
  
  

  export const UserProvider = ({ children }: UserProviderProps) => {
    const [state, dispatch] = useReducer(userReducer, initialState);
  


    
      const login = useCallback(async(credentials: { email: string; customer_password: string }) => {
        try {
          const response = await fetch('https://dtu62597.eduhost.dk:10132/customer/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
          });
          const data = await response.json();
          if (response.ok) {
            dispatch({ type: 'LOGIN_SUCCESS', payload: { customer_id: data.customer_id,customer_name: data.customer_name ,token: data.token,message: data.message} });
          } else {
            dispatch({ type: 'LOGIN_FAILURE', payload: { error: data.message || 'Failed to login' } });
          }
        }
        catch (error:unknown) {
          let errorMessage = 'An unexpected error occurred'; // A default error message
          if (error instanceof Error) { // Type-guard to check if error is an Error object
            errorMessage = error.message; 
          }
          dispatch({ type: 'LOGIN_FAILURE', payload: { error: errorMessage } });
        }
      }, [dispatch]);

      const register = useCallback(async(credentials: { email: string; customer_password: string; customer_name: string; phone_number: string }) => {
        try {
        
          const response = await fetch('https://dtu62597.eduhost.dk:10132/customer/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
          });
          const data = await response.json();
          if (response.ok) {
            const message = 'Registration successful';
            dispatch({ type: 'REGISTER_SUCCESS', payload: { message } });
          } else {
            dispatch({ type: 'REGISTER_FAILURE', payload: { error: data.message || 'Failed to register' } });
          }
        }
        catch (error:unknown) {
          let errorMessage = 'An unexpected error occurred'; // A default error message
          if (error instanceof Error) { // Type-guard to check if error is an Error object
            errorMessage = error.message; 
          }
          dispatch({ type: 'REGISTER_FAILURE', payload: { error: errorMessage } });
        }

      }, [dispatch]);
    return (
      <UserContext.Provider value={{ state, dispatch, login, register }}>
        {children}
      </UserContext.Provider>
    );
  };