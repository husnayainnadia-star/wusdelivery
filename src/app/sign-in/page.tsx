'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import WUSLogo from '@/components/shared/WUSLogo';
import MobileStatusBar from '@/components/shared/MobileStatusBar';

export default function SignInPage() {
  const router = useRouter();
  const { signIn, isLoading } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.email) return setError('Email harus diisi.');
    if (!form.password) return setError('Kata sandi harus diisi.');

    // In demo mode, if user doesn't have an account yet, allow quick bypass or regular sign in
    const res = await signIn(form.email, form.password);
    if (res.success) {
      router.push('/');
    } else {
      // If demo user not found, give option to sign up or log in as guest demo
      setError(res.error || 'Login gagal.');
    }
  };

  const handleDemoLogin = async () => {
    // Quick demo login
    const res = await signIn('demo@wusdelivery.com', 'password123');
    if (res.success) {
      router.push('/');
    } else {
      router.push('/');
    }
  };

  return (
    <main className="min-h-screen bg-white flex flex-col justify-between">
      {/* Mobile Status Bar */}
      <MobileStatusBar variant="dark" />

      <div className="flex-1 px-7 pt-4 pb-8 flex flex-col justify-center max-w-sm mx-auto w-full">
        {/* Top Logo */}
        <div className="flex justify-center mb-5">
          <WUSLogo size="lg" variant="blue" showSubtitle={true} />
        </div>

        {/* Heading */}
        <h1 className="text-xl font-bold text-[#171717] text-center mb-6">
          Log in to your Account
        </h1>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-xs px-3.5 py-2.5 rounded-xl mb-4 text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email input */}
          <div>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="Email"
              className="w-full bg-white border border-gray-300 rounded-xl px-5 py-3.5 text-sm text-[#171717] placeholder:text-gray-400 outline-none focus:border-[#193CA5] transition-colors"
              style={{ paddingLeft: '18px', paddingRight: '18px', paddingTop: '13px', paddingBottom: '13px' }}
            />
          </div>

          {/* Password input */}
          <div className="relative">
            <input
              type={showPw ? 'text' : 'password'}
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              placeholder="Password"
              className="w-full bg-white border border-gray-300 rounded-xl px-5 py-3.5 text-sm text-[#171717] placeholder:text-gray-400 outline-none focus:border-[#193CA5] transition-colors pr-11"
              style={{ paddingLeft: '18px', paddingRight: '44px', paddingTop: '13px', paddingBottom: '13px' }}
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>

          {/* Forgot password link */}
          <div className="flex justify-end pt-0.5">
            <Link href="/forgot-password" className="text-xs text-[#193CA5] hover:underline">
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#193CA5] hover:bg-[#15328A] active:scale-[0.98] text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-md shadow-[#193CA5]/25 disabled:opacity-70 mt-1"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Divider: -or Sign In with- */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="px-3 text-xs text-gray-400 font-medium">-or Sign In with-</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Social Buttons */}
        <div className="flex items-center justify-center gap-4 mb-6">
          {/* Google */}
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all shadow-sm"
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
          </button>

          {/* Facebook */}
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-95 active:scale-95 transition-all shadow-sm"
          >
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </button>

          {/* Twitter / X */}
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-10 h-10 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center hover:opacity-95 active:scale-95 transition-all shadow-sm"
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z" />
            </svg>
          </button>
        </div>

        {/* Footer text */}
        <p className="text-center text-xs text-gray-500">
          Don&apos;t have an account?{' '}
          <Link href="/sign-up" className="text-[#193CA5] font-semibold hover:underline">
            Sign up
          </Link>
        </p>

        {/* Direct Guest Explore */}
        <div className="text-center mt-3">
          <Link href="/" className="text-xs text-gray-400 hover:text-gray-600">
            Lanjut ke beranda &rsaquo;
          </Link>
        </div>
      </div>
    </main>
  );
}
