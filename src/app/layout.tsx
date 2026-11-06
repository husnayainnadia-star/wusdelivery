import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'WUSDelivery - Pesan, Kirim, Sampai!',
  description: 'Aplikasi multi-layanan delivery: WUSFood, WUSMart, WUSCar, WUSRide, WUSMove, WUSSend',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={inter.className} style={{ background: '#F5F6FA' }}>
        <AuthProvider>
          <CartProvider>
            <div className="app-shell">
              {children}
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
