import EmptyState from "@/components/layout/EmptyState/EmptyState";
import { FeatureCard } from "@/components/layout/FeatureCard/FeatureCard";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { getDisplayInfo } from "@/lib/display-info";

import {
  createSummaryAccounts,
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
    return <EmptyState type="accounts" />;
  }

  const accountsByType = groupAccountsByType(accounts);
  const summaryAccounts = createSummaryAccounts(
    accountsByType,
    (type) => getDisplayInfo("accounts", type, { isSummary: true }).label
  );

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Accounts Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryAccounts.map((account) => (
          <FeatureCard
            feature="accounts"
            item={account}
            secondaryInfo={account.institution}
            renderEditDialog={() => null}
            deleteAction={() => null}
            isDeleting={false}
            key={account._id}
            hideDropdown
          />
        ))}
      </div>
    </div>
  );
};

export default AccountsOverview;
