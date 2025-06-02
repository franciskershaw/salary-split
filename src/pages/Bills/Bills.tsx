import { useState } from "react";

import PageWrapper from "@/components/layout/Page/PageWrapper";

import { BillCard } from "./components/BillCard/BillCard";
import CreateBillDialog from "./components/CreateBillDialog/CreateBillDialog";

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
  // const { accounts, fetchingAccounts } = useGetAccounts();
  const [newBillDialogOpen, setNewBillDialogOpen] = useState(false);
  const [reorderDialogOpen, setReorderDialogOpen] = useState(false);

  return (
    <PageWrapper
      title="Bills"
      description="Manage your recurring monthly payments"
      openCreateDialog={() => setNewBillDialogOpen(true)}
      openReorderDialog={() => setReorderDialogOpen(true)}
    >
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <BillCard bill={sampleBill} />
        </div>
      </>
      <CreateBillDialog
        open={newBillDialogOpen}
        onOpenChange={setNewBillDialogOpen}
      />
      {/* {accounts && (
        <ReorderAccountsDialog
          open={reorderDialogOpen}
          onOpenChange={setReorderDialogOpen}
          accounts={accounts}
        />
      )} */}
    </PageWrapper>
  );
}
