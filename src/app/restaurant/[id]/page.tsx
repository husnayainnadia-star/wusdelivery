'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Star, Plus, Minus, Heart, Clock } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import MobileStatusBar from '@/components/shared/MobileStatusBar';

const RESTAURANTS_DATA: Record<string, {
  name: string;
  rating: number;
  reviews: string;
  time: string;
  coverImg: string;
  avatarImg: string;
}> = {
  'mr-burger': {
    name: 'MR Burger',
    rating: 4.8,
    reviews: '100rb+',
    time: '± 30 min',
    coverImg: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&h=300&fit=crop',
    avatarImg: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=160&h=160&fit=crop',
  },
  'bobamilk': {
    name: 'BOBAMILK',
    rating: 4.8,
    reviews: '100rb+',
    time: '± 25 min',
    coverImg: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=300&fit=crop',
    avatarImg: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=160&h=160&fit=crop',
  },
  'mr-kebab': {
    name: 'MR KEBAB',
    rating: 4.5,
    reviews: '80rb+',
    time: '± 35 min',
    coverImg: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=600&h=300&fit=crop',
    avatarImg: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=160&h=160&fit=crop',
  },
};

const MENU_ITEMS = [
  {
    id: 'p1',
    name: 'Hot Dog',
    price: 20000,
    category: 'Snack',
    image: 'https://images.unsplash.com/photo-1619740455993-9d492ce96ab7?w=160&h=160&fit=crop',
  },
  {
    id: 'p2',
    name: 'Beef Burger',
    price: 30000,
    category: 'Burger',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=160&h=160&fit=crop',
  },
  {
    id: 'p3',
    name: 'Chicken Burger',
    price: 20000,
    category: 'Burger',
    image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=160&h=160&fit=crop',
  },
  {
    id: 'p4',
    name: 'French Fries',
    price: 15000,
    category: 'Snack',
    image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=160&h=160&fit=crop',
  },
];

const CATEGORIES = ['Semua', 'Burger', 'Snack', 'Minuman'];

function fmt(n: number) {
  return 'Rp. ' + n.toLocaleString('id-ID');
}

export default function RestaurantDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const restaurant = RESTAURANTS_DATA[id] || RESTAURANTS_DATA['mr-burger'];

  const [activeCategory, setActiveCategory] = useState('Semua');
  const [liked, setLiked] = useState(false);
  const { cart, addItem, updateQuantity, totalItems, totalPrice } = useCart();

  const filteredMenu = MENU_ITEMS.filter(item => {
    return activeCategory === 'Semua' || item.category === activeCategory;
  });

  const getQty = (pid: string) => {
    return cart.items.find(i => i.product.id === pid)?.quantity || 0;
  };

  const handleAdd = (item: (typeof MENU_ITEMS)[0]) => {
    addItem(
      {
        id: item.id,
        restaurantId: id,
        name: item.name,
        description: '',
        price: item.price,
        image: item.image,
        category: item.category,
        isAvailable: true,
      },
      id,
      restaurant.name
    );
  };

  return (
    <div className="min-h-screen bg-[#F5F6FA] flex flex-col relative pb-28 select-none">
      {/* ── STATUS BAR ── */}
      <MobileStatusBar variant="dark" />

      {/* ── HEADER COVER & CONTROLS ── */}
      <div className="relative h-48 bg-gray-900">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={restaurant.coverImg}
          alt={restaurant.name}
          className="w-full h-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="absolute top-3 left-4 right-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-gray-800 shadow-md active:scale-95 transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => setLiked(!liked)}
            className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-gray-800 shadow-md active:scale-95 transition-all"
          >
            <Heart size={18} className={liked ? 'fill-red-500 text-red-500' : 'text-gray-700'} />
          </button>
        </div>
      </div>

      {/* ── RESTAURANT PROFILE CARD ── */}
      <div className="px-5 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-150 flex items-center gap-3.5">
          <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-white shadow-md bg-white shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={restaurant.avatarImg}
              alt={restaurant.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0 space-y-1">
            <h1 className="text-base font-extrabold text-[#111827] truncate">{restaurant.name}</h1>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div className="flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/50">
                <Star size={11} className="fill-amber-400 text-amber-400" />
                <span className="text-[11px] font-bold text-gray-800">{restaurant.rating}</span>
              </div>
              <span className="text-[11px] text-gray-400">({restaurant.reviews})</span>
              <span className="text-gray-300">•</span>
              <div className="flex items-center gap-1 text-[11px] text-gray-500">
                <Clock size={11} />
                <span>{restaurant.time}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CATEGORY PILLS ── */}
      <div className="px-5 mt-4">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {CATEGORIES.map(cat => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#193CA5] text-white shadow-2xs'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── MENU LIST WITH GENEROUS BOX PADDING ── */}
      <main className="flex-1 px-5 mt-4 space-y-3 pb-8">
        <h2 className="text-xs font-extrabold text-[#111827] uppercase tracking-wider px-1">Menu</h2>

        <div className="space-y-3">
          {filteredMenu.map(item => {
            const qty = getQty(item.id);
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-3.5 border border-gray-150 shadow-2xs flex items-center justify-between gap-3.5"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 shrink-0 shadow-inner">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs font-bold text-[#111827] truncate">{item.name}</h3>
                    <p className="text-xs font-extrabold text-[#193CA5] mt-1">{fmt(item.price)}</p>
                  </div>
                </div>

                {/* Add / Stepper Button */}
                <div className="shrink-0">
                  {qty > 0 ? (
                    <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-xl px-2 py-1">
                      <button
                        onClick={() => updateQuantity(item.id, qty - 1)}
                        className="w-6 h-6 rounded-md bg-white text-[#193CA5] border border-blue-200 flex items-center justify-center cursor-pointer active:scale-95"
                      >
                        <Minus size={12} strokeWidth={2.5} />
                      </button>
                      <span className="text-xs font-bold text-[#193CA5] min-w-4 text-center">{qty}</span>
                      <button
                        onClick={() => updateQuantity(item.id, qty + 1)}
                        className="w-6 h-6 rounded-md bg-[#193CA5] text-white flex items-center justify-center cursor-pointer active:scale-95"
                      >
                        <Plus size={12} strokeWidth={2.5} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleAdd(item)}
                      className="w-8 h-8 rounded-full bg-[#193CA5] hover:bg-[#15328A] text-white flex items-center justify-center shadow-md shadow-[#193CA5]/25 active:scale-90 transition-all cursor-pointer"
                    >
                      <Plus size={16} strokeWidth={2.5} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* ── FIXED BOTTOM CTA ── */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] px-5 py-3.5 bg-white border-t border-gray-150 z-50 shadow-lg">
        <Link href="/cart">
          <button className="w-full bg-[#193CA5] hover:bg-[#15328A] active:scale-[0.98] text-white font-extrabold py-3.5 rounded-full text-xs transition-all shadow-md shadow-[#193CA5]/25 flex items-center justify-between px-5 cursor-pointer">
            <span>{totalItems > 0 ? `${totalItems} Menu Dipilih` : 'Tambahkan ke Keranjang'}</span>
            <span>{totalItems > 0 ? fmt(totalPrice) : 'Lihat Keranjang &rsaquo;'}</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
