'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
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
    date: '4 Nov 2026',
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
    <div className="min-h-screen bg-[#F5F6FA] flex flex-col relative pb-24 select-none">
      {/* ── STATUS BAR ── */}
      <MobileStatusBar variant="dark" />

      {/* ── HEADER ── */}
      <div className="bg-white px-5 pt-2 pb-3.5 flex items-center justify-between border-b border-gray-100 shadow-2xs">
        <button
          onClick={() => router.push('/')}
          className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center text-gray-700 active:scale-95"
        >
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-base font-extrabold text-[#111827]">Pesanan Saya</h1>
        <div className="w-9" />
      </div>

      {/* ── CONTENT ── */}
      <div className="flex-1 min-h-0 overflow-y-auto px-5 pt-4 space-y-3.5 pb-8">
        {orders.map(order => {
          const isOngoing = order.status === 'Dalam Perjalanan';
          const badge = STATUS_CONFIG[order.status] || STATUS_CONFIG['Selesai'];

          return (
            <div
              key={order.id}
              className="bg-white rounded-2xl p-4 border border-gray-150 shadow-2xs space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-xl flex items-center justify-center shadow-2xs shrink-0">
                    {order.emoji}
                  </div>
                  <div>
                    <h3 className="text-xs font-extrabold text-[#111827]">{order.restaurant}</h3>
                    <p className="text-[10px] text-gray-400 flex items-center gap-1 mt-0.5">
                      <Clock size={11} /> {order.date}
                    </p>
                  </div>
                </div>

                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${badge.bg} ${badge.text}`}>
                  {order.status}
                </span>
              </div>

              <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                <p className="text-xs text-gray-700 leading-relaxed font-medium">{order.items}</p>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-gray-100">
                <div>
                  <span className="text-[10px] text-gray-400 block">Total</span>
                  <span className="text-xs font-black text-[#193CA5]">{formatRupiah(order.total)}</span>
                </div>

                {isOngoing ? (
                  <Link href={`/tracking/${order.id}`}>
                    <button className="bg-[#193CA5] hover:bg-[#15328A] text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1 cursor-pointer">
                      Lacak <ChevronRight size={13} />
                    </button>
                  </Link>
                ) : (
                  <Link href="/food">
                    <button className="bg-gray-50 hover:bg-gray-100 text-[#193CA5] border border-blue-200 text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all cursor-pointer">
                      Pesan Lagi
                    </button>
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── BOTTOM NAV ── */}
      <BottomNav />
    </div>
  );
}
