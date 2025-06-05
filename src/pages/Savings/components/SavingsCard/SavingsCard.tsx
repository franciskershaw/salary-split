import { useState } from "react";

import { PiggyBank } from "lucide-react";

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

import useDeleteSavings from "../../hooks/useDeleteSavings";
import CreateSavingsDialog from "../CreateSavingsDialog/CreateSavingsDialog";

type SavingsCardProps = {
  savings: Bill;
  hideDropdown?: boolean;
};

export function SavingsCard({ savings, hideDropdown }: SavingsCardProps) {
  const [editSavingsDialogOpen, setEditSavingsDialogOpen] = useState(false);
  const [deleteSavingsDialogOpen, setDeleteSavingsDialogOpen] = useState(false);
  const { name, amount, account } = savings;
  const { deleteSavings, isPending } = useDeleteSavings();

  return (
    <>
      <Card className="p-5 border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all group">
        <CardContent className="p-0">
          <div className="flex items-center justify-between mb-4">
            <div
              className={
                "w-10 h-10 rounded-full flex items-center justify-center bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
              }
            >
              <PiggyBank className="h-5 w-5" />
            </div>
            <span
              className={`text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400`}
            >
              Savings
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
                      onSelect={() => setEditSavingsDialogOpen(true)}
                    >
                      Edit savings
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onSelect={() => setDeleteSavingsDialogOpen(true)}
                    >
                      Delete savings
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      <CreateSavingsDialog
        savings={savings}
        open={editSavingsDialogOpen}
        onOpenChange={setEditSavingsDialogOpen}
      />
      <DeleteDialog
        open={deleteSavingsDialogOpen}
        onOpenChange={setDeleteSavingsDialogOpen}
        title="Delete Savings"
        description={`Are you sure you want to delete ${savings.name}? This savings goal will no longer contribute to your salary allocation.`}
        onDelete={() => {
          deleteSavings(savings._id, {
            onSuccess: () => {
              setDeleteSavingsDialogOpen(false);
            },
          });
        }}
        isPending={isPending}
      />
    </>
  );
}
