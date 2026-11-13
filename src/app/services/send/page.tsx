'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, MapPin, Navigation, Send as SendIcon } from 'lucide-react';
import MobileStatusBar from '@/components/shared/MobileStatusBar';

export default function WUSSendPage() {
  const router = useRouter();
  const [sender, setSender] = useState('Jl. Melati No.12, Surakarta');
  const [recipient, setRecipient] = useState('');
  const [itemDesc, setItemDesc] = useState('');
  const [speed, setSpeed] = useState<'instant' | 'sameday'>('instant');
  const [estimated, setEstimated] = useState<number | null>(null);

  const estimate = () => {
    if (sender && recipient) {
      setEstimated(speed === 'instant' ? 15000 : 9000);
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
          <SendIcon size={18} className="text-[#EF4444]" />
          <h1 className="text-base font-extrabold text-[#111827]">WUSSend</h1>
        </div>
        <div className="w-9" />
      </div>

      {/* ── CONTENT ── */}
      <div className="flex-1 min-h-0 overflow-y-auto px-5 pt-4 space-y-4 pb-8">
        <div className="bg-gradient-to-r from-rose-500 to-red-500 rounded-2xl p-4 text-white shadow-sm flex items-center justify-between">
          <div className="space-y-0.5">
            <h2 className="text-xs font-bold">Kirim Paket Kilat Se-Kota</h2>
            <p className="text-[11px] text-white/85">Cepat, aman & live tracking di peta</p>
          </div>
          <span className="text-3xl">📨</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs space-y-3">
          <h3 className="text-xs font-extrabold text-[#111827]">Detail Pengiriman</h3>

          <div>
            <label className="text-[11px] font-bold text-gray-500 mb-1 block">Alamat Pengirim</label>
            <div className="flex items-center bg-[#F8FAFC] border border-gray-200 rounded-xl px-3.5 py-2.5 gap-2.5 focus-within:border-red-500">
              <MapPin size={15} className="text-red-500 shrink-0" />
              <input
                value={sender}
                onChange={e => setSender(e.target.value)}
                placeholder="Alamat asal penjemputan"
                className="flex-1 text-xs outline-none bg-transparent text-gray-800 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-gray-500 mb-1 block">Alamat Penerima</label>
            <div className="flex items-center bg-[#F8FAFC] border border-gray-200 rounded-xl px-3.5 py-2.5 gap-2.5 focus-within:border-[#193CA5]">
              <Navigation size={15} className="text-[#193CA5] shrink-0" />
              <input
                value={recipient}
                onChange={e => setRecipient(e.target.value)}
                placeholder="Alamat tujuan pengantaran"
                className="flex-1 text-xs outline-none bg-transparent text-gray-800 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-gray-500 mb-1 block">Deskripsi Barang</label>
            <input
              value={itemDesc}
              onChange={e => setItemDesc(e.target.value)}
              placeholder="Contoh: Dokumen, baju, makanan"
              className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs outline-none text-gray-800 font-medium focus:border-gray-400"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs space-y-2.5">
          <h3 className="text-xs font-extrabold text-[#111827]">Layanan Kecepatan</h3>

          <div className="space-y-2">
            {[
              { id: 'instant', name: 'Instant (1-2 Jam)', desc: 'Pengantaran langsung ke tujuan', price: 'Rp 15.000' },
              { id: 'sameday', name: 'Same Day (Maks 6 Jam)', desc: 'Sampai di hari yang sama', price: 'Rp 9.000' },
            ].map(f => {
              const active = speed === f.id;
              return (
                <div
                  key={f.id}
                  onClick={() => setSpeed(f.id as 'instant' | 'sameday')}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    active ? 'border-red-500 bg-red-50/40' : 'border-gray-200'
                  }`}
                >
                  <div>
                    <p className="text-xs font-bold text-[#111827]">{f.name}</p>
                    <p className="text-[10px] text-gray-500">{f.desc}</p>
                  </div>
                  <span className="text-xs font-black text-red-600">{f.price}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── FIXED BOTTOM CTA ── */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] px-5 py-3.5 bg-white border-t border-gray-200 z-50 shadow-lg">
        <button
          onClick={estimate}
          className="w-full bg-[#EF4444] hover:bg-[#DC2626] active:scale-[0.98] text-white font-extrabold py-3.5 rounded-full text-xs transition-all shadow-md shadow-red-500/25 cursor-pointer"
        >
          {estimated ? `Pesan Sekarang • Rp ${estimated.toLocaleString('id-ID')}` : 'Cek Biaya Ongkir'}
        </button>
      </div>
    </div>
  );
}
