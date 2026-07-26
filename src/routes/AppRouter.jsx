// src/routes/AppRoutes.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // <--- ME IMPORT EKA ADD KARANNA

import { InventoryProvider } from '../context/InventoryContext';
import MainLayout from '../layouts/MainLayout';
import DashboardPage from '../pages/DashboardPage';
import ProductsPage from '../pages/ProductsPage';
import HistoryPage from '../pages/HistoryPage';

const AppRoutes = () => {
  return (
    <InventoryProvider>
      {/* Toast Alert Config */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1f2937',
            color: '#fff',
            borderRadius: '12px',
            fontSize: '13px',
          },
        }}
      />

      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="history" element={<HistoryPage />} />
          </Route>
        </Routes>
      </Router>
    </InventoryProvider>
  );
};

export default AppRoutes;