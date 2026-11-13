'use client';

import { usePathname } from 'next/navigation';

const AUTH_PATHS = ['/sign-in', '/sign-up', '/forgot-password'];

export default function AppShellWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = AUTH_PATHS.some(p => pathname === p || pathname.startsWith(p + '/'));

  if (isAuthPage) {
    // Auth pages render full-width — no mobile shell constraint
    return <>{children}</>;
  }

  return (
    <div className="app-shell shadow-2xl overflow-hidden min-h-screen">
      {children}
    </div>
  );
}
