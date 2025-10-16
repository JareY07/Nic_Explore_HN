export type AuthFlow = 'forgotPassword' | 'createAccount' | null;

export interface UserState {
  isLoggedIn: boolean;
  authFlow: AuthFlow;
  tempEmail: string | null;
  signUpData: SignUpData;
  token: string | null;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    userMail: string;
    description: string | null;
  } | null;
  logIn: (authData: AuthResponse) => void;
  logOut: () => void;
  setAuthFlow: (flow: AuthFlow) => void;
  setTempEmail: (email: string) => void;
  clearTempEmail: () => void;
  resetAuthFlow: () => void;
  setSignUpData: (data: Partial<SignUpData>) => void;
  clearSignUpData: () => void;
}

export interface AuthProps {
  children: React.ReactNode;
}

export interface SignUpData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    userMail: string;
    description: string | null;
  };
}
