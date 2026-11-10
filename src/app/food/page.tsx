'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, Bell, Search, ChevronDown, Star, Clock, ChevronRight } from 'lucide-react';
import MobileStatusBar from '@/components/shared/MobileStatusBar';
import WUSLogo from '@/components/shared/WUSLogo';
import BottomNav from '@/components/navigation/BottomNav';

const CATEGORIES = ['Semua', 'Bakso', 'Burger', 'Ayam', 'Minuman'];

const RESTAURANTS = [
  {
    id: 'mr-burger',
    name: 'MR Burger',
    category: 'Burger',
    rating: 4.8,
    reviews: '100rb+',
    time: '± 30 min',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=160&h=160&fit=crop',
    emoji: '🍔',
  },
  {
    id: 'bobamilk',
    name: 'BOBAMILK',
    category: 'Minuman',
    rating: 4.8,
    reviews: '100rb+',
    time: '± 25 min',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=160&h=160&fit=crop',
    emoji: '🧋',
  },
  {
    id: 'mr-kebab',
    name: 'MR KEBAB',
    category: 'Semua',
    rating: 4.5,
    reviews: '80rb+',
    time: '± 35 min',
    image: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=160&h=160&fit=crop',
    emoji: '🌯',
  },
];

export default function FoodPage() {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [search, setSearch] = useState('');

  const filtered = RESTAURANTS.filter(r => {
    const matchCat = activeCategory === 'Semua' || r.category === activeCategory;
    const matchSearch = !search || r.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#F5F6FA] flex flex-col relative pb-24 select-none">
      {/* ── STATUS BAR ── */}
      <MobileStatusBar variant="dark" className="page-px px-5" />

      {/* ── HEADER ── */}
      <header className="page-px px-5 pt-1.5 pb-4 bg-white border-b border-gray-100">
        {/* Top row: Compact Logo, Slogan, and Bell */}
        <div className="flex items-center justify-between mb-2.5">
          <Link href="/">
            <WUSLogo layout="horizontal" variant="blue" showSubtitle={true} />
          </Link>
          <h1 className="text-xs font-black text-[#171717] tracking-tight">
            Mau makan apa hari ini?
          </h1>
          <Link href="/notifications">
            <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors">
              <Bell size={17} />
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
            placeholder="Cari makanan, minuman, atau restoran"
            className="flex-1 text-xs outline-none bg-transparent text-gray-700 placeholder:text-gray-400 font-medium"
          />
        </div>
      </header>

      {/* ── SCROLLABLE BODY ── */}
      <main className="flex-1 min-h-0 overflow-y-auto page-px px-5 pt-3.5 pb-8 space-y-4">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1">
          {CATEGORIES.map(cat => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#193CA5] text-white shadow-xs'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
                }`}
                style={{ paddingLeft: '16px', paddingRight: '16px' }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Promo Banner: Pesan Sekarang, Lebih Hemat! with Generous Padding */}
        <div
          className="rounded-2xl text-white relative overflow-hidden shadow-sm flex items-center justify-between"
          style={{ background: 'linear-gradient(135deg, #1432A0 0%, #193CA5 100%)', padding: '22px 20px 22px 22px' }}
        >
          <div style={{ maxWidth: 175, paddingRight: 8 }}>
            <p className="text-xs font-bold text-white/90">Pesan Sekarang,</p>
            <h2 className="text-base font-black text-white leading-tight mt-1">Lebih Hemat!</h2>
            <p className="text-xs text-white/85 mt-2 leading-relaxed">
              Diskon s.d <strong className="text-yellow-300 font-black text-sm">50%</strong>
            </p>
          </div>

          {/* Visual with error fallback */}
          <div className="flex items-center -space-x-4">
            <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-white/20 shadow-md bg-white/10 flex items-center justify-center text-3xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=140&h=140&fit=crop"
                alt="Burger"
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

        {/* Section: Restoran Terdekat with Spacious Padding */}
        <div>
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="font-bold text-xs text-[#171717]">Restoran Terdekat</h3>
            <span className="text-xs font-semibold text-[#193CA5]">
              Lihat Semua &rsaquo;
            </span>
          </div>

          <div className="space-y-3">
            {filtered.map(r => (
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
