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

  const summary = useMemo(() => {
    const totalBills = bills.reduce(
      (sum, bill) => sum + bill.amount / (bill.splitBetween || 1),
      0
    );
    const totalExpenses = expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );
    const totalSavings = savings.reduce(
      (sum, saving) => sum + saving.amount,
      0
    );

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

    const pureTotalAllocated = totalBills + totalExpenses + totalSavings;
    const remainingBalance = (user?.takeHomePay ?? 0) - pureTotalAllocated;
    const overAllocated = (user?.takeHomePay ?? 0) < pureTotalAllocated;
    const overAllocatedAmount = pureTotalAllocated - (user?.takeHomePay ?? 0);
    const spendingMoney =
      remainingBalance > 0 && !overAllocated ? remainingBalance : 0;

    const finalAllocations = [...allocations];

    if (user?.defaultAccount && remainingBalance > 0) {
      const defaultAllocation = finalAllocations.find(
        (allocation) => allocation.account._id === user.defaultAccount
      );

      if (defaultAllocation) {
        defaultAllocation.totalAllocated += remainingBalance;
      } else {
        const defaultAccount = accounts.find(
          (account) => account._id === user.defaultAccount
        );
        if (defaultAccount) {
          finalAllocations.push({
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
      allocation: finalAllocations.filter(
        ({ totalAllocated }) => totalAllocated > 0
      ),
      remainingBalance,
      totalBills,
      totalExpenses,
      totalSavings,
      totalAllocated: pureTotalAllocated,
      overAllocated,
      overAllocatedAmount,
      spendingMoney,
      defaultAccountId: user?.defaultAccount,
    };
  }, [
    accounts,
    bills,
    expenses,
    savings,
    user?.takeHomePay,
    user?.defaultAccount,
  ]);

  return summary;
};

export default useAllocationSummary;
