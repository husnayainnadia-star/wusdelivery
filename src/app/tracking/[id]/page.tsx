'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Phone, MessageCircle, MapPin, Clock, CheckCircle } from 'lucide-react';

const STATUS_STEPS = [
  { key: 'confirmed', label: 'Pesanan\nDiterima', icon: '✅' },
  { key: 'preparing', label: 'Sedang\nDisiapkan', icon: '👨‍🍳' },
  { key: 'on_the_way', label: 'Dalam\nPerjalanan', icon: '🛵' },
  { key: 'delivered', label: 'Selesai', icon: '🏠' },
];

function formatRupiah(n: number) {
  return 'Rp ' + n.toLocaleString('id-ID');
}

export default function TrackingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [progress, setProgress] = useState(60);
  const [driverPos, setDriverPos] = useState(38);
  const [currentStatus, setCurrentStatus] = useState(2); // 0-3

  // Load order from sessionStorage (demo)
  const [order, setOrder] = useState<Record<string, unknown> | null>(null);
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(`order_${id}`);
      if (saved) setOrder(JSON.parse(saved));
    } catch {}
  }, [id]);

  // Animate tracking
  useEffect(() => {
    const t = setInterval(() => {
      setProgress(p => Math.min(p + 0.3, 100));
      setDriverPos(d => Math.max(d - 0.15, 28));
    }, 200);
    return () => clearInterval(t);
  }, []);

  const restaurantName = (order?.restaurantName as string) || 'MR Burger';
  const total = (order?.total as number) || 55000;

  return (
    <main className="min-h-screen bg-[#F5F6FA]">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 flex items-center gap-3 shadow-sm">
        <Link href="/">
          <div className="w-9 h-9 bg-[#F5F6FA] rounded-xl flex items-center justify-center">
            <ChevronLeft size={20} className="text-[#171717]" />
          </div>
        </Link>
        <h1 className="flex-1 text-lg font-black text-[#171717] text-center">Lacak Pesanan</h1>
        <div className="w-9" />
      </div>

      <div className="px-4 pt-4 pb-8 space-y-3">
        {/* Order ID */}
        <div className="bg-[#EAF1FF] rounded-xl px-4 py-2.5 flex justify-between items-center">
          <span className="text-xs text-[#193CA5] font-semibold">No. Pesanan: #{id}</span>
          <span className="text-xs text-[#193CA5] font-bold">{restaurantName}</span>
        </div>

        {/* Status Steps */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-start justify-between relative">
            {STATUS_STEPS.map((step, i) => {
              const isDone = i <= currentStatus;
              const isActive = i === currentStatus;
              return (
                <div key={step.key} className="flex flex-col items-center flex-1 relative">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-base z-10 relative
                    ${isDone ? 'bg-[#193CA5]' : isActive ? 'bg-[#EAF1FF] border-2 border-[#193CA5]' : 'bg-gray-100'}`}>
                    {isDone ? <span className="text-white text-sm">{i < currentStatus ? '✓' : step.icon}</span>
                      : <span>{step.icon}</span>}
                  </div>
                  <p className={`text-[9px] text-center mt-1.5 leading-tight whitespace-pre-line
                    ${isDone ? 'text-[#193CA5] font-bold' : 'text-gray-400'}`}>
                    {step.label}
                  </p>
                  {i < STATUS_STEPS.length - 1 && (
                    <div className={`absolute top-5 left-1/2 w-full h-0.5 ${i < currentStatus ? 'bg-[#193CA5]' : 'bg-gray-200'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Map Area */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          {/* Fake Map */}
          <div className="h-52 relative bg-[#E8F0FE] overflow-hidden">
            {/* Grid */}
            {[12.5, 25, 37.5, 50, 62.5, 75, 87.5].map(t => (
              <div key={t} className="absolute left-0 right-0 h-px bg-[#193CA5]/8" style={{ top: `${t}%` }} />
            ))}
            {[16.6, 33.2, 49.8, 66.4, 83].map(l => (
              <div key={l} className="absolute top-0 bottom-0 w-px bg-[#193CA5]/8" style={{ left: `${l}%` }} />
            ))}
            {/* Roads */}
            <div className="absolute left-1/2 top-0 bottom-0 w-2.5 bg-white -translate-x-1/2 shadow-sm" />
            <div className="absolute top-3/4 left-0 right-0 h-2.5 bg-white -translate-y-1/2 shadow-sm" />

            {/* Destination */}
            <div className="absolute left-1/2 -translate-x-1/2" style={{ top: '68%' }}>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-300">
                  <MapPin size={16} className="text-white" />
                </div>
                <div className="w-2 h-2 bg-red-500 rounded-full mt-0.5" />
              </div>
            </div>

            {/* Driver (animated) */}
            <div className="absolute left-1/2 -translate-x-1/2 transition-all duration-300" style={{ top: `${driverPos}%` }}>
              <div className="w-11 h-11 bg-white rounded-full border-2 border-[#193CA5] flex items-center justify-center text-xl shadow-lg shadow-[#193CA5]/20">
                🛵
              </div>
            </div>

            {/* Route line */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <line x1="50%" y1={`${driverPos}%`} x2="50%" y2="70%"
                stroke="#193CA5" strokeWidth="2" strokeDasharray="6 4" />
            </svg>
          </div>

          {/* ETA */}
          <div className="px-4 py-3 flex items-center gap-2 border-t border-gray-50">
            <Clock size={14} className="text-[#193CA5]" />
            <span className="text-xs text-gray-500">Estimasi tiba:</span>
            <span className="text-xs font-bold text-[#193CA5]">17.10 – 17.25</span>
          </div>
        </div>

        {/* Driver Info */}
        <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="w-14 h-14 bg-[#EAF1FF] rounded-full flex items-center justify-center text-3xl border-2 border-[#193CA5] shrink-0">
            👨
          </div>
          <div className="flex-1">
            <p className="font-black text-[#171717] text-sm">RIZKY PRIYATNO</p>
            <p className="text-xs text-gray-400">AD 5009 NH</p>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-yellow-400 text-xs">★</span>
              <span className="text-xs font-semibold text-gray-700">4.8</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 bg-[#EAF1FF] rounded-xl flex items-center justify-center">
              <Phone size={16} className="text-[#193CA5]" />
            </button>
            <button className="w-10 h-10 bg-[#EAF1FF] rounded-xl flex items-center justify-center">
              <MessageCircle size={16} className="text-[#193CA5]" />
            </button>
          </div>
        </div>

        {/* Status */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-start gap-2 mb-3">
            <span className="text-base">🛵</span>
            <p className="text-xs text-gray-600 flex-1">Kurir sedang dalam perjalanan menuju lokasi pengirimanmu!</p>
          </div>
          <div className="h-2 bg-[#EAF1FF] rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#193CA5] to-blue-400 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-sm text-[#171717] mb-2">Ringkasan Pesanan</h3>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Total Pembayaran</span>
            <span className="text-sm font-black text-[#193CA5]">{formatRupiah(total)}</span>
          </div>
        </div>

        <Link href="/">
          <button className="w-full border-2 border-[#193CA5] text-[#193CA5] py-4 rounded-2xl font-bold text-sm">
            Kembali ke Beranda
          </button>
        </Link>
      </div>
    </main>
  );
}
