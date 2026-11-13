'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Tag, Copy, Check, Clock } from 'lucide-react';
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
    badge: 'Diskon 50%',
  },
  {
    id: 2,
    title: 'Gratis Ongkir WUSRide',
    desc: 'Gratis ongkos kirim untuk perjalanan hemat dalam kota tanpa minimum transaksi.',
    code: 'RIDEFREE',
    expiry: '15 Nov 2026',
    emoji: '🏍️',
    color: '#F59E0B',
    badge: 'Ongkir Rp 0',
  },
  {
    id: 3,
    title: 'Cashback 20% WusPay',
    desc: 'Bayar dengan saldo WusPay dan raih cashback instan hingga Rp 10.000.',
    code: 'WUSPAY20',
    expiry: '31 Des 2026',
    emoji: '📱',
    color: '#10B981',
    badge: 'Cashback 20%',
  },
  {
    id: 4,
    title: 'Diskon WUSMart Belanja Harian',
    desc: 'Diskon 15% untuk belanja kebutuhan sembako & dapur keluarga.',
    code: 'MART15',
    expiry: '20 Nov 2026',
    emoji: '🛒',
    color: '#8B5CF6',
    badge: 'Diskon 15%',
  },
  {
    id: 5,
    title: 'WUSCar Diskon Akhir Pekan',
    desc: 'Kenyamanan perjalanan mobil dengan potongan harga Rp 20.000.',
    code: 'CARWEEKEND',
    expiry: '25 Nov 2026',
    emoji: '🚗',
    color: '#EC4899',
    badge: 'Hemat 20rb',
  },
  {
    id: 6,
    title: 'WUSSend Kirim Paket Cepat',
    desc: 'Pengiriman dokumen & barang instan dalam hitungan jam.',
    code: 'SENDFREE',
    expiry: '30 Nov 2026',
    emoji: '📨',
    color: '#06B6D4',
    badge: 'Diskon 25%',
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
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col pb-24 md:pb-12 select-none">
      <MobileStatusBar />

      {/* ── MOBILE HEADER (Hidden on desktop) ── */}
      <div className="md:hidden bg-white px-5 pt-3 pb-3.5 flex items-center justify-between border-b border-gray-100 shadow-2xs">
        <button
          onClick={() => router.push('/')}
          className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center text-gray-700 active:scale-95"
        >
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-base font-extrabold text-[#111827]">Voucher & Promo</h1>
        <div className="w-9" />
      </div>

      {/* ── MAIN CONTENT (Laptop/Desktop Responsive Layout) ── */}
      <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 md:py-8 flex-1 space-y-6">
        <div className="hidden md:block">
          <h1 className="text-2xl font-black text-[#111827] flex items-center gap-2.5">
            <Tag className="text-[#193CA5]" /> Voucher & Kode Promo Aktif
          </h1>
          <p className="text-sm text-gray-500 mt-1">Salin kode voucher di bawah dan gunakan saat memesan untuk hemat lebih banyak</p>
        </div>

        {/* Promo Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {PROMOS.map(p => (
            <div
              key={p.id}
              className="bg-white rounded-3xl border border-gray-150 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
            >
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 text-2xl flex items-center justify-center shadow-xs border border-gray-100">
                    {p.emoji}
                  </div>
                  <span className="text-[11px] font-black text-[#193CA5] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
                    {p.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-[#111827] leading-snug">{p.title}</h3>
                  <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{p.desc}</p>
                </div>
              </div>

              {/* Bottom Voucher Code Area */}
              <div className="p-5 bg-gray-50/80 border-t border-dashed border-gray-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-gray-800 tracking-wider bg-white border border-gray-300 px-3 py-1.5 rounded-lg shadow-2xs">
                    {p.code}
                  </span>
                  <span className="text-[10px] text-gray-400 flex items-center gap-1">
                    <Clock size={11} /> {p.expiry}
                  </span>
                </div>

                <button
                  onClick={() => copy(p.code)}
                  className={`text-xs font-bold px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                    copiedCode === p.code
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#193CA5] hover:bg-[#15328A] text-white shadow-xs'
                  }`}
                >
                  {copiedCode === p.code ? (
                    <>
                      <Check size={13} strokeWidth={3} /> Tersalin
                    </>
                  ) : (
                    <>
                      <Copy size={13} /> Salin
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* ── MOBILE BOTTOM NAV ── */}
      <BottomNav />
    </div>
  );
}
