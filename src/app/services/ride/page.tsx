'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, MapPin, Navigation } from 'lucide-react';

export default function WUSRidePage() {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [estimated, setEstimated] = useState<number | null>(null);

  const estimate = () => {
    if (pickup && destination) setEstimated(Math.floor(Math.random() * 15000) + 8000);
  };

  return (
    <main className="min-h-screen bg-[#F5F6FA]">
      <div className="px-4 pt-12 pb-6 rounded-b-3xl" style={{ background: '#F59E0B' }}>
        <div className="flex items-center gap-3">
          <Link href="/"><div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center"><ChevronLeft size={20} className="text-white" /></div></Link>
          <div>
            <h1 className="text-white text-lg font-bold">WUSRide</h1>
            <p className="text-white/70 text-xs">Ojek motor cepat dan hemat</p>
          </div>
          <span className="ml-auto text-4xl">🏍️</span>
        </div>
      </div>

      <div className="px-4 pt-5 space-y-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
          <h3 className="font-bold text-[#171717]">Detail Perjalanan</h3>
          {[{ label: 'Lokasi Jemput', placeholder: 'Masukkan lokasi jemput', value: pickup, set: setPickup, icon: MapPin },
            { label: 'Tujuan', placeholder: 'Masukkan tujuan', value: destination, set: setDestination, icon: Navigation }
          ].map(({ label, placeholder, value, set, icon: Icon }) => (
            <div key={label}>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">{label}</label>
              <div className="flex items-center bg-[#F5F6FA] rounded-xl px-3 py-3 gap-2">
                <Icon size={15} className="text-amber-500" />
                <input value={value} onChange={e => set(e.target.value)} placeholder={placeholder}
                  className="flex-1 text-sm outline-none bg-transparent text-gray-700" />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-[#171717] mb-3">Layanan</h3>
          {[{ label: 'WUSRide Reguler', desc: 'Motor standar, cepat sampai', price: 'Mulai Rp8.000', emoji: '🏍️' },
            { label: 'WUSRide XL', desc: 'Untuk penumpang besar', price: 'Mulai Rp12.000', emoji: '🛵' }
          ].map((v, i) => (
            <div key={v.label} className={`flex items-center gap-3 p-3 rounded-xl mb-2 border-2 ${i === 0 ? 'border-amber-400 bg-amber-50' : 'border-gray-100'}`}>
              <span className="text-2xl">{v.emoji}</span>
              <div className="flex-1">
                <p className="font-bold text-sm text-[#171717]">{v.label}</p>
                <p className="text-xs text-gray-400">{v.desc}</p>
              </div>
              <span className="text-xs font-bold text-amber-500">{v.price}</span>
            </div>
          ))}
        </div>

        {estimated && (
          <div className="rounded-2xl p-4 text-center" style={{ background: '#F59E0B' }}>
            <p className="text-white/80 text-xs">Estimasi Ongkos</p>
            <p className="text-white text-2xl font-black">Rp {estimated.toLocaleString('id-ID')}</p>
            <p className="text-white/60 text-[10px] mt-0.5">⚠️ Demo — harga tidak nyata</p>
          </div>
        )}

        <button onClick={estimate} style={{ background: '#F59E0B' }}
          className="w-full text-white py-4 rounded-2xl font-bold text-sm shadow-lg shadow-amber-300">
          {estimated ? 'Pesan WUSRide' : 'Cek Estimasi Ongkos'}
        </button>
      </div>
    </main>
  );
}
