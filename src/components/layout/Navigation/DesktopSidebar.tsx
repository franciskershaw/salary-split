import {
  BarChartIcon,
  BoxIcon,
  LogOutIcon,
  ReceiptPoundSterling,
  SettingsIcon,
  WalletCards,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import useAuth from "@/pages/Auth/hooks/useAuth";
import type { User } from "@/types/globalTypes";

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
      "flex items-center px-4 py-3 rounded-lg font-medium transition-colors",
      isActive
        ? "text-primary bg-surface-hover"
        : "text-surface-foreground hover:bg-surface-hover/50"
    )}
  >
    <span className="mr-3 text-lg">{icon}</span>
    {label}
  </Link>
);

type DesktopSidebarProps = {
  user: User;
};

export default function DesktopSidebar({ user }: DesktopSidebarProps) {
  const location = useLocation();
  const { logout } = useAuth();

  const mainNavItems = [
    { href: "/dashboard", icon: <BarChartIcon />, label: "Dashboard" },
    { href: "/accounts", icon: <WalletCards />, label: "Accounts" },
    { href: "/bills", icon: <ReceiptPoundSterling />, label: "Bills" },
    { href: "/expenses", icon: <BoxIcon />, label: "Expenses" },
    { href: "/savings", icon: <BarChartIcon />, label: "Savings" },
  ];

  const settingsNavItems = [
    { href: "/settings", icon: <SettingsIcon />, label: "Settings" },
    { href: "#", icon: <LogOutIcon />, label: "Logout", onClick: logout },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-surface border-r border-surface-border p-4">
      <nav className="space-y-4 flex-1">
        {mainNavItems.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            isActive={location.pathname === item.href}
          />
        ))}
      </nav>

      <div className="mt-auto pt-4 border-t border-surface-border">
        <div className="flex items-center px-2 py-2">
          <Avatar className="size-10 shrink-0">
            <AvatarFallback>
              {user?.name.firstName.charAt(0)}
              {user?.name.lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="ml-3 min-w-0">
            <p className="text-sm font-medium text-surface-foreground truncate">
              {user?.name.firstName} {user?.name.lastName}
            </p>
            <p className="text-xs text-surface-foreground/70 truncate">
              {user?.email}
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-1">
          {settingsNavItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={item.onClick}
              className={cn(
                "flex items-center px-4 py-4 rounded-lg font-medium transition-colors",
                item.href === "#"
                  ? "text-destructive hover:bg-surface-hover/50"
                  : location.pathname === item.href
                    ? "text-primary bg-surface-hover"
                    : "text-surface-foreground hover:bg-surface-hover/50"
              )}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
