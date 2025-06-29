import { getDisplayInfo } from "@/lib/display-info";

import useAllocationSummary from "../../hooks/useAllocationSummary";
import AllocationCard from "./AllocationCard";
import SummaryStat from "./SummaryStat";

const AllocationSummary = () => {
  const {
    allocation,
    remainingBalance,
    defaultAccountId,
    totalBills,
    totalExpenses,
    totalSavings,
    totalAllocated,
    overAllocated,
    overAllocatedAmount,
    spendingMoney,
  } = useAllocationSummary();

  const summaryStats = [
    {
      label: "Total Allocated",
      value: totalAllocated,
      className: overAllocated ? "text-destructive" : "text-success",
    },
    ...(spendingMoney > 0
      ? [
          {
            label: "Spending Money",
            value: spendingMoney,
            className: "text-success",
          },
        ]
      : []),
    ...(overAllocated
      ? [
          {
            label: "Overallocated By",
            value: overAllocatedAmount,
            className: "text-destructive",
          },
        ]
      : []),
    {
      label: "Bills",
      value: totalBills,
      className: "text-bills",
    },
    {
      label: "Expenses",
      value: totalExpenses,
      className: "text-expenses",
    },
    {
      label: "Savings",
      value: totalSavings,
      className: "text-savings",
    },
  ];

  if (allocation.length === 0) {
    return null;
  }

  return (
    <section className="space-y-2 md:space-y-4">
      <div className="flex flex-col md:flex-row gap-2 md:gap-8 mb-4">
        <h2 className="text-xl font-semibold py-2 shrink-0">Payday Summary</h2>
        <div className="flex-1 overflow-x-auto">
          <div className="flex gap-x-6 pb-2">
            {summaryStats.map((stat) => (
              <SummaryStat
                key={stat.label}
                label={stat.label}
                value={stat.value}
                className={stat.className}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allocation.map((a) => {
          const display = getDisplayInfo("accounts", a.account.type);
          const isDefault = a.account._id === defaultAccountId;
          const funneledBalance =
            isDefault && remainingBalance > 0 ? remainingBalance : 0;
          return (
            <AllocationCard
              key={a.account._id}
              account={a.account}
              totalAllocated={a.totalAllocated}
              icon={<display.icon className={`h-7 w-7`} />}
              iconBg={display.colors.bg}
              iconText={display.colors.text}
              bills={a.bills}
              expenses={a.expenses}
              savings={a.savings}
              funneledBalance={funneledBalance}
              targetAmountDifference={a.targetAmountDifference}
              targetSplitBetween={a.targetSplitBetween}
            />
          );
        })}
      </div>
    </section>
  );
};

export default AllocationSummary;
