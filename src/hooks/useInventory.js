// src/hooks/useInventory.js
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import {
  getProductsFromStorage,
  saveProductsToStorage,
  getCategoriesFromStorage,
  getStockHistoryFromStorage,
  addStockHistoryLog,
} from '../utils/storage';

export const useInventory = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [historyLogs, setHistoryLogs] = useState([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Sync theme preference with HTML root class and LocalStorage
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Load initial dataset
  useEffect(() => {
    setProducts(getProductsFromStorage());
    setCategories(getCategoriesFromStorage());
    setHistoryLogs(getStockHistoryFromStorage());
  }, []);

  // Helper to update state changes with persistent storage
  const updateProductsState = (newProducts) => {
    setProducts(newProducts);
    saveProductsToStorage(newProducts);
    setCategories(getCategoriesFromStorage());
  };

  // Create or Update Product
  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      const updated = products.map((p) =>
        p.id === editingProduct.id ? { ...productData, id: editingProduct.id } : p
      );
      updateProductsState(updated);
      setEditingProduct(null);
      toast.success('Product updated successfully');
    } else {
      const updated = [productData, ...products];
      updateProductsState(updated);
      toast.success('New product added to inventory');
    }
  };

  // Delete single product
  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const updated = products.filter((p) => p.id !== id);
      updateProductsState(updated);
      toast.error('Product deleted permanently');
    }
  };

  // Increment or Decrement Stock Level
  const handleUpdateStock = (id, delta) => {
    let updatedProductName = '';

    const updated = products.map((p) => {
      if (p.id === id) {
        updatedProductName = p.name;
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

    if (delta > 0) {
      toast.success(`Restocked +${delta} units for ${updatedProductName}`);
    } else {
      toast(`Stock reduced (-${Math.abs(delta)}) for ${updatedProductName}`, { icon: '📉' });
    }
  };

  // Bulk Operations
  const handleBulkDelete = (idsToDelete) => {
    if (window.confirm(`Are you sure you want to delete ${idsToDelete.length} selected products?`)) {
      const updated = products.filter((p) => !idsToDelete.includes(p.id));
      updateProductsState(updated);
      toast.error(`${idsToDelete.length} products removed`);
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
    toast.success(`Bulk restocked +${amount} units for ${idsToRestock.length} items`);
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