import AccountsOverview from "./components/AccountsOverview/AccountsOverview";
import AllocationSummary from "./components/AllocationSummary/AllocationSummary";

const Dashboard = () => {
  return (
    <div className="space-y-6 p-4">
      <AllocationSummary />
      <AccountsOverview />
    </div>
  );
};

export default Dashboard;
