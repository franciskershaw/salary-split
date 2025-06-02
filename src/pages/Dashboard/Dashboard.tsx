import PageWrapper from "@/components/layout/Page/PageWrapper";
import useUser from "@/hooks/user/useUser";

import AccountsOverview from "./components/AccountsOverview/AccountsOverview";
import AllocationSummary from "./components/AllocationSummary/AllocationSummary";

const Dashboard = () => {
  const { user } = useUser();

  return (
    <PageWrapper
      title="Dashboard"
      description={`Welcome back, ${user?.name.firstName}!`}
    >
      <AllocationSummary />
      <AccountsOverview />
    </PageWrapper>
  );
};

export default Dashboard;
