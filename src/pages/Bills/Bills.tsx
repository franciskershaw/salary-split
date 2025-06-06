import { useState } from "react";

import EmptyState from "@/components/layout/EmptyState/EmptyState";
import { FeatureCard } from "@/components/layout/FeatureCard/FeatureCard";
import PageWrapper from "@/components/layout/Page/PageWrapper";
import useUser from "@/hooks/user/useUser";
import { getDisplayInfo } from "@/lib/display-info";
import type { Bill } from "@/types/globalTypes";

import {
  TotalBalance,
  type FilterConfig,
  type TotalBalanceConfig,
} from "../Accounts/components/TotalBalance/TotalBalance";
import useGetAccounts from "../Accounts/hooks/useGetAccounts";
import CreateBillDialog from "./components/CreateBillDialog/CreateBillDialog";
import ReorderBillsDialog from "./components/ReorderBillsDialog/ReorderBillsDialog";
import useDeleteBill from "./hooks/useDeleteBill";
import useGetBills from "./hooks/useGetBills";
import useUpdateBillFilters from "./hooks/useUpdateBillFilters";

const Bills = () => {
  const { bills, fetchingBills } = useGetBills();
  const { user } = useUser();
  const { accounts, fetchingAccounts } = useGetAccounts();
  const { updateBillFilters, isPending } = useUpdateBillFilters();
  const { deleteBill, isPending: isDeleting } = useDeleteBill();

  const [newBillDialogOpen, setNewBillDialogOpen] = useState(false);
  const [reorderDialogOpen, setReorderDialogOpen] = useState(false);

  const userBillTypes = [...new Set(bills?.map((bill) => bill.type) ?? [])];

  const billFilterConfigs: FilterConfig[] = userBillTypes.map((type) => ({
    type,
    label: getDisplayInfo("bill", type).label,
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

  const isLoading =
    (fetchingBills || fetchingAccounts) &&
    (!bills?.length || !accounts?.length);

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
      isLoading={isLoading}
      loadingMessage="Loading bills..."
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bills?.map((bill) => (
              <FeatureCard
                key={bill._id}
                feature="bill"
                item={bill}
                renderEditDialog={({ open, onOpenChange }) => (
                  <CreateBillDialog
                    bill={bill}
                    open={open}
                    onOpenChange={onOpenChange}
                  />
                )}
                deleteAction={deleteBill}
                isDeleting={isDeleting}
              />
            ))}
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
