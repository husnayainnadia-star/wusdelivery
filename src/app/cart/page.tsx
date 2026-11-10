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

  // Default demo items if cart is empty, so user can see the exact reference UI
  const displayItems = cart.items.length > 0 ? cart.items : [
    {
      product: {
        id: 'p1',
        restaurantId: 'mr-burger',
        name: 'Hot Dog',
        description: '',
        price: 20000,
        image: 'https://images.unsplash.com/photo-1619740455993-9d492ce96ab7?w=140&h=140&fit=crop',
        category: 'Snack',
        isAvailable: true,
      },
      quantity: 1,
      restaurantId: 'mr-burger',
      restaurantName: 'Mr Burger',
    },
    {
      product: {
        id: 'p2',
        restaurantId: 'mr-burger',
        name: 'Beef Burger',
        description: '',
        price: 30000,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=140&h=140&fit=crop',
        category: 'Burger',
        isAvailable: true,
      },
      quantity: 1,
      restaurantId: 'mr-burger',
      restaurantName: 'Mr Burger',
    },
  ];

  const subtotal = cart.items.length > 0
    ? totalPrice
    : displayItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const grandTotal = subtotal + DELIVERY_FEE;

  return (
    <div className="min-h-screen bg-[#F5F6FA] flex flex-col relative pb-24 select-none">
      {/* ── STATUS BAR ── */}
      <MobileStatusBar variant="dark" className="page-px px-5" />

      {/* ── HEADER ── */}
      <div className="bg-white page-px px-5 pt-2 pb-3.5 flex items-center justify-between border-b border-gray-100">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center text-gray-700 active:scale-95"
        >
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-base font-extrabold text-[#171717]">Keranjang</h1>
        <button
          onClick={clearCart}
          className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center text-gray-500 hover:text-red-500 active:scale-95"
          title="Hapus semua"
        >
          <Trash2 size={17} />
        </button>
      </div>

      {/* ── BODY ITEMS ── */}
      <div className="flex-1 min-h-0 overflow-y-auto page-px px-5 pt-4 space-y-4 pb-8">
        {/* Cart Item Cards with Generous Internal Padding */}
        <div className="space-y-3">
          {displayItems.map(item => (
            <div
              key={item.product.id}
              className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs flex items-center gap-4"
            >
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0 flex items-center justify-center text-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                  onError={e => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>

              <div className="flex-1 min-w-0 pr-1">
                <h3 className="text-sm font-bold text-[#171717] truncate">{item.product.name}</h3>
                <p className="text-xs font-extrabold text-[#193CA5] mt-1">
                  {fmt(item.product.price)}
                </p>
              </div>

              {/* Stepper Pill: - qty + */}
              <div className="flex items-center gap-2.5 bg-gray-100 rounded-full px-3 py-1.5 shrink-0">
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  className="text-gray-600 hover:text-black active:scale-90"
                >
                  <Minus size={13} strokeWidth={2.5} />
                </button>
                <span className="text-xs font-extrabold text-[#171717] min-w-3 text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  className="text-gray-600 hover:text-black active:scale-90"
                >
                  <Plus size={13} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Catatan untuk Restoran with Comfortable Padding */}
        <div className="bg-gray-100 rounded-2xl px-4 py-3.5 flex items-center gap-3">
          <Pencil size={15} className="text-gray-400 shrink-0" />
          <input
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="CATATAN UNTUK RESTORAN"
            className="flex-1 text-xs outline-none bg-transparent text-gray-700 placeholder:text-gray-400 font-semibold"
          />
        </div>

        {/* Ringkasan Biaya with Generous Internal Padding */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span>Subtotal</span>
            <span className="font-semibold text-gray-900">{fmt(subtotal)}</span>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-600">
            <span>Biaya Pengiriman</span>
            <span className="font-semibold text-gray-900">{fmt(DELIVERY_FEE)}</span>
          </div>

          {/* Total Pembayaran Banner */}
          <div className="bg-[#EAF1FF] rounded-xl px-4 py-3 flex items-center justify-between mt-2 shadow-2xs">
            <span className="text-xs font-bold text-[#193CA5]">Total Pembayaran</span>
            <span className="text-sm font-black text-[#193CA5]">{fmt(grandTotal)}</span>
          </div>
        </div>
      </div>

      {/* ── BOTTOM CTA ── */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] page-px px-5 py-4 bg-white border-t border-gray-100 z-50">
        <Link href="/checkout">
          <button className="w-full bg-[#193CA5] hover:bg-[#15328A] active:scale-[0.98] text-white font-bold py-3.5 rounded-full text-sm transition-all shadow-md shadow-[#193CA5]/25">
            Lanjut ke Chekout
          </button>
        </Link>
      </div>
    </div>
  );
}
