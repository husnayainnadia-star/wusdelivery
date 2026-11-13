'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

function fmt(n: number) {
  return 'Rp. ' + n.toLocaleString('id-ID');
}

export default function CartFloatButton() {
  const { totalItems, totalPrice } = useCart();
  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-4 left-0 right-0 w-full z-40 px-4 pointer-events-none">
      <div className="max-w-lg mx-auto pointer-events-auto">
        <Link href="/cart">
          <div className="bg-[#193CA5] hover:bg-[#15328A] rounded-2xl px-5 py-4 flex items-center justify-between shadow-2xl shadow-[#193CA5]/40 text-white transition-all active:scale-98 cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="bg-white rounded-xl w-8 h-8 flex items-center justify-center shrink-0">
                <span className="text-[#193CA5] text-xs font-black">{totalItems}</span>
              </div>
              <span className="text-sm font-bold">Lihat Keranjang Belanja</span>
            </div>
            <span className="text-sm font-black">{fmt(totalPrice)} &rsaquo;</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
