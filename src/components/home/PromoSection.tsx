import Link from 'next/link';

export default function PromoSection() {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #193CA5, #2563eb)' }}>
      <div className="flex justify-between items-center px-5 py-4">
        <div>
          <span className="bg-yellow-300 text-yellow-900 text-[9px] font-black px-2 py-0.5 rounded-full">
            PROMO SPESIAL
          </span>
          <p className="text-white/80 text-xs mt-2">Diskon s.d</p>
          <p className="text-white text-3xl font-black leading-none">50%</p>
          <p className="text-white/70 text-[11px] mt-0.5">untuk semua restoran</p>
          <Link href="/food">
            <button className="mt-3 bg-white text-[#193CA5] text-xs font-bold px-4 py-1.5 rounded-full">
              Pesan Sekarang
            </button>
          </Link>
        </div>
        <span className="text-7xl select-none">🌭</span>
      </div>
    </div>
  );
}
