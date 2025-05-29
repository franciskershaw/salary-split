import PageHeader from "@/components/layout/Page/PageHeader";
import PageWrapper from "@/components/layout/Page/PageWrapper";
import useUser from "@/hooks/user/useUser";

import AccountsOverview from "./components/AccountsOverview/AccountsOverview";
import AllocationSummary from "./components/AllocationSummary/AllocationSummary";

const Dashboard = () => {
  const { user } = useUser();

  return (
    <PageWrapper>
      <PageHeader
        title="Dashboard"
        description={`Welcome back, ${user?.name.firstName}!`}
      />
      <AllocationSummary />
      <AccountsOverview />
    </PageWrapper>
  );
};

export default Dashboard;
