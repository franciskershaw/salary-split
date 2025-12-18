import { ChevronRight } from "lucide-react";

import { Card } from "@/components/ui/card";
import useUser from "@/hooks/user/useUser";
import { cn, formatCurrency } from "@/lib/utils";
import type { Transaction } from "@/types/globalTypes";

interface TransactionItemProps {
  transaction: Transaction;
}

const getTypeStyles = (type: Transaction["type"]) => {
  switch (type) {
    case "income":
      return {
        textColor: "text-green-600 dark:text-green-400",
        bgColor: "bg-green-50 dark:bg-green-950/20",
        borderColor: "border-green-200 dark:border-green-800",
        sign: "+",
      };
    case "expense":
      return {
        textColor: "text-red-600 dark:text-red-400",
        bgColor: "bg-red-50 dark:bg-red-950/20",
        borderColor: "border-red-200 dark:border-red-800",
        sign: "-",
      };
    case "transfer":
      return {
        textColor: "text-blue-600 dark:text-blue-400",
        bgColor: "bg-blue-50 dark:bg-blue-950/20",
        borderColor: "border-blue-200 dark:border-blue-800",
        sign: "→",
      };
  }
};

const formatTransactionDate = (date: Date) => {
  const transactionDate = new Date(date);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Reset time parts for comparison
  today.setHours(0, 0, 0, 0);
  yesterday.setHours(0, 0, 0, 0);
  transactionDate.setHours(0, 0, 0, 0);

  if (transactionDate.getTime() === today.getTime()) {
    return "Today";
  } else if (transactionDate.getTime() === yesterday.getTime()) {
    return "Yesterday";
  } else {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }
};

export const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const { user } = useUser();
  const typeStyles = getTypeStyles(transaction.type);

  // Calculate total transaction amount
  const totalAmount = transaction.splits.reduce(
    (sum, split) => sum + split.amount,
    0
  );

  // For single split, use that category's details
  // For multiple splits, we'll show "Multiple categories"
  const isSingleSplit = transaction.splits.length === 1;
  const hasMultipleSplits = transaction.splits.length > 1;
  const primarySplit = transaction.splits[0];

  return (
    <Card
      className={cn(
        "p-0 hover:shadow-md transition-all cursor-pointer border",
        typeStyles.borderColor
      )}
    >
      <div className="p-4">
        {/* Mobile Layout: Stacked */}
        <div className="md:hidden flex flex-col gap-3">
          {/* Top Row: Icon + Description + Amount */}
          <div className="flex items-start justify-between gap-3">
            {/* Category Icon(s) + Description */}
            <div className="flex items-start gap-3 flex-1 min-w-0">
              {/* Category Icon(s) */}
              <div className="flex-shrink-0">
                {isSingleSplit ? (
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                    style={{
                      backgroundColor: `${primarySplit.category.color}20`,
                      color: primarySplit.category.color,
                    }}
                  >
                    {primarySplit.category.icon}
                  </div>
                ) : (
                  <div className="flex -space-x-2">
                    {transaction.splits.slice(0, 2).map((split, index) => (
                      <div
                        key={split.category._id}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm border-2 border-background"
                        style={{
                          backgroundColor: `${split.category.color}20`,
                          color: split.category.color,
                          zIndex: transaction.splits.length - index,
                        }}
                      >
                        {split.category.icon}
                      </div>
                    ))}
                    {transaction.splits.length > 2 && (
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs border-2 border-background bg-muted text-muted-foreground">
                        +{transaction.splits.length - 2}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Description & Category Name */}
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm leading-tight truncate">
                  {transaction.description}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {isSingleSplit
                    ? primarySplit.category.name
                    : `${transaction.splits.length} categories`}
                </p>
              </div>
            </div>

            {/* Amount */}
            <div className="flex-shrink-0 text-right">
              <p
                className={cn("font-semibold text-base", typeStyles.textColor)}
              >
                {typeStyles.sign}
                {formatCurrency(totalAmount, user?.defaultCurrency)}
              </p>
            </div>
          </div>

          {/* Bottom Row: Date + Type Badge */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">
              {formatTransactionDate(transaction.date)}
            </span>
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "px-2 py-1 rounded-full text-xs font-medium",
                  typeStyles.bgColor,
                  typeStyles.textColor
                )}
              >
                {transaction.type}
              </span>
              {transaction.type === "transfer" &&
                transaction.transferToAccount && (
                  <span className="text-muted-foreground flex items-center gap-1">
                    <ChevronRight className="h-3 w-3" />
                    <span className="truncate max-w-[100px]">
                      {transaction.transferToAccount.name}
                    </span>
                  </span>
                )}
            </div>
          </div>
        </div>

        {/* Desktop Layout: Single Line */}
        <div className="hidden md:flex md:items-center md:gap-4">
          {/* Category Icon(s) */}
          <div className="flex-shrink-0">
            {isSingleSplit ? (
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                style={{
                  backgroundColor: `${primarySplit.category.color}20`,
                  color: primarySplit.category.color,
                }}
              >
                {primarySplit.category.icon}
              </div>
            ) : (
              <div className="flex -space-x-2">
                {transaction.splits.slice(0, 2).map((split, index) => (
                  <div
                    key={split.category._id}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm border-2 border-background"
                    style={{
                      backgroundColor: `${split.category.color}20`,
                      color: split.category.color,
                      zIndex: transaction.splits.length - index,
                    }}
                  >
                    {split.category.icon}
                  </div>
                ))}
                {transaction.splits.length > 2 && (
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs border-2 border-background bg-muted text-muted-foreground">
                    +{transaction.splits.length - 2}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Description & Category */}
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm truncate">
              {transaction.description}
            </h3>
            <p className="text-xs text-muted-foreground">
              {isSingleSplit
                ? primarySplit.category.name
                : transaction.splits.map((s) => s.category.name).join(", ")}
            </p>
          </div>

          {/* Date */}
          <div className="flex-shrink-0 text-sm text-muted-foreground min-w-[100px]">
            {formatTransactionDate(transaction.date)}
          </div>

          {/* Type Badge */}
          <div className="flex-shrink-0">
            <span
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap",
                typeStyles.bgColor,
                typeStyles.textColor
              )}
            >
              {transaction.type}
            </span>
          </div>

          {/* Transfer Destination */}
          {transaction.type === "transfer" && transaction.transferToAccount && (
            <div className="flex-shrink-0 text-xs text-muted-foreground flex items-center gap-1">
              <ChevronRight className="h-3 w-3" />
              <span className="truncate max-w-[150px]">
                {transaction.transferToAccount.name}
              </span>
            </div>
          )}

          {/* Amount */}
          <div className="flex-shrink-0 text-right min-w-[120px]">
            <p className={cn("font-semibold text-base", typeStyles.textColor)}>
              {typeStyles.sign}
              {formatCurrency(totalAmount, user?.defaultCurrency)}
            </p>
          </div>
        </div>

        {/* Desktop: Split Details - Only show when multiple categories */}
        {hasMultipleSplits && (
          <div className="hidden md:block border-t mt-3 pt-3">
            <div className="flex flex-wrap gap-2">
              {transaction.splits.map((split) => (
                <div
                  key={split.category._id}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 text-xs"
                >
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: `${split.category.color}20`,
                      color: split.category.color,
                    }}
                  >
                    {split.category.icon}
                  </span>
                  <span className="font-medium">{split.category.name}</span>
                  <span className="text-muted-foreground">
                    {formatCurrency(split.amount, user?.defaultCurrency)}
                  </span>
                  {split.description && (
                    <span className="text-muted-foreground italic">
                      · {split.description}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
