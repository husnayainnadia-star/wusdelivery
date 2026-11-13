'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  MapPin,
  Search,
  Bell,
  ShoppingBag,
  User,
  ChevronDown,
  Home,
  UtensilsCrossed,
  Tag,
  MessageCircle,
} from 'lucide-react';
import WUSLogo from '@/components/shared/WUSLogo';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

const NAV_LINKS = [
  { href: '/', label: 'Beranda', icon: Home },
  { href: '/food', label: 'WUSFood', icon: UtensilsCrossed },
  { href: '/promo', label: 'Promo', icon: Tag },
  { href: '/orders', label: 'Pesanan', icon: ShoppingBag },
  { href: '/chat', label: 'Chat Support', icon: MessageCircle },
];

export default function DesktopNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { totalItems } = useCart();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/food?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="hidden md:block sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-6">
        {/* Left: Brand Logo & Address Pill */}
        <div className="flex items-center gap-6 shrink-0">
          <Link href="/" className="hover:opacity-90 transition-opacity">
            <WUSLogo layout="horizontal" variant="blue" showSubtitle={true} />
          </Link>

          <div className="hidden lg:flex items-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-200/70 rounded-full px-3.5 py-1.5 transition-colors cursor-pointer text-xs">
            <MapPin size={14} className="text-[#193CA5] shrink-0" />
            <div className="flex items-center gap-1.5">
              <span className="text-gray-500 font-medium">Antar ke:</span>
              <span className="font-bold text-[#111827] truncate max-w-[170px]">
                Jl. Melati No.12, Surakarta
              </span>
              <ChevronDown size={13} className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-md">
          <form onSubmit={handleSearch} className="relative flex items-center">
            <Search size={16} className="absolute left-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Cari makanan, minuman, atau layanan..."
              className="w-full bg-[#F3F4F6] hover:bg-[#E5E7EB]/70 focus:bg-white text-xs text-[#111827] placeholder:text-gray-400 font-medium pl-10 pr-4 py-2.5 rounded-full border border-transparent focus:border-[#193CA5] outline-none transition-all shadow-inner"
            />
          </form>
        </div>

        {/* Right: Navigation Items & User Actions */}
        <div className="flex items-center gap-3">
          <nav className="flex items-center gap-1">
            {NAV_LINKS.map(item => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-blue-50 text-[#193CA5]'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={15} strokeWidth={isActive ? 2.5 : 2} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="h-6 w-px bg-gray-200 mx-1" />

          {/* Notifications */}
          <Link
            href="/notifications"
            className="w-9 h-9 rounded-xl bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-700 relative transition-colors"
            title="Notifikasi"
          >
            <Bell size={17} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </Link>

          {/* Cart Button */}
          <Link
            href="/cart"
            className="flex items-center gap-2 bg-[#193CA5] hover:bg-[#15328A] text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs active:scale-95"
            title="Keranjang Belanja"
          >
            <div className="relative">
              <ShoppingBag size={16} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </div>
            <span className="hidden xl:inline">Keranjang</span>
          </Link>

          {/* User Profile */}
          <Link
            href="/profile"
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-gray-50 border border-gray-150 transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-blue-100 text-[#193CA5] font-extrabold text-xs flex items-center justify-center">
              {user?.name ? user.name.charAt(0).toUpperCase() : <User size={14} />}
            </div>
            <span className="text-xs font-bold text-gray-800 max-w-[80px] truncate">
              {user?.name || 'Profil'}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
