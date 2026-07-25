// src/components/ProductList.jsx
import React, { useState } from 'react';

const ProductList = ({
  products = [],
  onEdit,
  onDelete,
  onUpdateStock,
  onBulkDelete,
  onBulkRestock,
  categories = [],
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [stockStatusFilter, setStockStatusFilter] = useState('ALL');
  
  // Selection State for Bulk Actions
  const [selectedIds, setSelectedIds] = useState([]);

  // Search & Filter Logic
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'ALL' || product.category === selectedCategory;

    let matchesStock = true;
    if (stockStatusFilter === 'IN_STOCK') matchesStock = product.stock > 0;
    if (stockStatusFilter === 'OUT_OF_STOCK') matchesStock = product.stock === 0;

    return matchesSearch && matchesCategory && matchesStock;
  });

  // Checkbox Handlers
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredProducts.map((p) => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isAllSelected =
    filteredProducts.length > 0 &&
    filteredProducts.every((p) => selectedIds.includes(p.id));

  // Export to CSV Function
  const handleExportCSV = () => {
    if (products.length === 0) return alert('No products to export!');

    const headers = ['SKU', 'Product Name', 'Category', 'Price (LKR)', 'Stock Quantity'];
    const rows = products.map((p) => [
      p.id,
      `"${p.name.replace(/"/g, '""')}"`,
      `"${p.category}"`,
      p.price,
      p.stock,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `inventory_report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 transition-colors">
      
      {/* Search and Filters Header */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          📦 Inventory Products ({filteredProducts.length})
        </h2>

        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {/* Export CSV Button */}
          <button
            onClick={handleExportCSV}
            className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-sm shadow-sm transition"
          >
            📥 Export CSV
          </button>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search name/SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:text-white dark:border-gray-600"
          >
            <option value="ALL">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Stock Filter */}
          <select
            value={stockStatusFilter}
            onChange={(e) => setStockStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:text-white dark:border-gray-600"
          >
            <option value="ALL">All Stock Status</option>
            <option value="IN_STOCK">In Stock</option>
            <option value="OUT_OF_STOCK">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* BULK ACTIONS BAR (Shows only when items selected) */}
      {selectedIds.length > 0 && (
        <div className="mb-4 p-3 bg-blue-50 dark:bg-gray-700 border border-blue-200 dark:border-gray-600 rounded-lg flex items-center justify-between animate-fade-in">
          <span className="text-sm font-semibold text-blue-900 dark:text-blue-200">
            ⚡ {selectedIds.length} item(s) selected
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => {
                onBulkRestock(selectedIds, 10);
                setSelectedIds([]);
              }}
              className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded text-xs font-bold transition"
            >
              + Bulk Restock (+10)
            </button>
            <button
              onClick={() => {
                onBulkDelete(selectedIds);
                setSelectedIds([]);
              }}
              className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-bold transition"
            >
              🗑️ Bulk Delete
            </button>
            <button
              onClick={() => setSelectedIds([])}
              className="px-2 py-1.5 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded text-xs"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Product Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
              <th className="py-3 px-4">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                  className="rounded cursor-pointer"
                />
              </th>
              <th className="py-3 px-4">SKU / ID</th>
              <th className="py-3 px-4">Product Name</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Price (LKR)</th>
              <th className="py-3 px-4 text-center">Stock Level</th>
              <th className="py-3 px-4 text-center">Quick Adjust</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-sm">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => {
                const isSelected = selectedIds.includes(product.id);
                return (
                  <tr
                    key={product.id}
                    className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition ${
                      isSelected ? 'bg-blue-50/50 dark:bg-gray-700/50' : ''
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="py-3 px-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectRow(product.id)}
                        className="rounded cursor-pointer"
                      />
                    </td>

                    {/* SKU */}
                    <td className="py-3 px-4 font-mono font-medium text-gray-600 dark:text-gray-300">
                      {product.id}
                    </td>

                    {/* Name */}
                    <td className="py-3 px-4 font-semibold text-gray-800 dark:text-white">
                      {product.name}
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-1 bg-blue-50 dark:bg-gray-700 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium border border-blue-100 dark:border-gray-600">
                        {product.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-3 px-4 font-medium text-gray-700 dark:text-gray-200">
                      Rs. {product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>

                    {/* Stock */}
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                          product.stock === 0
                            ? 'bg-red-100 text-red-700'
                            : product.stock <= 5
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {product.stock === 0 ? 'Out of Stock' : `${product.stock} units`}
                      </span>
                    </td>

                    {/* Adjust */}
                    <td className="py-3 px-4 text-center">
                      <div className="flex justify-center items-center gap-1">
                        <button
                          onClick={() => onUpdateStock(product.id, -1)}
                          disabled={product.stock <= 0}
                          className="w-7 h-7 flex items-center justify-center bg-red-100 text-red-700 rounded hover:bg-red-200 disabled:opacity-40 font-bold"
                        >
                          -
                        </button>
                        <button
                          onClick={() => onUpdateStock(product.id, 1)}
                          className="w-7 h-7 flex items-center justify-center bg-green-100 text-green-700 rounded hover:bg-green-200 font-bold"
                        >
                          +
                        </button>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => onEdit(product)}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 text-gray-700 dark:text-gray-200 rounded text-xs font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onDelete(product.id)}
                          className="px-3 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded text-xs font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8" className="py-8 text-center text-gray-500">
                  No products found matching your search/filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;