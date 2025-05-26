import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
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
