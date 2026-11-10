'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Mail, CheckCircle2 } from 'lucide-react';
import WUSLogo from '@/components/shared/WUSLogo';
import MobileStatusBar from '@/components/shared/MobileStatusBar';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return setError('Masukkan alamat email yang valid.');
    }
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);
    setSent(true);
  };

  return (
    <main className="min-h-screen bg-white flex flex-col justify-between select-none">
      {/* Mobile Status Bar */}
      <MobileStatusBar variant="dark" />

      {/* Top Header Back Button */}
      <div className="px-5 pt-2">
        <button
          onClick={() => router.push('/sign-in')}
          className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center text-gray-700 active:scale-95"
        >
          <ChevronLeft size={20} />
        </button>
      </div>

      <div className="flex-1 px-7 pt-2 pb-8 flex flex-col justify-center max-w-sm mx-auto w-full">
        {/* Top Logo */}
        <div className="flex justify-center mb-5">
          <WUSLogo size="lg" variant="blue" showSubtitle={true} />
        </div>

        {sent ? (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-blue-50 text-[#193CA5] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} />
            </div>
            <h1 className="text-xl font-bold text-[#171717] mb-2">Instruksi Terkirim!</h1>
            <p className="text-xs text-gray-500 mb-6 leading-relaxed">
              Tautan pemulihan kata sandi telah dikirimkan ke <strong className="text-gray-800">{email}</strong>.
            </p>

            <Link href="/sign-in">
              <button className="w-full bg-[#193CA5] hover:bg-[#15328A] text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-md shadow-[#193CA5]/25">
                Kembali ke Halaman Masuk
              </button>
            </Link>
          </div>
        ) : (
          <>
            {/* Heading */}
            <h1 className="text-xl font-bold text-[#171717] text-center mb-2">
              Lupa Kata Sandi
            </h1>
            <p className="text-xs text-gray-500 text-center mb-6 leading-relaxed">
              Masukkan alamat email akunmu untuk menerima tautan pemulihan kata sandi.
            </p>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-xs px-3.5 py-2.5 rounded-xl mb-4 text-center">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full bg-white border border-gray-300 rounded-xl px-5 py-3.5 text-sm text-[#171717] placeholder:text-gray-400 outline-none focus:border-[#193CA5] transition-colors pr-11"
                  style={{ paddingLeft: '18px', paddingRight: '44px', paddingTop: '13px', paddingBottom: '13px' }}
                />
                <Mail size={17} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#193CA5] hover:bg-[#15328A] active:scale-[0.98] text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-md shadow-[#193CA5]/25 disabled:opacity-70"
              >
                {loading ? 'Mengirim...' : 'Kirim Tautan Pemulihan'}
              </button>
            </form>

            <div className="text-center mt-6">
              <Link href="/sign-in" className="text-xs text-[#193CA5] font-semibold hover:underline">
                &lsaquo; Kembali ke halaman masuk
              </Link>
            </div>
          </>
        )}
      </div>

      <div className="h-6" />
    </main>
  );
}
