'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Star, Plus, Minus, Heart, Clock, ShoppingBag } from 'lucide-react';
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
    name: 'MR Burger - Slamet Riyadi',
    rating: 4.8,
    reviews: '10rb+ ulasan',
    time: '20-25 min',
    coverImg: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&h=300&fit=crop',
    avatarImg: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=160&h=160&fit=crop',
  },
  'bobamilk': {
    name: 'BOBAMILK Fresh Tea',
    rating: 4.8,
    reviews: '8rb+ ulasan',
    time: '15-20 min',
    coverImg: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=300&fit=crop',
    avatarImg: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=160&h=160&fit=crop',
  },
  'mr-kebab': {
    name: 'MR KEBAB Arabian Taste',
    rating: 4.6,
    reviews: '5rb+ ulasan',
    time: '25-30 min',
    coverImg: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=600&h=300&fit=crop',
    avatarImg: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=160&h=160&fit=crop',
  },
};

const MENU_ITEMS = [
  {
    id: 'p1',
    name: 'Hot Dog Sosis Sapi Panggang',
    price: 20000,
    category: 'Snack',
    description: 'Sosis sapi bakar dengan mayones spesial & saus mustard',
    image: 'https://images.unsplash.com/photo-1619740455993-9d492ce96ab7?w=200&h=200&fit=crop',
  },
  {
    id: 'p2',
    name: 'Beef Burger Special Keju',
    price: 30000,
    category: 'Burger',
    description: 'Patty daging sapi tebal dengan keju cheddar leleh gurih',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop',
  },
  {
    id: 'p3',
    name: 'Chicken Burger Crispy',
    price: 20000,
    category: 'Burger',
    description: 'Fillet ayam krispi renyah dengan saus tartar istimewa',
    image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=200&h=200&fit=crop',
  },
  {
    id: 'p4',
    name: 'French Fries Gurih Renyah',
    price: 15000,
    category: 'Snack',
    description: 'Kentang goreng renyah dengan taburan bumbu rempah pilihan',
    image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=200&h=200&fit=crop',
  },
];

const CATEGORIES = ['Semua', 'Burger', 'Snack', 'Minuman'];

function fmt(n: number) {
  return 'Rp ' + n.toLocaleString('id-ID');
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
        description: item.description,
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
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col relative pb-24 select-none">
      {/* ── STATUS BAR ── */}
      <MobileStatusBar variant="dark" />

      {/* ── TOP HERO COVER ── */}
      <div className="relative h-44 bg-gray-900">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={restaurant.coverImg}
          alt={restaurant.name}
          className="w-full h-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        <div className="absolute top-3 left-4 right-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="w-8 h-8 rounded-full bg-white/95 backdrop-blur-xs flex items-center justify-center text-gray-800 shadow-md active:scale-95 transition-all"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => setLiked(!liked)}
            className="w-8 h-8 rounded-full bg-white/95 backdrop-blur-xs flex items-center justify-center text-gray-800 shadow-md active:scale-95 transition-all"
          >
            <Heart size={16} className={liked ? 'fill-red-500 text-red-500' : 'text-gray-700'} />
          </button>
        </div>
      </div>

      {/* ── RESTAURANT INFO CARD (Gojek GoFood Style) ── */}
      <div className="px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex items-center gap-3.5">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white shadow-md bg-white shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={restaurant.avatarImg}
              alt={restaurant.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0 space-y-1">
            <h1 className="text-sm font-black text-[#0F172A] truncate">{restaurant.name}</h1>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div className="flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/50">
                <Star size={11} className="fill-amber-400 text-amber-400" />
                <span className="text-[10px] font-black text-gray-800">{restaurant.rating}</span>
              </div>
              <span className="text-[10px] text-gray-400">({restaurant.reviews})</span>
              <span className="text-gray-300">•</span>
              <div className="flex items-center gap-1 text-[10px] text-gray-500">
                <Clock size={10} />
                <span>{restaurant.time}</span>
              </div>
            </div>
            <span className="inline-block text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
              Gratis Ongkir s.d Rp 10.000
            </span>
          </div>
        </div>
      </div>

      {/* ── CATEGORY PILLS ── */}
      <div className="px-4 mt-3">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {CATEGORIES.map(cat => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#193CA5] text-white shadow-xs'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── MENU ITEMS (Gojek Signature Layout) ── */}
      <main className="flex-1 px-4 mt-3 space-y-3 pb-8">
        <h2 className="text-xs font-black text-[#0F172A] uppercase tracking-wider px-1">Menu Rekomendasi</h2>

        <div className="space-y-2.5">
          {filteredMenu.map(item => {
            const qty = getQty(item.id);
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.03)] flex items-center justify-between gap-3.5"
              >
                {/* Left Description */}
                <div className="flex-1 min-w-0 space-y-1">
                  <h3 className="text-xs font-extrabold text-[#0F172A] leading-snug">{item.name}</h3>
                  <p className="text-[10px] text-gray-500 line-clamp-2 leading-relaxed">{item.description}</p>
                  <p className="text-xs font-black text-[#193CA5] pt-0.5">{fmt(item.price)}</p>
                </div>

                {/* Right Photo with Gojek-Style + Button */}
                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-100 shrink-0 shadow-inner">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />

                  {qty > 0 ? (
                    <div className="absolute inset-x-1 bottom-1 bg-white/95 rounded-lg py-1 px-1 flex items-center justify-between shadow-md border border-blue-200">
                      <button
                        onClick={() => updateQuantity(item.id, qty - 1)}
                        className="w-5 h-5 rounded bg-blue-50 text-[#193CA5] flex items-center justify-center cursor-pointer active:scale-95"
                      >
                        <Minus size={11} strokeWidth={2.5} />
                      </button>
                      <span className="text-[11px] font-black text-[#193CA5]">{qty}</span>
                      <button
                        onClick={() => updateQuantity(item.id, qty + 1)}
                        className="w-5 h-5 rounded bg-[#193CA5] text-white flex items-center justify-center cursor-pointer active:scale-95"
                      >
                        <Plus size={11} strokeWidth={2.5} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleAdd(item)}
                      className="absolute bottom-1 right-1 bg-white/95 text-[#193CA5] hover:bg-[#193CA5] hover:text-white border border-[#193CA5] rounded-lg px-2 py-0.5 text-[10px] font-black shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-0.5"
                    >
                      <Plus size={11} strokeWidth={3} /> Tambah
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* ── FIXED BOTTOM CTA (Gojek Food Cart Pill) ── */}
      {totalItems > 0 && (
        <div className="fixed bottom-3 left-1/2 -translate-x-1/2 w-full max-w-[360px] z-50 px-2 pointer-events-none">
          <Link href="/cart" className="pointer-events-auto block">
            <div className="bg-[#193CA5] hover:bg-[#15328A] active:scale-[0.98] text-white rounded-2xl p-3.5 flex items-center justify-between shadow-xl shadow-[#193CA5]/35 transition-all">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center text-white">
                  <ShoppingBag size={16} />
                </div>
                <div>
                  <span className="text-[10px] text-white/80 font-medium block">{totalItems} Menu di keranjang</span>
                  <span className="text-xs font-black text-white">{fmt(totalPrice)}</span>
                </div>
              </div>
              <span className="text-xs font-extrabold bg-white text-[#193CA5] px-3.5 py-1.5 rounded-xl shadow-xs">
                Lihat Pesanan &rsaquo;
              </span>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
