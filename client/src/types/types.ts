export type PageType = 'login' | 'register';

export interface LoginFormData {
  username: string;
  password: string;
}

export interface RegisterFormData extends LoginFormData {
  name: string;
  monthlySalary: number | string;
}

export interface RegisterFormState extends RegisterFormData {
  confirmPassword: string;
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
