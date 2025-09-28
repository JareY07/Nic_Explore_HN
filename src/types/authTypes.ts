export type AuthFlow = 'forgotPassword' | 'createAccount' | null;

export interface UserState {
  isLoggedIn: boolean;
  authFlow: AuthFlow;
  tempEmail: string | null;
  logIn: () => void;
  logOut: () => void;
  setAuthFlow: (flow: AuthFlow) => void;
  setTempEmail: (email: string) => void;
  clearTempEmail: () => void;
  resetAuthFlow: () => void;
}
