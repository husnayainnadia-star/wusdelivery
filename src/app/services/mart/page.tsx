'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ShoppingCart, Plus, Minus } from 'lucide-react';
import MobileStatusBar from '@/components/shared/MobileStatusBar';

const MART_ITEMS = [
  { id: 'm1', name: 'Minyak Goreng 2L', price: 34000, emoji: '🍳', category: 'Sembako' },
  { id: 'm2', name: 'Beras Premium 5kg', price: 72000, emoji: '🌾', category: 'Sembako' },
  { id: 'm3', name: 'Telur Ayam 1kg', price: 28000, emoji: '🥚', category: 'Sembako' },
  { id: 'm4', name: 'Susu Segar UHT 1L', price: 19000, emoji: '🥛', category: 'Minuman' },
  { id: 'm5', name: 'Roti Gandum', price: 16000, emoji: '🍞', category: 'Bakery' },
];

export default function WUSMartPage() {
  const router = useRouter();
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const setQty = (id: string, delta: number) => {
    setQuantities(prev => {
      const cur = prev[id] || 0;
      const next = Math.max(0, cur + delta);
      return { ...prev, [id]: next };
    });
  };

  const totalSelected = Object.values(quantities).reduce((a, b) => a + b, 0);
  const totalCost = MART_ITEMS.reduce((sum, item) => sum + (quantities[item.id] || 0) * item.price, 0);

  return (
    <div className="min-h-screen bg-[#F5F6FA] flex flex-col relative pb-28 select-none">
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
        <div className="flex items-center gap-1.5">
          <ShoppingCart size={18} className="text-[#193CA5]" />
          <h1 className="text-base font-extrabold text-[#171717]">WUSMart</h1>
        </div>
        <div className="w-9" />
      </div>

      {/* ── CONTENT ── */}
      <div className="flex-1 min-h-0 overflow-y-auto page-px px-5 pt-4 space-y-4 pb-8">
        {/* Banner */}
        <div className="bg-gradient-to-r from-[#1432A0] to-[#193CA5] rounded-2xl p-4 text-white shadow-sm flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold">Belanja Kebutuhan Harian</h2>
            <p className="text-xs text-white/80 mt-0.5">Sembako segar langsung sampai dalam 30 menit</p>
          </div>
          <span className="text-3xl">🛒</span>
        </div>

        {/* Item List */}
        <div className="space-y-3">
          {MART_ITEMS.map(item => {
            const qty = quantities[item.id] || 0;

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-sm flex items-center gap-3.5"
              >
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-2xl shrink-0">
                  {item.emoji}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-xs font-bold text-[#171717]">{item.name}</h3>
                  <p className="text-xs font-extrabold text-[#193CA5] mt-0.5">
                    Rp {item.price.toLocaleString('id-ID')}
                  </p>
                </div>

                {qty > 0 ? (
                  <div className="flex items-center gap-2 bg-[#EAF1FF] rounded-full px-2 py-1">
                    <button
                      onClick={() => setQty(item.id, -1)}
                      className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#193CA5] active:scale-95"
                    >
                      <Minus size={12} strokeWidth={2.5} />
                    </button>
                    <span className="text-xs font-bold text-[#193CA5] min-w-3 text-center">{qty}</span>
                    <button
                      onClick={() => setQty(item.id, 1)}
                      className="w-6 h-6 rounded-full bg-[#193CA5] flex items-center justify-center text-white active:scale-95"
                    >
                      <Plus size={12} strokeWidth={2.5} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setQty(item.id, 1)}
                    className="w-8 h-8 rounded-full bg-[#193CA5] text-white flex items-center justify-center active:scale-95 shadow-sm"
                  >
                    <Plus size={15} strokeWidth={2.5} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── BOTTOM CTA ── */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] px-5 py-3.5 bg-white border-t border-gray-100 z-50">
        <button
          onClick={() => totalSelected > 0 && router.push('/cart')}
          className="w-full bg-[#193CA5] hover:bg-[#15328A] active:scale-[0.98] text-white font-bold py-3.5 rounded-full text-sm transition-all shadow-md shadow-[#193CA5]/25 flex items-center justify-between px-5"
        >
          <span>{totalSelected > 0 ? `${totalSelected} Barang Dipilih` : 'Pilih Barang Belanja'}</span>
          <span className="font-extrabold">
            {totalSelected > 0 ? `Rp ${totalCost.toLocaleString('id-ID')}` : 'Mulai Belanja'}
          </span>
        </button>
      </div>
    </div>
  );
}
