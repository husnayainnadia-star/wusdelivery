'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Tag, Copy, Check } from 'lucide-react';
import BottomNav from '@/components/navigation/BottomNav';
import MobileStatusBar from '@/components/shared/MobileStatusBar';

const PROMOS = [
  {
    id: 1,
    title: 'Diskon 50% WUSFood',
    desc: 'Berlaku untuk semua menu di restoran pilihan. Min. order Rp 15.000.',
    code: 'WUSFOOD50',
    expiry: '30 Nov 2026',
    emoji: '🍔',
    color: '#193CA5',
  },
  {
    id: 2,
    title: 'Gratis Ongkir WUSRide',
    desc: 'Gratis ongkos kirim untuk perjalanan hemat dalam kota.',
    code: 'RIDEFREE',
    expiry: '15 Nov 2026',
    emoji: '🏍️',
    color: '#F59E0B',
  },
  {
    id: 3,
    title: 'Cashback 20% WusPay',
    desc: 'Bayar dengan WusPay dan raih cashback hingga Rp 10.000.',
    code: 'WUSPAY20',
    expiry: '31 Des 2026',
    emoji: '📱',
    color: '#10B981',
  },
  {
    id: 4,
    title: 'Diskon WUSMart Belanja Harian',
    desc: 'Diskon 15% untuk belanja kebutuhan sembako & dapur.',
    code: 'MART15',
    expiry: '20 Nov 2026',
    emoji: '🛒',
    color: '#8B5CF6',
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
      <MobileStatusBar variant="dark" className="page-px px-5" />

      {/* ── HEADER ── */}
      <div className="bg-white page-px px-5 pt-2 pb-3.5 flex items-center justify-between border-b border-gray-100">
        <button
          onClick={() => router.push('/')}
          className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center text-gray-700 active:scale-95"
        >
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-base font-extrabold text-[#171717]">Voucher & Promo</h1>
        <div className="w-9" />
      </div>

      {/* ── CONTENT ── */}
      <div className="flex-1 min-h-0 overflow-y-auto page-px px-5 pt-4 space-y-4 pb-8">
        {PROMOS.map(p => (
          <div
            key={p.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
          >
            <div className="p-4 flex gap-3.5">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl shrink-0"
                style={{ backgroundColor: `${p.color}15` }}
              >
                {p.emoji}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-[#171717] text-sm">{p.title}</h3>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{p.desc}</p>
                <p className="text-[10px] text-gray-400 mt-1">Berlaku s.d: {p.expiry}</p>
              </div>
            </div>

            <div className="border-t border-dashed border-gray-200 mx-4" />

            <div className="px-4 py-2.5 bg-gray-50/70 flex items-center justify-between">
              <div className="flex items-center gap-1.5 bg-[#EAF1FF] rounded-lg px-2.5 py-1">
                <Tag size={12} className="text-[#193CA5]" />
                <span className="text-xs font-black text-[#193CA5] tracking-widest">{p.code}</span>
              </div>

              <button
                onClick={() => copy(p.code)}
                className="text-xs font-bold text-[#193CA5] hover:bg-[#EAF1FF] px-3 py-1.5 rounded-lg flex items-center gap-1 active:scale-95 transition-all"
              >
                {copiedCode === p.code ? (
                  <>
                    <Check size={13} className="text-emerald-600" />
                    <span className="text-emerald-600">Disalin!</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Salin Kode</span>
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
