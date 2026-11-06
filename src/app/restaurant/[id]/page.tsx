'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Star, Clock, Plus, Minus, Heart, Search, ShoppingCart } from 'lucide-react';
import { RESTAURANTS, PRODUCTS } from '@/data';
import { useCart } from '@/context/CartContext';
import CartFloatButton from '@/components/shared/CartFloatButton';

function formatRupiah(n: number) {
  return 'Rp ' + n.toLocaleString('id-ID');
}

export default function RestaurantPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const restaurant = RESTAURANTS.find(r => r.id === id);
  const products = PRODUCTS.filter(p => p.restaurantId === id);
  const categories = ['Semua', ...Array.from(new Set(products.map(p => p.category)))];

  const [activeCategory, setActiveCategory] = useState('Semua');
  const [liked, setLiked] = useState(false);
  const [search, setSearch] = useState('');
  const { cart, addItem, updateQuantity } = useCart();

  if (!restaurant) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="text-5xl">🔍</span>
          <p className="mt-3 text-gray-500">Restoran tidak ditemukan</p>
          <Link href="/food"><button className="mt-4 bg-[#193CA5] text-white px-6 py-2 rounded-xl text-sm font-semibold">Kembali</button></Link>
        </div>
      </main>
    );
  }

  const filteredProducts = products.filter(p => {
    const matchCat = activeCategory === 'Semua' || p.category === activeCategory;
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const getQty = (productId: string) => {
    const item = cart.items.find(i => i.product.id === productId);
    return item?.quantity || 0;
  };

  return (
    <main className="min-h-screen bg-[#F5F6FA]">
      {/* Hero */}
      <div className="h-52 flex items-center justify-center text-8xl relative"
        style={{ background: '#FFF3E8' }}>
        {restaurant.image}
        {/* Top bar */}
        <div className="absolute top-12 left-4 right-4 flex justify-between">
          <Link href="/food">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
              <ChevronLeft size={20} className="text-[#193CA5]" />
            </div>
          </Link>
          <button onClick={() => setLiked(!liked)}
            className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
            <Heart size={18} className={liked ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
          </button>
        </div>
        {restaurant.discount ? (
          <div className="absolute bottom-3 right-3 bg-red-500 text-white text-xs font-black px-3 py-1 rounded-full">
            Diskon {restaurant.discount}%
          </div>
        ) : null}
      </div>

      {/* Info Card */}
      <div className="bg-white rounded-t-3xl -mt-5 px-4 pt-5 pb-3 shadow-sm">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h1 className="text-xl font-black text-[#171717]">{restaurant.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Star size={13} fill="#F59E0B" color="#F59E0B" />
              <span className="text-sm font-semibold">{restaurant.rating}</span>
              <span className="text-xs text-gray-400">({restaurant.reviewCount}rb+)</span>
              <span className="text-gray-200">•</span>
              <Clock size={12} className="text-gray-400" />
              <span className="text-xs text-gray-400">{restaurant.deliveryTime}</span>
            </div>
          </div>
          <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${restaurant.isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
            {restaurant.isOpen ? 'Buka' : 'Tutup'}
          </span>
        </div>
        <p className="text-xs text-gray-500 mb-3">{restaurant.description}</p>

        {/* Search */}
        <div className="flex items-center bg-[#F5F6FA] rounded-xl px-3 py-2 gap-2 mb-3">
          <Search size={14} className="text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Cari menu..." className="flex-1 text-xs outline-none bg-transparent text-gray-700" />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {categories.map(c => (
            <button key={c} onClick={() => setActiveCategory(c)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${activeCategory === c ? 'bg-[#193CA5] text-white' : 'bg-[#EAF1FF] text-[#193CA5]'}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Menu */}
      <div className="px-4 pt-4 pb-32">
        <h2 className="font-bold text-[#171717] mb-3">Menu</h2>
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <span className="text-4xl">🍽️</span>
            <p className="text-gray-400 mt-2 text-sm">Tidak ada menu ditemukan</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredProducts.map(product => {
              const qty = getQty(product.id);
              return (
                <div key={product.id} className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm">
                  <div className="w-16 h-16 rounded-xl bg-[#FFF3E8] flex items-center justify-center text-3xl shrink-0 relative">
                    {product.image}
                    {product.isBestSeller && (
                      <span className="absolute -top-1 -right-1 bg-[#193CA5] text-white text-[7px] font-black px-1.5 py-0.5 rounded-full">
                        TERLARIS
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[#171717] text-sm">{product.name}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5 line-clamp-1">{product.description}</p>
                    <p className="text-[#193CA5] font-bold text-sm mt-1">{formatRupiah(product.price)}</p>
                  </div>
                  <div className="shrink-0">
                    {qty === 0 ? (
                      <button onClick={() => addItem(product, restaurant.id, restaurant.name)}
                        className="w-9 h-9 bg-[#193CA5] rounded-xl flex items-center justify-center active:scale-90 transition-transform">
                        <Plus size={18} className="text-white" />
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQuantity(product.id, qty - 1)}
                          className="w-8 h-8 rounded-lg border-2 border-[#193CA5] flex items-center justify-center active:scale-90 transition-transform">
                          <Minus size={13} className="text-[#193CA5]" />
                        </button>
                        <span className="text-sm font-bold text-[#171717] w-5 text-center">{qty}</span>
                        <button onClick={() => addItem(product, restaurant.id, restaurant.name)}
                          className="w-8 h-8 bg-[#193CA5] rounded-lg flex items-center justify-center active:scale-90 transition-transform">
                          <Plus size={13} className="text-white" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <CartFloatButton />
    </main>
  );
}
