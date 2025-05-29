import { Outlet } from "react-router-dom";

import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { Toaster } from "@/components/ui/sonner";
import { useTheme } from "@/contexts/Theme/ThemeContext";
import useUser from "@/hooks/user/useUser";

import DesktopSidebar from "../Navigation/DesktopSidebar";
import MobileHeader from "../Navigation/MobileHeader";
import MobileNav from "../Navigation/MobileNav";

const SharedLayout = () => {
  const { user, fetchingUser } = useUser();
  const { darkMode } = useTheme();

  if (fetchingUser && !user) {
    return <LoadingOverlay fullPage />;
  }

  return (
    <div
      className={`min-h-screen bg-background text-foreground ${
        darkMode ? "dark" : ""
      }`}
    >
      {user ? (
        <>
          {/* Mobile Header - Only visible on mobile */}
          <div className="md:hidden">
            <MobileHeader user={user} />
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:flex min-h-screen">
            <DesktopSidebar user={user} />
            <div className="flex-1 flex flex-col">
              <main className="flex-1">
                <Outlet />
              </main>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden">
            <main>
              <Outlet />
            </main>
            <MobileNav />
          </div>
        </>
      ) : (
        <main>
          <Outlet />
        </main>
      )}

      <Toaster />
    </div>
  );
};

export default SharedLayout;
