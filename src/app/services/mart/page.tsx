'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ShoppingCart, Plus, Minus, Search } from 'lucide-react';
import MobileStatusBar from '@/components/shared/MobileStatusBar';

const MART_ITEMS = [
  { id: 'm1', name: 'Minyak Goreng 2L', category: 'Sembako', price: 34000, emoji: '🍳' },
  { id: 'm2', name: 'Beras Premium 5kg', category: 'Sembako', price: 68000, emoji: '🌾' },
  { id: 'm3', name: 'Telur Ayam 1kg', category: 'Segar', price: 27000, emoji: '🥚' },
  { id: 'm4', name: 'Susu UHT 1L', category: 'Minuman', price: 19500, emoji: '🥛' },
  { id: 'm5', name: 'Mie Instan (5 bungkus)', category: 'Instan', price: 15000, emoji: '🍜' },
];

function fmt(n: number) {
  return 'Rp. ' + n.toLocaleString('id-ID');
}

export default function WUSMartPage() {
  const router = useRouter();
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [search, setSearch] = useState('');

  const updateQty = (id: string, delta: number) => {
    setQuantities(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: next };
    });
  };

  const totalItems = Object.values(quantities).reduce((a, b) => a + b, 0);
  const totalPrice = Object.entries(quantities).reduce((acc, [id, qty]) => {
    const item = MART_ITEMS.find(i => i.id === id);
    return acc + (item ? item.price * qty : 0);
  }, 0);

  const filtered = MART_ITEMS.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F5F6FA] flex flex-col relative pb-28 select-none">
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
        <div className="flex items-center gap-1.5">
          <ShoppingCart size={18} className="text-[#193CA5]" />
          <h1 className="text-base font-extrabold text-[#111827]">WUSMart</h1>
        </div>
        <div className="w-9" />
      </div>

      {/* ── CONTENT ── */}
      <div className="flex-1 min-h-0 overflow-y-auto px-5 pt-4 space-y-3.5 pb-8">
        <div className="flex items-center bg-[#F1F5F9] rounded-full px-4 py-2.5 gap-2.5 border border-transparent focus-within:border-blue-200 focus-within:bg-white transition-all shadow-2xs">
          <Search size={16} className="text-gray-400 shrink-0" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cari kebutuhan dapur & sembako..."
            className="flex-1 text-xs outline-none bg-transparent text-gray-800 placeholder:text-gray-400 font-medium"
          />
        </div>

        <div className="space-y-3">
          {filtered.map(item => {
            const qty = quantities[item.id] || 0;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-3.5 border border-gray-150 shadow-2xs flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-2xl flex items-center justify-center shadow-2xs shrink-0">
                    {item.emoji}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs font-bold text-[#111827] truncate">{item.name}</h3>
                    <p className="text-xs font-extrabold text-[#193CA5] mt-0.5">{fmt(item.price)}</p>
                  </div>
                </div>

                <div className="shrink-0">
                  {qty > 0 ? (
                    <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-xl px-2 py-1">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        className="w-6 h-6 rounded-md bg-white text-[#193CA5] border border-blue-200 flex items-center justify-center cursor-pointer active:scale-95"
                      >
                        <Minus size={11} strokeWidth={2.5} />
                      </button>
                      <span className="text-xs font-bold text-[#193CA5] min-w-3 text-center">{qty}</span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        className="w-6 h-6 rounded-md bg-[#193CA5] text-white flex items-center justify-center cursor-pointer active:scale-95"
                      >
                        <Plus size={11} strokeWidth={2.5} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => updateQty(item.id, 1)}
                      className="bg-[#193CA5] hover:bg-[#15328A] text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-all shadow-2xs cursor-pointer flex items-center gap-1"
                    >
                      <Plus size={13} /> Beli
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── FIXED BOTTOM CTA ── */}
      {totalItems > 0 && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] px-5 py-3.5 bg-white border-t border-gray-150 z-50 shadow-lg">
          <button
            onClick={() => router.push('/cart')}
            className="w-full bg-[#193CA5] hover:bg-[#15328A] active:scale-[0.98] text-white font-extrabold py-3.5 rounded-full text-xs transition-all shadow-md shadow-[#193CA5]/25 flex items-center justify-between px-5 cursor-pointer"
          >
            <span>{totalItems} Barang Dipilih</span>
            <span>Checkout • {fmt(totalPrice)} &rsaquo;</span>
          </button>
        </div>
      )}
    </div>
  );
}
