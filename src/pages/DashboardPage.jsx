// src/pages/DashboardPage.jsx
import Dashboard from '../components/Dashboard';
import { useInventoryContext } from '../context/InventoryContext';

const DashboardPage = () => {
  const { products, categories, historyLogs } = useInventoryContext();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          System Dashboard
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Overview of inventory performance and stock distribution.
        </p>
      </div>

      <Dashboard products={products} categories={categories} />

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="text-base font-bold text-gray-800 dark:text-white mb-4">
          ⚡ Recent Inventory Updates
        </h3>
        {historyLogs.length > 0 ? (
          <div className="space-y-3">
            {historyLogs.slice(0, 4).map((log) => (
              <div
                key={log.id}
                className="flex justify-between items-center text-sm p-3 bg-gray-50 dark:bg-gray-700/40 rounded-xl"
              >
                <div>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    {log.productName}
                  </span>
                  <span className="text-xs text-gray-400 ml-2">({log.sku})</span>
                  <p className="text-xs text-gray-400">{log.timestamp}</p>
                </div>
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    log.type === 'RESTOCK'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {log.type === 'RESTOCK' ? `+${log.changeAmount}` : `-${log.changeAmount}`} Units
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-400">No recent updates recorded.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;