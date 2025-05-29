import {
  Banknote,
  BarChartIcon,
  CreditCardIcon,
  PiggyBankIcon,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import {
  CURRENT_ACCOUNT,
  INVESTMENT_ACCOUNT,
  JOINT_ACCOUNT,
  SAVINGS_ACCOUNT,
} from "@/constants/api";
import { cn, formatCurrency } from "@/lib/utils";
import type { Account } from "@/types/globalTypes";

type AccountCardProps = {
  account: Account;
};

const getAccountIcon = (type: Account["type"]) => {
  switch (type) {
    case CURRENT_ACCOUNT:
      return <Banknote className="h-5 w-5" />;
    case JOINT_ACCOUNT:
      return <CreditCardIcon className="h-5 w-5" />;
    case SAVINGS_ACCOUNT:
      return <PiggyBankIcon className="h-5 w-5" />;
    case INVESTMENT_ACCOUNT:
      return <BarChartIcon className="h-5 w-5" />;
  }
};

const getAccountColors = (type: Account["type"]) => {
  switch (type) {
    case CURRENT_ACCOUNT:
      return {
        bg: "bg-blue-100 dark:bg-blue-900/30",
        text: "text-blue-600 dark:text-blue-400",
        badge:
          "bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400",
      };
    case JOINT_ACCOUNT:
      return {
        bg: "bg-green-100 dark:bg-green-900/30",
        text: "text-green-600 dark:text-green-400",
        badge:
          "bg-green-50 dark:bg-green-900/50 text-green-600 dark:text-green-400",
      };
    case SAVINGS_ACCOUNT:
      return {
        bg: "bg-purple-100 dark:bg-purple-900/30",
        text: "text-purple-600 dark:text-purple-400",
        badge:
          "bg-purple-50 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400",
      };
    case INVESTMENT_ACCOUNT:
      return {
        bg: "bg-amber-100 dark:bg-amber-900/30",
        text: "text-amber-600 dark:text-amber-400",
        badge:
          "bg-amber-50 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400",
      };
  }
};

const getAccountTypeLabel = (type: Account["type"]) => {
  switch (type) {
    case CURRENT_ACCOUNT:
      return "Current";
    case JOINT_ACCOUNT:
      return "Joint";
    case SAVINGS_ACCOUNT:
      return "Savings";
    case INVESTMENT_ACCOUNT:
      return "Investment";
  }
};

export function AccountCard({ account }: AccountCardProps) {
  const { name, type, institution, amount } = account;
  const { bg, text, badge } = getAccountColors(type);
  const icon = getAccountIcon(type);

  return (
    <Card className="p-5 border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all">
      <CardContent className="p-0">
        <div className="flex items-center justify-between mb-4">
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center",
              bg,
              text
            )}
          >
            {icon}
          </div>
          <span className={cn("text-xs px-2 py-1 rounded-full", badge)}>
            {getAccountTypeLabel(type)}
          </span>
        </div>
        <h3 className="font-medium dark:text-white">{name}</h3>
        {institution && (
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
            {institution}
          </p>
        )}
        <div className="flex justify-between items-baseline">
          <div>
            <span className="text-2xl font-semibold dark:text-white">
              {formatCurrency(amount)}
            </span>
          </div>
          <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
            </svg>
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
