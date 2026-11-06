'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function WUSSendPage() {
  const [form, setForm] = useState({ senderName: '', senderPhone: '', recipientName: '', recipientPhone: '', from: '', to: '', desc: '', weight: '' });
  const [booked, setBooked] = useState(false);
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

  const fields = [
    { section: 'Pengirim', items: [{ key: 'senderName', label: 'Nama Pengirim', placeholder: 'Nama lengkap' }, { key: 'senderPhone', label: 'No. Telepon', placeholder: '08xx' }] },
    { section: 'Penerima', items: [{ key: 'recipientName', label: 'Nama Penerima', placeholder: 'Nama lengkap' }, { key: 'recipientPhone', label: 'No. Telepon', placeholder: '08xx' }] },
    { section: 'Pengiriman', items: [{ key: 'from', label: 'Alamat Pengambilan', placeholder: 'Alamat lengkap' }, { key: 'to', label: 'Alamat Tujuan', placeholder: 'Alamat tujuan' }, { key: 'desc', label: 'Deskripsi Paket', placeholder: 'Isi paket' }, { key: 'weight', label: 'Berat (kg)', placeholder: 'Misal: 2' }] },
  ];

  return (
    <main className="min-h-screen bg-[#F5F6FA]">
      <div className="bg-[#EF4444] px-4 pt-12 pb-6 rounded-b-3xl">
        <div className="flex items-center gap-3">
          <Link href="/"><div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center"><ChevronLeft size={20} className="text-white" /></div></Link>
          <div>
            <h1 className="text-white text-lg font-bold">WUSSend</h1>
            <p className="text-white/70 text-xs">Kirim paket ke seluruh kota</p>
          </div>
          <span className="ml-auto text-4xl">📨</span>
        </div>
      </div>

      {booked ? (
        <div className="px-4 pt-10 text-center">
          <span className="text-6xl">📬</span>
          <h2 className="text-xl font-black text-[#171717] mt-4 mb-2">Paket Dijadwalkan!</h2>
          <p className="text-sm text-gray-500 mb-4">Kurir akan mengambil paketmu segera.</p>
          <Link href="/"><button className="w-full bg-[#EF4444] text-white py-4 rounded-2xl font-bold text-sm">Kembali ke Beranda</button></Link>
        </div>
      ) : (
        <div className="px-4 pt-5 space-y-3">
          {fields.map(({ section, items }) => (
            <div key={section} className="bg-white rounded-2xl p-4 shadow-sm">
              <h3 className="font-bold text-[#171717] mb-3">{section}</h3>
              {items.map(({ key, label, placeholder }) => (
                <div key={key} className="mb-3 last:mb-0">
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">{label}</label>
                  <input value={form[key as keyof typeof form]} onChange={set(key)} placeholder={placeholder}
                    className="w-full bg-[#F5F6FA] rounded-xl px-4 py-3 text-sm outline-none text-gray-700" />
                </div>
              ))}
            </div>
          ))}
          <button onClick={() => setBooked(true)} className="w-full bg-[#EF4444] text-white py-4 rounded-2xl font-bold text-sm shadow-lg shadow-red-300">
            Buat Pesanan WUSSend
          </button>
          <div className="h-4" />
        </div>
      )}
    </main>
  );
}
