// src/App.jsx
import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import StockHistoryModal from './components/StockHistoryModal';
import {
  getProductsFromStorage,
  saveProductsToStorage,
  getCategoriesFromStorage,
  getStockHistoryFromStorage,
  addStockHistoryLog,
} from './utils/storage';
function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [historyLogs, setHistoryLogs] = useState([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  // Dark Mode State with LocalStorage Persistence
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

  // Initial Data Load
  useEffect(() => {
    const loadedProducts = getProductsFromStorage();
    const loadedCategories = getCategoriesFromStorage();
    setProducts(getProductsFromStorage());
    setCategories(getCategoriesFromStorage());
    setHistoryLogs(getStockHistoryFromStorage());
    setProducts(loadedProducts);
    setCategories(loadedCategories);
  }, []);

  // Sync to LocalStorage whenever products update
  const updateProductsState = (newProducts) => {
    setProducts(newProducts);
    saveProductsToStorage(newProducts);
    // Refresh categories in case custom categories were added
    setCategories(getCategoriesFromStorage());
  };

  // 1. Add or Edit Product Handler
  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      // Edit mode
      const updated = products.map((p) =>
        p.id === editingProduct.id ? { ...productData, id: editingProduct.id } : p
      );
      updateProductsState(updated);
      setEditingProduct(null);
    } else {
      // Add mode
      const updated = [productData, ...products];
      updateProductsState(updated);
    }
  };

  // 2. Delete Product Handler
  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const updated = products.filter((p) => p.id !== id);
      updateProductsState(updated);
    }
  };

  // 3. Stock Increase / Decrease Handler (+ / -)
  const handleUpdateStock = (id, delta) => {
    const updated = products.map((p) => {
      if (p.id === id) {
        const newStock = Math.max(0, p.stock + delta);

        // Log the stock change
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
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans pb-12">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              📊 Inventory Management System
            </h1>
            <p className="text-xs text-gray-500">Intern Assessment Project</p>
          </div>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            Frontend Only (localStorage)
          </span>
        </div>
        <button
  onClick={() => setDarkMode(!darkMode)}
  className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-yellow-300 text-xs font-semibold transition"
>
  {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
</button>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* Dashboard Stats */}
        <Dashboard products={products} categories={categories} />

        {/* Product Form */}
        <ProductForm
          onAddProduct={handleSaveProduct}
          initialValues={editingProduct}
          isEditing={!!editingProduct}
          onCancel={() => setEditingProduct(null)}
        />

        {/* Product Table */}
        <ProductList
          products={products}
          categories={categories}
          onEdit={(product) => setEditingProduct(product)}
          onDelete={handleDeleteProduct}
          onUpdateStock={handleUpdateStock}
        />
      </main>
      {/* Header button */}
      <button
        onClick={() => setIsHistoryOpen(true)}
        className="bg-gray-800 hover:bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition"
      >
        📜 View History Log ({historyLogs.length})
      </button>

      {/* App return block end eke Modal eka danna */}
      <StockHistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        historyLogs={historyLogs}
      />
    </div>
  );
}

export default App;