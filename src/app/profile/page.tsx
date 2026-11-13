'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Phone, MapPin, Package, Heart, Settings, HelpCircle, LogOut, ChevronRight, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import BottomNav from '@/components/navigation/BottomNav';
import MobileStatusBar from '@/components/shared/MobileStatusBar';

const MENU_ITEMS = [
  { icon: Package, label: 'Riwayat Pesanan', href: '/orders', color: '#193CA5' },
  { icon: Heart, label: 'Restoran Favorit', href: '/food', color: '#EF4444' },
  { icon: Settings, label: 'Pengaturan Akun', href: '#', color: '#8B5CF6' },
  { icon: HelpCircle, label: 'Pusat Bantuan & CS', href: '/chat', color: '#10B981' },
];

export default function ProfilePage() {
  const router = useRouter();
  const { user, signOut } = useAuth();

  const handleLogout = () => {
    signOut();
    router.push('/sign-in');
  };

  const displayName = user?.name || 'Husnayain Nadia';
  const displayEmail = user?.email || 'nadia@wusdelivery.com';
  const displayPhone = user?.phone || '0812-3456-7890';
  const displayAddress = user?.address || 'Jl. Melati No.12, Surakarta';

  return (
    <div className="min-h-screen bg-[#F5F6FA] flex flex-col relative pb-28 select-none">
      {/* ── STATUS BAR ── */}
      <MobileStatusBar variant="dark" />

      {/* ── HEADER ── */}
      <div className="bg-white px-5 pt-2 pb-3.5 flex items-center justify-between border-b border-gray-100 shadow-2xs">
        <h1 className="text-base font-extrabold text-[#111827]">Profil Saya</h1>
        <div className="w-6" />
      </div>

      {/* ── CONTENT ── */}
      <div className="flex-1 min-h-0 overflow-y-auto px-5 pt-4 space-y-4 pb-8">
        {/* Profile Card with Generous Internal Padding */}
        <div className="bg-white rounded-2xl p-4 border border-gray-150 shadow-2xs flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#EAF1FF] border-2 border-[#193CA5] flex items-center justify-center text-xl font-black text-[#193CA5] shrink-0">
            <User size={24} />
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-extrabold text-[#111827] truncate">{displayName}</h2>
            <p className="text-xs text-gray-400 mt-0.5 truncate">{displayEmail}</p>
            <span className="inline-block mt-1 text-[10px] font-bold text-[#193CA5] bg-[#EAF1FF] px-2.5 py-0.5 rounded-full">
              Member WUS Silver
            </span>
          </div>
        </div>

        {/* User Details Box */}
        <div className="bg-white rounded-2xl p-4 border border-gray-150 shadow-2xs space-y-2.5">
          <h3 className="text-xs font-extrabold text-[#111827]">Informasi Kontak & Alamat</h3>

          <div className="space-y-2.5 text-xs text-gray-600">
            <div className="flex items-center gap-3">
              <Phone size={14} className="text-[#193CA5] shrink-0" />
              <span>{displayPhone}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={14} className="text-[#193CA5] shrink-0" />
              <span className="truncate">{displayAddress}</span>
            </div>
          </div>
        </div>

        {/* Quick Menus Card */}
        <div className="bg-white rounded-2xl border border-gray-150 shadow-2xs divide-y divide-gray-100 overflow-hidden">
          {MENU_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                href={item.href}
                className="p-3.5 flex items-center justify-between gap-3 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${item.color}15`, color: item.color }}
                  >
                    <Icon size={16} />
                  </div>
                  <span className="text-xs font-bold text-gray-800">{item.label}</span>
                </div>
                <ChevronRight size={15} className="text-gray-300 shrink-0" />
              </Link>
            );
          })}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 font-bold py-3.5 rounded-xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
        >
          <LogOut size={15} /> Keluar dari Akun
        </button>
      </div>

      {/* ── BOTTOM NAV ── */}
      <BottomNav />
    </div>
  );
}
