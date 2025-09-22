import React, { useState } from 'react';
import { Mail, Gift } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center mb-6">
          <Gift className="w-12 h-12 mr-4" />
          <div>
            <h2 className="text-3xl font-bold">Get Exclusive Deals</h2>
            <p className="text-xl opacity-90">Subscribe and save 20% on your first order</p>
          </div>
        </div>
        
        {!subscribed ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <div className="flex-1 relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
            >
              Subscribe
            </button>
          </form>
        ) : (
          <div className="bg-white bg-opacity-20 rounded-lg p-6 max-w-md mx-auto">
            <h3 className="text-xl font-semibold mb-2">Welcome to the family! 🎉</h3>
            <p className="opacity-90">Check your email for your 20% discount code</p>
          </div>
        )}
        
        <p className="text-sm opacity-75 mt-4">
          Join 100K+ subscribers • Unsubscribe anytime • No spam, we promise
        </p>
      </div>
    </section>
  );
};

export default Newsletter;