import PageWrapper from "@/components/layout/Page/PageWrapper";

import { BillCard } from "./components/BillCard/BillCard";

// Sample bill data
const sampleBill = {
  _id: "1",
  name: "Netflix Subscription",
  amount: 15.99,
  dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
  account: "1",
  accountName: "Main Current Account",
  createdBy: "user123",
  createdAt: new Date().toISOString(),
};

export default function Bills() {
  return (
    <PageWrapper
      title="Bills"
      description="Manage your recurring monthly payments"
      openCreateDialog={() => {}}
      openReorderDialog={() => {}}
    >
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <BillCard bill={sampleBill} />
        </div>
      </>
    </PageWrapper>
  );
}
