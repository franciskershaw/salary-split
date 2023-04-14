export type PageType = 'login' | 'register';
export type FormType = 'add' | 'edit' | 'first';

export interface LoginFormData {
  username: string;
  password: string;
}

export interface RegisterFormData extends LoginFormData {
  name: string;
  monthlySalary: number;
}

export interface RegisterFormState extends RegisterFormData {
  confirmPassword: string;
}

export interface AddAccountState {
  name: string;
  amount: number;
  defaultAccount: boolean;
  acceptsFunds: boolean;
}

export interface EditAccountState {
  name?: string;
  amount?: number;
  defaultAccount?: boolean;
  acceptsFunds?: boolean;
  excludeFromTotal?: boolean;
}

export interface AddTransactionState {
  name: string;
  amount: number;
  sendToAccount: string;
  type: 'bill' | 'savings';
}

export interface EditTransactionState {
  name?: string;
  amount?: number;
  sendToAccount?: string;
  type?: 'bill' | 'savings';
}

export interface EditSalaryState {
  monthlySalary: number;
}

export interface User {
  userInfo: {
    _id: string;
    username: string;
    name: string;
    monthlySalary: number;
    transactions: string[];
    accounts: string[];
  };
  accessToken: string;
}

export interface Account {
  _id: string;
  amount: number;
  defaultAccount: boolean;
  excludeFromTotal: boolean;
  acceptsFunds: boolean;
  name: string;
  user: string;
  __v: number;
}

export interface Transaction {
  _id: string;
  amount: number;
  name: string;
  sendToAccount: string;
  type: 'bill' | 'savings';
  __v: number;
}

export type Accounts = Account[];
