'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft, Package, Tag, Info, CheckCheck } from 'lucide-react';
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
    <div className="min-h-screen bg-[#F5F6FA] flex flex-col relative pb-10 select-none">
      {/* ── STATUS BAR ── */}
      <MobileStatusBar variant="dark" />

      {/* ── HEADER ── */}
      <div className="bg-white px-5 pt-2 pb-3.5 flex items-center justify-between border-b border-gray-100 shadow-2xs">
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

      {/* ── CONTENT ── */}
      <div className="flex-1 min-h-0 overflow-y-auto px-5 pt-4 space-y-3 pb-8">
        {SAMPLE_NOTIFICATIONS.map(n => {
          const cfg = TYPE_CONFIG[n.type];
          const Icon = cfg.icon;
          return (
            <div
              key={n.id}
              className={`bg-white rounded-2xl p-4 border border-gray-150 shadow-2xs flex gap-3.5 ${
                !n.isRead ? 'border-l-4 border-l-[#193CA5]' : ''
              }`}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: cfg.bg }}
              >
                <Icon size={18} style={{ color: cfg.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <h2 className="font-bold text-[#111827] text-xs truncate">{n.title}</h2>
                  {!n.isRead && (
                    <span className="w-2 h-2 bg-[#193CA5] rounded-full shrink-0 mt-1" />
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{n.message}</p>
                <p className="text-[10px] text-gray-400 mt-1.5">
                  {new Date(n.createdAt).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
