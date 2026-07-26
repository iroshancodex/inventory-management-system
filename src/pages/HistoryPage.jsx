// src/pages/HistoryPage.jsx
import { useInventoryContext } from '../context/InventoryContext';

const HistoryPage = () => {
  const { historyLogs } = useInventoryContext();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Stock Audit History
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Complete log of all stock increases, sales, and inventory updates.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        {historyLogs.length > 0 ? (
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {historyLogs.map((log) => (
              <div key={log.id} className="py-4 flex items-center justify-between">
                <div>
                  <p className="font-bold text-gray-800 dark:text-white text-sm">
                    {log.productName}
                  </p>
                  <p className="text-xs text-gray-400 font-mono mt-0.5">
                    SKU: {log.sku} • {log.timestamp}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                      log.type === 'RESTOCK'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {log.type === 'RESTOCK'
                      ? `+${log.changeAmount} Restock`
                      : `-${log.changeAmount} Sale`}
                  </span>
                  <p className="text-xs text-gray-400 mt-1">
                    New Stock Level: <strong>{log.newStock} units</strong>
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 py-12">
            No activity recorded yet in history logs.
          </p>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;