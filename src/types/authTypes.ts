export interface UserState {
  isLoggedIn: boolean;
  shouldCreateAccount: boolean;
  logIn: () => void;
  logOut: () => void;
  accountCreated: () => void;
  noAccountCreated: () => void;
}
