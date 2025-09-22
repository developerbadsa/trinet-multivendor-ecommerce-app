"use client";

import React from "react";
import {
  ArrowRight,
  Users,
  ShoppingBag,
  TrendingUp,
  Laptop,
  Headphones,
  Smartphone,
  Watch,
  Camera,
  Gamepad2,
} from "lucide-react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import CategoryGrid from "./components/CategoryGrid";
import ProductGrid from "./components/ProductGrid";
import BiddingSection from "./components/BiddingSection";
import VendorSpotlight from "./components/VendorSpotlight";
import AffiliateSection from "./components/AffiliateSection";
import StatsSection from "./components/StatsSection";
import Features from "./components/Features";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";

const page = () => {

  return (
    <div>
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
    </div>
  );
};

export default page;
