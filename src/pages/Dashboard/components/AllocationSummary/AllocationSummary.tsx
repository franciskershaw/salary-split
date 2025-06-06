import useUser from "@/hooks/user/useUser";
import { getDisplayInfo } from "@/lib/display-info";
import { formatCurrency } from "@/lib/utils";

import useAllocationSummary from "../../hooks/useAllocationSummary";
import AllocationCard from "./AllocationCard";

const AllocationSummary = () => {
  const { user } = useUser();
  const { allocation, remainingBalance, defaultAccountId } =
    useAllocationSummary();

  const totalAllocated = allocation.reduce(
    (sum, a) => sum + a.totalAllocated,
    0
  );
  const overAllocated = (user?.takeHomePay ?? 0) < totalAllocated;
  const overAllocatedAmount = totalAllocated - (user?.takeHomePay ?? 0);

  return (
    <section className="space-y-2 md:space-y-4">
      <div className="flex flex-col md:flex-row gap-2 md:gap-8 mb-4">
        <h2 className="text-xl font-semibold py-2">Payday Summary</h2>
        <div className="flex gap-4 md:gap-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Total Allocated
            </p>
            <p
              className={`text-xl font-bold ${
                overAllocated
                  ? "text-destructive"
                  : "text-emerald-600 dark:text-emerald-400"
              }`}
            >
              {formatCurrency(totalAllocated)}
            </p>
          </div>
          {overAllocated && (
            <div>
              <p className="text-sm font-medium text-destructive">
                Overallocated
              </p>
              <p className="text-xl font-bold text-destructive">
                {formatCurrency(overAllocatedAmount)}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allocation.map((a) => {
          const display = getDisplayInfo("accounts", a.account.type);
          const isDefault = a.account._id === defaultAccountId;
          // Only show funneled balance if it's positive and this is the default account
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
            />
          );
        })}
      </div>
    </section>
  );
};

export default AllocationSummary;
