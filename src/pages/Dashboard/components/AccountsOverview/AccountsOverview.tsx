import { LoadingOverlay } from "@/components/ui/loading-overlay";

import useGetAccounts from "../../../Accounts/hooks/useGetAccounts";
import { AccountCard } from "./AccountCard";
import NoAccounts from "./NoAccounts";

const AccountsOverview = () => {
  const { accounts, fetchingAccounts } = useGetAccounts();

  if (fetchingAccounts)
    return (
      <LoadingOverlay
        message="Loading accounts..."
        opacity="light"
        spinnerSize="md"
      />
    );

  if (!accounts?.length) {
    return <NoAccounts />;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Accounts Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {accounts?.map((account) => (
          <AccountCard key={account._id} account={account} />
        ))}
      </div>
    </div>
  );
};

export default AccountsOverview;
