import React from 'react';
import ProductCard from './ProductCard';

const products = [
  {
    id: '1',
    title: 'MacBook Pro 16" M3 Max',
    price: 2499,
    originalPrice: 2799,
    image: 'https://d64gsuwffb70l.cloudfront.net/68b925ae2dedbb4a20f7abdb_1756964320014_c6aee865.webp',
    vendor: 'TechStore Pro',
    rating: 4.8,
    reviews: 234,
    inStock: true,
    isOnSale: true
  },
  {
    id: '2',
    title: 'Sony WH-1000XM5 Wireless Headphones',
    price: 349,
    image: 'https://d64gsuwffb70l.cloudfront.net/68b925ae2dedbb4a20f7abdb_1756964328997_00f4d618.webp',
    vendor: 'AudioHub',
    rating: 4.9,
    reviews: 567,
    inStock: true
  },
  {
    id: '3',
    title: 'iPhone 15 Pro Max 256GB',
    price: 1199,
    image: 'https://d64gsuwffb70l.cloudfront.net/68b925ae2dedbb4a20f7abdb_1756964339955_4163eedd.webp',
    vendor: 'MobileWorld',
    rating: 4.7,
    reviews: 892,
    inStock: true
  },
  {
    id: '4',
    title: 'Apple Watch Series 9',
    price: 399,
    originalPrice: 449,
    image: 'https://d64gsuwffb70l.cloudfront.net/68b925ae2dedbb4a20f7abdb_1756964350804_a6450667.webp',
    vendor: 'WearableTech',
    rating: 4.6,
    reviews: 445,
    inStock: true,
    isOnSale: true
  },
  {
    id: '5',
    title: 'Dell XPS 13 Laptop',
    price: 1299,
    image: 'https://d64gsuwffb70l.cloudfront.net/68b925ae2dedbb4a20f7abdb_1756964321827_422ce008.webp',
    vendor: 'ComputerZone',
    rating: 4.5,
    reviews: 178,
    inStock: false
  },
  {
    id: '6',
    title: 'Bose QuietComfort Earbuds',
    price: 279,
    image: 'https://d64gsuwffb70l.cloudfront.net/68b925ae2dedbb4a20f7abdb_1756964332190_bf7b6e30.webp',
    vendor: 'AudioHub',
    rating: 4.8,
    reviews: 321,
    inStock: true
  },
  {
    id: '7',
    title: 'Samsung Galaxy S24 Ultra',
    price: 1299,
    image: 'https://d64gsuwffb70l.cloudfront.net/68b925ae2dedbb4a20f7abdb_1756964341949_6d106a5f.webp',
    vendor: 'MobileWorld',
    rating: 4.7,
    reviews: 654,
    inStock: true
  },
  {
    id: '8',
    title: 'Rolex Submariner Watch',
    price: 8950,
    image: 'https://d64gsuwffb70l.cloudfront.net/68b925ae2dedbb4a20f7abdb_1756964353019_d711c39a.webp',
    vendor: 'LuxuryTimepieces',
    rating: 4.9,
    reviews: 89,
    inStock: true
  }
];

const ProductGrid: React.FC = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
          <button className="text-blue-600 hover:text-blue-700 font-semibold">View All →</button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;