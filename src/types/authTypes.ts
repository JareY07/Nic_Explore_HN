export type AuthFlow = 'forgotPassword' | 'createAccount' | null;

export interface UserState {
  isLoggedIn: boolean;
  authFlow: AuthFlow;
  tempEmail: string | null;
  signUpData: SignUpData;
  logIn: () => void;
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
