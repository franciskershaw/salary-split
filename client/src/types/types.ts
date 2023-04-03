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
  excludeFromTotal: boolean;
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
  token: string;
}
