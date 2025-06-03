import {
  Briefcase,
  Car,
  FileText,
  Film,
  GraduationCap,
  Home,
  Phone,
  Shield,
  Stethoscope,
  User,
  Users,
  Utensils,
  Wallet,
  Zap,
} from "lucide-react";

import type { BillType } from "@/constants/api";
import type { Bill } from "@/types/globalTypes";

/**
 * Calculate the next due date based on the dueDate number (1-31)
 */
export const getNextDueDate = (dueDate: string | number): Date => {
  const dueDateNum = typeof dueDate === "string" ? parseInt(dueDate) : dueDate;
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  // Handle "last day of month" case
  if (dueDateNum === 31) {
    const nextMonth = new Date(currentYear, currentMonth + 1, 0); // Last day of current month
    if (nextMonth.getDate() >= today.getDate()) {
      return nextMonth;
    } else {
      return new Date(currentYear, currentMonth + 2, 0); // Last day of next month
    }
  }

  // Handle specific day of month
  let nextDue = new Date(currentYear, currentMonth, dueDateNum);

  // If the due date has passed this month, move to next month
  if (nextDue < today) {
    nextDue = new Date(currentYear, currentMonth + 1, dueDateNum);
  }

  return nextDue;
};

/**
 * Format due date display with proper ordinal suffixes
 */
export const getDueDateDisplay = (dueDate: string | number): string => {
  const dueDateNum = typeof dueDate === "string" ? parseInt(dueDate) : dueDate;

  if (dueDateNum === 31) {
    return "Last day of month";
  }

  const suffix =
    dueDateNum === 1 || dueDateNum === 21 || dueDateNum === 31
      ? "st"
      : dueDateNum === 2 || dueDateNum === 22
        ? "nd"
        : dueDateNum === 3 || dueDateNum === 23
          ? "rd"
          : "th";

  return `${dueDateNum}${suffix} of month`;
};

export const getBillTypeLabel = (type: string, bills?: Bill[]) => {
  if (!bills) {
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  const billsOfType = bills.filter((bill) => bill.type === type);
  const billNames = billsOfType.map((bill) => bill.name).join(", ");

  const typeLabel = type
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return `${typeLabel} (${billNames})`;
};

export const getUniqueBillTypes = (bills?: Bill[]) => {
  if (!bills?.length) return [];
  return [...new Set(bills.map((bill) => bill.type))];
};

export const getBillTypeInfo = (type: BillType) => {
  switch (type) {
    case "housing":
      return {
        label: "Housing",
        icon: Home,
        colors: {
          bg: "bg-blue-100 dark:bg-blue-900/30",
          text: "text-blue-600 dark:text-blue-400",
          badge:
            "bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400",
        },
      };
    case "utilities":
      return {
        label: "Utilities",
        icon: Zap,
        colors: {
          bg: "bg-green-100 dark:bg-green-900/30",
          text: "text-green-600 dark:text-green-400",
          badge:
            "bg-green-50 dark:bg-green-900/50 text-green-600 dark:text-green-400",
        },
      };
    case "communication":
      return {
        label: "Communication",
        icon: Phone,
        colors: {
          bg: "bg-purple-100 dark:bg-purple-900/30",
          text: "text-purple-600 dark:text-purple-400",
          badge:
            "bg-purple-50 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400",
        },
      };
    case "entertainment":
      return {
        label: "Entertainment",
        icon: Film,
        colors: {
          bg: "bg-pink-100 dark:bg-pink-900/30",
          text: "text-pink-600 dark:text-pink-400",
          badge:
            "bg-pink-50 dark:bg-pink-900/50 text-pink-600 dark:text-pink-400",
        },
      };
    case "insurance":
      return {
        label: "Insurance",
        icon: Shield,
        colors: {
          bg: "bg-yellow-100 dark:bg-yellow-900/30",
          text: "text-yellow-600 dark:text-yellow-400",
          badge:
            "bg-yellow-50 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-400",
        },
      };
    case "transport":
      return {
        label: "Transport",
        icon: Car,
        colors: {
          bg: "bg-orange-100 dark:bg-orange-900/30",
          text: "text-orange-600 dark:text-orange-400",
          badge:
            "bg-orange-50 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400",
        },
      };
    case "financial":
      return {
        label: "Financial",
        icon: Wallet,
        colors: {
          bg: "bg-emerald-100 dark:bg-emerald-900/30",
          text: "text-emerald-600 dark:text-emerald-400",
          badge:
            "bg-emerald-50 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400",
        },
      };
    case "healthcare":
      return {
        label: "Healthcare",
        icon: Stethoscope,
        colors: {
          bg: "bg-red-100 dark:bg-red-900/30",
          text: "text-red-600 dark:text-red-400",
          badge: "bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-400",
        },
      };
    case "business":
      return {
        label: "Business",
        icon: Briefcase,
        colors: {
          bg: "bg-indigo-100 dark:bg-indigo-900/30",
          text: "text-indigo-600 dark:text-indigo-400",
          badge:
            "bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400",
        },
      };
    case "education":
      return {
        label: "Education",
        icon: GraduationCap,
        colors: {
          bg: "bg-cyan-100 dark:bg-cyan-900/30",
          text: "text-cyan-600 dark:text-cyan-400",
          badge:
            "bg-cyan-50 dark:bg-cyan-900/50 text-cyan-600 dark:text-cyan-400",
        },
      };
    case "food":
      return {
        label: "Food",
        icon: Utensils,
        colors: {
          bg: "bg-amber-100 dark:bg-amber-900/30",
          text: "text-amber-600 dark:text-amber-400",
          badge:
            "bg-amber-50 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400",
        },
      };
    case "personal":
      return {
        label: "Personal",
        icon: User,
        colors: {
          bg: "bg-violet-100 dark:bg-violet-900/30",
          text: "text-violet-600 dark:text-violet-400",
          badge:
            "bg-violet-50 dark:bg-violet-900/50 text-violet-600 dark:text-violet-400",
        },
      };
    default:
      return {
        label: "Other",
        icon: FileText,
        colors: {
          bg: "bg-gray-100 dark:bg-gray-900/30",
          text: "text-gray-600 dark:text-gray-400",
          badge:
            "bg-gray-50 dark:bg-gray-900/50 text-gray-600 dark:text-gray-400",
        },
      };
  }
};

export const getSplitInfo = (splitBetween?: number) => {
  if (!splitBetween || splitBetween === 1) {
    return {
      icon: User,
      label: "Just me",
      colors: {
        bg: "bg-slate-100 dark:bg-slate-900/30",
        text: "text-slate-600 dark:text-slate-400",
      },
    };
  }

  return {
    icon: Users,
    label: `${splitBetween} people`,
    colors: {
      bg: "bg-slate-100 dark:bg-slate-900/30",
      text: "text-slate-600 dark:text-slate-400",
    },
  };
};
