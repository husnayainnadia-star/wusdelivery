'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Copy, Check, Clock } from 'lucide-react';
import BottomNav from '@/components/navigation/BottomNav';
import MobileStatusBar from '@/components/shared/MobileStatusBar';

const PROMOS = [
  {
    id: 1,
    title: 'Diskon 50% WUSFood',
    desc: 'Berlaku untuk semua menu di resto pilihan. Min. order Rp 15.000.',
    code: 'WUSFOOD50',
    expiry: '30 Nov 2026',
    emoji: '🍔',
    badge: 'Diskon 50%',
  },
  {
    id: 2,
    title: 'Gratis Ongkir WUSRide',
    desc: 'Gratis ongkos kirim untuk perjalanan hemat dalam kota.',
    code: 'RIDEFREE',
    expiry: '15 Nov 2026',
    emoji: '🏍️',
    badge: 'Ongkir Rp 0',
  },
  {
    id: 3,
    title: 'Cashback 20% WusPay',
    desc: 'Bayar dengan saldo WusPay dan raih cashback hingga Rp 10.000.',
    code: 'WUSPAY20',
    expiry: '31 Des 2026',
    emoji: '📱',
    badge: 'Cashback 20%',
  },
  {
    id: 4,
    title: 'Diskon WUSMart Belanja Harian',
    desc: 'Diskon 15% untuk belanja kebutuhan sembako & dapur.',
    code: 'MART15',
    expiry: '20 Nov 2026',
    emoji: '🛒',
    badge: 'Diskon 15%',
  },
];

export default function PromoPage() {
  const router = useRouter();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copy = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 1800);
  };

  return (
    <div className="min-h-screen bg-[#F5F6FA] flex flex-col relative pb-24 select-none">
      {/* ── STATUS BAR ── */}
      <MobileStatusBar variant="dark" />

      {/* ── HEADER ── */}
      <div className="bg-white px-5 pt-2 pb-3.5 flex items-center justify-between border-b border-gray-100 shadow-2xs">
        <button
          onClick={() => router.push('/')}
          className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center text-gray-700 active:scale-95"
        >
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-base font-extrabold text-[#111827]">Voucher & Promo</h1>
        <div className="w-9" />
      </div>

      {/* ── CONTENT ── */}
      <div className="flex-1 min-h-0 overflow-y-auto px-5 pt-4 space-y-3.5 pb-8">
        {PROMOS.map(p => (
          <div
            key={p.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-2xs overflow-hidden"
          >
            <div className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-xl flex items-center justify-center shadow-2xs">
                  {p.emoji}
                </div>
                <span className="text-[10px] font-black text-[#193CA5] bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
                  {p.badge}
                </span>
              </div>

              <div>
                <h3 className="text-xs font-extrabold text-[#111827]">{p.title}</h3>
                <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">{p.desc}</p>
              </div>
            </div>

            <div className="px-4 py-2.5 bg-gray-50/80 border-t border-dashed border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-gray-800 bg-white border border-gray-300 px-2.5 py-1 rounded-md">
                  {p.code}
                </span>
                <span className="text-[10px] text-gray-400 flex items-center gap-1">
                  <Clock size={10} /> {p.expiry}
                </span>
              </div>

              <button
                onClick={() => copy(p.code)}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all cursor-pointer ${
                  copiedCode === p.code
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#193CA5] hover:bg-[#15328A] text-white shadow-xs'
                }`}
              >
                {copiedCode === p.code ? (
                  <>
                    <Check size={12} strokeWidth={3} /> Tersalin
                  </>
                ) : (
                  <>
                    <Copy size={12} /> Salin
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── BOTTOM NAV ── */}
      <BottomNav />
    </div>
  );
}
