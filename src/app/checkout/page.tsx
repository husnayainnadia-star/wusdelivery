'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, MapPin, Check } from 'lucide-react';
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
        paymentMethod: payment === 'cash' ? 'Cash' : 'Wuspay',
        status: 'on_the_way',
        createdAt: new Date().toISOString(),
        courierName: 'RIZKY PRIYATNO',
        courierPhone: '081234567890',
        courierVehicle: 'AD 5009 NH',
        estimatedArrival: '17.10-17.25',
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
        <h1 className="text-base font-extrabold text-[#111827]">Checkout</h1>
        <div className="w-9" />
      </div>

      {/* ── CONTENT ── */}
      <div className="flex-1 min-h-0 overflow-y-auto px-5 pt-4 space-y-4 pb-8">
        {/* 1. Alamat Pengiriman with Generous Internal Padding */}
        <div className="bg-white rounded-2xl p-4 border border-gray-150 shadow-2xs space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
            <MapPin size={13} className="text-[#193CA5]" />
            <span>Alamat Pengiriman</span>
          </div>
          <p className="text-xs font-bold text-[#111827] leading-relaxed pl-5">
            Antar ke: Jl. Melati No.12, Surakarta, Jawa Tengah
          </p>
        </div>

        {/* 2. Ringkasan Pesanan */}
        <div className="bg-white rounded-2xl p-4 border border-gray-150 shadow-2xs space-y-3">
          <h2 className="text-xs font-extrabold text-[#111827]">Ringkasan Pesanan</h2>

          <div className="space-y-3">
            {displayItems.map(item => (
              <div key={item.product.id} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 shrink-0 shadow-inner">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs font-bold text-[#111827] truncate">{item.product.name}</h3>
                    <p className="text-xs font-extrabold text-[#193CA5] mt-0.5">{fmt(item.product.price)}</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-gray-500">x{item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-gray-100 space-y-2 text-xs text-gray-600">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-gray-900">{fmt(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Biaya pengiriman</span>
              <span className="font-bold text-gray-900">{fmt(DELIVERY_FEE)}</span>
            </div>
          </div>

          {/* Total Pembayaran Banner */}
          <div className="bg-[#EAF1FF] border border-blue-100 rounded-xl px-4 py-3 flex items-center justify-between mt-2">
            <span className="text-xs font-bold text-[#193CA5]">Total Pembayaran</span>
            <span className="text-sm font-black text-[#193CA5]">{fmt(total)}</span>
          </div>
        </div>

        {/* 3. Metode Pembayaran with Clean Spacing */}
        <div className="bg-white rounded-2xl p-4 border border-gray-150 shadow-2xs space-y-3">
          <h2 className="text-xs font-extrabold text-[#111827]">Metode Pembayaran</h2>

          <div className="space-y-2.5">
            {/* Cash */}
            <label
              onClick={() => setPayment('cash')}
              className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                payment === 'cash' ? 'border-[#193CA5] bg-blue-50/50' : 'border-gray-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">💵</span>
                <span className="text-xs font-bold text-[#111827]">Cash</span>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  payment === 'cash' ? 'border-[#193CA5] bg-[#193CA5]' : 'border-gray-300'
                }`}
              >
                {payment === 'cash' && <Check size={11} className="text-white" strokeWidth={3} />}
              </div>
            </label>

            {/* WusPay */}
            <label
              onClick={() => setPayment('wuspay')}
              className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                payment === 'wuspay' ? 'border-[#193CA5] bg-blue-50/50' : 'border-gray-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">💳</span>
                <span className="text-xs font-bold text-[#111827]">Wuspay</span>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  payment === 'wuspay' ? 'border-[#193CA5] bg-[#193CA5]' : 'border-gray-300'
                }`}
              >
                {payment === 'wuspay' && <Check size={11} className="text-white" strokeWidth={3} />}
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* ── FIXED BOTTOM CTA ── */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] px-5 py-3.5 bg-white border-t border-gray-150 z-50 shadow-lg">
        <button
          onClick={handleOrder}
          disabled={loading}
          className="w-full bg-[#193CA5] hover:bg-[#15328A] active:scale-[0.98] text-white font-extrabold py-3.5 rounded-full text-xs transition-all shadow-md shadow-[#193CA5]/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
        >
          {loading ? 'Memproses Pesanan...' : 'Buat Pesanan'}
        </button>
      </div>
    </div>
  );
}
