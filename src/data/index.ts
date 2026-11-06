import type { Restaurant, Product, WUSService, Notification, Order } from '@/types';

export const WUS_SERVICES: WUSService[] = [
  { id: 'food', name: 'WUSFood', description: 'Pesan makanan favoritmu', icon: '🍔', color: '#FF6B35', bgColor: '#FFF3EE', href: '/food' },
  { id: 'mart', name: 'WUSMart', description: 'Belanja kebutuhan sehari-hari', icon: '🛒', color: '#193CA5', bgColor: '#EAF1FF', href: '/services/mart' },
  { id: 'car', name: 'WUSCar', description: 'Transportasi nyaman dengan mobil', icon: '🚗', color: '#10B981', bgColor: '#ECFDF5', href: '/services/car' },
  { id: 'ride', name: 'WUSRide', description: 'Ojek motor cepat dan hemat', icon: '🏍️', color: '#F59E0B', bgColor: '#FFFBEB', href: '/services/ride' },
  { id: 'move', name: 'WUSMove', description: 'Pindahan barang jadi mudah', icon: '📦', color: '#8B5CF6', bgColor: '#F5F3FF', href: '/services/move' },
  { id: 'send', name: 'WUSSend', description: 'Kirim paket ke seluruh kota', icon: '📨', color: '#EF4444', bgColor: '#FEF2F2', href: '/services/send' },
];

export const RESTAURANTS: Restaurant[] = [
  {
    id: 'mr-burger',
    name: 'MR Burger',
    category: 'Burger',
    rating: 4.8,
    reviewCount: 1200,
    deliveryTime: '± 30 menit',
    deliveryFee: 5000,
    minOrder: 15000,
    image: '🍔',
    coverImage: '🍔',
    description: 'Burger juicy dengan bahan-bahan segar pilihan, disajikan hangat untuk kepuasan maksimal.',
    isOpen: true,
    tags: ['Burger', 'Fast Food', 'Populer'],
    discount: 50,
  },
  {
    id: 'bobamilk',
    name: 'BOBAMILK',
    category: 'Minuman',
    rating: 4.8,
    reviewCount: 980,
    deliveryTime: '± 25 menit',
    deliveryFee: 4000,
    minOrder: 10000,
    image: '🧋',
    coverImage: '🧋',
    description: 'Minuman boba premium dengan berbagai pilihan rasa yang segar dan nikmat.',
    isOpen: true,
    tags: ['Boba', 'Minuman', 'Segar'],
    discount: 20,
  },
  {
    id: 'mr-kebab',
    name: 'MR KEBAB',
    category: 'Kebab',
    rating: 4.5,
    reviewCount: 670,
    deliveryTime: '± 35 menit',
    deliveryFee: 5000,
    minOrder: 20000,
    image: '🌯',
    coverImage: '🌯',
    description: 'Kebab autentik dengan bumbu rempah pilihan, daging segar, dan sayuran crispy.',
    isOpen: true,
    tags: ['Kebab', 'Middle East', 'Daging'],
    discount: 0,
  },
  {
    id: 'ayam-geprek',
    name: 'Ayam Geprek Bu Sari',
    category: 'Ayam',
    rating: 4.7,
    reviewCount: 2100,
    deliveryTime: '± 20 menit',
    deliveryFee: 3000,
    minOrder: 10000,
    image: '🍗',
    coverImage: '🍗',
    description: 'Ayam geprek level pedas 1-10, sambal segar dibuat tiap hari.',
    isOpen: true,
    tags: ['Ayam', 'Pedas', 'Nasi'],
    discount: 15,
  },
  {
    id: 'bakso-pak-min',
    name: 'Bakso Pak Min',
    category: 'Bakso',
    rating: 4.6,
    reviewCount: 1500,
    deliveryTime: '± 25 menit',
    deliveryFee: 3000,
    minOrder: 12000,
    image: '🍲',
    coverImage: '🍲',
    description: 'Bakso sapi asli dengan kuah kaldu bening yang gurih dan mie kenyal.',
    isOpen: true,
    tags: ['Bakso', 'Mie', 'Kuah'],
    discount: 0,
  },
];

export const PRODUCTS: Product[] = [
  // MR Burger
  { id: 'p1', restaurantId: 'mr-burger', name: 'Hot Dog', description: 'Sosis sapi dalam roti lembut dengan mustard dan saus tomat', price: 20000, image: '🌭', category: 'Snack', isAvailable: true },
  { id: 'p2', restaurantId: 'mr-burger', name: 'Beef Burger', description: 'Burger daging sapi juicy dengan keju cheddar dan selada segar', price: 30000, image: '🍔', category: 'Burger', isAvailable: true, isBestSeller: true },
  { id: 'p3', restaurantId: 'mr-burger', name: 'Chicken Burger', description: 'Crispy chicken fillet dengan saus mayo dan tomat', price: 20000, image: '🍗', category: 'Burger', isAvailable: true },
  { id: 'p4', restaurantId: 'mr-burger', name: 'French Fries', description: 'Kentang goreng renyah dengan saus sambal dan mayonnaise', price: 15000, image: '🍟', category: 'Snack', isAvailable: true },
  { id: 'p5', restaurantId: 'mr-burger', name: 'Chicken Nuggets', description: '6 pcs nugget ayam crispy dengan saus BBQ', price: 18000, image: '🐔', category: 'Snack', isAvailable: true },
  { id: 'p6', restaurantId: 'mr-burger', name: 'Double Beef Burger', description: 'Dua patty daging sapi dengan double keju', price: 45000, image: '🍔', category: 'Burger', isAvailable: true },

  // BOBAMILK
  { id: 'p7', restaurantId: 'bobamilk', name: 'Boba Milk Tea Original', description: 'Teh susu dengan boba kenyal, rasa original klasik', price: 22000, image: '🧋', category: 'Minuman', isAvailable: true, isBestSeller: true },
  { id: 'p8', restaurantId: 'bobamilk', name: 'Matcha Boba Latte', description: 'Matcha premium dengan susu segar dan boba', price: 28000, image: '🍵', category: 'Minuman', isAvailable: true },
  { id: 'p9', restaurantId: 'bobamilk', name: 'Taro Milk Tea', description: 'Teh susu taro dengan warna ungu cantik', price: 25000, image: '💜', category: 'Minuman', isAvailable: true },
  { id: 'p10', restaurantId: 'bobamilk', name: 'Brown Sugar Boba', description: 'Susu segar dengan boba karamel brown sugar', price: 30000, image: '🤎', category: 'Minuman', isAvailable: true },
  { id: 'p11', restaurantId: 'bobamilk', name: 'Strawberry Milk Boba', description: 'Susu stroberi segar dengan topping boba', price: 26000, image: '🍓', category: 'Minuman', isAvailable: true },

  // MR KEBAB
  { id: 'p12', restaurantId: 'mr-kebab', name: 'Kebab Original', description: 'Kebab daging sapi dengan sayuran segar dan saus secret', price: 25000, image: '🌯', category: 'Kebab', isAvailable: true, isBestSeller: true },
  { id: 'p13', restaurantId: 'mr-kebab', name: 'Kebab Jumbo', description: 'Versi jumbo dengan double daging dan ekstra sayuran', price: 35000, image: '🌯', category: 'Kebab', isAvailable: true },
  { id: 'p14', restaurantId: 'mr-kebab', name: 'Kebab Keju', description: 'Kebab klasik dengan tambahan keju leleh', price: 30000, image: '🧀', category: 'Kebab', isAvailable: true },
  { id: 'p15', restaurantId: 'mr-kebab', name: 'Kentang Goreng', description: 'Kentang goreng crispy sebagai pendamping', price: 12000, image: '🍟', category: 'Snack', isAvailable: true },
  { id: 'p16', restaurantId: 'mr-kebab', name: 'Es Teh Manis', description: 'Teh manis segar dengan es batu', price: 5000, image: '🧊', category: 'Minuman', isAvailable: true },

  // Ayam Geprek
  { id: 'p17', restaurantId: 'ayam-geprek', name: 'Ayam Geprek Level 3', description: 'Ayam geprek sambal level 3, nasi putih + lalapan', price: 18000, image: '🍗', category: 'Ayam', isAvailable: true, isBestSeller: true },
  { id: 'p18', restaurantId: 'ayam-geprek', name: 'Ayam Geprek Level 5', description: 'Extra pedas level 5, untuk yang suka tantangan', price: 18000, image: '🌶️', category: 'Ayam', isAvailable: true },
  { id: 'p19', restaurantId: 'ayam-geprek', name: 'Paket Hemat 2', description: '2 ayam geprek + 2 nasi + 2 teh manis', price: 32000, image: '🍱', category: 'Paket', isAvailable: true },
  { id: 'p20', restaurantId: 'ayam-geprek', name: 'Tahu Tempe', description: 'Tahu dan tempe goreng renyah', price: 8000, image: '🟡', category: 'Lauk', isAvailable: true },

  // Bakso
  { id: 'p21', restaurantId: 'bakso-pak-min', name: 'Bakso Campur', description: 'Bakso, mie, bihun, tahu dengan kuah kaldu segar', price: 18000, image: '🍲', category: 'Bakso', isAvailable: true, isBestSeller: true },
  { id: 'p22', restaurantId: 'bakso-pak-min', name: 'Bakso Jumbo', description: 'Bakso ukuran jumbo dengan isian daging sapi', price: 25000, image: '🥣', category: 'Bakso', isAvailable: true },
  { id: 'p23', restaurantId: 'bakso-pak-min', name: 'Mie Ayam Bakso', description: 'Mie ayam topping bakso dan pangsit goreng', price: 20000, image: '🍜', category: 'Mie', isAvailable: true },
];

export const PROMO_BANNERS = [
  { id: 1, title: 'Diskon 50%', subtitle: 'Untuk semua menu di WUSFood', emoji: '🌭', color: '#193CA5', light: '#EAF1FF' },
  { id: 2, title: 'Gratis Ongkir', subtitle: 'Minimum order Rp25.000', emoji: '🛵', color: '#10B981', light: '#ECFDF5' },
  { id: 3, title: 'Cashback 20%', subtitle: 'Bayar dengan WusPay', emoji: '💰', color: '#F59E0B', light: '#FFFBEB' },
];

export const SAMPLE_NOTIFICATIONS: Notification[] = [
  { id: 'n1', title: 'Pesanan Dikonfirmasi', message: 'Pesanan #WUS001 dari MR Burger sedang disiapkan.', type: 'order', isRead: false, createdAt: '2026-11-06T10:00:00' },
  { id: 'n2', title: 'Promo Spesial Hari Ini!', message: 'Dapatkan diskon 50% untuk semua menu WUSFood. Berlaku hari ini saja!', type: 'promo', isRead: false, createdAt: '2026-11-06T08:00:00' },
  { id: 'n3', title: 'Kurir Menuju Lokasimu', message: 'Rizky Priyatno sedang dalam perjalanan ke lokasi pengirimanmu.', type: 'order', isRead: true, createdAt: '2026-11-05T14:30:00' },
  { id: 'n4', title: 'Pesanan Selesai', message: 'Pesanan #WUS-892 dari BOBAMILK telah diterima. Terima kasih!', type: 'order', isRead: true, createdAt: '2026-11-05T11:00:00' },
];

export const DEMO_ORDER: Order = {
  id: 'WUS-001',
  userId: 'demo-user',
  restaurantId: 'mr-burger',
  restaurantName: 'MR Burger',
  items: [
    { productId: 'p1', productName: 'Hot Dog', price: 20000, quantity: 1, image: '🌭' },
    { productId: 'p2', productName: 'Beef Burger', price: 30000, quantity: 1, image: '🍔' },
  ],
  status: 'on_the_way',
  subtotal: 50000,
  deliveryFee: 5000,
  total: 55000,
  paymentMethod: 'Cash',
  deliveryAddress: 'Jl. Melati No.12, Surakarta, Jawa Tengah',
  courierName: 'Rizky Priyatno',
  courierPhone: '081234567890',
  courierVehicle: 'AD 5009 NH',
  estimatedArrival: '17.10 - 17.25',
  createdAt: '2026-11-06T14:00:00',
};
