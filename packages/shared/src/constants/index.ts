// Account Types
export const ACCOUNT_TYPES = {
  CURRENT: "current",
  SAVINGS: "savings",
  INVESTMENT: "investment",
  JOINT: "joint",
} as const;
export type AccountType = (typeof ACCOUNT_TYPES)[keyof typeof ACCOUNT_TYPES];

// Bill Types
export const BILL_TYPES = {
  HOUSING: "housing",
  UTILITIES: "utilities",
  COMMUNICATION: "communication",
  ENTERTAINMENT: "entertainment",
  INSURANCE: "insurance",
  TRANSPORT: "transport",
  FINANCIAL: "financial",
  HEALTHCARE: "healthcare",
  BUSINESS: "business",
  EDUCATION: "education",
  FOOD: "food",
  PERSONAL: "personal",
  GIFT: "gift",
  HOLIDAYS: "holidays",
  OTHER: "other",
} as const;
export type BillType = (typeof BILL_TYPES)[keyof typeof BILL_TYPES];

// Currencies
export const CURRENCIES = {
  GBP: "GBP",
  USD: "USD",
  EUR: "EUR",
} as const;
export type Currency = (typeof CURRENCIES)[keyof typeof CURRENCIES];
