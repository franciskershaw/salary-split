import EmptyState from "@/components/layout/EmptyState/EmptyState";
import { FeatureCard } from "@/components/layout/FeatureCard/FeatureCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <Card className="flex flex-col gap-2 py-4">
      <CardHeader>
        <CardTitle className="text-xl">Accounts Overview</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
      </CardContent>
    </Card>
  );
};

export default AccountsOverview;
