import { createContext } from 'react';
type authState = {
  isLoggedIn: boolean;
  isReady: boolean;
  shouldCreateAccount: boolean;
  logIn: () => void;
  logOut: () => void;
};

export const AuthContext = createContext<authState>({
  isLoggedIn: false,
  isReady: false,
  shouldCreateAccount: false,
  logIn: () => {},
  logOut: () => {},
});
