import { LoadingOverlay } from "@/components/ui/loading-overlay";

import PageHeader from "./PageHeader";

const PageWrapper = ({
  children,
  title,
  description,
  openCreateDialog,
  openReorderDialog,
  totalComponent,
  isLoading,
  loadingMessage = "Loading...",
}: {
  children: React.ReactNode;
  title: string;
  description?: string;
  openCreateDialog?: () => void;
  openReorderDialog?: () => void;
  totalComponent?: React.ReactNode;
  isLoading?: boolean;
  loadingMessage?: string;
}) => {
  return (
    <div className="space-y-6 p-4 mb-16 md:mb-0">
      <PageHeader
        title={title}
        description={description}
        openCreateDialog={openCreateDialog}
        openReorderDialog={openReorderDialog}
        totalComponent={!isLoading ? totalComponent : undefined}
      />
      {isLoading ? (
        <LoadingOverlay
          message={loadingMessage}
          opacity="light"
          spinnerSize="md"
        />
      ) : (
        children
      )}
    </div>
  );
};

export default PageWrapper;
