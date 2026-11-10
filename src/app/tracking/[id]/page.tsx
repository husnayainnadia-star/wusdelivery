'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Phone, MessageCircle, Clock, Check, Bike, Home, Store } from 'lucide-react';
import MobileStatusBar from '@/components/shared/MobileStatusBar';

const STEPS = [
  { label: 'Pesanan\nditerima', state: 'done' },
  { label: 'Disiapkan', state: 'done' },
  { label: 'Dalam\nperjalanan', state: 'active' },
  { label: 'Selesai', state: 'pending' },
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
        <h1 className="text-base font-extrabold text-[#171717]">Lacak Pesanan</h1>
        <div className="w-9" />
      </div>

      {/* ── CONTENT ── */}
      <div className="flex-1 min-h-0 overflow-y-auto page-px px-5 pt-4 space-y-4 pb-8">
        {/* 4-Step Progress Indicator Card with Generous Padding */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between relative px-2">
            {/* Connecting Line Background */}
            <div className="absolute top-4.5 left-7 right-7 h-0.5 bg-gray-200 -z-0" />
            <div className="absolute top-4.5 left-7 w-2/3 h-0.5 bg-[#193CA5] -z-0 transition-all" />

            {STEPS.map((step, idx) => {
              const isDone = step.state === 'done';
              const isActive = step.state === 'active';

              return (
                <div key={idx} className="flex flex-col items-center z-10">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold transition-all shadow-xs ${
                      isDone || isActive
                        ? 'bg-[#193CA5] ring-4 ring-blue-50'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    {isDone ? (
                      <Check size={14} strokeWidth={3} />
                    ) : isActive ? (
                      <Bike size={15} strokeWidth={2.5} />
                    ) : (
                      <Check size={13} strokeWidth={2} className="text-gray-400" />
                    )}
                  </div>
                  <span
                    className={`text-[9.5px] text-center mt-2 font-bold whitespace-pre-line leading-tight ${
                      isDone || isActive ? 'text-[#193CA5]' : 'text-gray-400'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stylized Map View Card with Comfortable Padding */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs overflow-hidden">
          <div className="h-56 bg-[#EFF6FF] rounded-xl relative overflow-hidden flex items-center justify-center border border-blue-100">
            {/* Map Roads / Grid Lines */}
            <svg
              className="absolute inset-0 w-full h-full opacity-60"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Roads */}
              <path
                d="M-20 40 L350 40 M-20 120 L350 120 M-20 180 L350 180"
                stroke="#DBEAFE"
                strokeWidth="14"
              />
              <path
                d="M60 -20 L60 250 M180 -20 L180 250 M280 -20 L280 250"
                stroke="#DBEAFE"
                strokeWidth="14"
              />
              {/* Curved Route from Restaurant to House */}
              <path
                d="M 50 160 C 100 160, 100 80, 180 80 S 240 60, 275 60"
                fill="none"
                stroke="#193CA5"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="1 0"
              />
            </svg>

            {/* Restaurant Pin (Origin) */}
            <div className="absolute left-9 bottom-7 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#193CA5] text-white flex items-center justify-center shadow-lg ring-2 ring-white">
                <Store size={15} />
              </div>
              <span className="text-[8px] font-bold text-[#193CA5] bg-white px-1.5 py-0.5 rounded shadow-2xs mt-1">
                Restoran
              </span>
            </div>

            {/* Destination Pin (House) */}
            <div className="absolute right-9 top-6 flex flex-col items-center">
              <div className="w-9 h-9 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg ring-2 ring-white animate-bounce">
                <Home size={17} />
              </div>
              <span className="text-[8px] font-bold text-red-600 bg-white px-1.5 py-0.5 rounded shadow-2xs mt-1">
                Tujuan
              </span>
            </div>

            {/* Courier Moving on Route */}
            <div
              className="absolute z-20 transition-all duration-300"
              style={{
                left: `${courierProgress}%`,
                top: `${42 + Math.sin(courierProgress / 10) * 8}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="w-10 h-10 rounded-full bg-[#193CA5] text-white flex items-center justify-center shadow-xl ring-2 ring-white">
                <Bike size={20} strokeWidth={2.5} />
              </div>
            </div>
          </div>
        </div>

        {/* Courier / Driver Profile Card with Generous Padding */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-13 h-13 rounded-full overflow-hidden bg-blue-50 border-2 border-[#193CA5]/20 flex items-center justify-center text-2xl shrink-0" style={{ width: '48px', height: '48px' }}>
              👨🏻‍💼
            </div>
            <div>
              <h2 className="text-xs font-black text-[#171717] uppercase tracking-wide">
                {courierName}
              </h2>
              <p className="text-xs text-gray-500 font-semibold mt-0.5">{courierVehicle}</p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-amber-500 text-xs font-bold">★</span>
                <span className="text-xs font-bold text-gray-700">4.8</span>
              </div>
            </div>
          </div>

          {/* Action Buttons: Phone & Chat */}
          <div className="flex items-center gap-2.5">
            <a
              href="tel:081234567890"
              className="w-10 h-10 rounded-full bg-blue-50 hover:bg-blue-100 text-[#193CA5] flex items-center justify-center active:scale-95 transition-all shadow-2xs"
            >
              <Phone size={17} />
            </a>
            <Link
              href="/chat"
              className="w-10 h-10 rounded-full bg-blue-50 hover:bg-blue-100 text-[#193CA5] flex items-center justify-center active:scale-95 transition-all shadow-2xs"
            >
              <MessageCircle size={17} />
            </Link>
          </div>
        </div>

        {/* Status Notice / ETA Banner with Comfortable Padding */}
        <div className="bg-[#EAF1FF] rounded-2xl p-4.5 flex items-center gap-4 border border-blue-100" style={{ padding: '16px 18px' }}>
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#193CA5] shrink-0 shadow-2xs">
            <Clock size={18} />
          </div>
          <div>
            <p className="text-xs font-bold text-[#193CA5] leading-snug">
              Kurir sedang dalam perjalanan menuju lokasi Anda
            </p>
            <p className="text-xs text-[#193CA5]/80 mt-1">
              Estimasi tiba: <strong className="font-extrabold">{eta}</strong>
            </p>
          </div>
        </div>
      </div>

      {/* ── BOTTOM CTA ── */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] page-px px-5 py-4 bg-white border-t border-gray-100 z-50">
        <a href="tel:081234567890">
          <button className="w-full bg-[#193CA5] hover:bg-[#15328A] active:scale-[0.98] text-white font-bold py-3.5 rounded-full text-sm transition-all shadow-md shadow-[#193CA5]/25">
            Hubungi Kurir
          </button>
        </a>
      </div>
    </div>
  );
}
