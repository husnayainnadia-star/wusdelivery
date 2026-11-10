'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import BottomNav from '@/components/navigation/BottomNav';
import MobileStatusBar from '@/components/shared/MobileStatusBar';

const DEFAULT_ORDERS = [
  {
    id: 'WUS-001',
    restaurant: 'MR Burger',
    items: 'Hot Dog, Beef Burger',
    total: 55000,
    status: 'Dalam Perjalanan',
    date: 'Hari ini, 14:30',
    emoji: '🍔',
  },
  {
    id: 'WUS-002',
    restaurant: 'BOBAMILK',
    items: 'Boba Milk Tea Original x2',
    total: 44000,
    status: 'Selesai',
    date: 'Kemarin, 19:15',
    emoji: '🧋',
  },
  {
    id: 'WUS-003',
    restaurant: 'MR KEBAB',
    items: 'Kebab Original, Kentang',
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
      <MobileStatusBar variant="dark" className="page-px px-5" />

      {/* ── HEADER ── */}
      <div className="bg-white page-px px-5 pt-2 pb-3.5 flex items-center justify-between border-b border-gray-100">
        <button
          onClick={() => router.push('/')}
          className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center text-gray-700 active:scale-95"
        >
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-base font-extrabold text-[#171717]">Pesanan Saya</h1>
        <div className="w-9" />
      </div>

      {/* ── CONTENT ── */}
      <div className="flex-1 min-h-0 overflow-y-auto page-px px-5 pt-4 space-y-3.5 pb-8">
        {orders.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-blue-50 text-[#193CA5] flex items-center justify-center mx-auto mb-3">
              <ShoppingBag size={28} />
            </div>
            <p className="text-sm font-bold text-gray-700">Belum ada pesanan</p>
            <p className="text-xs text-gray-400 mt-1">Pesanan yang kamu buat akan muncul di sini</p>
            <Link href="/food">
              <button className="mt-4 bg-[#193CA5] text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-sm">
                Mulai Pesan Sekarang
              </button>
            </Link>
          </div>
        ) : (
          orders.map(order => {
            const statusConfig = STATUS_CONFIG[order.status] || STATUS_CONFIG['Selesai'];

            return (
              <Link key={order.id} href={`/tracking/${order.id}`}>
                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center gap-4 hover:border-blue-100 active:scale-[0.99] transition-all">
                  <div className="w-14 h-14 bg-[#EAF1FF] rounded-xl flex items-center justify-center text-3xl shrink-0">
                    {order.emoji}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h2 className="font-bold text-[#171717] text-sm truncate">{order.restaurant}</h2>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5 truncate">{order.items}</p>

                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className={`text-[9.5px] font-bold px-2.5 py-1 rounded-full ${statusConfig.bg} ${statusConfig.text}`}
                      >
                        {order.status}
                      </span>
                      <span className="text-[10px] text-gray-400">{order.date}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-xs font-black text-[#193CA5]">{formatRupiah(order.total)}</p>
                    <ChevronRight size={15} className="text-gray-300 mt-2 ml-auto" />
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>

      {/* ── BOTTOM NAV ── */}
      <BottomNav />
    </div>
  );
}
