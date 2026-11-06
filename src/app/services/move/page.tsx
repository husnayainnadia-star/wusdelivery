'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

const VEHICLE_TYPES = [
  { id: 'motor', label: 'Motor Box', desc: 'Barang ringan s.d 30kg', emoji: '🏍️', price: 'Mulai Rp25.000' },
  { id: 'pickup', label: 'Pick Up', desc: 'Barang sedang s.d 300kg', emoji: '🛻', price: 'Mulai Rp80.000' },
  { id: 'truck', label: 'Truk Kecil', desc: 'Barang besar s.d 1.5 ton', emoji: '🚛', price: 'Mulai Rp150.000' },
];

export default function WUSMovePage() {
  const [form, setForm] = useState({ from: '', to: '', goods: '', vehicle: 'motor' });
  const [booked, setBooked] = useState(false);

  return (
    <main className="min-h-screen bg-[#F5F6FA]">
      <div className="bg-[#8B5CF6] px-4 pt-12 pb-6 rounded-b-3xl">
        <div className="flex items-center gap-3">
          <Link href="/"><div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center"><ChevronLeft size={20} className="text-white" /></div></Link>
          <div>
            <h1 className="text-white text-lg font-bold">WUSMove</h1>
            <p className="text-white/70 text-xs">Pindahan barang jadi mudah</p>
          </div>
          <span className="ml-auto text-4xl">📦</span>
        </div>
      </div>

      {booked ? (
        <div className="px-4 pt-10 text-center">
          <span className="text-6xl">✅</span>
          <h2 className="text-xl font-black text-[#171717] mt-4 mb-2">Pesanan Diterima!</h2>
          <p className="text-sm text-gray-500 mb-6">Tim WUSMove akan segera menghubungi kamu.</p>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-6 text-left">
            <p className="text-xs text-amber-700 font-semibold">⚠️ Mode Demo</p>
            <p className="text-xs text-amber-600 mt-0.5">Ini adalah simulasi pemesanan. Tidak ada transaksi nyata yang terjadi.</p>
          </div>
          <Link href="/"><button className="w-full bg-[#8B5CF6] text-white py-4 rounded-2xl font-bold text-sm">Kembali ke Beranda</button></Link>
        </div>
      ) : (
        <div className="px-4 pt-5 space-y-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
            {[{ key: 'from', label: 'Alamat Asal', placeholder: 'Dari mana?' },
              { key: 'to', label: 'Alamat Tujuan', placeholder: 'Ke mana?' },
              { key: 'goods', label: 'Jenis Barang', placeholder: 'Misal: Sofa, Lemari, Kulkas' }
            ].map(({ key, label, placeholder }) => (
              <div key={key}>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">{label}</label>
                <input value={form[key as keyof typeof form]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  placeholder={placeholder} className="w-full bg-[#F5F6FA] rounded-xl px-4 py-3 text-sm outline-none text-gray-700" />
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="font-bold text-[#171717] mb-3">Pilih Kendaraan</h3>
            {VEHICLE_TYPES.map(v => (
              <button key={v.id} onClick={() => setForm(f => ({ ...f, vehicle: v.id }))}
                className={`w-full flex items-center gap-3 p-3 rounded-xl mb-2 border-2 text-left ${form.vehicle === v.id ? 'border-[#8B5CF6] bg-purple-50' : 'border-gray-100'}`}>
                <span className="text-2xl">{v.emoji}</span>
                <div className="flex-1">
                  <p className="font-bold text-sm text-[#171717]">{v.label}</p>
                  <p className="text-xs text-gray-400">{v.desc}</p>
                </div>
                <span className="text-xs font-bold text-[#8B5CF6]">{v.price}</span>
              </button>
            ))}
          </div>

          <button onClick={() => setBooked(true)} className="w-full bg-[#8B5CF6] text-white py-4 rounded-2xl font-bold text-sm shadow-lg shadow-purple-300">
            Buat Pesanan WUSMove
          </button>
        </div>
      )}
    </main>
  );
}
