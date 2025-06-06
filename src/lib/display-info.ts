import {
  Banknote,
  BarChart,
  Briefcase,
  Car,
  CreditCard,
  FileText,
  Film,
  Gift,
  GraduationCap,
  Home,
  Phone,
  PiggyBank,
  Plane,
  Shield,
  Stethoscope,
  User,
  Users,
  Utensils,
  Wallet,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { ACCOUNT_TYPES, BILL_TYPES } from "@/constants/api";
import type { AccountType, BillType } from "@/constants/api";

type ColorSet = {
  bg: string;
  text: string;
  badge: string;
};

type DisplayInfo = {
  label: string;
  icon: LucideIcon;
  colors: ColorSet;
};

const colors: Record<string, ColorSet> = {
  blue: {
    bg: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-600 dark:text-blue-400",
    badge: "bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400",
  },
  green: {
    bg: "bg-green-100 dark:bg-green-900/30",
    text: "text-green-600 dark:text-green-400",
    badge:
      "bg-green-50 dark:bg-green-900/50 text-green-600 dark:text-green-400",
  },
  purple: {
    bg: "bg-purple-100 dark:bg-purple-900/30",
    text: "text-purple-600 dark:text-purple-400",
    badge:
      "bg-purple-50 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400",
  },
  amber: {
    bg: "bg-amber-100 dark:bg-amber-900/30",
    text: "text-amber-600 dark:text-amber-400",
    badge:
      "bg-amber-50 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400",
  },
  pink: {
    bg: "bg-pink-100 dark:bg-pink-900/30",
    text: "text-pink-600 dark:text-pink-400",
    badge: "bg-pink-50 dark:bg-pink-900/50 text-pink-600 dark:text-pink-400",
  },
  orange: {
    bg: "bg-orange-100 dark:bg-orange-900/30",
    text: "text-orange-600 dark:text-orange-400",
    badge:
      "bg-orange-50 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400",
  },
  emerald: {
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    text: "text-emerald-600 dark:text-emerald-400",
    badge:
      "bg-emerald-50 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400",
  },
  red: {
    bg: "bg-red-100 dark:bg-red-900/30",
    text: "text-red-600 dark:text-red-400",
    badge: "bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-400",
  },
  indigo: {
    bg: "bg-indigo-100 dark:bg-indigo-900/30",
    text: "text-indigo-600 dark:text-indigo-400",
    badge:
      "bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400",
  },
  cyan: {
    bg: "bg-cyan-100 dark:bg-cyan-900/30",
    text: "text-cyan-600 dark:text-cyan-400",
    badge: "bg-cyan-50 dark:bg-cyan-900/50 text-cyan-600 dark:text-cyan-400",
  },
  violet: {
    bg: "bg-violet-100 dark:bg-violet-900/30",
    text: "text-violet-600 dark:text-violet-400",
    badge:
      "bg-violet-50 dark:bg-violet-900/50 text-violet-600 dark:text-violet-400",
  },
  gray: {
    bg: "bg-gray-100 dark:bg-gray-900/30",
    text: "text-gray-600 dark:text-gray-400",
    badge: "bg-gray-50 dark:bg-gray-900/50 text-gray-600 dark:text-gray-400",
  },
  slate: {
    bg: "bg-slate-100 dark:bg-slate-900/30",
    text: "text-slate-600 dark:text-slate-400",
    badge:
      "bg-slate-50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400",
  },
};

const accountTypeInfo: Record<AccountType, DisplayInfo> = {
  [ACCOUNT_TYPES.CURRENT]: {
    label: "Current",
    icon: Banknote,
    colors: colors.blue,
  },
  [ACCOUNT_TYPES.JOINT]: {
    label: "Joint",
    icon: CreditCard,
    colors: colors.green,
  },
  [ACCOUNT_TYPES.SAVINGS]: {
    label: "Savings",
    icon: PiggyBank,
    colors: colors.purple,
  },
  [ACCOUNT_TYPES.INVESTMENT]: {
    label: "Investment",
    icon: BarChart,
    colors: colors.amber,
  },
};

const billTypeInfo: Record<BillType, DisplayInfo> = {
  [BILL_TYPES.HOUSING]: { label: "Housing", icon: Home, colors: colors.blue },
  [BILL_TYPES.UTILITIES]: {
    label: "Utilities",
    icon: Zap,
    colors: colors.green,
  },
  [BILL_TYPES.COMMUNICATION]: {
    label: "Communication",
    icon: Phone,
    colors: colors.purple,
  },
  [BILL_TYPES.ENTERTAINMENT]: {
    label: "Entertainment",
    icon: Film,
    colors: colors.pink,
  },
  [BILL_TYPES.INSURANCE]: {
    label: "Insurance",
    icon: Shield,
    colors: colors.amber,
  },
  [BILL_TYPES.TRANSPORT]: {
    label: "Transport",
    icon: Car,
    colors: colors.orange,
  },
  [BILL_TYPES.FINANCIAL]: {
    label: "Financial",
    icon: Wallet,
    colors: colors.emerald,
  },
  [BILL_TYPES.HEALTHCARE]: {
    label: "Healthcare",
    icon: Stethoscope,
    colors: colors.red,
  },
  [BILL_TYPES.BUSINESS]: {
    label: "Business",
    icon: Briefcase,
    colors: colors.indigo,
  },
  [BILL_TYPES.EDUCATION]: {
    label: "Education",
    icon: GraduationCap,
    colors: colors.cyan,
  },
  [BILL_TYPES.FOOD]: { label: "Food", icon: Utensils, colors: colors.amber },
  [BILL_TYPES.PERSONAL]: {
    label: "Personal",
    icon: User,
    colors: colors.violet,
  },
  [BILL_TYPES.GIFT]: {
    label: "Gift",
    icon: Gift,
    colors: colors.pink,
  },
  [BILL_TYPES.HOLIDAYS]: {
    label: "Holidays",
    icon: Plane,
    colors: colors.cyan,
  },
  [BILL_TYPES.OTHER]: { label: "Other", icon: FileText, colors: colors.gray },
};

export const getDisplayInfo = (
  feature: "account" | "bill" | "expense" | "savings",
  type?: AccountType | BillType,
  options?: {
    isSummary?: boolean;
  }
): DisplayInfo => {
  let accountInfo: DisplayInfo;

  switch (feature) {
    case "account":
      accountInfo =
        accountTypeInfo[type as AccountType] || accountTypeInfo.current;
      if (options?.isSummary) {
        return {
          ...accountInfo,
          label: `${accountInfo.label} Accounts`,
        };
      }
      return accountInfo;
    case "bill":
    case "expense":
      return billTypeInfo[type as BillType] || billTypeInfo.other;
    case "savings":
      return {
        label: "Savings",
        icon: PiggyBank,
        colors: colors.purple,
      };
    default:
      return {
        label: "Item",
        icon: FileText,
        colors: colors.gray,
      };
  }
};

export const getBillSplitInfo = (splitBetween?: number) => {
  if (!splitBetween || splitBetween === 1) {
    return {
      icon: User,
      label: "Just me",
      colors: colors.slate,
    };
  }

  return {
    icon: Users,
    label: `${splitBetween} people`,
    colors: colors.slate,
  };
};
