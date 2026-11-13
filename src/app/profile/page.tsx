'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  MapPin,
  Package,
  Heart,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  User,
  Wallet,
  ShieldCheck,
  CreditCard,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import BottomNav from '@/components/navigation/BottomNav';
import MobileStatusBar from '@/components/shared/MobileStatusBar';

const MENU_ITEMS = [
  { icon: Package, label: 'Pesanan Saya', desc: 'Riwayat transaksi & live tracking', href: '/orders', color: '#193CA5' },
  { icon: Heart, label: 'Resto & Menu Favorit', desc: 'Daftar kuliner yang kamu simpan', href: '/food', color: '#EF4444' },
  { icon: CreditCard, label: 'Metode Pembayaran', desc: 'Atur kartu debit & WusPay', href: '#', color: '#10B981' },
  { icon: HelpCircle, label: 'Pusat Bantuan (CS)', desc: 'Chat 24 jam dengan tim CS', href: '/chat', color: '#8B5CF6' },
  { icon: Settings, label: 'Pengaturan Akun', desc: 'Keamanan, PIN & ganti password', href: '#', color: '#64748B' },
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
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col relative pb-28 select-none">
      {/* ── STATUS BAR ── */}
      <MobileStatusBar variant="dark" />

      {/* ── HEADER (Gojek Profile Style) ── */}
      <div className="bg-white px-4 pt-2 pb-3.5 flex items-center justify-between border-b border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.02)] sticky top-0 z-40">
        <h1 className="text-sm font-black text-[#0F172A]">Akun Saya</h1>
        <span className="text-[10px] font-bold text-[#193CA5] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
          WUS Member
        </span>
      </div>

      {/* ── CONTENT ── */}
      <main className="flex-1 min-h-0 overflow-y-auto px-4 pt-3.5 space-y-3.5 pb-8">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl p-4 border border-gray-150 shadow-[0_1px_4px_rgba(0,0,0,0.03)] flex items-center gap-3.5">
          <div className="w-13 h-13 rounded-2xl bg-[#EBF3FF] border-2 border-[#193CA5] flex items-center justify-center text-xl font-black text-[#193CA5] shrink-0">
            <User size={22} />
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-xs font-black text-[#0F172A] truncate">{displayName}</h2>
            <p className="text-[11px] text-gray-400 mt-0.5 truncate">{displayEmail} • {displayPhone}</p>
            <div className="flex items-center gap-1 text-[10px] text-gray-500 mt-1">
              <MapPin size={11} className="text-[#193CA5] shrink-0" />
              <span className="truncate">{displayAddress}</span>
            </div>
          </div>
        </div>

        {/* WusPay Balance Quick Card (Gojek Style) */}
        <div className="bg-gradient-to-r from-[#102e99] to-[#193CA5] rounded-3xl p-4 text-white shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center text-white">
              <Wallet size={18} />
            </div>
            <div>
              <span className="text-[10px] text-white/80 font-bold block uppercase tracking-wider">Saldo WusPay</span>
              <span className="text-sm font-black text-white">Rp 125.000</span>
            </div>
          </div>
          <button
            onClick={() => router.push('/checkout')}
            className="bg-white text-[#193CA5] text-[11px] font-black px-3 py-1.5 rounded-xl shadow-xs active:scale-95 transition-all"
          >
            Isi Saldo
          </button>
        </div>

        {/* Menu Items (Gojek Account List) */}
        <div className="bg-white rounded-3xl border border-gray-150 shadow-[0_1px_4px_rgba(0,0,0,0.03)] divide-y divide-gray-100 overflow-hidden">
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
                    className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${item.color}15`, color: item.color }}
                  >
                    <Icon size={16} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#0F172A] block">{item.label}</span>
                    <span className="text-[10px] text-gray-400">{item.desc}</span>
                  </div>
                </div>
                <ChevronRight size={15} className="text-gray-300 shrink-0" />
              </Link>
            );
          })}
        </div>

        {/* Security badge */}
        <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-400 pt-1">
          <ShieldCheck size={13} className="text-emerald-500" />
          <span>Aplikasi WUSDelivery Terverifikasi & Aman</span>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 font-bold py-3.5 rounded-2xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
        >
          <LogOut size={14} /> Keluar dari Akun (Logout)
        </button>
      </main>

      {/* ── BOTTOM NAV ── */}
      <BottomNav />
    </div>
  );
}
