import { useState } from "react";

import EmptyState from "@/components/layout/EmptyState/EmptyState";
import PageWrapper from "@/components/layout/Page/PageWrapper";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import useUser from "@/hooks/user/useUser";
import type { Bill } from "@/types/globalTypes";

import {
  TotalBalance,
  type FilterConfig,
  type TotalBalanceConfig,
} from "../Accounts/components/TotalBalance/TotalBalance";
import useGetAccounts from "../Accounts/hooks/useGetAccounts";
import { BillCard } from "./components/BillCard/BillCard";
import CreateBillDialog from "./components/CreateBillDialog/CreateBillDialog";
import ReorderBillsDialog from "./components/ReorderBillsDialog/ReorderBillsDialog";
import { getBillTypeLabel, getUniqueBillTypes } from "./helper/helper";
import useGetBills from "./hooks/useGetBills";
import useUpdateBillFilters from "./hooks/useUpdateBillFilters";

const Bills = () => {
  const { bills, fetchingBills } = useGetBills();
  const { user } = useUser();
  const { accounts, fetchingAccounts } = useGetAccounts();
  const { updateBillFilters, isPending } = useUpdateBillFilters();

  const [newBillDialogOpen, setNewBillDialogOpen] = useState(false);
  const [reorderDialogOpen, setReorderDialogOpen] = useState(false);

  // Get unique bill types that the user actually has bills for
  const userBillTypes = getUniqueBillTypes(bills);

  const billFilterConfigs: FilterConfig[] = userBillTypes.map((type) => ({
    type,
    label: getBillTypeLabel(type, bills),
    enabled: user?.billFilters?.find((f) => f.type === type)?.enabled ?? true,
  }));

  const totalBalanceConfig: TotalBalanceConfig = {
    title: "Total Amount of Bills",
    dialogTitle: "Customise Total Amount of Bills",
    dialogDescription:
      "Select which bills to include in your total amount of bills calculation",
    allItemsLabel: "All Bills",
  };

  const handleFiltersUpdate = (filters: FilterConfig[]) => {
    const billFilters = filters.map((filter) => ({
      type: filter.type as Bill["type"],
      enabled: filter.enabled,
    }));

    updateBillFilters(billFilters);
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
      openCreateDialog={
        bills?.length ? () => setNewBillDialogOpen(true) : undefined
      }
      openReorderDialog={
        bills?.length ? () => setReorderDialogOpen(true) : undefined
      }
      totalComponent={
        bills?.length ? (
          <TotalBalance
            items={bills}
            filterConfigs={billFilterConfigs}
            config={totalBalanceConfig}
            onFiltersUpdate={handleFiltersUpdate}
            isUpdating={isPending}
          />
        ) : null
      }
    >
      {!accounts?.length ? (
        <EmptyState type="accounts" />
      ) : !bills?.length ? (
        <EmptyState type="bills" />
      ) : (
        <>
          <div className="lg:hidden">
            <TotalBalance
              items={bills}
              filterConfigs={billFilterConfigs}
              config={totalBalanceConfig}
              onFiltersUpdate={handleFiltersUpdate}
              isUpdating={isPending}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {bills?.map((bill) => <BillCard key={bill._id} bill={bill} />)}
          </div>
        </>
      )}
      <CreateBillDialog
        open={newBillDialogOpen}
        onOpenChange={setNewBillDialogOpen}
      />
      {bills && (
        <ReorderBillsDialog
          open={reorderDialogOpen}
          onOpenChange={setReorderDialogOpen}
          bills={bills}
        />
      )}
    </PageWrapper>
  );
};

export default Bills;
