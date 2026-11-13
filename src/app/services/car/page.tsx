'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, MapPin, Navigation, Car } from 'lucide-react';
import MobileStatusBar from '@/components/shared/MobileStatusBar';

export default function WUSCarPage() {
  const router = useRouter();
  const [pickup, setPickup] = useState('Jl. Melati No.12, Surakarta');
  const [destination, setDestination] = useState('');
  const [selectedFleet, setSelectedFleet] = useState<'ekonomi' | 'premium'>('ekonomi');
  const [estimated, setEstimated] = useState<number | null>(null);

  const estimate = () => {
    if (pickup && destination) {
      setEstimated(selectedFleet === 'ekonomi' ? 24000 : 45000);
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
          <Car size={18} className="text-[#10B981]" />
          <h1 className="text-base font-extrabold text-[#111827]">WUSCar</h1>
        </div>
        <div className="w-9" />
      </div>

      {/* ── MAIN CONTENT (Laptop/Desktop Responsive Layout) ── */}
      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-5 md:py-8 flex-1 space-y-6">
        <div className="hidden md:block">
          <h1 className="text-2xl font-black text-[#111827] flex items-center gap-2">
            <Car className="text-[#10B981]" /> WUSCar — Transportasi Mobil Nyaman
          </h1>
          <p className="text-sm text-gray-500 mt-1">Antar jemput aman, armada ber-AC, dan driver profesional se-Solo Raya</p>
        </div>

        {/* Banner */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 rounded-3xl p-6 md:p-8 text-white shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-base sm:text-xl font-black">Perjalanan Aman & Menyenangkan</h2>
            <p className="text-xs sm:text-sm text-white/85">Bebas repot, tarif transparan, bayar tunai atau WusPay</p>
          </div>
          <span className="text-4xl sm:text-5xl">🚗</span>
        </div>

        {/* Route Details Card */}
        <div className="bg-white rounded-3xl p-6 border border-gray-150 shadow-xs space-y-4">
          <h3 className="text-sm font-extrabold text-[#111827] pb-2 border-b border-gray-100">
            Detail Rute Penjemputan
          </h3>

          <div className="space-y-3.5">
            <div>
              <label className="text-xs font-bold text-gray-500 mb-1.5 block">Lokasi Jemput</label>
              <div className="flex items-center bg-[#F8FAFC] border border-gray-200 rounded-2xl px-4 py-3 gap-3 focus-within:border-emerald-500 focus-within:bg-white transition-all">
                <MapPin size={18} className="text-emerald-500 shrink-0" />
                <input
                  value={pickup}
                  onChange={e => setPickup(e.target.value)}
                  placeholder="Masukkan lokasi penjemputan"
                  className="flex-1 text-xs sm:text-sm outline-none bg-transparent text-gray-800 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 mb-1.5 block">Lokasi Tujuan</label>
              <div className="flex items-center bg-[#F8FAFC] border border-gray-200 rounded-2xl px-4 py-3 gap-3 focus-within:border-[#193CA5] focus-within:bg-white transition-all">
                <Navigation size={18} className="text-[#193CA5] shrink-0" />
                <input
                  value={destination}
                  onChange={e => setDestination(e.target.value)}
                  placeholder="Mau pergi ke mana hari ini?"
                  className="flex-1 text-xs sm:text-sm outline-none bg-transparent text-gray-800 font-medium"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Fleet Choice */}
        <div className="bg-white rounded-3xl p-6 border border-gray-150 shadow-xs space-y-4">
          <h3 className="text-sm font-extrabold text-[#111827] pb-2 border-b border-gray-100">
            Pilih Jenis Armada
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { id: 'ekonomi', name: 'WUSCar Standar', desc: 'Mobil 4 kursi (Avanza / Brio / Calya)', price: 'Rp 24.000', emoji: '🚗' },
              { id: 'premium', name: 'WUSCar XL / Premium', desc: 'Mobil 6-7 kursi luas (Innova / Xpander)', price: 'Rp 45.000', emoji: '🚙' },
            ].map(f => {
              const active = selectedFleet === f.id;
              return (
                <div
                  key={f.id}
                  onClick={() => setSelectedFleet(f.id as 'ekonomi' | 'premium')}
                  className={`p-5 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                    active ? 'border-emerald-500 bg-emerald-50/50 shadow-xs' : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="text-3xl">{f.emoji}</span>
                    <div>
                      <p className="text-sm font-bold text-[#111827]">{f.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{f.desc}</p>
                    </div>
                  </div>
                  <span className="text-sm font-black text-emerald-700">{f.price}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={estimate}
            className="w-full bg-[#10B981] hover:bg-[#059669] active:scale-[0.98] text-white font-extrabold py-4 px-6 rounded-2xl text-sm sm:text-base transition-all shadow-md shadow-emerald-500/25 cursor-pointer"
          >
            {estimated ? `Pesan Sekarang • Rp ${estimated.toLocaleString('id-ID')}` : 'Cek Tarif Estimasi'}
          </button>
        </div>
      </main>
    </div>
  );
}
