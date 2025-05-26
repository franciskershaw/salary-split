export type Currency = "GBP" | "USD" | "EUR";
export type Theme = "light" | "dark";
export type UserRole = "user" | "admin";
export type AuthProvider = "google" | "local";

export interface User {
  _id: string;
  email: string;
  name: {
    firstName: string;
    lastName: string;
  };
  role: UserRole;
  provider: AuthProvider;
  googleId?: string;
  takeHomePay: number;
  payDay: string;
  defaultCurrency: Currency;
  defaultTheme: Theme;
  createdAt: string;
  updatedAt: string;
  accessToken: string;
}

export interface AuthResponse extends User {
  accessToken: string;
}
