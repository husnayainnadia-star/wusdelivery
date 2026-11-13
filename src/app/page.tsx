'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Bell, Search, ChevronDown, ChevronRight, Star, Clock, Sparkles } from 'lucide-react';
import MobileStatusBar from '@/components/shared/MobileStatusBar';
import WUSLogo from '@/components/shared/WUSLogo';
import BottomNav from '@/components/navigation/BottomNav';

const SERVICES = [
  { id: 'food', name: 'WUSFood', emoji: '🍔', desc: 'Makanan Favorit', bg: '#FFF3EE', href: '/food' },
  { id: 'mart', name: 'WUSMart', emoji: '🛒', desc: 'Belanja Harian', bg: '#EAF1FF', href: '/services/mart' },
  { id: 'car',  name: 'WUSCar',  emoji: '🚗', desc: 'Sewa Mobil', bg: '#ECFDF5', href: '/services/car' },
  { id: 'ride', name: 'WUSRide', emoji: '🏍️', desc: 'Ojek Cepat', bg: '#FFFBEB', href: '/services/ride' },
  { id: 'move', name: 'WUSMove', emoji: '📦', desc: 'Pindahan Praktis', bg: '#F5F3FF', href: '/services/move' },
  { id: 'send', name: 'WUSSend', emoji: '📨', desc: 'Kirim Paket', bg: '#FEF2F2', href: '/services/send' },
];

const RESTAURANTS = [
  {
    id: 'mr-burger',
    name: 'MR Burger',
    category: 'Burger & Fast Food',
    rating: 4.8,
    reviews: '100rb+',
    time: '± 30 min',
    distance: '1.2 km',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
  },
  {
    id: 'bobamilk',
    name: 'BOBAMILK',
    category: 'Minuman Kekinian',
    rating: 4.8,
    reviews: '100rb+',
    time: '± 25 min',
    distance: '0.8 km',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
  },
  {
    id: 'mr-kebab',
    name: 'MR KEBAB',
    category: 'Kebab & Cemilan',
    rating: 4.5,
    reviews: '80rb+',
    time: '± 35 min',
    distance: '2.1 km',
    image: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=400&h=300&fit=crop',
  },
];

export default function HomePage() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  // Auth guard: jika belum login, redirect ke sign-in
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
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col pb-24 md:pb-12 select-none">
      <MobileStatusBar />

      {/* ── MOBILE-ONLY HEADER (hidden on desktop because DesktopNavbar is active) ── */}
      <header className="md:hidden px-5 pt-3 pb-4 bg-white border-b border-gray-100 shadow-2xs">
        <div className="flex items-center justify-between mb-3">
          <Link href="/">
            <WUSLogo layout="horizontal" variant="blue" showSubtitle={true} />
          </Link>
          <Link href="/notifications">
            <div className="w-9 h-9 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-700 relative transition-colors">
              <Bell size={17} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </div>
          </Link>
        </div>

        {/* Address Row */}
        <div className="flex items-center gap-2 mb-3 text-gray-700">
          <MapPin size={14} className="text-[#193CA5] shrink-0" />
          <button className="flex items-center gap-1.5 text-left">
            <span className="text-xs text-gray-500">Antar ke:</span>
            <span className="text-xs font-bold text-[#171717] truncate max-w-[210px]">
              Jl. Melati No.12, Surakarta
            </span>
            <ChevronDown size={13} className="text-gray-400" />
          </button>
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="flex items-center bg-[#F1F5F9] rounded-full px-4 py-3 gap-3 border border-transparent focus-within:border-blue-200 focus-within:bg-white transition-all shadow-2xs">
          <Search size={16} className="text-gray-400 shrink-0" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cari makanan, minuman, atau layanan"
            className="flex-1 text-xs outline-none bg-transparent text-gray-700 placeholder:text-gray-400 font-medium"
          />
        </form>
      </header>

      {/* ── MAIN CONTENT (Laptop/Desktop Responsive Container) ── */}
      <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 md:py-8 space-y-6 md:space-y-8">
        {/* ── BANNERS SECTION (Responsive 2-column on desktop) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Banner 1: Pesan Apa Aja di WUS Delivery */}
          <div
            className="rounded-3xl text-white relative overflow-hidden shadow-sm flex items-center justify-between p-6 md:p-8"
            style={{ background: 'linear-gradient(135deg, #123099 0%, #193CA5 60%, #2563eb 100%)' }}
          >
            {/* Background glow circle */}
            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 max-w-[65%] space-y-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-200 bg-white/10 px-3 py-1 rounded-full uppercase tracking-wider">
                <Sparkles size={12} /> Cepat & Hemat
              </span>
              <h2 className="text-base sm:text-lg md:text-xl font-black leading-tight text-white">
                Pesan Apa Aja
                <span className="block text-white/95 text-lg md:text-2xl mt-0.5">di WUS Delivery</span>
              </h2>
              <p className="text-xs sm:text-sm text-white/85 pb-1">Lebih hemat dengan promo diskon tiap hari!</p>
              <Link href="/food" className="inline-block pt-1">
                <button className="bg-white hover:bg-gray-100 text-[#193CA5] text-xs md:text-sm font-extrabold px-5 py-2.5 rounded-full flex items-center gap-2 shadow-md active:scale-95 transition-all">
                  Pesan Sekarang <ChevronRight size={14} />
                </button>
              </Link>
            </div>

            {/* Courier Visual */}
            <div className="relative z-10 shrink-0 flex items-center justify-center pl-2">
              <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl bg-white/10 backdrop-blur-xs flex items-center justify-center border border-white/20 shadow-inner">
                <span className="text-5xl sm:text-6xl transform -scale-x-100 drop-shadow-md">🛵</span>
              </div>
            </div>
          </div>

          {/* Banner 2: PROMO SPESIAL Diskon s.d 50% */}
          <div
            className="rounded-3xl text-white relative overflow-hidden shadow-sm flex items-center justify-between p-6 md:p-8"
            style={{ background: 'linear-gradient(135deg, #0e2b8c 0%, #1e40af 60%, #3b82f6 100%)' }}
          >
            {/* Background glow circle */}
            <div className="absolute -left-12 -top-12 w-48 h-48 bg-yellow-400/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 max-w-[65%] space-y-2">
              <span className="bg-yellow-300 text-yellow-950 text-[10px] md:text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider inline-block shadow-xs">
                PROMO SPESIAL
              </span>
              <div className="pt-1">
                <p className="text-xs text-white/85 font-medium">Diskon hingga</p>
                <p className="text-3xl md:text-4xl font-black text-white leading-none my-1 tracking-tight">50%</p>
                <p className="text-xs md:text-sm text-white/80 font-medium">untuk semua restoran & layanan</p>
              </div>
              <Link href="/promo" className="inline-block pt-1">
                <button className="bg-yellow-300 hover:bg-yellow-400 text-yellow-950 text-xs md:text-sm font-black px-5 py-2.5 rounded-full flex items-center gap-1.5 shadow-md active:scale-95 transition-all">
                  Klaim Diskon <ChevronRight size={14} />
                </button>
              </Link>
            </div>

            {/* Food Promo Visual (Clean, no broken boxes) */}
            <div className="relative z-10 shrink-0 flex items-center justify-center pl-2">
              <div className="relative flex items-center">
                <div className="w-18 h-18 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-white/30 shadow-lg bg-white/10 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop"
                    alt="Burger Promo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-amber-500 border-2 border-white shadow-md flex items-center justify-center text-2xl sm:text-3xl -ml-5 sm:-ml-7 -mt-6 transform rotate-6">
                  <span>🌭</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION: LAYANAN WUS (Spacious Responsive Grid) ── */}
        <section className="bg-white rounded-3xl p-5 md:p-8 border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between mb-5 px-1">
            <div>
              <h3 className="font-extrabold text-base md:text-lg text-[#111827] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#193CA5]" />
                Layanan WUS
              </h3>
              <p className="text-xs text-gray-500 mt-0.5 hidden sm:block">Pilih layanan yang Anda butuhkan dengan cepat</p>
            </div>
            <Link href="/food" className="text-xs md:text-sm font-bold text-[#193CA5] hover:text-[#15328A] flex items-center gap-1">
              Lihat Semua &rsaquo;
            </Link>
          </div>

          {/* 6 Responsive Grid Service Cards with Generous Spacing */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
            {SERVICES.map(s => (
              <Link key={s.id} href={s.href} className="group">
                <div className="bg-[#F8FAFC] group-hover:bg-white rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center gap-2.5 border border-gray-100 group-hover:border-blue-200 group-hover:shadow-md active:scale-95 transition-all text-center">
                  <div
                    className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-xs group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: s.bg }}
                  >
                    {s.emoji}
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-[#111827] block tracking-tight">{s.name}</span>
                    <span className="text-[10px] text-gray-400 hidden lg:block mt-0.5">{s.desc}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── SECTION: RESTORAN TERDEKAT (Spacious Responsive Grid) ── */}
        <section className="bg-white rounded-3xl p-5 md:p-8 border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between mb-5 px-1">
            <div>
              <h3 className="font-extrabold text-base md:text-lg text-[#111827]">Restoran Terdekat</h3>
              <p className="text-xs text-gray-500 mt-0.5 hidden sm:block">Pilihan kuliner terpopuler siap diantar ke lokasimu</p>
            </div>
            <Link href="/food" className="text-xs md:text-sm font-bold text-[#193CA5] hover:text-[#15328A]">
              Lihat Semua &rsaquo;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {RESTAURANTS.map(r => (
              <Link key={r.id} href={`/restaurant/${r.id}`} className="group">
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-150 shadow-xs group-hover:shadow-md group-hover:border-blue-200 flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-all h-full">
                  <div className="w-full sm:w-20 h-36 sm:h-20 rounded-xl overflow-hidden bg-gray-100 shrink-0 shadow-inner relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={r.image}
                      alt={r.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="flex-1 min-w-0 w-full space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm sm:text-base font-bold text-[#111827] truncate group-hover:text-[#193CA5] transition-colors">{r.name}</h4>
                      <ChevronRight size={16} className="text-gray-300 group-hover:text-[#193CA5] transition-colors shrink-0" />
                    </div>
                    <p className="text-xs text-gray-500 truncate">{r.category}</p>

                    <div className="flex items-center gap-2 pt-1 text-gray-500">
                      <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                        <Star size={12} className="fill-amber-400 text-amber-400" />
                        <span className="text-xs font-bold text-gray-800">{r.rating}</span>
                      </div>
                      <span className="text-xs text-gray-400">({r.reviews})</span>
                      <span className="text-gray-300 text-xs">•</span>
                      <div className="flex items-center gap-1 text-gray-400">
                        <Clock size={11} />
                        <span className="text-xs">{r.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* ── MOBILE BOTTOM NAV (Hidden on desktop) ── */}
      <BottomNav />
    </div>
  );
}
