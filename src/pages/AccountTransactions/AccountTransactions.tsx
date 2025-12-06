import { useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import PageWrapper from "@/components/layout/Page/PageWrapper";
import useGetAccounts from "@/pages/Accounts/hooks/useGetAccounts";

const AccountTransactions = () => {
  const { accountId } = useParams<{ accountId: string }>();
  const navigate = useNavigate();
  const { accounts, fetchingAccounts } = useGetAccounts();

  const account = accounts?.find((acc) => acc._id === accountId);

  useEffect(() => {
    if (!fetchingAccounts && (!account || !account.trackTransactions)) {
      navigate("/accounts", { replace: true });
    }
  }, [account, fetchingAccounts, navigate]);

  if (!account || !account.trackTransactions) {
    return null;
  }

  return (
    <PageWrapper
      title={`${account.name} Transactions`}
      description={`Transaction history for ${account.name}${account.institution ? ` - ${account.institution}` : ""}`}
      isLoading={fetchingAccounts}
      loadingMessage="Loading account transactions..."
      itemsCount={0}
    >
      <div className="space-y-6">
        {/* Placeholder content - to be implemented */}
        <div className="rounded-lg border border-border p-8 text-center">
          <h3 className="text-lg font-medium mb-2">Transaction History</h3>
          <p className="text-muted-foreground">
            Transaction tracking is enabled for this account. Transaction
            history will be displayed here.
          </p>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>
              Starting Balance:{" "}
              <span className="font-semibold">
                £{account.trackTransactions.balance.toFixed(2)}
              </span>
            </p>
            <p>
              Tracking Since:{" "}
              <span className="font-semibold">
                {new Date(account.trackTransactions.timestamp).toLocaleString()}
              </span>
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default AccountTransactions;
