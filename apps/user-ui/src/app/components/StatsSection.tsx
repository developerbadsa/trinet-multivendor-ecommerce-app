import React from 'react';
import { ShoppingBag, Users, Globe, TrendingUp } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '2.5M+',
    label: 'Active Customers',
    growth: '+23% this month'
  },
  {
    icon: ShoppingBag,
    value: '50K+',
    label: 'Verified Vendors',
    growth: '+15% this month'
  },
  {
    icon: Globe,
    value: '180+',
    label: 'Countries Served',
    growth: 'Global reach'
  },
  {
    icon: TrendingUp,
    value: '$2.8B+',
    label: 'GMV Processed',
    growth: '+45% YoY growth'
  }
];

const StatsSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Platform Performance</h2>
          <p className="text-lg text-gray-300">Real-time metrics from our global marketplace</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="bg-blue-600 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <IconComponent className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-lg text-gray-300 mb-1">{stat.label}</div>
                <div className="text-sm text-green-400">{stat.growth}</div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-300 text-lg">
            Join the world's fastest-growing multi-vendor marketplace
          </p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;