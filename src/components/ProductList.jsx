// // src/components/ProductList.jsx
// import { useState, useMemo } from 'react';

// const ProductList = ({
//   products = [],
//   categories = [],
//   onEdit,
//   onDelete,
//   onUpdateStock,
//   onBulkDelete,
//   onBulkRestock,
// }) => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('ALL');
//   const [selectedIds, setSelectedIds] = useState([]);

//   const filteredProducts = useMemo(() => {
//     return products.filter((p) => {
//       const matchesSearch =
//         p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         p.id.toLowerCase().includes(searchQuery.toLowerCase());
//       const matchesCategory =
//         selectedCategory === 'ALL' || p.category === selectedCategory;
//       return matchesSearch && matchesCategory;
//     });
//   }, [products, searchQuery, selectedCategory]);

//   const handleSelectAll = (e) => {
//     if (e.target.checked) {
//       setSelectedIds(filteredProducts.map((p) => p.id));
//     } else {
//       setSelectedIds([]);
//     }
//   };

//   const handleSelectOne = (id) => {
//     setSelectedIds((prev) =>
//       prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
//     );
//   };

//   return (
//     <div className="space-y-4">
//       {/* Search & Filter Controls */}
//       <div className="flex flex-col sm:flex-row justify-between gap-3 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
//         <div className="relative flex-1">
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             placeholder="Search products by name or SKU..."
//             className="w-full pl-9 pr-8 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <span className="absolute left-3 top-2.5 text-gray-400 text-sm">🔍</span>
//           {searchQuery && (
//             <button
//               onClick={() => setSearchQuery('')}
//               className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 text-xs font-bold"
//             >
//               ✕
//             </button>
//           )}
//         </div>

//         <select
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//           className="px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           <option value="ALL">All Categories</option>
//           {categories.map((cat) => (
//             <option key={cat} value={cat}>
//               {cat}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Bulk Actions Bar */}
//       {selectedIds.length > 0 && (
//         <div className="flex justify-between items-center bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 p-3.5 rounded-xl">
//           <span className="text-xs font-bold text-blue-800 dark:text-blue-300">
//             {selectedIds.length} item(s) selected
//           </span>
//           <div className="flex gap-2">
//             <button
//               onClick={() => {
//                 onBulkRestock(selectedIds, 10);
//                 setSelectedIds([]);
//               }}
//               className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition"
//             >
//               + Bulk Restock (+10)
//             </button>
//             <button
//               onClick={() => {
//                 onBulkDelete(selectedIds);
//                 setSelectedIds([]);
//               }}
//               className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg transition"
//             >
//               Delete Selected
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Data Table */}
//       <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse text-sm">
//             <thead>
//               <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                 <th className="p-4 w-10">
//                   <input
//                     type="checkbox"
//                     onChange={handleSelectAll}
//                     checked={
//                       filteredProducts.length > 0 &&
//                       selectedIds.length === filteredProducts.length
//                     }
//                     className="rounded"
//                   />
//                 </th>
//                 <th className="p-4 font-semibold">Product Name</th>
//                 <th className="p-4 font-semibold">Category</th>
//                 <th className="p-4 font-semibold">Price</th>
//                 <th className="p-4 font-semibold">Stock</th>
//                 <th className="p-4 font-semibold text-right">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
//               {filteredProducts.length > 0 ? (
//                 filteredProducts.map((p) => (
//                   <tr
//                     key={p.id}
//                     className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition"
//                   >
//                     <td className="p-4">
//                       <input
//                         type="checkbox"
//                         checked={selectedIds.includes(p.id)}
//                         onChange={() => handleSelectOne(p.id)}
//                         className="rounded"
//                       />
//                     </td>
//                     <td className="p-4 font-medium text-gray-900 dark:text-white">
//                       <div>{p.name}</div>
//                       <div className="text-[11px] text-gray-400 font-mono">{p.id}</div>
//                     </td>
//                     <td className="p-4 text-gray-600 dark:text-gray-300">
//                       <span className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-xs font-semibold">
//                         {p.category}
//                       </span>
//                     </td>
//                     <td className="p-4 font-semibold text-gray-800 dark:text-gray-200">
//                       Rs. {p.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
//                     </td>
//                     <td className="p-4">
//                       <div className="flex items-center gap-2">
//                         <span
//                           className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
//                             p.stock === 0
//                               ? 'bg-rose-100 text-rose-700'
//                               : p.stock <= 5
//                               ? 'bg-amber-100 text-amber-700'
//                               : 'bg-emerald-100 text-emerald-700'
//                           }`}
//                         >
//                           {p.stock === 0
//                             ? 'Out of Stock'
//                             : p.stock <= 5
//                             ? `Low: ${p.stock}`
//                             : `${p.stock} units`}
//                         </span>
//                       </div>
//                     </td>
//                     <td className="p-4 text-right">
//                       <div className="flex items-center justify-end gap-1.5">
//                         <button
//                           onClick={() => onUpdateStock(p.id, 1)}
//                           className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 font-bold text-xs"
//                           title="Add 1 Stock"
//                         >
//                           +
//                         </button>
//                         <button
//                           onClick={() => onUpdateStock(p.id, -1)}
//                           className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 hover:bg-amber-100 font-bold text-xs"
//                           title="Deduct 1 Stock"
//                         >
//                           -
//                         </button>
//                         <button
//                           onClick={() => onEdit(p)}
//                           className="p-1.5 text-gray-400 hover:text-blue-600 text-xs font-bold ml-1"
//                           title="Edit Product"
//                         >
//                           ✏️
//                         </button>
//                         <button
//                           onClick={() => onDelete(p.id)}
//                           className="p-1.5 text-gray-400 hover:text-rose-600 text-xs font-bold"
//                           title="Delete Product"
//                         >
//                           🗑️
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6" className="text-center py-10 text-gray-400 text-xs">
//                     No products matching your search criteria.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductList;

// src/components/ProductList.jsx
import { useState, useMemo } from 'react';
import { Download, Search } from 'lucide-react';

const ProductList = ({
  products = [],
  categories = [],
  onEdit,
  onDelete,
  onUpdateStock,
  onBulkDelete,
  onBulkRestock,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [stockStatus, setStockStatus] = useState('ALL'); // Stock status filter requirement
  const [selectedIds, setSelectedIds] = useState([]);

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'ALL' || p.category === selectedCategory;

      let matchesStock = true;
      if (stockStatus === 'IN_STOCK') matchesStock = p.stock > 0;
      if (stockStatus === 'OUT_OF_STOCK') matchesStock = p.stock === 0;

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [products, searchQuery, selectedCategory, stockStatus]);

  // Bonus Feature: CSV Export
  const handleExportCSV = () => {
    if (products.length === 0) return;

    const headers = ['Product ID,Name,Category,Price (LKR),Stock Quantity'];
    const rows = products.map(
      (p) => `"${p.id}","${p.name}","${p.category}",${p.price},${p.stock}`
    );

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `inventory_report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredProducts.map((p) => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-4">
      {/* Search, Filter & CSV Export Bar */}
      <div className="flex flex-col md:flex-row justify-between gap-3 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products by name or SKU..."
            className="w-full pl-9 pr-8 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 text-xs font-bold"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="ALL">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Stock Status Filter (Requirement #5) */}
        <select
          value={stockStatus}
          onChange={(e) => setStockStatus(e.target.value)}
          className="px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="ALL">All Stock Status</option>
          <option value="IN_STOCK">In Stock</option>
          <option value="OUT_OF_STOCK">Out of Stock</option>
        </select>

        {/* Export to CSV Button (Bonus) */}
        <button
          onClick={handleExportCSV}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition flex items-center gap-2 justify-center"
        >
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      {/* Bulk Actions */}
      {selectedIds.length > 0 && (
        <div className="flex justify-between items-center bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 p-3.5 rounded-xl">
          <span className="text-xs font-bold text-blue-800 dark:text-blue-300">
            {selectedIds.length} item(s) selected
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => {
                onBulkRestock(selectedIds, 10);
                setSelectedIds([]);
              }}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition"
            >
              + Bulk Restock (+10)
            </button>
            <button
              onClick={() => {
                onBulkDelete(selectedIds);
                setSelectedIds([]);
              }}
              className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg transition"
            >
              Delete Selected
            </button>
          </div>
        </div>
      )}

      {/* Data Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <th className="p-4 w-10">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={
                      filteredProducts.length > 0 &&
                      selectedIds.length === filteredProducts.length
                    }
                    className="rounded"
                  />
                </th>
                <th className="p-4 font-semibold">Product Name</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold">Price</th>
                <th className="p-4 font-semibold">Stock</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition"
                  >
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(p.id)}
                        onChange={() => handleSelectOne(p.id)}
                        className="rounded"
                      />
                    </td>
                    <td className="p-4 font-medium text-gray-900 dark:text-white">
                      <div>{p.name}</div>
                      <div className="text-[11px] text-gray-400 font-mono">{p.id}</div>
                    </td>
                    <td className="p-4 text-gray-600 dark:text-gray-300">
                      <span className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-xs font-semibold">
                        {p.category}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-gray-800 dark:text-gray-200">
                      Rs. {p.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          p.stock === 0
                            ? 'bg-rose-100 text-rose-700'
                            : p.stock <= 5
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {p.stock === 0
                          ? 'Out of Stock'
                          : p.stock <= 5
                          ? `Low: ${p.stock}`
                          : `${p.stock} units`}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onUpdateStock(p.id, 1)}
                          className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 font-bold text-xs"
                          title="Add Stock"
                        >
                          +
                        </button>
                        <button
                          onClick={() => onUpdateStock(p.id, -1)}
                          className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 font-bold text-xs"
                          title="Reduce Stock"
                        >
                          -
                        </button>
                        <button
                          onClick={() => onEdit(p)}
                          className="p-1.5 text-gray-400 hover:text-blue-600 text-xs font-bold ml-1"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => onDelete(p.id)}
                          className="p-1.5 text-gray-400 hover:text-rose-600 text-xs font-bold"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-gray-400 text-xs">
                    No products matching your filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;