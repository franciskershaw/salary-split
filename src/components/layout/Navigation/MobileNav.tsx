import {
  BarChartIcon,
  BoxIcon,
  HomeIcon,
  ReceiptPoundSterling,
  WalletCards,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { cn } from "@/lib/utils";

export default function MobileNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-surface-border">
      <div className="flex justify-around items-center h-16">
        <Link
          to="/"
          className={cn(
            "flex flex-col items-center justify-center flex-1 h-full",
            location.pathname === "/"
              ? "text-primary"
              : "text-surface-foreground"
          )}
        >
          <HomeIcon className="h-6 w-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link
          to="/accounts"
          className={cn(
            "flex flex-col items-center justify-center flex-1 h-full",
            location.pathname === "/accounts"
              ? "text-primary"
              : "text-surface-foreground"
          )}
        >
          <WalletCards className="h-6 w-6" />
          <span className="text-xs mt-1">Accounts</span>
        </Link>
        <Link
          to="/bills"
          className={cn(
            "flex flex-col items-center justify-center flex-1 h-full",
            location.pathname === "/bills"
              ? "text-primary"
              : "text-surface-foreground"
          )}
        >
          <ReceiptPoundSterling className="h-6 w-6" />
          <span className="text-xs mt-1">Bills</span>
        </Link>
        <Link
          to="/expenses"
          className={cn(
            "flex flex-col items-center justify-center flex-1 h-full",
            location.pathname === "/expenses"
              ? "text-primary"
              : "text-surface-foreground"
          )}
        >
          <BoxIcon className="h-6 w-6" />
          <span className="text-xs mt-1">Expenses</span>
        </Link>
        <Link
          to="/savings"
          className={cn(
            "flex flex-col items-center justify-center flex-1 h-full",
            location.pathname === "/savings"
              ? "text-primary"
              : "text-surface-foreground"
          )}
        >
          <BarChartIcon className="h-6 w-6" />
          <span className="text-xs mt-1">Savings</span>
        </Link>
      </div>
    </nav>
  );
}
