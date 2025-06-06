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
import {
  FEATURE_ACCOUNTS,
  FEATURE_BILLS,
  FEATURE_EXPENSES,
  FEATURE_SAVINGS,
} from "@/constants/features";
import type { Feature } from "@/types/globalTypes";

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

const getColorSet = (color: string): ColorSet => ({
  bg: `feature-bg-${color}`,
  text: `feature-text-${color}`,
  badge: `feature-badge-${color}`,
});

const accountTypeInfo: Record<AccountType, DisplayInfo> = {
  [ACCOUNT_TYPES.CURRENT]: {
    label: "Current",
    icon: Banknote,
    colors: getColorSet("blue"),
  },
  [ACCOUNT_TYPES.JOINT]: {
    label: "Joint",
    icon: CreditCard,
    colors: getColorSet("green"),
  },
  [ACCOUNT_TYPES.SAVINGS]: {
    label: "Savings",
    icon: PiggyBank,
    colors: getColorSet("purple"),
  },
  [ACCOUNT_TYPES.INVESTMENT]: {
    label: "Investment",
    icon: BarChart,
    colors: getColorSet("amber"),
  },
};

const billTypeInfo: Record<BillType, DisplayInfo> = {
  [BILL_TYPES.HOUSING]: {
    label: "Housing",
    icon: Home,
    colors: getColorSet("blue"),
  },
  [BILL_TYPES.UTILITIES]: {
    label: "Utilities",
    icon: Zap,
    colors: getColorSet("green"),
  },
  [BILL_TYPES.COMMUNICATION]: {
    label: "Communication",
    icon: Phone,
    colors: getColorSet("purple"),
  },
  [BILL_TYPES.ENTERTAINMENT]: {
    label: "Entertainment",
    icon: Film,
    colors: getColorSet("pink"),
  },
  [BILL_TYPES.INSURANCE]: {
    label: "Insurance",
    icon: Shield,
    colors: getColorSet("amber"),
  },
  [BILL_TYPES.TRANSPORT]: {
    label: "Transport",
    icon: Car,
    colors: getColorSet("orange"),
  },
  [BILL_TYPES.FINANCIAL]: {
    label: "Financial",
    icon: Wallet,
    colors: getColorSet("emerald"),
  },
  [BILL_TYPES.HEALTHCARE]: {
    label: "Healthcare",
    icon: Stethoscope,
    colors: getColorSet("red"),
  },
  [BILL_TYPES.BUSINESS]: {
    label: "Business",
    icon: Briefcase,
    colors: getColorSet("indigo"),
  },
  [BILL_TYPES.EDUCATION]: {
    label: "Education",
    icon: GraduationCap,
    colors: getColorSet("cyan"),
  },
  [BILL_TYPES.FOOD]: {
    label: "Food",
    icon: Utensils,
    colors: getColorSet("amber"),
  },
  [BILL_TYPES.PERSONAL]: {
    label: "Personal",
    icon: User,
    colors: getColorSet("violet"),
  },
  [BILL_TYPES.GIFT]: {
    label: "Gift",
    icon: Gift,
    colors: getColorSet("pink"),
  },
  [BILL_TYPES.HOLIDAYS]: {
    label: "Holidays",
    icon: Plane,
    colors: getColorSet("cyan"),
  },
  [BILL_TYPES.OTHER]: {
    label: "Other",
    icon: FileText,
    colors: getColorSet("gray"),
  },
};

export const getDisplayInfo = (
  feature: Feature,
  type?: AccountType | BillType,
  options?: {
    isSummary?: boolean;
  }
): DisplayInfo => {
  let accountInfo: DisplayInfo;

  switch (feature) {
    case FEATURE_ACCOUNTS:
      accountInfo =
        accountTypeInfo[type as AccountType] || accountTypeInfo.current;
      if (options?.isSummary) {
        return {
          ...accountInfo,
          label: `${accountInfo.label} Accounts`,
        };
      }
      return accountInfo;
    case FEATURE_BILLS:
    case FEATURE_EXPENSES:
      return billTypeInfo[type as BillType] || billTypeInfo.other;
    case FEATURE_SAVINGS:
      return {
        label: "Savings",
        icon: PiggyBank,
        colors: getColorSet("purple"),
      };
    default:
      return {
        label: "Item",
        icon: FileText,
        colors: getColorSet("gray"),
      };
  }
};

export const getBillSplitInfo = (splitBetween?: number) => {
  if (!splitBetween || splitBetween === 1) {
    return {
      icon: User,
      label: "Just me",
      colors: getColorSet("slate"),
    };
  }

  return {
    icon: Users,
    label: `${splitBetween} people`,
    colors: getColorSet("slate"),
  };
};
