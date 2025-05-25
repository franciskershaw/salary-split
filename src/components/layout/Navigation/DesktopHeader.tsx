import { useLocation } from "react-router-dom";

import useUser from "@/hooks/user/useUser";

type PageInfo = {
  title: string;
  description: string;
};

const pageInfo: Record<string, PageInfo> = {
  "/dashboard": {
    title: "Dashboard",
    description: "Welcome back, {firstName}",
  },
  "/accounts": {
    title: "Accounts",
    description: "Manage your bank accounts and track balances",
  },
  "/bills": {
    title: "Bills",
    description: "Manage your recurring monthly payments",
  },
  "/expenses": {
    title: "Temporary Expenses",
    description: "Track one-time or short-term expenses",
  },
  "/savings": {
    title: "Savings",
    description: "Manage savings goals each month",
  },
  "/settings": {
    title: "Settings",
    description: "Manage your account and preferences",
  },
};

export default function DesktopHeader() {
  const location = useLocation();
  const { user } = useUser();

  const currentPage = pageInfo[location.pathname] || {
    title: "Page Not Found",
    description: "The page you're looking for doesn't exist",
  };

  const description = currentPage.description.replace(
    "{firstName}",
    user?.name.firstName || ""
  );

  return (
    <header className="bg-surface border-b border-surface-border p-6">
      <h2 className="text-xl font-semibold text-surface-foreground">
        {currentPage.title}
      </h2>
      <p className="text-sm text-surface-foreground/70 mt-1">{description}</p>
    </header>
  );
}
