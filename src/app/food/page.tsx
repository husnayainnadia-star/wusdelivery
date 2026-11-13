'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, Bell, Search, ChevronDown, Star, Clock, ChevronRight, Sparkles } from 'lucide-react';
import MobileStatusBar from '@/components/shared/MobileStatusBar';
import WUSLogo from '@/components/shared/WUSLogo';
import BottomNav from '@/components/navigation/BottomNav';

const CATEGORIES = ['Semua', 'Bakso', 'Burger', 'Ayam', 'Minuman', 'Kebab', 'Snack'];

const RESTAURANTS = [
  {
    id: 'mr-burger',
    name: 'MR Burger',
    category: 'Burger',
    rating: 4.8,
    reviews: '100rb+',
    time: '± 30 min',
    distance: '1.2 km',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
    emoji: '🍔',
  },
  {
    id: 'bobamilk',
    name: 'BOBAMILK',
    category: 'Minuman',
    rating: 4.8,
    reviews: '100rb+',
    time: '± 25 min',
    distance: '0.8 km',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    emoji: '🧋',
  },
  {
    id: 'mr-kebab',
    name: 'MR KEBAB',
    category: 'Kebab',
    rating: 4.5,
    reviews: '80rb+',
    time: '± 35 min',
    distance: '2.1 km',
    image: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=400&h=300&fit=crop',
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
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col pb-24 md:pb-12 select-none">
      <MobileStatusBar />

      {/* ── MOBILE HEADER (Hidden on desktop) ── */}
      <header className="md:hidden px-5 pt-3 pb-4 bg-white border-b border-gray-100 shadow-2xs">
        <div className="flex items-center justify-between mb-3">
          <Link href="/">
            <WUSLogo layout="horizontal" variant="blue" showSubtitle={true} />
          </Link>
          <h1 className="text-xs font-black text-[#111827] tracking-tight">
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
            <span className="text-xs font-bold text-[#111827] truncate max-w-[210px]">
              Jl. Melati No.12, Surakarta
            </span>
            <ChevronDown size={13} className="text-gray-400" />
          </button>
        </div>

        {/* Search Bar */}
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

      {/* ── SCROLLABLE BODY (Laptop / Desktop Responsive) ── */}
      <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 md:py-8 space-y-6">
        {/* Category Filter Pills with Generous Spacing */}
        <div className="bg-white p-3 sm:p-4 rounded-2xl border border-gray-150 shadow-xs flex items-center gap-2.5 overflow-x-auto no-scrollbar">
          {CATEGORIES.map(cat => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#193CA5] text-white shadow-xs'
                    : 'bg-gray-50 text-gray-600 border border-gray-200/80 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Promo Banner: Pesan Sekarang, Lebih Hemat! */}
        <div
          className="rounded-3xl text-white relative overflow-hidden shadow-sm flex items-center justify-between p-6 md:p-8"
          style={{ background: 'linear-gradient(135deg, #123099 0%, #193CA5 60%, #2563eb 100%)' }}
        >
          <div className="relative z-10 max-w-[70%] space-y-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-yellow-300 bg-white/10 px-3 py-1 rounded-full uppercase tracking-wider">
              <Sparkles size={12} /> Diskon Spesial Food
            </span>
            <h2 className="text-base sm:text-xl md:text-2xl font-black text-white leading-tight">
              Pesan Sekarang, Lebih Hemat!
            </h2>
            <p className="text-xs sm:text-sm text-white/85">
              Diskon hingga <strong className="text-yellow-300 font-black text-sm sm:text-base">50%</strong> untuk semua menu resto favoritmu
            </p>
          </div>

          <div className="relative z-10 shrink-0 pl-3">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-white/30 shadow-lg bg-white/10 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop"
                alt="Burger"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Section: Restoran Terdekat Grid */}
        <section className="bg-white rounded-3xl p-5 md:p-8 border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between mb-5 px-1">
            <div>
              <h3 className="font-extrabold text-base md:text-lg text-[#111827]">
                Pilihan Restoran Terdekat
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Menampilkan {filtered.length} restoran di sekitar lokasimu
              </p>
            </div>
            <span className="text-xs md:text-sm font-bold text-[#193CA5]">
              Urutkan: Terdekat
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {filtered.map(r => (
              <Link key={r.id} href={`/restaurant/${r.id}`} className="group">
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-150 shadow-xs group-hover:shadow-md group-hover:border-blue-200 flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-all h-full">
                  <div className="w-full sm:w-22 h-36 sm:h-22 rounded-xl overflow-hidden bg-gray-100 shrink-0 shadow-inner relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={r.image}
                      alt={r.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="flex-1 min-w-0 w-full space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm sm:text-base font-bold text-[#111827] truncate group-hover:text-[#193CA5] transition-colors">
                        {r.name}
                      </h4>
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

      {/* ── BOTTOM NAV (Hidden on desktop) ── */}
      <BottomNav />
    </div>
  );
}
