'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Bell, Search, ChevronDown, ChevronRight, Star, Clock } from 'lucide-react';
import MobileStatusBar from '@/components/shared/MobileStatusBar';
import WUSLogo from '@/components/shared/WUSLogo';
import BottomNav from '@/components/navigation/BottomNav';

const SERVICES = [
  { id: 'food', name: 'WUSFood', emoji: '🍔', bg: '#FFF3EE', href: '/food' },
  { id: 'mart', name: 'WUSMart', emoji: '🛒', bg: '#EAF1FF', href: '/services/mart' },
  { id: 'car',  name: 'WUSCar',  emoji: '🚗', bg: '#ECFDF5', href: '/services/car' },
  { id: 'ride', name: 'WUSRide', emoji: '🏍️', bg: '#FFFBEB', href: '/services/ride' },
  { id: 'move', name: 'WUSMove', emoji: '📦', bg: '#F5F3FF', href: '/services/move' },
  { id: 'send', name: 'WUSSend', emoji: '📨', bg: '#FEF2F2', href: '/services/send' },
];

const RESTAURANTS = [
  {
    id: 'mr-burger',
    name: 'MR Burger',
    emoji: '🍔',
    rating: 4.8,
    reviews: '100rb+',
    time: '± 30 min',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=160&h=160&fit=crop',
  },
  {
    id: 'bobamilk',
    name: 'BOBAMILK',
    emoji: '🧋',
    rating: 4.8,
    reviews: '100rb+',
    time: '± 25 min',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=160&h=160&fit=crop',
  },
  {
    id: 'mr-kebab',
    name: 'MR KEBAB',
    emoji: '🌯',
    rating: 4.5,
    reviews: '80rb+',
    time: '± 35 min',
    image: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=160&h=160&fit=crop',
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

  return (
    <div className="min-h-screen bg-[#F5F6FA] flex flex-col relative pb-24 select-none">
      {/* ── STATUS BAR ── */}
      <MobileStatusBar variant="dark" className="page-px px-5" />

      {/* ── HEADER ── */}
      <header className="page-px px-5 pt-1.5 pb-4 bg-white border-b border-gray-100">
        {/* Top row: Compact Logo & Notification Bell */}
        <div className="flex items-center justify-between mb-2.5">
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

        {/* Search Bar with Generous Internal Padding */}
        <div className="flex items-center bg-[#F1F5F9] rounded-full px-4 py-3 gap-3 border border-transparent focus-within:border-blue-200 focus-within:bg-white transition-all shadow-2xs">
          <Search size={16} className="text-gray-400 shrink-0" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cari makanan, minuman, atau layanan"
            className="flex-1 text-xs outline-none bg-transparent text-gray-700 placeholder:text-gray-400 font-medium"
          />
        </div>
      </header>

      {/* ── SCROLLABLE BODY ── */}
      <main className="flex-1 min-h-0 overflow-y-auto page-px px-5 pt-4 pb-8 space-y-4">
        {/* Banner 1: Pesan Apa Aja di WUS Delivery */}
        <div
          className="rounded-2xl text-white relative overflow-hidden shadow-sm flex items-center justify-between"
          style={{ background: 'linear-gradient(135deg, #1432A0 0%, #193CA5 100%)', padding: '22px 20px 22px 22px' }}
        >
          <div className="relative z-10" style={{ maxWidth: 195, paddingRight: 8 }}>
            <h2 className="text-xs font-bold leading-tight text-white/90">Pesan Apa Aja</h2>
            <h3 className="text-base font-black leading-tight text-white mt-1">di WUS Delivery</h3>
            <p className="text-xs text-white/80 mt-2 mb-4 leading-relaxed">lebih hemat dengan promo!</p>
            <Link href="/food">
              <button className="bg-white text-[#193CA5] text-xs font-extrabold px-5 py-2.5 rounded-full flex items-center gap-1.5 shadow-sm active:scale-95 transition-transform" style={{ paddingLeft: '18px', paddingRight: '18px' }}>
                Pesan Sekarang <ChevronRight size={12} />
              </button>
            </Link>
          </div>

          {/* Courier illustration */}
          <div className="relative z-10 w-24 h-20 flex items-center justify-center shrink-0">
            <span className="text-5xl transform -scale-x-100 drop-shadow-md">🛵</span>
          </div>
        </div>

        {/* Section: Layanan WUS */}
        <div>
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="font-bold text-xs text-[#171717] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#193CA5]" />
              Layanan WUS
            </h3>
            <Link href="/food" className="text-xs font-semibold text-[#193CA5] flex items-center gap-0.5">
              Lihat Semua &rsaquo;
            </Link>
          </div>

          {/* 6 Grid Service Cards with Comfortable Spacing */}
          <div className="grid grid-cols-3 gap-3">
            {SERVICES.map(s => (
              <Link key={s.id} href={s.href}>
                <div className="bg-white rounded-2xl py-4 px-3 flex flex-col items-center gap-2 border border-gray-100 shadow-xs hover:border-blue-200 active:scale-95 transition-all">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-xs"
                    style={{ backgroundColor: s.bg }}
                  >
                    {s.emoji}
                  </div>
                  <span className="text-xs font-bold text-[#171717] tracking-tight">{s.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Banner 2: PROMO SPESIAL Diskon s.d 50% */}
        <div
          className="rounded-2xl text-white relative overflow-hidden shadow-sm"
          style={{ background: 'linear-gradient(135deg, #1432A0 0%, #193CA5 100%)', padding: '22px 20px 22px 22px' }}
        >
          <div className="flex items-center justify-between">
            <div style={{ maxWidth: 175, paddingRight: 8 }}>
              <span className="bg-yellow-300 text-yellow-950 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider inline-block mb-3 shadow-2xs">
                PROMO SPESIAL
              </span>
              <p className="text-xs text-white/85">Diskon s.d</p>
              <p className="text-3xl font-black text-white leading-none my-1.5">50%</p>
              <p className="text-xs text-white/80 leading-tight">untuk semua layanan</p>
            </div>

            {/* Visual with Error Fallback */}
            <div className="flex items-center -space-x-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-white/20 shadow-md bg-white/10 flex items-center justify-center text-3xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=160&h=160&fit=crop"
                  alt="Burger Promo"
                  className="w-full h-full object-cover"
                  onError={e => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-white/20 shadow-md bg-amber-500/20 flex items-center justify-center text-3xl transform rotate-3">
                <span className="text-3xl">🌭</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Restoran Terdekat with Spacious Padding */}
        <div>
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="font-bold text-xs text-[#171717]">Restoran Terdekat</h3>
            <Link href="/food" className="text-xs font-semibold text-[#193CA5]">
              Lihat Semua &rsaquo;
            </Link>
          </div>

          <div className="space-y-3">
            {RESTAURANTS.map(r => (
              <Link key={r.id} href={`/restaurant/${r.id}`}>
                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs flex items-center gap-4 hover:border-blue-100 active:scale-[0.99] transition-all">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 shrink-0 flex items-center justify-center text-2xl shadow-inner">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={r.image}
                      alt={r.name}
                      className="w-full h-full object-cover"
                      onError={e => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>

                  <div className="flex-1 min-w-0 pr-1">
                    <h4 className="text-xs font-bold text-[#171717] truncate">{r.name}</h4>
                    <div className="flex items-center gap-2 mt-1 text-gray-500">
                      <div className="flex items-center gap-0.5">
                        <Star size={12} className="fill-amber-400 text-amber-400" />
                        <span className="text-xs font-bold text-[#171717]">{r.rating}</span>
                      </div>
                      <span className="text-xs text-gray-400">({r.reviews})</span>
                      <span className="text-gray-300 text-xs">•</span>
                      <div className="flex items-center gap-1 text-gray-400">
                        <Clock size={11} />
                        <span className="text-xs">{r.time}</span>
                      </div>
                    </div>
                  </div>

                  <ChevronRight size={16} className="text-gray-300 shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="h-4" />
      </main>

      {/* ── BOTTOM NAV ── */}
      <BottomNav />
    </div>
  );
}
