import { useState } from "react";

import { ChevronDown, ShoppingBasket, TrendingUp, Users } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import useUser from "@/hooks/user/useUser";
import { getDisplayInfo } from "@/lib/display-info";
import { formatCurrency } from "@/lib/utils";
import type { Bill, Feature } from "@/types/globalTypes";

interface AllocationCardProps {
  account: {
    name: string;
    institution?: string;
    type: string;
  };
  totalAllocated: number;
  icon: React.ReactNode;
  iconBg: string;
  iconText: string;
  bills: Bill[];
  expenses: Bill[];
  savings: Bill[];
  funneledBalance?: number;
  targetAmountDifference?: number;
  targetSplitBetween?: number;
}

export default function AllocationCard({
  account,
  totalAllocated,
  icon,
  iconBg,
  iconText,
  bills,
  expenses,
  savings,
  funneledBalance = 0,
  targetAmountDifference,
  targetSplitBetween,
}: AllocationCardProps) {
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  const hasBreakdown =
    bills.length ||
    expenses.length ||
    savings.length ||
    (targetAmountDifference !== undefined && targetAmountDifference !== 0);

  return (
    <Card
      className="flex flex-col shadow-sm hover:shadow-md transition-shadow border cursor-pointer md:cursor-default p-2"
      onClick={hasBreakdown ? () => setOpen((v) => !v) : undefined}
    >
      <CardContent className="flex flex-col gap-3 md:gap-4 p-3 md:p-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${iconBg} ${iconText}`}
          >
            {icon}
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-medium truncate text-lg">{account.name}</p>
            {account.institution && (
              <p className="text-xs text-muted-foreground truncate">
                {account.institution}
              </p>
            )}
          </div>
          {hasBreakdown && (
            <div className="ml-2 md:hidden">
              <ChevronDown
                className={`h-5 w-5 transition-transform duration-300 ease-in-out ${
                  open ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>
          )}
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold">
            {formatCurrency(totalAllocated, user?.defaultCurrency)}
          </span>
          <span className="text-xs text-muted-foreground">allocated</span>
        </div>

        {/* Breakdown: always visible on desktop, collapsible on mobile */}
        {(hasBreakdown || funneledBalance > 0) && (
          <div
            className={`
              transition-all duration-500 ease-in-out
              grid md:block
              ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
              md:grid-rows-none md:opacity-100
            `}
          >
            <div className="overflow-hidden">
              <div className="pt-4 mt-4 border-t space-y-4">
                {bills.length > 0 && (
                  <BreakdownSection
                    title="Bills"
                    items={bills}
                    feature="bills"
                  />
                )}
                {expenses.length > 0 && (
                  <BreakdownSection
                    title="Expenses"
                    items={expenses}
                    feature="expenses"
                  />
                )}
                {savings.length > 0 && (
                  <BreakdownSection
                    title="Savings"
                    items={savings}
                    feature="savings"
                  />
                )}
                {targetAmountDifference !== undefined && targetAmountDifference !== 0 && (
                  <div>
                    <div className="font-semibold text-base mb-2">
                      {targetAmountDifference > 0 ? "Target Top-up" : "Over Budget"}
                    </div>
                    <ul className="space-y-2">
                      <BreakdownItem
                        icon={TrendingUp}
                        iconClassName={targetAmountDifference > 0 ? "text-primary" : "text-destructive"}
                        label={targetAmountDifference > 0 ? "Additional Amount" : "Amount Over Target"}
                        amount={Math.abs(targetAmountDifference)}
                        splitBetween={targetSplitBetween}
                      />
                    </ul>
                  </div>
                )}
                {funneledBalance > 0 && (
                  <div>
                    <div className="font-semibold text-base mb-2">
                      Spending Money
                    </div>
                    <ul className="space-y-2">
                      <BreakdownItem
                        icon={ShoppingBasket}
                        iconClassName="text-success"
                        label="Available to Spend"
                        amount={funneledBalance}
                      />
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function BreakdownItem({
  icon: Icon,
  iconClassName,
  label,
  amount,
  splitBetween,
}: {
  icon: React.ElementType;
  iconClassName: string;
  label: string;
  amount: number;
  splitBetween?: number;
}) {
  const isSplit = splitBetween && splitBetween > 1;
  const { user } = useUser();

  return (
    <li className="flex items-center justify-between text-base">
      <div className="flex items-center gap-2 truncate max-w-[70%]">
        <Icon className={`h-5 w-5 ${iconClassName} flex-shrink-0`} />
        <span className="truncate">{label}</span>
        {isSplit && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
            <Users className="h-3 w-3" />
            <span>{splitBetween}</span>
          </div>
        )}
      </div>
      <span className="font-medium">
        {formatCurrency(amount, user?.defaultCurrency)}
      </span>
    </li>
  );
}

function BreakdownSection({
  title,
  items,
  feature,
}: {
  title: string;
  items: Bill[];
  feature: Feature;
}) {
  return (
    <div>
      <div className="font-semibold text-base mb-2">{title}</div>
      <ul className="space-y-2">
        {items.map((item) => {
          const display = getDisplayInfo(feature, item.type);

          return (
            <BreakdownItem
              key={item._id}
              icon={display.icon}
              iconClassName={display.colors.text}
              label={item.name}
              amount={item.amount}
              splitBetween={item.splitBetween}
            />
          );
        })}
      </ul>
    </div>
  );
}
