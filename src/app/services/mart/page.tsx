'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ShoppingCart, Plus, Minus, Search } from 'lucide-react';
import MobileStatusBar from '@/components/shared/MobileStatusBar';

const MART_ITEMS = [
  { id: 'm1', name: 'Minyak Goreng 2L', category: 'Sembako', price: 34000, emoji: '🍳' },
  { id: 'm2', name: 'Beras Premium 5kg', category: 'Sembako', price: 68000, emoji: '🌾' },
  { id: 'm3', name: 'Telur Ayam 1kg (16 butir)', category: 'Segar', price: 27000, emoji: '🥚' },
  { id: 'm4', name: 'Susu UHT Full Cream 1L', category: 'Minuman', price: 19500, emoji: '🥛' },
  { id: 'm5', name: 'Mie Instan Goreng (Pack isi 5)', category: 'Instan', price: 15000, emoji: '🍜' },
  { id: 'm6', name: 'Air Mineral Galon 19L', category: 'Minuman', price: 20000, emoji: '💧' },
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
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col pb-28 md:pb-12 select-none">
      <MobileStatusBar />

      {/* ── MOBILE HEADER (Hidden on desktop) ── */}
      <div className="md:hidden bg-white px-5 pt-3 pb-3.5 flex items-center justify-between border-b border-gray-100 shadow-2xs">
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

      {/* ── MAIN CONTENT (Laptop/Desktop Responsive Layout) ── */}
      <main className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-5 md:py-8 flex-1 space-y-6">
        <div className="hidden md:block">
          <h1 className="text-2xl font-black text-[#111827] flex items-center gap-2">
            <ShoppingCart className="text-[#193CA5]" /> WUSMart — Belanja Harian Super Cepat
          </h1>
          <p className="text-sm text-gray-500 mt-1">Belanja kebutuhan sembako, sayur segar, dan dapur sampai dalam 30 menit</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl p-3 border border-gray-150 shadow-xs">
          <div className="flex items-center bg-[#F1F5F9] rounded-xl px-4 py-3 gap-3">
            <Search size={18} className="text-gray-400 shrink-0" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Cari beras, minyak goreng, susu, atau kebutuhan dapur..."
              className="flex-1 text-xs sm:text-sm outline-none bg-transparent text-gray-800 font-medium"
            />
          </div>
        </div>

        {/* Mart Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {filtered.map(item => {
            const qty = quantities[item.id] || 0;
            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-5 border border-gray-150 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 text-3xl flex items-center justify-center shadow-xs shrink-0">
                    {item.emoji}
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{item.category}</span>
                    <h3 className="text-sm sm:text-base font-bold text-[#111827] mt-0.5 leading-snug">{item.name}</h3>
                    <p className="text-sm font-black text-[#193CA5] mt-1">{fmt(item.price)}</p>
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-400">Jumlah</span>
                  {qty > 0 ? (
                    <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-xl px-2.5 py-1">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        className="w-6 h-6 rounded-md bg-white text-[#193CA5] border border-blue-200 flex items-center justify-center cursor-pointer active:scale-95"
                      >
                        <Minus size={12} strokeWidth={2.5} />
                      </button>
                      <span className="text-xs font-bold text-[#193CA5] w-4 text-center">{qty}</span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        className="w-6 h-6 rounded-md bg-[#193CA5] text-white flex items-center justify-center cursor-pointer active:scale-95"
                      >
                        <Plus size={12} strokeWidth={2.5} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => updateQty(item.id, 1)}
                      className="bg-[#193CA5] hover:bg-[#15328A] text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs cursor-pointer flex items-center gap-1"
                    >
                      <Plus size={14} /> Beli
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        {totalItems > 0 && (
          <div className="pt-2">
            <button
              onClick={() => router.push('/cart')}
              className="w-full bg-[#193CA5] hover:bg-[#15328A] active:scale-[0.98] text-white font-extrabold py-4 px-6 rounded-2xl text-sm sm:text-base transition-all shadow-md shadow-[#193CA5]/25 flex items-center justify-between cursor-pointer"
            >
              <span>{totalItems} Barang Dipilih</span>
              <span>Checkout • {fmt(totalPrice)} &rsaquo;</span>
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
