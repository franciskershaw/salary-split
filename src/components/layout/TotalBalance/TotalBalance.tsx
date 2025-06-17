import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Filter } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormInput } from "@/components/ui/form";
import useUser from "@/hooks/user/useUser";
import { formatCurrency } from "@/lib/utils";

// Generic types for reusability
export interface FilterableItem {
  type: string;
  amount: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // Allow additional properties
}

export interface FilterConfig {
  type: string;
  label: string;
  enabled: boolean;
}

export interface TotalBalanceConfig {
  title: string;
  dialogTitle?: string;
  dialogDescription?: string;
  allItemsLabel?: string;
  showFilters?: boolean;
}

type TotalBalanceProps<T extends FilterableItem> = {
  items: T[];
  filterConfigs?: FilterConfig[];
  config: TotalBalanceConfig;
  onFiltersUpdate?: (filters: FilterConfig[]) => void;
  isUpdating?: boolean;
};

export function TotalBalance<T extends FilterableItem>({
  items,
  filterConfigs = [],
  config,
  onFiltersUpdate,
  isUpdating = false,
}: TotalBalanceProps<T>) {
  const [open, setOpen] = useState(false);
  const { user } = useUser();

  // Create dynamic schema based on filter configs
  const createSchema = () => {
    const schemaObj: Record<string, z.ZodBoolean> = {};
    filterConfigs.forEach((filter) => {
      schemaObj[filter.type] = z.boolean();
    });
    return z.object(schemaObj);
  };

  const schema = createSchema();
  type FiltersForm = z.infer<typeof schema>;

  const defaultValues = filterConfigs.reduce(
    (acc, filter) => {
      acc[filter.type] = filter.enabled;
      return acc;
    },
    {} as Record<string, boolean>
  );

  const form = useForm<FiltersForm>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = (values: FiltersForm) => {
    if (!onFiltersUpdate) return;
    const updatedFilters = filterConfigs.map((filter) => ({
      ...filter,
      enabled: values[filter.type],
    }));
    onFiltersUpdate(updatedFilters);
    setOpen(false);
  };

  const filteredItems = config.showFilters
    ? items.filter((item) => form.watch(item.type))
    : items;

  const totalBalance = filteredItems.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const selectedTypes = Object.entries(form.watch())
    .filter(([, isSelected]) => isSelected)
    .map(([type]) => {
      const filterConfig = filterConfigs.find((f) => f.type === type);
      return filterConfig?.label.split(" ")[0] || type;
    });

  const totalDescription = config.showFilters
    ? selectedTypes.length === filterConfigs.length
      ? config.allItemsLabel
      : selectedTypes.length === 0
        ? "None selected"
        : selectedTypes.length <= 2
          ? selectedTypes.join(", ")
          : `${selectedTypes.length} filters selected`
    : config.allItemsLabel;

  const content = (
    <Card
      className="shadow-sm cursor-pointer hover:shadow-md transition-shadow py-0 md:py-1.5 md:px-3 lg:py-1 lg:px-2 min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      tabIndex={config.showFilters ? 0 : -1}
      onKeyDown={(e) => {
        if (config.showFilters && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          setOpen(true);
        }
      }}
      role={config.showFilters ? "button" : undefined}
      aria-label={
        config.showFilters
          ? `Open ${config.dialogTitle || config.title} dialog`
          : undefined
      }
    >
      <CardContent className="p-4 md:p-0 lg:p-0">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0 flex-1">
            <CardDescription className="text-sm lg:text-xs lg:leading-tight">
              {config.showFilters && selectedTypes.length === 0
                ? `${config.title} - ${totalDescription}`
                : config.showFilters
                  ? `${config.title} (${totalDescription})`
                  : config.title}
            </CardDescription>
            <CardTitle className="text-xl lg:text-lg font-semibold truncate">
              {formatCurrency(totalBalance, user?.defaultCurrency)}
            </CardTitle>
          </div>
          {config.showFilters && (
            <Filter className="h-4 w-4 lg:h-3 lg:w-3 text-muted-foreground flex-shrink-0" />
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (!config.showFilters) {
    return content;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{content}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{config.dialogTitle}</DialogTitle>
          <DialogDescription>{config.dialogDescription}</DialogDescription>
        </DialogHeader>
        <Form form={form} onSubmit={onSubmit}>
          <div className="py-4">
            <div className="space-y-5">
              {filterConfigs.map((filter) => (
                <FormInput
                  key={filter.type}
                  name={filter.type}
                  label={filter.label}
                  labelPosition="right"
                >
                  <Checkbox
                    checked={form.watch(filter.type as keyof FiltersForm)}
                    onCheckedChange={(checked) =>
                      form.setValue(
                        filter.type as keyof FiltersForm,
                        checked as boolean
                      )
                    }
                  />
                </FormInput>
              ))}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={() => form.reset()}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isUpdating}>
              Apply
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
