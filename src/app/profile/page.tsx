'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Phone, MapPin, Package, Heart, Settings, HelpCircle, LogOut, ChevronRight, CreditCard } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import BottomNav from '@/components/navigation/BottomNav';
import MobileStatusBar from '@/components/shared/MobileStatusBar';

const MENU_ITEMS = [
  { icon: Package, label: 'Riwayat Pesanan Saya', desc: 'Lihat status & histori pesanan', href: '/orders', color: '#193CA5' },
  { icon: Heart, label: 'Restoran Favorit', desc: 'Daftar resto yang kamu sukai', href: '/food', color: '#EF4444' },
  { icon: CreditCard, label: 'Metode Pembayaran & WusPay', desc: 'Kelola kartu dan saldo dompet', href: '#', color: '#10B981' },
  { icon: HelpCircle, label: 'Pusat Bantuan & Customer Care', desc: 'Chat dengan CS 24 Jam', href: '/chat', color: '#8B5CF6' },
  { icon: Settings, label: 'Pengaturan Akun & Keamanan', desc: 'Kata sandi dan notifikasi', href: '#', color: '#6B7280' },
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
  const displayAddress = user?.address || 'Jl. Melati No.12, Surakarta, Jawa Tengah';

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col pb-24 md:pb-12 select-none">
      <MobileStatusBar />

      {/* ── MOBILE HEADER (Hidden on desktop) ── */}
      <div className="md:hidden bg-white px-5 pt-3 pb-3.5 flex items-center justify-between border-b border-gray-100 shadow-2xs">
        <h1 className="text-base font-extrabold text-[#111827]">Profil Saya</h1>
        <div className="w-6" />
      </div>

      {/* ── MAIN CONTENT (Laptop/Desktop Responsive Layout) ── */}
      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-5 md:py-8 flex-1 space-y-6">
        <div className="hidden md:block">
          <h1 className="text-2xl font-black text-[#111827]">Pengaturan Profil & Akun</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola data pribadi, alamat pengiriman, dan preferensi akun Anda</p>
        </div>

        {/* Profile Header Card */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-150 shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
          <div className="w-20 h-20 rounded-3xl bg-[#EAF1FF] border-2 border-[#193CA5] flex items-center justify-center text-3xl font-black text-[#193CA5] shrink-0 shadow-xs">
            {displayName.charAt(0).toUpperCase()}
          </div>

          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h2 className="text-lg md:text-xl font-extrabold text-[#111827] truncate">{displayName}</h2>
              <span className="inline-block text-[11px] font-black text-[#193CA5] bg-[#EAF1FF] border border-blue-200 px-3 py-0.5 rounded-full self-center sm:self-auto">
                Member VIP WUS
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500">{displayEmail}</p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-3 text-xs text-gray-600">
              <span className="flex items-center gap-1.5"><Phone size={14} className="text-[#193CA5]" /> {displayPhone}</span>
              <span className="flex items-center gap-1.5"><MapPin size={14} className="text-[#193CA5]" /> {displayAddress}</span>
            </div>
          </div>
        </div>

        {/* Menu Items Card */}
        <div className="bg-white rounded-3xl border border-gray-150 shadow-xs divide-y divide-gray-100 overflow-hidden">
          {MENU_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                href={item.href}
                className="p-5 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-2xs shrink-0"
                    style={{ backgroundColor: `${item.color}15`, color: item.color }}
                  >
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#111827] group-hover:text-[#193CA5] transition-colors">
                      {item.label}
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                  </div>
                </div>

                <ChevronRight size={18} className="text-gray-300 group-hover:text-[#193CA5] transition-colors shrink-0" />
              </Link>
            );
          })}
        </div>

        {/* Logout Button */}
        <div className="pt-2">
          <button
            onClick={handleLogout}
            className="w-full bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 font-bold py-4 px-6 rounded-2xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <LogOut size={16} /> Keluar dari Akun (Logout)
          </button>
        </div>
      </main>

      {/* ── MOBILE BOTTOM NAV ── */}
      <BottomNav />
    </div>
  );
}
