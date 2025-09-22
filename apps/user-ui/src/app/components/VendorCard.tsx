import React from 'react';
import { Star, MapPin, Package } from 'lucide-react';

interface VendorCardProps {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviews: number;
  location: string;
  products: number;
  description: string;
  verified: boolean;
}

const VendorCard: React.FC<VendorCardProps> = ({
  name,
  avatar,
  rating,
  reviews,
  location,
  products,
  description,
  verified
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border hover:shadow-lg transition-shadow duration-300 p-6">
      <div className="flex items-start space-x-4">
        <div className="relative">
          <img
            src={avatar}
            alt={name}
            className="w-16 h-16 rounded-full object-cover"
          />
          {verified && (
            <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">{name}</h3>
            {verified && (
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                Verified
              </span>
            )}
          </div>
          
          <div className="flex items-center mt-1 space-x-4">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600 ml-1">{rating} ({reviews})</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-1" />
              {location}
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <Package className="w-4 h-4 mr-1" />
              {products} products
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mt-2 truncate">{description}</p>
          
          <div className="flex space-x-2 mt-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
              View Store
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors">
              Follow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorCard;