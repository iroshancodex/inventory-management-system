// src/components/AnalyticsChart.jsx
import React from 'react';

const AnalyticsChart = ({ products = [], categories = [] }) => {
  // Calculate stock per category
  const categoryData = categories.map((cat) => {
    const catProducts = products.filter((p) => p.category === cat);
    const totalStock = catProducts.reduce((sum, p) => sum + p.stock, 0);
    return {
      category: cat,
      count: catProducts.length,
      stock: totalStock,
    };
  });

  const maxStock = Math.max(...categoryData.map((d) => d.stock), 1);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white">
            📊 Product Distribution per Category
          </h3>
          <p className="text-xs text-gray-400">Stock breakdown across all active categories</p>
        </div>
      </div>

      {categoryData.length > 0 ? (
        <div className="space-y-4">
          {categoryData.map((data) => {
            const percentage = Math.min(100, Math.round((data.stock / maxStock) * 100));

            return (
              <div key={data.category} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-medium">
                  <span className="text-gray-700 dark:text-gray-200 font-semibold">
                    {data.category} ({data.count} items)
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    {data.stock} units
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-100 dark:bg-gray-700 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-xs text-gray-400 text-center py-6">No category data available.</p>
      )}
    </div>
  );
};

export default AnalyticsChart;