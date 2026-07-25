// src/components/ProductForm.jsx
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getCategoriesFromStorage, saveCategoryToStorage } from '../utils/storage';

// Auto-generated SKU Helper (Bonus Feature)
const generateSKU = () => {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `PRD-${randomNum}`;
};

const ProductForm = ({ onAddProduct, initialValues = null, isEditing = false, onCancel }) => {
  const [categories, setCategories] = useState([]);
  const [newCategoryInput, setNewCategoryInput] = useState('');
  const [showAddCategory, setShowAddCategory] = useState(false);

  useEffect(() => {
    setCategories(getCategoriesFromStorage());
  }, []);

  // Yup Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .min(2, 'Name must be at least 2 characters')
      .required('Product Name is required'),
    category: Yup.string().required('Category is required'),
    price: Yup.number()
      .typeError('Price must be a number')
      .positive('Price must be greater than 0')
      .required('Price is required'),
    stock: Yup.number()
      .typeError('Stock must be a number')
      .min(0, 'Stock cannot be negative')
      .integer('Stock must be a whole number')
      .required('Stock quantity is required'),
  });

  const formik = useFormik({
    initialValues: initialValues || {
      id: generateSKU(),
      name: '',
      category: '',
      price: '',
      stock: '',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      onAddProduct({
        ...values,
        price: parseFloat(values.price),
        stock: parseInt(values.stock, 10),
      });
      resetForm({ values: { ...initialValues, id: generateSKU(), name: '', category: '', price: '', stock: '' } });
    },
  });

  const handleAddCustomCategory = () => {
    if (newCategoryInput.trim()) {
      const updatedCategories = saveCategoryToStorage(newCategoryInput.trim());
      setCategories(updatedCategories);
      formik.setFieldValue('category', newCategoryInput.trim());
      setNewCategoryInput('');
      setShowAddCategory(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        {isEditing ? '✏️ Edit Product' : '➕ Add New Product'}
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* SKU / Product ID (Read-only Auto Generated) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product ID (SKU)</label>
            <input
              type="text"
              name="id"
              value={formik.values.id}
              disabled
              className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-100 text-gray-500 font-mono text-sm"
            />
          </div>

          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
            <input
              type="text"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              placeholder="e.g. Anchor Milk Powder 400g"
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>
            )}
          </div>

          {/* Category Dropdown */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700">Category *</label>
              <button
                type="button"
                onClick={() => setShowAddCategory(!showAddCategory)}
                className="text-xs text-blue-600 hover:underline font-medium"
              >
                {showAddCategory ? 'Cancel' : '+ New Category'}
              </button>
            </div>

            {showAddCategory ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCategoryInput}
                  onChange={(e) => setNewCategoryInput(e.target.value)}
                  placeholder="New category name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
                <button
                  type="button"
                  onClick={handleAddCustomCategory}
                  className="px-3 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700"
                >
                  Add
                </button>
              </div>
            ) : (
              <select
                name="category"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.category}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                  formik.touched.category && formik.errors.category ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            )}
            {formik.touched.category && formik.errors.category && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.category}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price (LKR) *</label>
            <input
              type="number"
              name="price"
              step="0.01"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.price}
              placeholder="e.g. 1250"
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                formik.touched.price && formik.errors.price ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {formik.touched.price && formik.errors.price && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.price}</p>
            )}
          </div>

          {/* Stock Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Initial Stock *</label>
            <input
              type="number"
              name="stock"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.stock}
              placeholder="e.g. 50"
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                formik.touched.stock && formik.errors.stock ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {formik.touched.stock && formik.errors.stock && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.stock}</p>
            )}
          </div>

        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-3">
          {isEditing && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition"
          >
            {isEditing ? 'Update Product' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;