import { useMemo } from "react";

import { ListOrdered, Plus, Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const PageHeader = ({
  title,
  description,
  totalComponent,
  openCreateDialog,
  openReorderDialog,
  itemsCount,
}: {
  title: string;
  description?: string;
  totalComponent?: React.ReactNode;
  openCreateDialog?: () => void;
  openReorderDialog?: () => void;
  itemsCount?: number;
}) => {
  const actionsContent = useMemo(() => {
    if (!openCreateDialog && !openReorderDialog) return null;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:bg-primary/80"
          >
            <Settings className="w-4 h-4" />
            Actions
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {openCreateDialog && (
            <DropdownMenuItem onSelect={() => openCreateDialog()}>
              <Plus className="w-4 h-4" />
              New
            </DropdownMenuItem>
          )}
          {openReorderDialog && itemsCount && itemsCount > 1 && (
            <DropdownMenuItem onSelect={() => openReorderDialog()}>
              <ListOrdered className="w-4 h-4" />
              Reorder
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }, [openCreateDialog, openReorderDialog, itemsCount]);

  return (
    <header className="bg-surface border-b border-surface-border p-4 sticky z-10 transition-all duration-300 ease-in-out mobile-header-offset">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between lg:justify-start lg:gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <h2 className="text-2xl font-semibold text-surface-foreground">
                {title}
              </h2>
              {actionsContent && (
                <div className="hidden lg:block">{actionsContent}</div>
              )}
            </div>
            {actionsContent && (
              <div className="lg:hidden">{actionsContent}</div>
            )}
          </div>
          {description && (
            <p className="text-surface-foreground/70 mt-4">{description}</p>
          )}
        </div>
        {totalComponent && (
          <div className="hidden lg:block lg:flex-shrink-0">
            {totalComponent}
          </div>
        )}
      </div>
    </header>
  );
};

export default PageHeader;
