import { Card } from "@/components/ui/card";
import { LoadingOverlay } from "@/components/ui/loading-overlay";

import useGetAccounts from "../../../Accounts/hooks/useGetAccounts";
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
    <div>
      <h2 className="text-lg font-semibold">Accounts Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {accounts?.map((account) => (
          <Card key={account._id} className="shadow-md">
            <div className="px-6">
              <h3 className="text-lg font-semibold">{account.name}</h3>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AccountsOverview;
