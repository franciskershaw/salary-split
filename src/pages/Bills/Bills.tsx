import { useState } from "react";

import PageWrapper from "@/components/layout/Page/PageWrapper";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import useUser from "@/hooks/user/useUser";

import NoAccounts from "../Accounts/components/NoAccounts/NoAccounts";
import {
  TotalBalance,
  type FilterConfig,
  type TotalBalanceConfig,
} from "../Accounts/components/TotalBalance/TotalBalance";
import useGetAccounts from "../Accounts/hooks/useGetAccounts";
import { BillCard } from "./components/BillCard/BillCard";
import CreateBillDialog from "./components/CreateBillDialog/CreateBillDialog";
import NoBills from "./components/NoBills/NoBills";
import useGetBills from "./hooks/useGetBills";

export default function Bills() {
  const { bills, fetchingBills } = useGetBills();
  const { user } = useUser();
  const { accounts, fetchingAccounts } = useGetAccounts();
  const [newBillDialogOpen, setNewBillDialogOpen] = useState(false);
  // const [reorderDialogOpen, setReorderDialogOpen] = useState(false);

  const billFilterConfigs: FilterConfig[] =
    bills?.map((bill) => ({
      type: bill.type,
      label: bill.name,
      enabled:
        user?.billFilters?.find((f) => f.type === bill._id)?.enabled ?? true,
    })) ?? [];

  const totalBalanceConfig: TotalBalanceConfig = {
    title: "Total Amount of Bills",
    dialogTitle: "Customise Total Amount of Bills",
    dialogDescription:
      "Select which bills to include in your total amount of bills calculation",
    allItemsLabel: "All Bills",
  };

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
      // openReorderDialog={() => setReorderDialogOpen(true)}
      totalComponent={
        bills?.length ? (
          <TotalBalance
            items={bills}
            filterConfigs={billFilterConfigs}
            config={totalBalanceConfig}
            // onFiltersUpdate={handleFiltersUpdate}
            // isUpdating={isPending}
          />
        ) : null
      }
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
