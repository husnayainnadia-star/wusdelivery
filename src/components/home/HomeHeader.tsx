'use client';

import Link from 'next/link';
import { MapPin, Bell, Search, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import WUSLogo from '@/components/shared/WUSLogo';

export default function HomeHeader() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  return (
    <div className="bg-[#193CA5] px-4 pt-12 pb-5 rounded-b-3xl">
      {/* Top row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <WUSLogo size="sm" variant="white" />
          <div>
            <div className="flex items-center gap-1">
              <MapPin size={11} className="text-white/70" />
              <span className="text-white/70 text-[10px]">Antar ke:</span>
            </div>
            <button className="flex items-center gap-1">
              <span className="text-white text-xs font-semibold">Jl. Melati No.12, Surakarta</span>
              <ChevronDown size={12} className="text-white" />
            </button>
          </div>
        </div>
        <Link href="/notifications" className="relative">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
            <Bell size={18} className="text-white" />
          </div>
          <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-400 rounded-full border border-[#193CA5]" />
        </Link>
      </div>

      {/* Search */}
      <div className="flex items-center bg-white rounded-2xl px-4 py-2.5 gap-3">
        <Search size={16} className="text-gray-400 shrink-0" />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && router.push(`/food?q=${query}`)}
          placeholder="Cari makanan, minuman, atau restoran"
          className="flex-1 text-sm outline-none text-gray-700 placeholder:text-gray-400"
        />
      </div>
    </div>
  );
}
