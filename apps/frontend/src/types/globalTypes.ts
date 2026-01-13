import {
  FEATURE_ACCOUNTS,
  FEATURE_BILLS,
  FEATURE_EXPENSES,
  FEATURE_SAVINGS,
} from "@/constants/features";

// Re-export shared response types and constants
export type {
  AccountResponse as Account,
  BillResponse as Bill,
  ExpenseResponse as Expense,
  SavingsResponse as Savings,
  UserResponse as User,
  AccountFilter,
  BillFilter,
  Currency,
} from "@salary-split/shared";

export type Feature =
  | typeof FEATURE_ACCOUNTS
  | typeof FEATURE_BILLS
  | typeof FEATURE_EXPENSES
  | typeof FEATURE_SAVINGS;
