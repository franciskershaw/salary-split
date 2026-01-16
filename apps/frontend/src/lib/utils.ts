import { zodResolver } from "@hookform/resolvers/zod";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { z } from "zod";

import { type Currency } from "@/types/globalTypes";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  amount: number,
  currency: Currency = "GBP"
): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export const getNextPayday = (payDay: number) => {
  const today = new Date();
  const currentDay = today.getDate();

  // Create a date for the payday this month
  const paydayThisMonth = new Date(
    today.getFullYear(),
    today.getMonth(),
    payDay
  );

  // If today is past the payday this month, or it's the payday, get next month's payday
  if (currentDay >= payDay) {
    paydayThisMonth.setMonth(paydayThisMonth.getMonth() + 1);
  }

  // Handle edge case where the payday is greater than the days in the next month
  // (e.g., payday is 31 but next month only has 30 days)
  if (paydayThisMonth.getDate() !== payDay) {
    paydayThisMonth.setDate(0); // Set to last day of the month
  }

  return paydayThisMonth.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const capitaliseFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Converts plural feature names to singular for UI display
 */
export function getSingularFeatureName(feature: string): string {
  const singularMap: Record<string, string> = {
    accounts: "account",
    bills: "bill",
    expenses: "expense",
    savings: "savings", // 'savings' works as both singular and plural
  };

  return singularMap[feature] || feature;
}

/**
 * Type-safe wrapper for zodResolver that works seamlessly with forms
 * using Zod schemas with type transformations (like z.coerce)
 *
 * @example
 * const form = useForm<AccountFormValues>({
 *   resolver: resolver(accountFormSchema),
 *   defaultValues: { ... }
 * });
 */
export function resolver(schema: z.ZodType) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return zodResolver(schema as any) as any;
}
