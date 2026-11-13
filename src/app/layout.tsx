import type { Metadata } from 'next';
import './tailwind-built.css';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import AppShellWrapper from '@/components/shared/AppShellWrapper';

export const metadata: Metadata = {
  title: 'WUSDelivery - Pesan, Kirim, Sampai!',
  description: 'Aplikasi multi-layanan delivery: WUSFood, WUSMart, WUSCar, WUSRide, WUSMove, WUSSend',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="font-sans antialiased bg-[#e8edf5]">
        <AuthProvider>
          <CartProvider>
            <AppShellWrapper>
              {children}
            </AppShellWrapper>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
