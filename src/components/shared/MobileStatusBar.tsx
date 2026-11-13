import { Wifi, Battery } from 'lucide-react';

interface MobileStatusBarProps {
  variant?: 'dark' | 'light';
  time?: string;
  className?: string;
}

export default function MobileStatusBar({
  variant = 'dark',
  time = '14.53',
  className = '',
}: MobileStatusBarProps) {
  const isLight = variant === 'light';
  const textColor = isLight ? 'text-white' : 'text-[#111827]';

  return (
    <div
      className={`w-full px-5 pt-3 pb-2 flex items-center justify-between text-xs font-semibold select-none z-30 ${textColor} ${className}`}
    >
      <span className="text-[11px] font-bold tracking-tight">{time}</span>
      <div className="flex items-center gap-2">
        {/* Signal bars */}
        <div className="flex items-end gap-[1.5px] h-2.5">
          <span className={`w-[2.5px] h-1 rounded-[0.5px] ${isLight ? 'bg-white' : 'bg-current'}`} />
          <span className={`w-[2.5px] h-1.5 rounded-[0.5px] ${isLight ? 'bg-white' : 'bg-current'}`} />
          <span className={`w-[2.5px] h-2 rounded-[0.5px] ${isLight ? 'bg-white' : 'bg-current'}`} />
          <span className={`w-[2.5px] h-2.5 rounded-[0.5px] ${isLight ? 'bg-white' : 'bg-current'}`} />
        </div>
        <Wifi size={13} strokeWidth={2.5} />
        <Battery size={14} strokeWidth={2.5} className="rotate-90 ml-0.5" />
      </div>
    </div>
  );
}
