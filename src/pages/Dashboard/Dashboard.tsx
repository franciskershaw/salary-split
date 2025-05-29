import PageWrapper from "@/components/layout/Page/PageWrapper";

import AccountsOverview from "./components/AccountsOverview/AccountsOverview";
import AllocationSummary from "./components/AllocationSummary/AllocationSummary";

const Dashboard = () => {
  return (
    <PageWrapper>
      <AllocationSummary />
      <AccountsOverview />
    </PageWrapper>
  );
};

export default Dashboard;
