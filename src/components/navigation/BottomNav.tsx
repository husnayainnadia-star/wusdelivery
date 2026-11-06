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
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50"
      style={{ maxWidth: 430, margin: '0 auto' }}>
      <div className="flex items-center justify-around px-2 py-2 pb-4">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          const isOrders = href === '/orders';
          return (
            <Link key={href} href={href}
              className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all relative"
              style={{ color: isActive ? '#193CA5' : '#8B90A0' }}>
              <div className="relative">
                <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
                {isOrders && totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-semibold">{label}</span>
              {isActive && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#193CA5]" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
