'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, MapPin, ChevronRight, Check } from 'lucide-react';
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

  const total = subtotal + DELIVERY_FEE;

  const handleOrder = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
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
        deliveryAddress: 'Jl. Melati No.12, Surakarta, Jawa Tengah',
        courierName: 'Rizky Priyatno',
        courierPhone: '081234567890',
        courierVehicle: 'AD 5009 NH',
        estimatedArrival: '17.10 - 17.25',
        status: 'on_the_way',
        createdAt: new Date().toISOString(),
      };

      sessionStorage.setItem(`order_${orderId}`, JSON.stringify(orderData));

      // Also persist to orders history
      const existingHistory = JSON.parse(localStorage.getItem('wus_orders_history') || '[]');
      localStorage.setItem('wus_orders_history', JSON.stringify([orderData, ...existingHistory]));
    } catch {}

    clearCart();
    router.push(`/tracking/${orderId}`);
  };

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
        <h1 className="text-base font-extrabold text-[#171717]">Chekout</h1>
        <div className="w-9" />
      </div>

      {/* ── CONTENT ── */}
      <div className="flex-1 min-h-0 overflow-y-auto page-px px-5 pt-4 space-y-4 pb-8">
        {/* Alamat Pengiriman Card with Generous Padding */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-[#193CA5]" />
            <span className="text-xs font-bold text-[#171717]">Alamat Pengiriman</span>
          </div>

          <div className="bg-[#EAF1FF] rounded-xl p-4 flex items-center justify-between gap-3">
            <div className="text-xs text-[#171717] leading-relaxed">
              <span className="font-bold text-[#193CA5]">Antar ke: </span>
              Jl. Melati No.12, Surakarta, Jawa Tengah
            </div>
            <ChevronRight size={15} className="text-[#193CA5] shrink-0" />
          </div>
        </div>

        {/* Ringkasan Pesanan Card with Generous Padding */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs space-y-3.5">
          <h2 className="text-xs font-bold text-[#171717]">Ringkasan Pesanan</h2>

          <div className="space-y-3.5">
            {displayItems.map(item => (
              <div key={item.product.id} className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 shrink-0 flex items-center justify-center text-xl">
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
                  <h3 className="text-xs font-bold text-[#171717]">{item.product.name}</h3>
                  <p className="text-xs font-bold text-[#193CA5] mt-0.5">
                    {fmt(item.product.price)}
                  </p>
                </div>

                <span className="text-xs font-bold text-gray-500">
                  x{item.quantity}
                </span>
              </div>
            ))}
          </div>

          {/* Breakdown List with Spacious Padding */}
          <div className="pt-3 border-t border-gray-100 space-y-2.5">
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>Subtotal</span>
              <span className="font-semibold text-gray-900">{fmt(subtotal)}</span>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>Biaya pengiriman</span>
              <span className="font-semibold text-gray-900">{fmt(DELIVERY_FEE)}</span>
            </div>

            {/* Total Pembayaran Banner */}
            <div className="bg-[#EAF1FF] rounded-xl px-4 py-3 flex items-center justify-between mt-2 shadow-2xs">
              <span className="text-xs font-bold text-[#193CA5]">Total Pembayaran</span>
              <span className="text-sm font-black text-[#193CA5]">{fmt(total)}</span>
            </div>
          </div>
        </div>

        {/* Metode Pembayaran Card with Generous Padding */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs space-y-3">
          <h2 className="text-xs font-bold text-[#171717]">Metode Pembayaran</h2>

          <div className="space-y-3">
            {/* Cash */}
            <label
              onClick={() => setPayment('cash')}
              className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                payment === 'cash' ? 'border-[#193CA5] bg-[#F8FAFF]' : 'border-gray-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">💵</span>
                <span className="text-xs font-bold text-[#171717]">Cash</span>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  payment === 'cash' ? 'border-[#193CA5] bg-[#193CA5]' : 'border-gray-300'
                }`}
              >
                {payment === 'cash' && <Check size={11} className="text-white" strokeWidth={3} />}
              </div>
            </label>

            {/* Wuspay */}
            <label
              onClick={() => setPayment('wuspay')}
              className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                payment === 'wuspay' ? 'border-[#193CA5] bg-[#F8FAFF]' : 'border-gray-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">📱</span>
                <div>
                  <span className="text-xs font-bold text-[#171717]">Wuspay</span>
                  <span className="ml-2 text-[10px] text-gray-400 font-normal">Saldo Rp 150.000</span>
                </div>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  payment === 'wuspay' ? 'border-[#193CA5] bg-[#193CA5]' : 'border-gray-300'
                }`}
              >
                {payment === 'wuspay' && <Check size={11} className="text-white" strokeWidth={3} />}
              </div>
            </label>
          </div>
        </div>

        <div className="h-4" />
      </div>

      {/* ── BOTTOM CTA ── */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] page-px px-5 py-4 bg-white border-t border-gray-100 z-50">
        <button
          onClick={handleOrder}
          disabled={loading}
          className="w-full bg-[#193CA5] hover:bg-[#15328A] active:scale-[0.98] text-white font-bold py-3.5 rounded-full text-sm transition-all shadow-md shadow-[#193CA5]/25 flex items-center justify-center gap-2 disabled:opacity-75"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Memproses Pesanan...
            </>
          ) : (
            'Buat Pesanan'
          )}
        </button>
      </div>
    </div>
  );
}
