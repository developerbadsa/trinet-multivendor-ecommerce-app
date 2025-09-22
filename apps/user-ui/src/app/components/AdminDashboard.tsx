import React from 'react';
import { BarChart, Users, ShoppingCart, DollarSign, TrendingUp, AlertTriangle } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Manage your marketplace operations</p>
      </div>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">$2.8M</p>
              <p className="text-sm text-green-600">+12% from last month</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Vendors</p>
              <p className="text-2xl font-bold text-gray-900">1,234</p>
              <p className="text-sm text-blue-600">+8% from last month</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">45,678</p>
              <p className="text-sm text-green-600">+15% from last month</p>
            </div>
            <ShoppingCart className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Approvals</p>
              <p className="text-2xl font-bold text-gray-900">23</p>
              <p className="text-sm text-orange-600">Requires attention</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Vendor Applications</h3>
          <div className="space-y-4">
            {['TechGadgets Pro', 'Fashion Forward', 'Home Essentials'].map((vendor, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">{vendor}</span>
                <div className="space-x-2">
                  <button className="bg-green-600 text-white px-3 py-1 rounded text-sm">Approve</button>
                  <button className="bg-red-600 text-white px-3 py-1 rounded text-sm">Reject</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Analytics</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Conversion Rate</span>
              <span className="font-semibold">3.2%</span>
            </div>
            <div className="flex justify-between">
              <span>Avg Order Value</span>
              <span className="font-semibold">$127</span>
            </div>
            <div className="flex justify-between">
              <span>Customer Satisfaction</span>
              <span className="font-semibold">4.8/5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;