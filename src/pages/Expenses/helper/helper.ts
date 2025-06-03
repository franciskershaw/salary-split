import {
  Clock,
  DollarSign,
  Gift,
  Plane,
  Receipt,
  ShoppingBag,
  Timer,
  TrendingUp,
} from "lucide-react";

import type { BillType } from "@/constants/api";
import type { Bill } from "@/types/globalTypes";

import { getNextDueDate } from "../../Bills/helper/helper";

// Re-export useful functions from Bills helper for convenience
export {
  getBillTypeInfo,
  getDueDateDisplay,
  getNextDueDate,
} from "../../Bills/helper/helper";

/**
 * Get expense-specific display information with distinct visual styling
 */
export const getExpenseDisplayInfo = (expense: Bill) => {
  const nextDueDate = getNextDueDate(expense.dueDate);
  const today = new Date();
  const daysUntilDue = Math.ceil(
    (nextDueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  let urgencyInfo;
  if (daysUntilDue <= 0) {
    urgencyInfo = {
      label: "Due now",
      icon: Clock,
      colors: {
        bg: "bg-red-100 dark:bg-red-900/30",
        text: "text-red-600 dark:text-red-400",
      },
    };
  } else if (daysUntilDue <= 3) {
    urgencyInfo = {
      label: `${daysUntilDue} days left`,
      icon: Timer,
      colors: {
        bg: "bg-orange-100 dark:bg-orange-900/30",
        text: "text-orange-600 dark:text-orange-400",
      },
    };
  } else if (daysUntilDue <= 7) {
    urgencyInfo = {
      label: `${daysUntilDue} days left`,
      icon: Clock,
      colors: {
        bg: "bg-yellow-100 dark:bg-yellow-900/30",
        text: "text-yellow-600 dark:text-yellow-400",
      },
    };
  } else {
    urgencyInfo = {
      label: `${daysUntilDue} days left`,
      icon: Clock,
      colors: {
        bg: "bg-gray-100 dark:bg-gray-900/30",
        text: "text-gray-600 dark:text-gray-400",
      },
    };
  }

  return urgencyInfo;
};

/**
 * Get expense category info with distinct styling from bills
 */
export const getExpenseCategoryInfo = (type: BillType) => {
  // Use a distinct color palette for expenses (warmer tones)
  switch (type) {
    case "housing":
      return {
        label: "Housing",
        icon: ShoppingBag,
        colors: {
          bg: "bg-rose-100 dark:bg-rose-900/30",
          text: "text-rose-600 dark:text-rose-400",
          badge:
            "bg-rose-50 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400",
        },
      };
    case "utilities":
      return {
        label: "Utilities",
        icon: Receipt,
        colors: {
          bg: "bg-teal-100 dark:bg-teal-900/30",
          text: "text-teal-600 dark:text-teal-400",
          badge:
            "bg-teal-50 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400",
        },
      };
    case "communication":
      return {
        label: "Communication",
        icon: DollarSign,
        colors: {
          bg: "bg-fuchsia-100 dark:bg-fuchsia-900/30",
          text: "text-fuchsia-600 dark:text-fuchsia-400",
          badge:
            "bg-fuchsia-50 dark:bg-fuchsia-900/50 text-fuchsia-600 dark:text-fuchsia-400",
        },
      };
    case "entertainment":
      return {
        label: "Entertainment",
        icon: TrendingUp,
        colors: {
          bg: "bg-sky-100 dark:bg-sky-900/30",
          text: "text-sky-600 dark:text-sky-400",
          badge: "bg-sky-50 dark:bg-sky-900/50 text-sky-600 dark:text-sky-400",
        },
      };
    case "transport":
      return {
        label: "Transport",
        icon: ShoppingBag,
        colors: {
          bg: "bg-lime-100 dark:bg-lime-900/30",
          text: "text-lime-600 dark:text-lime-400",
          badge:
            "bg-lime-50 dark:bg-lime-900/50 text-lime-600 dark:text-lime-400",
        },
      };
    case "food":
      return {
        label: "Food",
        icon: Receipt,
        colors: {
          bg: "bg-orange-100 dark:bg-orange-900/30",
          text: "text-orange-600 dark:text-orange-400",
          badge:
            "bg-orange-50 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400",
        },
      };
    case "gift":
      return {
        label: "Gift",
        icon: Gift,
        colors: {
          bg: "bg-purple-100 dark:bg-purple-900/30",
          text: "text-purple-600 dark:text-purple-400",
          badge:
            "bg-purple-50 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400",
        },
      };
    case "holidays":
      return {
        label: "Holidays",
        icon: Plane,
        colors: {
          bg: "bg-blue-100 dark:bg-blue-900/30",
          text: "text-blue-600 dark:text-blue-400",
          badge:
            "bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400",
        },
      };
    default:
      return {
        label: "Other",
        icon: DollarSign,
        colors: {
          bg: "bg-neutral-100 dark:bg-neutral-900/30",
          text: "text-neutral-600 dark:text-neutral-400",
          badge:
            "bg-neutral-50 dark:bg-neutral-900/50 text-neutral-600 dark:text-neutral-400",
        },
      };
  }
};

/**
 * Calculate total expenses by type for filtering/grouping
 */
export const getExpenseTotalByType = (
  expenses: Bill[],
  type: BillType
): number => {
  return expenses
    .filter((expense) => expense.type === type)
    .reduce((total, expense) => total + expense.amount, 0);
};

/**
 * Get unique expense types that actually exist in the data
 */
export const getUniqueExpenseTypes = (expenses?: Bill[]) => {
  if (!expenses?.length) return [];
  return [...new Set(expenses.map((expense) => expense.type))];
};
