
const PRODUCTS_KEY = 'inventory_products';
const CATEGORIES_KEY = 'inventory_categories';

// App eka mulinma load weddi empty penne nathi wenna initial mock data
const INITIAL_PRODUCTS = [
  {
    id: 'PRD-1001',
    name: 'Basmati Rice 5kg',
    category: 'Groceries',
    price: 3200,
    stock: 25,
  },
  {
    id: 'PRD-1002',
    name: 'Full Cream Milk Powder 400g',
    category: 'Dairy',
    price: 1050,
    stock: 4, // Low stock example
  },
  {
    id: 'PRD-1003',
    name: 'White Sugar 1kg',
    category: 'Groceries',
    price: 240,
    stock: 0, // Out of stock example
  },
];

const INITIAL_CATEGORIES = ['Groceries', 'Dairy', 'Beverages', 'Household'];

// --- PRODUCT HELPER FUNCTIONS ---

export const getProductsFromStorage = () => {
  const data = localStorage.getItem(PRODUCTS_KEY);
  if (!data) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
  }
  return JSON.parse(data);
};

export const saveProductsToStorage = (products) => {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
};

// --- CATEGORY HELPER FUNCTIONS ---

export const getCategoriesFromStorage = () => {
  const data = localStorage.getItem(CATEGORIES_KEY);
  if (!data) {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(INITIAL_CATEGORIES));
    return INITIAL_CATEGORIES;
  }
  return JSON.parse(data);
};

export const saveCategoryToStorage = (newCategory) => {
  const categories = getCategoriesFromStorage();
  if (!categories.includes(newCategory)) {
    const updated = [...categories, newCategory];
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(updated));
    return updated;
  }
  return categories;
};


// --- STOCK HISTORY HELPER FUNCTIONS ---
const HISTORY_KEY = 'inventory_stock_history';

export const getStockHistoryFromStorage = () => {
  const data = localStorage.getItem(HISTORY_KEY);
  return data ? JSON.parse(data) : [];
};

export const addStockHistoryLog = ({ productName, sku, type, changeAmount, newStock }) => {
  const history = getStockHistoryFromStorage();
  const logItem = {
    id: Date.now(),
    productName,
    sku,
    type, // 'RESTOCK' or 'SALE' or 'INITIAL'
    changeAmount,
    newStock,
    timestamp: new Date().toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }),
  };
  const updatedHistory = [logItem, ...history];
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
  return updatedHistory;
};