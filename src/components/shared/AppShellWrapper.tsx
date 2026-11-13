'use client';

import { usePathname } from 'next/navigation';
import DesktopNavbar from '@/components/navigation/DesktopNavbar';

const AUTH_PATHS = ['/sign-in', '/sign-up', '/forgot-password', '/splash'];

export default function AppShellWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = AUTH_PATHS.some(p => pathname === p || pathname.startsWith(p + '/'));

  if (isAuthPage) {
    // Auth pages render full-width without header
    return <>{children}</>;
  }

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] flex flex-col text-[#1e293b]">
      {/* Top Navbar for Laptop / Desktop */}
      <DesktopNavbar />

      {/* Main Page Content */}
      <div className="flex-1 w-full">
        {children}
      </div>
    </div>
  );
}
