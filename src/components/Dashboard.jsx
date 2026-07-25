// src/components/Dashboard.jsx
import React from 'react';

// Change this line:
const Dashboard = ({ products = [], categories = [] }) => {
  // Stats Calculations
  const totalProducts = products.length;

  const totalValue = products.reduce(
    (acc, prod) => acc + prod.price * prod.stock,
    0
  );

  const outOfStockCount = products.filter((prod) => prod.stock === 0).length;
  const lowStockCount = products.filter(
    (prod) => prod.stock > 0 && prod.stock <= 5
  ).length;

  // Calculate Product count per Category
  const categoryCounts = categories.map((cat) => {
    const count = products.filter((p) => p.category === cat).length;
    return { name: cat, count };
  });

  return (
    <div className="space-y-6 mb-8">
      {/* Top Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Products */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Total Products
            </p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">
              {totalProducts}
            </h3>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-xl">
            📦
          </div>
        </div>

        {/* Total Inventory Value */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Total Inventory Value
            </p>
            <h3 className="text-2xl font-bold text-green-600 mt-1">
              Rs. {totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </h3>
          </div>
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-lg flex items-center justify-center text-xl">
            💰
          </div>
        </div>

        {/* Low Stock Warning */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Low Stock Items (≤5)
            </p>
            <h3 className="text-2xl font-bold text-amber-600 mt-1">
              {lowStockCount}
            </h3>
          </div>
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center text-xl">
            ⚠️
          </div>
        </div>

        {/* Out of Stock Alert */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Out of Stock
            </p>
            <h3 className="text-2xl font-bold text-red-600 mt-1">
              {outOfStockCount}
            </h3>
          </div>
          <div className="w-12 h-12 bg-red-50 text-red-600 rounded-lg flex items-center justify-center text-xl">
            🚨
          </div>
        </div>

      </div>

      {/* Category Breakdown */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-base font-bold text-gray-800 mb-4">
          🏷️ Product Count per Category
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {categoryCounts.map((cat) => (
            <div
              key={cat.name}
              className="p-3 bg-gray-50 border border-gray-100 rounded-lg text-center"
            >
              <span className="block text-xs font-medium text-gray-500 truncate">
                {cat.name}
              </span>
              <span className="block text-lg font-bold text-gray-800 mt-0.5">
                {cat.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;