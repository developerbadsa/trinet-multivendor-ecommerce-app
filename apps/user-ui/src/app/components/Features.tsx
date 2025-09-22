import React from 'react';
import { Shield, Truck, CreditCard, Headphones, Award, Globe } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Secure Payments',
    description: 'Advanced encryption and fraud protection for all transactions'
  },
  {
    icon: Truck,
    title: 'Fast Shipping',
    description: 'Free shipping on orders over $50 with tracking included'
  },
  {
    icon: CreditCard,
    title: 'Easy Returns',
    description: '30-day hassle-free returns and money-back guarantee'
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Round-the-clock customer service and live chat support'
  },
  {
    icon: Award,
    title: 'Quality Assured',
    description: 'All vendors verified and products quality-tested'
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Worldwide shipping and multi-currency support'
  }
];

const Features: React.FC = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Platform</h2>
          <p className="text-lg text-gray-600">Built for modern commerce with enterprise-grade features</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="text-center group">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                  <IconComponent className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;