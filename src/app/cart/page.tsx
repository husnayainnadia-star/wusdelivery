'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Trash2, Plus, Minus, Pencil, ShoppingBag, ArrowRight } from 'lucide-react';
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

  // Default demo items if cart is empty
  const displayItems = cart.items.length > 0 ? cart.items : [
    {
      product: {
        id: 'p1',
        restaurantId: 'mr-burger',
        name: 'Hot Dog',
        description: 'Sosis sapi bakar dengan saus mustard & mayo',
        price: 20000,
        image: 'https://images.unsplash.com/photo-1619740455993-9d492ce96ab7?w=200&h=200&fit=crop',
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
        description: 'Daging sapi premium dengan keju cheddar',
        price: 30000,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop',
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
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col pb-28 lg:pb-12 select-none">
      <MobileStatusBar />

      {/* ── MOBILE HEADER (Hidden on desktop) ── */}
      <div className="lg:hidden bg-white px-5 pt-3 pb-3.5 flex items-center justify-between border-b border-gray-100 shadow-2xs">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center text-gray-700 active:scale-95"
        >
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-base font-extrabold text-[#111827]">Keranjang Belanja</h1>
        <button
          onClick={clearCart}
          className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center text-red-500 hover:bg-red-50 active:scale-95 transition-colors"
          title="Kosongkan Keranjang"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* ── MAIN CONTENT (Laptop/Desktop 2-Column Responsive Layout) ── */}
      <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 md:py-8 flex-1">
        <div className="hidden lg:flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black text-[#111827] flex items-center gap-2.5">
              <ShoppingBag className="text-[#193CA5]" /> Keranjang Belanja Anda
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Restoran: <strong className="text-gray-800">{cart.restaurantName || 'MR Burger'}</strong>
            </p>
          </div>
          <button
            onClick={clearCart}
            className="flex items-center gap-1.5 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 px-4 py-2 rounded-xl transition-colors cursor-pointer"
          >
            <Trash2 size={14} /> Kosongkan Keranjang
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* ── LEFT COLUMN: ITEMS & NOTES (7 cols) ── */}
          <div className="lg:col-span-7 space-y-4">
            {/* Items List Card */}
            <div className="bg-white rounded-3xl p-5 md:p-6 border border-gray-150 shadow-xs space-y-4">
              <h2 className="text-sm font-extrabold text-[#111827] pb-2 border-b border-gray-100 flex items-center justify-between">
                <span>Daftar Menu Pesanan</span>
                <span className="text-xs font-semibold text-gray-400">
                  {displayItems.length} Item
                </span>
              </h2>

              <div className="divide-y divide-gray-100">
                {displayItems.map(item => (
                  <div key={item.product.id} className="py-4 first:pt-1 last:pb-1 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 shrink-0 shadow-inner">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-bold text-[#111827] truncate">{item.product.name}</h3>
                        <p className="text-xs font-extrabold text-[#193CA5] mt-1">{fmt(item.product.price)}</p>
                      </div>
                    </div>

                    {/* Stepper with Generous Padding */}
                    <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 shrink-0">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-lg bg-white border border-gray-200 hover:bg-gray-100 text-gray-700 flex items-center justify-center cursor-pointer active:scale-95 transition-all"
                      >
                        <Minus size={13} strokeWidth={2.5} />
                      </button>
                      <span className="text-sm font-bold text-gray-900 w-5 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-lg bg-[#193CA5] hover:bg-[#15328A] text-white flex items-center justify-center cursor-pointer active:scale-95 transition-all shadow-xs"
                      >
                        <Plus size={13} strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Restaurant Note Box */}
            <div className="bg-white rounded-3xl p-5 md:p-6 border border-gray-150 shadow-xs space-y-2">
              <label className="text-xs font-extrabold text-[#111827] flex items-center gap-1.5 uppercase tracking-wider">
                <Pencil size={13} className="text-[#193CA5]" /> Catatan Khusus untuk Restoran
              </label>
              <div className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 flex items-center gap-2.5 focus-within:bg-white focus-within:border-[#193CA5] transition-all">
                <input
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  placeholder="Contoh: Jangan terlalu pedas, kuah dipisah ya..."
                  className="flex-1 text-xs sm:text-sm outline-none bg-transparent text-gray-800 placeholder:text-gray-400 font-medium"
                />
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN: ORDER SUMMARY & CHECKOUT (5 cols) ── */}
          <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-28">
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-150 shadow-xs space-y-5">
              <h2 className="text-base font-extrabold text-[#111827] pb-3 border-b border-gray-100">
                Ringkasan Pembayaran
              </h2>

              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center justify-between">
                  <span>Subtotal Pesanan</span>
                  <span className="font-bold text-gray-900">{fmt(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Biaya Pengiriman</span>
                  <span className="font-bold text-gray-900">{fmt(DELIVERY_FEE)}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-emerald-600 font-medium pt-1">
                  <span>Voucher Diskon Ongkir</span>
                  <span>- {fmt(DELIVERY_FEE)} (Promo)</span>
                </div>
              </div>

              {/* Total Banner */}
              <div className="bg-[#EAF1FF] border border-blue-100 rounded-2xl p-4 flex items-center justify-between mt-2">
                <div>
                  <span className="text-xs font-bold text-[#193CA5] block">Total Pembayaran</span>
                  <span className="text-[11px] text-gray-500">Termasuk pajak & biaya layanan</span>
                </div>
                <span className="text-lg md:text-xl font-black text-[#193CA5]">
                  {fmt(grandTotal)}
                </span>
              </div>

              {/* Desktop Checkout Button */}
              <div className="pt-2">
                <Link href="/checkout" className="block w-full">
                  <button className="w-full bg-[#193CA5] hover:bg-[#15328A] active:scale-[0.98] text-white font-extrabold py-4 px-6 rounded-2xl text-sm md:text-base transition-all shadow-md shadow-[#193CA5]/25 flex items-center justify-center gap-2 cursor-pointer">
                    Lanjut ke Checkout <ArrowRight size={18} />
                  </button>
                </Link>
                <div className="text-center mt-3">
                  <Link href="/food" className="text-xs font-semibold text-gray-400 hover:text-gray-700">
                    + Tambah Menu Lainnya
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ── MOBILE FIXED BOTTOM CTA (Hidden on desktop) ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 w-full px-5 py-3.5 bg-white border-t border-gray-150 z-50 shadow-lg">
        <div className="max-w-md mx-auto flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] text-gray-400 font-bold uppercase block">Total Bayar</span>
            <span className="text-base font-black text-[#193CA5]">{fmt(grandTotal)}</span>
          </div>
          <Link href="/checkout" className="flex-1">
            <button className="w-full bg-[#193CA5] hover:bg-[#15328A] active:scale-[0.98] text-white font-bold py-3.5 rounded-2xl text-sm transition-all shadow-md shadow-[#193CA5]/25">
              Lanjut ke Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
