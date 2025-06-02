import { useState } from "react";

import PageWrapper from "@/components/layout/Page/PageWrapper";
import { LoadingOverlay } from "@/components/ui/loading-overlay";

import { AccountCard } from "./components/AccountCard/AccountCard";
import CreateAccountDialog from "./components/CreateAccountDialog/CreateAccountDialog";
import NoAccounts from "./components/NoAccounts/NoAccounts";
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
    <PageWrapper
      title="Accounts"
      description="Manage your bank accounts and track balances"
      openCreateDialog={() => setNewAccountDialogOpen(true)}
      openReorderDialog={() => setReorderDialogOpen(true)}
      totalComponent={
        accounts?.length ? <TotalBalance accounts={accounts} /> : null
      }
    >
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
