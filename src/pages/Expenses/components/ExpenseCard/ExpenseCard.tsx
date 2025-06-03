import { useState } from "react";

import { Calendar, Trash2 } from "lucide-react";

import DeleteDialog from "@/components/layout/Dialogs/DeleteDialog";
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
  getDueDateDisplay,
  getExpenseCategoryInfo,
  getExpenseDisplayInfo,
} from "../../helper/helper";
import useDeleteExpense from "../../hooks/useDeleteExpense";
import CreateExpenseDialog from "../CreateExpenseDialog/CreateExpenseDialog";

type ExpenseCardProps = {
  expense: Bill;
  hideDropdown?: boolean;
};

export function ExpenseCard({ expense, hideDropdown }: ExpenseCardProps) {
  const [editExpenseDialogOpen, setEditExpenseDialogOpen] = useState(false);
  const [deleteExpenseDialogOpen, setDeleteExpenseDialogOpen] = useState(false);
  const { name, amount, dueDate, account, type } = expense;
  const { deleteExpense, isPending } = useDeleteExpense();
  const categoryInfo = getExpenseCategoryInfo(type);
  const urgencyInfo = getExpenseDisplayInfo(expense);
  const CategoryIcon = categoryInfo.icon;
  const UrgencyIcon = urgencyInfo.icon;

  return (
    <>
      <Card className="p-5 border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all group">
        <CardContent className="p-0">
          <div className="flex items-center justify-between mb-4">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${categoryInfo.colors.bg} ${categoryInfo.colors.text}`}
            >
              <CategoryIcon className="h-5 w-5" />
            </div>
            <span
              className={`text-xs px-2 py-1 rounded-full ${categoryInfo.colors.badge}`}
            >
              {categoryInfo.label}
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
                      onSelect={() => setEditExpenseDialogOpen(true)}
                    >
                      Edit expense
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onSelect={() => setDeleteExpenseDialogOpen(true)}
                    >
                      Delete expense
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              <div
                className={`flex items-center px-2 py-0.5 rounded-full text-xs ${urgencyInfo.colors.bg} ${urgencyInfo.colors.text}`}
              >
                <UrgencyIcon className="h-3 w-3 mr-1" />
                {urgencyInfo.label}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <CreateExpenseDialog
        expense={expense}
        open={editExpenseDialogOpen}
        onOpenChange={setEditExpenseDialogOpen}
      />
      <DeleteDialog
        open={deleteExpenseDialogOpen}
        onOpenChange={setDeleteExpenseDialogOpen}
        title="Delete Expense"
        description={`Are you sure you want to delete ${expense.name}? This expense will no longer contribute to your salary allocation.`}
        onDelete={() => {
          deleteExpense(expense._id, {
            onSuccess: () => {
              setDeleteExpenseDialogOpen(false);
            },
          });
        }}
        isPending={isPending}
      />
    </>
  );
}
