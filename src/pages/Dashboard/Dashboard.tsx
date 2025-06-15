import PageWrapper from "@/components/layout/Page/PageWrapper";
import useUser from "@/hooks/user/useUser";
import { formatCurrency } from "@/lib/utils";

import AccountsOverview from "./components/AccountsOverview/AccountsOverview";
import AllocationSummary from "./components/AllocationSummary/AllocationSummary";
import EditSalaryDialog from "./components/AllocationSummary/EditSalaryDialog";

const SalaryDisplay = () => {
  const { user } = useUser();

  return (
    <EditSalaryDialog value={user?.takeHomePay ?? 0}>
      <div
        className="p-3 rounded-lg border bg-card text-card-foreground cursor-pointer hover:bg-muted/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        tabIndex={0}
        role="button"
        aria-label="Edit monthly take-home salary"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            e.currentTarget.click();
          }
        }}
      >
        <p className="text-sm text-muted-foreground">Take-Home Salary</p>
        <p className="font-semibold text-lg">
          {formatCurrency(user?.takeHomePay ?? 0)}
        </p>
      </div>
    </EditSalaryDialog>
  );
};

const Dashboard = () => {
  const { user } = useUser();

  return (
    <PageWrapper
      title="Dashboard"
      description={`Welcome back, ${user?.name.firstName}!`}
      customHeaderComponent={<SalaryDisplay />}
    >
      <AllocationSummary />
      <AccountsOverview />
    </PageWrapper>
  );
};

export default Dashboard;
