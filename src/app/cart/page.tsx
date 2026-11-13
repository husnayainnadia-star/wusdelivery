'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Trash2, Plus, Minus, Pencil, MapPin, ShieldCheck, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import MobileStatusBar from '@/components/shared/MobileStatusBar';

const DELIVERY_FEE = 5000;

function fmt(n: number) {
  return 'Rp ' + n.toLocaleString('id-ID');
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
        name: 'Hot Dog Sosis Sapi',
        description: '',
        price: 20000,
        image: 'https://images.unsplash.com/photo-1619740455993-9d492ce96ab7?w=160&h=160&fit=crop',
        category: 'Snack',
        isAvailable: true,
      },
      quantity: 1,
      restaurantId: 'mr-burger',
      restaurantName: 'MR Burger - Slamet Riyadi',
    },
    {
      product: {
        id: 'p2',
        restaurantId: 'mr-burger',
        name: 'Beef Burger Special Keju',
        description: '',
        price: 30000,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=160&h=160&fit=crop',
        category: 'Burger',
        isAvailable: true,
      },
      quantity: 1,
      restaurantId: 'mr-burger',
      restaurantName: 'MR Burger - Slamet Riyadi',
    },
  ];

  const subtotal = cart.items.length > 0
    ? totalPrice
    : displayItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col relative pb-28 select-none">
      {/* ── STATUS BAR ── */}
      <MobileStatusBar variant="dark" />

      {/* ── HEADER ── */}
      <div className="bg-white px-4 pt-2 pb-3 flex items-center justify-between border-b border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.02)] sticky top-0 z-40">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 bg-gray-50 rounded-xl flex items-center justify-center text-gray-700 active:scale-95"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="text-center">
          <h1 className="text-sm font-black text-[#0F172A]">Keranjang Pesanan</h1>
          <p className="text-[10px] text-gray-400 font-medium">{cart.restaurantName || 'MR Burger'}</p>
        </div>
        <button
          onClick={clearCart}
          className="w-8 h-8 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 hover:text-red-500 active:scale-95 transition-colors"
          title="Kosongkan Keranjang"
        >
          <Trash2 size={15} />
        </button>
      </div>

      {/* ── CONTENT ── */}
      <main className="flex-1 min-h-0 overflow-y-auto px-4 pt-3.5 space-y-3.5 pb-8">
        {/* Address Card (Gojek Style) */}
        <div className="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.03)] flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#193CA5] flex items-center justify-center shrink-0 mt-0.5">
            <MapPin size={16} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Alamat Antar</span>
              <span className="text-[11px] font-bold text-[#193CA5]">Ubah</span>
            </div>
            <p className="text-xs font-bold text-[#0F172A] mt-0.5 truncate">Rumah • Jl. Melati No.12, Surakarta</p>
          </div>
        </div>

        {/* Item List */}
        <div className="bg-white rounded-3xl p-4 border border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.03)] space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <span className="text-xs font-black text-[#0F172A]">Menu Yang Dipesan</span>
            <Link href="/food" className="text-[11px] font-bold text-[#193CA5]">
              + Tambah Menu
            </Link>
          </div>

          <div className="divide-y divide-gray-100">
            {displayItems.map(item => (
              <div key={item.product.id} className="py-3 first:pt-1 last:pb-1 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-13 h-13 rounded-xl overflow-hidden bg-gray-100 shrink-0 shadow-inner">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    <h3 className="text-xs font-bold text-[#0F172A] truncate">{item.product.name}</h3>
                    <p className="text-xs font-black text-[#193CA5]">{fmt(item.product.price)}</p>
                  </div>
                </div>

                {/* Stepper with Gojek-Style Rounded Pill */}
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-2 py-1 shrink-0">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="w-5 h-5 rounded-md bg-white border border-gray-200 text-gray-700 flex items-center justify-center cursor-pointer active:scale-95"
                  >
                    <Minus size={11} strokeWidth={2.5} />
                  </button>
                  <span className="text-xs font-black text-[#0F172A] min-w-3 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="w-5 h-5 rounded-md bg-[#193CA5] text-white flex items-center justify-center cursor-pointer active:scale-95 shadow-xs"
                  >
                    <Plus size={11} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Special Notes */}
          <div className="pt-2 border-t border-gray-100">
            <div className="bg-[#F8FAFC] border border-gray-200 rounded-xl px-3 py-2 flex items-center gap-2">
              <Pencil size={13} className="text-gray-400 shrink-0" />
              <input
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder="Tambah catatan untuk resto (misal: pedas sedang)"
                className="flex-1 text-[11px] outline-none bg-transparent text-gray-800 placeholder:text-gray-400 font-medium"
              />
            </div>
          </div>
        </div>

        {/* Ringkasan Pembayaran (Gojek Style) */}
        <div className="bg-white rounded-3xl p-4 border border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.03)] space-y-2.5">
          <h2 className="text-xs font-black text-[#0F172A] pb-1.5 border-b border-gray-100">
            Rincian Pembayaran
          </h2>

          <div className="space-y-2 text-xs text-gray-600">
            <div className="flex items-center justify-between">
              <span>Harga Menu</span>
              <span className="font-bold text-gray-900">{fmt(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Ongkos Kirim</span>
              <span className="font-bold text-gray-900">{fmt(DELIVERY_FEE)}</span>
            </div>
            <div className="flex items-center justify-between text-emerald-600 font-bold">
              <span>Diskon Ongkir WUS</span>
              <span>- {fmt(DELIVERY_FEE)}</span>
            </div>
          </div>

          {/* Grand Total Box */}
          <div className="bg-[#EBF3FF] border border-blue-100 rounded-2xl p-3 flex items-center justify-between mt-2">
            <div>
              <span className="text-[10px] font-black text-[#193CA5] uppercase tracking-wider block">Total Pembayaran</span>
              <span className="text-[10px] text-gray-500">Termasuk pajak resto</span>
            </div>
            <span className="text-base font-black text-[#193CA5]">{fmt(subtotal)}</span>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] text-gray-400 pt-1">
            <ShieldCheck size={13} className="text-emerald-500" />
            <span>Garansi makanan sampai dalam kondisi hangat & aman</span>
          </div>
        </div>
      </main>

      {/* ── FIXED BOTTOM CTA (Gojek Style) ── */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] px-4 py-3 bg-white border-t border-gray-200 z-50 shadow-lg">
        <Link href="/checkout">
          <button className="w-full bg-[#193CA5] hover:bg-[#15328A] active:scale-[0.98] text-white font-black py-3.5 rounded-full text-xs transition-all shadow-md shadow-[#193CA5]/25 flex items-center justify-between px-5 cursor-pointer">
            <span>Lanjut ke Pembayaran</span>
            <span className="flex items-center gap-1">
              {fmt(subtotal)} <ArrowRight size={14} />
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
}
