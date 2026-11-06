'use client';

import { useState } from 'react';
import { PROMO_BANNERS } from '@/data';
import Link from 'next/link';

export default function PromoBanner() {
  const [active, setActive] = useState(0);

  return (
    <div>
      {/* Banner */}
      <div className="overflow-hidden rounded-2xl">
        {PROMO_BANNERS.map((b, i) => (
          <div key={b.id} style={{ display: i === active ? 'block' : 'none' }}>
            <Link href="/promo">
              <div className="rounded-2xl px-5 py-5 flex justify-between items-center"
                style={{ background: `linear-gradient(135deg, ${b.color}, ${b.color}dd)` }}>
                <div>
                  <div className="inline-block bg-yellow-300 text-yellow-900 text-[9px] font-black px-2 py-0.5 rounded-full mb-2">
                    PROMO SPESIAL
                  </div>
                  <p className="text-white/85 text-xs">Pesan Sekarang,</p>
                  <p className="text-white text-2xl font-black leading-tight">{b.title}</p>
                  <p className="text-white/75 text-xs mt-1">{b.subtitle}</p>
                  <button className="mt-3 bg-white text-xs font-bold px-4 py-1.5 rounded-full"
                    style={{ color: b.color }}>
                    Klaim Sekarang
                  </button>
                </div>
                <span className="text-6xl select-none">{b.emoji}</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
      {/* Dots */}
      <div className="flex justify-center gap-1.5 mt-2">
        {PROMO_BANNERS.map((_, i) => (
          <button key={i} onClick={() => setActive(i)}
            className={`rounded-full transition-all ${i === active ? 'w-5 h-1.5 bg-[#193CA5]' : 'w-1.5 h-1.5 bg-gray-300'}`} />
        ))}
      </div>
    </div>
  );
}
