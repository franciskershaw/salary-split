import EmptyState from "@/components/layout/EmptyState/EmptyState";
import { Card } from "@/components/ui/card";
import useUser from "@/hooks/user/useUser";
import { cn, formatCurrency } from "@/lib/utils";
import type { AccountWithTransactions } from "@/types/globalTypes";

interface TransactionListProps {
  account: AccountWithTransactions;
  fetchingAccount: boolean;
}

export const TransactionList = ({
  account,
  fetchingAccount, // will eventually use this for a skeleton loader
}: TransactionListProps) => {
  const { user } = useUser();

  console.log(account);
  console.log(fetchingAccount);

  const currentBalance = account?.account.amount;
  const balanceColor =
    currentBalance >= 0
      ? "text-green-600 dark:text-green-400"
      : "text-red-600 dark:text-red-400";

  return (
    <Card className="p-4 gap-4 md:gap-0 md:p-6">
      {/* Balance Header with Actions */}
      <div className="pb-4 md:pb-6 border-b md:mb-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Current Balance</p>
            <p
              className={cn(
                "text-xl md:text-2xl font-bold mt-1 md:mt-2",
                balanceColor
              )}
            >
              {formatCurrency(currentBalance, user?.defaultCurrency)}
            </p>
          </div>
        </div>
      </div>
      <div>
        {!fetchingAccount && !account?.transactions?.length ? (
          <EmptyState
            type="transactions"
            onButtonClick={() => console.log("add transaction")}
          />
        ) : (
          <div>
            {account?.transactions?.map((transaction) => (
              <div key={transaction._id}>{transaction.description}</div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};
