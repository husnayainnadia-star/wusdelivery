'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, MapPin, Truck } from 'lucide-react';
import MobileStatusBar from '@/components/shared/MobileStatusBar';

export default function WUSMovePage() {
  const router = useRouter();
  const [origin, setOrigin] = useState('Jl. Melati No.12, Surakarta');
  const [destination, setDestination] = useState('');
  const [fleet, setFleet] = useState<'pickup' | 'box'>('pickup');
  const [estimated, setEstimated] = useState<number | null>(null);

  const calculate = () => {
    if (origin && destination) {
      setEstimated(fleet === 'pickup' ? 120000 : 250000);
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
          <Truck size={18} className="text-[#8B5CF6]" />
          <h1 className="text-base font-extrabold text-[#171717]">WUSMove</h1>
        </div>
        <div className="w-9" />
      </div>

      {/* ── CONTENT ── */}
      <div className="flex-1 min-h-0 overflow-y-auto page-px px-5 pt-4 space-y-4 pb-8">
        {/* Banner */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-4 text-white shadow-sm flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold">Jasa Pindahan & Angkut</h2>
            <p className="text-xs text-white/80 mt-0.5">Pindahan kos, rumah, atau kantor jadi mudah</p>
          </div>
          <span className="text-3xl">📦</span>
        </div>

        {/* Form Alamat */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm space-y-3">
          <h3 className="text-xs font-bold text-[#171717]">Alamat Pindahan</h3>

          <div>
            <label className="text-[11px] font-semibold text-gray-500 mb-1 block">Lokasi Asal</label>
            <div className="flex items-center bg-[#F8FAFC] border border-gray-200 rounded-xl px-3 py-2.5 gap-2.5">
              <MapPin size={15} className="text-purple-600 shrink-0" />
              <input
                value={origin}
                onChange={e => setOrigin(e.target.value)}
                placeholder="Alamat penjemputan barang"
                className="flex-1 text-xs outline-none bg-transparent text-gray-700"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-gray-500 mb-1 block">Lokasi Tujuan</label>
            <div className="flex items-center bg-[#F8FAFC] border border-gray-200 rounded-xl px-3 py-2.5 gap-2.5">
              <MapPin size={15} className="text-indigo-600 shrink-0" />
              <input
                value={destination}
                onChange={e => setDestination(e.target.value)}
                placeholder="Alamat tujuan pengantaran"
                className="flex-1 text-xs outline-none bg-transparent text-gray-700"
              />
            </div>
          </div>
        </div>

        {/* Tipe Kendaraan */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm space-y-3">
          <h3 className="text-xs font-bold text-[#171717]">Pilihan Armada Angkut</h3>

          <div className="space-y-2.5">
            {[
              { id: 'pickup', name: 'Mobil Pick-Up Bak Terbuka', desc: 'Muat kasur, lemari, kardus kosan', price: 'Mulai Rp 120.000', emoji: '🛻' },
              { id: 'box', name: 'Truk Box Engkel Tertutup', desc: 'Aman dari hujan & muatan besar', price: 'Mulai Rp 250.000', emoji: '🚚' },
            ].map(item => {
              const active = fleet === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setFleet(item.id as 'pickup' | 'box')}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    active ? 'border-purple-600 bg-purple-50/40' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.emoji}</span>
                    <div>
                      <p className="text-xs font-bold text-[#171717]">{item.name}</p>
                      <p className="text-[10px] text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-purple-700">{item.price}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── BOTTOM CTA ── */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] px-5 py-3.5 bg-white border-t border-gray-100 z-50">
        <button
          onClick={calculate}
          className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] active:scale-[0.98] text-white font-bold py-3.5 rounded-full text-sm transition-all shadow-md shadow-purple-500/25"
        >
          {estimated ? `Pesan WUSMove • Rp ${estimated.toLocaleString('id-ID')}` : 'Hitung Estimasi Biaya'}
        </button>
      </div>
    </div>
  );
}
