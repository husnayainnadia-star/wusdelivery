import BottomNav from '@/components/navigation/BottomNav';

const PROMOS = [
  { id: 1, title: 'Diskon 50% WUSFood', desc: 'Berlaku untuk semua menu di restoran pilihan. Minimum order Rp15.000.', code: 'WUSFOOD50', expiry: '30 Nov 2026', emoji: '🍔', color: '#193CA5' },
  { id: 2, title: 'Gratis Ongkir WUSRide', desc: 'Gratis ongkos kirim untuk 3 perjalanan pertama kamu.', code: 'RIDEFREE', expiry: '15 Nov 2026', emoji: '🏍️', color: '#F59E0B' },
  { id: 3, title: 'Cashback 20% WusPay', desc: 'Bayar dengan WusPay dan dapatkan cashback 20% hingga Rp10.000.', code: 'WUSPAY20', expiry: '31 Des 2026', emoji: '💰', color: '#10B981' },
  { id: 4, title: 'Diskon WUSMart', desc: 'Belanja di WUSMart diskon 15% untuk produk kebutuhan rumah tangga.', code: 'MART15', expiry: '20 Nov 2026', emoji: '🛒', color: '#8B5CF6' },
];

export default function PromoPage() {
  return (
    <main className="min-h-screen bg-[#F5F6FA]">
      <div className="bg-[#193CA5] px-4 pt-12 pb-5 rounded-b-3xl">
        <h1 className="text-white text-lg font-bold">Promo & Diskon</h1>
        <p className="text-white/70 text-xs mt-0.5">Hemat lebih banyak dengan promo WUSDelivery</p>
      </div>

      <div className="px-4 pt-4 pb-24 space-y-3">
        {PROMOS.map(p => (
          <div key={p.id} className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <div className="p-4 flex gap-3">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl shrink-0"
                style={{ background: p.color + '15' }}>
                {p.emoji}
              </div>
              <div className="flex-1">
                <p className="font-bold text-[#171717] text-sm">{p.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{p.desc}</p>
                <p className="text-[10px] text-gray-400 mt-1.5">Berlaku s.d: {p.expiry}</p>
              </div>
            </div>
            <div className="border-t border-dashed border-gray-200 mx-4" />
            <div className="px-4 py-3 flex items-center justify-between">
              <div className="bg-[#EAF1FF] rounded-lg px-3 py-1.5">
                <span className="text-xs font-black text-[#193CA5] tracking-widest">{p.code}</span>
              </div>
              <button className="text-xs font-bold text-[#193CA5] bg-[#EAF1FF] px-4 py-1.5 rounded-lg">
                Salin Kode
              </button>
            </div>
          </div>
        ))}
      </div>
      <BottomNav />
    </main>
  );
}
