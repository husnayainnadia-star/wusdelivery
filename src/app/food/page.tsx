'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ChevronLeft, Search, Bell, Star, Clock, ChevronRight, MapPin, ChevronDown } from 'lucide-react';

const CATEGORIES = ['Semua', 'Bakso', 'Burger', 'Ayam', 'Minuman'];

const RESTAURANTS = [
  {
    id: 'mr-burger',
    name: 'Mr Burger',
    emoji: '🍔',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop',
    rating: 4.8, reviews: '100rb+', time: '± 30 min', discount: '50%',
    category: 'Burger',
  },
  {
    id: 'bobamilk',
    name: 'BOBAMILK',
    emoji: '🧋',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop',
    rating: 4.8, reviews: '100rb+', time: '± 30 min', discount: null,
    category: 'Minuman',
  },
  {
    id: 'mr-kebab',
    name: 'MR KEBAB',
    emoji: '🌯',
    image: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=200&h=200&fit=crop',
    rating: 4.5, reviews: '80rb+', time: '± 30 min', discount: null,
    category: 'Semua',
  },
];

function FoodContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [category, setCategory] = useState('Semua');

  const filtered = RESTAURANTS.filter(r => {
    const matchQ = !query || r.name.toLowerCase().includes(query.toLowerCase());
    const matchC = category === 'Semua' || r.category === category;
    return matchQ && matchC;
  });

  return (
    <div className="min-h-screen bg-[#f5f6fa] flex flex-col">

      {/* Header */}
      <div className="bg-[#193CA5] px-4 pt-10 pb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="bg-white rounded-xl px-2.5 py-1.5">
              <span className="text-[#193CA5] font-black text-sm tracking-widest leading-none block">WUS</span>
              <span className="text-[#193CA5]/60 font-bold text-[7px] tracking-widest leading-none block">DELIVERY</span>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <MapPin size={10} className="text-white/60" />
                <span className="text-white/60 text-[10px]">Antar ke:</span>
              </div>
              <button className="flex items-center gap-1">
                <span className="text-white text-[11px] font-semibold">Jl. Melati No.12, Surakarta</span>
                <ChevronDown size={11} className="text-white" />
              </button>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Bell size={16} className="text-white" />
          </div>
        </div>
        <div className="flex items-center bg-white rounded-2xl px-3 py-2.5 gap-2">
          <Search size={14} className="text-gray-400 shrink-0" />
          <input value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Cari makanan, minuman, atau restoran"
            className="flex-1 text-xs outline-none text-gray-600 placeholder:text-gray-400" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-6">
        {/* Category chips */}
        <div className="flex gap-2 px-4 pt-3.5 pb-0 overflow-x-auto no-scrollbar">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCategory(c)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-[11px] font-semibold transition-all
                ${category === c ? 'bg-[#193CA5] text-white' : 'bg-white text-gray-500 shadow-sm'}`}>
              {c}
            </button>
          ))}
        </div>

        {/* Promo Banner */}
        <div className="px-4 pt-3">
          <div className="rounded-2xl overflow-hidden flex" style={{ background: 'linear-gradient(135deg, #193CA5, #2563eb)' }}>
            <div className="flex-1 px-4 py-4">
              <p className="text-white font-bold text-sm">Pesan Sekarang,</p>
              <p className="text-white font-black text-xl leading-tight">Lebih Hemat!</p>
              <p className="text-white/75 text-[11px]">Diskon s.d <strong className="text-white">50%</strong></p>
            </div>
            <div className="w-28 relative overflow-hidden">
              <img src="https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=200&h=120&fit=crop"
                alt="promo" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Category sub-chips */}
        <div className="flex gap-2 px-4 pt-3 overflow-x-auto no-scrollbar">
          {['Semua', 'Burger', 'Hotdog'].map((c, i) => (
            <button key={c}
              className={`shrink-0 px-3.5 py-1 rounded-full text-[10px] font-semibold
                ${i === 0 ? 'bg-[#193CA5] text-white' : 'bg-white text-gray-500 shadow-sm'}`}>
              {c}
            </button>
          ))}
        </div>

        {/* Restoran Terdekat */}
        <div className="px-4 pt-3">
          <div className="flex justify-between items-center mb-2.5">
            <span className="font-bold text-[13px] text-[#171717]">Restoran Terdekat</span>
            <span className="text-[11px] text-[#193CA5] font-semibold">Lihat Semua &rsaquo;</span>
          </div>
          <div className="space-y-2.5">
            {filtered.map(r => (
              <Link key={r.id} href={`/restaurant/${r.id}`}>
                <div className="bg-white rounded-2xl p-3.5 flex items-center gap-3 shadow-sm active:scale-[0.98] transition-transform">
                  <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-[#FFF3E8] relative">
                    <img src={r.image} alt={r.name} className="w-full h-full object-cover"
                      onError={e => { (e.target as HTMLImageElement).parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center text-3xl">${r.emoji}</div>`; }} />
                    {r.discount && (
                      <span className="absolute bottom-0 right-0 bg-red-500 text-white text-[7px] font-black px-1 py-0.5 rounded-tl-lg">
                        -{r.discount}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[#171717] text-sm">{r.name}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star size={10} fill="#F59E0B" color="#F59E0B" />
                      <span className="text-[11px] font-semibold">{r.rating}</span>
                      <span className="text-[10px] text-gray-400">({r.reviews})</span>
                      <span className="text-gray-200">•</span>
                      <Clock size={10} className="text-gray-400" />
                      <span className="text-[10px] text-gray-400">{r.time}</span>
                    </div>
                  </div>
                  <ChevronRight size={14} className="text-gray-300 shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FoodPage() {
  return <Suspense><FoodContent /></Suspense>;
}
