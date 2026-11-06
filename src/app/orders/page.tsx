import Link from 'next/link';
import { Package, ChevronRight } from 'lucide-react';
import BottomNav from '@/components/navigation/BottomNav';

const SAMPLE_ORDERS = [
  { id: 'WUS-001', restaurant: 'MR Burger', items: 'Hot Dog, Beef Burger', total: 55000, status: 'Selesai', date: '6 Nov 2026', emoji: '🍔' },
  { id: 'WUS-002', restaurant: 'BOBAMILK', items: 'Boba Milk Tea Original x2', total: 44000, status: 'Dalam Perjalanan', date: '5 Nov 2026', emoji: '🧋' },
  { id: 'WUS-003', restaurant: 'MR KEBAB', items: 'Kebab Original, Kentang', total: 37000, status: 'Selesai', date: '3 Nov 2026', emoji: '🌯' },
];

const STATUS_COLORS: Record<string, string> = {
  'Selesai': 'bg-green-100 text-green-700',
  'Dalam Perjalanan': 'bg-blue-100 text-blue-700',
  'Dibatalkan': 'bg-red-100 text-red-600',
};

function formatRupiah(n: number) { return 'Rp ' + n.toLocaleString('id-ID'); }

export default function OrdersPage() {
  return (
    <main className="min-h-screen bg-[#F5F6FA]">
      <div className="bg-[#193CA5] px-4 pt-12 pb-5 rounded-b-3xl">
        <h1 className="text-white text-lg font-bold">Pesanan Saya</h1>
      </div>

      <div className="px-4 pt-4 pb-24 space-y-3">
        {SAMPLE_ORDERS.map(order => (
          <Link key={order.id} href={`/tracking/${order.id}`}>
            <div className="bg-white rounded-2xl p-4 shadow-sm flex gap-3 items-center active:scale-[0.98] transition-transform">
              <div className="w-14 h-14 bg-[#F5F6FA] rounded-xl flex items-center justify-center text-3xl shrink-0">{order.emoji}</div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-[#171717] text-sm">{order.restaurant}</p>
                <p className="text-xs text-gray-400 mt-0.5 truncate">{order.items}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-500'}`}>{order.status}</span>
                  <span className="text-xs text-gray-400">{order.date}</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs font-black text-[#193CA5]">{formatRupiah(order.total)}</p>
                <ChevronRight size={14} className="text-gray-300 mt-1 ml-auto" />
              </div>
            </div>
          </Link>
        ))}
      </div>
      <BottomNav />
    </main>
  );
}
