'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import WUSLogo from '@/components/shared/WUSLogo';

export default function SignUpPage() {
  const router = useRouter();
  const { signUp, isLoading } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.name.trim()) return setError('Nama lengkap harus diisi.');
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) return setError('Format email tidak valid.');
    if (!form.phone || form.phone.length < 10) return setError('Nomor telepon tidak valid.');
    if (form.password.length < 6) return setError('Kata sandi minimal 6 karakter.');
    if (form.password !== form.confirm) return setError('Kata sandi tidak cocok.');
    if (!agreed) return setError('Kamu harus menyetujui syarat & ketentuan.');

    const res = await signUp({ name: form.name, email: form.email, phone: form.phone, password: form.password });
    if (res.success) router.push('/');
    else setError(res.error || 'Pendaftaran gagal.');
  };

  const fields = [
    { key: 'name', label: 'Nama Lengkap', type: 'text', placeholder: 'Nama lengkap kamu', icon: User },
    { key: 'email', label: 'Email', type: 'email', placeholder: 'email@contoh.com', icon: Mail },
    { key: 'phone', label: 'Nomor Telepon', type: 'tel', placeholder: '08xxxxxxxxxx', icon: Phone },
  ];

  return (
    <main className="min-h-screen bg-[#F5F6FA] flex flex-col">
      <div className="bg-[#193CA5] h-44 rounded-b-[3rem] flex flex-col items-center justify-center gap-2">
        <WUSLogo size="md" variant="white" />
      </div>

      <div className="flex-1 px-6 pt-6 pb-8">
        <h1 className="text-2xl font-black text-[#171717] mb-1">Buat Akun WUSDelivery</h1>
        <p className="text-sm text-gray-500 mb-5">Daftar sekarang dan nikmati kemudahan berbagai layanan.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map(({ key, label, type, placeholder, icon: Icon }) => (
            <div key={key}>
              <label className="text-xs font-semibold text-gray-600 mb-1.5 block">{label}</label>
              <div className="flex items-center bg-white border-2 border-gray-100 rounded-xl px-4 py-3 gap-3 focus-within:border-[#193CA5] transition-colors">
                <Icon size={16} className="text-gray-400 shrink-0" />
                <input type={type} value={form[key as keyof typeof form]} onChange={set(key)}
                  placeholder={placeholder} className="flex-1 text-sm outline-none text-gray-700" />
              </div>
            </div>
          ))}

          {/* Password */}
          {[{ key: 'password', label: 'Kata Sandi', show: showPw, toggle: () => setShowPw(!showPw) },
            { key: 'confirm', label: 'Konfirmasi Kata Sandi', show: showConfirm, toggle: () => setShowConfirm(!showConfirm) }
          ].map(({ key, label, show, toggle }) => (
            <div key={key}>
              <label className="text-xs font-semibold text-gray-600 mb-1.5 block">{label}</label>
              <div className="flex items-center bg-white border-2 border-gray-100 rounded-xl px-4 py-3 gap-3 focus-within:border-[#193CA5] transition-colors">
                <Lock size={16} className="text-gray-400 shrink-0" />
                <input type={show ? 'text' : 'password'} value={form[key as keyof typeof form]} onChange={set(key)}
                  placeholder="Minimal 6 karakter" className="flex-1 text-sm outline-none text-gray-700" />
                <button type="button" onClick={toggle}>
                  {show ? <EyeOff size={16} className="text-gray-400" /> : <Eye size={16} className="text-gray-400" />}
                </button>
              </div>
            </div>
          ))}

          {/* Terms */}
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)}
              className="w-4 h-4 mt-0.5 accent-[#193CA5] shrink-0" />
            <span className="text-xs text-gray-600">
              Saya menyetujui{' '}
              <span className="text-[#193CA5] font-semibold">Syarat & Ketentuan</span>
              {' '}dan{' '}
              <span className="text-[#193CA5] font-semibold">Kebijakan Privasi</span>
              {' '}WUSDelivery.
            </span>
          </label>

          {error && <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-2.5"><p className="text-xs text-red-600 font-medium">{error}</p></div>}

          <button type="submit" disabled={isLoading}
            className="w-full bg-[#193CA5] text-white py-4 rounded-2xl font-bold text-sm shadow-lg shadow-[#193CA5]/30 disabled:opacity-70 flex items-center justify-center gap-2">
            {isLoading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Mendaftar...</> : 'Daftar Sekarang'}
          </button>
        </form>

        <div className="text-center mt-5">
          <span className="text-sm text-gray-500">Sudah punya akun? </span>
          <Link href="/sign-in" className="text-sm text-[#193CA5] font-bold">Masuk</Link>
        </div>
      </div>
    </main>
  );
}
