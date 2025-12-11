import { useParams } from "react-router-dom";

import PageWrapper from "@/components/layout/Page/PageWrapper";

import { TransactionList } from "./components/TransactionList";
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
      <TransactionList account={account} fetchingAccount={fetchingAccount} />
    </PageWrapper>
  );
};

export default AccountTransactions;
