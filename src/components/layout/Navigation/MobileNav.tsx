import {
  // BarChartIcon,
  BoxIcon,
  HomeIcon,
  ReceiptPoundSterling,
  WalletCards,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { cn } from "@/lib/utils";

type NavItemProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
};

const NavItem = ({ href, icon, label, isActive }: NavItemProps) => (
  <Link
    to={href}
    className={cn(
      "flex flex-col items-center justify-center flex-1 h-full transition-colors",
      isActive
        ? "text-primary bg-surface-hover"
        : "text-surface-foreground hover:bg-surface-hover/50"
    )}
  >
    {icon}
    <span className="text-xs mt-1">{label}</span>
  </Link>
);

export default function MobileNav() {
  const location = useLocation();

  const navItems = [
    {
      href: "/dashboard",
      icon: <HomeIcon className="h-6 w-6" />,
      label: "Home",
    },
    {
      href: "/accounts",
      icon: <WalletCards className="h-6 w-6" />,
      label: "Accounts",
    },
    {
      href: "/bills",
      icon: <ReceiptPoundSterling className="h-6 w-6" />,
      label: "Bills",
    },
    {
      href: "/expenses",
      icon: <BoxIcon className="h-6 w-6" />,
      label: "Expenses",
    },
    // {
    //   href: "/savings",
    //   icon: <BarChartIcon className="h-6 w-6" />,
    //   label: "Savings",
    // },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-surface-border">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            isActive={location.pathname === item.href}
          />
        ))}
      </div>
    </nav>
  );
}
