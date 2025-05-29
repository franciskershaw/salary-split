import PageHeader from "@/components/layout/Page/PageHeader";
import PageWrapper from "@/components/layout/Page/PageWrapper";
import { LoadingOverlay } from "@/components/ui/loading-overlay";

import { AccountCard } from "./components/AccountCard";
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
      />
      {!accounts?.length ? (
        <NoAccounts />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {accounts?.map((account) => (
            <AccountCard key={account._id} account={account} />
          ))}
        </div>
      )}
    </PageWrapper>
  );
};

export default Accounts;
