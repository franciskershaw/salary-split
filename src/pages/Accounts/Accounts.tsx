import { useState } from "react";

import { Plus, Settings } from "lucide-react";

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
import { TotalBalance } from "./components/TotalBalance/TotalBalance";
import useGetAccounts from "./hooks/useGetAccounts";

const Accounts = () => {
  const { accounts, fetchingAccounts } = useGetAccounts();
  const [newAccountDialogOpen, setNewAccountDialogOpen] = useState(false);

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
              <Button className="bg-primary hover:bg-primary/90">
                <Settings className="w-4 h-4" />
                Actions
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => setNewAccountDialogOpen(true)}>
                <Plus className="w-4 h-4" />
                New Account
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        }
      />
      {!accounts?.length ? (
        <NoAccounts />
      ) : (
        <>
          <TotalBalance accounts={accounts} />
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
    </PageWrapper>
  );
};

export default Accounts;
