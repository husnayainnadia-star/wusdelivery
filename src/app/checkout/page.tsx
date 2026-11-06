'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, MapPin, ChevronRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

function formatRupiah(n: number) {
  return 'Rp ' + n.toLocaleString('id-ID');
}

const DELIVERY_FEE = 5000;

const PAYMENT_METHODS = [
  { id: 'cash', label: 'Cash', icon: '💵', desc: 'Bayar tunai saat kurir tiba' },
  { id: 'wuspay', label: 'WusPay', icon: '📱', desc: '⚠️ Demo — belum terhubung ke payment gateway' },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, totalPrice, clearCart } = useCart();
  const [payment, setPayment] = useState('cash');
  const [isLoading, setIsLoading] = useState(false);
  const total = totalPrice + DELIVERY_FEE;

  const handleOrder = async () => {
    setIsLoading(true);
    // Simulate order placement
    await new Promise(r => setTimeout(r, 1500));
    const orderId = `WUS-${Date.now().toString().slice(-6)}`;
    // Save demo order to sessionStorage
    const order = {
      id: orderId,
      restaurantName: cart.restaurantName,
      items: cart.items,
      subtotal: totalPrice,
      deliveryFee: DELIVERY_FEE,
      total,
      paymentMethod: payment,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };
    try { sessionStorage.setItem(`order_${orderId}`, JSON.stringify(order)); } catch {}
    clearCart();
    router.push(`/tracking/${orderId}`);
  };

  if (cart.items.length === 0 && typeof window !== 'undefined') {
    router.push('/cart');
    return null;
  }

  return (
    <main className="min-h-screen bg-[#F5F6FA]">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 flex items-center gap-3 shadow-sm">
        <button onClick={() => router.back()} className="w-9 h-9 bg-[#F5F6FA] rounded-xl flex items-center justify-center">
          <ChevronLeft size={20} className="text-[#171717]" />
        </button>
        <h1 className="flex-1 text-lg font-black text-[#171717] text-center">Checkout</h1>
        <div className="w-9" />
      </div>

      <div className="px-4 pt-4 pb-36 space-y-3">
        {/* Delivery Address */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={15} className="text-[#193CA5]" />
            <h3 className="font-bold text-sm text-[#171717]">Alamat Pengiriman</h3>
          </div>
          <div className="bg-[#EAF1FF] rounded-xl p-3 flex items-center gap-3">
            <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shrink-0">
              <MapPin size={16} className="text-[#193CA5]" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-[#171717]">Jl. Melati No.12, Surakarta,</p>
              <p className="text-xs text-gray-500">Jawa Tengah</p>
            </div>
            <ChevronRight size={14} className="text-[#193CA5]" />
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-sm text-[#171717] mb-3">Ringkasan Pesanan</h3>
          <div className="space-y-3">
            {cart.items.map(item => (
              <div key={item.product.id} className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#FFF3E8] rounded-xl flex items-center justify-center text-2xl shrink-0">
                  {item.product.image}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#171717]">{item.product.name}</p>
                  <p className="text-xs text-[#193CA5] font-semibold">{formatRupiah(item.product.price)}</p>
                </div>
                <span className="text-xs font-bold text-gray-500 bg-[#F5F6FA] px-2 py-1 rounded-lg">x{item.quantity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Price */}
        <div className="bg-white rounded-2xl p-4 shadow-sm space-y-2.5">
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Subtotal</span>
            <span className="text-sm font-semibold">{formatRupiah(totalPrice)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Biaya Pengiriman</span>
            <span className="text-sm font-semibold">{formatRupiah(DELIVERY_FEE)}</span>
          </div>
          <div className="border-t border-dashed border-gray-200 pt-2.5 flex justify-between">
            <span className="text-sm font-bold text-[#171717]">Total Pembayaran</span>
            <span className="text-base font-black text-[#193CA5]">{formatRupiah(total)}</span>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-sm text-[#171717] mb-3">Metode Pembayaran</h3>
          <div className="space-y-2">
            {PAYMENT_METHODS.map(m => (
              <button key={m.id} onClick={() => setPayment(m.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left ${payment === m.id ? 'border-[#193CA5] bg-[#EAF1FF]' : 'border-gray-100 bg-white'}`}>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${payment === m.id ? 'border-[#193CA5]' : 'border-gray-300'}`}>
                  {payment === m.id && <div className="w-2.5 h-2.5 rounded-full bg-[#193CA5]" />}
                </div>
                <span className="text-xl">{m.icon}</span>
                <div>
                  <p className="text-sm font-bold text-[#171717]">{m.label}</p>
                  <p className="text-[10px] text-gray-400">{m.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white px-4 py-4 pb-6 shadow-lg" style={{ maxWidth: 430, margin: '0 auto' }}>
        <div className="flex justify-between mb-3">
          <span className="text-sm text-gray-500">Total</span>
          <span className="text-lg font-black text-[#193CA5]">{formatRupiah(total)}</span>
        </div>
        <button onClick={handleOrder} disabled={isLoading}
          className="w-full bg-[#193CA5] text-white py-4 rounded-2xl font-bold text-sm shadow-lg shadow-[#193CA5]/30 disabled:opacity-70 flex items-center justify-center gap-2">
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Memproses Pesanan...
            </>
          ) : 'Buat Pesanan'}
        </button>
      </div>
    </main>
  );
}
