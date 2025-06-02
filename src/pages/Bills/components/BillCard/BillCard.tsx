import { useState } from "react";

import { Calendar, Receipt } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, formatCurrency } from "@/lib/utils";
import type { Bill } from "@/types/globalTypes";

type BillCardProps = {
  bill: Bill;
  hideDropdown?: boolean;
};

export function BillCard({ bill, hideDropdown }: BillCardProps) {
  const [editBillDialogOpen, setEditBillDialogOpen] = useState(false);
  const [deleteBillDialogOpen, setDeleteBillDialogOpen] = useState(false);
  const { name, amount, dueDate, accountName } = bill;

  // Calculate days until due
  const daysUntilDue = Math.ceil(
    (new Date(dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  // Determine status color based on days until due
  const getStatusColor = () => {
    if (daysUntilDue < 0) return "text-red-600 dark:text-red-400";
    if (daysUntilDue <= 3) return "text-amber-600 dark:text-amber-400";
    return "text-green-600 dark:text-green-400";
  };

  return (
    <>
      <Card className="p-5 border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all">
        <CardContent className="p-0">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
              <Receipt className="h-5 w-5" />
            </div>
            <span
              className={cn("text-xs px-2 py-1 rounded-full", getStatusColor())}
            >
              {daysUntilDue < 0
                ? "Overdue"
                : daysUntilDue === 0
                  ? "Due Today"
                  : `${daysUntilDue} days left`}
            </span>
          </div>
          <h3 className="font-medium dark:text-white">{name}</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
            From {accountName}
          </p>
          <div className="flex justify-between items-baseline">
            <div>
              <span className="text-2xl font-semibold dark:text-white">
                {formatCurrency(amount)}
              </span>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(dueDate).toLocaleDateString()}
              </div>
            </div>
            {!hideDropdown && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="cursor-pointer text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
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
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onSelect={() => setEditBillDialogOpen(true)}
                  >
                    Edit bill
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onSelect={() => setDeleteBillDialogOpen(true)}
                  >
                    Delete bill
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </CardContent>
      </Card>
      {/* TODO: Add EditBillDialog and DeleteBillDialog components */}
    </>
  );
}
