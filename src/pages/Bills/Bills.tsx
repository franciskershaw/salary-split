import { useState } from "react";

import PageWrapper from "@/components/layout/Page/PageWrapper";
import { LoadingOverlay } from "@/components/ui/loading-overlay";

import NoAccounts from "../Accounts/components/NoAccounts/NoAccounts";
import useGetAccounts from "../Accounts/hooks/useGetAccounts";
import { BillCard } from "./components/BillCard/BillCard";
import CreateBillDialog from "./components/CreateBillDialog/CreateBillDialog";
import NoBills from "./components/NoBills/NoBills";
import useGetBills from "./hooks/useGetBills";

export default function Bills() {
  const { bills, fetchingBills } = useGetBills();
  const { accounts, fetchingAccounts } = useGetAccounts();
  const [newBillDialogOpen, setNewBillDialogOpen] = useState(false);
  const [reorderDialogOpen, setReorderDialogOpen] = useState(false);

  if (fetchingBills || fetchingAccounts) {
    return (
      <LoadingOverlay
        message="Loading bills..."
        opacity="light"
        spinnerSize="md"
      />
    );
  }

  return (
    <PageWrapper
      title="Bills"
      description="Manage your recurring monthly payments"
      openCreateDialog={() => setNewBillDialogOpen(true)}
      openReorderDialog={() => setReorderDialogOpen(true)}
    >
      {!accounts?.length ? (
        <NoAccounts />
      ) : !bills?.length ? (
        <NoBills />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bills?.map((bill) => <BillCard key={bill._id} bill={bill} />)}
          </div>
        </>
      )}
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
