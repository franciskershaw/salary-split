import { useState } from "react";

import { ChevronDown, ChevronUp } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import type { Bill } from "@/types/globalTypes";

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
}: AllocationCardProps) {
  const [open, setOpen] = useState(false);
  const hasBreakdown = bills.length || expenses.length || savings.length;

  return (
    <Card className="flex flex-col shadow-sm hover:shadow-md transition-shadow border">
      <CardContent className="flex flex-col gap-4 p-4">
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
            <button
              className="ml-2 p-1 rounded hover:bg-accent transition-colors md:hidden"
              aria-label={open ? "Hide breakdown" : "Show breakdown"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-primary">
            {formatCurrency(totalAllocated)}
          </span>
          <span className="text-xs text-muted-foreground">allocated</span>
        </div>
        {funneledBalance > 0 && (
          <div className="flex items-center gap-2 mt-1">
            <span className="inline-block bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold px-2 py-1 rounded">
              Unallocated balance: {formatCurrency(funneledBalance)}
            </span>
          </div>
        )}
        {/* Breakdown: always visible on desktop, collapsible on mobile */}
        {hasBreakdown && (
          <div
            className={`transition-all duration-200 ${open ? "block" : "hidden md:block"}`}
          >
            <div className="mt-2 space-y-4">
              {bills.length > 0 && (
                <BreakdownSection title="Bills" items={bills} />
              )}
              {expenses.length > 0 && (
                <BreakdownSection title="Expenses" items={expenses} />
              )}
              {savings.length > 0 && (
                <BreakdownSection title="Savings" items={savings} />
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function BreakdownSection({ title, items }: { title: string; items: Bill[] }) {
  return (
    <div>
      <div className="font-semibold text-base mb-2">{title}</div>
      <ul className="space-y-1">
        {items.map((item) => (
          <li
            key={item._id}
            className="flex items-center justify-between text-base"
          >
            <span className="truncate max-w-[60%]">{item.name}</span>
            <span className="font-medium">{formatCurrency(item.amount)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
