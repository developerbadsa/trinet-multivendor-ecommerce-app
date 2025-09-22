import React from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { useIsMobile } from '@/hooks/use-mobile';
import Header from './Header';
import HeroSection from './HeroSection';
import CategoryGrid from './CategoryGrid';
import ProductGrid from './ProductGrid';
import BiddingSection from './BiddingSection';
import VendorSpotlight from './VendorSpotlight';
import AffiliateSection from './AffiliateSection';
import StatsSection from './StatsSection';
import Features from './Features';
import Newsletter from './Newsletter';
import Footer from './Footer';

const AppLayout: React.FC = () => {
  const { sidebarOpen, toggleSidebar } = useAppContext();
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <CategoryGrid />
        <ProductGrid />
        <BiddingSection />
        <VendorSpotlight />
        <AffiliateSection />
        <StatsSection />
        <Features />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
