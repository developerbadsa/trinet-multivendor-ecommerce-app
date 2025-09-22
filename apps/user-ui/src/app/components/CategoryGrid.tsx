import React from 'react';
import { Laptop, Headphones, Smartphone, Watch, Camera, Gamepad2 } from 'lucide-react';

const categories = [
  { name: 'Electronics', icon: Laptop, count: '12,450', color: 'bg-blue-500' },
  { name: 'Audio', icon: Headphones, count: '8,230', color: 'bg-purple-500' },
  { name: 'Mobile', icon: Smartphone, count: '15,670', color: 'bg-green-500' },
  { name: 'Watches', icon: Watch, count: '5,890', color: 'bg-yellow-500' },
  { name: 'Cameras', icon: Camera, count: '3,450', color: 'bg-red-500' },
  { name: 'Gaming', icon: Gamepad2, count: '9,120', color: 'bg-indigo-500' },
];

const CategoryGrid: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p className="text-lg text-gray-600">Discover millions of products from trusted vendors worldwide</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.name}
                className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
              >
                <div className={`${category.color} rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.count} items</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;