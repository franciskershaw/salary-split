import { useParams } from "react-router-dom";

import PageWrapper from "@/components/layout/Page/PageWrapper";

import useGetAccount from "./hooks/useGeAccount";

const AccountTransactions = () => {
  const { accountId } = useParams();
  const { account, fetchingAccount } = useGetAccount(accountId as string);

  return (
    <PageWrapper
      title={account?.account.name ?? "Account Transactions"}
      isLoading={fetchingAccount}
      loadingMessage="Fetching account..."
    >
      <div>AccountTransactions</div>
    </PageWrapper>
  );
};

export default AccountTransactions;
