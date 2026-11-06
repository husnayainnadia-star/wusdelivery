import { Bell, Package, Tag, Info } from 'lucide-react';
import { SAMPLE_NOTIFICATIONS } from '@/data';
import Link from 'next/link';

const TYPE_CONFIG = {
  order: { icon: Package, color: '#193CA5', bg: '#EAF1FF' },
  promo: { icon: Tag, color: '#F59E0B', bg: '#FFFBEB' },
  info: { icon: Info, color: '#8B5CF6', bg: '#F5F3FF' },
};

export default function NotificationsPage() {
  return (
    <main className="min-h-screen bg-[#F5F6FA]">
      <div className="bg-[#193CA5] px-4 pt-12 pb-5 flex items-center gap-3 rounded-b-3xl">
        <Link href="/">
          <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
            <Bell size={18} className="text-white" />
          </div>
        </Link>
        <h1 className="text-white text-lg font-bold">Notifikasi</h1>
      </div>

      <div className="px-4 pt-4 pb-8 space-y-3">
        {SAMPLE_NOTIFICATIONS.map(n => {
          const cfg = TYPE_CONFIG[n.type];
          const Icon = cfg.icon;
          return (
            <div key={n.id} className={`bg-white rounded-2xl p-4 shadow-sm flex gap-3 ${!n.isRead ? 'border-l-4 border-[#193CA5]' : ''}`}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: cfg.bg }}>
                <Icon size={16} style={{ color: cfg.color }} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <p className="font-bold text-[#171717] text-sm">{n.title}</p>
                  {!n.isRead && <div className="w-2 h-2 bg-[#193CA5] rounded-full shrink-0 mt-1" />}
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{n.message}</p>
                <p className="text-[10px] text-gray-300 mt-1.5">
                  {new Date(n.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
