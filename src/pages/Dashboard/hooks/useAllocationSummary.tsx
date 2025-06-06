import { useMemo } from "react";

import useUser from "@/hooks/user/useUser";
import type { Account, Bill } from "@/types/globalTypes";

import useGetAccounts from "../../Accounts/hooks/useGetAccounts";
import useGetBills from "../../Bills/hooks/useGetBills";
import useGetExpenses from "../../Expenses/hooks/useGetExpenses";
import useGetSavings from "../../Savings/hooks/useGetSavings";

type Allocation = {
  account: Account;
  bills: Bill[];
  expenses: Bill[];
  savings: Bill[];
  totalAllocated: number;
};

const useAllocationSummary = () => {
  const { accounts } = useGetAccounts();
  const { bills } = useGetBills();
  const { expenses } = useGetExpenses();
  const { savings } = useGetSavings();
  const { user } = useUser();

  const { allocation, remainingBalance } = useMemo(() => {
    const calculateAccountAllocation = (account: Account): Allocation => {
      const accountBills = bills.filter(
        (bill) => bill.account._id === account._id
      );
      const accountExpenses = expenses.filter(
        (expense) => expense.account._id === account._id
      );
      const accountSavings = savings.filter(
        (saving) => saving.account._id === account._id
      );

      const totalAllocated =
        accountBills.reduce(
          (sum, bill) => sum + bill.amount / (bill.splitBetween || 1),
          0
        ) +
        accountExpenses.reduce((sum, expense) => sum + expense.amount, 0) +
        accountSavings.reduce((sum, saving) => sum + saving.amount, 0);

      return {
        account,
        bills: accountBills,
        expenses: accountExpenses,
        savings: accountSavings,
        totalAllocated,
      };
    };

    const allocations = accounts.map(calculateAccountAllocation);
    const totalAllocated = allocations.reduce(
      (sum, { totalAllocated }) => sum + totalAllocated,
      0
    );
    const remainingBalance = (user?.takeHomePay ?? 0) - totalAllocated;

    if (user?.defaultAccount && remainingBalance > 0) {
      const defaultAllocation = allocations.find(
        (allocation) => allocation.account._id === user.defaultAccount
      );

      if (defaultAllocation) {
        defaultAllocation.totalAllocated += remainingBalance;
      } else {
        const defaultAccount = accounts.find(
          (account) => account._id === user.defaultAccount
        );
        if (defaultAccount) {
          allocations.push({
            account: defaultAccount,
            bills: [],
            expenses: [],
            savings: [],
            totalAllocated: remainingBalance,
          });
        }
      }
    }

    return {
      allocation: allocations.filter(
        ({ totalAllocated }) => totalAllocated > 0
      ),
      remainingBalance,
    };
  }, [
    accounts,
    bills,
    expenses,
    savings,
    user?.takeHomePay,
    user?.defaultAccount,
  ]);

  return {
    allocation,
    remainingBalance,
    defaultAccountId: user?.defaultAccount,
  };
};

export default useAllocationSummary;
