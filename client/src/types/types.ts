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
