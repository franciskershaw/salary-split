import { useCallback, useMemo, useState } from "react";

import { FormDialog } from "@/components/layout/Dialogs/FormDialog/FormDialog";
import ReorderDialog from "@/components/layout/Dialogs/ReorderDialog/ReorderDialog";
import EmptyState from "@/components/layout/EmptyState/EmptyState";
import { FeatureCard } from "@/components/layout/FeatureCard/FeatureCard";
import FeatureCardsGrid from "@/components/layout/FeatureCard/FeatureCardsGrid";
import PageWrapper from "@/components/layout/Page/PageWrapper";
import type { FilterConfig } from "@/components/layout/TotalBalance/TotalBalance";
import {
  BILL_FORM_ID,
  FEATURE_ACCOUNTS,
  FEATURE_BILLS,
} from "@/constants/features";
import useUser from "@/hooks/user/useUser";
import { getDisplayInfo } from "@/lib/display-info";
import type { Bill } from "@/types/globalTypes";

import useGetAccounts from "../Accounts/hooks/useGetAccounts";
import CreateBillForm from "./components/CreateBillForm/CreateBillForm";
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

  const userBillTypes = useMemo(
    () => [...new Set(bills?.map((bill) => bill.type) ?? [])],
    [bills]
  );

  const billFilterConfigs = useMemo(
    (): FilterConfig[] =>
      userBillTypes.map((type) => ({
        type,
        label: getDisplayInfo(FEATURE_BILLS, type).label,
        enabled:
          user?.billFilters?.find((f) => f.type === type)?.enabled ?? true,
      })),
    [userBillTypes, user?.billFilters]
  );

  const handleFiltersUpdate = useCallback(
    (filters: FilterConfig[]) => {
      const billFilters = filters.map((filter) => ({
        type: filter.type as Bill["type"],
        enabled: filter.enabled,
      }));

      updateBillFilters(billFilters);
    },
    [updateBillFilters]
  );

  const totalBalanceConfig = useMemo(
    () => ({
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
    }),
    [bills, billFilterConfigs, handleFiltersUpdate, isPending]
  );

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
      itemsCount={bills?.length ?? 0}
    >
      {!accounts?.length ? (
        <EmptyState type={FEATURE_ACCOUNTS} />
      ) : !bills?.length ? (
        <EmptyState type={FEATURE_BILLS} />
      ) : (
        <FeatureCardsGrid>
          {bills?.map((bill) => (
            <FeatureCard
              key={bill._id}
              feature={FEATURE_BILLS}
              item={bill}
              secondaryInfo={bill.account?.name}
              renderEditDialog={({ open, onOpenChange }) => (
                <FormDialog
                  item={{ bill }}
                  open={open}
                  onOpenChange={onOpenChange}
                  title="Create New Bill"
                  description="Add a new bill to track your finances. Fill in the details below."
                  editTitle="Edit Bill"
                  editDescription="Edit your bill details below."
                  form={CreateBillForm}
                  formId={BILL_FORM_ID}
                />
              )}
              deleteAction={deleteBill}
              isDeleting={isDeleting}
            />
          ))}
        </FeatureCardsGrid>
      )}
      <FormDialog
        open={newBillDialogOpen}
        onOpenChange={setNewBillDialogOpen}
        title="Create New Bill"
        description="Add a new bill to track your finances. Fill in the details below."
        form={CreateBillForm}
        formId={BILL_FORM_ID}
      />
      {bills && (
        <ReorderDialog
          feature={FEATURE_BILLS}
          open={reorderDialogOpen}
          onOpenChange={setReorderDialogOpen}
          items={bills}
        />
      )}
    </PageWrapper>
  );
};

export default Bills;
