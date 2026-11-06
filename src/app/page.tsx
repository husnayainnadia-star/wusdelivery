import BottomNav from '@/components/navigation/BottomNav';
import HomeHeader from '@/components/home/HomeHeader';
import PromoBanner from '@/components/home/PromoBanner';
import ServicesGrid from '@/components/home/ServicesGrid';
import NearbyRestaurants from '@/components/home/NearbyRestaurants';
import PromoSection from '@/components/home/PromoSection';

export default function HomePage() {
  return (
    <main className="pb-safe min-h-screen bg-[#F5F6FA]">
      <HomeHeader />
      <div className="px-4 pt-4 pb-24 space-y-5">
        <PromoBanner />
        <ServicesGrid />
        <PromoSection />
        <NearbyRestaurants />
      </div>
      <BottomNav />
    </main>
  );
}
