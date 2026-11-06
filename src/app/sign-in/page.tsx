'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import WUSLogo from '@/components/shared/WUSLogo';

export default function SignInPage() {
  const router = useRouter();
  const { signIn, isLoading } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [remember, setRemember] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.email) return setError('Email harus diisi.');
    if (!/\S+@\S+\.\S+/.test(form.email)) return setError('Format email tidak valid.');
    if (!form.password) return setError('Kata sandi harus diisi.');

    const res = await signIn(form.email, form.password);
    if (res.success) router.push('/');
    else setError(res.error || 'Login gagal.');
  };

  return (
    <main className="min-h-screen bg-[#F5F6FA] flex flex-col">
      {/* Top decoration */}
      <div className="bg-[#193CA5] h-52 rounded-b-[3rem] flex flex-col items-center justify-center gap-3">
        <WUSLogo size="lg" variant="white" />
        <p className="text-white/70 text-xs font-medium">Pesan, Kirim, Sampai!</p>
      </div>

      <div className="flex-1 px-6 pt-8 pb-8">
        <h1 className="text-2xl font-black text-[#171717] mb-1">Selamat Datang Kembali!</h1>
        <p className="text-sm text-gray-500 mb-6">Masuk untuk menikmati layanan WUSDelivery.</p>

        {/* Demo Info */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-5">
          <p className="text-xs text-amber-700 font-semibold">⚠️ Mode Demo</p>
          <p className="text-xs text-amber-600 mt-0.5">Autentikasi ini adalah demo. Daftar akun baru untuk mencoba fitur login.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Email</label>
            <div className="flex items-center bg-white border-2 border-gray-100 rounded-xl px-4 py-3 gap-3 focus-within:border-[#193CA5] transition-colors">
              <Mail size={16} className="text-gray-400 shrink-0" />
              <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="email@contoh.com" className="flex-1 text-sm outline-none text-gray-700" />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Kata Sandi</label>
            <div className="flex items-center bg-white border-2 border-gray-100 rounded-xl px-4 py-3 gap-3 focus-within:border-[#193CA5] transition-colors">
              <Lock size={16} className="text-gray-400 shrink-0" />
              <input type={showPw ? 'text' : 'password'} value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                placeholder="Kata sandi" className="flex-1 text-sm outline-none text-gray-700" />
              <button type="button" onClick={() => setShowPw(!showPw)}>
                {showPw ? <EyeOff size={16} className="text-gray-400" /> : <Eye size={16} className="text-gray-400" />}
              </button>
            </div>
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)}
                className="w-4 h-4 accent-[#193CA5]" />
              <span className="text-xs text-gray-600">Ingat saya</span>
            </label>
            <Link href="/forgot-password" className="text-xs text-[#193CA5] font-semibold">Lupa Kata Sandi?</Link>
          </div>

          {/* Error */}
          {error && <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-2.5"><p className="text-xs text-red-600 font-medium">{error}</p></div>}

          {/* Submit */}
          <button type="submit" disabled={isLoading}
            className="w-full bg-[#193CA5] text-white py-4 rounded-2xl font-bold text-sm shadow-lg shadow-[#193CA5]/30 disabled:opacity-70 flex items-center justify-center gap-2 mt-2">
            {isLoading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Masuk...</> : 'Masuk'}
          </button>
        </form>

        <div className="text-center mt-6">
          <span className="text-sm text-gray-500">Belum punya akun? </span>
          <Link href="/sign-up" className="text-sm text-[#193CA5] font-bold">Daftar Sekarang</Link>
        </div>

        <div className="text-center mt-4">
          <Link href="/" className="text-sm text-gray-400 underline">Lanjut tanpa login</Link>
        </div>
      </div>
    </main>
  );
}
