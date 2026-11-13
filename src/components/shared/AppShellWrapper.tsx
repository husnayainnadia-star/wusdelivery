'use client';

export default function AppShellWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-shell shadow-2xl min-h-screen relative flex flex-col bg-[#F5F6FA] overflow-x-hidden">
      {children}
    </div>
  );
}
