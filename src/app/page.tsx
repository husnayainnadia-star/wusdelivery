'use client';

import Link from 'next/link';
import { useState } from 'react';
import { MapPin, Bell, Search, ChevronDown, ChevronRight, Star, Clock, Home, Tag, ShoppingBag, MessageCircle, User } from 'lucide-react';

const SERVICES = [
  { id: 'food',  name: 'WUSFood',  emoji: '🍔', color: '#FF6B35', bg: '#FFF3EE', href: '/food' },
  { id: 'mart',  name: 'WUSMart',  emoji: '🛒', color: '#193CA5', bg: '#EAF1FF', href: '/services/mart' },
  { id: 'car',   name: 'WUSCar',   emoji: '🚗', color: '#10B981', bg: '#ECFDF5', href: '/services/car' },
  { id: 'ride',  name: 'WUSRide',  emoji: '🏍️', color: '#F59E0B', bg: '#FFFBEB', href: '/services/ride' },
  { id: 'move',  name: 'WUSMove',  emoji: '📦', color: '#8B5CF6', bg: '#F5F3FF', href: '/services/move' },
  { id: 'send',  name: 'WUSSend',  emoji: '📨', color: '#EF4444', bg: '#FEF2F2', href: '/services/send' },
];

const RESTAURANTS = [
  { id: 'mr-burger', name: 'MR Burger',  emoji: '🍔', bg: '#FFF3E8', rating: 4.8, reviews: '100rb+', time: '± 30 min' },
  { id: 'bobamilk',  name: 'BOBAMILK',   emoji: '🧋', bg: '#F0F4FF', rating: 4.8, reviews: '100rb+', time: '± 30 min' },
  { id: 'mr-kebab',  name: 'MR KEBAB',   emoji: '🌯', bg: '#FFF8E8', rating: 4.5, reviews: '80rb+',  time: '± 30 min' },
];

const FOOD_IMAGES: Record<string, string> = {
  'mr-burger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=120&h=120&fit=crop',
  'bobamilk':  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=120&fit=crop',
  'mr-kebab':  'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=120&h=120&fit=crop',
};

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-[#f5f6fa] flex flex-col">

      {/* ── HEADER ── */}
      <div className="bg-[#193CA5] px-4 pt-10 pb-4">
        {/* top row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            {/* Logo */}
            <div className="bg-white rounded-xl px-2.5 py-1.5">
              <span className="text-[#193CA5] font-black text-sm tracking-widest leading-none block">WUS</span>
              <span className="text-[#193CA5]/60 font-bold text-[7px] tracking-widest leading-none block">DELIVERY</span>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <MapPin size={10} className="text-white/60" />
                <span className="text-white/60 text-[10px]">Antar ke:</span>
              </div>
              <button className="flex items-center gap-1">
                <span className="text-white text-[11px] font-semibold">Jl. Melati No.12, Surakarta</span>
                <ChevronDown size={11} className="text-white" />
              </button>
            </div>
          </div>
          <Link href="/notifications">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center relative">
              <Bell size={16} className="text-white" />
              <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-red-400 rounded-full" />
            </div>
          </Link>
        </div>

        {/* Search */}
        <div className="flex items-center bg-white rounded-2xl px-3 py-2.5 gap-2">
          <Search size={14} className="text-gray-400 shrink-0" />
          <input placeholder="Cari makanan, minuman, atau layanan"
            className="flex-1 text-xs outline-none text-gray-600 placeholder:text-gray-400" />
        </div>
      </div>

      {/* ── SCROLLABLE BODY ── */}
      <div className="flex-1 overflow-y-auto pb-20">

        {/* Hero Banner */}
        <div className="bg-[#193CA5] px-4 pb-5 rounded-b-3xl">
          <div className="bg-[#1432A0] rounded-2xl px-4 py-4 flex justify-between items-center">
            <div className="flex-1">
              <p className="text-white font-bold text-sm leading-tight">Pesan Apa Aja</p>
              <p className="text-white font-black text-base leading-tight">di WUS Delivery</p>
              <p className="text-white/70 text-[11px] mt-0.5">lebih hemat dengan!</p>
              <Link href="/food">
                <button className="mt-3 bg-white text-[#193CA5] text-[11px] font-bold px-4 py-1.5 rounded-full">
                  Pesan Sekarang
                </button>
              </Link>
            </div>
            {/* Courier illustration */}
            <div className="w-24 h-20 flex items-center justify-center text-5xl">🛵</div>
          </div>
        </div>

        {/* Services */}
        <div className="px-4 pt-4">
          <div className="flex justify-between items-center mb-3">
            <span className="font-bold text-[13px] text-[#171717]">Layanan WUS</span>
            <button className="text-[11px] text-[#193CA5] font-semibold flex items-center gap-0.5">
              Lihat Semua <ChevronRight size={11} />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {SERVICES.map(s => (
              <Link key={s.id} href={s.href}>
                <div className="bg-white rounded-2xl py-3.5 px-2 flex flex-col items-center gap-2 shadow-sm active:scale-95 transition-transform">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl" style={{ background: s.bg }}>
                    {s.emoji}
                  </div>
                  <span className="text-[10px] font-bold text-[#171717]">{s.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Promo Banner */}
        <div className="px-4 pt-4">
          <div className="rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #193CA5 0%, #2563eb 100%)' }}>
            <div className="px-5 py-4 flex justify-between items-center">
              <div>
                <span className="bg-yellow-300 text-yellow-900 text-[9px] font-black px-2 py-0.5 rounded-full">PROMO SPESIAL</span>
                <p className="text-white/80 text-[11px] mt-2">Diskon s.d</p>
                <p className="text-white text-3xl font-black leading-none">50%</p>
                <p className="text-white/70 text-[10px] mt-0.5">untuk semua layanan</p>
              </div>
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=120&h=120&fit=crop"
                  alt="food" className="w-24 h-20 object-cover rounded-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Nearby Restaurants */}
        <div className="px-4 pt-4">
          <div className="flex justify-between items-center mb-3">
            <span className="font-bold text-[13px] text-[#171717]">Restoran Terdekat</span>
            <Link href="/food">
              <span className="text-[11px] text-[#193CA5] font-semibold">Lihat Semua &rsaquo;</span>
            </Link>
          </div>
          <div className="space-y-2.5">
            {RESTAURANTS.map(r => (
              <Link key={r.id} href={`/restaurant/${r.id}`}>
                <div className="bg-white rounded-2xl p-3.5 flex items-center gap-3 shadow-sm active:scale-[0.98] transition-transform">
                  <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
                    <img src={FOOD_IMAGES[r.id]} alt={r.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[#171717] text-sm">{r.name}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star size={10} fill="#F59E0B" color="#F59E0B" />
                      <span className="text-[11px] font-semibold text-gray-700">{r.rating}</span>
                      <span className="text-[10px] text-gray-400">({r.reviews})</span>
                      <span className="text-gray-200 text-xs">•</span>
                      <Clock size={10} className="text-gray-400" />
                      <span className="text-[10px] text-gray-400">{r.time}</span>
                    </div>
                  </div>
                  <ChevronRight size={14} className="text-gray-300 shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="h-4" />
      </div>

      {/* ── BOTTOM NAV ── */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white border-t border-gray-100 z-50">
        <div className="flex items-center justify-around px-2 pt-2 pb-4">
          {[
            { tab: 'home',    icon: Home,        label: 'Beranda',  href: '/' },
            { tab: 'promo',   icon: Tag,         label: 'Promo',    href: '/promo' },
            { tab: 'orders',  icon: ShoppingBag, label: 'Pesanan',  href: '/orders' },
            { tab: 'chat',    icon: MessageCircle, label: 'Chat',   href: '/chat' },
            { tab: 'profile', icon: User,        label: 'Profil',   href: '/profile' },
          ].map(({ tab, icon: Icon, label, href }) => (
            <Link key={tab} href={href} onClick={() => setActiveTab(tab)}
              className="flex flex-col items-center gap-0.5 px-3 py-1"
              style={{ color: activeTab === tab ? '#193CA5' : '#9CA3AF' }}>
              <Icon size={20} strokeWidth={activeTab === tab ? 2.5 : 1.8} />
              <span className="text-[9px] font-semibold">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
