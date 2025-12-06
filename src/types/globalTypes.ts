import { type AccountType, type BillType } from "@/constants/api";
import {
  FEATURE_ACCOUNTS,
  FEATURE_BILLS,
  FEATURE_EXPENSES,
  FEATURE_SAVINGS,
} from "@/constants/features";

export type Currency = "GBP" | "USD" | "EUR";
export type Theme = "light" | "dark";
export type UserRole = "user" | "admin";
export type AuthProvider = "google" | "local";

export type Feature =
  | typeof FEATURE_ACCOUNTS
  | typeof FEATURE_BILLS
  | typeof FEATURE_EXPENSES
  | typeof FEATURE_SAVINGS;

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
  billFilters: BillFilter[];
  expenseFilters: BillFilter[];
  createdAt: string;
  updatedAt: string;
  accessToken: string;
}

export interface AccountFilter {
  type: Account["type"];
  enabled: boolean;
}

export interface BillFilter {
  type: Bill["type"];
  enabled: boolean;
}

export interface Account {
  _id: string;
  name: string;
  institution?: string;
  amount: number;
  acceptsFunds: boolean;
  receivesSalary?: boolean;
  type: AccountType;
  targetMonthlyAmount?: {
    amount: number;
    splitBetween: number;
  } | null;
  trackTransactions?: {
    balance: number;
    timestamp: string;
  } | null;
  createdBy: string;
  createdAt: string;
}

export interface Bill {
  _id: string;
  name: string;
  amount: number;
  dueDate: string;
  account: Account;
  type: BillType;
  splitBetween?: number;
  createdBy: string;
  createdAt: string;
}
