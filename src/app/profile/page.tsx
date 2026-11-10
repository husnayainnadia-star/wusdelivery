'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Phone, MapPin, Package, Heart, Settings, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
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
  const { user, isAuthenticated, signOut } = useAuth();

  const handleLogout = () => {
    signOut();
    router.push('/sign-in');
  };

  const displayName = user?.name || 'Pelanggan Setia';
  const displayEmail = user?.email || 'user@wusdelivery.com';
  const displayPhone = user?.phone || '0812-3456-7890';
  const displayAddress = user?.address || 'Jl. Melati No.12, Surakarta';

  return (
    <div className="min-h-screen bg-[#F5F6FA] flex flex-col relative pb-28 select-none">
      {/* ── STATUS BAR ── */}
      <MobileStatusBar variant="dark" className="page-px px-5" />

      {/* ── HEADER ── */}
      <div className="bg-white page-px px-5 pt-2 pb-3.5 flex items-center justify-between border-b border-gray-100">
        <h1 className="text-base font-extrabold text-[#171717]">Profil Saya</h1>
        <div className="w-6" />
      </div>

      {/* ── CONTENT ── */}
      <div className="flex-1 min-h-0 overflow-y-auto page-px px-5 pt-4 space-y-4 pb-8">
        {/* Profile Card with Generous Padding */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#EAF1FF] border-2 border-[#193CA5] flex items-center justify-center text-2xl text-[#193CA5] shrink-0 shadow-xs">
            <User size={28} />
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-bold text-[#171717] truncate">{displayName}</h2>
            <p className="text-xs text-gray-400 mt-0.5 truncate">{displayEmail}</p>
            <span className="inline-block mt-1 text-[10px] font-extrabold text-[#193CA5] bg-[#EAF1FF] px-2.5 py-0.5 rounded-full">
              Member WUS Silver
            </span>
          </div>
        </div>

        {/* User Details Card */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm space-y-3">
          <h3 className="text-xs font-bold text-[#171717]">Informasi Kontak & Alamat</h3>

          <div className="space-y-3 text-xs text-gray-600">
            <div className="flex items-center gap-3">
              <Phone size={15} className="text-[#193CA5] shrink-0" />
              <span>{displayPhone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={15} className="text-[#193CA5] shrink-0" />
              <span>{displayEmail}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={15} className="text-[#193CA5] shrink-0" />
              <span className="truncate">{displayAddress}</span>
            </div>
          </div>
        </div>

        {/* Quick Menus Card */}
        <div className="bg-white rounded-2xl p-3 border border-gray-100 shadow-sm">
          {MENU_ITEMS.map(({ icon: Icon, label, href, color }) => (
            <Link key={label} href={href}>
              <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 active:scale-[0.99] transition-all">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${color}15`, color }}
                  >
                    <Icon size={16} />
                  </div>
                  <span className="text-xs font-semibold text-[#171717]">{label}</span>
                </div>
                <ChevronRight size={15} className="text-gray-300" />
              </div>
            </Link>
          ))}
        </div>

        {/* Logout or Login button */}
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-bold py-3 rounded-2xl text-xs flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <LogOut size={15} />
            Keluar dari Akun
          </button>
        ) : (
          <Link href="/sign-in">
            <button className="w-full bg-[#193CA5] text-white font-bold py-3.5 rounded-2xl text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md shadow-[#193CA5]/25">
              Masuk / Buat Akun
            </button>
          </Link>
        )}
      </div>

      {/* ── BOTTOM NAV ── */}
      <BottomNav />
    </div>
  );
}
