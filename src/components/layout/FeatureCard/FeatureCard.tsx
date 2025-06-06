import { useState, type ReactNode } from "react";

import { MoreHorizontal, type LucideIcon } from "lucide-react";

import DeleteDialog from "@/components/layout/Dialogs/DeleteDialog";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getDisplayInfo } from "@/lib/display-info";
import { cn, formatCurrency } from "@/lib/utils";
import type { Account, Bill } from "@/types/globalTypes";

type FeatureCardProps = {
  feature: "account" | "bill" | "expense" | "savings";
  item: Account | Bill;
  secondaryInfo?: ReactNode;
  bottomRightContent?: ReactNode;
  hideDropdown?: boolean;
  renderEditDialog: (props: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
  }) => ReactNode;
  deleteAction: (id: string, options: { onSuccess: () => void }) => void;
  isDeleting: boolean;
  title?: string;
  icon?: LucideIcon;
  topRightContent?: ReactNode;
  iconContainerClassName?: string;
};

export function FeatureCard({
  feature,
  item,
  secondaryInfo,
  bottomRightContent,
  hideDropdown,
  renderEditDialog,
  deleteAction,
  isDeleting,
  title: titleOverride,
  icon: iconOverride,
  topRightContent: topRightContentOverride,
  iconContainerClassName: iconContainerClassNameOverride,
}: FeatureCardProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const displayInfo = getDisplayInfo(
    feature,
    "type" in item ? item.type : undefined
  );

  const title = titleOverride ?? item.name;
  const Icon = iconOverride ?? displayInfo.icon;
  const iconContainerClassName =
    iconContainerClassNameOverride ??
    cn(displayInfo.colors.bg, displayInfo.colors.text);
  const topRightContent =
    topRightContentOverride ??
    (displayInfo.label && (
      <span
        className={cn(
          "text-xs px-2 py-1 rounded-full",
          displayInfo.colors.badge
        )}
      >
        {displayInfo.label}
      </span>
    ));

  const deleteDialogDescription = `Are you sure you want to delete ${item.name}? This action cannot be undone.`;

  return (
    <>
      <Card className="p-5 border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all h-full flex flex-col">
        <CardContent className="p-0 flex-grow flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                iconContainerClassName
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
            {topRightContent}
          </div>
          <div className="flex-grow">
            <h3 className="font-medium dark:text-white">{title}</h3>
            {secondaryInfo && (
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
                {secondaryInfo}
              </p>
            )}
          </div>
          <div className="flex justify-between items-end">
            <div>
              <span className="text-2xl font-semibold dark:text-white">
                {formatCurrency(item.amount)}
              </span>
            </div>
            <div className="flex flex-col items-end gap-2">
              {!hideDropdown && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="cursor-pointer text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
                      <MoreHorizontal className="h-6 w-6" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onSelect={() => setEditDialogOpen(true)}>
                      Edit {feature}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onSelect={() => setDeleteDialogOpen(true)}
                    >
                      Delete {feature}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              {bottomRightContent}
            </div>
          </div>
        </CardContent>
      </Card>
      {renderEditDialog({
        open: editDialogOpen,
        onOpenChange: setEditDialogOpen,
      })}
      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title={`Delete ${feature}`}
        description={deleteDialogDescription}
        onDelete={() => {
          deleteAction(item._id, {
            onSuccess: () => {
              setDeleteDialogOpen(false);
            },
          });
        }}
        isPending={isDeleting}
      />
    </>
  );
}
