'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Plus, Minus, Trash2, Edit3, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

function formatRupiah(n: number) {
  return 'Rp ' + n.toLocaleString('id-ID');
}

const DELIVERY_FEE = 5000;

export default function CartPage() {
  const router = useRouter();
  const { cart, updateQuantity, removeItem, totalPrice } = useCart();
  const [note, setNote] = useState('');

  if (cart.items.length === 0) {
    return (
      <main className="min-h-screen bg-[#F5F6FA] flex flex-col items-center justify-center px-6">
        <span className="text-7xl mb-4">🛒</span>
        <h2 className="text-xl font-black text-[#171717] mb-2">Keranjang Kosong</h2>
        <p className="text-gray-400 text-sm text-center mb-6">Yuk, tambahkan makanan favoritmu ke keranjang!</p>
        <Link href="/food">
          <button className="bg-[#193CA5] text-white px-8 py-3 rounded-2xl font-bold text-sm">
            Pesan Sekarang
          </button>
        </Link>
      </main>
    );
  }

  const total = totalPrice + DELIVERY_FEE;

  return (
    <main className="min-h-screen bg-[#F5F6FA]">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 flex items-center gap-3 shadow-sm">
        <button onClick={() => router.back()} className="w-9 h-9 bg-[#F5F6FA] rounded-xl flex items-center justify-center">
          <ChevronLeft size={20} className="text-[#171717]" />
        </button>
        <h1 className="flex-1 text-lg font-black text-[#171717] text-center">Keranjang</h1>
        <button onClick={() => {}} className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center">
          <Trash2 size={18} className="text-red-500" />
        </button>
      </div>

      <div className="px-4 pt-4 pb-36 space-y-3">
        {/* Restaurant name */}
        <div className="bg-[#EAF1FF] rounded-xl px-4 py-2.5 flex items-center gap-2">
          <ShoppingCart size={15} className="text-[#193CA5]" />
          <span className="text-xs font-semibold text-[#193CA5]">{cart.restaurantName}</span>
        </div>

        {/* Items */}
        {cart.items.map(item => (
          <div key={item.product.id} className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm">
            <div className="w-14 h-14 rounded-xl bg-[#FFF3E8] flex items-center justify-center text-2xl shrink-0">
              {item.product.image}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-[#171717] text-sm truncate">{item.product.name}</p>
              <p className="text-[#193CA5] font-bold text-sm mt-0.5">{formatRupiah(item.product.price)}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                className="w-8 h-8 rounded-lg border-2 border-[#193CA5] flex items-center justify-center">
                <Minus size={13} className="text-[#193CA5]" />
              </button>
              <span className="text-sm font-bold text-[#171717] w-5 text-center">{item.quantity}</span>
              <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                className="w-8 h-8 bg-[#193CA5] rounded-lg flex items-center justify-center">
                <Plus size={13} className="text-white" />
              </button>
            </div>
          </div>
        ))}

        {/* Note */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Edit3 size={14} className="text-[#193CA5]" />
            <span className="text-xs font-semibold text-[#193CA5]">Catatan untuk restoran</span>
          </div>
          <textarea value={note} onChange={e => setNote(e.target.value)}
            placeholder="Tambahkan catatan (opsional)..."
            className="w-full bg-[#F5F6FA] rounded-xl p-3 text-xs text-gray-600 outline-none resize-none"
            rows={2} />
        </div>

        {/* Summary */}
        <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
          <h3 className="font-bold text-[#171717] text-sm">Ringkasan Pembayaran</h3>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Subtotal</span>
            <span className="text-sm font-semibold text-[#171717]">{formatRupiah(totalPrice)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Biaya Pengiriman</span>
            <span className="text-sm font-semibold text-[#171717]">{formatRupiah(DELIVERY_FEE)}</span>
          </div>
          <div className="border-t border-dashed border-gray-200 pt-3 flex justify-between">
            <span className="text-sm font-bold text-[#171717]">Total Pembayaran</span>
            <span className="text-base font-black text-[#193CA5]">{formatRupiah(total)}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white px-4 py-4 pb-6 shadow-lg" style={{ maxWidth: 430, margin: '0 auto' }}>
        <Link href="/checkout">
          <button className="w-full bg-[#193CA5] text-white py-4 rounded-2xl font-bold text-sm shadow-lg shadow-[#193CA5]/30">
            Lanjut ke Checkout
          </button>
        </Link>
      </div>
    </main>
  );
}
