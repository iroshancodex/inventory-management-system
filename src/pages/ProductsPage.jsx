// src/pages/ProductsPage.jsx
import { useState } from 'react';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';
import { useInventoryContext } from '../context/InventoryContext';

const ProductsPage = () => {
  const {
    products,
    categories,
    editingProduct,
    setEditingProduct,
    handleSaveProduct,
    handleDeleteProduct,
    handleUpdateStock,
    handleBulkDelete,
    handleBulkRestock,
  } = useInventoryContext();

  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOpenAddForm = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Product Inventory
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Manage catalog items, stock levels, and category assignments.
          </p>
        </div>
        <button
          onClick={handleOpenAddForm}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md transition flex items-center gap-2"
        >
          <span>➕</span> Add New Product
        </button>
      </div>

      <ProductList
        products={products}
        categories={categories}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
        onUpdateStock={handleUpdateStock}
        onBulkDelete={handleBulkDelete}
        onBulkRestock={handleBulkRestock}
      />

      {(isFormOpen || editingProduct) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative">
            <button
              onClick={handleCloseForm}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-lg font-bold"
            >
              ✕
            </button>
            <ProductForm
              onAddProduct={(data) => {
                handleSaveProduct(data);
                handleCloseForm();
              }}
              initialValues={editingProduct}
              isEditing={!!editingProduct}
              onCancel={handleCloseForm}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;