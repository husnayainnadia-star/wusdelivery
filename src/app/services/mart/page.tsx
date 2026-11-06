'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Plus, ShoppingCart } from 'lucide-react';

const CATEGORIES = ['Semua', 'Buah & Sayur', 'Minuman', 'Snack', 'Bumbu', 'Susu & Telur'];
const PRODUCTS = [
  { id: 1, name: 'Sayur Bayam 250g', price: 5000, emoji: '🥬', cat: 'Buah & Sayur' },
  { id: 2, name: 'Jeruk Manis 1kg', price: 15000, emoji: '🍊', cat: 'Buah & Sayur' },
  { id: 3, name: 'Air Mineral 1.5L', price: 4000, emoji: '💧', cat: 'Minuman' },
  { id: 4, name: 'Teh Botol 350ml', price: 5000, emoji: '🍵', cat: 'Minuman' },
  { id: 5, name: 'Keripik Singkong', price: 8000, emoji: '🥔', cat: 'Snack' },
  { id: 6, name: 'Telur Ayam 10 pcs', price: 22000, emoji: '🥚', cat: 'Susu & Telur' },
  { id: 7, name: 'Susu UHT 1L', price: 18000, emoji: '🥛', cat: 'Susu & Telur' },
  { id: 8, name: 'Bawang Merah 500g', price: 12000, emoji: '🧅', cat: 'Bumbu' },
];

function formatRupiah(n: number) { return 'Rp ' + n.toLocaleString('id-ID'); }

export default function WUSMartPage() {
  const [category, setCategory] = useState('Semua');
  const [cart, setCart] = useState<Record<number, number>>({});

  const add = (id: number) => setCart(c => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const filtered = category === 'Semua' ? PRODUCTS : PRODUCTS.filter(p => p.cat === category);

  return (
    <main className="min-h-screen bg-[#F5F6FA]">
      <div className="bg-[#193CA5] px-4 pt-12 pb-5 rounded-b-3xl">
        <div className="flex items-center gap-3 mb-3">
          <Link href="/"><div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center"><ChevronLeft size={20} className="text-white" /></div></Link>
          <h1 className="text-white text-lg font-bold">WUSMart</h1>
          <span className="ml-auto text-3xl">🛒</span>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCategory(c)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold ${category === c ? 'bg-white text-[#193CA5]' : 'bg-white/20 text-white'}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-4 pb-28">
        <div className="grid grid-cols-2 gap-3">
          {filtered.map(p => (
            <div key={p.id} className="bg-white rounded-2xl p-3 shadow-sm">
              <div className="h-20 bg-[#F5F6FA] rounded-xl flex items-center justify-center text-4xl mb-2">{p.emoji}</div>
              <p className="text-xs font-bold text-[#171717] line-clamp-2">{p.name}</p>
              <p className="text-xs text-[#193CA5] font-bold mt-1">{formatRupiah(p.price)}</p>
              <button onClick={() => add(p.id)}
                className="mt-2 w-full bg-[#193CA5] text-white py-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1">
                <Plus size={12} /> {cart[p.id] ? `Tambah (${cart[p.id]})` : 'Tambah'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 px-4 pb-6 pt-2 bg-gradient-to-t from-[#F5F6FA]" style={{ maxWidth: 430, margin: '0 auto' }}>
          <button className="w-full bg-[#193CA5] text-white py-4 rounded-2xl font-bold text-sm shadow-lg shadow-[#193CA5]/30 flex items-center justify-center gap-2">
            <ShoppingCart size={16} />
            Checkout ({totalItems} item)
          </button>
        </div>
      )}
    </main>
  );
}
