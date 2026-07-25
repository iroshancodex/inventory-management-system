// src/components/ProductList.jsx
import React, { useState } from 'react';

const ProductList = ({ products = [], onEdit, onDelete, onUpdateStock, categories = [] }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('ALL');
    const [stockStatusFilter, setStockStatusFilter] = useState('ALL');

    // Search & Filter Logic
    const filteredProducts = products.filter((product) => {
        // 1. Search Query Filter (Name or SKU)
        const matchesSearch =
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.id.toLowerCase().includes(searchQuery.toLowerCase());

        // 2. Category Filter
        const matchesCategory =
            selectedCategory === 'ALL' || product.category === selectedCategory;

        // 3. Stock Status Filter
        let matchesStock = true;
        if (stockStatusFilter === 'IN_STOCK') {
            matchesStock = product.stock > 0;
        } else if (stockStatusFilter === 'OUT_OF_STOCK') {
            matchesStock = product.stock === 0;
        }

        return matchesSearch && matchesCategory && matchesStock;
    });

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
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">

            {/* Search and Filters Header */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 self-start md:self-auto">
                    📦 Inventory Products ({filteredProducts.length})
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full md:w-auto">
                    {/* Search Bar */}
                    <input
                        type="text"
                        placeholder="Search by name or SKU..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />

                    {/* Category Filter */}
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                        <option value="ALL">All Categories</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>

                    {/* Stock Status Filter */}
                    <select
                        value={stockStatusFilter}
                        onChange={(e) => setStockStatusFilter(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                        <option value="ALL">All Stock Status</option>
                        <option value="IN_STOCK">In Stock</option>
                        <option value="OUT_OF_STOCK">Out of Stock</option>
                    </select>
                </div>
            </div>
            <button
                onClick={handleExportCSV}
                className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-sm shadow-sm transition"
            >
                📥 Export CSV
            </button>

            {/* Product Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            <th className="py-3 px-4">SKU / ID</th>
                            <th className="py-3 px-4">Product Name</th>
                            <th className="py-3 px-4">Category</th>
                            <th className="py-3 px-4">Price (LKR)</th>
                            <th className="py-3 px-4 text-center">Stock Level</th>
                            <th className="py-3 px-4 text-center">Quick Adjust</th>
                            <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-sm">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50 transition">
                                    {/* SKU */}
                                    <td className="py-3 px-4 font-mono font-medium text-gray-600">
                                        {product.id}
                                    </td>

                                    {/* Name */}
                                    <td className="py-3 px-4 font-semibold text-gray-800">
                                        {product.name}
                                    </td>

                                    {/* Category Badge */}
                                    <td className="py-3 px-4">
                                        <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-100">
                                            {product.category}
                                        </span>
                                    </td>

                                    {/* Price */}
                                    <td className="py-3 px-4 font-medium text-gray-700">
                                        Rs. {product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                    </td>

                                    {/* Stock Quantity & Badge */}
                                    <td className="py-3 px-4 text-center">
                                        <span
                                            className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${product.stock === 0
                                                    ? 'bg-red-100 text-red-700'
                                                    : product.stock <= 5
                                                        ? 'bg-amber-100 text-amber-700'
                                                        : 'bg-green-100 text-green-700'
                                                }`}
                                        >
                                            {product.stock === 0 ? 'Out of Stock' : `${product.stock} units`}
                                        </span>
                                    </td>

                                    {/* Restock / Sale (+ / -) */}
                                    <td className="py-3 px-4 text-center">
                                        <div className="flex justify-center items-center gap-1">
                                            <button
                                                onClick={() => onUpdateStock(product.id, -1)}
                                                disabled={product.stock <= 0}
                                                title="Reduce Stock (Sale)"
                                                className="w-7 h-7 flex items-center justify-center bg-red-100 text-red-700 rounded hover:bg-red-200 disabled:opacity-40 disabled:cursor-not-allowed font-bold"
                                            >
                                                -
                                            </button>
                                            <button
                                                onClick={() => onUpdateStock(product.id, 1)}
                                                title="Increase Stock (Restock)"
                                                className="w-7 h-7 flex items-center justify-center bg-green-100 text-green-700 rounded hover:bg-green-200 font-bold"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </td>

                                    {/* Edit & Delete */}
                                    <td className="py-3 px-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => onEdit(product)}
                                                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-xs font-medium"
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
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="py-8 text-center text-gray-500">
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