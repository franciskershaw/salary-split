import type { Ref } from "react";

import { DollarSignIcon, LogOutIcon, SettingsIcon } from "lucide-react";
import { Link } from "react-router-dom";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuth from "@/pages/Auth/hooks/useAuth";
import type { User } from "@/types/globalTypes";

const MobileHeader = ({
  user,
  ref,
}: {
  user: User;
  ref: Ref<HTMLHeadElement>;
}) => {
  const { logout } = useAuth();

  return (
    <header
      ref={ref}
      className="bg-surface text-surface-foreground p-4 md:p-6 border-b border-surface-border flex items-center justify-between sticky top-0 z-10 shadow-sm"
    >
      <div className="md:hidden flex items-center">
        <DollarSignIcon className="mr-2 h-7 w-7" />
        <h1 className="text-xl font-semibold text-primary">SalarySplit</h1>
      </div>

      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="p-1 hover:bg-surface-hover rounded-full transition-colors"
            >
              <Avatar className="size-12">
                <AvatarFallback>
                  {user?.name.firstName.charAt(0)}
                  {user?.name.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <div className="flex items-center p-2">
              <Avatar className="size-10">
                <AvatarFallback>
                  {user?.name.firstName.charAt(0)}
                  {user?.name.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="text-sm font-medium text-surface-foreground">
                  {user?.name.firstName} {user?.name.lastName}
                </p>
                <p className="text-xs text-surface-foreground/70">
                  {user?.email}
                </p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/settings" className="cursor-pointer">
                <SettingsIcon className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer text-destructive focus:text-destructive"
              onClick={logout}
            >
              <LogOutIcon className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default MobileHeader;
