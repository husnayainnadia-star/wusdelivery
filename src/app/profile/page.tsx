'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Phone, MapPin, Package, Heart, Settings, HelpCircle, LogOut, ChevronRight, Edit3 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import BottomNav from '@/components/navigation/BottomNav';

const MENU_ITEMS = [
  { icon: Package, label: 'Riwayat Pesanan', href: '/orders', color: '#193CA5' },
  { icon: Heart, label: 'Favorit', href: '#', color: '#EF4444' },
  { icon: Settings, label: 'Pengaturan Akun', href: '#', color: '#8B5CF6' },
  { icon: HelpCircle, label: 'Pusat Bantuan', href: '#', color: '#10B981' },
];

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, signOut } = useAuth();

  const handleLogout = () => { signOut(); router.push('/sign-in'); };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#F5F6FA] flex flex-col items-center justify-center px-6 pb-20">
        <span className="text-6xl mb-4">👤</span>
        <h2 className="text-xl font-black text-[#171717] mb-2">Masuk ke Akunmu</h2>
        <p className="text-sm text-gray-400 text-center mb-6">Masuk untuk mengakses profil, riwayat pesanan, dan lebih banyak fitur.</p>
        <Link href="/sign-in" className="w-full">
          <button className="w-full bg-[#193CA5] text-white py-4 rounded-2xl font-bold text-sm shadow-lg shadow-[#193CA5]/30">Masuk</button>
        </Link>
        <Link href="/sign-up" className="mt-3 text-sm text-[#193CA5] font-semibold">Daftar akun baru</Link>
        <BottomNav />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F6FA]">
      {/* Header */}
      <div className="bg-[#193CA5] px-4 pt-12 pb-16 rounded-b-3xl">
        <h1 className="text-white text-lg font-bold mb-1">Profil Saya</h1>
      </div>

      {/* Profile Card */}
      <div className="px-4 -mt-10 mb-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4">
          <div className="w-16 h-16 bg-[#EAF1FF] rounded-full flex items-center justify-center text-3xl border-2 border-[#193CA5] shrink-0">
            👤
          </div>
          <div className="flex-1">
            <p className="font-black text-[#171717] text-base">{user?.name || 'Pengguna WUS'}</p>
            <p className="text-xs text-gray-500 mt-0.5">{user?.email}</p>
            <p className="text-xs text-gray-500">{user?.phone || '-'}</p>
          </div>
          <button className="w-9 h-9 bg-[#EAF1FF] rounded-xl flex items-center justify-center">
            <Edit3 size={16} className="text-[#193CA5]" />
          </button>
        </div>
      </div>

      <div className="px-4 pb-28 space-y-3">
        {/* Info */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-sm text-[#171717] mb-3">Informasi Akun</h3>
          {[
            { icon: User, label: 'Nama Lengkap', value: user?.name || '-' },
            { icon: Mail, label: 'Email', value: user?.email || '-' },
            { icon: Phone, label: 'Nomor Telepon', value: user?.phone || '-' },
            { icon: MapPin, label: 'Alamat Utama', value: user?.address || 'Belum diatur' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
              <div className="w-8 h-8 bg-[#EAF1FF] rounded-lg flex items-center justify-center shrink-0">
                <Icon size={14} className="text-[#193CA5]" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400">{label}</p>
                <p className="text-sm font-semibold text-[#171717]">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Menu */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {MENU_ITEMS.map(({ icon: Icon, label, href, color }) => (
            <Link key={label} href={href}>
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-50 last:border-0 active:bg-gray-50">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: color + '20' }}>
                  <Icon size={15} style={{ color }} />
                </div>
                <span className="flex-1 text-sm font-semibold text-[#171717]">{label}</span>
                <ChevronRight size={14} className="text-gray-300" />
              </div>
            </Link>
          ))}
        </div>

        {/* Logout */}
        <button onClick={handleLogout}
          className="w-full bg-red-50 border border-red-100 rounded-2xl py-4 flex items-center justify-center gap-2">
          <LogOut size={16} className="text-red-500" />
          <span className="text-sm font-bold text-red-500">Keluar dari Akun</span>
        </button>

        <p className="text-center text-xs text-gray-300 pb-2">WUSDelivery v1.0.0 — Mode Demo</p>
      </div>
      <BottomNav />
    </main>
  );
}
