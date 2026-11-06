'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Phone, MessageCircle, Clock } from 'lucide-react';

const STEPS = [
  { label: 'Pesanan\nditerima',    icon: '✓',  done: true,  active: false },
  { label: 'Sedang\ndisiapkan',    icon: '👨‍🍳', done: true,  active: false },
  { label: 'Dalam\nperjalanan',    icon: '🛵',  done: false, active: true  },
  { label: 'Tiba',                 icon: '🏠',  done: false, active: false },
];

function fmt(n: number) { return 'Rp.' + n.toLocaleString('id-ID'); }

export default function TrackingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [progress, setProgress] = useState(62);
  const [driverY, setDriverY] = useState(36);
  const [order, setOrder] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    try {
      const s = sessionStorage.getItem(`order_${id}`);
      if (s) setOrder(JSON.parse(s));
    } catch {}
  }, [id]);

  useEffect(() => {
    const t = setInterval(() => {
      setProgress(p => Math.min(p + 0.25, 100));
      setDriverY(d => Math.max(d - 0.12, 27));
    }, 200);
    return () => clearInterval(t);
  }, []);

  const total = (order?.total as number) ?? 55000;
  const restaurantName = (order?.restaurantName as string) ?? 'MR Burger';

  return (
    <div className="min-h-screen bg-[#f5f6fa] flex flex-col">

      {/* Header */}
      <div className="bg-white px-4 pt-11 pb-3.5 flex items-center gap-3 shadow-sm shrink-0">
        <Link href="/">
          <div className="w-9 h-9 bg-[#F5F6FA] rounded-xl flex items-center justify-center">
            <ChevronLeft size={19} className="text-[#171717]" />
          </div>
        </Link>
        <h1 className="flex-1 text-base font-black text-[#171717] text-center">Lacak Pesanan</h1>
        <div className="w-9" />
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-3.5 pb-6 space-y-2.5">

        {/* Steps */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-start">
            {STEPS.map((step, i) => (
              <div key={i} className="flex-1 flex flex-col items-center relative">
                {/* connector line */}
                {i < STEPS.length - 1 && (
                  <div className="absolute top-[18px] left-1/2 w-full h-[2px] z-0"
                    style={{ background: step.done ? '#193CA5' : '#E5E7EB' }} />
                )}
                {/* circle */}
                <div className={`w-9 h-9 rounded-full flex items-center justify-center z-10 relative text-sm
                  ${step.done ? 'bg-[#193CA5] text-white' : step.active ? 'bg-[#EAF1FF] border-2 border-[#193CA5]' : 'bg-gray-100'}`}>
                  <span style={{ fontSize: step.done ? '13px' : '14px' }}>
                    {step.done ? '✓' : step.icon}
                  </span>
                </div>
                <p className={`text-[8px] text-center mt-1.5 leading-tight whitespace-pre-line
                  ${step.done || step.active ? 'text-[#193CA5] font-bold' : 'text-gray-400 font-medium'}`}>
                  {step.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          <div className="h-48 relative" style={{ background: '#DDE8F8' }}>
            {/* subtle grid */}
            {[15,30,45,60,75,90].map(t => (
              <div key={t} className="absolute left-0 right-0 h-px" style={{ top: `${t}%`, background: 'rgba(25,60,165,0.07)' }} />
            ))}
            {[20,40,60,80].map(l => (
              <div key={l} className="absolute top-0 bottom-0 w-px" style={{ left: `${l}%`, background: 'rgba(25,60,165,0.07)' }} />
            ))}
            {/* roads */}
            <div className="absolute left-1/2 top-0 bottom-0 w-3 bg-white -translate-x-1/2 opacity-80" />
            <div className="absolute left-0 right-0 h-3 bg-white opacity-80" style={{ top: '72%', transform: 'translateY(-50%)' }} />
            {/* destination */}
            <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center" style={{ top: '66%', transform: 'translate(-50%, -100%)' }}>
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-300">
                <span className="text-white text-base">📍</span>
              </div>
            </div>
            {/* driver */}
            <div className="absolute left-1/2 -translate-x-1/2 transition-all duration-300" style={{ top: `${driverY}%` }}>
              <div className="w-11 h-11 bg-white rounded-full border-2 border-[#193CA5] flex items-center justify-center text-xl shadow-lg shadow-[#193CA5]/20">
                🛵
              </div>
            </div>
            {/* route dash */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <line x1="50%" y1={`${driverY + 5}%`} x2="50%" y2="67%"
                stroke="#193CA5" strokeWidth="2" strokeDasharray="5 4" strokeLinecap="round" />
            </svg>
          </div>
          <div className="px-4 py-2.5 flex items-center gap-2 border-t border-gray-50">
            <Clock size={13} className="text-[#193CA5]" />
            <span className="text-[11px] text-gray-500">Estimasi tiba:</span>
            <span className="text-[11px] font-black text-[#193CA5]">17.10 - 17.25</span>
          </div>
        </div>

        {/* Driver */}
        <div className="bg-white rounded-2xl p-3.5 shadow-sm flex items-center gap-3">
          <div className="w-13 h-13 bg-[#EAF1FF] rounded-full flex items-center justify-center text-3xl border-2 border-[#193CA5] shrink-0" style={{ width: 52, height: 52 }}>
            👨
          </div>
          <div className="flex-1">
            <p className="font-black text-[#171717] text-sm">RIZKY PRIYATNO</p>
            <p className="text-[10px] text-gray-400">AD 5009 NH</p>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-yellow-400 text-xs">★</span>
              <span className="text-xs font-bold text-gray-600">4.8</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="w-9 h-9 bg-[#EAF1FF] rounded-xl flex items-center justify-center">
              <Phone size={15} className="text-[#193CA5]" />
            </button>
            <button className="w-9 h-9 bg-[#EAF1FF] rounded-xl flex items-center justify-center">
              <MessageCircle size={15} className="text-[#193CA5]" />
            </button>
          </div>
        </div>

        {/* Status bar */}
        <div className="bg-white rounded-2xl p-3.5 shadow-sm">
          <div className="flex items-start gap-2 mb-2.5">
            <span className="text-base">🛵</span>
            <p className="text-[11px] text-gray-600 flex-1 leading-relaxed">
              Kurir sedang dalam perjalanan menuju lokasi kamu!
            </p>
          </div>
          <div className="h-2 bg-[#EAF1FF] rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #193CA5, #60a5fa)' }} />
          </div>
        </div>

        {/* Hubungi Kurir */}
        <Link href="/">
          <button className="w-full border-2 border-[#193CA5] text-[#193CA5] py-3.5 rounded-2xl font-bold text-sm">
            Hubungi Kurir
          </button>
        </Link>
      </div>
    </div>
  );
}
