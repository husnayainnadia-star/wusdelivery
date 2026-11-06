import Link from 'next/link';
import { Star, Clock, ChevronRight } from 'lucide-react';
import { RESTAURANTS } from '@/data';

export default function NearbyRestaurants() {
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-base font-bold text-[#171717]">Restoran Terdekat</h2>
        <Link href="/food" className="text-xs text-[#193CA5] font-semibold flex items-center gap-0.5">
          Lihat Semua <ChevronRight size={12} />
        </Link>
      </div>
      <div className="space-y-3">
        {RESTAURANTS.slice(0, 4).map(r => (
          <Link key={r.id} href={`/restaurant/${r.id}`}>
            <div className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm active:scale-[0.98] transition-transform">
              <div className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl shrink-0 bg-[#F5F6FA] relative">
                {r.image}
                {r.discount ? (
                  <span className="absolute -bottom-1 -right-1 bg-red-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full">
                    -{r.discount}%
                  </span>
                ) : null}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-[#171717] text-sm truncate">{r.name}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star size={11} fill="#F59E0B" color="#F59E0B" />
                  <span className="text-xs font-semibold text-gray-700">{r.rating}</span>
                  <span className="text-xs text-gray-400">({r.reviewCount}rb+)</span>
                  <span className="text-gray-300">•</span>
                  <Clock size={11} className="text-gray-400" />
                  <span className="text-xs text-gray-400">{r.deliveryTime}</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {r.tags.slice(0, 2).map(t => (
                    <span key={t} className="text-[9px] bg-[#EAF1FF] text-[#193CA5] font-semibold px-2 py-0.5 rounded-full">{t}</span>
                  ))}
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-300 shrink-0" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
