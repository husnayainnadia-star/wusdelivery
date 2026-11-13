'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Phone, MessageCircle, Clock, Check, Bike, Home, Store, ShieldCheck } from 'lucide-react';
import MobileStatusBar from '@/components/shared/MobileStatusBar';

const STEPS = [
  { label: 'Pesanan\nditerima', state: 'done' },
  { label: 'Disiapkan\nresto', state: 'done' },
  { label: 'Dalam\nperjalanan', state: 'active' },
  { label: 'Pesanan\nsampai', state: 'pending' },
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
  const courierVehicle = order?.courierVehicle || 'Honda Vario • AD 5009 NH';
  const eta = order?.estimatedArrival || '17.10 - 17.25';

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col relative pb-28 select-none">
      {/* ── STATUS BAR ── */}
      <MobileStatusBar variant="dark" />

      {/* ── HEADER ── */}
      <div className="bg-white px-4 pt-2 pb-3 flex items-center justify-between border-b border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.02)] sticky top-0 z-40">
        <button
          onClick={() => router.push('/')}
          className="w-8 h-8 bg-gray-50 rounded-xl flex items-center justify-center text-gray-700 active:scale-95"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="text-center">
          <h1 className="text-sm font-black text-[#0F172A]">Lacak Pesanan</h1>
          <p className="text-[10px] text-gray-400 font-medium">ID: {id}</p>
        </div>
        <div className="w-8" />
      </div>

      {/* ── CONTENT ── */}
      <main className="flex-1 min-h-0 overflow-y-auto px-4 pt-3.5 space-y-3.5 pb-8">
        {/* 1. Gojek-Style Stepper Progress Card */}
        <div className="bg-white rounded-3xl p-4 border border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
          <div className="flex items-center justify-between relative px-2 pt-1">
            <div className="absolute top-5 left-5 right-5 h-0.5 bg-gray-200 -z-0" />
            <div className="absolute top-5 left-5 w-[65%] h-0.5 bg-[#193CA5] -z-0" />

            {STEPS.map((s, idx) => (
              <div key={idx} className="flex flex-col items-center text-center relative z-10">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    s.state === 'done'
                      ? 'bg-[#193CA5] text-white'
                      : s.state === 'active'
                      ? 'bg-[#193CA5] text-white ring-4 ring-blue-100'
                      : 'bg-white border-2 border-gray-300 text-gray-400'
                  }`}
                >
                  {s.state === 'done' && <Check size={14} strokeWidth={3} />}
                  {s.state === 'active' && <Bike size={14} />}
                  {s.state === 'pending' && <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />}
                </div>
                <span
                  className={`text-[9px] mt-1.5 font-bold leading-tight whitespace-pre-line ${
                    s.state === 'active'
                      ? 'text-[#193CA5]'
                      : s.state === 'done'
                      ? 'text-gray-800'
                      : 'text-gray-400'
                  }`}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Map Canvas Box (Gojek Live Tracking Style) */}
        <div className="bg-white rounded-3xl p-2 border border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
          <div className="relative w-full h-56 bg-[#E8F0FE] rounded-2xl overflow-hidden flex items-center justify-center">
            {/* SVG Roads */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 350 220" preserveAspectRatio="none">
              <line x1="0" y1="70" x2="350" y2="70" stroke="#cbd5e1" strokeWidth="4" strokeDasharray="6 4" />
              <line x1="0" y1="150" x2="350" y2="150" stroke="#cbd5e1" strokeWidth="4" strokeDasharray="6 4" />
              <line x1="110" y1="0" x2="110" y2="220" stroke="#cbd5e1" strokeWidth="4" strokeDasharray="6 4" />
              <line x1="240" y1="0" x2="240" y2="220" stroke="#cbd5e1" strokeWidth="4" strokeDasharray="6 4" />
              <path d="M 40 180 Q 140 160 180 110 T 310 50" fill="none" stroke="#193CA5" strokeWidth="4" strokeLinecap="round" />
            </svg>

            {/* Resto Pin */}
            <div className="absolute left-6 bottom-6 flex flex-col items-center">
              <div className="w-8 h-8 rounded-xl bg-white text-[#193CA5] border-2 border-[#193CA5] flex items-center justify-center shadow-md">
                <Store size={15} />
              </div>
              <span className="text-[9px] font-bold text-gray-700 bg-white/90 px-1.5 rounded mt-0.5 shadow-2xs">Resto</span>
            </div>

            {/* Destination Pin */}
            <div className="absolute right-6 top-6 flex flex-col items-center">
              <div className="w-8 h-8 rounded-xl bg-red-500 text-white border-2 border-white flex items-center justify-center shadow-md animate-bounce">
                <Home size={15} />
              </div>
              <span className="text-[9px] font-bold text-gray-700 bg-white/90 px-1.5 rounded mt-0.5 shadow-2xs">Rumah</span>
            </div>

            {/* Animated Courier Bike Pin */}
            <div
              className="absolute transition-all duration-300 flex flex-col items-center pointer-events-none"
              style={{
                left: `${courierProgress}%`,
                top: `${100 - courierProgress * 0.8}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="w-9 h-9 rounded-full bg-[#193CA5] border-2 border-white text-white flex items-center justify-center shadow-lg text-sm">
                🛵
              </div>
            </div>
          </div>
        </div>

        {/* 3. Gojek-Style Driver Card */}
        <div className="bg-white rounded-3xl p-4 border border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.03)] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-200 text-2xl flex items-center justify-center shadow-2xs shrink-0">
                👨‍✈️
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-black text-[#0F172A]">{courierName}</h3>
                  <span className="text-[9px] font-bold bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded border border-emerald-200">
                    ★ 4.9
                  </span>
                </div>
                <p className="text-[11px] font-bold text-gray-500 mt-0.5">{courierVehicle}</p>
              </div>
            </div>

            {/* Quick Driver Action Buttons */}
            <div className="flex items-center gap-2">
              <a
                href="tel:081234567890"
                className="w-9 h-9 rounded-xl bg-gray-50 hover:bg-emerald-50 hover:text-emerald-600 border border-gray-200 flex items-center justify-center text-gray-700 transition-colors shadow-2xs"
                title="Telepon Kurir"
              >
                <Phone size={15} />
              </a>
              <Link
                href="/chat"
                className="w-9 h-9 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 flex items-center justify-center text-[#193CA5] transition-colors shadow-2xs"
                title="Chat Kurir"
              >
                <MessageCircle size={15} />
              </Link>
            </div>
          </div>

          {/* ETA Card */}
          <div className="bg-[#EBF3FF] border border-blue-100 rounded-2xl p-3 flex items-center gap-2.5">
            <Clock size={16} className="text-[#193CA5] shrink-0" />
            <div className="text-xs text-[#193CA5] font-semibold leading-relaxed">
              <span className="block text-[10px] text-gray-500 font-normal">Kurir sedang dalam perjalanan menuju lokasi Anda</span>
              <span className="font-black text-sm">{eta} WIB</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] text-gray-400 pt-0.5">
            <ShieldCheck size={13} className="text-emerald-500" />
            <span>Pesanan diantar langsung tanpa mampir</span>
          </div>
        </div>
      </main>

      {/* ── FIXED BOTTOM CTA (Gojek Style) ── */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] px-4 py-3 bg-white border-t border-gray-200 z-50 shadow-lg">
        <Link href="/chat">
          <button className="w-full bg-[#193CA5] hover:bg-[#15328A] active:scale-[0.98] text-white font-black py-3.5 rounded-full text-xs transition-all shadow-md shadow-[#193CA5]/25 flex items-center justify-center gap-2 cursor-pointer">
            <MessageCircle size={15} /> Hubungi Kurir via Chat
          </button>
        </Link>
      </div>
    </div>
  );
}
