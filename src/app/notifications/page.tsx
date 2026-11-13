'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft, Package, Tag, Info, CheckCheck, Bell } from 'lucide-react';
import { SAMPLE_NOTIFICATIONS } from '@/data';
import MobileStatusBar from '@/components/shared/MobileStatusBar';

const TYPE_CONFIG = {
  order: { icon: Package, color: '#193CA5', bg: '#EAF1FF' },
  promo: { icon: Tag, color: '#F59E0B', bg: '#FFFBEB' },
  info: { icon: Info, color: '#8B5CF6', bg: '#F5F3FF' },
};

export default function NotificationsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col pb-24 md:pb-12 select-none">
      <MobileStatusBar />

      {/* ── MOBILE HEADER (Hidden on desktop) ── */}
      <div className="md:hidden bg-white px-5 pt-3 pb-3.5 flex items-center justify-between border-b border-gray-100 shadow-2xs">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center text-gray-700 active:scale-95"
        >
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-base font-extrabold text-[#111827]">Notifikasi</h1>
        <button className="text-xs text-[#193CA5] font-semibold flex items-center gap-1">
          <CheckCheck size={14} />
          Baca Semua
        </button>
      </div>

      {/* ── MAIN CONTENT (Laptop/Desktop Responsive Layout) ── */}
      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-5 md:py-8 flex-1 space-y-6">
        <div className="hidden md:flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-[#111827] flex items-center gap-2.5">
              <Bell className="text-[#193CA5]" /> Pemberitahuan & Update
            </h1>
            <p className="text-sm text-gray-500 mt-1">Status pesanan terkini, voucher promo diskon, dan info layanan</p>
          </div>
          <button className="text-xs font-bold text-[#193CA5] bg-blue-50 border border-blue-200 px-4 py-2 rounded-xl hover:bg-blue-100 transition-colors flex items-center gap-1.5 cursor-pointer">
            <CheckCheck size={14} /> Tandai Semua Dibaca
          </button>
        </div>

        <div className="space-y-3.5">
          {SAMPLE_NOTIFICATIONS.map(n => {
            const cfg = TYPE_CONFIG[n.type];
            const Icon = cfg.icon;
            return (
              <div
                key={n.id}
                className={`bg-white rounded-2xl p-5 border border-gray-150 shadow-xs hover:shadow-md transition-all flex items-start gap-4 ${
                  !n.isRead ? 'border-l-4 border-l-[#193CA5]' : ''
                }`}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-2xs"
                  style={{ backgroundColor: cfg.bg }}
                >
                  <Icon size={20} style={{ color: cfg.color }} />
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex justify-between items-start gap-2">
                    <h2 className="font-extrabold text-[#111827] text-sm truncate">{n.title}</h2>
                    {!n.isRead && (
                      <span className="w-2.5 h-2.5 bg-[#193CA5] rounded-full shrink-0 mt-1" />
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{n.message}</p>
                  <p className="text-[11px] text-gray-400 pt-1 font-medium">
                    {new Date(n.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
