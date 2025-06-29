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
  targetAmountDifference?: number;
  targetSplitBetween?: number;
};

const useAllocationSummary = () => {
  const { accounts } = useGetAccounts();
  const { bills } = useGetBills();
  const { expenses } = useGetExpenses();
  const { savings } = useGetSavings();
  const { user } = useUser();

  const summary = useMemo(() => {
    const totalBills = bills
      .filter((bill) => bill.amount > 0)
      .reduce((sum, bill) => sum + bill.amount / (bill.splitBetween || 1), 0);
    const totalExpenses = expenses
      .filter((expense) => expense.amount > 0)
      .reduce((sum, expense) => sum + expense.amount, 0);
    const totalSavings = savings
      .filter((saving) => saving.amount > 0)
      .reduce((sum, saving) => sum + saving.amount, 0);

    const calculateAccountAllocation = (account: Account): Allocation => {
      const accountBills = bills.filter(
        (bill) => bill.account._id === account._id && bill.amount > 0
      );
      const accountExpenses = expenses.filter(
        (expense) => expense.account._id === account._id && expense.amount > 0
      );
      const accountSavings = savings.filter(
        (saving) => saving.account._id === account._id && saving.amount > 0
      );

      const actualAllocated =
        accountBills.reduce(
          (sum, bill) => sum + bill.amount / (bill.splitBetween || 1),
          0
        ) +
        accountExpenses.reduce((sum, expense) => sum + expense.amount, 0) +
        accountSavings.reduce((sum, saving) => sum + saving.amount, 0);

      let targetAmountDifference: number | undefined;
      let totalAllocated = actualAllocated;

      // Calculate target amount difference if account has a target
      if (account.targetMonthlyAmount) {
        const fullTargetAmount = account.targetMonthlyAmount.amount;
        const fullActualAllocated =
          accountBills.reduce((sum, bill) => sum + bill.amount, 0) +
          accountExpenses.reduce((sum, expense) => sum + expense.amount, 0) +
          accountSavings.reduce((sum, saving) => sum + saving.amount, 0);

        targetAmountDifference = fullTargetAmount - fullActualAllocated; // Full difference (can be negative)
        const userPortionDifference =
          targetAmountDifference /
          (account.targetMonthlyAmount.splitBetween || 1);
        totalAllocated = actualAllocated + Math.max(0, userPortionDifference); // Only add positive user portion to total
      }

      return {
        account,
        bills: accountBills,
        expenses: accountExpenses,
        savings: accountSavings,
        totalAllocated,
        targetAmountDifference,
        targetSplitBetween: account.targetMonthlyAmount?.splitBetween,
      };
    };

    const allocations = accounts.map(calculateAccountAllocation);

    // Calculate total target amount differences (user portions only)
    const totalTargetDifferences = allocations
      .filter((allocation) => allocation.targetAmountDifference !== undefined)
      .reduce((sum, allocation) => {
        if (
          allocation.targetAmountDifference &&
          allocation.targetAmountDifference > 0
        ) {
          const userPortion =
            allocation.targetAmountDifference /
            (allocation.targetSplitBetween || 1);
          return sum + userPortion;
        }
        return sum;
      }, 0);

    const pureTotalAllocated = totalBills + totalExpenses + totalSavings;
    const totalAllocatedWithTargets =
      pureTotalAllocated + totalTargetDifferences;
    const remainingBalance =
      (user?.takeHomePay ?? 0) - totalAllocatedWithTargets;
    const overAllocated = (user?.takeHomePay ?? 0) < totalAllocatedWithTargets;
    const overAllocatedAmount =
      totalAllocatedWithTargets - (user?.takeHomePay ?? 0);
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
      totalAllocated: totalAllocatedWithTargets,
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
