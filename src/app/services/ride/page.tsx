'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, MapPin, Navigation, Bike } from 'lucide-react';
import MobileStatusBar from '@/components/shared/MobileStatusBar';

export default function WUSRidePage() {
  const router = useRouter();
  const [pickup, setPickup] = useState('Jl. Melati No.12, Surakarta');
  const [destination, setDestination] = useState('');
  const [estimated, setEstimated] = useState<number | null>(null);

  const estimate = () => {
    if (pickup && destination) {
      setEstimated(12000);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F6FA] flex flex-col relative pb-28 select-none">
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
        <div className="flex items-center gap-1.5">
          <Bike size={18} className="text-[#F59E0B]" />
          <h1 className="text-base font-extrabold text-[#171717]">WUSRide</h1>
        </div>
        <div className="w-9" />
      </div>

      {/* ── CONTENT ── */}
      <div className="flex-1 min-h-0 overflow-y-auto page-px px-5 pt-4 space-y-4 pb-8">
        {/* Banner */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-4 text-white shadow-sm flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold">Ojek Motor Cepat & Hemat</h2>
            <p className="text-xs text-white/80 mt-0.5">Selap-selip anti macet sampai tujuan tepat waktu</p>
          </div>
          <span className="text-3xl">🏍️</span>
        </div>

        {/* Form Jemput & Tujuan */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm space-y-3">
          <h3 className="text-xs font-bold text-[#171717]">Detail Rute Perjalanan</h3>

          <div>
            <label className="text-[11px] font-semibold text-gray-500 mb-1 block">Lokasi Jemput</label>
            <div className="flex items-center bg-[#F8FAFC] border border-gray-200 rounded-xl px-3 py-2.5 gap-2.5 focus-within:border-amber-500">
              <MapPin size={15} className="text-amber-500 shrink-0" />
              <input
                value={pickup}
                onChange={e => setPickup(e.target.value)}
                placeholder="Masukkan lokasi jemput"
                className="flex-1 text-xs outline-none bg-transparent text-gray-700"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-gray-500 mb-1 block">Tujuan</label>
            <div className="flex items-center bg-[#F8FAFC] border border-gray-200 rounded-xl px-3 py-2.5 gap-2.5 focus-within:border-[#193CA5]">
              <Navigation size={15} className="text-[#193CA5] shrink-0" />
              <input
                value={destination}
                onChange={e => setDestination(e.target.value)}
                placeholder="Mau diantar ke mana?"
                className="flex-1 text-xs outline-none bg-transparent text-gray-700"
              />
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm space-y-2 text-xs text-gray-600">
          <p className="font-bold text-[#171717]">Keuntungan WUSRide:</p>
          <p className="flex items-center gap-2">✓ Helm bersih & higienis disediakan driver</p>
          <p className="flex items-center gap-2">✓ Driver terlatih & patuh rambu lalu lintas</p>
          <p className="flex items-center gap-2">✓ Asuransi perjalanan otomatis aktif</p>
        </div>
      </div>

      {/* ── BOTTOM CTA ── */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] px-5 py-3.5 bg-white border-t border-gray-100 z-50">
        <button
          onClick={estimate}
          className="w-full bg-[#F59E0B] hover:bg-[#D97706] active:scale-[0.98] text-white font-bold py-3.5 rounded-full text-sm transition-all shadow-md shadow-amber-500/25"
        >
          {estimated ? `Pesan WUSRide • Rp ${estimated.toLocaleString('id-ID')}` : 'Cek Tarif Estimasi'}
        </button>
      </div>
    </div>
  );
}
