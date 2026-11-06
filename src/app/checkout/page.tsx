'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, MapPin, ChevronRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

function fmt(n: number) { return 'Rp.' + n.toLocaleString('id-ID'); }
const DELIVERY_FEE = 5000;

const PAYMENTS = [
  { id: 'cash',   label: 'Cash',   icon: '💵', desc: 'Bayar tunai saat tiba' },
  { id: 'wuspay', label: 'Wuspay', icon: '📱', desc: '⚠️ Mode demo' },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, totalPrice, clearCart } = useCart();
  const [payment, setPayment] = useState('cash');
  const [loading, setLoading] = useState(false);

  const total = totalPrice + DELIVERY_FEE;

  const handleOrder = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    const orderId = `WUS-${Date.now().toString().slice(-6)}`;
    try {
      sessionStorage.setItem(`order_${orderId}`, JSON.stringify({
        id: orderId, restaurantName: cart.restaurantName,
        items: cart.items, subtotal: totalPrice, deliveryFee: DELIVERY_FEE,
        total, paymentMethod: payment, createdAt: new Date().toISOString(),
      }));
    } catch {}
    clearCart();
    router.push(`/tracking/${orderId}`);
  };

  if (cart.items.length === 0 && typeof window !== 'undefined') {
    router.push('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f5f6fa] flex flex-col">

      {/* Header */}
      <div className="bg-white px-4 pt-11 pb-3.5 flex items-center gap-3 shadow-sm shrink-0">
        <button onClick={() => router.back()}
          className="w-9 h-9 bg-[#F5F6FA] rounded-xl flex items-center justify-center">
          <ChevronLeft size={19} className="text-[#171717]" />
        </button>
        <h1 className="flex-1 text-base font-black text-[#171717] text-center">Chekout</h1>
        <div className="w-9" />
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-3.5 pb-36 space-y-2.5">

        {/* Delivery Address */}
        <div className="bg-white rounded-2xl p-3.5 shadow-sm">
          <div className="flex items-center gap-2 mb-2.5">
            <MapPin size={13} className="text-[#193CA5]" />
            <span className="text-xs font-bold text-[#171717]">Alamat Pengiriman</span>
          </div>
          <div className="bg-[#EAF1FF] rounded-xl p-3 flex items-center gap-2.5">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shrink-0">
              <MapPin size={14} className="text-[#193CA5]" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-[#171717]">Antar ke: Jl. Melati No.12, Surakarta,</p>
              <p className="text-[10px] text-gray-500">Jawa Tengah</p>
            </div>
            <ChevronRight size={13} className="text-[#193CA5]" />
          </div>
        </div>

        {/* Order summary */}
        <div className="bg-white rounded-2xl p-3.5 shadow-sm">
          <p className="text-xs font-bold text-[#171717] mb-3">Ringkasan Pesanan</p>
          <div className="space-y-2.5">
            {cart.items.map(item => (
              <div key={item.product.id} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#FFF3E8] shrink-0">
                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover"
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#171717]">{item.product.name}</p>
                  <p className="text-xs text-[#193CA5] font-semibold">{fmt(item.product.price)}</p>
                </div>
                <span className="text-xs font-bold text-gray-500 bg-[#F5F6FA] px-2 py-1 rounded-lg">x{item.quantity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Price summary */}
        <div className="bg-white rounded-2xl p-3.5 shadow-sm">
          <div className="flex justify-between py-1.5">
            <span className="text-sm text-gray-500">Subtotal</span>
            <span className="text-sm font-semibold">{fmt(totalPrice)}</span>
          </div>
          <div className="flex justify-between py-1.5">
            <span className="text-sm text-gray-500">Biaya Pengiriman</span>
            <span className="text-sm font-semibold">{fmt(DELIVERY_FEE)}</span>
          </div>
          <div style={{ borderTop: '1px dashed #e5e7eb' }} className="my-1" />
          <div className="flex justify-between py-1.5">
            <span className="text-sm font-bold text-[#171717]">Total Pembayaran</span>
            <span className="text-base font-black text-[#193CA5]">{fmt(total)}</span>
          </div>
        </div>

        {/* Payment */}
        <div className="bg-white rounded-2xl p-3.5 shadow-sm">
          <p className="text-xs font-bold text-[#171717] mb-3">Metode Pembayaran</p>
          <div className="space-y-2">
            {PAYMENTS.map(m => (
              <button key={m.id} onClick={() => setPayment(m.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all
                  ${payment === m.id ? 'border-[#193CA5] bg-[#EAF1FF]' : 'border-gray-100 bg-white'}`}>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0
                  ${payment === m.id ? 'border-[#193CA5]' : 'border-gray-300'}`}>
                  {payment === m.id && <div className="w-2 h-2 rounded-full bg-[#193CA5]" />}
                </div>
                <span className="text-lg">{m.icon}</span>
                <div>
                  <p className="text-sm font-bold text-[#171717]">{m.label}</p>
                  <p className="text-[9px] text-gray-400">{m.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white px-4 py-3.5 pb-6 shadow-lg">
        <button onClick={handleOrder} disabled={loading}
          className="w-full bg-[#193CA5] text-white py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-[#193CA5]/25 disabled:opacity-70 flex items-center justify-center gap-2">
          {loading
            ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Memproses...</>
            : 'Buat Pesanan'}
        </button>
      </div>
    </div>
  );
}
