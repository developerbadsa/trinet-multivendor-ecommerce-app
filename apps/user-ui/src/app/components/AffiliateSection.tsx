import React from 'react';
import { DollarSign, Users, TrendingUp, Award } from 'lucide-react';

const AffiliateSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Join Our Affiliate Program</h2>
          <p className="text-xl opacity-90">Earn up to 15% commission on every sale you refer</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="text-center">
            <div className="bg-white bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <DollarSign className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">High Commissions</h3>
            <p className="opacity-90">Up to 15% on every sale</p>
          </div>
          
          <div className="text-center">
            <div className="bg-white bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Global Network</h3>
            <p className="opacity-90">10K+ active affiliates</p>
          </div>
          
          <div className="text-center">
            <div className="bg-white bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <TrendingUp className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-time Tracking</h3>
            <p className="opacity-90">Advanced analytics dashboard</p>
          </div>
          
          <div className="text-center">
            <div className="bg-white bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Tier Rewards</h3>
            <p className="opacity-90">Bonus payouts for top performers</p>
          </div>
        </div>
        
        <div className="bg-white bg-opacity-10 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Earning?</h3>
          <p className="text-lg mb-6 opacity-90">
            Join thousands of affiliates earning passive income with our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
              Become an Affiliate
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AffiliateSection;