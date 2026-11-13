'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Trash2, Plus, Minus, Pencil } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import MobileStatusBar from '@/components/shared/MobileStatusBar';

const DELIVERY_FEE = 5000;

function fmt(n: number) {
  return 'Rp. ' + n.toLocaleString('id-ID');
}

export default function CartPage() {
  const router = useRouter();
  const { cart, updateQuantity, clearCart, totalPrice } = useCart();
  const [note, setNote] = useState('');

  const displayItems = cart.items.length > 0 ? cart.items : [
    {
      product: {
        id: 'p1',
        restaurantId: 'mr-burger',
        name: 'Hot Dog',
        description: '',
        price: 20000,
        image: 'https://images.unsplash.com/photo-1619740455993-9d492ce96ab7?w=160&h=160&fit=crop',
        category: 'Snack',
        isAvailable: true,
      },
      quantity: 1,
      restaurantId: 'mr-burger',
      restaurantName: 'MR Burger',
    },
    {
      product: {
        id: 'p2',
        restaurantId: 'mr-burger',
        name: 'Beef Burger',
        description: '',
        price: 30000,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=160&h=160&fit=crop',
        category: 'Burger',
        isAvailable: true,
      },
      quantity: 1,
      restaurantId: 'mr-burger',
      restaurantName: 'MR Burger',
    },
  ];

  const subtotal = cart.items.length > 0
    ? totalPrice
    : displayItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const grandTotal = subtotal + DELIVERY_FEE;

  return (
    <div className="min-h-screen bg-[#F5F6FA] flex flex-col relative pb-28 select-none">
      {/* ── STATUS BAR ── */}
      <MobileStatusBar variant="dark" />

      {/* ── HEADER ── */}
      <div className="bg-white px-5 pt-2 pb-3.5 flex items-center justify-between border-b border-gray-100 shadow-2xs">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center text-gray-700 active:scale-95"
        >
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-base font-extrabold text-[#111827]">Keranjang</h1>
        <button
          onClick={clearCart}
          className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center text-gray-500 hover:text-red-500 active:scale-95 transition-colors"
          title="Kosongkan Keranjang"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* ── CONTENT ── */}
      <div className="flex-1 min-h-0 overflow-y-auto px-5 pt-4 space-y-4 pb-8">
        {/* Item List with Generous Spacing */}
        <div className="space-y-3">
          {displayItems.map(item => (
            <div
              key={item.product.id}
              className="bg-white rounded-2xl p-4 border border-gray-150 shadow-2xs flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 shrink-0 shadow-inner">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs font-bold text-[#111827] truncate">{item.product.name}</h3>
                  <p className="text-xs font-extrabold text-[#193CA5] mt-1">{fmt(item.product.price)}</p>
                </div>
              </div>

              {/* Quantity Stepper with Comfortable Padding */}
              <div className="flex items-center gap-2.5 bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-1 shrink-0">
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  className="w-6 h-6 rounded-md bg-white border border-gray-200 text-gray-700 flex items-center justify-center cursor-pointer active:scale-95"
                >
                  <Minus size={12} strokeWidth={2.5} />
                </button>
                <span className="text-xs font-bold text-gray-900 min-w-3 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  className="w-6 h-6 rounded-md bg-[#193CA5] text-white flex items-center justify-center cursor-pointer active:scale-95 shadow-xs"
                >
                  <Plus size={12} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Notes Input */}
        <div className="bg-white rounded-2xl p-3.5 border border-gray-150 shadow-2xs flex items-center gap-2.5">
          <input
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="Catatan untuk restoran..."
            className="flex-1 text-xs outline-none bg-transparent text-gray-800 placeholder:text-gray-400 font-medium"
          />
          <Pencil size={14} className="text-gray-400 shrink-0" />
        </div>

        {/* Ringkasan Biaya with Generous Internal Spacing */}
        <div className="bg-white rounded-2xl p-4 border border-gray-150 shadow-2xs space-y-3">
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span>Subtotal</span>
            <span className="font-bold text-gray-900">{fmt(subtotal)}</span>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-600">
            <span>Biaya Pengiriman</span>
            <span className="font-bold text-gray-900">{fmt(DELIVERY_FEE)}</span>
          </div>

          {/* Total Pembayaran Banner */}
          <div className="bg-[#EAF1FF] border border-blue-100 rounded-xl px-4 py-3 flex items-center justify-between mt-2">
            <span className="text-xs font-bold text-[#193CA5]">Total Pembayaran</span>
            <span className="text-sm font-black text-[#193CA5]">{fmt(grandTotal)}</span>
          </div>
        </div>
      </div>

      {/* ── FIXED BOTTOM CTA ── */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] px-5 py-3.5 bg-white border-t border-gray-150 z-50 shadow-lg">
        <Link href="/checkout">
          <button className="w-full bg-[#193CA5] hover:bg-[#15328A] active:scale-[0.98] text-white font-extrabold py-3.5 rounded-full text-xs transition-all shadow-md shadow-[#193CA5]/25 cursor-pointer">
            Lanjut ke Checkout
          </button>
        </Link>
      </div>
    </div>
  );
}
