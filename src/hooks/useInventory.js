// src/hooks/useInventory.js
import { useState, useEffect } from 'react';
import {
  getProductsFromStorage,
  saveProductsToStorage,
  getCategoriesFromStorage,
  getStockHistoryFromStorage,
  addStockHistoryLog,
} from '../utils/storage';

export const useInventory = () => {
  // States
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [historyLogs, setHistoryLogs] = useState([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Dark Mode State
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  // Dark Mode Effect
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

  // Helper State Updater
  const updateProductsState = (newProducts) => {
    setProducts(newProducts);
    saveProductsToStorage(newProducts);
    setCategories(getCategoriesFromStorage());
  };

  // Handlers Logic
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

  return {
    products,
    categories,
    editingProduct,
    setEditingProduct,
    historyLogs,
    isHistoryOpen,
    setIsHistoryOpen,
    darkMode,
    setDarkMode,
    handleSaveProduct,
    handleDeleteProduct,
    handleUpdateStock,
    handleBulkDelete,
    handleBulkRestock,
  };
};