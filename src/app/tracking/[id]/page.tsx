'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Phone, MessageCircle, Clock, Check, Bike, Home, Store, ArrowLeft } from 'lucide-react';
import MobileStatusBar from '@/components/shared/MobileStatusBar';

const STEPS = [
  { label: 'Pesanan Diterima', state: 'done' },
  { label: 'Sedang Disiapkan', state: 'done' },
  { label: 'Dalam Perjalanan', state: 'active' },
  { label: 'Terkirim', state: 'pending' },
];

interface OrderData {
  id: string;
  restaurantName?: string;
  total?: number;
  courierName?: string;
  courierPhone?: string;
  courierVehicle?: string;
  estimatedArrival?: string;
}

export default function TrackingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [courierProgress, setCourierProgress] = useState(55);

  useEffect(() => {
    let active = true;
    Promise.resolve().then(() => {
      if (!active) return;
      try {
        const s = sessionStorage.getItem(`order_${id}`);
        if (s) {
          setOrder(JSON.parse(s));
        }
      } catch {}
    });
    return () => {
      active = false;
    };
  }, [id]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCourierProgress(prev => (prev >= 80 ? 45 : prev + 0.5));
    }, 400);
    return () => clearInterval(timer);
  }, []);

  const courierName = order?.courierName || 'RIZKY PRIYATNO';
  const courierVehicle = order?.courierVehicle || 'AD 5009 NH';
  const eta = order?.estimatedArrival || '17.10 - 17.25';

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
        <h1 className="text-base font-extrabold text-[#111827]">Lacak Pesanan</h1>
        <div className="w-9" />
      </div>

      {/* ── MAIN CONTENT (Laptop/Desktop 2-Column Responsive Layout) ── */}
      <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 md:py-8 flex-1">
        <div className="hidden md:flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black text-[#111827]">Pelacakan Pesanan Real-time</h1>
            <p className="text-sm text-gray-500 mt-1">
              ID Pesanan: <strong className="text-[#193CA5]">{id}</strong> • Kurir sedang mengantar ke lokasimu
            </p>
          </div>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-bold text-gray-600 bg-white border border-gray-200 px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft size={14} /> Beranda
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* ── LEFT COLUMN: STATUS & COURIER (5 cols) ── */}
          <div className="lg:col-span-5 space-y-5">
            {/* 4-Step Progress Card with Generous Padding */}
            <div className="bg-white rounded-3xl p-6 border border-gray-150 shadow-xs space-y-4">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider pb-2 border-b border-gray-100">
                Status Pengiriman
              </h2>

              <div className="flex items-center justify-between relative px-2 pt-2">
                {/* Connecting track lines */}
                <div className="absolute top-6 left-6 right-6 h-1 bg-gray-100 -z-0" />
                <div className="absolute top-6 left-6 w-[60%] h-1 bg-[#193CA5] -z-0 transition-all duration-500" />

                {STEPS.map((s, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center relative z-10">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                        s.state === 'done'
                          ? 'bg-[#193CA5] text-white shadow-xs'
                          : s.state === 'active'
                          ? 'bg-[#193CA5] text-white ring-4 ring-blue-100 scale-110 shadow-sm'
                          : 'bg-white border-2 border-gray-300 text-gray-400'
                      }`}
                    >
                      {s.state === 'done' && <Check size={16} strokeWidth={3} />}
                      {s.state === 'active' && <Bike size={16} />}
                      {s.state === 'pending' && <span className="w-2 h-2 rounded-full bg-gray-300" />}
                    </div>
                    <span
                      className={`text-[11px] mt-2 font-bold max-w-[70px] leading-tight ${
                        s.state === 'active'
                          ? 'text-[#193CA5]'
                          : s.state === 'done'
                          ? 'text-gray-900'
                          : 'text-gray-400'
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Courier Info Card */}
            <div className="bg-white rounded-3xl p-6 border border-gray-150 shadow-xs space-y-4">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider pb-2 border-b border-gray-100">
                Informasi Kurir Pengantar
              </h2>

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-2xl bg-amber-100 border border-amber-200 text-2xl flex items-center justify-center shadow-xs shrink-0">
                    🛵
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-[#111827]">{courierName}</h3>
                    <p className="text-xs font-bold text-gray-500 mt-0.5">{courierVehicle}</p>
                    <span className="inline-block mt-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                      Kurir Terverifikasi ★ 4.9
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="tel:081234567890"
                    className="w-10 h-10 rounded-xl bg-gray-50 hover:bg-emerald-50 hover:text-emerald-600 border border-gray-200 flex items-center justify-center text-gray-700 transition-colors shadow-2xs"
                    title="Telepon Kurir"
                  >
                    <Phone size={17} />
                  </a>
                  <Link
                    href="/chat"
                    className="w-10 h-10 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 flex items-center justify-center text-[#193CA5] transition-colors shadow-2xs"
                    title="Chat Kurir"
                  >
                    <MessageCircle size={17} />
                  </Link>
                </div>
              </div>

              {/* ETA Banner */}
              <div className="bg-[#EAF1FF] border border-blue-100 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Clock size={18} className="text-[#193CA5]" />
                  <div>
                    <span className="text-xs text-gray-500 block">Estimasi Waktu Tiba</span>
                    <span className="text-sm font-extrabold text-[#193CA5]">{eta} WIB</span>
                  </div>
                </div>
                <span className="text-xs font-bold bg-white text-[#193CA5] px-3 py-1 rounded-lg border border-blue-200">
                  ± 10 Menit lagi
                </span>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN: INTERACTIVE MAP (7 cols) ── */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-5 md:p-6 border border-gray-150 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Bike size={14} className="text-[#193CA5]" /> Rute Perjalanan Kurir
                </h2>
                <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" /> Live Tracking
                </span>
              </div>

              {/* Map Canvas Visual */}
              <div className="relative w-full h-80 sm:h-96 bg-[#E8F0FE] rounded-2xl overflow-hidden border border-gray-200 shadow-inner flex items-center justify-center">
                {/* SVG Route */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 350" preserveAspectRatio="none">
                  {/* Road Grid lines */}
                  <line x1="0" y1="100" x2="500" y2="100" stroke="#cbd5e1" strokeWidth="6" strokeDasharray="8 6" />
                  <line x1="0" y1="230" x2="500" y2="230" stroke="#cbd5e1" strokeWidth="6" strokeDasharray="8 6" />
                  <line x1="160" y1="0" x2="160" y2="350" stroke="#cbd5e1" strokeWidth="6" strokeDasharray="8 6" />
                  <line x1="360" y1="0" x2="360" y2="350" stroke="#cbd5e1" strokeWidth="6" strokeDasharray="8 6" />

                  {/* Delivery Route Path */}
                  <path
                    d="M 80 260 Q 200 240 260 170 T 420 80"
                    fill="none"
                    stroke="#193CA5"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>

                {/* Restaurant / Store Marker */}
                <div className="absolute left-8 bottom-12 flex flex-col items-center">
                  <div className="w-11 h-11 rounded-2xl bg-white text-[#193CA5] border-2 border-[#193CA5] flex items-center justify-center shadow-lg">
                    <Store size={20} />
                  </div>
                  <span className="bg-white/95 text-[10px] font-black text-gray-800 px-2 py-0.5 rounded-md mt-1 border border-gray-200 shadow-xs">
                    Restoran
                  </span>
                </div>

                {/* Home / Destination Marker */}
                <div className="absolute right-8 top-10 flex flex-col items-center">
                  <div className="w-11 h-11 rounded-2xl bg-red-500 text-white border-2 border-white flex items-center justify-center shadow-lg animate-bounce">
                    <Home size={20} />
                  </div>
                  <span className="bg-white/95 text-[10px] font-black text-gray-800 px-2 py-0.5 rounded-md mt-1 border border-gray-200 shadow-xs">
                    Lokasimu
                  </span>
                </div>

                {/* Dynamic Courier Bike Marker */}
                <div
                  className="absolute transition-all duration-300 flex flex-col items-center pointer-events-none"
                  style={{
                    left: `${courierProgress}%`,
                    top: `${100 - courierProgress * 0.8}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div className="w-12 h-12 rounded-full bg-[#193CA5] border-3 border-white text-white flex items-center justify-center shadow-xl text-xl">
                    🛵
                  </div>
                  <span className="bg-[#193CA5] text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap mt-1">
                    Kurir ({Math.round(courierProgress)}%)
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <Link href="/chat" className="block pt-2">
                <button className="w-full bg-[#193CA5] hover:bg-[#15328A] active:scale-[0.98] text-white font-extrabold py-3.5 px-6 rounded-2xl text-sm transition-all shadow-md shadow-[#193CA5]/25 flex items-center justify-center gap-2 cursor-pointer">
                  <MessageCircle size={17} /> Hubungi Kurir Lewat Chat
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
