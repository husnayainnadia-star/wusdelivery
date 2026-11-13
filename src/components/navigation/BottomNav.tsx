'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Percent, ReceiptText, MessageSquareQuote, User2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const NAV_ITEMS = [
  { href: '/', label: 'Beranda', icon: Compass },
  { href: '/promo', label: 'Promo', icon: Percent },
  { href: '/orders', label: 'Pesanan', icon: ReceiptText },
  { href: '/chat', label: 'Chat', icon: MessageSquareQuote },
  { href: '/profile', label: 'Akun', icon: User2 },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { totalItems } = useCart();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white/95 backdrop-blur-md border-t border-gray-100 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.04)] select-none">
      <div className="flex items-center justify-around px-2 pt-2 pb-3">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          const isOrders = href === '/orders';

          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-1 px-3 py-1 transition-all relative ${
                isActive ? 'text-[#193CA5]' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <div className="relative">
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                {isOrders && totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 min-w-4 h-4 px-1 bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center border border-white">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </div>
              <span className={`text-[10px] ${isActive ? 'font-black tracking-tight' : 'font-semibold'}`}>
                {label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#193CA5] mt-0.5" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
