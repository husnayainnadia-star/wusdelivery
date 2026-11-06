'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Star, Clock, Plus, Minus, Heart, Search } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import CartFloatButton from '@/components/shared/CartFloatButton';

const RESTAURANTS_DATA: Record<string, {
  name: string; rating: number; reviews: string; time: string;
  isOpen: boolean; description: string; coverImg: string;
}> = {
  'mr-burger': {
    name: 'Mr Burger',
    rating: 4.8, reviews: '100rb+', time: '± 30 min', isOpen: true,
    description: 'Burger juicy dengan bahan segar pilihan, disajikan hangat.',
    coverImg: 'https://images.unsplash.com/photo-1550317138-10000687a72b?w=400&h=220&fit=crop',
  },
  'bobamilk': {
    name: 'BOBAMILK',
    rating: 4.8, reviews: '100rb+', time: '± 25 min', isOpen: true,
    description: 'Minuman boba premium berbagai pilihan rasa segar.',
    coverImg: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=220&fit=crop',
  },
  'mr-kebab': {
    name: 'MR KEBAB',
    rating: 4.5, reviews: '80rb+', time: '± 35 min', isOpen: true,
    description: 'Kebab autentik bumbu rempah pilihan, daging segar.',
    coverImg: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=400&h=220&fit=crop',
  },
};

const MENU_DATA: Record<string, Array<{ id: string; name: string; price: number; image: string; emoji: string; category: string }>> = {
  'mr-burger': [
    { id: 'p1', name: 'Hot Dog',        price: 20000, image: 'https://images.unsplash.com/photo-1619740455993-9d492ce96ab7?w=120&h=120&fit=crop', emoji: '🌭', category: 'Snack' },
    { id: 'p2', name: 'Beef Burger',    price: 30000, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=120&h=120&fit=crop', emoji: '🍔', category: 'Burger' },
    { id: 'p3', name: 'Chiken Burger',  price: 20000, image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=120&h=120&fit=crop', emoji: '🍗', category: 'Burger' },
    { id: 'p4', name: 'French Fries',   price: 15000, image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=120&h=120&fit=crop', emoji: '🍟', category: 'Snack' },
    { id: 'p5', name: 'Chicken Nugget', price: 18000, image: 'https://images.unsplash.com/photo-1562802378-063ec186a863?w=120&h=120&fit=crop', emoji: '🐔', category: 'Snack' },
  ],
  'bobamilk': [
    { id: 'p6',  name: 'Boba Milk Tea',    price: 22000, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=120&fit=crop', emoji: '🧋', category: 'Minuman' },
    { id: 'p7',  name: 'Matcha Latte',     price: 28000, image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=120&h=120&fit=crop', emoji: '🍵', category: 'Minuman' },
    { id: 'p8',  name: 'Taro Milk Tea',    price: 25000, image: 'https://images.unsplash.com/photo-1527156231393-7023794f363c?w=120&h=120&fit=crop', emoji: '💜', category: 'Minuman' },
    { id: 'p9',  name: 'Brown Sugar Boba', price: 30000, image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=120&h=120&fit=crop', emoji: '🤎', category: 'Minuman' },
  ],
  'mr-kebab': [
    { id: 'p10', name: 'Kebab Original', price: 25000, image: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=120&h=120&fit=crop', emoji: '🌯', category: 'Kebab' },
    { id: 'p11', name: 'Kebab Jumbo',    price: 35000, image: 'https://images.unsplash.com/photo-1590586767908-20d6d1b6db58?w=120&h=120&fit=crop', emoji: '🌯', category: 'Kebab' },
    { id: 'p12', name: 'Kebab Keju',     price: 30000, image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=120&h=120&fit=crop', emoji: '🧀', category: 'Kebab' },
    { id: 'p13', name: 'Kentang Goreng', price: 12000, image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=120&h=120&fit=crop', emoji: '🍟', category: 'Snack' },
  ],
};

const DEFAULT_MENUS = MENU_DATA['mr-burger'];

function fmt(n: number) { return 'Rp. ' + n.toLocaleString('id-ID'); }

export default function RestaurantPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const restaurant = RESTAURANTS_DATA[id] ?? RESTAURANTS_DATA['mr-burger'];
  const menus = MENU_DATA[id] ?? DEFAULT_MENUS;
  const categories = ['Semua', ...Array.from(new Set(menus.map(m => m.category)))];

  const [activeCat, setActiveCat] = useState('Semua');
  const [liked, setLiked] = useState(false);
  const [search, setSearch] = useState('');
  const { cart, addItem, updateQuantity } = useCart();

  const displayed = menus.filter(m => {
    const mc = activeCat === 'Semua' || m.category === activeCat;
    const ms = !search || m.name.toLowerCase().includes(search.toLowerCase());
    return mc && ms;
  });

  const getQty = (pid: string) => cart.items.find(i => i.product.id === pid)?.quantity ?? 0;

  const FAKE_RESTAURANT = {
    id,
    name: restaurant.name,
    price: 0,
    image: '',
    category: '',
    description: '',
    restaurantId: id,
    isAvailable: true,
  };

  return (
    <div className="min-h-screen bg-[#f5f6fa] flex flex-col">

      {/* Cover Image */}
      <div className="relative h-48 bg-[#FFF3E8] shrink-0">
        <img src={restaurant.coverImg} alt={restaurant.name}
          className="w-full h-full object-cover"
          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
        {/* Top buttons */}
        <div className="absolute top-10 left-4 right-4 flex justify-between">
          <Link href="/food">
            <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow">
              <ChevronLeft size={19} className="text-[#193CA5]" />
            </div>
          </Link>
          <button onClick={() => setLiked(!liked)}
            className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow">
            <Heart size={17} className={liked ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
          </button>
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-white rounded-t-3xl -mt-5 px-4 pt-4 pb-0 shadow-sm shrink-0 z-10">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h1 className="text-lg font-black text-[#171717]">{restaurant.name}</h1>
            <div className="flex items-center gap-1.5 mt-1">
              <Star size={12} fill="#F59E0B" color="#F59E0B" />
              <span className="text-xs font-bold text-gray-700">{restaurant.rating}</span>
              <span className="text-[10px] text-gray-400">({restaurant.reviews})</span>
              <span className="text-gray-200">•</span>
              <Clock size={11} className="text-gray-400" />
              <span className="text-[10px] text-gray-400">{restaurant.time}</span>
            </div>
          </div>
          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full
            ${restaurant.isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
            {restaurant.isOpen ? 'Buka' : 'Tutup'}
          </span>
        </div>

        {/* Search */}
        <div className="flex items-center bg-[#F5F6FA] rounded-xl px-3 py-2 gap-2 mb-3">
          <Search size={13} className="text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Cari menu..." className="flex-1 text-xs outline-none bg-transparent text-gray-600" />
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3">
          {categories.map(c => (
            <button key={c} onClick={() => setActiveCat(c)}
              className={`shrink-0 px-3.5 py-1 rounded-full text-[10px] font-semibold transition-all
                ${activeCat === c ? 'bg-[#193CA5] text-white' : 'bg-[#EAF1FF] text-[#193CA5]'}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Menu List */}
      <div className="flex-1 overflow-y-auto px-4 pt-3 pb-32">
        <p className="font-bold text-[13px] text-[#171717] mb-3">Menu</p>
        <div className="space-y-2.5">
          {displayed.map(item => {
            const qty = getQty(item.id);
            const product = { id: item.id, name: item.name, price: item.price, image: item.image, category: item.category, description: '', restaurantId: id, isAvailable: true };
            return (
              <div key={item.id} className="bg-white rounded-2xl p-3.5 flex items-center gap-3 shadow-sm">
                {/* Image */}
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#FFF3E8] shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover"
                    onError={e => { (e.target as HTMLImageElement).parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center text-3xl">${item.emoji}</div>`; }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[#171717] text-sm">{item.name}</p>
                  <p className="text-[#193CA5] font-bold text-sm mt-0.5">{fmt(item.price)}</p>
                </div>
                {/* Qty Control */}
                {qty === 0 ? (
                  <button onClick={() => addItem(product, id, restaurant.name)}
                    className="w-8 h-8 bg-[#193CA5] rounded-xl flex items-center justify-center shrink-0 active:scale-90 transition-transform">
                    <Plus size={16} className="text-white" />
                  </button>
                ) : (
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => updateQuantity(item.id, qty - 1)}
                      className="w-7 h-7 rounded-lg border-[1.5px] border-[#193CA5] flex items-center justify-center">
                      <Minus size={12} className="text-[#193CA5]" />
                    </button>
                    <span className="text-sm font-bold text-[#171717] w-4 text-center">{qty}</span>
                    <button onClick={() => addItem(product, id, restaurant.name)}
                      className="w-7 h-7 bg-[#193CA5] rounded-lg flex items-center justify-center">
                      <Plus size={12} className="text-white" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <CartFloatButton />
    </div>
  );
}
