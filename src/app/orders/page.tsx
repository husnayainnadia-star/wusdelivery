'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, ShoppingBag, Clock } from 'lucide-react';
import BottomNav from '@/components/navigation/BottomNav';
import MobileStatusBar from '@/components/shared/MobileStatusBar';

const DEFAULT_ORDERS = [
  {
    id: 'WUS-001',
    restaurant: 'MR Burger',
    items: 'Hot Dog (x1), Beef Burger (x1)',
    total: 55000,
    status: 'Dalam Perjalanan',
    date: 'Hari ini, 14:30',
    emoji: '🍔',
  },
  {
    id: 'WUS-002',
    restaurant: 'BOBAMILK',
    items: 'Boba Milk Tea Original (x2)',
    total: 44000,
    status: 'Selesai',
    date: 'Kemarin, 19:15',
    emoji: '🧋',
  },
  {
    id: 'WUS-003',
    restaurant: 'MR KEBAB',
    items: 'Kebab Original (x1), French Fries (x1)',
    total: 37000,
    status: 'Selesai',
    date: '4 Nov 2026, 12:40',
    emoji: '🌯',
  },
];

const STATUS_CONFIG: Record<string, { bg: string; text: string }> = {
  'Selesai': { bg: 'bg-emerald-50 border border-emerald-200', text: 'text-emerald-700' },
  'Dalam Perjalanan': { bg: 'bg-blue-50 border border-blue-200', text: 'text-[#193CA5]' },
  'on_the_way': { bg: 'bg-blue-50 border border-blue-200', text: 'text-[#193CA5]' },
  'Dibatalkan': { bg: 'bg-rose-50 border border-rose-200', text: 'text-rose-600' },
};

function formatRupiah(n: number) {
  return 'Rp. ' + n.toLocaleString('id-ID');
}

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState(DEFAULT_ORDERS);

  useEffect(() => {
    let active = true;
    Promise.resolve().then(() => {
      if (!active) return;
      try {
        const stored = localStorage.getItem('wus_orders_history');
        if (stored) {
          const parsed = JSON.parse(stored);
          const mapped = parsed.map((o: {
            id: string;
            restaurantName: string;
            items: Array<{ productName: string }>;
            total: number;
            status: string;
            createdAt: string;
          }) => ({
            id: o.id,
            restaurant: o.restaurantName,
            items: o.items.map(i => i.productName).join(', '),
            total: o.total,
            status: o.status === 'on_the_way' ? 'Dalam Perjalanan' : 'Selesai',
            date: 'Baru saja',
            emoji: '🍔',
          }));
          setOrders([...mapped, ...DEFAULT_ORDERS]);
        }
      } catch {}
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col pb-24 md:pb-12 select-none">
      <MobileStatusBar />

      {/* ── MOBILE HEADER (Hidden on desktop) ── */}
      <div className="md:hidden bg-white px-5 pt-3 pb-3.5 flex items-center justify-between border-b border-gray-100 shadow-2xs">
        <button
          onClick={() => router.push('/')}
          className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center text-gray-700 active:scale-95"
        >
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-base font-extrabold text-[#111827]">Pesanan Saya</h1>
        <div className="w-9" />
      </div>

      {/* ── MAIN CONTENT (Laptop/Desktop Responsive Layout) ── */}
      <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 md:py-8 flex-1 space-y-6">
        <div className="hidden md:block">
          <h1 className="text-2xl font-black text-[#111827] flex items-center gap-2.5">
            <ShoppingBag className="text-[#193CA5]" /> Riwayat & Status Pesanan
          </h1>
          <p className="text-sm text-gray-500 mt-1">Pantau pesanan yang sedang berjalan dan lihat histori pesananmu</p>
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {orders.map(order => {
            const isOngoing = order.status === 'Dalam Perjalanan';
            const badge = STATUS_CONFIG[order.status] || STATUS_CONFIG['Selesai'];

            return (
              <div
                key={order.id}
                className="bg-white rounded-3xl p-5 md:p-6 border border-gray-150 shadow-xs hover:shadow-md transition-all space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-2xl flex items-center justify-center shadow-xs shrink-0">
                      {order.emoji}
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-[#111827]">{order.restaurant}</h3>
                      <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                        <Clock size={12} /> {order.date} • ID: {order.id}
                      </p>
                    </div>
                  </div>

                  <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${badge.bg} ${badge.text}`}>
                    {order.status}
                  </span>
                </div>

                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 space-y-1">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Menu</span>
                  <p className="text-xs sm:text-sm font-medium text-gray-800 leading-relaxed">{order.items}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div>
                    <span className="text-[11px] text-gray-400 block">Total Pembayaran</span>
                    <span className="text-base font-black text-[#193CA5]">{formatRupiah(order.total)}</span>
                  </div>

                  {isOngoing ? (
                    <Link href={`/tracking/${order.id}`}>
                      <button className="bg-[#193CA5] hover:bg-[#15328A] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-md shadow-[#193CA5]/25 flex items-center gap-1.5 cursor-pointer">
                        Lacak Pesanan <ChevronRight size={14} />
                      </button>
                    </Link>
                  ) : (
                    <Link href="/food">
                      <button className="bg-gray-50 hover:bg-gray-100 text-[#193CA5] border border-blue-200 text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl transition-all cursor-pointer">
                        Pesan Lagi
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* ── MOBILE BOTTOM NAV ── */}
      <BottomNav />
    </div>
  );
}
