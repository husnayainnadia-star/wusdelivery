'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  MapPin,
  Bell,
  Search,
  ChevronDown,
  ChevronRight,
  Star,
  Clock,
  Wallet,
  PlusCircle,
  ArrowUpRight,
  History,
  Sparkles,
  Percent,
} from 'lucide-react';
import MobileStatusBar from '@/components/shared/MobileStatusBar';
import WUSLogo from '@/components/shared/WUSLogo';
import BottomNav from '@/components/navigation/BottomNav';

const SERVICES = [
  { id: 'food', name: 'WUSFood', label: 'Makanan', emoji: '🍔', bg: '#FFF0EB', href: '/food' },
  { id: 'mart', name: 'WUSMart', label: 'Belanja', emoji: '🛒', bg: '#EBF3FF', href: '/services/mart' },
  { id: 'car',  name: 'WUSCar',  label: 'Mobil', emoji: '🚗', bg: '#E6F9F0', href: '/services/car' },
  { id: 'ride', name: 'WUSRide', label: 'Motor', emoji: '🏍️', bg: '#FFF7E6', href: '/services/ride' },
  { id: 'move', name: 'WUSMove', label: 'Pindahan', emoji: '📦', bg: '#F3E8FF', href: '/services/move' },
  { id: 'send', name: 'WUSSend', label: 'Kirim Paket', emoji: '📨', bg: '#FEE2E2', href: '/services/send' },
  { id: 'promo', name: 'Promo', label: 'Diskon', emoji: '🏷️', bg: '#FFF1F2', href: '/promo' },
  { id: 'more', name: 'Lainnya', label: 'Semua', emoji: '⋯', bg: '#F1F5F9', href: '/food' },
];

const RESTAURANTS = [
  {
    id: 'mr-burger',
    name: 'MR Burger - Slamet Riyadi',
    category: 'Burger & Fast Food',
    rating: 4.8,
    reviews: '10rb+ ulasan',
    time: '20-25 min',
    distance: '1.2 km',
    promo: 'Diskon 40%',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=300&fit=crop',
  },
  {
    id: 'bobamilk',
    name: 'BOBAMILK Fresh Tea',
    category: 'Minuman Kekinian & Boba',
    rating: 4.8,
    reviews: '8rb+ ulasan',
    time: '15-20 min',
    distance: '0.8 km',
    promo: 'Gratis Ongkir',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop',
  },
  {
    id: 'mr-kebab',
    name: 'MR KEBAB Arabian Taste',
    category: 'Kebab & Cemilan Gurih',
    rating: 4.6,
    reviews: '5rb+ ulasan',
    time: '25-30 min',
    distance: '2.1 km',
    promo: 'Diskon Rp 15rb',
    image: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=300&h=300&fit=crop',
  },
];

export default function HomePage() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  // Auth guard
  useEffect(() => {
    const session = sessionStorage.getItem('wus_demo_session');
    if (!session) {
      router.replace('/sign-in');
    }
  }, [router]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/food?q=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col relative pb-24 select-none">
      {/* ── GOJEK-STYLE TOP STATUS BAR ── */}
      <MobileStatusBar variant="dark" />

      {/* ── TOP HEADER (Clean White Gojek-Style) ── */}
      <header className="px-4 pt-1 pb-3 bg-white border-b border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.02)] sticky top-0 z-40">
        {/* Top bar with Logo & Notification */}
        <div className="flex items-center justify-between mb-2.5">
          <Link href="/">
            <WUSLogo layout="horizontal" variant="blue" showSubtitle={true} />
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/promo">
              <div className="flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200/70 px-2.5 py-1 rounded-full text-[11px] font-bold">
                <Percent size={11} className="text-amber-600" />
                <span>Promo 50%</span>
              </div>
            </Link>
            <Link href="/notifications">
              <div className="w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-700 relative transition-colors border border-gray-200/60">
                <Bell size={16} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              </div>
            </Link>
          </div>
        </div>

        {/* Address selector row */}
        <div className="flex items-center gap-1.5 mb-2.5 text-gray-700">
          <MapPin size={13} className="text-[#193CA5] shrink-0" />
          <button className="flex items-center gap-1 text-left min-w-0">
            <span className="text-[11px] text-gray-500 font-medium">Antar ke:</span>
            <span className="text-[11px] font-bold text-[#0F172A] truncate max-w-[210px]">
              Jl. Melati No.12, Surakarta
            </span>
            <ChevronDown size={12} className="text-gray-400 shrink-0" />
          </button>
        </div>

        {/* Search Input Bar (Gojek-Style Rounded Pill) */}
        <form onSubmit={handleSearchSubmit} className="relative flex items-center">
          <Search size={16} className="absolute left-3.5 text-gray-400 pointer-events-none" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cari makanan, minuman, mart, kirim barang..."
            className="w-full bg-[#F1F5F9] text-xs text-[#0F172A] placeholder:text-gray-400 font-medium pl-10 pr-4 py-2.5 rounded-full border border-transparent focus:border-[#193CA5] focus:bg-white transition-all outline-none"
          />
        </form>
      </header>

      {/* ── SCROLLABLE BODY ── */}
      <main className="flex-1 min-h-0 overflow-y-auto px-4 pt-3 pb-8 space-y-4">
        {/* ── 1. WUSPAY WALLET BAR (Iconic Gojek Gopay Card) ── */}
        <div className="bg-white rounded-2xl p-3 border border-gray-150 shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-center justify-between">
          {/* Balance info */}
          <div className="flex items-center gap-3 pl-1">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#193CA5] flex items-center justify-center font-black text-sm shrink-0 border border-blue-100">
              <Wallet size={18} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-black text-[#193CA5] tracking-wider uppercase">WusPay</span>
                <span className="text-[9px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.2 rounded">Aktif</span>
              </div>
              <p className="text-sm font-black text-[#0F172A] leading-tight mt-0.5">Rp 125.000</p>
              <span className="text-[9px] text-gray-400 font-medium">Klik untuk isi saldo</span>
            </div>
          </div>

          {/* Quick wallet actions */}
          <div className="flex items-center gap-2 pr-1">
            <button
              onClick={() => router.push('/checkout')}
              className="flex flex-col items-center gap-1 text-[#193CA5] hover:opacity-80 active:scale-95 transition-all px-2 py-1"
            >
              <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-[#193CA5]">
                <ArrowUpRight size={15} strokeWidth={2.5} />
              </div>
              <span className="text-[10px] font-bold text-gray-700">Bayar</span>
            </button>

            <button
              onClick={() => alert('Fitur Top Up Saldo WusPay siap digunakan!')}
              className="flex flex-col items-center gap-1 text-[#193CA5] hover:opacity-80 active:scale-95 transition-all px-2 py-1"
            >
              <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-[#193CA5]">
                <PlusCircle size={15} strokeWidth={2.5} />
              </div>
              <span className="text-[10px] font-bold text-gray-700">Top Up</span>
            </button>

            <Link
              href="/orders"
              className="flex flex-col items-center gap-1 text-gray-500 hover:opacity-80 active:scale-95 transition-all px-2 py-1"
            >
              <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center text-gray-600">
                <History size={15} strokeWidth={2.2} />
              </div>
              <span className="text-[10px] font-bold text-gray-700">Riwayat</span>
            </Link>
          </div>
        </div>

        {/* ── 2. SERVICES GRID (Iconic Gojek 4-Column Clean Layout) ── */}
        <div className="bg-white rounded-3xl p-4 border border-gray-150 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <div className="grid grid-cols-4 gap-y-4 gap-x-2">
            {SERVICES.map(s => (
              <Link key={s.id} href={s.href} className="group flex flex-col items-center text-center">
                <div
                  className="w-13 h-13 rounded-2xl flex items-center justify-center text-2xl shadow-[0_2px_6px_rgba(0,0,0,0.04)] group-active:scale-95 transition-transform"
                  style={{ backgroundColor: s.bg }}
                >
                  {s.emoji}
                </div>
                <span className="text-[11px] font-bold text-[#0F172A] mt-1.5 tracking-tight group-hover:text-[#193CA5] transition-colors">
                  {s.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* ── 3. HERO PROMO BANNER (Gojek-Style Carousel Card) ── */}
        <div
          className="rounded-3xl text-white relative overflow-hidden shadow-md flex items-center justify-between p-4.5"
          style={{ background: 'linear-gradient(135deg, #102e99 0%, #193CA5 60%, #1e4fd6 100%)' }}
        >
          {/* Subtle radial glow */}
          <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-white/10 rounded-full blur-xl pointer-events-none" />

          {/* Left copy */}
          <div className="relative z-10 space-y-1 max-w-[210px]">
            <span className="inline-flex items-center gap-1 bg-yellow-300 text-yellow-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-2xs">
              <Sparkles size={11} /> PROMO SPESIAL
            </span>
            <h3 className="text-sm font-black leading-tight text-white pt-0.5">
              Diskon s.d 50% di WUS
            </h3>
            <p className="text-[11px] text-white/85 leading-snug pb-1">
              Pesan makanan & belanja favoritmu makin hemat hari ini!
            </p>
            <Link href="/food" className="inline-block pt-0.5">
              <button className="bg-white hover:bg-gray-100 text-[#193CA5] text-[11px] font-black px-3.5 py-1.5 rounded-full flex items-center gap-1 shadow-sm active:scale-95 transition-all cursor-pointer">
                Pesan Sekarang <ChevronRight size={12} />
              </button>
            </Link>
          </div>

          {/* Right Visual (High-res burger + delivery) */}
          <div className="relative z-10 shrink-0 flex items-center justify-center pl-2">
            <div className="relative">
              <div className="w-18 h-18 rounded-2xl overflow-hidden border-2 border-white/30 shadow-md bg-white/10 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop"
                  alt="Promo Makanan"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -left-2 w-7 h-7 rounded-lg bg-yellow-400 text-yellow-950 font-black text-xs flex items-center justify-center shadow-md border-2 border-white">
                %
              </div>
            </div>
          </div>
        </div>

        {/* ── 4. RESTORAN TERDEKAT (Gojek GoFood Card List Style) ── */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <div>
              <h3 className="font-black text-xs text-[#0F172A] tracking-tight">Pilihan Restoran Terdekat</h3>
              <p className="text-[10px] text-gray-500">Diantar cepat & higienis oleh kurir WUS</p>
            </div>
            <Link href="/food" className="text-xs font-bold text-[#193CA5] hover:underline flex items-center gap-0.5">
              Lihat Semua &rsaquo;
            </Link>
          </div>

          <div className="space-y-2.5">
            {RESTAURANTS.map(r => (
              <Link key={r.id} href={`/restaurant/${r.id}`} className="block group">
                <div className="bg-white rounded-2xl p-3 border border-gray-150 shadow-[0_1px_4px_rgba(0,0,0,0.03)] group-hover:border-blue-200 transition-all flex items-center gap-3">
                  {/* Photo with Promo Tag */}
                  <div className="relative w-18 h-18 rounded-xl overflow-hidden bg-gray-100 shrink-0 shadow-inner">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={r.image}
                      alt={r.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-red-600/90 text-white text-[8px] font-black py-0.5 text-center">
                      {r.promo}
                    </div>
                  </div>

                  {/* Info Column */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <h4 className="text-xs font-extrabold text-[#0F172A] truncate group-hover:text-[#193CA5] transition-colors">
                      {r.name}
                    </h4>
                    <p className="text-[11px] text-gray-500 truncate">{r.category}</p>

                    <div className="flex items-center gap-2 text-gray-500 pt-0.5">
                      <div className="flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/60">
                        <Star size={11} className="fill-amber-400 text-amber-400" />
                        <span className="text-[10px] font-black text-gray-800">{r.rating}</span>
                      </div>
                      <span className="text-[10px] text-gray-400">({r.reviews})</span>
                      <span className="text-gray-300">•</span>
                      <div className="flex items-center gap-1 text-gray-500 text-[10px]">
                        <Clock size={10} />
                        <span>{r.time}</span>
                      </div>
                    </div>
                  </div>

                  <ChevronRight size={15} className="text-gray-300 group-hover:text-[#193CA5] transition-colors shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="h-4" />
      </main>

      {/* ── GOJEK-STYLE BOTTOM NAVIGATION ── */}
      <BottomNav />
    </div>
  );
}
