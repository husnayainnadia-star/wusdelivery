'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

function fmt(n: number) { return 'Rp. ' + n.toLocaleString('id-ID'); }

export default function CartFloatButton() {
  const { totalItems, totalPrice } = useCart();
  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] px-4 pb-5 pt-3"
      style={{ background: 'linear-gradient(to top, #f5f6fa 60%, transparent)' }}>
      <Link href="/cart">
        <div className="bg-[#193CA5] rounded-2xl px-4 py-3.5 flex items-center gap-3 shadow-xl shadow-[#193CA5]/30">
          <div className="bg-white rounded-lg w-7 h-7 flex items-center justify-center shrink-0">
            <span className="text-[#193CA5] text-[11px] font-black">{totalItems}</span>
          </div>
          <span className="text-white text-xs font-bold flex-1">Tambahkan ke keranjang</span>
          <span className="text-white text-xs font-black">{fmt(totalPrice)}</span>
        </div>
      </Link>
    </div>
  );
}
