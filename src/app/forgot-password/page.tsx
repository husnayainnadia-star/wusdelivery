'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft } from 'lucide-react';
import WUSLogo from '@/components/shared/WUSLogo';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) return setError('Masukkan email yang valid.');
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setSent(true);
  };

  return (
    <main className="min-h-screen bg-[#F5F6FA] flex flex-col">
      <div className="bg-[#193CA5] h-44 rounded-b-[3rem] flex items-center justify-center">
        <WUSLogo size="md" variant="white" />
      </div>

      <div className="flex-1 px-6 pt-8 pb-8">
        {sent ? (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">📬</span>
            </div>
            <h2 className="text-xl font-black text-[#171717] mb-2">Permintaan Terkirim</h2>
            <p className="text-sm text-gray-500 mb-2">Jika email <strong>{email}</strong> terdaftar, instruksi reset akan dikirimkan.</p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-6 text-left">
              <p className="text-xs text-amber-700 font-semibold">⚠️ Mode Demo</p>
              <p className="text-xs text-amber-600 mt-0.5">Email sebenarnya tidak dikirim. Fitur ini membutuhkan layanan email di produksi.</p>
            </div>
            <Link href="/sign-in">
              <button className="w-full bg-[#193CA5] text-white py-4 rounded-2xl font-bold text-sm">
                Kembali ke Halaman Masuk
              </button>
            </Link>
          </div>
        ) : (
          <>
            <Link href="/sign-in" className="flex items-center gap-2 text-[#193CA5] mb-5">
              <ArrowLeft size={16} />
              <span className="text-sm font-semibold">Kembali</span>
            </Link>
            <h1 className="text-2xl font-black text-[#171717] mb-1">Lupa Kata Sandi?</h1>
            <p className="text-sm text-gray-500 mb-6">Masukkan email terdaftarmu dan kami akan mengirimkan instruksi reset kata sandi.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Email</label>
                <div className="flex items-center bg-white border-2 border-gray-100 rounded-xl px-4 py-3 gap-3 focus-within:border-[#193CA5] transition-colors">
                  <Mail size={16} className="text-gray-400" />
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="email@contoh.com" className="flex-1 text-sm outline-none text-gray-700" />
                </div>
              </div>
              {error && <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-2.5"><p className="text-xs text-red-600">{error}</p></div>}
              <button type="submit" disabled={loading}
                className="w-full bg-[#193CA5] text-white py-4 rounded-2xl font-bold text-sm shadow-lg shadow-[#193CA5]/30 disabled:opacity-70 flex items-center justify-center gap-2">
                {loading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Mengirim...</> : 'Kirim Link Reset'}
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  );
}
