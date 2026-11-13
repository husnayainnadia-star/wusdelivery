'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, MapPin, Check, CreditCard, Banknote, ShieldCheck, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import MobileStatusBar from '@/components/shared/MobileStatusBar';

const DELIVERY_FEE = 5000;

function fmt(n: number) {
  return 'Rp. ' + n.toLocaleString('id-ID');
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, totalPrice, clearCart } = useCart();
  const [payment, setPayment] = useState<'cash' | 'wuspay'>('cash');
  const [loading, setLoading] = useState(false);

  // Fallback demo items if cart is empty
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
      restaurantName: 'MR Burger',
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
      restaurantName: 'MR Burger',
    },
  ];

  const subtotal = cart.items.length > 0
    ? totalPrice
    : displayItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const total = subtotal + DELIVERY_FEE;

  const handleOrder = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const orderId = `WUS-${Date.now().toString().slice(-6)}`;

    try {
      const orderData = {
        id: orderId,
        restaurantName: cart.restaurantName || 'MR Burger',
        items: displayItems.map(i => ({
          productId: i.product.id,
          productName: i.product.name,
          price: i.product.price,
          quantity: i.quantity,
          image: i.product.image,
        })),
        subtotal,
        deliveryFee: DELIVERY_FEE,
        total,
        paymentMethod: payment === 'cash' ? 'Cash (Tunai)' : 'WusPay',
        status: 'on_the_way',
        createdAt: new Date().toISOString(),
        courierName: 'RIZKY PRIYATNO',
        courierPhone: '081234567890',
        courierVehicle: 'AD 5009 NH',
        estimatedArrival: '17.10 - 17.25',
      };

      sessionStorage.setItem(`order_${orderId}`, JSON.stringify(orderData));
      clearCart();
      router.push(`/tracking/${orderId}`);
    } catch {
      router.push('/');
    } finally {
      setLoading(false);
    }
  };

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
        <h1 className="text-base font-extrabold text-[#111827]">Checkout Pesanan</h1>
        <div className="w-9" />
      </div>

      {/* ── MAIN CONTENT (Laptop/Desktop 2-Column Responsive Layout) ── */}
      <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 md:py-8 flex-1">
        <div className="hidden lg:block mb-6">
          <h1 className="text-2xl font-black text-[#111827]">Konfirmasi & Pembayaran</h1>
          <p className="text-sm text-gray-500 mt-1">Periksa kembali detail pesanan Anda sebelum checkout</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* ── LEFT COLUMN: ADDRESS, ITEMS, PAYMENT (7 cols) ── */}
          <div className="lg:col-span-7 space-y-5">
            {/* 1. Alamat Pengiriman */}
            <div className="bg-white rounded-3xl p-5 md:p-6 border border-gray-150 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin size={14} className="text-[#193CA5]" /> Alamat Pengiriman
                </span>
                <button className="text-xs font-bold text-[#193CA5] hover:underline">
                  Ubah Alamat
                </button>
              </div>

              <div className="bg-gray-50 border border-gray-200/80 rounded-2xl p-4 flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-[#193CA5] flex items-center justify-center shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-[#111827]">Rumah (Utama)</h3>
                  <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                    Antar ke: Jl. Melati No.12, Surakarta, Jawa Tengah
                  </p>
                  <span className="inline-block mt-2 text-[10px] font-bold bg-blue-50 text-[#193CA5] px-2.5 py-1 rounded-md border border-blue-100">
                    Catatan: Pagar hitam depan pos satpam
                  </span>
                </div>
              </div>
            </div>

            {/* 2. Ringkasan Pesanan */}
            <div className="bg-white rounded-3xl p-5 md:p-6 border border-gray-150 shadow-xs space-y-3">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider pb-2 border-b border-gray-100">
                Menu Yang Dipesan
              </h2>

              <div className="divide-y divide-gray-100">
                {displayItems.map(item => (
                  <div key={item.product.id} className="py-3 first:pt-1 last:pb-1 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 shrink-0 shadow-inner">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-[#111827] truncate">{item.product.name}</h4>
                        <p className="text-xs font-extrabold text-[#193CA5] mt-0.5">{fmt(item.product.price)}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-gray-700 bg-gray-100 px-3 py-1 rounded-lg">
                      x{item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Metode Pembayaran */}
            <div className="bg-white rounded-3xl p-5 md:p-6 border border-gray-150 shadow-xs space-y-3">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider pb-2 border-b border-gray-100 flex items-center gap-1.5">
                <CreditCard size={14} className="text-[#193CA5]" /> Pilih Metode Pembayaran
              </h2>

              <div className="space-y-3">
                {/* Cash */}
                <label
                  onClick={() => setPayment('cash')}
                  className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    payment === 'cash'
                      ? 'border-[#193CA5] bg-blue-50/50 shadow-xs'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                      <Banknote size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#111827]">Cash (Tunai)</h4>
                      <p className="text-xs text-gray-500">Bayar saat makanan tiba di tempat</p>
                    </div>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      payment === 'cash' ? 'border-[#193CA5] bg-[#193CA5]' : 'border-gray-300'
                    }`}
                  >
                    {payment === 'cash' && <Check size={13} className="text-white" strokeWidth={3} />}
                  </div>
                </label>

                {/* WusPay */}
                <label
                  onClick={() => setPayment('wuspay')}
                  className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    payment === 'wuspay'
                      ? 'border-[#193CA5] bg-blue-50/50 shadow-xs'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#193CA5] flex items-center justify-center border border-blue-100 font-black text-sm">
                      W
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-[#111827]">WusPay Digital</h4>
                        <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                          Diskon 10%
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">Saldo: Rp 250.000</p>
                    </div>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      payment === 'wuspay' ? 'border-[#193CA5] bg-[#193CA5]' : 'border-gray-300'
                    }`}
                  >
                    {payment === 'wuspay' && <Check size={13} className="text-white" strokeWidth={3} />}
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN: SUMMARY & CONFIRM BUTTON (5 cols) ── */}
          <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-28">
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-150 shadow-xs space-y-5">
              <h2 className="text-base font-extrabold text-[#111827] pb-3 border-b border-gray-100">
                Rincian Biaya
              </h2>

              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center justify-between">
                  <span>Subtotal Pesanan</span>
                  <span className="font-bold text-gray-900">{fmt(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Biaya Pengantaran</span>
                  <span className="font-bold text-gray-900">{fmt(DELIVERY_FEE)}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-emerald-600 font-medium">
                  <span>Metode Pembayaran</span>
                  <span className="font-bold uppercase">{payment}</span>
                </div>
              </div>

              {/* Grand Total */}
              <div className="bg-[#EAF1FF] border border-blue-100 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#193CA5] block">Total Pembayaran</span>
                  <span className="text-[11px] text-gray-500">Bebas biaya admin</span>
                </div>
                <span className="text-xl font-black text-[#193CA5]">
                  {fmt(total)}
                </span>
              </div>

              {/* Guarantee badge */}
              <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 p-3 rounded-xl border border-gray-200/70">
                <ShieldCheck size={18} className="text-emerald-600 shrink-0" />
                <span>Pesanan dijamin sampai tepat waktu & higienis.</span>
              </div>

              {/* Desktop Place Order Button */}
              <button
                onClick={handleOrder}
                disabled={loading}
                className="w-full bg-[#193CA5] hover:bg-[#15328A] active:scale-[0.98] text-white font-extrabold py-4 px-6 rounded-2xl text-sm md:text-base transition-all shadow-md shadow-[#193CA5]/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Memproses Pesanan...
                  </>
                ) : (
                  <>
                    Buat Pesanan Sekarang <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* ── MOBILE FIXED BOTTOM CTA (Hidden on desktop) ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 w-full px-5 py-3.5 bg-white border-t border-gray-150 z-50 shadow-lg">
        <div className="max-w-md mx-auto flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] text-gray-400 font-bold uppercase block">Total Bayar</span>
            <span className="text-base font-black text-[#193CA5]">{fmt(total)}</span>
          </div>
          <button
            onClick={handleOrder}
            disabled={loading}
            className="flex-1 bg-[#193CA5] hover:bg-[#15328A] active:scale-[0.98] text-white font-bold py-3.5 rounded-2xl text-sm transition-all shadow-md shadow-[#193CA5]/25 flex items-center justify-center gap-2"
          >
            {loading ? 'Memproses...' : 'Buat Pesanan'}
          </button>
        </div>
      </div>
    </div>
  );
}
