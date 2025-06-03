import { useState } from "react";

import { Calendar } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatCurrency } from "@/lib/utils";
import type { Bill } from "@/types/globalTypes";

import {
  getBillTypeInfo,
  getDueDateDisplay,
  getSplitInfo,
} from "../../helper/helper";

type BillCardProps = {
  bill: Bill;
  hideDropdown?: boolean;
};

export function BillCard({ bill, hideDropdown }: BillCardProps) {
  const [editBillDialogOpen, setEditBillDialogOpen] = useState(false);
  const [deleteBillDialogOpen, setDeleteBillDialogOpen] = useState(false);
  const { name, amount, dueDate, account, type, splitBetween } = bill;

  const billTypeInfo = getBillTypeInfo(type);
  const splitInfo = getSplitInfo(splitBetween);
  const BillTypeIcon = billTypeInfo.icon;
  const SplitIcon = splitInfo.icon;

  return (
    <>
      <Card className="p-5 border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all">
        <CardContent className="p-0">
          <div className="flex items-center justify-between mb-4">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${billTypeInfo.colors.bg} ${billTypeInfo.colors.text}`}
            >
              <BillTypeIcon className="h-5 w-5" />
            </div>
            <span
              className={`text-xs px-2 py-1 rounded-full ${billTypeInfo.colors.badge}`}
            >
              {billTypeInfo.label}
            </span>
          </div>
          <h3 className="font-medium dark:text-white">{name}</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
            From {account.name}
            {account.institution ? ` (${account.institution})` : ""}
          </p>
          <div className="flex justify-between items-baseline">
            <div>
              <span className="text-2xl font-semibold dark:text-white">
                {formatCurrency(amount)}
              </span>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                <Calendar className="h-4 w-4 mr-1" />
                {getDueDateDisplay(dueDate)}
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
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
              <div
                className={`flex items-center px-2 py-0.5 rounded-full text-xs ${splitInfo.colors.bg} ${splitInfo.colors.text}`}
              >
                <SplitIcon className="h-3 w-3 mr-1" />
                {splitInfo.label}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* TODO: Add EditBillDialog and DeleteBillDialog components */}
      {/* Dialogs will be implemented when backend is ready */}
      {editBillDialogOpen && null}
      {deleteBillDialogOpen && null}
    </>
  );
}
