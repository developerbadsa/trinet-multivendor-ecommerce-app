import React from 'react';
import VendorCard from './VendorCard';

const vendors = [
  {
    id: '1',
    name: 'TechStore Pro',
    avatar: 'https://d64gsuwffb70l.cloudfront.net/68b925ae2dedbb4a20f7abdb_1756964357842_50c13b0f.webp',
    rating: 4.8,
    reviews: 1234,
    location: 'San Francisco, CA',
    products: 245,
    description: 'Premium electronics and cutting-edge technology products from top brands worldwide.',
    verified: true
  },
  {
    id: '2',
    name: 'AudioHub',
    avatar: 'https://d64gsuwffb70l.cloudfront.net/68b925ae2dedbb4a20f7abdb_1756964359543_de38e5e7.webp',
    rating: 4.9,
    reviews: 892,
    location: 'New York, NY',
    products: 156,
    description: 'Specializing in high-quality audio equipment and professional sound solutions.',
    verified: true
  },
  {
    id: '3',
    name: 'MobileWorld',
    avatar: 'https://d64gsuwffb70l.cloudfront.net/68b925ae2dedbb4a20f7abdb_1756964361414_50caffa4.webp',
    rating: 4.7,
    reviews: 567,
    location: 'Austin, TX',
    products: 189,
    description: 'Your one-stop shop for the latest smartphones, tablets, and mobile accessories.',
    verified: true
  },
  {
    id: '4',
    name: 'LuxuryTimepieces',
    avatar: 'https://d64gsuwffb70l.cloudfront.net/68b925ae2dedbb4a20f7abdb_1756964363190_8fa0319b.webp',
    rating: 4.9,
    reviews: 234,
    location: 'Beverly Hills, CA',
    products: 78,
    description: 'Curated collection of luxury watches from prestigious brands and independent makers.',
    verified: true
  }
];

const VendorSpotlight: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Vendors</h2>
          <p className="text-lg text-gray-600">Discover trusted sellers with exceptional products and service</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {vendors.map((vendor) => (
            <VendorCard key={vendor.id} {...vendor} />
          ))}
        </div>
        
        <div className="text-center mt-8">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Become a Vendor
          </button>
        </div>
      </div>
    </section>
  );
};

export default VendorSpotlight;