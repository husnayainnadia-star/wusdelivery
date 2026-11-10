'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, MapPin, Package } from 'lucide-react';
import MobileStatusBar from '@/components/shared/MobileStatusBar';

export default function WUSSendPage() {
  const router = useRouter();
  const [sender, setSender] = useState('Jl. Melati No.12, Surakarta');
  const [recipient, setRecipient] = useState('');
  const [pkgType, setPkgType] = useState('Dokumen');
  const [estimated, setEstimated] = useState<number | null>(null);

  const calculate = () => {
    if (sender && recipient) {
      setEstimated(9000);
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
          <Package size={18} className="text-[#EF4444]" />
          <h1 className="text-base font-extrabold text-[#171717]">WUSSend</h1>
        </div>
        <div className="w-9" />
      </div>

      {/* ── CONTENT ── */}
      <div className="flex-1 min-h-0 overflow-y-auto page-px px-5 pt-4 space-y-4 pb-8">
        {/* Banner */}
        <div className="bg-gradient-to-r from-red-500 to-rose-600 rounded-2xl p-4 text-white shadow-sm flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold">Kirim Paket Kilat Se-Kota</h2>
            <p className="text-xs text-white/80 mt-0.5">Paket dijemput dan diantar langsung ke penerima</p>
          </div>
          <span className="text-3xl">📨</span>
        </div>

        {/* Form Alamat Pengirim & Penerima */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm space-y-3">
          <h3 className="text-xs font-bold text-[#171717]">Informasi Pengiriman</h3>

          <div>
            <label className="text-[11px] font-semibold text-gray-500 mb-1 block">Alamat Pengirim</label>
            <div className="flex items-center bg-[#F8FAFC] border border-gray-200 rounded-xl px-3 py-2.5 gap-2.5">
              <MapPin size={15} className="text-red-500 shrink-0" />
              <input
                value={sender}
                onChange={e => setSender(e.target.value)}
                placeholder="Alamat penjemputan paket"
                className="flex-1 text-xs outline-none bg-transparent text-gray-700"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-gray-500 mb-1 block">Alamat Penerima</label>
            <div className="flex items-center bg-[#F8FAFC] border border-gray-200 rounded-xl px-3 py-2.5 gap-2.5">
              <MapPin size={15} className="text-red-500 shrink-0" />
              <input
                value={recipient}
                onChange={e => setRecipient(e.target.value)}
                placeholder="Alamat penerima paket"
                className="flex-1 text-xs outline-none bg-transparent text-gray-700"
              />
            </div>
          </div>
        </div>

        {/* Jenis Paket */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm space-y-3">
          <h3 className="text-xs font-bold text-[#171717]">Kategori Paket</h3>

          <div className="grid grid-cols-3 gap-2">
            {['Dokumen', 'Makanan', 'Barang Kecil'].map(t => {
              const active = pkgType === t;
              return (
                <button
                  key={t}
                  onClick={() => setPkgType(t)}
                  className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all ${
                    active ? 'bg-red-500 text-white shadow-xs' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── BOTTOM CTA ── */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] px-5 py-3.5 bg-white border-t border-gray-100 z-50">
        <button
          onClick={calculate}
          className="w-full bg-[#EF4444] hover:bg-[#DC2626] active:scale-[0.98] text-white font-bold py-3.5 rounded-full text-sm transition-all shadow-md shadow-red-500/25"
        >
          {estimated ? `Pesan WUSSend • Rp ${estimated.toLocaleString('id-ID')}` : 'Cek Biaya Ongkir'}
        </button>
      </div>
    </div>
  );
}
