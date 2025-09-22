import React, { useState, useEffect } from 'react';
import { Clock, Gavel, TrendingUp } from 'lucide-react';

interface BidItem {
  id: string;
  title: string;
  image: string;
  currentBid: number;
  timeLeft: string;
  bidCount: number;
  vendor: string;
}

const biddingItems: BidItem[] = [
  {
    id: '1',
    title: 'Vintage Rolex Submariner',
    image: 'https://d64gsuwffb70l.cloudfront.net/68b925ae2dedbb4a20f7abdb_1756964354804_09aab639.webp',
    currentBid: 8500,
    timeLeft: '2h 34m',
    bidCount: 23,
    vendor: 'LuxuryTimepieces'
  },
  {
    id: '2',
    title: 'MacBook Pro M3 Max',
    image: 'https://d64gsuwffb70l.cloudfront.net/68b925ae2dedbb4a20f7abdb_1756964324375_c83fb449.webp',
    currentBid: 2200,
    timeLeft: '5h 12m',
    bidCount: 18,
    vendor: 'TechStore Pro'
  },
  {
    id: '3',
    title: 'iPhone 15 Pro Max',
    image: 'https://d64gsuwffb70l.cloudfront.net/68b925ae2dedbb4a20f7abdb_1756964346889_4d54f45b.webp',
    currentBid: 950,
    timeLeft: '1h 45m',
    bidCount: 31,
    vendor: 'MobileWorld'
  }
];

const BiddingSection: React.FC = () => {
  const [bidAmounts, setBidAmounts] = useState<{[key: string]: string}>({});

  const handleBidChange = (itemId: string, amount: string) => {
    setBidAmounts(prev => ({ ...prev, [itemId]: amount }));
  };

  const placeBid = (itemId: string) => {
    // Bid placement logic would go here
    console.log(`Placing bid for item ${itemId}`);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Gavel className="w-8 h-8 text-purple-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Live Auctions</h2>
          </div>
          <p className="text-lg text-gray-600">Bid on exclusive items with anti-sniping protection</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {biddingItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-4">by {item.vendor}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Current Bid</p>
                    <p className="text-2xl font-bold text-green-600">${item.currentBid.toLocaleString()}</p>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center text-red-600 mb-1">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="text-sm font-semibold">{item.timeLeft}</span>
                    </div>
                    <p className="text-sm text-gray-600">{item.bidCount} bids</p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder={`Min: $${item.currentBid + 50}`}
                    value={bidAmounts[item.id] || ''}
                    onChange={(e) => handleBidChange(item.id, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => placeBid(item.id)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
                  >
                    Bid
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <button className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center mx-auto">
            <TrendingUp className="w-5 h-5 mr-2" />
            View All Auctions
          </button>
        </div>
      </div>
    </section>
  );
};

export default BiddingSection;