'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, MapPin, Navigation, Send as SendIcon, Package } from 'lucide-react';
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
          <SendIcon size={18} className="text-[#EF4444]" />
          <h1 className="text-base font-extrabold text-[#111827]">WUSSend</h1>
        </div>
        <div className="w-9" />
      </div>

      {/* ── MAIN CONTENT (Laptop/Desktop Responsive Layout) ── */}
      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-5 md:py-8 flex-1 space-y-6">
        <div className="hidden md:block">
          <h1 className="text-2xl font-black text-[#111827] flex items-center gap-2">
            <SendIcon className="text-[#EF4444]" /> WUSSend — Pengiriman Paket & Dokumen Kilat
          </h1>
          <p className="text-sm text-gray-500 mt-1">Kirim paket, pakaian, dokumen, atau barang dagangan sampai dalam 1-2 jam</p>
        </div>

        {/* Banner */}
        <div className="bg-gradient-to-r from-rose-500 via-red-500 to-rose-600 rounded-3xl p-6 md:p-8 text-white shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-base sm:text-xl font-black">Kirim Paket Kilat Se-Kota</h2>
            <p className="text-xs sm:text-sm text-white/90">Garansi paket aman & live tracking kurir di peta</p>
          </div>
          <span className="text-4xl sm:text-5xl">📨</span>
        </div>

        {/* Form Sender & Recipient */}
        <div className="bg-white rounded-3xl p-6 border border-gray-150 shadow-xs space-y-4">
          <h3 className="text-sm font-extrabold text-[#111827] pb-2 border-b border-gray-100">
            Detail Alamat Pengirim & Penerima
          </h3>

          <div className="space-y-3.5">
            <div>
              <label className="text-xs font-bold text-gray-500 mb-1.5 block">Alamat Pengirim (Penjemputan)</label>
              <div className="flex items-center bg-[#F8FAFC] border border-gray-200 rounded-2xl px-4 py-3 gap-3 focus-within:border-red-500 focus-within:bg-white transition-all">
                <MapPin size={18} className="text-red-500 shrink-0" />
                <input
                  value={sender}
                  onChange={e => setSender(e.target.value)}
                  placeholder="Alamat lengkap pengirim"
                  className="flex-1 text-xs sm:text-sm outline-none bg-transparent text-gray-800 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 mb-1.5 block">Alamat Penerima (Tujuan)</label>
              <div className="flex items-center bg-[#F8FAFC] border border-gray-200 rounded-2xl px-4 py-3 gap-3 focus-within:border-[#193CA5] focus-within:bg-white transition-all">
                <Navigation size={18} className="text-[#193CA5] shrink-0" />
                <input
                  value={recipient}
                  onChange={e => setRecipient(e.target.value)}
                  placeholder="Alamat lengkap penerima paket"
                  className="flex-1 text-xs sm:text-sm outline-none bg-transparent text-gray-800 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 mb-1.5 block">Deskripsi Barang yang Dikirim</label>
              <div className="flex items-center bg-[#F8FAFC] border border-gray-200 rounded-2xl px-4 py-3 gap-3 focus-within:border-gray-400 focus-within:bg-white transition-all">
                <Package size={18} className="text-gray-400 shrink-0" />
                <input
                  value={itemDesc}
                  onChange={e => setItemDesc(e.target.value)}
                  placeholder="Contoh: Dokumen map merah, Pakaian, Kue ultah"
                  className="flex-1 text-xs sm:text-sm outline-none bg-transparent text-gray-800 font-medium"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Speed Option */}
        <div className="bg-white rounded-3xl p-6 border border-gray-150 shadow-xs space-y-4">
          <h3 className="text-sm font-extrabold text-[#111827] pb-2 border-b border-gray-100">
            Pilih Layanan Kecepatan
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { id: 'instant', name: 'Instant Delivery', desc: 'Sampai dalam 1-2 jam langsung diantar', price: 'Rp 15.000', badge: 'Tercepat' },
              { id: 'sameday', name: 'Same Day Delivery', desc: 'Sampai di hari yang sama (maks 6 jam)', price: 'Rp 9.000', badge: 'Hemat' },
            ].map(f => {
              const active = speed === f.id;
              return (
                <div
                  key={f.id}
                  onClick={() => setSpeed(f.id as 'instant' | 'sameday')}
                  className={`p-5 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                    active ? 'border-red-500 bg-red-50/40 shadow-xs' : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-[#111827]">{f.name}</p>
                      <span className="text-[10px] font-bold bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                        {f.badge}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{f.desc}</p>
                  </div>
                  <span className="text-sm font-black text-red-600 shrink-0">{f.price}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={estimate}
            className="w-full bg-[#EF4444] hover:bg-[#DC2626] active:scale-[0.98] text-white font-extrabold py-4 px-6 rounded-2xl text-sm sm:text-base transition-all shadow-md shadow-red-500/25 cursor-pointer"
          >
            {estimated ? `Pesan Kurir • Rp ${estimated.toLocaleString('id-ID')}` : 'Cek Biaya Ongkir Paket'}
          </button>
        </div>
      </main>
    </div>
  );
}
