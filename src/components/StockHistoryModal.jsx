// src/components/StockHistoryModal.jsx
import React from 'react';

const StockHistoryModal = ({ isOpen, onClose, historyLogs = [] }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800">
            📜 Stock Audit & Change History Log
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 font-bold text-xl px-2"
          >
            ✕
          </button>
        </div>

        {/* Log List */}
        <div className="p-4 overflow-y-auto flex-1">
          {historyLogs.length > 0 ? (
            <div className="space-y-3">
              {historyLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-3 border border-gray-100 rounded-lg bg-gray-50 flex justify-between items-center"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-800 text-sm">
                        {log.productName}
                      </span>
                      <span className="text-xs font-mono text-gray-500">
                        ({log.sku})
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{log.timestamp}</p>
                  </div>

                  <div className="text-right">
                    <span
                      className={`inline-block px-2.5 py-0.5 text-xs font-bold rounded-full ${
                        log.type === 'RESTOCK'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {log.type === 'RESTOCK' ? `+${log.changeAmount} Restock` : `-${log.changeAmount} Sale`}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      New Level: <strong>{log.newStock} units</strong>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">
              No stock activity recorded yet. Change any product stock to see logs!
            </p>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 border-t border-gray-200 text-right">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-gray-800 text-white rounded-lg text-sm font-semibold hover:bg-gray-900"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default StockHistoryModal;