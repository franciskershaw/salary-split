import {
  Banknote,
  BarChartIcon,
  CreditCardIcon,
  PiggyBankIcon,
} from "lucide-react";

import {
  CURRENT_ACCOUNT,
  INVESTMENT_ACCOUNT,
  JOINT_ACCOUNT,
  SAVINGS_ACCOUNT,
} from "@/constants/api";
import type { Account } from "@/types/globalTypes";

type AccountTypeGroup = Record<Account["type"], Account[]>;

/**
 * Groups accounts by their type
 */
export const groupAccountsByType = (accounts: Account[]): AccountTypeGroup => {
  return accounts.reduce((acc, account) => {
    const type = account.type;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(account);
    return acc;
  }, {} as AccountTypeGroup);
};

/**
 * Creates a summary account for a group of accounts of the same type
 */
export const createSummaryAccount = (
  type: Account["type"],
  accounts: Account[],
  label: string
): Account => {
  const total = accounts.reduce((sum, acc) => sum + acc.amount, 0);
  const institutions = [
    ...new Set(accounts.map((acc) => acc.institution).filter(Boolean)),
  ];

  return {
    _id: `summary-${type}`,
    name: label,
    type,
    institution:
      institutions.slice(0, 2).join(", ") +
      (institutions.length > 2 ? "..." : ""),
    amount: total,
    acceptsFunds: false,
    createdBy: accounts[0].createdBy,
    createdAt: accounts[0].createdAt,
  };
};

/**
 * Transforms grouped accounts into summary accounts
 */
export const createSummaryAccounts = (
  accountsByType: AccountTypeGroup,
  getLabel: (type: Account["type"]) => string
): Account[] => {
  return Object.entries(accountsByType).map(([type, accounts]) =>
    createSummaryAccount(
      type as Account["type"],
      accounts,
      getLabel(type as Account["type"])
    )
  );
};

export const getAccountTypeInfo = (type: Account["type"]) => {
  switch (type) {
    case CURRENT_ACCOUNT:
      return {
        label: "Current Accounts",
        icon: Banknote,
        colors: {
          bg: "bg-blue-100 dark:bg-blue-900/30",
          text: "text-blue-600 dark:text-blue-400",
        },
      };
    case JOINT_ACCOUNT:
      return {
        label: "Joint Accounts",
        icon: CreditCardIcon,
        colors: {
          bg: "bg-green-100 dark:bg-green-900/30",
          text: "text-green-600 dark:text-green-400",
        },
      };
    case SAVINGS_ACCOUNT:
      return {
        label: "Savings Accounts",
        icon: PiggyBankIcon,
        colors: {
          bg: "bg-purple-100 dark:bg-purple-900/30",
          text: "text-purple-600 dark:text-purple-400",
        },
      };
    case INVESTMENT_ACCOUNT:
      return {
        label: "Investment Accounts",
        icon: BarChartIcon,
        colors: {
          bg: "bg-amber-100 dark:bg-amber-900/30",
          text: "text-amber-600 dark:text-amber-400",
        },
      };
  }
};
