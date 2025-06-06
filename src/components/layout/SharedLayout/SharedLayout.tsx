import { useEffect, useRef, useState } from "react";

import { Outlet } from "react-router-dom";

import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { Toaster } from "@/components/ui/sonner";
import { useTheme } from "@/contexts/Theme/ThemeContext";
import useUser from "@/hooks/user/useUser";
import { useScrollDirection } from "@/hooks/utility/useScrollDirection";

import DesktopSidebar from "../Navigation/DesktopSidebar";
import MobileHeader from "../Navigation/MobileHeader";
import MobileNav from "../Navigation/MobileNav";

const SharedLayout = () => {
  const { user, fetchingUser } = useUser();
  const { darkMode } = useTheme();
  const scrollDirection = useScrollDirection();
  const mobileHeaderRef = useRef<HTMLHeadElement>(null);
  const [mobileHeaderHeight, setMobileHeaderHeight] = useState(0);

  const mobileHeaderVisible = scrollDirection !== "down";

  useEffect(() => {
    if (mobileHeaderRef.current) {
      setMobileHeaderHeight(mobileHeaderRef.current.offsetHeight);
    }
  }, []);

  if (fetchingUser && !user) {
    return <LoadingOverlay fullPage />;
  }

  return (
    <div
      className={`min-h-screen bg-background text-foreground ${
        darkMode ? "dark" : ""
      } [--mobile-header-height:${mobileHeaderHeight}px] [--mobile-header-offset:${
        mobileHeaderVisible ? "0px" : `-${mobileHeaderHeight}px`
      }]`}
    >
      {user ? (
        <>
          {/* Mobile Header - Only visible on mobile */}
          <div className="md:hidden transition-transform duration-300 ease-in-out mobile-header-translate">
            <MobileHeader ref={mobileHeaderRef} user={user} />
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:flex h-screen overflow-hidden">
            <DesktopSidebar user={user} />
            <div className="flex-1 flex flex-col overflow-y-auto">
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
