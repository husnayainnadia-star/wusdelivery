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
    name: 'MR Burger',
    rating: 4.8,
    reviews: '100rb+',
    time: '± 30 min',
    coverImg: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=1200&h=400&fit=crop',
    avatarImg: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop',
  },
  'bobamilk': {
    name: 'BOBAMILK',
    rating: 4.8,
    reviews: '100rb+',
    time: '± 30 min',
    coverImg: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=400&fit=crop',
    avatarImg: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop',
  },
  'mr-kebab': {
    name: 'MR KEBAB',
    rating: 4.5,
    reviews: '80rb+',
    time: '± 30 min',
    coverImg: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=1200&h=400&fit=crop',
    avatarImg: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=200&h=200&fit=crop',
  },
};

const MENU_ITEMS = [
  {
    id: 'p1',
    name: 'Hot Dog',
    price: 20000,
    category: 'Snack',
    description: 'Sosis sapi bakar dengan mayones spesial & saus mustard',
    image: 'https://images.unsplash.com/photo-1619740455993-9d492ce96ab7?w=200&h=200&fit=crop',
  },
  {
    id: 'p2',
    name: 'Beef Burger',
    price: 30000,
    category: 'Burger',
    description: 'Patty daging sapi tebal dengan keju cheddar leleh',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop',
  },
  {
    id: 'p3',
    name: 'Chicken Burger',
    price: 20000,
    category: 'Burger',
    description: 'Fillet ayam krispi renyah dengan selada segar',
    image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=200&h=200&fit=crop',
  },
  {
    id: 'p4',
    name: 'French Fries',
    price: 15000,
    category: 'Snack',
    description: 'Kentang goreng gurih renyah dengan bumbu istimewa',
    image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=200&h=200&fit=crop',
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
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col pb-28 md:pb-24 select-none">
      <MobileStatusBar />

      {/* ── MAIN CONTENT (Laptop/Desktop Responsive Layout) ── */}
      <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 md:py-8 space-y-6">
        {/* Restaurant Hero Cover Card */}
        <div className="relative rounded-3xl overflow-hidden shadow-sm bg-gray-900 h-52 sm:h-64 md:h-80">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={restaurant.coverImg}
            alt={restaurant.name}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

          {/* Floating Action Buttons */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="w-10 h-10 rounded-2xl bg-white/90 backdrop-blur-md flex items-center justify-center text-gray-800 shadow-md hover:bg-white active:scale-95 transition-all"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={() => setLiked(!liked)}
              className="w-10 h-10 rounded-2xl bg-white/90 backdrop-blur-md flex items-center justify-center text-gray-800 shadow-md hover:bg-white active:scale-95 transition-all"
            >
              <Heart size={20} className={liked ? 'fill-red-500 text-red-500' : 'text-gray-700'} />
            </button>
          </div>

          {/* Hero Restaurant Info Overlay */}
          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-white shadow-lg bg-white shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={restaurant.avatarImg}
                  alt={restaurant.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-white space-y-1">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-black drop-shadow-sm">
                  {restaurant.name}
                </h1>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-white/90 font-medium">
                  <div className="flex items-center gap-1 bg-amber-400 text-amber-950 font-bold px-2 py-0.5 rounded-md text-xs">
                    <Star size={12} className="fill-current" />
                    <span>{restaurant.rating}</span>
                  </div>
                  <span>({restaurant.reviews} Ulasan)</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock size={13} />
                    <span>{restaurant.time}</span>
                  </div>
                </div>
              </div>
            </div>

            <span className="hidden sm:inline-block bg-white text-[#193CA5] font-extrabold text-xs px-4 py-2 rounded-xl shadow-md">
              Gratis Ongkir s.d 10rb
            </span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="bg-white p-3 sm:p-4 rounded-2xl border border-gray-150 shadow-xs flex items-center gap-2.5 overflow-x-auto no-scrollbar">
          {CATEGORIES.map(cat => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#193CA5] text-white shadow-xs'
                    : 'bg-gray-50 text-gray-600 border border-gray-200/80 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Menu Items Grid with Generous Spacing */}
        <section className="bg-white rounded-3xl p-5 md:p-8 border border-gray-100 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h2 className="text-base md:text-lg font-black text-[#111827]">
              Daftar Menu Makanan ({filteredMenu.length})
            </h2>
            <span className="text-xs text-gray-400">Paling Laris</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {filteredMenu.map(item => {
              const qty = getQty(item.id);
              return (
                <div
                  key={item.id}
                  className="bg-[#F8FAFC] hover:bg-white border border-gray-150 hover:border-blue-200 rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4 transition-all hover:shadow-md"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-2xl overflow-hidden bg-gray-100 shrink-0 shadow-inner">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 space-y-1">
                      <h3 className="text-sm sm:text-base font-extrabold text-[#111827] truncate">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-1">{item.description}</p>
                      <p className="text-sm font-black text-[#193CA5] pt-0.5">{fmt(item.price)}</p>
                    </div>
                  </div>

                  {/* Add / Stepper Button */}
                  <div className="shrink-0">
                    {qty > 0 ? (
                      <div className="flex items-center gap-2.5 bg-blue-50 border border-blue-200 rounded-xl px-2.5 py-1.5 shadow-xs">
                        <button
                          onClick={() => updateQuantity(item.id, qty - 1)}
                          className="w-7 h-7 rounded-lg bg-white text-[#193CA5] border border-blue-200 flex items-center justify-center cursor-pointer active:scale-95 transition-all"
                        >
                          <Minus size={13} strokeWidth={2.5} />
                        </button>
                        <span className="text-xs font-black text-[#193CA5] min-w-4 text-center">
                          {qty}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, qty + 1)}
                          className="w-7 h-7 rounded-lg bg-[#193CA5] text-white flex items-center justify-center cursor-pointer active:scale-95 transition-all shadow-xs"
                        >
                          <Plus size={13} strokeWidth={2.5} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAdd(item)}
                        className="w-10 h-10 rounded-xl bg-[#193CA5] hover:bg-[#15328A] text-white flex items-center justify-center shadow-md shadow-[#193CA5]/25 active:scale-95 transition-all cursor-pointer"
                        title="Tambah ke keranjang"
                      >
                        <Plus size={18} strokeWidth={2.5} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* ── BOTTOM CTA BAR (Responsive Desktop & Mobile) ── */}
      <div className="fixed bottom-0 left-0 right-0 w-full px-4 sm:px-6 py-3.5 bg-white/95 backdrop-blur-md border-t border-gray-150 z-50 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#193CA5] flex items-center justify-center font-bold relative">
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </div>
            <div>
              <span className="text-xs text-gray-500 font-medium block">
                {totalItems > 0 ? `${totalItems} Menu di keranjang` : 'Keranjang masih kosong'}
              </span>
              <span className="text-sm sm:text-base font-black text-[#193CA5]">
                {totalItems > 0 ? fmt(totalPrice) : 'Rp 0'}
              </span>
            </div>
          </div>

          <Link href="/cart">
            <button className="bg-[#193CA5] hover:bg-[#15328A] active:scale-[0.98] text-white font-extrabold px-6 py-3.5 rounded-2xl text-xs sm:text-sm transition-all shadow-md shadow-[#193CA5]/25 flex items-center gap-2 cursor-pointer">
              Lihat Keranjang &rsaquo;
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
