'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, Bell, Search, ChevronDown, Star, Clock, ChevronRight, Sparkles } from 'lucide-react';
import MobileStatusBar from '@/components/shared/MobileStatusBar';
import WUSLogo from '@/components/shared/WUSLogo';
import BottomNav from '@/components/navigation/BottomNav';

const CATEGORIES = ['Semua', 'Burger', 'Minuman', 'Kebab', 'Bakso', 'Ayam'];

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

export default function FoodPage() {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [search, setSearch] = useState('');

  const filtered = RESTAURANTS.filter(r => {
    const matchCat = activeCategory === 'Semua' || r.category.toLowerCase().includes(activeCategory.toLowerCase());
    const matchSearch = !search || r.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col relative pb-24 select-none">
      {/* ── STATUS BAR ── */}
      <MobileStatusBar variant="dark" />

      {/* ── HEADER ── */}
      <header className="px-4 pt-1 pb-3 bg-white border-b border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.02)] sticky top-0 z-40">
        <div className="flex items-center justify-between mb-2">
          <Link href="/">
            <WUSLogo layout="horizontal" variant="blue" showSubtitle={true} />
          </Link>
          <span className="text-xs font-black text-[#0F172A] tracking-tight">WUSFood</span>
          <Link href="/notifications">
            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors border border-gray-200/60">
              <Bell size={16} />
            </div>
          </Link>
        </div>

        {/* Address */}
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

        {/* Search Input */}
        <div className="relative flex items-center">
          <Search size={16} className="absolute left-3.5 text-gray-400 pointer-events-none" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cari makanan favoritmu..."
            className="w-full bg-[#F1F5F9] text-xs text-[#0F172A] placeholder:text-gray-400 font-medium pl-10 pr-4 py-2.5 rounded-full border border-transparent focus:border-[#193CA5] focus:bg-white transition-all outline-none"
          />
        </div>
      </header>

      {/* ── CONTENT ── */}
      <main className="flex-1 min-h-0 overflow-y-auto px-4 pt-3 pb-8 space-y-3.5">
        {/* Category Pills (Gojek Food Style) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          {CATEGORIES.map(cat => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#193CA5] text-white shadow-xs'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Promo Banner */}
        <div
          className="rounded-3xl text-white relative overflow-hidden shadow-sm flex items-center justify-between p-4"
          style={{ background: 'linear-gradient(135deg, #102e99 0%, #193CA5 100%)' }}
        >
          <div className="space-y-1 max-w-[200px]">
            <span className="inline-flex items-center gap-1 bg-yellow-300 text-yellow-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
              <Sparkles size={10} /> Diskon Makanan
            </span>
            <h3 className="text-sm font-black leading-tight text-white pt-0.5">
              Traktir Hari Ini Hemat s.d 50%
            </h3>
            <p className="text-[10px] text-white/80">Klaim kuponnya di menu checkout</p>
          </div>
          <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/20 shadow-md shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=160&h=160&fit=crop"
              alt="Food"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Restaurant List (Gojek GoFood Style) */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-black text-xs text-[#0F172A]">Daftar Restoran Populer</h3>
            <span className="text-[11px] font-bold text-[#193CA5]">Filter: Terdekat</span>
          </div>

          {filtered.map(r => (
            <Link key={r.id} href={`/restaurant/${r.id}`} className="block group">
              <div className="bg-white rounded-2xl p-3 border border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.03)] group-hover:border-blue-200 transition-all flex items-center gap-3">
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
                    <div className="flex items-center gap-1 text-gray-400 text-[10px]">
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
      </main>

      {/* ── BOTTOM NAV ── */}
      <BottomNav />
    </div>
  );
}
