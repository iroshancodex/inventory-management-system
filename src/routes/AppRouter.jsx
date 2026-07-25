// src/routes/AppRouter.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from '../components/Dashboard';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';
import StockHistoryModal from '../components/StockHistoryModal';

import {
  getProductsFromStorage,
  saveProductsToStorage,
  getCategoriesFromStorage,
  getStockHistoryFromStorage,
  addStockHistoryLog,
} from '../utils/storage';

const AppRoutes = () => {
  // State Management
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [historyLogs, setHistoryLogs] = useState([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Dark Mode State
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Load Initial Storage Data
  useEffect(() => {
    setProducts(getProductsFromStorage());
    setCategories(getCategoriesFromStorage());
    setHistoryLogs(getStockHistoryFromStorage());
  }, []);

  const updateProductsState = (newProducts) => {
    setProducts(newProducts);
    saveProductsToStorage(newProducts);
    setCategories(getCategoriesFromStorage());
  };

  // Handlers
  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      const updated = products.map((p) =>
        p.id === editingProduct.id ? { ...productData, id: editingProduct.id } : p
      );
      updateProductsState(updated);
      setEditingProduct(null);
    } else {
      const updated = [productData, ...products];
      updateProductsState(updated);
    }
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const updated = products.filter((p) => p.id !== id);
      updateProductsState(updated);
    }
  };

  const handleUpdateStock = (id, delta) => {
    const updated = products.map((p) => {
      if (p.id === id) {
        const newStock = Math.max(0, p.stock + delta);
        const logs = addStockHistoryLog({
          productName: p.name,
          sku: p.id,
          type: delta > 0 ? 'RESTOCK' : 'SALE',
          changeAmount: Math.abs(delta),
          newStock,
        });
        setHistoryLogs(logs);
        return { ...p, stock: newStock };
      }
      return p;
    });
    updateProductsState(updated);
  };

  const handleBulkDelete = (idsToDelete) => {
    if (window.confirm(`Are you sure you want to delete ${idsToDelete.length} products?`)) {
      const updated = products.filter((p) => !idsToDelete.includes(p.id));
      updateProductsState(updated);
    }
  };

  const handleBulkRestock = (idsToRestock, amount = 10) => {
    const updated = products.map((p) => {
      if (idsToRestock.includes(p.id)) {
        const newStock = p.stock + amount;
        addStockHistoryLog({
          productName: p.name,
          sku: p.id,
          type: 'RESTOCK',
          changeAmount: amount,
          newStock,
        });
        return { ...p, stock: newStock };
      }
      return p;
    });
    updateProductsState(updated);
    setHistoryLogs(getStockHistoryFromStorage());
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white font-sans pb-12 transition-colors">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                📊 Inventory Management System
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Intern Assessment Project</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-yellow-300 text-xs font-semibold transition"
              >
                {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
              </button>

              <button
                onClick={() => setIsHistoryOpen(true)}
                className="bg-gray-800 dark:bg-gray-700 hover:bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition shadow-sm"
              >
                📜 View History Log ({historyLogs.length})
              </button>
            </div>
          </div>
        </header>

        {/* Routes Definition */}
        <Routes>
          <Route
            path="/"
            element={
              <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                <Dashboard products={products} categories={categories} />

                <ProductForm
                  onAddProduct={handleSaveProduct}
                  initialValues={editingProduct}
                  isEditing={!!editingProduct}
                  onCancel={() => setEditingProduct(null)}
                />

                <ProductList
                  products={products}
                  categories={categories}
                  onEdit={(product) => setEditingProduct(product)}
                  onDelete={handleDeleteProduct}
                  onUpdateStock={handleUpdateStock}
                  onBulkDelete={handleBulkDelete}
                  onBulkRestock={handleBulkRestock}
                />
              </main>
            }
          />
        </Routes>

        {/* Modal */}
        <StockHistoryModal
          isOpen={isHistoryOpen}
          onClose={() => setIsHistoryOpen(false)}
          historyLogs={historyLogs}
        />
      </div>
    </Router>
  );
};

export default AppRoutes;