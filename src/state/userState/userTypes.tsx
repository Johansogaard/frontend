// src/types/userTypes.ts
export type User = {
    name: string;
    email: string;
  };
  
  export type UserState = {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
  };
  
  export type UserAction =
    | { type: 'LOGIN'; payload: { user: User; token: string } }
    | { type: 'LOGOUT' };