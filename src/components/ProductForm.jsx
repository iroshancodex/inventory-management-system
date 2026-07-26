// // src/components/ProductForm.jsx
// import { useState, useEffect } from 'react';
// import { saveCategoryToStorage } from '../utils/storage';

// const ProductForm = ({ onAddProduct, initialValues = null, isEditing = false, onCancel }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     category: '',
//     price: '',
//     stock: '',
//   });
//   const [newCategoryInput, setNewCategoryInput] = useState('');
//   const [isAddingCustomCategory, setIsAddingCustomCategory] = useState(false);

//   useEffect(() => {
//     if (initialValues) {
//       setFormData({
//         name: initialValues.name || '',
//         category: initialValues.category || '',
//         price: initialValues.price || '',
//         stock: initialValues.stock || '',
//       });
//     }
//   }, [initialValues]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.name || !formData.category || !formData.price) return;

//     let finalCategory = formData.category;
//     if (isAddingCustomCategory && newCategoryInput.trim()) {
//       finalCategory = newCategoryInput.trim();
//       saveCategoryToStorage(finalCategory);
//     }

//     const payload = {
//       id: initialValues?.id || `PRD-${Math.floor(1000 + Math.random() * 9000)}`,
//       name: formData.name.trim(),
//       category: finalCategory,
//       price: parseFloat(formData.price) || 0,
//       stock: parseInt(formData.stock, 10) || 0,
//     };

//     onAddProduct(payload);
//   };

//   return (
//     <div className="space-y-4">
//       <div>
//         <h3 className="text-lg font-bold text-gray-900 dark:text-white">
//           {isEditing ? 'Edit Product Details' : 'Add New Inventory Item'}
//         </h3>
//         <p className="text-xs text-gray-500 dark:text-gray-400">
//           Fill in product information below.
//         </p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
//             Product Name
//           </label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="e.g. Anchor Full Cream Milk Powder 400g"
//             required
//             className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div>
//           <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
//             Category
//           </label>
//           {!isAddingCustomCategory ? (
//             <div className="flex gap-2">
//               <select
//                 name="category"
//                 value={formData.category}
//                 onChange={handleChange}
//                 required
//                 className="flex-1 px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">Select Category</option>
//                 <option value="Dairy & Bakery">Dairy & Bakery</option>
//                 <option value="Snacks & Beverages">Snacks & Beverages</option>
//                 <option value="Household & Cleaning">Household & Cleaning</option>
//                 <option value="Personal Care">Personal Care</option>
//                 <option value="Pantry Essentials">Pantry Essentials</option>
//               </select>
//               <button
//                 type="button"
//                 onClick={() => setIsAddingCustomCategory(true)}
//                 className="px-3 py-2 bg-gray-200 dark:bg-gray-600 text-xs font-semibold rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-300"
//               >
//                 + New
//               </button>
//             </div>
//           ) : (
//             <div className="flex gap-2">
//               <input
//                 type="text"
//                 value={newCategoryInput}
//                 onChange={(e) => setNewCategoryInput(e.target.value)}
//                 placeholder="Enter new category"
//                 className="flex-1 px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <button
//                 type="button"
//                 onClick={() => setIsAddingCustomCategory(false)}
//                 className="px-3 py-2 bg-gray-200 dark:bg-gray-600 text-xs font-semibold rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-300"
//               >
//                 Cancel
//               </button>
//             </div>
//           )}
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
//               Price (Rs.)
//             </label>
//             <input
//               type="number"
//               name="price"
//               min="0"
//               step="0.01"
//               value={formData.price}
//               onChange={handleChange}
//               placeholder="0.00"
//               required
//               className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
//               Initial Stock Units
//             </label>
//             <input
//               type="number"
//               name="stock"
//               min="0"
//               value={formData.stock}
//               onChange={handleChange}
//               placeholder="0"
//               required
//               className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//         </div>

//         <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
//           {onCancel && (
//             <button
//               type="button"
//               onClick={onCancel}
//               className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
//             >
//               Cancel
//             </button>
//           )}
//           <button
//             type="submit"
//             className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition"
//           >
//             {isEditing ? 'Save Changes' : 'Create Product'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ProductForm;
// src/components/ProductForm.jsx
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { saveCategoryToStorage } from '../utils/storage';

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Product name must be at least 3 characters')
    .required('Product name is required'),
  category: Yup.string().required('Please select or enter a category'),
  price: Yup.number()
    .typeError('Price must be a number')
    .positive('Price must be greater than zero')
    .required('Price is required'),
  stock: Yup.number()
    .typeError('Stock quantity must be a number')
    .integer('Stock must be a whole number')
    .min(0, 'Stock cannot be negative')
    .required('Stock quantity is required'),
});

const ProductForm = ({ onAddProduct, initialValues = null, isEditing = false, onCancel }) => {
  const [isAddingCustomCategory, setIsAddingCustomCategory] = useState(false);
  const [newCategoryInput, setNewCategoryInput] = useState('');

  const formik = useFormik({
    initialValues: {
      name: initialValues?.name || '',
      category: initialValues?.category || '',
      price: initialValues?.price || '',
      stock: initialValues?.stock || '',
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      let finalCategory = values.category;

      if (isAddingCustomCategory && newCategoryInput.trim()) {
        finalCategory = newCategoryInput.trim();
        saveCategoryToStorage(finalCategory);
      }

      const payload = {
        id: initialValues?.id || `PRD-${Math.floor(100000 + Math.random() * 900000)}`,
        name: values.name.trim(),
        category: finalCategory,
        price: parseFloat(values.price),
        stock: parseInt(values.stock, 10),
      };

      onAddProduct(payload);
    },
  });

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          {isEditing ? 'Edit Product Details' : 'Add New Inventory Item'}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Form validated with Formik and Yup.
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Product Name */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="e.g. Anchor Full Cream Milk Powder 400g"
            className={`w-full px-3.5 py-2 rounded-xl border bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 ${
              formik.touched.name && formik.errors.name
                ? 'border-rose-500 focus:ring-rose-500'
                : 'border-gray-200 dark:border-gray-600 focus:ring-blue-500'
            }`}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-xs text-rose-500 mt-1 font-medium">{formik.errors.name}</p>
          )}
        </div>

        {/* Category Selection */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Category
          </label>
          {!isAddingCustomCategory ? (
            <div className="flex gap-2">
              <select
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`flex-1 px-3.5 py-2 rounded-xl border bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 ${
                  formik.touched.category && formik.errors.category
                    ? 'border-rose-500 focus:ring-rose-500'
                    : 'border-gray-200 dark:border-gray-600 focus:ring-blue-500'
                }`}
              >
                <option value="">Select Category</option>
                <option value="Dairy & Bakery">Dairy & Bakery</option>
                <option value="Snacks & Beverages">Snacks & Beverages</option>
                <option value="Household & Cleaning">Household & Cleaning</option>
                <option value="Personal Care">Personal Care</option>
                <option value="Pantry Essentials">Pantry Essentials</option>
              </select>
              <button
                type="button"
                onClick={() => setIsAddingCustomCategory(true)}
                className="px-3 py-2 bg-gray-200 dark:bg-gray-600 text-xs font-semibold rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-300"
              >
                + New
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                type="text"
                value={newCategoryInput}
                onChange={(e) => {
                  setNewCategoryInput(e.target.value);
                  formik.setFieldValue('category', e.target.value);
                }}
                placeholder="Enter custom category"
                className="flex-1 px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setIsAddingCustomCategory(false)}
                className="px-3 py-2 bg-gray-200 dark:bg-gray-600 text-xs font-semibold rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          )}
          {formik.touched.category && formik.errors.category && (
            <p className="text-xs text-rose-500 mt-1 font-medium">{formik.errors.category}</p>
          )}
        </div>

        {/* Price & Stock Inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Price (Rs.)
            </label>
            <input
              type="number"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="0.00"
              className={`w-full px-3.5 py-2 rounded-xl border bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 ${
                formik.touched.price && formik.errors.price
                  ? 'border-rose-500 focus:ring-rose-500'
                  : 'border-gray-200 dark:border-gray-600 focus:ring-blue-500'
              }`}
            />
            {formik.touched.price && formik.errors.price && (
              <p className="text-xs text-rose-500 mt-1 font-medium">{formik.errors.price}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Stock Quantity
            </label>
            <input
              type="number"
              name="stock"
              value={formik.values.stock}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="0"
              className={`w-full px-3.5 py-2 rounded-xl border bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 ${
                formik.touched.stock && formik.errors.stock
                  ? 'border-rose-500 focus:ring-rose-500'
                  : 'border-gray-200 dark:border-gray-600 focus:ring-blue-500'
              }`}
            />
            {formik.touched.stock && formik.errors.stock && (
              <p className="text-xs text-rose-500 mt-1 font-medium">{formik.errors.stock}</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition"
          >
            {isEditing ? 'Save Changes' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;