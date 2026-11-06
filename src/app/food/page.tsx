'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ChevronLeft, Search, Star, Clock, ChevronRight } from 'lucide-react';
import { RESTAURANTS } from '@/data';
import BottomNav from '@/components/navigation/BottomNav';

const CATEGORIES = ['Semua', 'Bakso', 'Burger', 'Ayam', 'Minuman', 'Makanan Ringan'];

function FoodContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [category, setCategory] = useState('Semua');

  const filtered = RESTAURANTS.filter(r => {
    const matchQuery = !query || r.name.toLowerCase().includes(query.toLowerCase()) || r.tags.some(t => t.toLowerCase().includes(query.toLowerCase()));
    const matchCat = category === 'Semua' || r.category === category || r.tags.includes(category);
    return matchQuery && matchCat;
  });

  return (
    <main className="min-h-screen bg-[#F5F6FA]">
      {/* Header */}
      <div className="bg-[#193CA5] px-4 pt-12 pb-5 rounded-b-3xl">
        <div className="flex items-center gap-3 mb-3">
          <Link href="/">
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
              <ChevronLeft size={20} className="text-white" />
            </div>
          </Link>
          <h1 className="text-white text-lg font-bold flex-1">WUSFood</h1>
        </div>
        <div className="flex items-center bg-white rounded-2xl px-4 py-2.5 gap-3">
          <Search size={16} className="text-gray-400" />
          <input value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Cari makanan atau restoran..."
            className="flex-1 text-sm outline-none text-gray-700 placeholder:text-gray-400" />
        </div>
      </div>

      <div className="px-4 pt-4 pb-24">
        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 mb-4">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCategory(c)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${category === c ? 'bg-[#193CA5] text-white' : 'bg-white text-gray-600'}`}>
              {c}
            </button>
          ))}
        </div>

        {/* Promo Banner */}
        <div className="bg-gradient-to-r from-[#193CA5] to-blue-600 rounded-2xl p-4 mb-4 flex justify-between items-center">
          <div>
            <p className="text-white/80 text-xs">Pesan Sekarang,</p>
            <p className="text-white text-xl font-black">Lebih Hemat!</p>
            <p className="text-white/70 text-xs">Diskon s.d <strong className="text-white">50%</strong></p>
          </div>
          <span className="text-5xl">🌭</span>
        </div>

        {/* Restaurants */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-bold text-[#171717]">
            {category === 'Semua' ? 'Restoran Terdekat' : category}
          </h2>
          <span className="text-xs text-gray-400">{filtered.length} restoran</span>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <span className="text-5xl">🔍</span>
            <p className="text-gray-500 mt-3 font-medium">Tidak ditemukan</p>
            <p className="text-gray-400 text-sm mt-1">Coba kata kunci lain</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(r => (
              <Link key={r.id} href={`/restaurant/${r.id}`}>
                <div className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm active:scale-[0.98] transition-transform">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl bg-[#F5F6FA] shrink-0 relative">
                    {r.image}
                    {r.discount ? <span className="absolute -bottom-1 -right-1 bg-red-500 text-white text-[8px] font-black px-1 py-0.5 rounded-full">-{r.discount}%</span> : null}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[#171717] text-sm">{r.name}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star size={11} fill="#F59E0B" color="#F59E0B" />
                      <span className="text-xs font-semibold">{r.rating}</span>
                      <span className="text-xs text-gray-400">({r.reviewCount}rb+)</span>
                      <span className="text-gray-300">•</span>
                      <Clock size={11} className="text-gray-400" />
                      <span className="text-xs text-gray-400">{r.deliveryTime}</span>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-1">{r.description.slice(0, 60)}...</p>
                  </div>
                  <ChevronRight size={16} className="text-gray-300 shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <BottomNav />
    </main>
  );
}

export default function FoodPage() {
  return (
    <Suspense>
      <FoodContent />
    </Suspense>
  );
}
