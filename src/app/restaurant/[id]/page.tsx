'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Star, Plus, Minus, Heart } from 'lucide-react';
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
    name: 'Mr Burger',
    rating: 4.8,
    reviews: '100rb+',
    time: '± 30 min',
    coverImg: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&h=300&fit=crop',
    avatarImg: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=120&h=120&fit=crop',
  },
  'bobamilk': {
    name: 'BOBAMILK',
    rating: 4.8,
    reviews: '100rb+',
    time: '± 30 min',
    coverImg: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=300&fit=crop',
    avatarImg: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=120&fit=crop',
  },
  'mr-kebab': {
    name: 'MR KEBAB',
    rating: 4.5,
    reviews: '80rb+',
    time: '± 30 min',
    coverImg: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=600&h=300&fit=crop',
    avatarImg: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=120&h=120&fit=crop',
  },
};

const MENU_ITEMS = [
  {
    id: 'p1',
    name: 'Hot Dog',
    price: 20000,
    category: 'Snack',
    image: 'https://images.unsplash.com/photo-1619740455993-9d492ce96ab7?w=150&h=150&fit=crop',
  },
  {
    id: 'p2',
    name: 'Beef Burger',
    price: 30000,
    category: 'Burger',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=150&h=150&fit=crop',
  },
  {
    id: 'p3',
    name: 'Chiken Burger',
    price: 20000,
    category: 'Burger',
    image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=150&h=150&fit=crop',
  },
  {
    id: 'p4',
    name: 'French Fries',
    price: 15000,
    category: 'Snack',
    image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=150&h=150&fit=crop',
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
    <div className="min-h-screen bg-[#F5F6FA] flex flex-col relative pb-24 select-none">
      <div>
        {/* Cover Hero Banner with Status Bar */}
        <div className="relative h-56 bg-slate-800">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={restaurant.coverImg}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/30" />

          {/* Mobile Status Bar overlay */}
          <div className="absolute top-0 left-0 right-0 z-20">
            <MobileStatusBar variant="light" />
          </div>

          {/* Top navigation actions */}
          <div className="absolute top-9 left-4 right-4 flex items-center justify-between z-20">
            <button
              onClick={() => router.back()}
              className="w-9 h-9 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-gray-800 shadow-md active:scale-95 transition-transform"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => setLiked(!liked)}
              className="w-9 h-9 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-md active:scale-95 transition-transform"
            >
              <Heart
                size={18}
                className={liked ? 'fill-red-500 text-red-500' : 'text-gray-600'}
              />
            </button>
          </div>
        </div>

        {/* Floating Restaurant Info Card with Generous Padding */}
        <div className="page-px px-5 -mt-12 relative z-20">
          <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100 flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-50 border-2 border-white shadow-xs shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={restaurant.avatarImg}
                alt={restaurant.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0 pr-1">
              <h1 className="text-base font-extrabold text-[#171717]">{restaurant.name}</h1>
              <div className="flex items-center gap-2 mt-1.5 text-gray-600">
                <div className="flex items-center gap-0.5">
                  <Star size={13} className="fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold text-[#171717]">{restaurant.rating}</span>
                </div>
                <span className="text-xs text-gray-400">({restaurant.reviews})</span>
                <span className="text-gray-300 text-xs">•</span>
                <span className="text-xs text-gray-500">🛵 {restaurant.time}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="page-px px-5 pt-4">
          <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1">
            {CATEGORIES.map(cat => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#193CA5] text-white shadow-xs'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
                  }`}
                  style={{ paddingLeft: '16px', paddingRight: '16px' }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section: Menu with Spacious Card Padding */}
        <div className="page-px px-5 pt-4 pb-8">
          <h2 className="text-sm font-bold text-[#171717] mb-3 px-1">Menu</h2>

          <div className="space-y-3">
            {filteredMenu.map(item => {
              const qty = getQty(item.id);
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs flex items-center gap-4 hover:border-blue-100 transition-all"
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0 flex items-center justify-center text-2xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={e => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>

                  <div className="flex-1 min-w-0 pr-1">
                    <h3 className="text-sm font-bold text-[#171717] truncate">{item.name}</h3>
                    <p className="text-xs font-extrabold text-[#193CA5] mt-1">{fmt(item.price)}</p>
                  </div>

                  {/* Quantity Control or Add Button */}
                  {qty > 0 ? (
                    <div className="flex items-center gap-2.5 bg-[#EAF1FF] rounded-full px-2.5 py-1.5">
                      <button
                        onClick={() => updateQuantity(item.id, qty - 1)}
                        className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#193CA5] shadow-xs active:scale-95"
                      >
                        <Minus size={12} strokeWidth={2.5} />
                      </button>
                      <span className="text-xs font-bold text-[#193CA5] min-w-3 text-center">
                        {qty}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, qty + 1)}
                        className="w-6 h-6 rounded-full bg-[#193CA5] flex items-center justify-center text-white shadow-xs active:scale-95"
                      >
                        <Plus size={12} strokeWidth={2.5} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleAdd(item)}
                      className="w-9 h-9 rounded-full bg-[#193CA5] hover:bg-[#15328A] active:scale-90 text-white flex items-center justify-center shadow-md shadow-[#193CA5]/25 transition-all"
                    >
                      <Plus size={16} strokeWidth={2.5} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom CTA Bar */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] page-px px-5 py-4 bg-white border-t border-gray-100 z-50">
        <Link href="/cart">
          <button className="w-full bg-[#193CA5] hover:bg-[#15328A] active:scale-[0.98] text-white font-bold py-3.5 rounded-full text-sm transition-all shadow-md shadow-[#193CA5]/25 flex items-center justify-between px-5">
            <span>
              {totalItems > 0 ? `${totalItems} Menu Dipilih` : 'Tambahkan ke Keranjang'}
            </span>
            <span className="font-extrabold">
              {totalItems > 0 ? fmt(totalPrice) : 'Lihat Keranjang &rsaquo;'}
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
}
