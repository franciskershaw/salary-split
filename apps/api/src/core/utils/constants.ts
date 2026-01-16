// Re-export shared constants
export * from "../../shared";

// Passport
export const GOOGLE_PROVIDER = "google";
export const LOCAL_PROVIDER = "local";

// Cookie
export const REFRESH_TOKEN_COOKIE_NAME = "refreshToken";
export const REFRESH_TOKEN_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  maxAge: 30 * 24 * 60 * 60,
  sameSite: "Strict" as const,
} as const;

// Feature Models for Amount Updates
export const FEATURE_CONFIG = {
  accounts: {
    singular: "account",
    responseKey: "updatedAccount",
  },
  bills: {
    singular: "bill",
    responseKey: "updatedBill",
  },
  expenses: {
    singular: "expense",
    responseKey: "updatedExpense",
  },
  savings: {
    singular: "saving",
    responseKey: "updatedSaving",
  },
} as const;
export type FeatureType = keyof typeof FEATURE_CONFIG;
