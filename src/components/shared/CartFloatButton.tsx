'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

function formatRupiah(n: number) {
  return 'Rp ' + n.toLocaleString('id-ID');
}

export default function CartFloatButton() {
  const { totalItems, totalPrice } = useCart();
  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-20 left-0 right-0 px-4 z-40" style={{ maxWidth: 430, margin: '0 auto' }}>
      <Link href="/cart">
        <div className="bg-[#193CA5] rounded-2xl px-4 py-3.5 flex items-center gap-3 shadow-xl shadow-[#193CA5]/30">
          <div className="bg-white rounded-lg w-7 h-7 flex items-center justify-center shrink-0">
            <span className="text-[#193CA5] text-xs font-black">{totalItems}</span>
          </div>
          <ShoppingCart size={18} color="white" />
          <span className="text-white text-sm font-semibold flex-1 text-left">Lihat Keranjang</span>
          <span className="text-white text-sm font-bold">{formatRupiah(totalPrice)}</span>
        </div>
      </Link>
    </div>
  );
}
