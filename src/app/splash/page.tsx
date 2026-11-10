'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MobileStatusBar from '@/components/shared/MobileStatusBar';
import WUSLogo from '@/components/shared/WUSLogo';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/sign-in');
    }, 2400);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div
      onClick={() => router.push('/sign-in')}
      className="min-h-screen bg-[#193CA5] flex flex-col justify-between cursor-pointer select-none relative overflow-hidden"
    >
      {/* Mobile Status Bar */}
      <MobileStatusBar variant="light" />

      {/* Decorative background glow circles */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />

      {/* Center Logo */}
      <div className="flex-1 flex flex-col items-center justify-center -mt-10 px-8 text-center animate-fade-in">
        <WUSLogo size="xl" variant="white" showSubtitle={true} />
      </div>

      {/* Bottom Hint */}
      <div className="pb-10 flex flex-col items-center gap-2">
        <div className="w-8 h-8 rounded-full border-2 border-white/30 border-t-white animate-spin" />
        <span className="text-white/70 text-xs font-medium">Ketuk untuk melanjutkan</span>
      </div>
    </div>
  );
}
