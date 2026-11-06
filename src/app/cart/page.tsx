'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Plus, Minus, Trash2, Edit3 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

function fmt(n: number) { return 'Rp.' + n.toLocaleString('id-ID'); }
const DELIVERY_FEE = 5000;

export default function CartPage() {
  const router = useRouter();
  const { cart, updateQuantity, totalPrice } = useCart();
  const [note, setNote] = useState('');

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-[#f5f6fa] flex flex-col items-center justify-center px-6">
        <span className="text-6xl mb-4">🛒</span>
        <h2 className="text-lg font-black text-[#171717] mb-2">Keranjang Kosong</h2>
        <p className="text-gray-400 text-sm text-center mb-6">Yuk, tambahkan makanan favoritmu!</p>
        <Link href="/food">
          <button className="bg-[#193CA5] text-white px-8 py-3 rounded-2xl font-bold text-sm">Pesan Sekarang</button>
        </Link>
      </div>
    );
  }

  const total = totalPrice + DELIVERY_FEE;

  return (
    <div className="min-h-screen bg-[#f5f6fa] flex flex-col">

      {/* Header */}
      <div className="bg-white px-4 pt-11 pb-3.5 flex items-center gap-3 shadow-sm shrink-0">
        <button onClick={() => router.back()}
          className="w-9 h-9 bg-[#F5F6FA] rounded-xl flex items-center justify-center">
          <ChevronLeft size={19} className="text-[#171717]" />
        </button>
        <h1 className="flex-1 text-base font-black text-[#171717] text-center">Keranjang</h1>
        <button className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center">
          <Trash2 size={16} className="text-red-400" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-3.5 pb-36 space-y-2.5">
        {/* Items */}
        {cart.items.map(item => (
          <div key={item.product.id} className="bg-white rounded-2xl p-3.5 flex items-center gap-3 shadow-sm">
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#FFF3E8] shrink-0">
              <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover"
                onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-[#171717] text-sm">{item.product.name}</p>
              <p className="text-[#193CA5] font-bold text-sm mt-0.5">{fmt(item.product.price)}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                className="w-7 h-7 border-[1.5px] border-[#193CA5] rounded-lg flex items-center justify-center">
                <Minus size={12} className="text-[#193CA5]" />
              </button>
              <span className="text-sm font-bold text-[#171717] w-4 text-center">{item.quantity}</span>
              <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                className="w-7 h-7 bg-[#193CA5] rounded-lg flex items-center justify-center">
                <Plus size={12} className="text-white" />
              </button>
            </div>
          </div>
        ))}

        {/* Note */}
        <div className="bg-white rounded-2xl p-3.5 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Edit3 size={13} className="text-[#193CA5]" />
            <span className="text-xs font-semibold text-[#193CA5]">Catatan untuk restoran</span>
          </div>
          <textarea value={note} onChange={e => setNote(e.target.value)}
            placeholder="Tambahkan catatan (opsional)..."
            className="w-full bg-[#F5F6FA] rounded-xl p-2.5 text-xs text-gray-600 outline-none resize-none"
            rows={2} />
        </div>

        {/* Summary */}
        <div className="bg-white rounded-2xl p-3.5 shadow-sm">
          <div className="flex justify-between py-1.5">
            <span className="text-sm text-gray-500">Subtotal</span>
            <span className="text-sm font-semibold text-[#171717]">{fmt(totalPrice)}</span>
          </div>
          <div className="flex justify-between py-1.5">
            <span className="text-sm text-gray-500">Biaya Pengiriman</span>
            <span className="text-sm font-semibold text-[#171717]">{fmt(DELIVERY_FEE)}</span>
          </div>
          <div className="h-px bg-dashed bg-gray-100 my-1" style={{ borderTop: '1px dashed #e5e7eb' }} />
          <div className="flex justify-between py-1.5">
            <span className="text-sm font-bold text-[#171717]">Total Pembayaran</span>
            <span className="text-base font-black text-[#193CA5]">{fmt(total)}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white px-4 py-3.5 pb-6 shadow-lg">
        <Link href="/checkout">
          <button className="w-full bg-[#193CA5] text-white py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-[#193CA5]/25">
            Lanjut ke Checkout
          </button>
        </Link>
      </div>
    </div>
  );
}
