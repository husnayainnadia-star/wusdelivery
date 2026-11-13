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
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop',
    emoji: '🍔',
  },
  {
    id: 'bobamilk',
    name: 'BOBAMILK',
    category: 'Minuman',
    rating: 4.8,
    reviews: '100rb+',
    time: '± 25 min',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop',
    emoji: '🧋',
  },
  {
    id: 'mr-kebab',
    name: 'MR KEBAB',
    category: 'Semua',
    rating: 4.5,
    reviews: '80rb+',
    time: '± 35 min',
    image: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=200&h=200&fit=crop',
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
      <MobileStatusBar variant="dark" />

      {/* ── HEADER ── */}
      <header className="px-5 pt-1.5 pb-4 bg-white border-b border-gray-100 shadow-2xs">
        <div className="flex items-center justify-between mb-2.5">
          <Link href="/">
            <WUSLogo layout="horizontal" variant="blue" showSubtitle={true} />
          </Link>
          <h1 className="text-xs font-black text-[#111827] tracking-tight">
            Mau makan apa hari ini?
          </h1>
          <Link href="/notifications">
            <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors shadow-2xs">
              <Bell size={17} />
            </div>
          </Link>
        </div>

        {/* Address Row */}
        <div className="flex items-center gap-2 mb-3 text-gray-700">
          <MapPin size={14} className="text-[#193CA5] shrink-0" />
          <button className="flex items-center gap-1.5 text-left">
            <span className="text-xs text-gray-500 font-medium">Antar ke:</span>
            <span className="text-xs font-bold text-[#111827] truncate max-w-[210px]">
              Jl. Melati No.12, Surakarta
            </span>
            <ChevronDown size={13} className="text-gray-400" />
          </button>
        </div>

        {/* Search Bar with generous padding */}
        <div className="flex items-center bg-[#F1F5F9] rounded-full px-4 py-2.5 gap-2.5 border border-transparent focus-within:border-blue-200 focus-within:bg-white transition-all shadow-2xs">
          <Search size={16} className="text-gray-400 shrink-0" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cari makanan, minuman, atau restoran"
            className="flex-1 text-xs outline-none bg-transparent text-gray-800 placeholder:text-gray-400 font-medium"
          />
        </div>
      </header>

      {/* ── SCROLLABLE BODY ── */}
      <main className="flex-1 min-h-0 overflow-y-auto px-5 pt-3.5 pb-8 space-y-4">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {CATEGORIES.map(cat => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#193CA5] text-white shadow-2xs'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Promo Banner */}
        <div
          className="rounded-2xl text-white relative overflow-hidden shadow-sm flex items-center justify-between"
          style={{ background: 'linear-gradient(135deg, #1432A0 0%, #193CA5 100%)', padding: '18px 18px' }}
        >
          <div className="space-y-1 max-w-[190px]">
            <p className="text-[11px] font-bold text-white/90">Pesan Sekarang,</p>
            <h2 className="text-base font-black text-white leading-tight">Lebih Hemat!</h2>
            <p className="text-xs text-white/85 pt-1">
              Diskon s.d <strong className="text-yellow-300 font-black text-sm">50%</strong>
            </p>
          </div>

          <div className="relative z-10 shrink-0 flex items-center justify-center pl-2">
            <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-white/20 shadow-md bg-white/10 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=160&h=160&fit=crop"
                alt="Burger"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Section: Restoran Terdekat */}
        <div>
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="font-extrabold text-xs text-[#111827]">Restoran Terdekat</h3>
            <span className="text-xs font-bold text-[#193CA5]">
              Lihat Semua &rsaquo;
            </span>
          </div>

          <div className="space-y-3">
            {filtered.map(r => (
              <Link key={r.id} href={`/restaurant/${r.id}`}>
                <div className="bg-white rounded-2xl p-3.5 border border-gray-150 shadow-2xs flex items-center gap-3.5 hover:border-blue-100 active:scale-[0.99] transition-all">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 shrink-0 shadow-inner">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={r.image}
                      alt={r.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0 pr-1 space-y-1">
                    <h4 className="text-xs font-extrabold text-[#111827] truncate">{r.name}</h4>
                    <div className="flex items-center gap-2 text-gray-500">
                      <div className="flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/50">
                        <Star size={11} className="fill-amber-400 text-amber-400" />
                        <span className="text-[11px] font-bold text-gray-800">{r.rating}</span>
                      </div>
                      <span className="text-[11px] text-gray-400">({r.reviews})</span>
                      <span className="text-gray-300 text-xs">•</span>
                      <div className="flex items-center gap-1 text-gray-400 text-[11px]">
                        <Clock size={11} />
                        <span>{r.time}</span>
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
