import { useState } from "react";

import ReorderDialog from "@/components/layout/Dialogs/ReorderDialog/ReorderDialog";
import EmptyState from "@/components/layout/EmptyState/EmptyState";
import { FeatureCard } from "@/components/layout/FeatureCard/FeatureCard";
import PageWrapper from "@/components/layout/Page/PageWrapper";
import type { FilterConfig } from "@/components/layout/TotalBalance/TotalBalance";
import useUser from "@/hooks/user/useUser";
import { getDisplayInfo } from "@/lib/display-info";
import type { Bill } from "@/types/globalTypes";

import useGetAccounts from "../Accounts/hooks/useGetAccounts";
import CreateBillDialog from "./components/CreateBillDialog/CreateBillDialog";
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
    label: getDisplayInfo("bills", type).label,
    enabled: user?.billFilters?.find((f) => f.type === type)?.enabled ?? true,
  }));

  const handleFiltersUpdate = (filters: FilterConfig[]) => {
    const billFilters = filters.map((filter) => ({
      type: filter.type as Bill["type"],
      enabled: filter.enabled,
    }));

    updateBillFilters(billFilters);
  };

  const totalBalanceConfig = {
    items: bills ?? [],
    filterConfigs: billFilterConfigs,
    config: {
      title: "Total Amount of Bills",
      dialogTitle: "Customise Total Amount of Bills",
      dialogDescription:
        "Select which bills to include in your total amount of bills calculation",
      allItemsLabel: "All Bills",
      showFilters: true,
    },
    onFiltersUpdate: handleFiltersUpdate,
    isUpdating: isPending,
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
      totalBalanceConfig={totalBalanceConfig}
      isLoading={isLoading}
      loadingMessage="Loading bills..."
    >
      {!accounts?.length ? (
        <EmptyState type="accounts" />
      ) : !bills?.length ? (
        <EmptyState type="bills" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bills?.map((bill) => (
            <FeatureCard
              key={bill._id}
              feature="bills"
              item={bill}
              secondaryInfo={bill.account?.name}
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
      )}
      <CreateBillDialog
        open={newBillDialogOpen}
        onOpenChange={setNewBillDialogOpen}
      />
      {bills && (
        <ReorderDialog
          feature="bills"
          open={reorderDialogOpen}
          onOpenChange={setReorderDialogOpen}
          items={bills}
        />
      )}
    </PageWrapper>
  );
};

export default Bills;
