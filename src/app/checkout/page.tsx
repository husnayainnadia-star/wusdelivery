'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, MapPin, Check, Wallet, Banknote, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import MobileStatusBar from '@/components/shared/MobileStatusBar';

const DELIVERY_FEE = 5000;

function fmt(n: number) {
  return 'Rp ' + n.toLocaleString('id-ID');
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, totalPrice, clearCart } = useCart();
  const [payment, setPayment] = useState<'wuspay' | 'cash'>('wuspay');
  const [loading, setLoading] = useState(false);

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

  const total = subtotal + DELIVERY_FEE;

  const handleOrder = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const orderId = `WUS-${Date.now().toString().slice(-6)}`;

    try {
      const orderData = {
        id: orderId,
        restaurantName: cart.restaurantName || 'MR Burger - Slamet Riyadi',
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
        <h1 className="text-sm font-black text-[#0F172A]">Konfirmasi Pesanan</h1>
        <div className="w-8" />
      </div>

      {/* ── CONTENT ── */}
      <main className="flex-1 min-h-0 overflow-y-auto px-4 pt-3.5 space-y-3.5 pb-8">
        {/* 1. Alamat Pengiriman (Gojek Style) */}
        <div className="bg-white rounded-3xl p-4 border border-gray-150 shadow-[0_1px_4px_rgba(0,0,0,0.03)] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider flex items-center gap-1">
              <MapPin size={13} className="text-[#193CA5]" /> Alamat Pengiriman
            </span>
            <span className="text-[11px] font-bold text-[#193CA5] cursor-pointer">Ubah</span>
          </div>
          <div className="pt-1">
            <h3 className="text-xs font-black text-[#0F172A]">Rumah Nadia (0812-3456-7890)</h3>
            <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
              Jl. Melati No.12, Surakarta, Jawa Tengah
            </p>
            <span className="inline-block mt-1.5 text-[10px] font-bold bg-blue-50 text-[#193CA5] px-2 py-0.5 rounded">
              Depan pos satpam pagar hitam
            </span>
          </div>
        </div>

        {/* 2. Ringkasan Pesanan */}
        <div className="bg-white rounded-3xl p-4 border border-gray-150 shadow-[0_1px_4px_rgba(0,0,0,0.03)] space-y-2.5">
          <h2 className="text-xs font-black text-[#0F172A] pb-2 border-b border-gray-100">
            Ringkasan Menu
          </h2>

          <div className="space-y-2.5">
            {displayItems.map(item => (
              <div key={item.product.id} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-xs font-black text-[#193CA5] w-5">x{item.quantity}</span>
                  <span className="text-xs font-bold text-[#0F172A] truncate">{item.product.name}</span>
                </div>
                <span className="text-xs font-bold text-gray-900 shrink-0">{fmt(item.product.price * item.quantity)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Metode Pembayaran (Gojek Style) */}
        <div className="bg-white rounded-3xl p-4 border border-gray-150 shadow-[0_1px_4px_rgba(0,0,0,0.03)] space-y-2.5">
          <h2 className="text-xs font-black text-[#0F172A] pb-2 border-b border-gray-100">
            Metode Pembayaran
          </h2>

          <div className="space-y-2">
            {/* WusPay */}
            <label
              onClick={() => setPayment('wuspay')}
              className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-all ${
                payment === 'wuspay' ? 'border-[#193CA5] bg-blue-50/50' : 'border-gray-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#193CA5] flex items-center justify-center font-bold">
                  <Wallet size={16} />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black text-[#0F172A]">WusPay</span>
                    <span className="text-[9px] font-bold bg-emerald-100 text-emerald-800 px-1.5 rounded">Saldo Cukup</span>
                  </div>
                  <span className="text-[11px] text-gray-500 font-medium">Saldo: Rp 125.000</span>
                </div>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  payment === 'wuspay' ? 'border-[#193CA5] bg-[#193CA5]' : 'border-gray-300'
                }`}
              >
                {payment === 'wuspay' && <Check size={11} className="text-white" strokeWidth={3} />}
              </div>
            </label>

            {/* Cash */}
            <label
              onClick={() => setPayment('cash')}
              className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-all ${
                payment === 'cash' ? 'border-[#193CA5] bg-blue-50/50' : 'border-gray-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Banknote size={16} />
                </div>
                <div>
                  <span className="text-xs font-black text-[#0F172A] block">Tunai (Cash on Delivery)</span>
                  <span className="text-[11px] text-gray-500 font-medium">Bayar langsung ke kurir saat pesanan sampai</span>
                </div>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  payment === 'cash' ? 'border-[#193CA5] bg-[#193CA5]' : 'border-gray-300'
                }`}
              >
                {payment === 'cash' && <Check size={11} className="text-white" strokeWidth={3} />}
              </div>
            </label>
          </div>
        </div>

        {/* 4. Rincian Biaya */}
        <div className="bg-white rounded-3xl p-4 border border-gray-150 shadow-[0_1px_4px_rgba(0,0,0,0.03)] space-y-2 text-xs text-gray-600">
          <div className="flex items-center justify-between">
            <span>Subtotal Menu</span>
            <span className="font-bold text-gray-900">{fmt(subtotal)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Ongkos Kirim Kurir</span>
            <span className="font-bold text-gray-900">{fmt(DELIVERY_FEE)}</span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-sm">
            <span className="font-black text-[#0F172A]">Total Pembayaran</span>
            <span className="font-black text-[#193CA5]">{fmt(total)}</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400 pt-1">
          <ShieldCheck size={14} className="text-emerald-500" />
          <span>Pembayaran terenkripsi & data Anda aman 100%</span>
        </div>
      </main>

      {/* ── FIXED BOTTOM CTA (Gojek Style) ── */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] px-4 py-3 bg-white border-t border-gray-150 z-50 shadow-lg">
        <button
          onClick={handleOrder}
          disabled={loading}
          className="w-full bg-[#193CA5] hover:bg-[#15328A] active:scale-[0.98] text-white font-black py-3.5 rounded-full text-xs transition-all shadow-md shadow-[#193CA5]/25 flex items-center justify-between px-5 cursor-pointer disabled:opacity-75"
        >
          <span>{loading ? 'Memproses Pesanan...' : 'Pesan Sekarang'}</span>
          <span className="text-sm font-black">{fmt(total)}</span>
        </button>
      </div>
    </div>
  );
}
