import Link from 'next/link';
import { WUS_SERVICES } from '@/data';

export default function ServicesGrid() {
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-base font-bold text-[#171717]">Layanan WUS</h2>
        <button className="text-xs text-[#193CA5] font-semibold">Lihat Semua</button>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {WUS_SERVICES.map(svc => (
          <Link key={svc.id} href={svc.href}>
            <div className="bg-white rounded-2xl py-4 px-2 flex flex-col items-center gap-2 shadow-sm active:scale-95 transition-transform">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{ background: svc.bgColor }}>
                {svc.icon}
              </div>
              <span className="text-[11px] font-bold text-[#171717] text-center">{svc.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
