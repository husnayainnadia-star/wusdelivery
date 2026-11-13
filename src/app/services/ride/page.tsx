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
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col pb-28 md:pb-12 select-none">
      <MobileStatusBar />

      {/* ── MOBILE HEADER (Hidden on desktop) ── */}
      <div className="md:hidden bg-white px-5 pt-3 pb-3.5 flex items-center justify-between border-b border-gray-100 shadow-2xs">
        <button
          onClick={() => router.push('/')}
          className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center text-gray-700 active:scale-95"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex items-center gap-1.5">
          <Bike size={18} className="text-[#F59E0B]" />
          <h1 className="text-base font-extrabold text-[#111827]">WUSRide</h1>
        </div>
        <div className="w-9" />
      </div>

      {/* ── MAIN CONTENT (Laptop/Desktop Responsive Layout) ── */}
      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-5 md:py-8 flex-1 space-y-6">
        <div className="hidden md:block">
          <h1 className="text-2xl font-black text-[#111827] flex items-center gap-2">
            <Bike className="text-[#F59E0B]" /> WUSRide — Ojek Motor Cepat & Hemat
          </h1>
          <p className="text-sm text-gray-500 mt-1">Solusi transportasi motor anti macet, cepat sampai tujuan di seluruh kota</p>
        </div>

        {/* Banner */}
        <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 rounded-3xl p-6 md:p-8 text-white shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-base sm:text-xl font-black">Ngebut Anti Macet</h2>
            <p className="text-xs sm:text-sm text-white/90">Helm higienis & penutup kepala disediakan gratis</p>
          </div>
          <span className="text-4xl sm:text-5xl">🏍️</span>
        </div>

        {/* Route Details Card */}
        <div className="bg-white rounded-3xl p-6 border border-gray-150 shadow-xs space-y-4">
          <h3 className="text-sm font-extrabold text-[#111827] pb-2 border-b border-gray-100">
            Detail Rute Penjemputan
          </h3>

          <div className="space-y-3.5">
            <div>
              <label className="text-xs font-bold text-gray-500 mb-1.5 block">Lokasi Jemput</label>
              <div className="flex items-center bg-[#F8FAFC] border border-gray-200 rounded-2xl px-4 py-3 gap-3 focus-within:border-amber-500 focus-within:bg-white transition-all">
                <MapPin size={18} className="text-amber-500 shrink-0" />
                <input
                  value={pickup}
                  onChange={e => setPickup(e.target.value)}
                  placeholder="Masukkan titik jemput"
                  className="flex-1 text-xs sm:text-sm outline-none bg-transparent text-gray-800 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 mb-1.5 block">Tujuan Pengantaran</label>
              <div className="flex items-center bg-[#F8FAFC] border border-gray-200 rounded-2xl px-4 py-3 gap-3 focus-within:border-[#193CA5] focus-within:bg-white transition-all">
                <Navigation size={18} className="text-[#193CA5] shrink-0" />
                <input
                  value={destination}
                  onChange={e => setDestination(e.target.value)}
                  placeholder="Mau kemana hari ini?"
                  className="flex-1 text-xs sm:text-sm outline-none bg-transparent text-gray-800 font-medium"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={estimate}
            className="w-full bg-[#F59E0B] hover:bg-[#D97706] active:scale-[0.98] text-white font-extrabold py-4 px-6 rounded-2xl text-sm sm:text-base transition-all shadow-md shadow-amber-500/25 cursor-pointer"
          >
            {estimated ? `Pesan Ojek • Rp ${estimated.toLocaleString('id-ID')}` : 'Cek Tarif Estimasi'}
          </button>
        </div>
      </main>
    </div>
  );
}
