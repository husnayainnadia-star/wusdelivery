'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import WUSLogo from '@/components/shared/WUSLogo';

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

    const res = await signIn(form.email, form.password);
    if (res.success) {
      router.push('/');
    } else {
      setError(res.error || 'Login gagal.');
    }
  };

  const handleDemoLogin = async () => {
    const res = await signIn('demo@wusdelivery.com', 'password123');
    if (res.success) {
      router.push('/');
    } else {
      router.push('/');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        background: '#f0f4ff',
      }}
    >
      {/* ── LEFT PANEL: Branding (desktop only) ── */}
      <div
        style={{
          flex: '1 1 0',
          background: 'linear-gradient(145deg, #193CA5 0%, #1a4fd6 60%, #2563eb 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 48px',
          position: 'relative',
          overflow: 'hidden',
        }}
        className="hidden md:flex"
      >
        {/* Background decorative circles */}
        <div
          style={{
            position: 'absolute',
            top: '-80px',
            right: '-80px',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-60px',
            left: '-60px',
            width: '240px',
            height: '240px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '-100px',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)',
          }}
        />

        {/* Logo */}
        <WUSLogo size="xl" variant="white" layout="vertical" showSubtitle={true} />

        {/* Tagline */}
        <div style={{ marginTop: '40px', textAlign: 'center', color: '#fff' }}>
          <h2
            style={{
              fontSize: '26px',
              fontWeight: 800,
              marginBottom: '12px',
              lineHeight: 1.3,
            }}
          >
            Pesan Apa Aja,
            <br />
            Kami Antar!
          </h2>
          <p
            style={{
              fontSize: '14px',
              color: 'rgba(255,255,255,0.75)',
              maxWidth: '280px',
              lineHeight: 1.6,
            }}
          >
            Makanan, belanja, ojek, kirim barang — semua dalam satu aplikasi
          </p>
        </div>

        {/* Feature pills */}
        <div
          style={{
            marginTop: '40px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            width: '100%',
            maxWidth: '300px',
          }}
        >
          {[
            { icon: '🍔', text: 'WUSFood — Pesan makanan favoritmu' },
            { icon: '🛒', text: 'WUSMart — Belanja kebutuhan sehari-hari' },
            { icon: '🚗', text: 'WUSCar — Pesan kendaraan nyaman' },
            { icon: '📦', text: 'WUSSend — Kirim paket cepat & aman' },
          ].map(({ icon, text }) => (
            <div
              key={text}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '10px 16px',
                color: '#fff',
                fontSize: '13px',
                fontWeight: 500,
              }}
            >
              <span style={{ fontSize: '18px' }}>{icon}</span>
              {text}
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT PANEL: Login Form ── */}
      <div
        style={{
          flex: '0 0 auto',
          width: '100%',
          maxWidth: '480px',
          background: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px 48px',
          boxShadow: '-8px 0 32px rgba(0,0,0,0.08)',
        }}
      >
        {/* Mobile logo (only on small screens) */}
        <div className="flex md:hidden mb-6">
          <WUSLogo size="lg" variant="blue" layout="vertical" showSubtitle={true} />
        </div>

        {/* Heading */}
        <div style={{ width: '100%', maxWidth: '360px' }}>
          <h1
            style={{
              fontSize: '26px',
              fontWeight: 800,
              color: '#111827',
              marginBottom: '6px',
              textAlign: 'left',
            }}
          >
            Masuk ke Akun
          </h1>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '32px' }}>
            Selamat datang kembali! Silakan masuk untuk melanjutkan.
          </p>

          {/* Error message */}
          {error && (
            <div
              style={{
                background: '#fef2f2',
                border: '1px solid #fecaca',
                color: '#dc2626',
                fontSize: '13px',
                padding: '12px 16px',
                borderRadius: '10px',
                marginBottom: '20px',
                textAlign: 'center',
              }}
            >
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Email */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>Email</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="contoh@email.com"
                style={{
                  width: '100%',
                  border: '1.5px solid #d1d5db',
                  borderRadius: '10px',
                  padding: '13px 16px',
                  fontSize: '14px',
                  color: '#111827',
                  outline: 'none',
                  background: '#f9fafb',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => { e.target.style.borderColor = '#193CA5'; e.target.style.background = '#fff'; }}
                onBlur={e => { e.target.style.borderColor = '#d1d5db'; e.target.style.background = '#f9fafb'; }}
              />
            </div>

            {/* Password */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>Kata Sandi</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPw ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  placeholder="Masukkan kata sandi"
                  style={{
                    width: '100%',
                    border: '1.5px solid #d1d5db',
                    borderRadius: '10px',
                    padding: '13px 46px 13px 16px',
                    fontSize: '14px',
                    color: '#111827',
                    outline: 'none',
                    background: '#f9fafb',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => { e.target.style.borderColor = '#193CA5'; e.target.style.background = '#fff'; }}
                  onBlur={e => { e.target.style.borderColor = '#d1d5db'; e.target.style.background = '#f9fafb'; }}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  style={{
                    position: 'absolute',
                    right: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#9ca3af',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {/* Forgot password */}
            <div style={{ textAlign: 'right', marginTop: '-4px' }}>
              <Link
                href="/forgot-password"
                style={{ fontSize: '13px', color: '#193CA5', textDecoration: 'none', fontWeight: 500 }}
              >
                Lupa kata sandi?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                background: '#193CA5',
                color: '#fff',
                fontWeight: 700,
                fontSize: '15px',
                padding: '14px 24px',
                borderRadius: '10px',
                border: 'none',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.7 : 1,
                marginTop: '4px',
                boxShadow: '0 4px 14px rgba(25,60,165,0.3)',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => { if (!isLoading) (e.target as HTMLButtonElement).style.background = '#15328A'; }}
              onMouseLeave={e => { (e.target as HTMLButtonElement).style.background = '#193CA5'; }}
            >
              {isLoading ? 'Masuk...' : 'Masuk'}
            </button>
          </form>

          {/* Divider */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              margin: '24px 0',
              gap: '12px',
            }}
          >
            <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
            <span style={{ fontSize: '12px', color: '#9ca3af', fontWeight: 500, whiteSpace: 'nowrap' }}>
              atau masuk dengan
            </span>
            <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
          </div>

          {/* Social Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '28px' }}>
            {/* Google */}
            <button
              type="button"
              onClick={handleDemoLogin}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                border: '1.5px solid #e5e7eb',
                background: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                transition: 'box-shadow 0.2s',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            </button>

            {/* Facebook */}
            <button
              type="button"
              onClick={handleDemoLogin}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: '#1877F2',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
                color: '#fff',
              }}
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>

            {/* Twitter/X */}
            <button
              type="button"
              onClick={handleDemoLogin}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: '#1DA1F2',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
                color: '#fff',
              }}
            >
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z" />
              </svg>
            </button>
          </div>

          {/* Footer */}
          <p style={{ textAlign: 'center', fontSize: '14px', color: '#6b7280' }}>
            Belum punya akun?{' '}
            <Link
              href="/sign-up"
              style={{ color: '#193CA5', fontWeight: 700, textDecoration: 'none' }}
            >
              Daftar sekarang
            </Link>
          </p>

          <div style={{ textAlign: 'center', marginTop: '12px' }}>
            <Link
              href="/"
              style={{ fontSize: '13px', color: '#9ca3af', textDecoration: 'none' }}
            >
              Lanjut ke beranda →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
