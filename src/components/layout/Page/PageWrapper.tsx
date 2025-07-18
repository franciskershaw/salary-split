import { LoadingOverlay } from "@/components/ui/loading-overlay";
import usePageTitle from "@/hooks/utility/usePageTitle";

import {
  TotalBalance,
  type FilterConfig,
  type TotalBalanceConfig,
} from "../TotalBalance/TotalBalance";
import PageHeader from "./PageHeader";

interface PageWrapperProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  openCreateDialog?: () => void;
  openReorderDialog?: () => void;
  isLoading?: boolean;
  loadingMessage?: string;
  customHeaderComponent?: React.ReactNode;
  totalBalanceConfig?: {
    items: Array<{ type: string; amount: number }>;
    filterConfigs?: FilterConfig[];
    config: TotalBalanceConfig;
    onFiltersUpdate?: (filters: FilterConfig[]) => void;
    isUpdating?: boolean;
  };
  itemsCount?: number;
}

const PageWrapper = ({
  children,
  title,
  description,
  openCreateDialog,
  openReorderDialog,
  totalBalanceConfig,
  isLoading,
  loadingMessage = "Loading...",
  customHeaderComponent,
  itemsCount,
}: PageWrapperProps) => {
  usePageTitle(title);

  return (
    <div className="mb-16 md:mb-4">
      <PageHeader
        title={title}
        description={description}
        openCreateDialog={openCreateDialog}
        openReorderDialog={openReorderDialog}
        totalComponent={
          customHeaderComponent ??
          (!isLoading && totalBalanceConfig && (itemsCount ?? 0) > 0 ? (
            <TotalBalance
              items={totalBalanceConfig.items}
              filterConfigs={totalBalanceConfig.filterConfigs}
              config={totalBalanceConfig.config}
              onFiltersUpdate={totalBalanceConfig.onFiltersUpdate}
              isUpdating={totalBalanceConfig.isUpdating}
            />
          ) : undefined)
        }
        itemsCount={itemsCount}
      />
      <div className="p-4">
        {isLoading ? (
          <LoadingOverlay
            message={loadingMessage}
            opacity="light"
            spinnerSize="md"
          />
        ) : (
          <div className="space-y-4 md:space-y-8">
            {customHeaderComponent ? (
              <div className="lg:hidden">{customHeaderComponent}</div>
            ) : (
              totalBalanceConfig &&
              (itemsCount ?? 0) > 0 && (
                <div className="lg:hidden">
                  <TotalBalance
                    items={totalBalanceConfig.items}
                    filterConfigs={totalBalanceConfig.filterConfigs}
                    config={totalBalanceConfig.config}
                    onFiltersUpdate={totalBalanceConfig.onFiltersUpdate}
                    isUpdating={totalBalanceConfig.isUpdating}
                  />
                </div>
              )
            )}
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageWrapper;
