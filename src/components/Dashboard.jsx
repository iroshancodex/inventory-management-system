// src/components/Dashboard.jsx
import AnalyticsChart from './AnalyticsChart';
import { Package, DollarSign, AlertTriangle, AlertOctagon } from 'lucide-react';

const Dashboard = ({ products = [], categories = [] }) => {
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);
  const lowStockCount = products.filter((p) => p.stock > 0 && p.stock <= 5).length;
  const outOfStockCount = products.filter((p) => p.stock === 0).length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total Products */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-5 text-white shadow-lg shadow-blue-500/10">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-blue-100">
                Total Products
              </p>
              <h3 className="text-3xl font-extrabold mt-1">{totalProducts}</h3>
            </div>
            <div className="p-2.5 bg-white/10 rounded-xl backdrop-blur-md">
              <Package className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="mt-3 flex items-center text-xs text-blue-100 font-medium">
            <span className="bg-white/20 px-2 py-0.5 rounded-full mr-2 text-[10px]">
              Active
            </span>
            <span>Live inventory count</span>
          </div>
        </div>

        {/* Inventory Value */}
        <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl p-5 text-white shadow-lg shadow-emerald-500/10">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-100">
                Inventory Value
              </p>
              <h3 className="text-2xl font-extrabold mt-1">
                Rs. {totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </h3>
            </div>
            <div className="p-2.5 bg-white/10 rounded-xl backdrop-blur-md">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="mt-3 flex items-center text-xs text-emerald-100 font-medium">
            <span className="bg-white/20 px-2 py-0.5 rounded-full mr-2 text-[10px]">
              Asset
            </span>
            <span>Total stock valuation</span>
          </div>
        </div>

        {/* Low Stock */}
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-5 text-white shadow-lg shadow-amber-500/10">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-amber-100">
                Low Stock (≤5)
              </p>
              <h3 className="text-3xl font-extrabold mt-1">{lowStockCount}</h3>
            </div>
            <div className="p-2.5 bg-white/10 rounded-xl backdrop-blur-md">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="mt-3 flex items-center text-xs text-amber-100 font-medium">
            <span className="bg-white/20 px-2 py-0.5 rounded-full mr-2 text-[10px]">
              Action
            </span>
            <span>Items need restock</span>
          </div>
        </div>

        {/* Out of Stock */}
        <div className="bg-gradient-to-br from-rose-600 to-red-600 rounded-2xl p-5 text-white shadow-lg shadow-rose-500/10">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-rose-100">
                Out of Stock
              </p>
              <h3 className="text-3xl font-extrabold mt-1">{outOfStockCount}</h3>
            </div>
            <div className="p-2.5 bg-white/10 rounded-xl backdrop-blur-md">
              <AlertOctagon className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="mt-3 flex items-center text-xs text-rose-100 font-medium">
            <span className="bg-white/20 px-2 py-0.5 rounded-full mr-2 text-[10px]">
              Critical
            </span>
            <span>Unavailable items</span>
          </div>
        </div>

      </div>

      <AnalyticsChart products={products} categories={categories} />
    </div>
  );
};

export default Dashboard;