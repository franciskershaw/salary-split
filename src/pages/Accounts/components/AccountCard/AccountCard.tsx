import { useState } from "react";

import DeleteDialog from "@/components/layout/Dialogs/DeleteDialog";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, formatCurrency } from "@/lib/utils";
import type { Account } from "@/types/globalTypes";

import { getAccountTypeInfo } from "../../helper/helper";
import useDeleteAccount from "../../hooks/useDeleteAccount";
import CreateAccountDialog from "../CreateAccountDialog/CreateAccountDialog";

type AccountCardProps = {
  account: Account;
  hideDropdown?: boolean;
};

export function AccountCard({ account, hideDropdown }: AccountCardProps) {
  const [editAccountDialogOpen, setEditAccountDialogOpen] = useState(false);
  const [deleteAccountDialogOpen, setDeleteAccountDialogOpen] = useState(false);
  const { name, type, institution, amount } = account;
  const { icon: Icon, colors } = getAccountTypeInfo(type);
  const { deleteAccount, isPending } = useDeleteAccount();

  return (
    <>
      <Card className="p-5 border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all">
        <CardContent className="p-0">
          <div className="flex items-center justify-between mb-4">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                colors.bg,
                colors.text
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
            <span
              className={cn("text-xs px-2 py-1 rounded-full", colors.badge)}
            >
              {getAccountTypeInfo(type).label.split(" ")[0]}
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
                    onSelect={() => setEditAccountDialogOpen(true)}
                  >
                    Edit account
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onSelect={() => setDeleteAccountDialogOpen(true)}
                  >
                    Delete account
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </CardContent>
      </Card>
      <CreateAccountDialog
        account={account}
        open={editAccountDialogOpen}
        onOpenChange={setEditAccountDialogOpen}
      />
      <DeleteDialog
        open={deleteAccountDialogOpen}
        onOpenChange={setDeleteAccountDialogOpen}
        title="Delete Account"
        description={`Are you sure you want to delete ${account.name}? This action cannot be undone.`}
        onDelete={() => {
          deleteAccount(account._id, {
            onSuccess: () => {
              setDeleteAccountDialogOpen(false);
            },
          });
        }}
        isPending={isPending}
      />
    </>
  );
}
