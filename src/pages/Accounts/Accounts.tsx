import { useState } from "react";

import { ListOrdered, Plus, Settings } from "lucide-react";

import PageHeader from "@/components/layout/Page/PageHeader";
import PageWrapper from "@/components/layout/Page/PageWrapper";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LoadingOverlay } from "@/components/ui/loading-overlay";

import { AccountCard } from "./components/AccountCard";
import CreateAccountDialog from "./components/CreateAccountDialog/CreateAccountDialog";
import NoAccounts from "./components/NoAccounts";
import ReorderAccountsDialog from "./components/ReorderAccountsDialog/ReorderAccountsDialog";
import { TotalBalance } from "./components/TotalBalance/TotalBalance";
import useGetAccounts from "./hooks/useGetAccounts";

const Accounts = () => {
  const { accounts, fetchingAccounts } = useGetAccounts();
  const [newAccountDialogOpen, setNewAccountDialogOpen] = useState(false);
  const [reorderDialogOpen, setReorderDialogOpen] = useState(false);

  if (fetchingAccounts) {
    return (
      <LoadingOverlay
        message="Loading accounts..."
        opacity="light"
        spinnerSize="md"
      />
    );
  }

  return (
    <PageWrapper>
      <PageHeader
        title="Accounts"
        description="Manage your bank accounts and track balances"
        action={
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                <Settings className="w-4 h-4" />
                Actions
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => setNewAccountDialogOpen(true)}>
                <Plus className="w-4 h-4" />
                New Account
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setReorderDialogOpen(true)}>
                <ListOrdered className="w-4 h-4" />
                Reorder accounts
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        }
        secondaryAction={
          accounts?.length ? <TotalBalance accounts={accounts} /> : null
        }
      />
      {!accounts?.length ? (
        <NoAccounts />
      ) : (
        <>
          <div className="lg:hidden">
            <TotalBalance accounts={accounts} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {accounts?.map((account) => (
              <AccountCard key={account._id} account={account} />
            ))}
          </div>
        </>
      )}
      <CreateAccountDialog
        open={newAccountDialogOpen}
        onOpenChange={setNewAccountDialogOpen}
      />
      {accounts && (
        <ReorderAccountsDialog
          open={reorderDialogOpen}
          onOpenChange={setReorderDialogOpen}
          accounts={accounts}
        />
      )}
    </PageWrapper>
  );
};

export default Accounts;
