'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, MapPin, Navigation, Truck } from 'lucide-react';
import MobileStatusBar from '@/components/shared/MobileStatusBar';

export default function WUSMovePage() {
  const router = useRouter();
  const [pickup, setPickup] = useState('Jl. Melati No.12, Surakarta');
  const [destination, setDestination] = useState('');
  const [vehicle, setVehicle] = useState<'pickup' | 'engkel' | 'blindvan'>('pickup');
  const [estimated, setEstimated] = useState<number | null>(null);

  const estimate = () => {
    if (pickup && destination) {
      const priceMap = { pickup: 120000, engkel: 250000, blindvan: 95000 };
      setEstimated(priceMap[vehicle]);
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
          <Truck size={18} className="text-[#8B5CF6]" />
          <h1 className="text-base font-extrabold text-[#111827]">WUSMove</h1>
        </div>
        <div className="w-9" />
      </div>

      {/* ── MAIN CONTENT (Laptop/Desktop Responsive Layout) ── */}
      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-5 md:py-8 flex-1 space-y-6">
        <div className="hidden md:block">
          <h1 className="text-2xl font-black text-[#111827] flex items-center gap-2">
            <Truck className="text-[#8B5CF6]" /> WUSMove — Jasa Pindahan Rumah & Kost
          </h1>
          <p className="text-sm text-gray-500 mt-1">Sewa armada pick-up & truk pindahan lengkap dengan bantuan tenaga angkut</p>
        </div>

        {/* Banner */}
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 rounded-3xl p-6 md:p-8 text-white shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-base sm:text-xl font-black">Pindahan Rumah Bebas Lelah</h2>
            <p className="text-xs sm:text-sm text-white/90">Tenaga angkut profesional & jaminan muatan aman</p>
          </div>
          <span className="text-4xl sm:text-5xl">📦</span>
        </div>

        {/* Route Details Card */}
        <div className="bg-white rounded-3xl p-6 border border-gray-150 shadow-xs space-y-4">
          <h3 className="text-sm font-extrabold text-[#111827] pb-2 border-b border-gray-100">
            Detail Alamat Pindahan
          </h3>

          <div className="space-y-3.5">
            <div>
              <label className="text-xs font-bold text-gray-500 mb-1.5 block">Alamat Asal (Muat Barang)</label>
              <div className="flex items-center bg-[#F8FAFC] border border-gray-200 rounded-2xl px-4 py-3 gap-3 focus-within:border-purple-500 focus-within:bg-white transition-all">
                <MapPin size={18} className="text-purple-500 shrink-0" />
                <input
                  value={pickup}
                  onChange={e => setPickup(e.target.value)}
                  placeholder="Lokasi muat barang asal"
                  className="flex-1 text-xs sm:text-sm outline-none bg-transparent text-gray-800 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 mb-1.5 block">Alamat Tujuan (Bongkar Barang)</label>
              <div className="flex items-center bg-[#F8FAFC] border border-gray-200 rounded-2xl px-4 py-3 gap-3 focus-within:border-[#193CA5] focus-within:bg-white transition-all">
                <Navigation size={18} className="text-[#193CA5] shrink-0" />
                <input
                  value={destination}
                  onChange={e => setDestination(e.target.value)}
                  placeholder="Lokasi bongkar barang tujuan"
                  className="flex-1 text-xs sm:text-sm outline-none bg-transparent text-gray-800 font-medium"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Vehicle Selection */}
        <div className="bg-white rounded-3xl p-6 border border-gray-150 shadow-xs space-y-4">
          <h3 className="text-sm font-extrabold text-[#111827] pb-2 border-b border-gray-100">
            Pilih Jenis Kendaraan Angkut
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { id: 'blindvan', name: 'Blind Van', desc: 'Muatan kecil & tertutup', price: 'Rp 95.000', emoji: '🚐' },
              { id: 'pickup', name: 'Pick-Up Bak', desc: 'Muatan sedang (Kasur & Lemari)', price: 'Rp 120.000', emoji: '🛻' },
              { id: 'engkel', name: 'Truk Engkel CDE', desc: 'Muatan besar 1 rumah full', price: 'Rp 250.000', emoji: '🚛' },
            ].map(f => {
              const active = vehicle === f.id;
              return (
                <div
                  key={f.id}
                  onClick={() => setVehicle(f.id as 'pickup' | 'engkel' | 'blindvan')}
                  className={`p-5 rounded-2xl border-2 flex flex-col justify-between cursor-pointer transition-all ${
                    active ? 'border-purple-600 bg-purple-50/50 shadow-xs' : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="space-y-2">
                    <span className="text-3xl">{f.emoji}</span>
                    <div>
                      <p className="text-sm font-bold text-[#111827]">{f.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{f.desc}</p>
                    </div>
                  </div>
                  <span className="text-sm font-black text-purple-700 pt-3 border-t border-gray-100 mt-3">{f.price}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={estimate}
            className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] active:scale-[0.98] text-white font-extrabold py-4 px-6 rounded-2xl text-sm sm:text-base transition-all shadow-md shadow-purple-500/25 cursor-pointer"
          >
            {estimated ? `Pesan Armada • Rp ${estimated.toLocaleString('id-ID')}` : 'Cek Tarif Estimasi Pindahan'}
          </button>
        </div>
      </main>
    </div>
  );
}
