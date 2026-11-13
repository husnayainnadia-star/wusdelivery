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
    <div className="min-h-screen bg-[#F5F6FA] flex flex-col relative pb-28 select-none">
      {/* ── STATUS BAR ── */}
      <MobileStatusBar variant="dark" />

      {/* ── HEADER ── */}
      <div className="bg-white px-5 pt-2 pb-3.5 flex items-center justify-between border-b border-gray-100 shadow-2xs">
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

      {/* ── CONTENT ── */}
      <div className="flex-1 min-h-0 overflow-y-auto px-5 pt-4 space-y-4 pb-8">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-4 text-white shadow-sm flex items-center justify-between">
          <div className="space-y-0.5">
            <h2 className="text-xs font-bold">Pindahan Rumah & Kost</h2>
            <p className="text-[11px] text-white/85">Tenaga angkut handal & armada lengkap</p>
          </div>
          <span className="text-3xl">📦</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-150 shadow-2xs space-y-3">
          <h3 className="text-xs font-extrabold text-[#111827]">Detail Alamat Pindahan</h3>

          <div>
            <label className="text-[11px] font-bold text-gray-500 mb-1 block">Alamat Asal</label>
            <div className="flex items-center bg-[#F8FAFC] border border-gray-200 rounded-xl px-3.5 py-2.5 gap-2.5 focus-within:border-purple-500">
              <MapPin size={15} className="text-purple-500 shrink-0" />
              <input
                value={pickup}
                onChange={e => setPickup(e.target.value)}
                placeholder="Lokasi muat barang asal"
                className="flex-1 text-xs outline-none bg-transparent text-gray-800 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-gray-500 mb-1 block">Alamat Tujuan</label>
            <div className="flex items-center bg-[#F8FAFC] border border-gray-200 rounded-xl px-3.5 py-2.5 gap-2.5 focus-within:border-[#193CA5]">
              <Navigation size={15} className="text-[#193CA5] shrink-0" />
              <input
                value={destination}
                onChange={e => setDestination(e.target.value)}
                placeholder="Lokasi bongkar barang tujuan"
                className="flex-1 text-xs outline-none bg-transparent text-gray-800 font-medium"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-150 shadow-2xs space-y-3">
          <h3 className="text-xs font-extrabold text-[#111827]">Pilih Kendaraan Angkut</h3>

          <div className="space-y-2.5">
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
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    active ? 'border-purple-600 bg-purple-50/40' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{f.emoji}</span>
                    <div>
                      <p className="text-xs font-bold text-[#111827]">{f.name}</p>
                      <p className="text-[10px] text-gray-500 mt-0.5">{f.desc}</p>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-purple-700">{f.price}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── FIXED BOTTOM CTA ── */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] px-5 py-3.5 bg-white border-t border-gray-150 z-50 shadow-lg">
        <button
          onClick={estimate}
          className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] active:scale-[0.98] text-white font-extrabold py-3.5 rounded-full text-xs transition-all shadow-md shadow-purple-500/25 cursor-pointer"
        >
          {estimated ? `Pesan Armada • Rp ${estimated.toLocaleString('id-ID')}` : 'Cek Tarif Estimasi'}
        </button>
      </div>
    </div>
  );
}
