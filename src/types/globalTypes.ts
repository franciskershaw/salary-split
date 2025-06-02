import {
  CURRENT_ACCOUNT,
  INVESTMENT_ACCOUNT,
  JOINT_ACCOUNT,
  SAVINGS_ACCOUNT,
} from "@/constants/api";

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
  defaultAccount?: string;
  defaultTheme: Theme;
  accountFilters: AccountFilter[];
  createdAt: string;
  updatedAt: string;
  accessToken: string;
}

export interface AccountFilter {
  type: Account["type"];
  enabled: boolean;
}

export interface Account {
  _id: string;
  name: string;
  institution?: string;
  amount: number;
  acceptsFunds: boolean;
  receivesSalary?: boolean;
  type:
    | typeof CURRENT_ACCOUNT
    | typeof SAVINGS_ACCOUNT
    | typeof INVESTMENT_ACCOUNT
    | typeof JOINT_ACCOUNT;
  createdBy: string;
  createdAt: string;
}

export interface Bill {
  _id: string;
  name: string;
  amount: number;
  dueDate: string;
  account: Account;
  splitBetween?: number;
  createdBy: string;
  createdAt: string;
}
