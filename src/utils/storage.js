
const STORAGE_KEYS = {
  PRODUCTS: 'inventory_products',
  CATEGORIES: 'inventory_categories',
  HISTORY: 'inventory_stock_history',
};

//retail initial data
const INITIAL_PRODUCTS = [
  {
    id: 'PRD-1001',
    name: 'Anchor Full Cream Milk Powder 400g',
    category: 'Dairy & Bakery',
    price: 1180,
    stock: 22,
  },
  {
    id: 'PRD-1002',
    name: 'Munchee Super Cream Cracker 190g',
    category: 'Snacks & Beverages',
    price: 230,
    stock: 45,
  },
  {
    id: 'PRD-1003',
    name: 'Dilmah Premium Ceylon Tea 100g',
    category: 'Snacks & Beverages',
    price: 450,
    stock: 4,
  },
  {
    id: 'PRD-1004',
    name: 'Sunlight Care Lemon Soap 100g',
    category: 'Household & Cleaning',
    price: 160,
    stock: 30,
  },
  {
    id: 'PRD-1005',
    name: 'Clogard Fresh Mint Toothpaste 120g',
    category: 'Personal Care',
    price: 280,
    stock: 0,
  },
  {
    id: 'PRD-1006',
    name: 'Harischandra Noodle Pack 400g',
    category: 'Pantry Essentials',
    price: 320,
    stock: 14,
  },
];

const INITIAL_CATEGORIES = [
  'Dairy & Bakery',
  'Snacks & Beverages',
  'Household & Cleaning',
  'Personal Care',
  'Pantry Essentials',
];

// Product storage helper
export const getProductsFromStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to read products from LocalStorage:', error);
    return INITIAL_PRODUCTS;
  }
};

export const saveProductsToStorage = (products) => {
  try {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  } catch (error) {
    console.error('Failed to save products to LocalStorage:', error);
  }
};

//  Category storage helper

export const getCategoriesFromStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
      return INITIAL_CATEGORIES;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to read categories from LocalStorage:', error);
    return INITIAL_CATEGORIES;
  }
};

export const saveCategoryToStorage = (newCategory) => {
  const categories = getCategoriesFromStorage();
  const trimmed = newCategory.trim();

  if (trimmed && !categories.includes(trimmed)) {
    const updated = [...categories, trimmed];
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(updated));
    return updated;
  }
  return categories;
};

//Stock history  helper
export const getStockHistoryFromStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to read stock history from LocalStorage:', error);
    return [];
  }
};

export const addStockHistoryLog = ({ productName, sku, type, changeAmount, newStock }) => {
  const history = getStockHistoryFromStorage();

  const logItem = {
    id: `LOG-${Date.now()}`,
    productName,
    sku,
    type,
    changeAmount,
    newStock,
    timestamp: new Date().toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }),
  };

  const updatedHistory = [logItem, ...history];

  try {
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updatedHistory));
  } catch (error) {
    console.error('Failed to log stock update:', error);
  }

  return updatedHistory;
};