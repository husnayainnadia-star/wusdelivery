'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Tag, ShoppingBag, MessageCircle, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const NAV_ITEMS = [
  { href: '/', label: 'Beranda', icon: Home },
  { href: '/promo', label: 'Promo', icon: Tag },
  { href: '/orders', label: 'Pesanan', icon: ShoppingBag },
  { href: '/chat', label: 'Chat', icon: MessageCircle },
  { href: '/profile', label: 'Profil', icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { totalItems } = useCart();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white border-t border-gray-100 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-around px-3 pt-2 pb-3.5">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          const isOrders = href === '/orders';

          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 transition-all relative ${
                isActive ? 'text-[#193CA5]' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <div className="relative">
                <Icon size={21} strokeWidth={isActive ? 2.5 : 1.8} />
                {isOrders && totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </div>
              <span className={`text-[10px] ${isActive ? 'font-bold' : 'font-medium'}`}>{label}</span>
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
