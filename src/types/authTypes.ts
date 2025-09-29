export type AuthFlow = 'forgotPassword' | 'createAccount' | null;

export interface UserState {
  isLoggedIn: boolean;
  authFlow: AuthFlow;
  tempEmail: string | null;
  signUpData: SignUpData;
  token: string | null; // ← Nuevo
  user: {
    // ← Nuevo
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    userMail: string;
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

export interface SignUpData {
  firstName: string;
  lastName: string;
  username: string;
  userMail: string;
  userPassword: string;
}

export interface LoginData {
  userMail: string;
  userPassword: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    userMail: string;
  };
}
