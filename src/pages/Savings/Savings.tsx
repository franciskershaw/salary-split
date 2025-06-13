import { useState } from "react";

import { FormDialog } from "@/components/layout/Dialogs/FormDialog/FormDialog";
import ReorderDialog from "@/components/layout/Dialogs/ReorderDialog/ReorderDialog";
import EmptyState from "@/components/layout/EmptyState/EmptyState";
import { FeatureCard } from "@/components/layout/FeatureCard/FeatureCard";
import FeatureCardsGrid from "@/components/layout/FeatureCard/FeatureCardsGrid";
import PageWrapper from "@/components/layout/Page/PageWrapper";
import {
  FEATURE_ACCOUNTS,
  FEATURE_SAVINGS,
  SAVINGS_FORM_ID,
} from "@/constants/features";

import useGetAccounts from "../Accounts/hooks/useGetAccounts";
import CreateSavingsForm from "./components/CreateSavingsForm/CreateSavingsForm";
import useDeleteSavings from "./hooks/useDeleteSavings";
import useGetSavings from "./hooks/useGetSavings";

const Savings = () => {
  const { savings, fetchingSavings } = useGetSavings();
  const { accounts, fetchingAccounts } = useGetAccounts();
  const { deleteSavings, isPending: isDeleting } = useDeleteSavings();

  const [newSavingsDialogOpen, setNewSavingsDialogOpen] = useState(false);
  const [reorderDialogOpen, setReorderDialogOpen] = useState(false);

  const isLoading =
    (fetchingSavings || fetchingAccounts) &&
    (!savings.length || !accounts.length);

  const totalBalanceConfig = {
    items: savings,
    config: {
      title: "Total Savings",
      allItemsLabel: "All Savings",
      showFilters: false,
    },
  };

  return (
    <PageWrapper
      title="Savings"
      description="Track how much you're aiming to save this month"
      openCreateDialog={
        savings?.length ? () => setNewSavingsDialogOpen(true) : undefined
      }
      openReorderDialog={
        savings?.length ? () => setReorderDialogOpen(true) : undefined
      }
      totalBalanceConfig={totalBalanceConfig}
      isLoading={isLoading}
      loadingMessage="Loading savings..."
    >
      {!accounts?.length ? (
        <EmptyState type={FEATURE_ACCOUNTS} />
      ) : !savings?.length ? (
        <EmptyState type={FEATURE_SAVINGS} />
      ) : (
        <FeatureCardsGrid>
          {savings?.map((saving) => (
            <FeatureCard
              key={saving._id}
              feature={FEATURE_SAVINGS}
              item={saving}
              secondaryInfo={saving.account?.name}
              renderEditDialog={({ open, onOpenChange }) => (
                <FormDialog
                  item={{ savings: saving }}
                  open={open}
                  onOpenChange={onOpenChange}
                  title="Create New Savings Goal"
                  description="Add a new savings goal to track your progress. Fill in the details below."
                  editTitle="Edit Savings Goal"
                  editDescription="Edit your savings goal details below."
                  form={CreateSavingsForm}
                  formId={SAVINGS_FORM_ID}
                />
              )}
              deleteAction={deleteSavings}
              isDeleting={isDeleting}
            />
          ))}
        </FeatureCardsGrid>
      )}
      <FormDialog
        open={newSavingsDialogOpen}
        onOpenChange={setNewSavingsDialogOpen}
        title="Create New Savings Goal"
        description="Add a new savings goal to track your progress. Fill in the details below."
        form={CreateSavingsForm}
        formId={SAVINGS_FORM_ID}
      />
      {savings && (
        <ReorderDialog
          feature={FEATURE_SAVINGS}
          open={reorderDialogOpen}
          onOpenChange={setReorderDialogOpen}
          items={savings}
        />
      )}
    </PageWrapper>
  );
};

export default Savings;
