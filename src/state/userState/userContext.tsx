import { createContext, useReducer, Dispatch, ReactNode } from 'react';
import { UserState, UserAction } from './userTypes';
import { userReducer } from './userReducer';

// Define the initial state
const initialState: UserState = {
    isAuthenticated: false,
    user: null,
    token: null,
  };


  
  interface UserProviderProps {
    children: ReactNode;
  }


  export const UserContext = createContext<{
    state: UserState;
    dispatch: Dispatch<UserAction>;
  }>({
    state: initialState,
    dispatch: () => null, // Placeholder function
  });

  export const UserProvider = ({ children }: UserProviderProps) => {
    const [state, dispatch] = useReducer(userReducer, initialState);
  
    return (
      <UserContext.Provider value={{ state, dispatch }}>
        {children}
      </UserContext.Provider>
    );
  };