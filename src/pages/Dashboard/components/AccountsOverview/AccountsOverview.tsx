import { LoadingOverlay } from "@/components/ui/loading-overlay";

import { AccountCard } from "../../../Accounts/components/AccountCard";
import NoAccounts from "../../../Accounts/components/NoAccounts";
import {
  createSummaryAccounts,
  getAccountTypeInfo,
  groupAccountsByType,
} from "../../../Accounts/helper/helper";
import useGetAccounts from "../../../Accounts/hooks/useGetAccounts";

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

  const accountsByType = groupAccountsByType(accounts);
  const summaryAccounts = createSummaryAccounts(
    accountsByType,
    (type) => getAccountTypeInfo(type).label
  );

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Accounts Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryAccounts.map((account) => (
          <AccountCard hideDropdown key={account._id} account={account} />
        ))}
      </div>
    </div>
  );
};

export default AccountsOverview;
