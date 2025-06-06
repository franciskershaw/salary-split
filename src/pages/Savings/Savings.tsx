import { useState } from "react";

import { FormDialog } from "@/components/layout/Dialogs/FormDialog/FormDialog";
import ReorderDialog from "@/components/layout/Dialogs/ReorderDialog/ReorderDialog";
import EmptyState from "@/components/layout/EmptyState/EmptyState";
import { FeatureCard } from "@/components/layout/FeatureCard/FeatureCard";
import PageWrapper from "@/components/layout/Page/PageWrapper";

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
        <EmptyState type="accounts" />
      ) : !savings?.length ? (
        <EmptyState type="savings" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {savings?.map((saving) => (
            <FeatureCard
              key={saving._id}
              feature="savings"
              item={saving}
              secondaryInfo={saving.account?.name}
              renderEditDialog={({ open, onOpenChange }) => (
                <FormDialog
                  item={saving}
                  open={open}
                  onOpenChange={onOpenChange}
                  title="Create New Savings Goal"
                  description="Add a new savings goal to track your progress. Fill in the details below."
                  editTitle="Edit Savings Goal"
                  editDescription="Edit your savings goal details below."
                  onSubmit={() => {
                    const form = document.querySelector("form");
                    if (form) {
                      form.requestSubmit();
                    }
                  }}
                  form={CreateSavingsForm}
                  formProps={{ savings: saving }}
                />
              )}
              deleteAction={deleteSavings}
              isDeleting={isDeleting}
            />
          ))}
        </div>
      )}
      <FormDialog
        open={newSavingsDialogOpen}
        onOpenChange={setNewSavingsDialogOpen}
        title="Create New Savings Goal"
        description="Add a new savings goal to track your progress. Fill in the details below."
        onSubmit={() => {
          const form = document.querySelector("form");
          if (form) {
            form.requestSubmit();
          }
        }}
        form={CreateSavingsForm}
      />
      {savings && (
        <ReorderDialog
          feature="savings"
          open={reorderDialogOpen}
          onOpenChange={setReorderDialogOpen}
          items={savings}
        />
      )}
    </PageWrapper>
  );
};

export default Savings;
