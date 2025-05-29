import { Plus } from "lucide-react";

import PageHeader from "@/components/layout/Page/PageHeader";
import PageWrapper from "@/components/layout/Page/PageWrapper";
import { Button } from "@/components/ui/button";
import { LoadingOverlay } from "@/components/ui/loading-overlay";

import { AccountCard } from "./components/AccountCard";
import CreateAccountDialog from "./components/CreateAccountDialog/CreateAccountDialog";
import NoAccounts from "./components/NoAccounts";
import useGetAccounts from "./hooks/useGetAccounts";

const Accounts = () => {
  const { accounts, fetchingAccounts } = useGetAccounts();

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
          <CreateAccountDialog
            trigger={
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4" />
                New
              </Button>
            }
          />
        }
      />
      {!accounts?.length ? (
        <NoAccounts />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {accounts?.map((account) => (
              <AccountCard key={account._id} account={account} />
            ))}
          </div>
        </>
      )}
    </PageWrapper>
  );
};

export default Accounts;
